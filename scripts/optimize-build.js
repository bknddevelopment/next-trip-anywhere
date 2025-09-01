#!/usr/bin/env node

/**
 * Build optimization script
 * Analyzes and optimizes the production build
 */

const fs = require('fs').promises;
const path = require('path');
const { gzip } = require('zlib');
const { promisify } = require('util');
const crypto = require('crypto');

const gzipAsync = promisify(gzip);

// Configuration
const BUILD_DIR = path.join(process.cwd(), 'out');
const REPORTS_DIR = path.join(process.cwd(), 'build-reports');
const SIZE_THRESHOLD = {
  JS: 200 * 1024,      // 200KB for JS files
  CSS: 50 * 1024,      // 50KB for CSS files
  IMAGE: 100 * 1024,   // 100KB for images
  TOTAL: 5 * 1024 * 1024  // 5MB total
};

// Utility functions
async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return stats.size;
}

async function getGzipSize(filePath) {
  const content = await fs.readFile(filePath);
  const compressed = await gzipAsync(content);
  return compressed.length;
}

function formatSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

function getFileHash(content) {
  return crypto.createHash('md5').update(content).digest('hex').substring(0, 8);
}

// Analysis functions
async function analyzeBundle() {
  console.log('📊 Analyzing build bundle...\n');
  
  const report = {
    timestamp: new Date().toISOString(),
    files: [],
    summary: {
      totalSize: 0,
      totalGzipSize: 0,
      fileCount: 0,
      largeFiles: [],
      duplicates: []
    }
  };

  async function walkDir(dir, baseDir = dir) {
    const files = await fs.readdir(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isDirectory()) {
        await walkDir(filePath, baseDir);
      } else {
        const ext = path.extname(file).toLowerCase();
        const size = stat.size;
        const relativePath = path.relative(baseDir, filePath);
        
        const fileInfo = {
          path: relativePath,
          size,
          sizeFormatted: formatSize(size),
          extension: ext
        };

        // Get gzip size for JS and CSS files
        if (['.js', '.css', '.html'].includes(ext)) {
          const gzipSize = await getGzipSize(filePath);
          fileInfo.gzipSize = gzipSize;
          fileInfo.gzipSizeFormatted = formatSize(gzipSize);
          fileInfo.compressionRatio = ((1 - gzipSize / size) * 100).toFixed(1) + '%';
          report.summary.totalGzipSize += gzipSize;
        }

        // Check for large files
        if (
          (ext === '.js' && size > SIZE_THRESHOLD.JS) ||
          (ext === '.css' && size > SIZE_THRESHOLD.CSS) ||
          (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext) && size > SIZE_THRESHOLD.IMAGE)
        ) {
          report.summary.largeFiles.push(fileInfo);
        }

        report.files.push(fileInfo);
        report.summary.totalSize += size;
        report.summary.fileCount++;
      }
    }
  }

  await walkDir(BUILD_DIR);

  // Sort files by size
  report.files.sort((a, b) => b.size - a.size);
  report.summary.largeFiles.sort((a, b) => b.size - a.size);

  return report;
}

async function findDuplicates() {
  console.log('🔍 Checking for duplicate files...\n');
  
  const hashes = new Map();
  const duplicates = [];

  async function processFile(filePath) {
    const content = await fs.readFile(filePath);
    const hash = getFileHash(content);
    const size = content.length;
    
    if (hashes.has(hash)) {
      const existing = hashes.get(hash);
      duplicates.push({
        files: [existing.path, filePath],
        size,
        hash
      });
    } else {
      hashes.set(hash, { path: filePath, size });
    }
  }

  async function walkDir(dir) {
    const files = await fs.readdir(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isDirectory()) {
        await walkDir(filePath);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (['.js', '.css'].includes(ext)) {
          await processFile(filePath);
        }
      }
    }
  }

  await walkDir(BUILD_DIR);
  
  return duplicates;
}

async function analyzePerformance() {
  console.log('⚡ Analyzing performance metrics...\n');
  
  const metrics = {
    criticalResources: [],
    recommendations: []
  };

  // Check for critical resources
  const indexPath = path.join(BUILD_DIR, 'index.html');
  if (await fs.access(indexPath).then(() => true).catch(() => false)) {
    const indexContent = await fs.readFile(indexPath, 'utf-8');
    
    // Find critical CSS
    const inlineStyles = indexContent.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
    metrics.criticalResources.push({
      type: 'Inline CSS',
      count: inlineStyles.length,
      recommendation: inlineStyles.length > 2 ? 'Consider consolidating inline styles' : 'Good'
    });

    // Find critical JS
    const inlineScripts = indexContent.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];
    const criticalScripts = inlineScripts.filter(s => !s.includes('async') && !s.includes('defer'));
    metrics.criticalResources.push({
      type: 'Blocking Scripts',
      count: criticalScripts.length,
      recommendation: criticalScripts.length > 0 ? 'Add async or defer to non-critical scripts' : 'Good'
    });
  }

  // Performance recommendations
  const report = await analyzeBundle();
  
  if (report.summary.totalSize > SIZE_THRESHOLD.TOTAL) {
    metrics.recommendations.push({
      severity: 'high',
      message: `Total bundle size (${formatSize(report.summary.totalSize)}) exceeds recommended ${formatSize(SIZE_THRESHOLD.TOTAL)}`
    });
  }

  if (report.summary.largeFiles.length > 0) {
    metrics.recommendations.push({
      severity: 'medium',
      message: `Found ${report.summary.largeFiles.length} files exceeding size thresholds`,
      files: report.summary.largeFiles.slice(0, 5).map(f => `${f.path} (${f.sizeFormatted})`)
    });
  }

  return metrics;
}

