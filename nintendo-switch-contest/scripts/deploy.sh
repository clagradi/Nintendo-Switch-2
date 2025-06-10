#!/bin/bash

# =================================================================
# Nintendo Switch Contest - Deploy Script
# =================================================================

echo "🎮 Nintendo Switch Contest - Deployment Assistant"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Run this script from the project root.${NC}"
    exit 1
fi

echo -e "${BLUE}🔍 Checking dependencies...${NC}"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install dependencies${NC}"
        exit 1
    fi
fi

echo -e "${BLUE}🔧 Running code quality checks...${NC}"

# Type checking
echo -e "${YELLOW}📝 Type checking...${NC}"
npm run typecheck
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ TypeScript errors found. Please fix before deploying.${NC}"
    exit 1
fi

# Linting
echo -e "${YELLOW}🔍 Linting code...${NC}"
npm run lint
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️ Linting warnings found. Consider fixing them.${NC}"
fi

echo -e "${BLUE}🏗️ Building application...${NC}"

# Build the application
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed. Please fix errors before deploying.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️ Warning: .env file not found. Make sure environment variables are set in Vercel.${NC}"
fi

echo -e "${BLUE}🚀 Ready for deployment!${NC}"
echo ""
echo "Next steps:"
echo "1. 📋 Ensure all environment variables are set in Vercel Dashboard"
echo "2. 🔗 Configure your Stripe webhook URL: https://your-app.vercel.app/api/webhook" 
echo "3. 📊 Set up your Supabase database table (see VERCEL_DEPLOY.md)"
echo "4. 🌐 Deploy to Vercel: vercel --prod"
echo ""
echo -e "${GREEN}🎉 Good luck with your Nintendo Switch contest!${NC}"
