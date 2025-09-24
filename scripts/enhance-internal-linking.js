#!/usr/bin/env node

/**
 * Script to enhance internal linking across all pages
 * Target: 8-12 internal links per page for SEO optimization
 *
 * This script analyzes and reports on internal linking structure
 * and provides recommendations for improvement
 */

const fs = require('fs');
const path = require('path');

const PAGES_TO_ANALYZE = {
  cruises: [
    '/app/cruises/from-newark/page.tsx',
    '/app/cruises/caribbean/page.tsx',
    '/app/cruises/bahamas/page.tsx',
    '/app/cruises/alaska/page.tsx',
    '/app/cruises/mediterranean/page.tsx',
    '/app/cruises/european/page.tsx',
    '/app/cruises/hawaii/page.tsx',
    '/app/cruises/2025/page.tsx',
    '/app/cruises/deals/page.tsx',
    '/app/cruises/last-minute/page.tsx',
    '/app/cruises/cheap-cruises/page.tsx',
    '/app/cruises/cape-liberty-port/page.tsx',
    '/app/cruises/royal-caribbean/page.tsx',
    '/app/cruises/carnival/page.tsx',
    '/app/cruises/norwegian/page.tsx',
    '/app/cruises/celebrity/page.tsx',
    '/app/cruises/princess/page.tsx',
  ],
  packages: [
    '/app/packages/page.tsx',
    '/app/packages/[type]/page.tsx',
  ],
  destinations: [
    '/app/destinations/page.tsx',
  ],
  essexCounty: [
    '/app/essex-county/page.tsx',
    '/app/locations/essex-county/[city]/page.tsx',
    '/app/locations/essex-county/[city]/[service]/page.tsx',
  ]
};

const RECOMMENDED_LINKS = {
  cruise: {
    minLinks: 8,
    maxLinks: 12,
    requiredSections: [
      'Related Destinations',
      'Planning Resources',
      'Local Services',
    ],
    suggestedLinks: [
      '/cruises/caribbean',
      '/cruises/bahamas',
      '/cruises/alaska',
      '/cruises/from-newark',
      '/cruises/cape-liberty-port',
      '/guides/first-time-cruiser',
      '/guides/packing-for-cruise',
      '/tools/cruise-price-calculator',
      '/services/cruise-transfers',
      '/essex-county',
      '/blog',
      '/contact',
    ]
  },
  package: {
    minLinks: 8,
    maxLinks: 12,
    requiredSections: [
      'More Packages',
      'Popular Destinations',
      'Travel Planning',
    ],
    suggestedLinks: [
      '/packages/all-inclusive',
      '/packages/family',
      '/packages/luxury',
      '/packages/budget',
      '/destinations/caribbean-from-nj',
      '/destinations/bahamas-from-newark',
      '/guides/travel-insurance',
      '/guides/passport-requirements',
      '/tools/budget-calculator',
      '/blog',
      '/contact',
    ]
  },
  destination: {
    minLinks: 8,
    maxLinks: 12,
    requiredSections: [
      'How to Get There',
      'Related Destinations',
      'Travel Resources',
    ],
    suggestedLinks: [
      '/cruises',
      '/packages',
      '/flights',
      '/guides/travel-documents',
      '/guides/travel-insurance',
      '/tools/weather-forecast',
      '/blog',
      '/contact',
    ]
  }
};

/**
 * Analyze a file for internal links
 */
function analyzeFile(filePath) {
  const projectRoot = path.dirname(__dirname);
  const fullPath = path.join(projectRoot, filePath);

  if (!fs.existsSync(fullPath)) {
    return {
      path: filePath,
      exists: false,
      linkCount: 0,
      links: [],
    };
  }

  const content = fs.readFileSync(fullPath, 'utf8');

  // Find all Link components with href
  const linkPattern = /Link\s+href=["']([^"']+)["']/g;
  const hrefPattern = /href=["']([^"']+)["']/g;

  const links = [];
  let match;

  // Find Next.js Link components
  while ((match = linkPattern.exec(content)) !== null) {
    if (match[1].startsWith('/') && !match[1].startsWith('//')) {
      links.push(match[1]);
    }
  }

  // Find regular anchor tags (should be converted to Link components)
  const anchorLinks = [];
  while ((match = hrefPattern.exec(content)) !== null) {
    if (match[1].startsWith('/') && !match[1].startsWith('//') && !links.includes(match[1])) {
      anchorLinks.push(match[1]);
    }
  }

  // Check if using InternalLinks component
  const hasInternalLinksComponent = content.includes('InternalLinks');
  const hasGetRecommendedLinks = content.includes('getRecommendedLinks');

  return {
    path: filePath,
    exists: true,
    linkCount: links.length,
    links: links,
    anchorLinks: anchorLinks,
    hasInternalLinksComponent,
    hasGetRecommendedLinks,
  };
}

