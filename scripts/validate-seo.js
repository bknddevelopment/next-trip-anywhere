#!/usr/bin/env node

/**
 * SEO Validation Script
 * Validates SEO configuration for the Next Trip Anywhere application
 */

const fs = require('fs')
const path = require('path')

// Color codes for terminal output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
}

const checks = []

function addCheck(name, status, message = '') {
  const symbol = status === 'pass' ? '✅' : status === 'warning' ? '⚠️ ' : '❌'
  const color = status === 'pass' ? colors.green : status === 'warning' ? colors.yellow : colors.red
  checks.push({ name, status, message, symbol, color })
}

console.log(`${colors.blue}========================================`)
console.log('   SEO Configuration Validation')
console.log(`========================================${colors.reset}\n`)

// 1. Check robots.txt
const robotsPath = path.join(process.cwd(), 'public', 'robots.txt')
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8')
  if (robotsContent.includes('Sitemap:')) {
    addCheck('robots.txt', 'pass', 'File exists with sitemap reference')
  } else {
    addCheck('robots.txt', 'warning', 'File exists but missing sitemap reference')
  }
} else {
  addCheck('robots.txt', 'fail', 'File not found')
}

// 2. Check Google Search Console verification
const googleVerificationPath = path.join(
  process.cwd(),
  'public',
  'google9de1b0284bbffacf.html'
)
if (fs.existsSync(googleVerificationPath)) {
  addCheck('Google Search Console', 'pass', 'Verification file present')
} else {
  addCheck('Google Search Console', 'fail', 'Verification file missing')
}

// 3. Check sitemap.ts
const sitemapPath = path.join(process.cwd(), 'app', 'sitemap.ts')
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8')
  if (sitemapContent.includes('MetadataRoute.Sitemap')) {
    if (sitemapContent.includes('blogPosts')) {
      addCheck('Dynamic Sitemap', 'pass', 'Configured with blog posts')
    } else {
      addCheck('Dynamic Sitemap', 'warning', 'Missing blog posts import')
    }
  } else {
    addCheck('Dynamic Sitemap', 'fail', 'Invalid sitemap configuration')
  }
} else {
  addCheck('Dynamic Sitemap', 'fail', 'sitemap.ts not found')
}

// 4. Check layout.tsx for metadata
const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx')
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8')

  // Check for metadata export
  if (layoutContent.includes('export const metadata')) {
    addCheck('Default Metadata', 'pass', 'Configured in layout.tsx')
  } else {
    addCheck('Default Metadata', 'fail', 'Missing metadata export')
  }

  // Check for JSON-LD structured data
  if (layoutContent.includes('application/ld+json')) {
    addCheck('Structured Data', 'pass', 'JSON-LD implemented')
  } else {
    addCheck('Structured Data', 'fail', 'Missing JSON-LD structured data')
  }

  // Check for Open Graph tags
  if (layoutContent.includes('openGraph')) {
    addCheck('Open Graph Tags', 'pass', 'Configured')
  } else {
    addCheck('Open Graph Tags', 'warning', 'Not configured in metadata')
  }
} else {
  addCheck('Layout Configuration', 'fail', 'layout.tsx not found')
}

// 5. Check for environment variables
const envExamplePath = path.join(process.cwd(), '.env.local.example')
if (fs.existsSync(envExamplePath)) {
  addCheck('Environment Config', 'pass', '.env.local.example exists')
} else {
  addCheck('Environment Config', 'warning', 'Missing .env.local.example')
}

// 6. Check page metadata
const pagesWithMetadata = []
const pagePaths = [
  'app/page.tsx',
  'app/flights/page.tsx',
  'app/cruises/page.tsx',
  'app/packages/page.tsx',
  'app/blog/page.tsx',
]

pagePaths.forEach(pagePath => {
  const fullPath = path.join(process.cwd(), pagePath)
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8')
    if (content.includes('export const metadata')) {
      pagesWithMetadata.push(pagePath.replace('app/', '').replace('/page.tsx', ''))
    }
  }
})

