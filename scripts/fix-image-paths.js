#!/usr/bin/env node

/**
 * Post-build script to ensure image paths work correctly for custom domain deployment
 * Since we're using a custom domain (nexttripanywhere.com), we don't need to add a base path
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const OUT_DIR = path.join(__dirname, '..', 'docs');

console.log('Verifying image paths for custom domain deployment...');

// Find all HTML files
const htmlFiles = glob.sync(`${OUT_DIR}/**/*.html`);

let filesChecked = 0;
let issuesFound = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  filesChecked++;
  
  // Check if there are any problematic base path references that need to be removed
  if (content.includes('/next-trip-anywhere/')) {
    content = content.replace(/\/next-trip-anywhere\//g, '/');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed base path references in: ${path.relative(OUT_DIR, file)}`);
    issuesFound++;
  }
});

console.log(`Image path verification complete! Checked ${filesChecked} files, fixed ${issuesFound} issues.`);