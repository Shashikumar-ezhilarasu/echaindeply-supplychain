;; Supply Chain Traceability Smart Contract
;; This contract manages product lifecycle, traceability, and multi-stakeholder authentication

;; ===================================
;; CONSTANTS AND ERROR CODES
;; ===================================

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u100))
(define-constant ERR_PRODUCT_NOT_FOUND (err u101))
(define-constant ERR_PRODUCT_ALREADY_EXISTS (err u102))
(define-constant ERR_INVALID_ROLE (err u103))
(define-constant ERR_INVALID_EVENT_TYPE (err u104))
(define-constant ERR_INVALID_STATUS (err u105))
(define-constant ERR_INSUFFICIENT_PERMISSIONS (err u106))
(define-constant ERR_INVALID_CHECKPOINT (err u107))
(define-constant ERR_PRODUCT_EXPIRED (err u108))

;; ===================================
;; DATA STRUCTURES
;; ===================================

(define-data-var next-user-id uint u1)

;; User roles
(define-map user-roles 
  { user: principal }
  { 
    role: (string-ascii 20),
    organization: (string-utf8 100),
    authorized: bool,
    created-at: uint
  }
)

;; Product info
(define-map products
  { product-id: uint }
  {
    name: (string-utf8 100),
    sku: (string-ascii 50),
    gtin: (string-ascii 20),
    ingredients: (string-utf8 500),
    certifications: (string-utf8 200),
    manufacturer-name: (string-utf8 100),
    manufacturing-location: (string-utf8 100),
    production-date: uint,
    expiration-date: uint,
    batch: (string-ascii 50),
    status: (string-ascii 20),
    created-by: principal,
    created-at: uint,
    qr-generated: bool
  }
)

;; Product events
(define-map product-events
  { product-id: uint, event-id: uint }
  {
    event-type: (string-ascii 30),
    timestamp: uint,
    location: (string-utf8 100),
    responsible-party: (string-utf8 100),
    destination: (string-utf8 100),
    shipment-id: (string-ascii 30),
    temperature: (optional (string-ascii 10)),
    humidity: (optional (string-ascii 10)),
    environmental-conditions: (string-utf8 200),
    verification-status: (string-ascii 20),
    recorded-by: principal,
    additional-data: (string-utf8 300)
  }
)

(define-map product-event-count
  { product-id: uint }
  { count: uint }
)

;; Checkpoints
(define-map checkpoints
  { checkpoint-id: uint }
  {
    name: (string-utf8 100),
    location: (string-utf8 100),
    facility-type: (string-ascii 20),
    created-by: principal,
    active: bool
  }
)

(define-map checkpoint-scans
  { product-id: uint, checkpoint-id: uint, scan-id: uint }
  {
    scan-timestamp: uint,
    scanner: principal,
    environmental-temp: (string-ascii 10),
    environmental-humidity: (string-ascii 10),
    next-destination: (string-utf8 100),
    notes: (string-utf8 200),
    verification-hash: (string-ascii 64)
  }
)

;; Product verifications
(define-map product-verifications
  { product-id: uint, verifier: principal }
  {
    verification-timestamp: uint,
    verification-status: (string-ascii 20),
    authenticity-confirmed: bool,
    verifier-notes: (string-utf8 200)
  }
)

;; Customer scans
(define-map customer-scans
  { product-id: uint, customer: principal, scan-timestamp: uint }
  {
    scan-location: (string-utf8 100),
    device-info: (string-utf8 100),
    journey-viewed: bool
  }
)

;; QR Codes
(define-map qr-codes
  { product-id: uint }
  {
    generated-at: uint,
    generated-by: principal,
    url: (string-utf8 200),
    scan-count: uint
  }
)

;; Global counters
(define-data-var next-product-id uint u1)
(define-data-var next-checkpoint-id uint u1)

;; ===================================
;; AUTHORIZATION FUNCTIONS
;; ===================================

(define-public (register-user (role (string-ascii 20)) (organization (string-utf8 100)))
  (let ((user-id (var-get next-user-id)))
    (asserts! (or 
      (is-eq role "manufacturer")
      (is-eq role "vendor")
      (is-eq role "warehouse")
      (is-eq role "customer")
      (is-eq role "admin")
    ) ERR_INVALID_ROLE)
    
    (map-set user-roles
      { user: tx-sender }
      {
        role: role,
        organization: organization,
        authorized: true,
        created-at: stacks-block-height
      }
    )
    
    (var-set next-user-id (+ user-id u1))
    (ok user-id)
  )
)

(define-read-only (has-role (user principal) (required-role (string-ascii 20)))
  (match (map-get? user-roles { user: user })
    user-data (and 
      (is-eq (get role user-data) required-role)
      (get authorized user-data)
    )
    false
  )
)

(define-read-only (get-user-role (user principal))
  (map-get? user-roles { user: user })
)

;; ===================================
;; PRODUCT MANAGEMENT (Manufacturer)
;; ===================================

