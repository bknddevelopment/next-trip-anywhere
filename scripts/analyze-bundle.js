#!/usr/bin/env node

/**
 * Bundle Size Analysis Script
 *
 * Post-build optimization script that analyzes bundle sizes and provides
 * detailed reporting for the Next.js static export.
 *
 * Features:
 * - Analyzes all JS and CSS chunks in the build
 * - Compares against defined size budgets
 * - Generates warnings for exceeded budgets
 * - Reports compression ratios (gzip/brotli)
 * - Outputs both JSON and human-readable reports
 *
 * Usage:
 *   npm run analyze-bundle
 *   node scripts/analyze-bundle.js
 *
 * Targets:
 * - Total JS: 500KB (current: 1.1MB - need 54% reduction)
 * - Total CSS: 50KB (current: 112KB - need 55% reduction)
 * - Per-page chunks: 4-6 (current: 9-12 - need consolidation)
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// ============================================================================
// CONFIGURATION
// ============================================================================

const BUILD_DIR = path.join(__dirname, '..', '.next-build')
const STATIC_DIR = path.join(BUILD_DIR, 'static')
const REPORT_DIR = path.join(__dirname, '..', 'reports')
const DOCS_DIR = path.join(__dirname, '..', 'docs')

// Size budgets (in bytes)
const SIZE_BUDGETS = {
  // JavaScript budgets
  totalJS: 512000, // 500KB total JS across all chunks
  perChunkJS: 102400, // 100KB per individual JS chunk
  frameworkJS: 153600, // 150KB for React + React-DOM
  commonsJS: 102400, // 100KB for commons chunk (target: reduce from 272KB)

  // CSS budgets
  totalCSS: 51200, // 50KB total CSS
  perChunkCSS: 30720, // 30KB per CSS file

  // Page-level budgets
  chunksPerPage: 6, // Maximum 6 chunks per page (currently 9-12)
  initialLoadJS: 409600, // 400KB max for initial page load
}

// Compression ratio expectations
const COMPRESSION_RATIOS = {
  gzip: 0.3, // Expect ~70% reduction with gzip
  brotli: 0.25, // Expect ~75% reduction with brotli
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * Get gzip size of a file
 */
function getGzipSize(filePath) {
  try {
    const result = execSync(`gzip -c "${filePath}" | wc -c`, { encoding: 'utf-8' })
    return parseInt(result.trim(), 10)
  } catch (error) {
    console.warn(`Warning: Could not calculate gzip size for ${filePath}`)
    return 0
  }
}

/**
 * Get file size
 */
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath)
    return stats.size
  } catch (error) {
    return 0
  }
}

/**
 * Recursively find all files with given extensions
 */
function findFiles(dir, extensions, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList
  }

  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      findFiles(filePath, extensions, fileList)
    } else if (extensions.some(ext => file.endsWith(ext))) {
      fileList.push(filePath)
    }
  })

  return fileList
}

/**
 * Categorize chunk by name
 */
function categorizeChunk(filename) {
  const categories = {
    framework: /framework/i,
    nextjs: /webpack|main-app/i,
    commons: /commons/i,
    vendor: /vendor/i,
    ui: /ui/i,
    forms: /forms/i,
    query: /query/i,
    lib: /lib-/i,
    shared: /shared/i,
    page: /page-|app-/i,
    runtime: /runtime/i,
  }

  for (const [category, pattern] of Object.entries(categories)) {
    if (pattern.test(filename)) {
      return category
    }
  }

  return 'other'
}

// ============================================================================
// ANALYSIS FUNCTIONS
// ============================================================================

/**
 * Analyze JavaScript bundles
 */
