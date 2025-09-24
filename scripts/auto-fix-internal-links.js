#!/usr/bin/env node

/**
 * Automated Internal Link Fixer
 *
 * This script automatically adds the InternalLinks component
 * to all pages that need it, ensuring SEO best practices
 *
 * Usage: node scripts/auto-fix-internal-links.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');

// Pages that need the InternalLinks component
const PAGES_TO_FIX = {
  cruise: [
    'app/cruises/caribbean/page.tsx',
    'app/cruises/alaska/page.tsx',
    'app/cruises/mediterranean/page.tsx',
    'app/cruises/european/page.tsx',
    'app/cruises/hawaii/page.tsx',
    'app/cruises/2025/page.tsx',
    'app/cruises/deals/page.tsx',
    'app/cruises/last-minute/page.tsx',
    'app/cruises/cheap-cruises/page.tsx',
    'app/cruises/cape-liberty-port/page.tsx',
    'app/cruises/carnival/page.tsx',
    'app/cruises/norwegian/page.tsx',
    'app/cruises/celebrity/page.tsx',
    'app/cruises/princess/page.tsx',
  ],
  package: [
    'app/packages/page.tsx',
  ],
  destination: [
    'app/destinations/page.tsx',
  ],
  essex: [
    'app/essex-county/page.tsx',
  ]
};

/**
 * Add InternalLinks import to a file
 */
function addImport(content, pageType) {
  // Check if already imported
  if (content.includes('InternalLinks')) {
    console.log('   ⚠️  InternalLinks already imported');
    return content;
  }

  // Find the last import statement
  const importRegex = /^import .+ from .+$/gm;
  let lastImportIndex = 0;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    lastImportIndex = match.index + match[0].length;
  }

  // Add the import after the last import
  const importStatement = `\nimport { InternalLinks, getRecommendedLinks } from '@/components/seo/InternalLinks'`;

  return content.slice(0, lastImportIndex) + importStatement + content.slice(lastImportIndex);
}

/**
 * Add InternalLinks component before closing main tag
 */
function addComponent(content, pageType, pagePath) {
  // Check if already added
  if (content.includes('<InternalLinks')) {
    console.log('   ⚠️  InternalLinks component already added');
    return content;
  }

  // Extract the slug from the path
  const slug = pagePath
    .replace('app', '')
    .replace('/page.tsx', '')
    .replace('[type]', '{type}')
    .replace('[city]', '{city}')
    .replace('[service]', '{service}');

  // Find the closing main tag
  const mainCloseIndex = content.lastIndexOf('</main>');

  if (mainCloseIndex === -1) {
    console.log('   ❌ Could not find </main> tag');
    return content;
  }

  // Add the component before </main>
  const componentCode = `
        {/* Internal Links for SEO */}
        <InternalLinks
          sections={getRecommendedLinks('${pageType}', '${slug}')}
        />

        `;

  return content.slice(0, mainCloseIndex) + componentCode + content.slice(mainCloseIndex);
}

/**
 * Fix a single file
 */
function fixFile(filePath, pageType) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`   ❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;

  // Add import
  content = addImport(content, pageType);

  // Add component
  content = addComponent(content, pageType, filePath);

  // Check if anything changed
  if (content === originalContent) {
    console.log('   ℹ️  No changes needed');
    return false;
  }

  // Write the file (or simulate in dry run)
  if (!DRY_RUN) {
    fs.writeFileSync(fullPath, content);
    console.log('   ✅ File updated successfully');
  } else {
    console.log('   🔵 Would update file (dry run)');
  }

  return true;
}

/**
 * Fix anchor tags in Essex County page
 */
function fixEssexCountyAnchors() {
  const filePath = 'app/essex-county/page.tsx';
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`❌ Essex County file not found`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;

  // Check if Link is imported
  if (!content.includes("import Link from 'next/link'") &&
      !content.includes('import Link from "next/link"')) {
    // Add Link import after next imports
    const nextImportRegex = /import .+ from ['"]next\/.+['"]/;
    const match = nextImportRegex.exec(content);

    if (match) {
      const insertIndex = match.index + match[0].length;
      content = content.slice(0, insertIndex) +
                "\nimport Link from 'next/link'" +
                content.slice(insertIndex);
    }
  }

  // Replace anchor tags with Link components
  // Pattern: <a href="/..." ...>content</a>
  const anchorRegex = /<a\s+href=["'](\/[^"']+)["']([^>]*)>([^<]+)<\/a>/g;
  content = content.replace(anchorRegex, (match, href, attrs, text) => {
    // Parse additional attributes
    const className = attrs.match(/className=["']([^"']+)["']/);
    const classAttr = className ? ` className="${className[1]}"` : '';

    return `<Link href="${href}"${classAttr}>${text}</Link>`;
  });

  if (content !== originalContent) {
    if (!DRY_RUN) {
      fs.writeFileSync(fullPath, content);
      console.log('✅ Fixed anchor tags in Essex County page');
    } else {
      console.log('🔵 Would fix anchor tags in Essex County page (dry run)');
    }
  }
}

/**
 * Main function
 */
function main() {
  console.log('🔧 Auto-Fixing Internal Links\n');

  if (DRY_RUN) {
    console.log('📝 DRY RUN MODE - No files will be modified\n');
  }

  let totalFixed = 0;
  let totalFiles = 0;

  // Process each category
  Object.entries(PAGES_TO_FIX).forEach(([category, pages]) => {
    console.log(`\n📁 ${category.toUpperCase()} PAGES`);
    console.log('-'.repeat(40));

    pages.forEach(pagePath => {
      totalFiles++;
      console.log(`\n📄 ${pagePath}`);

      const pageType = category === 'essex' ? 'cruise' : category;
      if (fixFile(pagePath, pageType)) {
        totalFixed++;
      }
    });
  });

  // Fix Essex County anchor tags
  console.log('\n📁 FIXING ANCHOR TAGS');
  console.log('-'.repeat(40));
  fixEssexCountyAnchors();

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total files processed: ${totalFiles}`);
  console.log(`Files updated: ${totalFixed}`);

  if (DRY_RUN) {
    console.log('\n💡 This was a dry run. To apply changes, run:');
    console.log('   node scripts/auto-fix-internal-links.js');
  } else {
    console.log('\n✅ Internal links have been enhanced!');
    console.log('🎯 Next steps:');
    console.log('1. Run `npm run build` to verify changes');
    console.log('2. Test a few pages locally with `npm run dev`');
    console.log('3. Commit changes and deploy');
  }
}

// Run the script
main();