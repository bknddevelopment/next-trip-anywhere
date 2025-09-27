#!/usr/bin/env node

/**
 * Test all routes from the sitemap
 * This ensures we're testing exactly what's exposed to search engines
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Statistics
let totalPages = 0;
let successfulPages = 0;
let failedPages = [];

/**
 * Fetch content from URL
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    client.get(url, { timeout: 10000 }, (res) => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({ statusCode: res.statusCode, data });
      });
    }).on('error', reject);
  });
}

/**
 * Parse URLs from sitemap XML
 */
function parseSitemapUrls(xml) {
  const urls = [];

  // Match all <loc> tags
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;

  while ((match = locRegex.exec(xml)) !== null) {
    const url = match[1];
    // Convert absolute URLs to paths
    if (url.startsWith('https://nexttripanywhere.com')) {
      urls.push(url.replace('https://nexttripanywhere.com', ''));
    } else if (url.startsWith('http://localhost')) {
      urls.push(url.replace(/http:\/\/localhost:\d+/, ''));
    } else if (url.startsWith('/')) {
      urls.push(url);
    }
  }

  // Also check for sitemap index references
  const sitemapRegex = /<sitemap>.*?<loc>(.*?)<\/loc>.*?<\/sitemap>/gs;
  const sitemapMatches = xml.matchAll(sitemapRegex);

  for (const match of sitemapMatches) {
    const sitemapUrl = match[1];
    if (sitemapUrl) {
      // Add referenced sitemaps to check
      urls.push('_SITEMAP_' + sitemapUrl);
    }
  }

  return urls;
}

/**
 * Test a single URL
 */