function analyzeJavaScript() {
  console.log('\n📦 Analyzing JavaScript bundles...\n')

  const jsFiles = findFiles(STATIC_DIR, ['.js'])
  const chunks = []
  let totalSize = 0
  let totalGzipSize = 0

  jsFiles.forEach(filePath => {
    const size = getFileSize(filePath)
    const gzipSize = getGzipSize(filePath)
    const filename = path.basename(filePath)
    const category = categorizeChunk(filename)

    totalSize += size
    totalGzipSize += gzipSize

    chunks.push({
      filename,
      path: filePath,
      category,
      size,
      gzipSize,
      compressionRatio: gzipSize / size,
    })
  })

  // Sort by size descending
  chunks.sort((a, b) => b.size - a.size)

  // Group by category
  const byCategory = chunks.reduce((acc, chunk) => {
    if (!acc[chunk.category]) {
      acc[chunk.category] = { chunks: [], totalSize: 0, totalGzipSize: 0 }
    }
    acc[chunk.category].chunks.push(chunk)
    acc[chunk.category].totalSize += chunk.size
    acc[chunk.category].totalGzipSize += chunk.gzipSize
    return acc
  }, {})

  return {
    chunks,
    byCategory,
    totalSize,
    totalGzipSize,
    count: chunks.length,
  }
}

/**
 * Analyze CSS bundles
 */
function analyzeCSS() {
  console.log('🎨 Analyzing CSS bundles...\n')

  const cssFiles = findFiles(STATIC_DIR, ['.css'])
  const chunks = []
  let totalSize = 0
  let totalGzipSize = 0

  cssFiles.forEach(filePath => {
    const size = getFileSize(filePath)
    const gzipSize = getGzipSize(filePath)
    const filename = path.basename(filePath)

    totalSize += size
    totalGzipSize += gzipSize

    chunks.push({
      filename,
      path: filePath,
      size,
      gzipSize,
      compressionRatio: gzipSize / size,
    })
  })

  // Sort by size descending
  chunks.sort((a, b) => b.size - a.size)

  return {
    chunks,
    totalSize,
    totalGzipSize,
    count: chunks.length,
  }
}

/**
 * Check budgets and generate warnings
 */