if (pagesWithMetadata.length === pagePaths.length) {
  addCheck('Page Metadata', 'pass', `All ${pagePaths.length} main pages have metadata`)
} else {
  addCheck(
    'Page Metadata',
    'warning',
    `${pagesWithMetadata.length}/${pagePaths.length} pages have metadata`
  )
}

// 7. Check for static export configuration
const nextConfigPath = path.join(process.cwd(), 'next.config.js')
if (fs.existsSync(nextConfigPath)) {
  const nextConfig = fs.readFileSync(nextConfigPath, 'utf8')
  if (nextConfig.includes("output: 'export'")) {
    addCheck('Static Export', 'pass', 'Configured for production')
  } else {
    addCheck('Static Export', 'warning', 'Not configured for static export')
  }
} else {
  addCheck('Next.js Config', 'fail', 'next.config.js not found')
}

// 8. Check blog posts data
const blogPostsPath = path.join(process.cwd(), 'lib', 'data', 'blog-posts.ts')
if (fs.existsSync(blogPostsPath)) {
  const blogContent = fs.readFileSync(blogPostsPath, 'utf8')
  const postCount = (blogContent.match(/slug:/g) || []).length
  if (postCount > 0) {
    addCheck('Blog Content', 'pass', `${postCount} blog posts configured`)
  } else {
    addCheck('Blog Content', 'warning', 'No blog posts found')
  }
} else {
  addCheck('Blog Content', 'fail', 'blog-posts.ts not found')
}

// 9. Check Essex County pages
const essexDataFiles = [
  'lib/data/essex-county-cities.ts',
  'lib/data/essex-county-services.ts',
]

let essexConfigured = true
essexDataFiles.forEach(file => {
  const fullPath = path.join(process.cwd(), file)
  if (!fs.existsSync(fullPath)) {
    essexConfigured = false
  }
})

if (essexConfigured) {
  addCheck('Essex County SEO', 'pass', 'Local SEO data configured')
} else {
  addCheck('Essex County SEO', 'warning', 'Missing local SEO data files')
}

// Print results
console.log(`${colors.blue}Validation Results:${colors.reset}\n`)

let passCount = 0
let warningCount = 0
let failCount = 0

checks.forEach(check => {
  console.log(`${check.color}${check.symbol} ${check.name}${colors.reset}`)
  if (check.message) {
    console.log(`   ${check.message}`)
  }
  console.log()

  if (check.status === 'pass') passCount++
  else if (check.status === 'warning') warningCount++
  else failCount++
})

// Summary
console.log(`${colors.blue}========================================${colors.reset}`)
console.log(`${colors.blue}Summary:${colors.reset}`)
console.log(
  `${colors.green}✅ Passed: ${passCount}${colors.reset} | ` +
  `${colors.yellow}⚠️  Warnings: ${warningCount}${colors.reset} | ` +
  `${colors.red}❌ Failed: ${failCount}${colors.reset}`
)
console.log(`${colors.blue}========================================${colors.reset}`)

// Recommendations
if (warningCount > 0 || failCount > 0) {
  console.log(`\n${colors.yellow}Recommendations:${colors.reset}`)

  if (checks.find(c => c.name === 'Environment Config' && c.status === 'warning')) {
    console.log('• Create .env.local from .env.local.example')
  }

  if (checks.find(c => c.name === 'Google Search Console' && c.status === 'fail')) {
    console.log('• Add Google Search Console verification file')
  }

  if (checks.find(c => c.name === 'Dynamic Sitemap' && c.status === 'warning')) {
    console.log('• Import and use blogPosts in sitemap.ts')
  }

  console.log('\nRun "npm run build" to generate the static site with all SEO features.')
}

// Exit with appropriate code
process.exit(failCount > 0 ? 1 : 0)