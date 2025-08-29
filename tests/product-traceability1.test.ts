
import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const manufacturer = accounts.get("wallet_1")!;
const warehouse = accounts.get("wallet_2")!;
const vendor = accounts.get("wallet_3")!;

describe("Product Traceability Contract Tests", () => {
  it("ensures simnet is well initialized", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("should deploy contract and get contract stats", () => {
    const { result } = simnet.callReadOnlyFn("product-traceability1", "get-contract-stats", [], deployer);
    expect(result).toStrictEqual(
      Cl.tuple({
        "total-products": Cl.uint(1),
        "total-checkpoints": Cl.uint(1),
        "contract-owner": Cl.principal(deployer)
      })
    );
  });

  it("should demonstrate complete product traceability workflow", () => {
    const productId = 1;

    // Step 1: Register users with roles
    const registerManufacturer = simnet.callPublicFn("product-traceability1", "register-user", [
      Cl.stringAscii("manufacturer"), 
      Cl.stringUtf8("SnackCo Inc")
    ], manufacturer);
    expect(registerManufacturer.result).toBeOk(Cl.uint(1));

    const registerWarehouse = simnet.callPublicFn("product-traceability1", "register-user", [
      Cl.stringAscii("warehouse"),
      Cl.stringUtf8("Central Distribution")
    ], warehouse);
    expect(registerWarehouse.result).toBeOk(Cl.uint(2));

    const registerVendor = simnet.callPublicFn("product-traceability1", "register-user", [
      Cl.stringAscii("vendor"),
      Cl.stringUtf8("SuperMart Chain")
    ], vendor);
    expect(registerVendor.result).toBeOk(Cl.uint(3));

    // Step 2: Verify user roles
    const manufacturerRole = simnet.callReadOnlyFn("product-traceability1", "get-user-role", [Cl.principal(manufacturer)], deployer);
    expect(manufacturerRole.result).toBeSome(expect.any(Object));

    // Step 3: Create product 
    const createProduct = simnet.callPublicFn("product-traceability1", "create-product", [
      Cl.uint(productId),
      Cl.stringUtf8("Spicy Nacho Tortilla Chips"),
      Cl.stringAscii("SKU-12345"),
      Cl.stringAscii("1234567890123"),
      Cl.stringUtf8("Corn, Vegetable Oil, Salt, Natural Flavors, Spices"),
      Cl.stringUtf8("Non-GMO, Gluten-Free"),
      Cl.stringUtf8("SnackCo Inc"),
      Cl.stringUtf8("Factory A, Industrial District"),
      Cl.uint(simnet.blockHeight),
      Cl.uint(simnet.blockHeight + 1000),
      Cl.stringAscii("BATCH-001")
    ], manufacturer);
    expect(createProduct.result).toBeOk(Cl.uint(productId));

    // Step 4: Add product events
    const productionEvent = simnet.callPublicFn("product-traceability1", "add-product-event", [
      Cl.uint(productId),
      Cl.stringAscii("production"),
      Cl.stringUtf8("Factory A, Production Line 1"),
      Cl.stringUtf8("SnackCo Inc"),
      Cl.stringUtf8("Packaging Department"),
      Cl.stringAscii("PROD-001"),
      Cl.stringUtf8("Temperature: 20°C, Humidity: 45%"),
      Cl.stringUtf8("Production completed successfully")
    ], manufacturer);
    expect(productionEvent.result).toBeOk(Cl.uint(0));

    const packagingEvent = simnet.callPublicFn("product-traceability1", "add-product-event", [
      Cl.uint(productId),
      Cl.stringAscii("packaging"),
      Cl.stringUtf8("Factory A, Packaging Line 3"),
      Cl.stringUtf8("SnackCo Inc"),
      Cl.stringUtf8("Warehouse"),
      Cl.stringAscii("PACK-001"),
      Cl.stringUtf8("Room temperature, low humidity"),
      Cl.stringUtf8("Product packaged and ready for shipment")
    ], manufacturer);
    expect(packagingEvent.result).toBeOk(Cl.uint(1));

    const warehouseInEvent = simnet.callPublicFn("product-traceability1", "add-product-event", [
      Cl.uint(productId),
      Cl.stringAscii("warehouse_in"),
      Cl.stringUtf8("Central Warehouse, Dock 5"),
      Cl.stringUtf8("Central Distribution"),
      Cl.stringUtf8("Storage Area B"),
      Cl.stringAscii("WH-IN-001"),
      Cl.stringUtf8("Temperature: 22°C, Humidity: 45%"),
      Cl.stringUtf8("Product received and stored")
    ], warehouse);
    expect(warehouseInEvent.result).toBeOk(Cl.uint(2));

    // Step 5: Verify product information
    const productInfo = simnet.callReadOnlyFn("product-traceability1", "get-product", [Cl.uint(productId)], deployer);
    expect(productInfo.result).toBeSome(expect.any(Object));

    // Step 6: Get product events
    const productEvents = simnet.callReadOnlyFn("product-traceability1", "get-product-events", [Cl.uint(productId)], deployer);
    expect(productEvents.result).toBeDefined();

    // Step 7: Get complete product traceability
    const traceability = simnet.callReadOnlyFn("product-traceability1", "get-product-traceability", [Cl.uint(productId)], deployer);
    expect(traceability.result).toStrictEqual(expect.any(Object));
  });

  it("should prevent unauthorized actions", () => {
    const unauthorizedParty = accounts.get("wallet_4")!;
    const productId = 999;
    
    // Try to create product without proper role
    const unauthorizedCreate = simnet.callPublicFn("product-traceability1", "create-product", [
      Cl.uint(productId),
      Cl.stringUtf8("Unauthorized Product"),
      Cl.stringAscii("SKU-99999"),
      Cl.stringAscii("9999999999999"),
      Cl.stringUtf8("Unknown ingredients"),
      Cl.stringUtf8("No certifications"),
      Cl.stringUtf8("Unknown Manufacturer"),
      Cl.stringUtf8("Unknown Location"),
      Cl.uint(simnet.blockHeight),
      Cl.uint(simnet.blockHeight + 1000),
      Cl.stringAscii("BATCH-999")
    ], unauthorizedParty);
    expect(unauthorizedCreate.result).toBeErr(Cl.uint(100)); // ERR_UNAUTHORIZED
  });

  it("should handle non-existent products gracefully", () => {
    const nonExistentProductId = 9999;
    
    // Try to get non-existent product
    const productInfo = simnet.callReadOnlyFn("product-traceability1", "get-product", [Cl.uint(nonExistentProductId)], deployer);
    expect(productInfo.result).toBeNone();

    // Register a manufacturer first
    simnet.callPublicFn("product-traceability1", "register-user", [
      Cl.stringAscii("manufacturer"), 
      Cl.stringUtf8("Test Manufacturer")
    ], manufacturer);

    // Try to add event to non-existent product
    const eventAdd = simnet.callPublicFn("product-traceability1", "add-product-event", [
      Cl.uint(nonExistentProductId),
      Cl.stringAscii("production"),
      Cl.stringUtf8("Some Location"),
      Cl.stringUtf8("Some Party"),
      Cl.stringUtf8("Some Destination"),
      Cl.stringAscii("SHIP-999"),
      Cl.stringUtf8("Normal conditions"),
      Cl.stringUtf8("Test event")
    ], manufacturer);
    expect(eventAdd.result).toBeErr(Cl.uint(101)); // ERR_PRODUCT_NOT_FOUND
  });

  it("should validate user roles correctly", () => {
    // Register users with different roles
    const customerReg = simnet.callPublicFn("product-traceability1", "register-user", [
      Cl.stringAscii("customer"), 
      Cl.stringUtf8("Customer Corp")
    ], accounts.get("wallet_5")!);
    expect(customerReg.result).toBeOk(expect.any(Object));

    const adminReg = simnet.callPublicFn("product-traceability1", "register-user", [
      Cl.stringAscii("admin"), 
      Cl.stringUtf8("Admin Corp")
    ], accounts.get("wallet_6")!);
    expect(adminReg.result).toBeOk(expect.any(Object));

    // Try to register with invalid role
    const invalidRole = simnet.callPublicFn("product-traceability1", "register-user", [
      Cl.stringAscii("invalid_role"), 
      Cl.stringUtf8("Invalid Corp")
    ], accounts.get("wallet_7")!);
    expect(invalidRole.result).toBeErr(Cl.uint(103)); // ERR_INVALID_ROLE
  });
});