function checkBudgets(jsAnalysis, cssAnalysis) {
  const warnings = []
  const passes = []

  // Check total JS budget
  if (jsAnalysis.totalSize > SIZE_BUDGETS.totalJS) {
    const overage = jsAnalysis.totalSize - SIZE_BUDGETS.totalJS
    const percentage = ((overage / SIZE_BUDGETS.totalJS) * 100).toFixed(1)
    warnings.push({
      type: 'JS_TOTAL_SIZE',
      severity: 'ERROR',
      message: `Total JS size (${formatBytes(jsAnalysis.totalSize)}) exceeds budget (${formatBytes(SIZE_BUDGETS.totalJS)}) by ${formatBytes(overage)} (+${percentage}%)`,
      current: jsAnalysis.totalSize,
      budget: SIZE_BUDGETS.totalJS,
    })
  } else {
    passes.push({
      type: 'JS_TOTAL_SIZE',
      message: `Total JS size (${formatBytes(jsAnalysis.totalSize)}) is within budget (${formatBytes(SIZE_BUDGETS.totalJS)})`,
    })
  }

  // Check total CSS budget
  if (cssAnalysis.totalSize > SIZE_BUDGETS.totalCSS) {
    const overage = cssAnalysis.totalSize - SIZE_BUDGETS.totalCSS
    const percentage = ((overage / SIZE_BUDGETS.totalCSS) * 100).toFixed(1)
    warnings.push({
      type: 'CSS_TOTAL_SIZE',
      severity: 'ERROR',
      message: `Total CSS size (${formatBytes(cssAnalysis.totalSize)}) exceeds budget (${formatBytes(SIZE_BUDGETS.totalCSS)}) by ${formatBytes(overage)} (+${percentage}%)`,
      current: cssAnalysis.totalSize,
      budget: SIZE_BUDGETS.totalCSS,
    })
  } else {
    passes.push({
      type: 'CSS_TOTAL_SIZE',
      message: `Total CSS size (${formatBytes(cssAnalysis.totalSize)}) is within budget (${formatBytes(SIZE_BUDGETS.totalCSS)})`,
    })
  }

  // Check individual JS chunk sizes
  jsAnalysis.chunks.forEach(chunk => {
    if (chunk.size > SIZE_BUDGETS.perChunkJS && chunk.category !== 'framework') {
      const overage = chunk.size - SIZE_BUDGETS.perChunkJS
      warnings.push({
        type: 'JS_CHUNK_SIZE',
        severity: 'WARNING',
        message: `JS chunk "${chunk.filename}" (${formatBytes(chunk.size)}) exceeds per-chunk budget (${formatBytes(SIZE_BUDGETS.perChunkJS)}) by ${formatBytes(overage)}`,
        chunk: chunk.filename,
        current: chunk.size,
        budget: SIZE_BUDGETS.perChunkJS,
      })
    }
  })

  // Check commons chunk specifically (target: reduce from 272KB to 100KB)
  const commonsChunk = jsAnalysis.chunks.find(c => c.category === 'commons')
  if (commonsChunk && commonsChunk.size > SIZE_BUDGETS.commonsJS) {
    const overage = commonsChunk.size - SIZE_BUDGETS.commonsJS
    const percentage = ((overage / SIZE_BUDGETS.commonsJS) * 100).toFixed(1)
    warnings.push({
      type: 'COMMONS_CHUNK_SIZE',
      severity: 'ERROR',
      message: `Commons chunk (${formatBytes(commonsChunk.size)}) exceeds target (${formatBytes(SIZE_BUDGETS.commonsJS)}) by ${formatBytes(overage)} (+${percentage}%). Target: 100KB, Current: 272KB`,
      current: commonsChunk.size,
      budget: SIZE_BUDGETS.commonsJS,
    })
  }

  // Check CSS chunk sizes
  cssAnalysis.chunks.forEach(chunk => {
    if (chunk.size > SIZE_BUDGETS.perChunkCSS) {
      const overage = chunk.size - SIZE_BUDGETS.perChunkCSS
      warnings.push({
        type: 'CSS_CHUNK_SIZE',
        severity: 'WARNING',
        message: `CSS chunk "${chunk.filename}" (${formatBytes(chunk.size)}) exceeds per-chunk budget (${formatBytes(SIZE_BUDGETS.perChunkCSS)}) by ${formatBytes(overage)}`,
        chunk: chunk.filename,
        current: chunk.size,
        budget: SIZE_BUDGETS.perChunkCSS,
      })
    }
  })

  // Check compression ratios
  const avgJsCompression = jsAnalysis.totalGzipSize / jsAnalysis.totalSize
  if (avgJsCompression > COMPRESSION_RATIOS.gzip) {
    warnings.push({
      type: 'JS_COMPRESSION',
      severity: 'INFO',
      message: `JS compression ratio (${(avgJsCompression * 100).toFixed(1)}%) is worse than expected (${(COMPRESSION_RATIOS.gzip * 100).toFixed(1)}%). Consider optimizing JS content.`,
    })
  }

  return { warnings, passes }
}

/**
 * Generate human-readable report
 */
