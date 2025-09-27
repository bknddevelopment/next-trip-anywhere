#!/usr/bin/env node

/**
 * Test all Next.js routes based on the app directory structure
 * This script extracts all possible routes from the Next.js app directory
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const APP_DIR = path.join(process.cwd(), 'app');

// Import data files to get dynamic route params
const { blogPosts } = require('../lib/data/blog-posts');
const { cruiseDestinations } = require('../lib/data/cruises');
const { destinations } = require('../lib/data/destinations');
const { essexCountyCities } = require('../lib/data/essex-county-cities');
const { services } = require('../lib/data/essex-county-services');
const { seasonalDeals } = require('../lib/data/seasonal-deals');
const { vacationPackages } = require('../lib/data/vacation-packages');
const { travelGuides } = require('../lib/data/travel-guides');

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
 * Get all static routes
 */
function getStaticRoutes() {
  return [
    '/',
    '/about',
    '/contact',
    '/flights',
    '/cruises',
    '/destinations',
    '/packages',
    '/services',
    '/tools',
    '/tools/budget-planner',
    '/tools/cruise-comparison',
    '/tools/cruise-price-calculator',
    '/tools/itinerary-builder',
    '/tools/packing-checklist',
    '/blog',
    '/essex-county',
    '/all-inclusive-resorts-from-newark',
    '/admin/seo-dashboard',
    '/test',
    '/test-ab',
    // Static cruise pages
    '/cruises/2025',
    '/cruises/alaska',
    '/cruises/bahamas',
    '/cruises/caribbean',
    '/cruises/deals',
    '/cruises/european',
    '/cruises/hawaii',
    '/cruises/last-minute',
    '/cruises/mediterranean',
    '/cruises/from-newark',
    '/cruises/cape-liberty-port',
    '/cruises/royal-caribbean',
    '/cruises/royal-caribbean/deals',
    '/cruises/royal-caribbean/ships',
    '/cruises/carnival',
    '/cruises/norwegian',
    '/cruises/norwegian/deals',
    '/cruises/princess',
    '/cruises/princess/deals',
    '/cruises/celebrity',
    '/cruises/cheap-cruises',
    '/cruises/caribbean-cruises',
    '/cruises/alaska-cruises',
    // From pages
    '/from/nyc',
    '/from/atlanta',
    '/from/austin',
    '/from/boston',
    '/from/chicago',
    '/from/dallas',
    '/from/dc',
    '/from/denver',
    '/from/houston',
    '/from/losangeles',
    '/from/miami',
    '/from/philadelphia',
    '/from/phoenix',
    '/from/sandiego',
    '/from/sanfrancisco',
    '/from/seattle',
    // Seasonal deals hub
    '/deals/seasonal',
  ];
}

/**
 * Get all dynamic routes based on data files
 */
function getDynamicRoutes() {
  const routes = [];

  // Blog posts
  if (blogPosts && Array.isArray(blogPosts)) {
    blogPosts.forEach(post => {
      if (post.slug) {
        routes.push(`/blog/${post.slug}`);
      }
    });
  }

  // Cruise destinations
  if (cruiseDestinations && Array.isArray(cruiseDestinations)) {
    cruiseDestinations.forEach(cruise => {
      if (cruise.slug) {
        routes.push(`/cruises/${cruise.slug}`);
      }
    });
  }

  // Destinations
  if (destinations && Array.isArray(destinations)) {
    destinations.forEach(dest => {
      if (dest.slug) {
        routes.push(`/destinations/${dest.slug}`);
      }
    });
  }

  // Vacation packages
  if (vacationPackages && Array.isArray(vacationPackages)) {
    vacationPackages.forEach(pkg => {
      if (pkg.slug) {
        routes.push(`/packages/${pkg.slug}`);
      }
    });
  }

  // Travel guides
  if (travelGuides && Array.isArray(travelGuides)) {
    travelGuides.forEach(guide => {
      if (guide.slug) {
        routes.push(`/travel-guides/${guide.slug}`);
      }
    });
  }

  // Seasonal deals
  if (seasonalDeals && Array.isArray(seasonalDeals)) {
    seasonalDeals.forEach(deal => {
      if (deal.slug) {
        routes.push(`/deals/seasonal/${deal.slug}`);
      }
    });
  }

  // Essex County cities and services
  if (essexCountyCities && Array.isArray(essexCountyCities)) {
    essexCountyCities.forEach(city => {
      if (city.slug) {
        // Main city page
        routes.push(`/locations/essex-county/${city.slug}`);
        routes.push(`/travel-from-${city.slug}`);

        // Service pages
        if (services && Array.isArray(services)) {
          services.forEach(service => {
            if (service.slug) {
              routes.push(`/locations/essex-county/${city.slug}/${service.slug}`);
              routes.push(`/travel-from-${city.slug}/${service.slug}`);
            }
          });
        }
      }
    });
  }

  // Add guide placeholder (temporary until guides are re-enabled)
  routes.push('/guides/placeholder');

  return routes;
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
        console.log(`${colors.yellow}→${colors.reset} [${statusCode}] ${urlPath} (redirect)`);
        successfulPages++; // Count redirects as success
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
  console.log(`${colors.cyan}Testing ${routes.length} routes...${colors.reset}\n`);

  // Test in smaller batches to avoid overwhelming the server
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
 * Main execution
 */
async function main() {
  console.log(`${colors.blue}=================================`);
  console.log(`Next.js Route Testing Tool`);
  console.log(`Testing against: ${BASE_URL}`);
  console.log(`=================================\n${colors.reset}`);

  // Get all routes
  const staticRoutes = getStaticRoutes();
  const dynamicRoutes = getDynamicRoutes();
  const allRoutes = [...new Set([...staticRoutes, ...dynamicRoutes])]; // Remove duplicates

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

  console.log(`${colors.cyan}Testing critical routes first...${colors.reset}\n`);
  for (const route of criticalRoutes) {
    if (allRoutes.includes(route)) {
      await testUrl(route);
    }
  }

  console.log(`\n${colors.cyan}Testing all remaining routes...${colors.reset}\n`);
  const remainingRoutes = allRoutes.filter(r => !criticalRoutes.includes(r));
  await testAllRoutes(remainingRoutes);

  // Print summary
  console.log(`\n${colors.blue}=================================`);
  console.log(`Test Summary`);
  console.log(`=================================\n${colors.reset}`);

  console.log(`Total pages tested: ${totalPages}`);
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
      errors404.slice(0, 10).forEach(page => {
        console.log(`    - ${page.path}`);
      });
      if (errors404.length > 10) {
        console.log(`    ... and ${errors404.length - 10} more`);
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
  if (failedPages.length > 0) {
    console.log(`\n${colors.yellow}⚠️  Some pages failed to load${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✅ All pages loaded successfully!${colors.reset}`);
    process.exit(0);
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch(error => {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
    console.error(error.stack);
    process.exit(1);
  });
}

module.exports = { getStaticRoutes, getDynamicRoutes };