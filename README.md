# 🔗 Echain Supply - Blockchain Supply Chain Traceability Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.1.12-blue?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Stacks Blockchain](https://img.shields.io/badge/Stacks-Blockchain-purple?style=flat-square)](https://www.stacks.co/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Clarity](https://img.shields.io/badge/Clarity-Smart%20Contracts-green?style=flat-square)](https://clarity-lang.org/)

> **A revolutionary blockchain-powered supply chain traceability platform that ensures product authenticity, transparency, and trust from manufacturer to consumer using Stacks blockchain and Clarity smart contracts.**




<img width="2940" height="1392" alt="image" src="https://github.com/user-attachments/assets/141f5732-ba2f-4a68-8ff8-ffcf24ce6e76" />



## 📖 **Project Description**

Echain Supply is a comprehensive decentralized supply chain management platform that leverages Stacks blockchain technology and Clarity smart contracts to provide end-to-end product traceability. The platform enables manufacturers, vendors, warehouses, and customers to track products through every stage of the supply chain, ensuring authenticity, transparency, and trust.

Key innovations include:
- **Immutable Product Records** - All product data stored on Stacks blockchain
- **QR Code Verification** - Instant product authentication via blockchain
- **Multi-Stakeholder Platform** - Dedicated portals for each supply chain participant
- **Real-time Tracking** - Live updates of product journey and status
- **Smart Contract Automation** - Automated verification and compliance checks

## 🔧 **Tech Stack**

### **Frontend Technologies**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.2.4 | React framework with App Router |
| **React** | 19 | UI library for interactive components |
| **TypeScript** | 5.0+ | Type-safe JavaScript development |
| **Tailwind CSS** | v4.1.12 | Utility-first CSS framework |
| **Framer Motion** | Latest | Animation and gesture library |
| **shadcn/ui** | Latest | Pre-built accessible UI components |

### **Backend & Blockchain**
| Technology | Purpose |
|------------|---------|
| **Stacks Blockchain** | Decentralized smart contract platform |
| **Clarity Language** | Smart contract development |
| **Firebase Firestore** | Real-time database for off-chain data |
| **Stacks.js** | Blockchain interaction library |

### **Development Tools**
| Tool | Purpose |
|------|---------|
| **Clarinet** | Clarity smart contract development environment |
| **Stacks CLI** | Command-line interface for Stacks |
| **ESLint** | Code linting and formatting |
| **Prettier** | Code formatting |

## 🚀 **Smart Contract Deployment**

### **📍 Contract Addresses**

#### **Testnet Deployment**
```
Contract Name: supply-chain-tracker
Contract Address: STHK32FSHBAWT513Y7806RME1BCH44QJKRN2XRQB.product-traceability1
Deployment Transaction: 0x1234567890abcdef...
Network: Stacks Testnet
Block Height: 123456
```

#### **Mainnet Deployment** *(Coming Soon)*
```
Contract Name: supply-chain-tracker
Network: Stacks Mainnet
Status: Planned for production release
```

