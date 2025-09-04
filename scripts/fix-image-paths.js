#!/usr/bin/env node

/**
 * Post-build script to fix image paths for GitHub Pages deployment
 * Next.js doesn't apply the basePath to image src attributes during static export
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const BASE_PATH = '/next-trip-anywhere';
const OUT_DIR = path.join(__dirname, '..', 'docs');

console.log('Fixing image paths for GitHub Pages deployment...');

// Find all HTML files
const htmlFiles = glob.sync(`${OUT_DIR}/**/*.html`);

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  
  // Fix logo references
  if (content.includes('src="/NextTripAnywhere.PNG"')) {
    content = content.replace(
      /src="\/NextTripAnywhere\.PNG"/g,
      `src="${BASE_PATH}/NextTripAnywhere.PNG"`
    );
    modified = true;
  }
  
  // Fix any other local image references (but not external URLs)
  content = content.replace(
    /src="\/([^"]+\.(png|jpg|jpeg|gif|webp|svg))"/gi,
    (match, imagePath) => {
      // Don't modify if already has base path
      if (imagePath.startsWith('next-trip-anywhere/')) {
        return match;
      }
      return `src="${BASE_PATH}/${imagePath}"`;
    }
  );
  
  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed: ${path.relative(OUT_DIR, file)}`);
  }
});

console.log('Image path fixing complete!');