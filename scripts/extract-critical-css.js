#!/usr/bin/env node

/**
 * Critical CSS Extraction Script
 *
 * This script extracts critical above-the-fold CSS for key page types
 * and generates route-specific CSS bundles to reduce initial load times.
 *
 * Target: Reduce CSS from 112KB to 30-50KB
 *
 * Strategy:
 * 1. Extract critical CSS (<10KB) for immediate rendering
 * 2. Defer non-critical CSS loading
 * 3. Generate route-specific bundles (15-25KB each)
 */

const fs = require('fs');
const path = require('path');
const { PurgeCSS } = require('purgecss');

// Page types for critical CSS extraction
const PAGE_TYPES = {
  homepage: {
    name: 'homepage',
    html: 'docs/index.html',
    output: 'lib/critical-css/homepage.css',
    description: 'Homepage critical CSS'
  },
  cruise: {
    name: 'cruise',
    html: 'docs/cruises/caribbean/index.html',
    output: 'lib/critical-css/cruise.css',
    description: 'Cruise page critical CSS'
  },
  package: {
    name: 'package',
    html: 'docs/packages/all-inclusive-caribbean/index.html',
    output: 'lib/critical-css/package.css',
    description: 'Package page critical CSS'
  },
  guide: {
    name: 'guide',
    html: 'docs/guides/travel-insurance-guide/index.html',
    output: 'lib/critical-css/guide.css',
    description: 'Guide page critical CSS'
  },
  location: {
    name: 'location',
    html: 'docs/locations/essex-county/newark/flights/index.html',
    output: 'lib/critical-css/location.css',
    description: 'Location page critical CSS'
  }
};

// Critical CSS selectors (always include)
const CRITICAL_SELECTORS = [
  // Reset and base styles
  '*', '::before', '::after', 'html', 'body',
  // Layout containers
  '.container', 'header', 'nav', 'main', 'footer',
  // Above-the-fold hero sections
  '.hero-section', '.hero', '[class*="hero-"]',
  // Navigation
  '[class*="nav-"]', '[class*="menu-"]',
  // Critical typography
  'h1', 'h2', 'h3', 'p', 'a',
  // Animations for initial load
  '.animate-fade-in', '@keyframes fadeIn',
  // Grid/flex basics
  '.flex', '.grid', '.items-center', '.justify-center',
  // Colors (primary brand colors only)
  '.bg-primary', '.bg-secondary', '.text-white',
];

// Route-specific patterns
const ROUTE_PATTERNS = {
  cruises: {
    glob: ['app/cruises/**/*.tsx', 'components/cruises/**/*.tsx', 'lib/data/cruises.ts'],
    output: 'public/css/cruises.css'
  },
  packages: {
    glob: ['app/packages/**/*.tsx', 'components/packages/**/*.tsx', 'lib/data/vacation-packages.ts'],
    output: 'public/css/packages.css'
  },
  guides: {
    glob: ['app/guides/**/*.tsx', 'components/guides/**/*.tsx', 'lib/data/travel-guides.ts'],
    output: 'public/css/guides.css'
  },
  locations: {
    glob: ['app/locations/**/*.tsx', 'lib/data/essex-county-*.ts'],
    output: 'public/css/locations.css'
  }
};

/**
 * Extract critical CSS from HTML file
 */
async function extractCriticalCSS(pageType) {
  const { html, output, description } = pageType;

  console.log(`\n📄 Extracting critical CSS for ${description}...`);

  // Check if HTML file exists
  const htmlPath = path.resolve(process.cwd(), html);
  if (!fs.existsSync(htmlPath)) {
    console.log(`⚠️  HTML file not found: ${html}`);
    return null;
  }

  try {
    // Find CSS files in build
    const cssDir = path.resolve(process.cwd(), 'docs/_next/static/css');
    const cssFiles = fs.readdirSync(cssDir)
      .filter(f => f.endsWith('.css'))
      .map(f => path.join(cssDir, f));

    // Run PurgeCSS on the HTML
    const purgeCSSResult = await new PurgeCSS().purge({
      content: [htmlPath],
      css: cssFiles,
      safelist: {
        standard: CRITICAL_SELECTORS,
        deep: [/^animate-/, /^transition-/, /^duration-/],
        greedy: [/^bg-/, /^text-/, /^border-/]
      },
      // Extract only what's visible above the fold
      extractors: [
        {
          extractor: content => content.match(/[A-Za-z0-9-_:\/]+/g) || [],
          extensions: ['html']
        }
      ]
    });

    if (purgeCSSResult && purgeCSSResult[0]) {
      const criticalCSS = purgeCSSResult[0].css;

      // Ensure output directory exists
      const outputPath = path.resolve(process.cwd(), output);
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write critical CSS
      fs.writeFileSync(outputPath, criticalCSS);

      const sizeKB = (Buffer.byteLength(criticalCSS) / 1024).toFixed(2);
      console.log(`✅ Critical CSS extracted: ${sizeKB}KB → ${output}`);

      return { path: output, size: sizeKB };
    }
  } catch (error) {
    console.error(`❌ Error extracting critical CSS: ${error.message}`);
  }

  return null;
}

/**
 * Generate route-specific CSS bundles
 */