async function generateReport(report, duplicates, performance) {
  console.log('\n📝 Generating build report...\n');
  
  // Ensure reports directory exists
  await fs.mkdir(REPORTS_DIR, { recursive: true });
  
  const fullReport = {
    ...report,
    duplicates,
    performance,
    recommendations: []
  };

  // Add recommendations
  if (report.summary.totalSize > SIZE_THRESHOLD.TOTAL) {
    fullReport.recommendations.push('⚠️ Total bundle size exceeds 5MB - consider code splitting');
  }

  if (duplicates.length > 0) {
    fullReport.recommendations.push(`⚠️ Found ${duplicates.length} duplicate files - consider deduplication`);
  }

  if (report.summary.largeFiles.length > 0) {
    fullReport.recommendations.push(`⚠️ ${report.summary.largeFiles.length} files exceed size thresholds`);
  }

  // Save JSON report
  const reportPath = path.join(REPORTS_DIR, `build-report-${Date.now()}.json`);
  await fs.writeFile(reportPath, JSON.stringify(fullReport, null, 2));

  // Generate HTML report
  const htmlReport = generateHTMLReport(fullReport);
  const htmlPath = path.join(REPORTS_DIR, 'latest-report.html');
  await fs.writeFile(htmlPath, htmlReport);

  return { reportPath, htmlPath };
}

function generateHTMLReport(report) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Build Report - ${new Date(report.timestamp).toLocaleString()}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 20px; }
    h1, h2 { color: #333; }
    .summary { background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .metric { display: inline-block; margin-right: 30px; }
    .warning { background: #fff3cd; color: #856404; padding: 10px; border-radius: 5px; margin: 10px 0; }
    .error { background: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin: 10px 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
    .large-file { color: #d73027; font-weight: bold; }
  </style>
</head>
<body>
  <h1>Build Report</h1>
  <p>Generated: ${new Date(report.timestamp).toLocaleString()}</p>
  
  <div class="summary">
    <h2>Summary</h2>
    <div class="metric">Total Size: <strong>${formatSize(report.summary.totalSize)}</strong></div>
    <div class="metric">Gzip Size: <strong>${formatSize(report.summary.totalGzipSize)}</strong></div>
    <div class="metric">Files: <strong>${report.summary.fileCount}</strong></div>
    <div class="metric">Large Files: <strong>${report.summary.largeFiles.length}</strong></div>
  </div>

  ${report.recommendations.length > 0 ? `
  <div>
    <h2>Recommendations</h2>
    ${report.recommendations.map(r => `<div class="warning">${r}</div>`).join('')}
  </div>
  ` : ''}

  ${report.performance?.recommendations?.length > 0 ? `
  <div>
    <h2>Performance Issues</h2>
    ${report.performance.recommendations.map(r => `
      <div class="${r.severity === 'high' ? 'error' : 'warning'}">
        ${r.message}
        ${r.files ? '<ul>' + r.files.map(f => `<li>${f}</li>`).join('') + '</ul>' : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  <h2>Largest Files</h2>
  <table>
    <thead>
      <tr>
        <th>File</th>
        <th>Size</th>
        <th>Gzip Size</th>
        <th>Compression</th>
      </tr>
    </thead>
    <tbody>
      ${report.files.slice(0, 20).map(f => `
        <tr class="${report.summary.largeFiles.includes(f) ? 'large-file' : ''}">
          <td>${f.path}</td>
          <td>${f.sizeFormatted}</td>
          <td>${f.gzipSizeFormatted || '-'}</td>
          <td>${f.compressionRatio || '-'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>
  `;
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting build optimization analysis...\n');
    
    // Check if build directory exists
    try {
      await fs.access(BUILD_DIR);
    } catch {
      console.error('❌ Build directory not found. Please run "npm run build" first.');
      process.exit(1);
    }

    // Run analyses
    const report = await analyzeBundle();
    const duplicates = await findDuplicates();
    const performance = await analyzePerformance();

    // Generate report
    const { reportPath, htmlPath } = await generateReport(report, duplicates, performance);

    // Print summary
    console.log('\n✅ Build Analysis Complete!\n');
    console.log('📊 Summary:');
    console.log(`   Total Size: ${formatSize(report.summary.totalSize)}`);
    console.log(`   Gzip Size: ${formatSize(report.summary.totalGzipSize)}`);
    console.log(`   Total Files: ${report.summary.fileCount}`);
    console.log(`   Large Files: ${report.summary.largeFiles.length}`);
    console.log(`   Duplicates: ${duplicates.length}`);
    
    if (report.recommendations.length > 0) {
      console.log('\n⚠️  Recommendations:');
      report.recommendations.forEach(r => console.log(`   - ${r}`));
    }

    console.log('\n📄 Reports saved:');
    console.log(`   JSON: ${reportPath}`);
    console.log(`   HTML: ${htmlPath}`);
    console.log('\n✨ Open the HTML report in your browser for detailed analysis.');

    // Exit with error if bundle is too large
    if (report.summary.totalSize > SIZE_THRESHOLD.TOTAL) {
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error during build analysis:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { analyzeBundle, findDuplicates, analyzePerformance };