### **🔗 Contract Verification**
- **Explorer Link**: [View on Stacks Explorer](https://explorer.hiro.so/txid/0xa0aeed5da7c6ef8c1a43bf80d7e5cf51eb870a7022c81d22eed32483e31120a3?chain=testnet)
- **Source Code**: Available in `/contracts` directory
- **Deployment Script**: `scripts/deploy-contract.js`

## ⚡ **Setup Instructions**

### **Prerequisites**
Before running this project, ensure you have:
- **Node.js** 18.0 or higher
- **npm** or **pnpm** package manager
- **Git** for version control
- **Stacks Wallet** (Hiro Wallet recommended)
- **Clarinet** for smart contract development (optional)

### **🔧 Installation Steps**

#### **1. Clone the Repository**
```bash
git clone https://github.com/Shashikumar-ezhilarasu/echaindeply-supplychain.git
cd echaindeply-supplychain
```

#### **2. Install Dependencies**
```bash
# Install frontend dependencies
npm install

# Or using pnpm (recommended)
pnpm install
```

#### **3. Environment Configuration**
Create a `.env.local` file in the root directory:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stacks Network Configuration
NEXT_PUBLIC_STACKS_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=ST1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234.supply-chain-tracker
NEXT_PUBLIC_CONTRACT_NAME=supply-chain-tracker

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### **4. Firebase Setup**
1. Create a new project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Configure authentication (optional)
4. Copy configuration to `.env.local`

#### **5. Stacks Wallet Setup**
1. Install [Hiro Wallet](https://wallet.hiro.so/) browser extension
2. Create or import wallet
3. Switch to Testnet for development
4. Get testnet STX from [faucet](https://explorer.stacks.co/sandbox/faucet)

#### **6. Smart Contract Setup** *(Optional - for developers)*
```bash
# Install Clarinet
curl -L https://github.com/hirosystems/clarinet/releases/latest/download/clarinet-linux-x64.tar.gz | tar xz
sudo mv clarinet /usr/local/bin

# Navigate to contracts directory
cd contracts

# Check contract syntax
clarinet check

# Run contract tests
clarinet test

# Deploy to testnet
clarinet deploy --testnet
```

#### **7. Run Development Server**
```bash
npm run dev
# or
pnpm dev
```

#### **8. Access Application**
Open your browser and navigate to:
```
http://localhost:3000
```

### **🔧 Additional Setup Options**

#### **Docker Setup** *(Alternative)*
```bash
# Build Docker image
docker build -t echain-supply .

# Run container
docker run -p 3000:3000 echain-supply
```

#### **Production Build**
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📱 **How to Use the Project**

### **🏭 For Manufacturers**

#### **Step 1: Authentication**
1. Navigate to `/manufacturer/login`
2. Click "Connect Wallet"
3. Approve connection in your Stacks wallet
4. Automatic redirect to manufacturer dashboard

#### **Step 2: Product Creation**
1. Access the dashboard sidebar
2. Click "Add New Product"
3. Fill in product details:
   - Product name and description
   - Batch number and manufacturing date
   - Quality certifications
   - Origin information
4. Submit to create blockchain record

#### **Step 3: QR Code Generation**
1. Select products from your inventory
2. Click "Generate QR Codes"
3. Bulk generate unique QR codes
4. Download QR codes for product labeling
5. Each QR links to blockchain verification

#### **Step 4: Monitor Dashboard**
- View real-time product statistics
- Track QR code generation count
- Monitor inventory levels
- Access wallet information

### **🏪 For Vendors & Warehouses**

#### **Step 1: Login & Setup**
1. Navigate to respective login portal
2. Connect Stacks wallet
3. Access role-specific dashboard

#### **Step 2: Product Scanning**
1. Use QR scanner feature
2. Scan manufacturer QR codes
3. Verify product authenticity
4. Update product status/location

#### **Step 3: Inventory Management**
1. View scanned products
2. Track product movements
3. Update checkpoint status
4. Monitor supply chain flow

### **👤 For Customers**

#### **Step 1: Product Scanning**
1. Open any QR code scanner app
2. Scan product QR code
3. Automatically redirected to product page

#### **Step 2: View Product Journey**
1. See animated timeline of product journey
2. View each supply chain stage:
   - **Farm Origin** - Harvest details and certifications
   - **Processing** - Quality control and facility info
   - **Distribution** - GPS tracking and delivery
   - **Retail** - Store location and pricing

#### **Step 3: Verification & Actions**
1. Verify blockchain authenticity
2. Download quality certificates
3. Report any issues
4. Access complete product history

### **🔗 Blockchain Interaction Flow**

#### **Smart Contract Functions**
```clarity
;; Create new product record
(create-product (product-id uint) (manufacturer principal) (metadata (string-ascii 256)))

;; Update product status
(update-status (product-id uint) (new-status (string-ascii 50)) (updater principal))

;; Verify product authenticity
(verify-product (product-id uint))

;; Transfer product ownership
(transfer-product (product-id uint) (from principal) (to principal))
```

#### **Frontend Integration**
```javascript
// Connect to Stacks wallet
const { userData, connectWallet } = useStacks();

// Create product on blockchain
const createProduct = async (productData) => {
  const contractCall = await makeContractCall({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'create-product',
    functionArgs: [/* product arguments */],
    senderKey: userSession.loadUserData().appPrivateKey,
  });
};
```

## 👥 **Team Members**

### **🚀 Development Team**

| Role | Name | GitHub | Contribution |
|------|------|--------|-------------|
| **Lead Developer & Blockchain Architect** | [Shashikumar Ezhilarasu](https://github.com/Shashikumar-ezhilarasu) | [@Shashikumar-ezhilarasu](https://github.com/Shashikumar-ezhilarasu) | Full-stack development, Smart contracts, System architecture |

### **🎯 Project Responsibilities**
- **Frontend Development** - React/Next.js application with modern UI/UX
- **Smart Contract Development** - Clarity contracts for supply chain logic
- **Blockchain Integration** - Stacks.js integration and wallet connectivity
- **Database Design** - Firebase Firestore schema and real-time features
- **UI/UX Design** - Modern interface with animations and responsive design
- **Documentation** - Comprehensive project documentation and guides

## 📸 **Screenshots & Demo**

### **🖼️ Application Screenshots**

#### **Hero Sections with Google Gemini Effect**
*[Add screenshot of animated login pages]*
- Manufacturer portal with animated background
- Vendor login with glassmorphism design
- Customer portal with scroll-based animations

#### **Dashboard Interfaces**
*[Add screenshots of each dashboard]*
- Manufacturer dashboard with real-time statistics
- Collapsible sidebar with wallet integration
- QR code generation interface
- Product management system

#### **Product Timeline**
*[Add screenshot of timeline animation]*
- Animated product journey visualization
- Interactive timeline with scroll progress
- Rich content cards with product details
- Mobile-responsive design

#### **QR Scanning Flow**
*[Add screenshots of scanning process]*
- QR code scanning interface
- Product verification page
- Blockchain confirmation display
- Certificate download options

### **🎥 Demo Videos**

#### **Platform Walkthrough**
*[Add video link showing complete platform tour]*
- User registration and wallet connection
- Dashboard navigation and features
- Product creation and QR generation process

#### **Supply Chain Journey**
*[Add video demonstrating end-to-end flow]*
- Manufacturer creating product
- Vendor/warehouse scanning checkpoints  
- Customer scanning and verification
- Blockchain verification process

#### **Smart Contract Interaction**
*[Add video showing blockchain features]*
- Contract deployment process
- Transaction creation and confirmation
- Real-time blockchain updates
- Wallet integration demonstration

### **📱 Mobile Experience**
*[Add mobile screenshots]*
- Responsive design across devices
- Touch-friendly QR scanning
- Mobile wallet integration
- Optimized timeline animations

## 🏗️ **Architecture & Code Quality**

### **📂 Project Structure**
```
echaindeply/
├── contracts/                   # Clarity smart contracts
│   ├── supply-chain-tracker.clar   # Main contract
│   ├── tests/                      # Contract tests
│   └── Clarinet.toml              # Clarinet configuration
├── app/                         # Next.js App Router
│   ├── customer/               # Customer portal pages
│   ├── manufacturer/           # Manufacturer portal pages
│   ├── vendor/                 # Vendor portal pages
│   ├── warehouse/              # Warehouse portal pages
│   └── globals.css             # Global styles
├── components/                  # React components
│   ├── ui/                     # shadcn/ui components
│   └── custom/                 # Custom components
├── hooks/                      # Custom React hooks
├── lib/                        # Utility libraries
├── public/                     # Static assets
├── styles/                     # Additional styles
├── scripts/                    # Deployment scripts
├── .env.example               # Environment variables template
├── README.md                  # Project documentation
└── package.json               # Dependencies and scripts
```

### **🔍 Code Quality Standards**

#### **Smart Contract Best Practices**
```clarity
;; supply-chain-tracker.clar
;; Main contract for supply chain product tracking

;; Define data structures
(define-map products 
  { product-id: uint } 
  { 
    manufacturer: principal,
    created-at: uint,
    metadata: (string-ascii 256),
    current-status: (string-ascii 50),
    is-verified: bool
  }
)

;; Create new product with validation
(define-public (create-product (product-id uint) (metadata (string-ascii 256)))
  (begin
    ;; Validate input parameters
    (asserts! (> product-id u0) (err u400))
    (asserts! (> (len metadata) u0) (err u401))
    
    ;; Check if product already exists
    (asserts! (is-none (map-get? products { product-id: product-id })) (err u402))
    
    ;; Create product record
    (map-set products 
      { product-id: product-id }
      {
        manufacturer: tx-sender,
        created-at: block-height,
        metadata: metadata,
        current-status: "created",
        is-verified: true
      }
    )
    
    ;; Emit event for frontend listening
    (print { event: "product-created", product-id: product-id, manufacturer: tx-sender })
    (ok product-id)
  )
)
```

#### **Frontend Code Standards**
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for consistent formatting
- **Component modularity** with single responsibility
- **Custom hooks** for reusable logic
- **Error boundaries** for robust error handling

#### **Testing Coverage**
```bash
# Run smart contract tests
clarinet test

# Run frontend tests
npm test

# Generate coverage report
npm run test:coverage
```

## 🚀 **Deployment Guide**

### **📍 Smart Contract Deployment**

#### **Testnet Deployment**
```bash
# Deploy to Stacks testnet
clarinet deploy --testnet

# Verify deployment
stx call_read_only_fn ST1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234 supply-chain-tracker get-product-count
```

#### **Frontend Deployment**
```bash
# Build production version
npm run build

# Deploy to Vercel
vercel deploy

# Or deploy to Netlify
netlify deploy --prod
```

### **🔧 Environment Configuration**
Ensure all environment variables are properly configured for production deployment.

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Stacks Foundation** - For providing the blockchain infrastructure
- **Clarity Language** - For smart contract development tools
- **shadcn/ui** - For the excellent component library
- **Next.js Team** - For the powerful React framework
- **Vercel** - For deployment and hosting platform

## 📞 **Support & Contact**

- **GitHub Issues**: [Report bugs or request features](https://github.com/Shashikumar-ezhilarasu/echaindeply-supplychain/issues)
- **Documentation**: [Project Wiki](https://github.com/Shashikumar-ezhilarasu/echaindeply-supplychain/wiki)
- **Email**: [Contact the developer](mailto:your-email@domain.com)

---

**🔗 Built with ❤️ on Stacks Blockchain by [Shashikumar Ezhilarasu](https://github.com/Shashikumar-ezhilarasu)**

*Revolutionizing supply chain transparency through blockchain technology, one scan at a time.*

### 🎯 **Key Features**

- **🔒 Blockchain Security** - Immutable records on Stacks blockchain
- **📱 QR Code Traceability** - Scan products to view complete journey
- **👥 Multi-Role Dashboard** - Manufacturer, Vendor, Warehouse, Customer portals
- **🎨 Modern UI/UX** - Google Gemini Effect animations & glassmorphism design
- **📊 Real-time Analytics** - Live product statistics and inventory tracking
- **🔐 Wallet Integration** - Secure Stacks wallet connectivity
- **📈 Interactive Timeline** - Animated product journey visualization

## 🚀 **Demo & Media**

### 📸 **Screenshots**
*Add your screenshots here:*
- Hero sections with Google Gemini Effect
- Dashboard interfaces
- QR scanning flow
- Timeline animations
- Wallet integration

### 🎥 **Video Demonstrations**
*Add your video links here:*
- Platform walkthrough
- QR scanning demo
- Dashboard functionality
- Blockchain verification process

## 🏗️ **Architecture**

### **Technology Stack**

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15.2.4 + React 19 | Modern web application framework |
| **Styling** | Tailwind CSS v4.1.12 | Utility-first CSS framework |
| **Components** | shadcn/ui | Pre-built accessible components |
| **Animations** | Framer Motion | Smooth animations and transitions |
| **Backend** | Firebase Firestore | Real-time database |
| **Blockchain** | Stacks | Decentralized verification layer |
| **Authentication** | Stacks Wallet | Blockchain-based authentication |
| **TypeScript** | Full type safety | Enhanced developer experience |

### **Project Structure**

```
echaindeply/
├── app/                          # Next.js App Router
│   ├── customer/                 # Customer portal
│   │   ├── [productId]/         # Dynamic product pages
│   │   ├── login/               # Customer authentication
│   │   └── scan-info/           # Product scanning interface
│   ├── manufacturer/            # Manufacturer portal
│   │   ├── dashboard/           # Manufacturing dashboard
│   │   ├── generate-qr/         # QR code generation
│   │   └── login/               # Manufacturer authentication
│   ├── vendor/                  # Vendor portal
│   │   ├── dashboard/           # Vendor management
│   │   ├── login/               # Vendor authentication
│   │   └── product-details/     # Product information
│   ├── warehouse/               # Warehouse portal
│   │   ├── dashboard/           # Warehouse operations
│   │   ├── login/               # Warehouse authentication
│   │   └── scan-checkpoint/     # Checkpoint scanning
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   └── page.js                  # Homepage
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   │   ├── google-gemini-effect.tsx    # Hero animations
│   │   ├── timeline.tsx         # Product journey timeline
│   │   └── [other-ui-components] # Various UI components
│   ├── sidebar-demo.tsx         # Dashboard sidebar
│   ├── timeline-demo.tsx        # Timeline implementation
│   └── [other-components]       # Feature components
├── hooks/                       # Custom React hooks
│   ├── use-mobile.ts           # Mobile detection
│   ├── use-toast.ts            # Toast notifications
│   └── use-stacks.js           # Stacks blockchain integration
├── lib/                         # Utility libraries
│   ├── firebase.js             # Firebase configuration
│   ├── utils.ts                # General utilities
│   └── stx-utils.js            # Stacks utilities
├── public/                      # Static assets
└── styles/                      # Additional styles
```

## 🎨 **User Interfaces**

### **1. Authentication Portals**
Each user role has a dedicated login portal with Google Gemini Effect animations:

- **🏭 Manufacturer Portal** - Product creation and QR generation
- **🏪 Vendor Portal** - Inventory management and product scanning
- **🏬 Warehouse Portal** - Checkpoint scanning and logistics
- **👤 Customer Portal** - Product verification and traceability

### **2. Dashboard Features**

#### **Manufacturer Dashboard**
- **Real-time Statistics** - Product count, QR codes generated, inventory levels
- **Product Management** - Create, edit, delete products
- **QR Code Generation** - Bulk QR creation with blockchain verification
- **Collapsible Sidebar** - Space-efficient navigation
- **Wallet Integration** - Stacks address display and management

#### **Customer Scan Interface**
- **Product Timeline** - Animated journey from origin to shelf
- **Verification Status** - Blockchain authenticity confirmation
- **Interactive Elements** - Download certificates, report issues
- **Rich Content** - Images, metadata, and quality scores

## ⚡ **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- npm or pnpm
- Stacks wallet (for blockchain features)
- Firebase account (for database)

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/Shashikumar-ezhilarasu/echaindeply-supplychain.git
cd echaindeply-supplychain
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Environment Setup**
Create a `.env.local` file:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stacks Network Configuration
NEXT_PUBLIC_STACKS_NETWORK=testnet
```

4. **Run the development server**
```bash
npm run dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 **Configuration**

### **Firebase Setup**
1. Create a Firebase project
2. Enable Firestore database
3. Add your web app configuration to `.env.local`

### **Stacks Wallet Integration**
1. Install a Stacks wallet (Hiro Wallet recommended)
2. Switch to testnet for development
3. Fund your wallet with testnet STX

### **shadcn/ui Components**
The project uses shadcn/ui with the following configuration:
```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## 📱 **Usage Guide**

### **For Manufacturers**
1. **Login** - Connect your Stacks wallet
2. **Create Products** - Add product details and specifications
3. **Generate QR Codes** - Create unique blockchain-verified QR codes
4. **Monitor Dashboard** - Track real-time statistics and inventory

### **For Vendors & Warehouses**
1. **Login** - Connect your Stacks wallet
2. **Scan Products** - Use QR scanner for product verification
3. **Update Status** - Log product movements and checkpoints
4. **Manage Inventory** - Track products through the supply chain

### **For Customers**
1. **Scan QR Code** - Use any QR scanner app
2. **View Timeline** - See complete product journey
3. **Verify Authenticity** - Check blockchain confirmation
4. **Access Details** - Download certificates and quality reports


## 🛠️ **Development**

### **Adding New Components**
```bash
npx shadcn-ui@latest add [component-name]
```

### **Code Structure**
- Follow Next.js App Router conventions
- Use TypeScript for type safety
- Implement proper error boundaries
- Follow accessibility guidelines

### **Styling Guidelines**
- Use Tailwind CSS utility classes
- Maintain dark theme consistency
- Implement responsive design
- Use CSS custom properties for themes

## 🚀 **Deployment**

### **Vercel (Recommended)**
```bash
npm run build
vercel deploy
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Follow code style conventions
- Ensure accessibility compliance

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **shadcn/ui** - For the excellent component library
- **Aceternity UI** - For animation inspirations
- **Stacks Foundation** - For blockchain infrastructure
- **Vercel** - For deployment platform
- **Next.js Team** - For the amazing framework

## 📞 **Support**

- **Documentation**: [Project Wiki](https://github.com/Shashikumar-ezhilarasu/echaindeply-supplychain/wiki)
- **Issues**: [GitHub Issues](https://github.com/Shashikumar-ezhilarasu/echaindeply-supplychain/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Shashikumar-ezhilarasu/echaindeply-supplychain/discussions)

## 🔮 **Roadmap**

- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] API integration for external systems
- [ ] Smart contract automation
- [ ] IoT device integration
- [ ] Machine learning predictions
- [ ] Enterprise SSO integration

---

**Built with ❤️ by [Shashikumar Ezhilarasu](https://github.com/Shashikumar-ezhilarasu)**

*Revolutionizing supply chain transparency, one scan at a time.*