async function generateRouteSpecificCSS(routeName, config) {
  console.log(`\n🎯 Generating route-specific CSS for ${routeName}...`);

  try {
    const cssDir = path.resolve(process.cwd(), 'docs/_next/static/css');
    const cssFiles = fs.readdirSync(cssDir)
      .filter(f => f.endsWith('.css'))
      .map(f => path.join(cssDir, f));

    // Find all files matching the route pattern
    const glob = require('glob');
    const contentFiles = [];

    for (const pattern of config.glob) {
      const matches = glob.sync(pattern, { cwd: process.cwd() });
      contentFiles.push(...matches);
    }

    if (contentFiles.length === 0) {
      console.log(`⚠️  No content files found for ${routeName}`);
      return null;
    }

    // Run PurgeCSS with route-specific content
    const purgeCSSResult = await new PurgeCSS().purge({
      content: contentFiles,
      css: cssFiles,
      safelist: {
        standard: CRITICAL_SELECTORS,
        deep: [/^animate-/, /^transition-/, /^hover:/, /^focus:/],
        greedy: [/^bg-/, /^text-/, /^border-/, /^from-/, /^to-/, /^via-/]
      }
    });

    if (purgeCSSResult && purgeCSSResult[0]) {
      const routeCSS = purgeCSSResult[0].css;

      // Ensure output directory exists
      const outputPath = path.resolve(process.cwd(), config.output);
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write route CSS
      fs.writeFileSync(outputPath, routeCSS);

      const sizeKB = (Buffer.byteLength(routeCSS) / 1024).toFixed(2);
      console.log(`✅ Route CSS generated: ${sizeKB}KB → ${config.output}`);

      return { route: routeName, path: config.output, size: sizeKB };
    }
  } catch (error) {
    console.error(`❌ Error generating route CSS: ${error.message}`);
  }

  return null;
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 ================================');
  console.log('🎨 Critical CSS Extraction Script');
  console.log('🎨 ================================');
  console.log('🎯 Target: Reduce CSS from 112KB to 30-50KB\n');

  // Check if build exists
  const buildPath = path.resolve(process.cwd(), 'docs');
  if (!fs.existsSync(buildPath)) {
    console.error('❌ Build directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  const results = {
    critical: [],
    routes: [],
    totalBefore: 0,
    totalAfter: 0
  };

  // Get original CSS size
  const cssDir = path.resolve(process.cwd(), 'docs/_next/static/css');
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
    for (const file of cssFiles) {
      const stats = fs.statSync(path.join(cssDir, file));
      results.totalBefore += stats.size;
    }
  }

  console.log(`📊 Original CSS size: ${(results.totalBefore / 1024).toFixed(2)}KB`);

  // Extract critical CSS for each page type
  console.log('\n📄 STEP 1: Extracting Critical CSS for Page Types');
  console.log('================================================');

  for (const [key, pageType] of Object.entries(PAGE_TYPES)) {
    const result = await extractCriticalCSS(pageType);
    if (result) {
      results.critical.push(result);
    }
  }

  // Generate route-specific CSS
  console.log('\n🎯 STEP 2: Generating Route-Specific CSS Bundles');
  console.log('================================================');

  for (const [routeName, config] of Object.entries(ROUTE_PATTERNS)) {
    const result = await generateRouteSpecificCSS(routeName, config);
    if (result) {
      results.routes.push(result);
    }
  }

  // Calculate total after optimization
  for (const item of results.critical) {
    results.totalAfter += parseFloat(item.size) * 1024;
  }
  for (const item of results.routes) {
    results.totalAfter += parseFloat(item.size) * 1024;
  }

  // Generate report
  console.log('\n\n📊 ================================');
  console.log('📊 CSS Optimization Report');
  console.log('📊 ================================\n');

  console.log('Critical CSS Files:');
  results.critical.forEach(item => {
    console.log(`  • ${item.path}: ${item.size}KB`);
  });

  console.log('\nRoute-Specific CSS Files:');
  results.routes.forEach(item => {
    console.log(`  • ${item.route}: ${item.size}KB (${item.path})`);
  });

  const beforeKB = (results.totalBefore / 1024).toFixed(2);
  const afterKB = (results.totalAfter / 1024).toFixed(2);
  const reduction = ((1 - results.totalAfter / results.totalBefore) * 100).toFixed(1);

  console.log('\n📈 Summary:');
  console.log(`  Before: ${beforeKB}KB`);
  console.log(`  After: ${afterKB}KB (estimated with critical + route bundles)`);
  console.log(`  Reduction: ${reduction}%`);

  if (results.totalAfter / 1024 > 50) {
    console.log('\n⚠️  Warning: Total CSS size exceeds 50KB target');
    console.log('   Consider additional optimizations:');
    console.log('   - Remove unused Tailwind variants');
    console.log('   - Disable unused core plugins');
    console.log('   - Audit custom CSS in globals.css');
  } else {
    console.log('\n✅ CSS optimization target achieved!');
  }

  // Save report
  const reportPath = path.resolve(process.cwd(), 'reports/css-optimization.json');
  const reportDir = path.dirname(reportPath);
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Full report saved to: reports/css-optimization.json`);

  console.log('\n🎨 Critical CSS extraction complete!\n');
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
