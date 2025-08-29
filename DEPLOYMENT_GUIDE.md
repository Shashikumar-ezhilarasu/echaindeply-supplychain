# Stacks Testnet Deployment Guide

## Prerequisites

1. **Leather Wallet** with testnet STX tokens
2. **Testnet STX Faucet**: https://explorer.hiro.so/sandbox/faucet?chain=testnet

## Quick Deployment Steps

### Option 1: Using the Deployment Script (Recommended)

```bash
# 1. Set your mnemonic (get this from Leather wallet)
export STACKS_MNEMONIC="your twelve word mnemonic phrase here"

# 2. Run the deployment script
./deploy-testnet.sh
```

### Option 2: Manual Deployment

1. **Update Testnet.toml**:
   - Replace `<YOUR PRIVATE TESTNET MNEMONIC HERE>` with your actual mnemonic
   - Get mnemonic from Leather: Settings → Secret Key → Show Secret Key

2. **Generate deployment plan**:
   ```bash
   clarinet deployment generate --testnet
   ```

3. **Deploy to testnet**:
   ```bash
   clarinet deployment apply --testnet
   ```

## Getting Testnet STX

1. **Switch Leather to Testnet** (network selector → Testnet)
2. **Copy your testnet address** from Leather
3. **Visit faucet**: https://explorer.hiro.so/sandbox/faucet?chain=testnet
4. **Request STX tokens** (enter your address)
5. **Wait for confirmation** (1-2 minutes)

## After Deployment

1. **View on Explorer**: https://explorer.hiro.so/?chain=testnet
2. **Search for your address** to find your deployed contract
3. **Contract functions** will be available for interaction

## Security Notes

- ⚠️ Never commit your real mnemonic to version control
- ✅ Use environment variables for sensitive data
- 🔒 Keep your mnemonic secure and private

## Contract Features

Your deployed contract will provide:

- ✅ **Product Digital Birth Certificates**
- ✅ **Supply Chain Event Tracking**
- ✅ **Authorization Management**
- ✅ **Complete Product Traceability**
- ✅ **Anti-counterfeiting Protection**

## Interaction Examples

Once deployed, you can:

1. **Authorize supply chain parties**
2. **Create product digital certificates**
3. **Track products through supply chain**
4. **Query product history**
5. **Verify product authenticity**

## Troubleshooting

- **"Invalid mnemonic"**: Check word count (must be 12, 15, 18, 21, or 24 words)
- **"Insufficient funds"**: Get more testnet STX from the faucet
- **"Network error"**: Check internet connection and testnet status
- **"Contract already exists"**: Use a different contract name or deployer address
