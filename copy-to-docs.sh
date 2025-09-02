#!/bin/bash

# Simple script to copy out to docs for GitHub Pages deployment

echo "🚀 Copying built site to /docs folder for GitHub Pages..."

# Remove old docs folder if it exists
if [ -d "docs" ]; then
    echo "🗑️  Removing old docs folder..."
    rm -rf docs
fi

# Copy the entire out folder to docs
echo "📋 Copying out folder to docs..."
cp -r out docs

# Create .nojekyll file to prevent Jekyll processing
echo "📝 Creating .nojekyll file..."
touch docs/.nojekyll

echo "✅ Done! The docs folder has been created."
echo ""
echo "Next steps:"
echo "1. git add docs/"
echo "2. git commit -m 'Add docs folder for GitHub Pages deployment'"
echo "3. git push"
echo ""
echo "Your site should be available at: https://bknddevelopment.github.io/next-trip-anywhere/"