/**
 * Generate recommendations based on analysis
 */
function generateRecommendations(analysis, pageType) {
  const recommendations = [];
  const config = RECOMMENDED_LINKS[pageType] || RECOMMENDED_LINKS.cruise;

  if (!analysis.exists) {
    recommendations.push({
      type: 'error',
      message: `File not found: ${analysis.path}`,
    });
    return recommendations;
  }

  // Check link count
  if (analysis.linkCount < config.minLinks) {
    recommendations.push({
      type: 'critical',
      message: `Only ${analysis.linkCount} internal links found. Minimum recommended: ${config.minLinks}`,
      action: 'Add InternalLinks component with getRecommendedLinks()',
    });
  } else if (analysis.linkCount > config.maxLinks + 5) {
    recommendations.push({
      type: 'warning',
      message: `${analysis.linkCount} internal links found. Consider reducing to ${config.maxLinks} for better user experience`,
    });
  }

  // Check for anchor tags
  if (analysis.anchorLinks && analysis.anchorLinks.length > 0) {
    recommendations.push({
      type: 'warning',
      message: `Found ${analysis.anchorLinks.length} anchor tags that should be Next.js Link components`,
      links: analysis.anchorLinks,
    });
  }

  // Check for InternalLinks component
  if (!analysis.hasInternalLinksComponent && analysis.linkCount < config.minLinks) {
    recommendations.push({
      type: 'action',
      message: 'Add InternalLinks component for better SEO',
      code: `
import { InternalLinks, getRecommendedLinks } from '@/components/seo/InternalLinks'

// Add before the closing </main> tag:
<InternalLinks
  sections={getRecommendedLinks('${pageType}', '${analysis.path.replace('/app', '').replace('/page.tsx', '')}')}
/>
      `.trim(),
    });
  }

  // Check for missing important links
  const missingLinks = config.suggestedLinks.filter(link => !analysis.links.includes(link));
  if (missingLinks.length > 3) {
    recommendations.push({
      type: 'suggestion',
      message: 'Consider adding links to these important pages:',
      links: missingLinks.slice(0, 5),
    });
  }

  return recommendations;
}

/**
 * Main analysis function
 */
function main() {
  console.log('🔍 SEO Internal Linking Analysis\n');
  console.log('=' .repeat(60));

  let totalPages = 0;
  let pagesNeedingWork = 0;
  let totalRecommendations = 0;

  Object.entries(PAGES_TO_ANALYZE).forEach(([category, pages]) => {
    console.log(`\n📁 ${category.toUpperCase()} PAGES`);
    console.log('-'.repeat(40));

    pages.forEach(pagePath => {
      totalPages++;
      const analysis = analyzeFile(pagePath);
      const pageType = category === 'packages' ? 'package' :
                       category === 'destinations' ? 'destination' :
                       'cruise';
      const recommendations = generateRecommendations(analysis, pageType);

      if (recommendations.length > 0) {
        pagesNeedingWork++;
        totalRecommendations += recommendations.length;

        console.log(`\n📄 ${pagePath}`);
        console.log(`   Links found: ${analysis.linkCount}`);
        console.log(`   Status: ${analysis.linkCount < 8 ? '❌ Needs improvement' : '✅ Good'}`);

        recommendations.forEach(rec => {
          const icon = rec.type === 'critical' ? '🚨' :
                       rec.type === 'warning' ? '⚠️' :
                       rec.type === 'action' ? '💡' :
                       '💭';
          console.log(`   ${icon} ${rec.message}`);

          if (rec.links) {
            rec.links.forEach(link => console.log(`      - ${link}`));
          }

          if (rec.code) {
            console.log(`      Code to add:`);
            console.log(rec.code.split('\n').map(line => `      ${line}`).join('\n'));
          }
        });
      } else {
        console.log(`\n✅ ${pagePath} - Good internal linking (${analysis.linkCount} links)`);
      }
    });
  });

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total pages analyzed: ${totalPages}`);
  console.log(`Pages needing improvement: ${pagesNeedingWork}`);
  console.log(`Total recommendations: ${totalRecommendations}`);
  console.log(`SEO Score: ${Math.round(((totalPages - pagesNeedingWork) / totalPages) * 100)}%`);

  if (pagesNeedingWork > 0) {
    console.log('\n🎯 NEXT STEPS:');
    console.log('1. Import InternalLinks component in pages with < 8 links');
    console.log('2. Use getRecommendedLinks() to automatically add relevant links');
    console.log('3. Replace anchor tags with Next.js Link components');
    console.log('4. Ensure each page links to related content in its category');
    console.log('5. Add links to high-priority pages (cruises, packages, guides)');
  }

  console.log('\n✨ Run this script again after making changes to track progress');
}

// Run the analysis
main();