function testUrl(urlPath) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${urlPath}`;
    const client = url.startsWith('https') ? https : http;

    const request = client.get(url, { timeout: 10000 }, (res) => {
      const statusCode = res.statusCode;

      if (statusCode >= 200 && statusCode < 300) {
        successfulPages++;
        console.log(`${colors.green}✓${colors.reset} [${statusCode}] ${urlPath}`);
        resolve({ path: urlPath, status: statusCode, success: true });
      } else if (statusCode >= 300 && statusCode < 400) {
        successfulPages++; // Count redirects as success
        console.log(`${colors.yellow}→${colors.reset} [${statusCode}] ${urlPath} (redirect)`);
        resolve({ path: urlPath, status: statusCode, success: true });
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
 * Test routes in batches
 */
async function testAllRoutes(routes) {
  console.log(`${colors.cyan}Testing ${routes.length} routes from sitemap...${colors.reset}\n`);

  // Test in batches to avoid overwhelming the server
  const batchSize = 5;
  const delay = 200; // ms between batches

  for (let i = 0; i < routes.length; i += batchSize) {
    const batch = routes.slice(i, i + batchSize);
    await Promise.all(batch.map(testUrl));

    // Progress indicator
    const progress = Math.min(i + batchSize, routes.length);
    process.stdout.write(`\rProgress: ${progress}/${routes.length} pages tested...`);

    // Add delay between batches
    if (i + batchSize < routes.length) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  console.log('\n'); // New line after progress
}

/**
 * Fetch and parse all sitemaps recursively
 */
async function getAllUrlsFromSitemaps() {
  const allUrls = new Set();
  const sitemapsToCheck = ['/sitemap.xml'];
  const checkedSitemaps = new Set();

  while (sitemapsToCheck.length > 0) {
    const sitemapPath = sitemapsToCheck.pop();

    if (checkedSitemaps.has(sitemapPath)) {
      continue;
    }

    checkedSitemaps.add(sitemapPath);

    try {
      console.log(`${colors.cyan}Fetching sitemap: ${sitemapPath}${colors.reset}`);
      const sitemapUrl = `${BASE_URL}${sitemapPath}`;
      const { statusCode, data } = await fetchUrl(sitemapUrl);

      if (statusCode === 200) {
        const urls = parseSitemapUrls(data);

        for (const url of urls) {
          if (url.startsWith('_SITEMAP_')) {
            // This is a reference to another sitemap
            const referencedSitemap = url.replace('_SITEMAP_', '');
            const sitemapPath = referencedSitemap.replace(BASE_URL, '').replace('https://nexttripanywhere.com', '');
            if (!checkedSitemaps.has(sitemapPath)) {
              sitemapsToCheck.push(sitemapPath);
            }
          } else {
            allUrls.add(url);
          }
        }
      } else {
        console.log(`${colors.yellow}Warning: Could not fetch ${sitemapPath} (status ${statusCode})${colors.reset}`);
      }
    } catch (error) {
      console.log(`${colors.yellow}Warning: Error fetching ${sitemapPath}: ${error.message}${colors.reset}`);
    }
  }

  return Array.from(allUrls);
}

/**
 * Main execution
 */
async function main() {
  console.log(`${colors.blue}=================================`);
  console.log(`Sitemap Route Testing Tool`);
  console.log(`Testing against: ${BASE_URL}`);
  console.log(`=================================\n${colors.reset}`);

  try {
    // First, get all URLs from sitemap(s)
    const allRoutes = await getAllUrlsFromSitemaps();

    if (allRoutes.length === 0) {
      console.log(`${colors.red}No URLs found in sitemap!${colors.reset}`);
      console.log(`Make sure the server is running and sitemap is accessible at ${SITEMAP_URL}`);
      process.exit(1);
    }

    totalPages = allRoutes.length;

    // Sort for better readability
    allRoutes.sort();

    // Test critical routes first
    const criticalRoutes = [
      '/',
      '/blog',
      '/blog/japan-winter-olympics-2026-travel-packages-newark',
      '/cruises',
      '/destinations',
      '/packages',
    ];

    console.log(`\n${colors.cyan}Testing critical routes first...${colors.reset}\n`);
    for (const route of criticalRoutes) {
      if (allRoutes.includes(route)) {
        await testUrl(route);
      }
    }

    // Test remaining routes
    console.log(`\n${colors.cyan}Testing all remaining routes...${colors.reset}\n`);
    const remainingRoutes = allRoutes.filter(r => !criticalRoutes.includes(r));
    await testAllRoutes(remainingRoutes);

    // Print summary
    console.log(`\n${colors.blue}=================================`);
    console.log(`Test Summary`);
    console.log(`=================================\n${colors.reset}`);

    console.log(`Total pages in sitemap: ${totalPages}`);
    console.log(`${colors.green}Successful:${colors.reset} ${successfulPages}`);
    console.log(`${colors.red}Failed:${colors.reset} ${failedPages.length}`);

    // Show failed pages if any
    if (failedPages.length > 0) {
      console.log(`\n${colors.red}Failed Pages:${colors.reset}`);

      // Group by error type
      const errors404 = failedPages.filter(p => p.status === 404);
      const errors500 = failedPages.filter(p => p.status >= 500);
      const otherErrors = failedPages.filter(p => !p.status || (p.status !== 404 && p.status < 500));

      if (errors404.length > 0) {
        console.log(`\n  404 Not Found (${errors404.length}):`);
        errors404.slice(0, 20).forEach(page => {
          console.log(`    - ${page.path}`);
        });
        if (errors404.length > 20) {
          console.log(`    ... and ${errors404.length - 20} more`);
        }
      }

      if (errors500.length > 0) {
        console.log(`\n  Server Errors (${errors500.length}):`);
        errors500.forEach(page => {
          console.log(`    - ${page.path}: HTTP ${page.status}`);
        });
      }

      if (otherErrors.length > 0) {
        console.log(`\n  Other Errors (${otherErrors.length}):`);
        otherErrors.forEach(page => {
          if (page.error) {
            console.log(`    - ${page.path}: ${page.error}`);
          } else {
            console.log(`    - ${page.path}: HTTP ${page.status}`);
          }
        });
      }
    }

    // Success rate
    const successRate = ((successfulPages / totalPages) * 100).toFixed(1);
    console.log(`\n${colors.cyan}Success Rate: ${successRate}%${colors.reset}`);

    // Check specific important pages
    const importantPages = [
      '/blog/japan-winter-olympics-2026-travel-packages-newark',
      '/',
      '/cruises',
      '/destinations',
      '/packages',
    ];

    console.log(`\n${colors.blue}Important Pages Status:${colors.reset}`);
    importantPages.forEach(page => {
      const failed = failedPages.find(f => f.path === page);
      if (failed) {
        console.log(`  ${colors.red}✗${colors.reset} ${page}`);
      } else {
        console.log(`  ${colors.green}✓${colors.reset} ${page}`);
      }
    });

    // Exit with appropriate code
    if (failedPages.length > totalPages * 0.1) { // More than 10% failure
      console.log(`\n${colors.red}❌ Too many pages failed (more than 10%)${colors.reset}`);
      process.exit(1);
    } else if (failedPages.length > 0) {
      console.log(`\n${colors.yellow}⚠️  Some pages failed, but success rate is above 90%${colors.reset}`);
      process.exit(0);
    } else {
      console.log(`\n${colors.green}✅ All pages loaded successfully!${colors.reset}`);
      process.exit(0);
    }
  } catch (error) {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { parseSitemapUrls, testUrl };