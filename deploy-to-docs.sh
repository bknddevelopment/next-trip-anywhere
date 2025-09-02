#!/bin/bash

# Deploy Next.js static site to GitHub Pages via /docs folder

echo "🚀 Starting deployment to /docs folder..."

# Build the project
echo "📦 Building the Next.js project..."
NODE_ENV=production npm run build

# Check if build was successful
if [ ! -d "out" ]; then
    echo "❌ Build failed: 'out' directory not found"
    exit 1
fi

# Remove old docs folder if it exists
if [ -d "docs" ]; then
    echo "🗑️  Removing old docs folder..."
    rm -rf docs
fi

# Copy the entire out folder to docs
echo "📋 Copying build output to docs folder..."
cp -r out docs

# Create .nojekyll file to prevent Jekyll processing
echo "📝 Creating .nojekyll file..."
touch docs/.nojekyll

# List the contents to verify
echo "✅ Deployment complete! Contents of docs folder:"
ls -la docs/

echo ""
echo "📌 Next steps:"
echo "1. Run: git add docs/"
echo "2. Run: git commit -m 'Deploy to GitHub Pages'"
echo "3. Run: git push"
echo ""
echo "Your site will be available at: https://bknddevelopment.github.io/next-trip-anywhere/"