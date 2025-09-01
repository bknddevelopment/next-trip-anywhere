#!/bin/bash

# Complete deployment script for Next Trip Anywhere
# This script handles git commits, pushes, and GitHub Pages deployment

echo "========================================="
echo "🚀 Next Trip Anywhere - Complete Deployment"
echo "========================================="

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check command success
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1 successful${NC}"
    else
        echo -e "${RED}❌ $1 failed${NC}"
        exit 1
    fi
}

# Navigate to project directory
cd /Users/charwinvanryckdegroot/Github/Next Trip Anywhere

echo -e "\n${YELLOW}📋 Step 1: Checking Git Status${NC}"
echo "----------------------------------------"
git status --short

echo -e "\n${YELLOW}📝 Step 2: Adding all changes to git${NC}"
echo "----------------------------------------"
git add .
check_status "Git add"

echo -e "\n${YELLOW}💾 Step 3: Committing changes${NC}"
echo "----------------------------------------"
git commit -m "Deploy Next Trip Anywhere to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"
check_status "Git commit"

echo -e "\n${YELLOW}⬆️ Step 4: Pushing to GitHub repository${NC}"
echo "----------------------------------------"
git push origin main
check_status "Git push"

echo -e "\n${YELLOW}🔨 Step 5: Building production application${NC}"
echo "----------------------------------------"
cd next-trip-anywhere

# Clean previous build
rm -rf dist
echo "Cleaned previous build directory"

# Install dependencies if needed
echo "Checking dependencies..."
npm install
check_status "Dependencies installation"

# Build the project
npm run build
check_status "Build"

# Check if build was successful
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "\n${YELLOW}📄 Step 6: Preparing for GitHub Pages${NC}"
echo "----------------------------------------"

# Copy index.html to 404.html for SPA routing
cp dist/index.html dist/404.html
echo "Created 404.html for SPA routing"

# Add .nojekyll file
touch dist/.nojekyll
echo "Added .nojekyll file"

echo -e "\n${YELLOW}🚢 Step 7: Deploying to GitHub Pages${NC}"
echo "----------------------------------------"
npx gh-pages -d dist --dotfiles
check_status "GitHub Pages deployment"

echo -e "\n${GREEN}=========================================${NC}"
echo -e "${GREEN}✨ DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${YELLOW}📌 Important Information:${NC}"
echo "----------------------------------------"
echo "🌐 Your site is being deployed to:"
echo "   https://bknddevelopment.github.io/next-trip-anywhere/"
echo ""
echo "⏱️  Deployment Status:"
echo "   - GitHub Pages processing may take 2-10 minutes"
echo "   - Check Actions tab in GitHub for deployment progress"
echo ""
echo "🔍 To verify deployment:"
echo "   1. Visit the URL above"
echo "   2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R) if seeing old content"
echo "   3. Check GitHub repo Settings > Pages for status"
echo ""
echo -e "${GREEN}🎉 Ready to share with your client!${NC}"