function generateTextReport(jsAnalysis, cssAnalysis, budgetCheck) {
  const lines = []

  lines.push('═'.repeat(80))
  lines.push('  BUNDLE SIZE ANALYSIS REPORT')
  lines.push('  Next Trip Anywhere - Phase 1 Optimization')
  lines.push('═'.repeat(80))
  lines.push('')

  // Summary
  lines.push('📊 SUMMARY')
  lines.push('─'.repeat(80))
  lines.push(`Total JavaScript:  ${formatBytes(jsAnalysis.totalSize).padEnd(12)} (gzip: ${formatBytes(jsAnalysis.totalGzipSize)})`)
  lines.push(`Total CSS:         ${formatBytes(cssAnalysis.totalSize).padEnd(12)} (gzip: ${formatBytes(cssAnalysis.totalGzipSize)})`)
  lines.push(`JS Chunks:         ${jsAnalysis.count}`)
  lines.push(`CSS Files:         ${cssAnalysis.count}`)
  lines.push(`Compression Ratio: ${((jsAnalysis.totalGzipSize / jsAnalysis.totalSize) * 100).toFixed(1)}% (JS)`)
  lines.push('')

  // Budget Status
  lines.push('💰 BUDGET STATUS')
  lines.push('─'.repeat(80))

  const jsStatus = jsAnalysis.totalSize <= SIZE_BUDGETS.totalJS ? '✅ PASS' : '❌ FAIL'
  const cssStatus = cssAnalysis.totalSize <= SIZE_BUDGETS.totalCSS ? '✅ PASS' : '❌ FAIL'

  lines.push(`JS Budget:   ${jsStatus} (${formatBytes(jsAnalysis.totalSize)} / ${formatBytes(SIZE_BUDGETS.totalJS)})`)
  lines.push(`CSS Budget:  ${cssStatus} (${formatBytes(cssAnalysis.totalSize)} / ${formatBytes(SIZE_BUDGETS.totalCSS)})`)
  lines.push('')

  // JavaScript Breakdown by Category
  lines.push('📦 JAVASCRIPT BREAKDOWN BY CATEGORY')
  lines.push('─'.repeat(80))
  Object.entries(jsAnalysis.byCategory)
    .sort((a, b) => b[1].totalSize - a[1].totalSize)
    .forEach(([category, data]) => {
      const percentage = ((data.totalSize / jsAnalysis.totalSize) * 100).toFixed(1)
      lines.push(`${category.padEnd(12)} ${formatBytes(data.totalSize).padEnd(12)} (${percentage}%) - ${data.chunks.length} chunk(s)`)
    })
  lines.push('')

  // Top 10 Largest JS Chunks
  lines.push('🔝 TOP 10 LARGEST JS CHUNKS')
  lines.push('─'.repeat(80))
  jsAnalysis.chunks.slice(0, 10).forEach((chunk, index) => {
    const status = chunk.size > SIZE_BUDGETS.perChunkJS ? '⚠️ ' : '✅ '
    lines.push(`${(index + 1).toString().padStart(2)}. ${status}${chunk.filename}`)
    lines.push(`    Size: ${formatBytes(chunk.size)} (gzip: ${formatBytes(chunk.gzipSize)})`)
    lines.push(`    Category: ${chunk.category}`)
  })
  lines.push('')

  // CSS Files
  if (cssAnalysis.chunks.length > 0) {
    lines.push('🎨 CSS FILES')
    lines.push('─'.repeat(80))
    cssAnalysis.chunks.forEach((chunk, index) => {
      const status = chunk.size > SIZE_BUDGETS.perChunkCSS ? '⚠️ ' : '✅ '
      lines.push(`${(index + 1).toString().padStart(2)}. ${status}${chunk.filename}`)
      lines.push(`    Size: ${formatBytes(chunk.size)} (gzip: ${formatBytes(chunk.gzipSize)})`)
    })
    lines.push('')
  }

  // Warnings and Errors
  if (budgetCheck.warnings.length > 0) {
    lines.push('⚠️  WARNINGS AND ERRORS')
    lines.push('─'.repeat(80))
    budgetCheck.warnings.forEach((warning, index) => {
      const icon = warning.severity === 'ERROR' ? '❌' : warning.severity === 'WARNING' ? '⚠️ ' : 'ℹ️ '
      lines.push(`${(index + 1).toString().padStart(2)}. ${icon} [${warning.severity}] ${warning.message}`)
    })
    lines.push('')
  }

  // Passes
  if (budgetCheck.passes.length > 0) {
    lines.push('✅ PASSED CHECKS')
    lines.push('─'.repeat(80))
    budgetCheck.passes.forEach((pass, index) => {
      lines.push(`${(index + 1).toString().padStart(2)}. ${pass.message}`)
    })
    lines.push('')
  }

  // Recommendations
  lines.push('💡 RECOMMENDATIONS')
  lines.push('─'.repeat(80))

  if (jsAnalysis.totalSize > SIZE_BUDGETS.totalJS) {
    const reduction = ((1 - (SIZE_BUDGETS.totalJS / jsAnalysis.totalSize)) * 100).toFixed(1)
    lines.push(`• Reduce total JS by ${reduction}% to meet budget`)
  }

  if (cssAnalysis.totalSize > SIZE_BUDGETS.totalCSS) {
    const reduction = ((1 - (SIZE_BUDGETS.totalCSS / cssAnalysis.totalSize)) * 100).toFixed(1)
    lines.push(`• Reduce total CSS by ${reduction}% to meet budget`)
    lines.push('  - Enable aggressive Tailwind purging')
    lines.push('  - Remove unused CSS utilities')
    lines.push('  - Optimize custom CSS in globals.css')
  }

  const largeChunks = jsAnalysis.chunks.filter(c => c.size > SIZE_BUDGETS.perChunkJS && c.category !== 'framework')
  if (largeChunks.length > 0) {
    lines.push(`• Split ${largeChunks.length} large chunk(s) for better loading performance`)
    lines.push('  - Consider code splitting with dynamic imports')
    lines.push('  - Review webpack splitChunks configuration')
  }

  lines.push('• Run "npm run build:analyze" to visualize bundle composition')
  lines.push('• Consider lazy loading non-critical components')
  lines.push('• Review and remove unused dependencies')
  lines.push('')

  lines.push('═'.repeat(80))
  lines.push(`Report generated: ${new Date().toISOString()}`)
  lines.push('═'.repeat(80))

  return lines.join('\n')
}

