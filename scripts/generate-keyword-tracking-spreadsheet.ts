/**
 * Script to generate keyword tracking spreadsheet template
 * Creates CSV file for tracking cruise keyword rankings and performance
 */

import * as fs from 'fs'
import * as path from 'path'
import { SEARCH_CONSOLE_CONFIG } from '../lib/seo/search-console-monitor'

interface KeywordTrackingRow {
  keyword: string
  category: 'primary' | 'secondary' | 'long-tail' | 'local'
  targetPage: string
  currentPosition?: number
  previousPosition?: number
  positionChange?: number
  impressions?: number
  clicks?: number
  ctr?: number
  searchVolume?: number
  difficulty?: string
  priority: 'high' | 'medium' | 'low'
  status: 'tracking' | 'improving' | 'declining' | 'stable'
  notes?: string
  lastUpdated: string
}

/**
 * Generate keyword tracking data structure
 */
function generateKeywordTrackingData(): KeywordTrackingRow[] {
  const { targetKeywords } = SEARCH_CONSOLE_CONFIG
  const rows: KeywordTrackingRow[] = []

  // Map keywords to their target pages
  const keywordPageMap: Record<string, string> = {
    'cruises from Newark': '/cruises/from-newark',
    'cruises from New Jersey': '/cruises',
    'Cape Liberty cruises': '/cruises/cape-liberty-port',
    'Essex County cruises': '/cruises',
    'Newark cruise deals': '/cruises/deals',
    'NJ cruise packages': '/cruises',
    'cheap cruises from Newark': '/cruises/cheap-cruises',
    'last minute cruises Newark': '/cruises/last-minute',
    'Caribbean cruises from NJ': '/cruises/caribbean',
    'Royal Caribbean Newark': '/cruises/royal-caribbean',
    'cruise deals Essex County': '/cruises/deals',
    'affordable cruises New Jersey': '/cruises/cheap-cruises',
    'family cruises from Newark': '/cruises',
    'weekend cruises from NJ': '/cruises',
    'cruise vacation Newark': '/cruises',
    'best cruises from New Jersey': '/cruises',
    'cruise lines Cape Liberty': '/cruises/cape-liberty-port',
    'Newark to Caribbean cruise': '/cruises/caribbean',
    'Alaska cruises from Newark': '/cruises/alaska',
    'Mediterranean cruises from NJ': '/cruises/mediterranean',
  }

  // Process primary keywords
  targetKeywords.primary.forEach(keyword => {
    rows.push({
      keyword,
      category: 'primary',
      targetPage: keywordPageMap[keyword] || '/cruises',
      priority: 'high',
      status: 'tracking',
      lastUpdated: new Date().toISOString().split('T')[0],
    })
  })

  // Process secondary keywords
  targetKeywords.secondary.forEach(keyword => {
    rows.push({
      keyword,
      category: 'secondary',
      targetPage: keywordPageMap[keyword] || '/cruises',
      priority: 'medium',
      status: 'tracking',
      lastUpdated: new Date().toISOString().split('T')[0],
    })
  })

  // Process long-tail keywords
  targetKeywords.longTail.forEach(keyword => {
    rows.push({
      keyword,
      category: 'long-tail',
      targetPage: keywordPageMap[keyword] || '/cruises',
      priority: 'low',
      status: 'tracking',
      lastUpdated: new Date().toISOString().split('T')[0],
    })
  })

  // Process local keywords
  targetKeywords.local.forEach(keyword => {
    rows.push({
      keyword,
      category: 'local',
      targetPage: keywordPageMap[keyword] || '/cruises',
      priority: 'high',
      status: 'tracking',
      lastUpdated: new Date().toISOString().split('T')[0],
    })
  })

  return rows
}

/**
 * Convert data to CSV format
 */
