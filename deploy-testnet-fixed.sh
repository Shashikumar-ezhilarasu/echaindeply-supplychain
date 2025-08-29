#!/bin/bash

# Deployment script for Stacks Testnet
# This script securely deploys your product traceability contract

echo "🚀 Deploying Product Traceability Contract to Stacks Testnet"
echo "============================================================"

# Check if mnemonic is provided
if [ -z "$STACKS_MNEMONIC" ]; then
    echo "❌ Error: Please set your STACKS_MNEMONIC environment variable"
    echo ""
    echo "Usage:"
    echo "  export STACKS_MNEMONIC=\"your twelve word mnemonic phrase here\""
    echo "  ./deploy-testnet.sh"
    echo ""
    echo "To get your mnemonic from Leather wallet:"
    echo "  1. Open Leather wallet"
    echo "  2. Switch to Testnet network"
    echo "  3. Go to Settings → Secret Key → Show Secret Key"
    echo "  4. Copy your mnemonic phrase"
    echo ""
    exit 1
fi

# Clean the mnemonic (remove newlines and extra spaces)
CLEAN_MNEMONIC=$(echo "$STACKS_MNEMONIC" | tr -d '\n\r' | xargs)

echo "📋 Checking deployment requirements..."

# Backup original config
cp settings/Testnet.toml settings/Testnet.toml.backup

# Create a temporary config with the actual mnemonic
cat > settings/Testnet.toml << EOF
[network]
name = "testnet"
stacks_node_rpc_address = "https://api.testnet.hiro.so"
deployment_fee_rate = 10

[accounts.deployer]
mnemonic = "$CLEAN_MNEMONIC"
EOF

echo "✅ Configuration updated"

# Try to generate deployment plan
echo "📝 Generating deployment plan..."
clarinet deployment generate --testnet

if [ $? -eq 0 ]; then
    echo "✅ Deployment plan generated successfully"
    
    # Show the deployment plan
    if [ -f "deployments/default.testnet-plan.yaml" ]; then
        echo ""
        echo "📋 Deployment Plan:"
        echo "==================="
        cat deployments/default.testnet-plan.yaml
    fi
    
    echo ""
    echo "🎯 Ready to deploy!"
    echo ""
    read -p "Do you want to proceed with deployment? (y/N): " confirm
    
    if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
        echo ""
        echo "🚀 Deploying to Stacks Testnet..."
        clarinet deployment apply --testnet
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "🎉 SUCCESS! Your Product Traceability Contract is now live on Stacks Testnet!"
            echo ""
            echo "📍 You can view your contract on the Stacks Explorer:"
            echo "   https://explorer.hiro.so/?chain=testnet"
            echo ""
            echo "🔍 Search for your deployer address to find your contract"
        else
            echo "❌ Deployment failed. Check the error messages above."
        fi
    else
        echo "❌ Deployment cancelled."
    fi
else
    echo "❌ Failed to generate deployment plan."
    echo ""
    echo "Let's try a manual deployment approach..."
    
    echo "🔄 Attempting direct deployment..."
    clarinet deployment apply --testnet --no-dashboard
    
    if [ $? -eq 0 ]; then
        echo "✅ Direct deployment successful!"
    else
        echo "❌ Direct deployment also failed."
        echo ""
        echo "💡 Manual deployment steps:"
        echo "1. Your mnemonic is now in settings/Testnet.toml"
        echo "2. Run: clarinet deployment generate --testnet"
        echo "3. Run: clarinet deployment apply --testnet"
    fi
fi

# Restore original config
if [ -f "settings/Testnet.toml.backup" ]; then
    mv settings/Testnet.toml.backup settings/Testnet.toml
fi

echo ""
echo "🔒 Configuration restored to secure state"