/**
 * Generate JSON report
 */
function generateJSONReport(jsAnalysis, cssAnalysis, budgetCheck) {
  return {
    timestamp: new Date().toISOString(),
    summary: {
      javascript: {
        totalSize: jsAnalysis.totalSize,
        totalGzipSize: jsAnalysis.totalGzipSize,
        chunkCount: jsAnalysis.count,
        compressionRatio: jsAnalysis.totalGzipSize / jsAnalysis.totalSize,
      },
      css: {
        totalSize: cssAnalysis.totalSize,
        totalGzipSize: cssAnalysis.totalGzipSize,
        fileCount: cssAnalysis.count,
        compressionRatio: cssAnalysis.totalGzipSize / cssAnalysis.totalSize,
      },
    },
    budgets: SIZE_BUDGETS,
    budgetStatus: {
      jsTotal: jsAnalysis.totalSize <= SIZE_BUDGETS.totalJS ? 'PASS' : 'FAIL',
      cssTotal: cssAnalysis.totalSize <= SIZE_BUDGETS.totalCSS ? 'PASS' : 'FAIL',
      warnings: budgetCheck.warnings,
      passes: budgetCheck.passes,
    },
    javascript: {
      byCategory: jsAnalysis.byCategory,
      chunks: jsAnalysis.chunks,
    },
    css: {
      chunks: cssAnalysis.chunks,
    },
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main() {
  console.log('\n🚀 Starting bundle size analysis...\n')

  // Check if build directory exists
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`❌ Build directory not found: ${BUILD_DIR}`)
    console.error('Please run "npm run build" first.')
    process.exit(1)
  }

  // Create reports directory if it doesn't exist
  if (!fs.existsSync(REPORT_DIR)) {
    fs.mkdirSync(REPORT_DIR, { recursive: true })
  }

  // Run analyses
  const jsAnalysis = analyzeJavaScript()
  const cssAnalysis = analyzeCSS()
  const budgetCheck = checkBudgets(jsAnalysis, cssAnalysis)

  // Generate reports
  const textReport = generateTextReport(jsAnalysis, cssAnalysis, budgetCheck)
  const jsonReport = generateJSONReport(jsAnalysis, cssAnalysis, budgetCheck)

  // Write text report
  const textReportPath = path.join(REPORT_DIR, 'bundle-analysis.txt')
  fs.writeFileSync(textReportPath, textReport)
  console.log(`\n📄 Text report saved to: ${textReportPath}\n`)

  // Write JSON report
  const jsonReportPath = path.join(REPORT_DIR, 'bundle-analysis.json')
  fs.writeFileSync(jsonReportPath, JSON.stringify(jsonReport, null, 2))
  console.log(`📄 JSON report saved to: ${jsonReportPath}\n`)

  // Print summary to console
  console.log(textReport)

  // Exit with error code if budgets exceeded
  const hasErrors = budgetCheck.warnings.some(w => w.severity === 'ERROR')
  if (hasErrors) {
    console.error('\n❌ Bundle size analysis FAILED - budget exceeded\n')
    process.exit(1)
  } else {
    console.log('\n✅ Bundle size analysis PASSED - all budgets met\n')
    process.exit(0)
  }
}

// Run if executed directly
if (require.main === module) {
  main()
}

module.exports = {
  analyzeJavaScript,
  analyzeCSS,
  checkBudgets,
  formatBytes,
}
