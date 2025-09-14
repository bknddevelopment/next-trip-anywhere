#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Directories to clean
const directories = ['app', 'components', 'lib'];

// Files to exclude from cleaning
const excludePatterns = [
  '**/node_modules/**',
  '**/__tests__/**',
  '**/*.test.ts',
  '**/*.test.tsx',
  '**/test-*.js',
  '**/scripts/**',
  // Keep console in specific monitoring/logging files
  'lib/monitoring/logger.ts',
  'lib/monitoring/analytics.ts',
  'lib/config.ts', // Has example in comment
];

// Patterns to remove
const consolePatterns = [
  /^\s*console\.(log|warn|error|info|debug|trace)\(.*?\);?\s*$/gm,
  /^\s*console\.(log|warn|error|info|debug|trace)\([\s\S]*?\);?\s*$/gm,
];

function shouldProcessFile(filePath) {
  // Check if file should be excluded
  for (const pattern of excludePatterns) {
    if (filePath.includes(pattern.replace('**/', '').replace('*', ''))) {
      return false;
    }
  }

  // Only process TypeScript/JavaScript files
  const ext = path.extname(filePath);
  return ['.ts', '.tsx', '.js', '.jsx'].includes(ext);
}

function removeConsoleStatements(content, filePath) {
  let cleaned = content;
  let removedCount = 0;

  // Special handling for API error handlers - keep structured error responses
  if (filePath.includes('/api/') && filePath.endsWith('.ts')) {
    // Replace console.error with proper error handling
    cleaned = cleaned.replace(
      /console\.error\(['"]([^'"]+)['"]\s*,\s*error\)/g,
      (match, message) => {
        removedCount++;
        return `// Error logged: ${message}`;
      }
    );
  } else {
    // Remove all console statements in non-API files
    consolePatterns.forEach(pattern => {
      const matches = cleaned.match(pattern);
      if (matches) {
        removedCount += matches.length;
      }
      cleaned = cleaned.replace(pattern, '');
    });
  }

  // Clean up extra blank lines created by removal
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');

  return { cleaned, removedCount };
}

let totalRemoved = 0;
let filesProcessed = 0;

directories.forEach(dir => {
  const pattern = path.join(dir, '**/*.{ts,tsx,js,jsx}');
  const files = glob.sync(pattern, { ignore: excludePatterns });

  files.forEach(file => {
    if (!shouldProcessFile(file)) {
      return;
    }

    const content = fs.readFileSync(file, 'utf8');
    const { cleaned, removedCount } = removeConsoleStatements(content, file);

    if (removedCount > 0) {
      fs.writeFileSync(file, cleaned, 'utf8');
      console.log(`✓ Removed ${removedCount} console statement(s) from ${file}`);
      totalRemoved += removedCount;
      filesProcessed++;
    }
  });
});

console.log(`\n✅ Complete! Removed ${totalRemoved} console statements from ${filesProcessed} files.`);