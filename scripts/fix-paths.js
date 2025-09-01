#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BASE_PATH = '/next-trip-anywhere';
const OUT_DIR = path.join(__dirname, '..', 'out');

// Function to fix paths in HTML files
function fixPathsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix image src paths for local images
  content = content.replace(/src="\/([^"]+\.(png|jpg|jpeg|gif|svg|ico|PNG|JPG|JPEG|GIF|SVG|ICO))"/g, (match, p1) => {
    // Skip if already has base path or is external URL
    if (match.includes(BASE_PATH) || match.includes('http')) {
      return match;
    }
    modified = true;
    return `src="${BASE_PATH}/${p1}"`;
  });

  // Fix favicon and other meta image paths
  content = content.replace(/href="\/([^"]+\.(ico|png|svg|ICO|PNG|SVG))"/g, (match, p1) => {
    // Skip if already has base path or is external URL
    if (match.includes(BASE_PATH) || match.includes('http')) {
      return match;
    }
    modified = true;
    return `href="${BASE_PATH}/${p1}"`;
  });

  // Fix Open Graph image paths
  content = content.replace(/content="\/([^"]+\.(jpg|png|jpeg|JPG|PNG|JPEG))"/g, (match, p1) => {
    // Skip if already has base path or is external URL
    if (match.includes(BASE_PATH) || match.includes('http')) {
      return match;
    }
    modified = true;
    return `content="${BASE_PATH}/${p1}"`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed paths in: ${path.relative(OUT_DIR, filePath)}`);
  }
}

// Function to recursively find all HTML files
function findHtmlFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findHtmlFiles(fullPath));
    } else if (item.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Main execution
console.log('Fixing asset paths for GitHub Pages deployment...');
console.log(`Base path: ${BASE_PATH}`);
console.log(`Output directory: ${OUT_DIR}`);

try {
  const htmlFiles = findHtmlFiles(OUT_DIR);
  console.log(`Found ${htmlFiles.length} HTML files to process`);

  htmlFiles.forEach(fixPathsInFile);

  console.log('✅ Path fixing complete!');
} catch (error) {
  console.error('❌ Error fixing paths:', error);
  process.exit(1);
}