(define-public (create-product 
  (product-id uint)
  (name (string-utf8 100))
  (sku (string-ascii 50))
  (gtin (string-ascii 20))
  (ingredients (string-utf8 500))
  (certifications (string-utf8 200))
  (manufacturer-name (string-utf8 100))
  (manufacturing-location (string-utf8 100))
  (production-date uint)
  (expiration-date uint)
  (batch (string-ascii 50))
)
  (let ((current-product (map-get? products { product-id: product-id })))
    (asserts! (has-role tx-sender "manufacturer") ERR_UNAUTHORIZED)
    (asserts! (is-none current-product) ERR_PRODUCT_ALREADY_EXISTS)
    
    (map-set products
      { product-id: product-id }
      {
        name: name,
        sku: sku,
        gtin: gtin,
        ingredients: ingredients,
        certifications: certifications,
        manufacturer-name: manufacturer-name,
        manufacturing-location: manufacturing-location,
        production-date: production-date,
        expiration-date: expiration-date,
        batch: batch,
        status: "created",
        created-by: tx-sender,
        created-at: stacks-block-height,
        qr-generated: false
      }
    )
    
    (map-set product-event-count { product-id: product-id } { count: u0 })
    (var-set next-product-id (+ (var-get next-product-id) u1))
    (ok product-id)
  )
)

;; ===================================
;; EVENT MANAGEMENT
;; ===================================

(define-public (add-product-event
  (product-id uint)
  (event-type (string-ascii 30))
  (location (string-utf8 100))
  (responsible-party (string-utf8 100))
  (destination (string-utf8 100))
  (shipment-id (string-ascii 30))
  (environmental-conditions (string-utf8 200))
  (additional-data (string-utf8 300))
)
  (let (
      (product (unwrap! (map-get? products { product-id: product-id }) ERR_PRODUCT_NOT_FOUND))
      (event-count-data (default-to { count: u0 } (map-get? product-event-count { product-id: product-id })))
      (event-id (get count event-count-data))
    )
    (asserts! (or 
      (has-role tx-sender "manufacturer")
      (has-role tx-sender "vendor")
      (has-role tx-sender "warehouse")
    ) ERR_UNAUTHORIZED)
    
    (asserts! (or
      (is-eq event-type "production")
      (is-eq event-type "quality_check")
      (is-eq event-type "packaging")
      (is-eq event-type "warehouse_in")
      (is-eq event-type "warehouse_out")
      (is-eq event-type "transport")
      (is-eq event-type "retail")
      (is-eq event-type "scan")
      (is-eq event-type "verification")
    ) ERR_INVALID_EVENT_TYPE)
    
    (map-set product-events
      { product-id: product-id, event-id: event-id }
      {
        event-type: event-type,
        timestamp: stacks-block-height,
        location: location,
        responsible-party: responsible-party,
        destination: destination,
        shipment-id: shipment-id,
        temperature: none,
        humidity: none,
        environmental-conditions: environmental-conditions,
        verification-status: "pending",
        recorded-by: tx-sender,
        additional-data: additional-data
      }
    )
    
    (map-set product-event-count { product-id: product-id } { count: (+ event-id u1) })
    (ok event-id)
  )
)

;; ===================================
;; READ-ONLY FUNCTIONS
;; ===================================

(define-read-only (get-product (product-id uint))
  (map-get? products { product-id: product-id })
)

;; FIXED: bounded list instead of broken map
(define-read-only (get-product-events (product-id uint))
  (list
    (map-get? product-events { product-id: product-id, event-id: u0 })
    (map-get? product-events { product-id: product-id, event-id: u1 })
    (map-get? product-events { product-id: product-id, event-id: u2 })
    (map-get? product-events { product-id: product-id, event-id: u3 })
    (map-get? product-events { product-id: product-id, event-id: u4 })
    (map-get? product-events { product-id: product-id, event-id: u5 })
    (map-get? product-events { product-id: product-id, event-id: u6 })
    (map-get? product-events { product-id: product-id, event-id: u7 })
    (map-get? product-events { product-id: product-id, event-id: u8 })
    (map-get? product-events { product-id: product-id, event-id: u9 })
  )
)

(define-read-only (get-checkpoint (checkpoint-id uint))
  (map-get? checkpoints { checkpoint-id: checkpoint-id })
)

(define-read-only (get-checkpoint-scan (product-id uint) (checkpoint-id uint) (scan-id uint))
  (map-get? checkpoint-scans { product-id: product-id, checkpoint-id: checkpoint-id, scan-id: scan-id })
)

(define-read-only (get-product-verification (product-id uint) (verifier principal))
  (map-get? product-verifications { product-id: product-id, verifier: verifier })
)

(define-read-only (get-qr-code (product-id uint))
  (map-get? qr-codes { product-id: product-id })
)

(define-read-only (is-product-expired (product-id uint))
  (match (map-get? products { product-id: product-id })
    product (> stacks-block-height (get expiration-date product))
    false
  )
)

(define-read-only (get-product-traceability (product-id uint))
  {
    product: (get-product product-id),
    events: (get-product-events product-id),
    qr-code: (get-qr-code product-id),
    expired: (is-product-expired product-id)
  }
)

;; ===================================
;; ADMIN
;; ===================================

(define-public (set-user-authorization (user principal) (authorized bool))
  (let ((user-data (unwrap! (map-get? user-roles { user: user }) ERR_UNAUTHORIZED)))
    (asserts! (has-role tx-sender "admin") ERR_UNAUTHORIZED)
    (map-set user-roles { user: user } (merge user-data { authorized: authorized }))
    (ok true)
  )
)

(define-read-only (get-contract-stats)
  {
    total-products: (var-get next-product-id),
    total-checkpoints: (var-get next-checkpoint-id),
    contract-owner: CONTRACT_OWNER
  }
)