function convertToCSV(data: KeywordTrackingRow[]): string {
  const headers = [
    'Keyword',
    'Category',
    'Target Page',
    'Current Position',
    'Previous Position',
    'Position Change',
    'Impressions',
    'Clicks',
    'CTR (%)',
    'Search Volume',
    'Difficulty',
    'Priority',
    'Status',
    'Notes',
    'Last Updated',
  ]

  const rows = data.map(row => [
    row.keyword,
    row.category,
    row.targetPage,
    row.currentPosition || '',
    row.previousPosition || '',
    row.positionChange || '',
    row.impressions || '',
    row.clicks || '',
    row.ctr ? `${row.ctr}%` : '',
    row.searchVolume || '',
    row.difficulty || '',
    row.priority,
    row.status,
    row.notes || '',
    row.lastUpdated,
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n')

  return csvContent
}

/**
 * Generate weekly performance tracking template
 */
function generateWeeklyTemplate(): string {
  const weeks = 12 // Track 12 weeks
  const headers = ['Week Ending', 'Total Keywords Tracked', 'Top 10', 'Top 20', 'Top 50', 'Not Ranking', 'Avg Position', 'Total Impressions', 'Total Clicks', 'Avg CTR']

  const rows = []
  const today = new Date()

  for (let i = 0; i < weeks; i++) {
    const weekEnding = new Date(today)
    weekEnding.setDate(today.getDate() + (i * 7))
    rows.push([
      weekEnding.toISOString().split('T')[0],
      '', '', '', '', '', '', '', '', ''
    ])
  }

  return [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n')
}

/**
 * Generate competitor tracking template
 */
function generateCompetitorTemplate(): string {
  const competitors = [
    'competitor1.com',
    'competitor2.com',
    'competitor3.com',
    'competitor4.com',
  ]

  const headers = ['Keyword', 'Our Position', ...competitors.map(c => `${c} Position`), 'Gap to #1', 'Opportunity Score']

  const keywords = [
    'cruises from Newark',
    'Cape Liberty cruises',
    'New Jersey cruises',
    'Newark cruise deals',
    'Caribbean cruises from NJ',
  ]

  const rows = keywords.map(keyword => [
    keyword,
    '', // Our position
    ...competitors.map(() => ''), // Competitor positions
    '', // Gap
    '', // Opportunity
  ])

  return [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n')
}

/**
 * Main function to generate all tracking spreadsheets
 */
function main() {
  const outputDir = path.join(process.cwd(), 'tracking-spreadsheets')

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Generate keyword tracking spreadsheet
  const keywordData = generateKeywordTrackingData()
  const keywordCSV = convertToCSV(keywordData)
  fs.writeFileSync(path.join(outputDir, 'cruise-keyword-tracking.csv'), keywordCSV)
  console.log('✅ Generated cruise-keyword-tracking.csv')

  // Generate weekly performance tracking
  const weeklyCSV = generateWeeklyTemplate()
  fs.writeFileSync(path.join(outputDir, 'weekly-performance-tracking.csv'), weeklyCSV)
  console.log('✅ Generated weekly-performance-tracking.csv')

  // Generate competitor tracking
  const competitorCSV = generateCompetitorTemplate()
  fs.writeFileSync(path.join(outputDir, 'competitor-tracking.csv'), competitorCSV)
  console.log('✅ Generated competitor-tracking.csv')

  // Generate summary JSON for programmatic access
  const summaryData = {
    totalKeywords: keywordData.length,
    byCategory: {
      primary: keywordData.filter(k => k.category === 'primary').length,
      secondary: keywordData.filter(k => k.category === 'secondary').length,
      longTail: keywordData.filter(k => k.category === 'long-tail').length,
      local: keywordData.filter(k => k.category === 'local').length,
    },
    byPriority: {
      high: keywordData.filter(k => k.priority === 'high').length,
      medium: keywordData.filter(k => k.priority === 'medium').length,
      low: keywordData.filter(k => k.priority === 'low').length,
    },
    targetPages: [...new Set(keywordData.map(k => k.targetPage))],
    generatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(
    path.join(outputDir, 'tracking-summary.json'),
    JSON.stringify(summaryData, null, 2)
  )
  console.log('✅ Generated tracking-summary.json')

  // Generate README with instructions
  const readme = `# Cruise Keyword Tracking Spreadsheets

Generated: ${new Date().toISOString()}

## Files Generated

1. **cruise-keyword-tracking.csv**
   - Main keyword tracking spreadsheet
   - ${keywordData.length} keywords across all categories
   - Track positions, impressions, clicks, and CTR

2. **weekly-performance-tracking.csv**
   - 12-week performance tracking template
   - Monitor progress over time
   - Track ranking distribution

3. **competitor-tracking.csv**
   - Compare rankings with competitors
   - Identify opportunities
   - Track competitive gaps

4. **tracking-summary.json**
   - Programmatic access to tracking data
   - Category and priority breakdowns
   - Target page mapping

## How to Use

### Google Sheets Setup

1. **Import CSV Files**:
   - Open Google Sheets
   - File > Import > Upload
   - Select the CSV file
   - Choose "Replace spreadsheet"

2. **Set Up Formulas**:
   - Position Change: =C2-D2 (Current - Previous)
   - CTR: =H2/G2*100 (Clicks/Impressions)
   - Opportunity Score: Based on volume and current position

3. **Create Charts**:
   - Position trends over time
   - CTR by keyword category
   - Traffic growth charts

### Update Schedule

- **Daily**: Check positions for primary keywords
- **Weekly**: Full position update and report
- **Monthly**: Comprehensive analysis and strategy review

## Tracking Guidelines

### Priority Levels

- **High**: Primary and local keywords - check daily
- **Medium**: Secondary keywords - check 2-3x per week
- **Low**: Long-tail keywords - check weekly

### Status Definitions

- **Tracking**: Newly added, establishing baseline
- **Improving**: Position improving over last 7 days
- **Declining**: Position declining, needs attention
- **Stable**: Position steady (+/- 2 positions)

### Action Items by Position

- **Not ranking (>100)**: Content creation needed
- **51-100**: On-page optimization required
- **21-50**: Link building and content enhancement
- **11-20**: Technical SEO and user signals
- **6-10**: Final push with CTR optimization
- **1-5**: Maintain and defend position

## Data Sources

### Manual Updates

1. **Google Search Console**:
   - Performance > Search results
   - Filter by page or query
   - Export data

2. **Third-Party Tools**:
   - SEMrush position tracking
   - Ahrefs rank tracker
   - Moz Pro campaigns

### Automated Updates

Consider using:
- Google Search Console API
- SEMrush API
- Custom tracking scripts

## Reporting

### Weekly Report Format

\`\`\`
Week of: [Date]

Summary:
- Keywords in top 10: X/Y
- Average position change: +/- X
- Total impressions: X,XXX
- Total clicks: XXX

Improvements:
- [Keyword]: Position X → Y

Needs Attention:
- [Keyword]: Position X → Y

Next Week Focus:
- [Action items]
\`\`\`

## Notes

- Baseline positions captured before Phase 1 launch
- Track both desktop and mobile positions
- Consider local pack rankings separately
- Monitor featured snippets opportunities

---

For questions or updates, contact the SEO team.
`

  fs.writeFileSync(path.join(outputDir, 'README.md'), readme)
  console.log('✅ Generated README.md')

  console.log(`\n📊 All tracking spreadsheets generated in: ${outputDir}`)
}

// Run the script
if (require.main === module) {
  main()
}

export { generateKeywordTrackingData, convertToCSV }