#!/usr/bin/env node

/**
 * Test all routes in the Next.js application
 * Verifies that all pages return successful status codes
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const DOCS_DIR = path.join(process.cwd(), 'docs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Statistics
let totalPages = 0;
let successfulPages = 0;
let failedPages = [];
let redirectedPages = [];

/**
 * Get all HTML files from docs directory
 */
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip _next directory and other build artifacts
      if (!file.startsWith('_') && file !== 'node_modules') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file === 'index.html') {
      // Convert file path to URL path
      const urlPath = filePath
        .replace(DOCS_DIR, '')
        .replace(/\/index\.html$/, '')
        .replace(/\\/g, '/');

      fileList.push(urlPath || '/');
    }
  });

  return fileList;
}

/**
 * Test a single URL
 */
function testUrl(urlPath) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${urlPath}`;

    const request = http.get(url, { timeout: 10000 }, (res) => {
      const statusCode = res.statusCode;

      if (statusCode >= 200 && statusCode < 300) {
        successfulPages++;
        console.log(`${colors.green}✓${colors.reset} [${statusCode}] ${urlPath}`);
        resolve({ path: urlPath, status: statusCode, success: true });
      } else if (statusCode >= 300 && statusCode < 400) {
        redirectedPages.push({ path: urlPath, status: statusCode });
        console.log(`${colors.yellow}→${colors.reset} [${statusCode}] ${urlPath}`);
        resolve({ path: urlPath, status: statusCode, redirect: true });
      } else {
        failedPages.push({ path: urlPath, status: statusCode });
        console.log(`${colors.red}✗${colors.reset} [${statusCode}] ${urlPath}`);
        resolve({ path: urlPath, status: statusCode, success: false });
      }
    });

    request.on('error', (error) => {
      failedPages.push({ path: urlPath, error: error.message });
      console.log(`${colors.red}✗${colors.reset} [ERROR] ${urlPath}: ${error.message}`);
      resolve({ path: urlPath, error: error.message, success: false });
    });

    request.on('timeout', () => {
      request.destroy();
      failedPages.push({ path: urlPath, error: 'Timeout' });
      console.log(`${colors.red}✗${colors.reset} [TIMEOUT] ${urlPath}`);
      resolve({ path: urlPath, error: 'Timeout', success: false });
    });
  });
}

/**
 * Test all routes with rate limiting
 */
async function testAllRoutes(routes) {
  console.log(`${colors.cyan}Testing ${routes.length} routes...${colors.reset}\n`);

  // Process in batches to avoid overwhelming the server
  const batchSize = 10;
  const delay = 100; // ms between batches

  for (let i = 0; i < routes.length; i += batchSize) {
    const batch = routes.slice(i, i + batchSize);
    await Promise.all(batch.map(testUrl));

    // Add delay between batches
    if (i + batchSize < routes.length) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log(`${colors.blue}=================================`);
  console.log(`Route Testing Tool`);
  console.log(`Testing against: ${BASE_URL}`);
  console.log(`=================================\n${colors.reset}`);

  // Check if docs directory exists
  if (!fs.existsSync(DOCS_DIR)) {
    console.error(`${colors.red}Error: docs directory not found. Run 'npm run build' first.${colors.reset}`);
    process.exit(1);
  }

  // Get all routes
  const routes = getAllHtmlFiles(DOCS_DIR);
  totalPages = routes.length;

  // Sort routes for better readability
  routes.sort();

  // Test all routes
  await testAllRoutes(routes);

  // Print summary
  console.log(`\n${colors.blue}=================================`);
  console.log(`Test Summary`);
  console.log(`=================================\n${colors.reset}`);

  console.log(`Total pages tested: ${totalPages}`);
  console.log(`${colors.green}Successful (2xx):${colors.reset} ${successfulPages}`);
  console.log(`${colors.yellow}Redirected (3xx):${colors.reset} ${redirectedPages.length}`);
  console.log(`${colors.red}Failed (4xx/5xx):${colors.reset} ${failedPages.length}`);

  // Show failed pages if any
  if (failedPages.length > 0) {
    console.log(`\n${colors.red}Failed Pages:${colors.reset}`);
    failedPages.forEach(page => {
      if (page.error) {
        console.log(`  - ${page.path}: ${page.error}`);
      } else {
        console.log(`  - ${page.path}: HTTP ${page.status}`);
      }
    });
  }

  // Show redirected pages if any
  if (redirectedPages.length > 0) {
    console.log(`\n${colors.yellow}Redirected Pages:${colors.reset}`);
    redirectedPages.forEach(page => {
      console.log(`  - ${page.path}: HTTP ${page.status}`);
    });
  }

  // Success rate
  const successRate = ((successfulPages / totalPages) * 100).toFixed(1);
  console.log(`\n${colors.cyan}Success Rate: ${successRate}%${colors.reset}`);

  // Exit with appropriate code
  if (failedPages.length > 0) {
    console.log(`\n${colors.red}❌ Some pages failed to load${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✅ All pages loaded successfully!${colors.reset}`);
    process.exit(0);
  }
}

// Run if not in test mode
if (require.main === module) {
  main().catch(error => {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { getAllHtmlFiles, testUrl };