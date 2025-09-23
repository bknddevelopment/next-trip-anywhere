/**
 * Google Search Console monitoring configuration and utilities
 * Provides tools for monitoring cruise page performance in search results
 */

// Search Console API configuration
export const SEARCH_CONSOLE_CONFIG = {
  siteUrl: 'https://nexttripanywhere.com',
  apiEndpoint: 'https://searchconsole.googleapis.com/v1',

  // Cruise-specific URL patterns to monitor
  cruiseUrlPatterns: [
    '/cruises',
    '/cruises/*',
    '/cruises/from-*',
    '/cruises/deals',
    '/cruises/cheap-cruises',
    '/cruises/last-minute',
    '/cruises/caribbean*',
    '/cruises/alaska*',
    '/cruises/mediterranean*',
    '/cruises/bahamas*',
    '/cruises/hawaii*',
    '/cruises/european*',
    '/cruises/royal-caribbean*',
    '/cruises/carnival*',
    '/cruises/norwegian*',
    '/cruises/celebrity*',
    '/cruises/princess*',
    '/cruises/2025*',
    '/cruises/cape-liberty-port*',
    '/cruises/from-newark*',
  ],

  // Target keywords to monitor
  targetKeywords: {
    primary: [
      'cruises from Newark',
      'cruises from New Jersey',
      'Cape Liberty cruises',
      'Essex County cruises',
      'Newark cruise deals',
      'NJ cruise packages',
      'cheap cruises from Newark',
      'last minute cruises Newark',
      'Caribbean cruises from NJ',
      'Royal Caribbean Newark',
    ],
    secondary: [
      'cruise deals Essex County',
      'affordable cruises New Jersey',
      'family cruises from Newark',
      'weekend cruises from NJ',
      'cruise vacation Newark',
      'best cruises from New Jersey',
      'cruise lines Cape Liberty',
      'Newark to Caribbean cruise',
      'Alaska cruises from Newark',
      'Mediterranean cruises from NJ',
    ],
    longTail: [
      'best cruise deals from Newark New Jersey',
      'cheap Caribbean cruises from Cape Liberty',
      'all inclusive cruises from Newark NJ',
      'family friendly cruises from New Jersey',
      'luxury cruises departing Newark',
      'senior cruise deals from Newark',
      'group cruises from Essex County',
      'honeymoon cruises from New Jersey',
      'spring break cruises Newark',
      'summer cruises from Cape Liberty',
    ],
    local: [
      'Newark travel agency cruises',
      'Essex County cruise planning',
      'local cruise agent Newark',
      'cruise booking Newark NJ',
      'cruise specialists New Jersey',
      'Newark cruise consultants',
      'cruise travel agent near me Newark',
      'book cruise Essex County',
      'cruise vacation planner NJ',
      'Newark cruise experts',
    ],
  },

  // Performance thresholds for alerts
  performanceThresholds: {
    impressions: {
      daily: { min: 100, warning: 50 },
      weekly: { min: 700, warning: 350 },
      monthly: { min: 3000, warning: 1500 },
    },
    clicks: {
      daily: { min: 10, warning: 5 },
      weekly: { min: 70, warning: 35 },
      monthly: { min: 300, warning: 150 },
    },
    ctr: {
      min: 0.02, // 2% minimum CTR
      target: 0.05, // 5% target CTR
      good: 0.08, // 8% good CTR
    },
    position: {
      target: 10, // Top 10 results
      good: 5, // Top 5 results
      excellent: 3, // Top 3 results
    },
  },

  // Monitoring dimensions
  dimensions: ['query', 'page', 'country', 'device', 'searchType', 'date'],

  // Metrics to track
  metrics: ['impressions', 'clicks', 'ctr', 'position'],
}

/**
 * Interface for Search Console data
 */
export interface SearchConsoleData {
  date: string
  query?: string
  page?: string
  device?: 'desktop' | 'mobile' | 'tablet'
  country?: string
  impressions: number
  clicks: number
  ctr: number
  position: number
}

/**
 * Interface for performance report
 */
export interface PerformanceReport {
  period: 'daily' | 'weekly' | 'monthly'
  startDate: string
  endDate: string
  totalImpressions: number
  totalClicks: number
  averageCTR: number
  averagePosition: number
  topQueries: Array<{
    query: string
    impressions: number
    clicks: number
    ctr: number
    position: number
  }>
  topPages: Array<{
    page: string
    impressions: number
    clicks: number
    ctr: number
    position: number
  }>
  trends: {
    impressionsTrend: 'up' | 'down' | 'stable'
    clicksTrend: 'up' | 'down' | 'stable'
    positionTrend: 'improving' | 'declining' | 'stable'
  }
  alerts: Array<{
    type: 'warning' | 'error' | 'success'
    message: string
    metric: string
    value: number
  }>
}

/**
 * Generate performance alerts based on thresholds
 */
export function generatePerformanceAlerts(data: SearchConsoleData[]): PerformanceReport['alerts'] {
  const alerts: PerformanceReport['alerts'] = []
  const thresholds = SEARCH_CONSOLE_CONFIG.performanceThresholds

  // Calculate totals
  const totalImpressions = data.reduce((sum, d) => sum + d.impressions, 0)
  const totalClicks = data.reduce((sum, d) => sum + d.clicks, 0)
  const avgCTR = totalClicks / totalImpressions
  const avgPosition = data.reduce((sum, d) => sum + d.position, 0) / data.length

  // Check impressions
  if (totalImpressions < thresholds.impressions.daily.warning) {
    alerts.push({
      type: 'warning',
      message: `Low impressions: ${totalImpressions} (below warning threshold)`,
      metric: 'impressions',
      value: totalImpressions,
    })
  }

  // Check clicks
  if (totalClicks < thresholds.clicks.daily.warning) {
    alerts.push({
      type: 'warning',
      message: `Low clicks: ${totalClicks} (below warning threshold)`,
      metric: 'clicks',
      value: totalClicks,
    })
  }

  // Check CTR
  if (avgCTR < thresholds.ctr.min) {
    alerts.push({
      type: 'error',
      message: `CTR below minimum: ${(avgCTR * 100).toFixed(2)}%`,
      metric: 'ctr',
      value: avgCTR,
    })
  } else if (avgCTR >= thresholds.ctr.good) {
    alerts.push({
      type: 'success',
      message: `Excellent CTR: ${(avgCTR * 100).toFixed(2)}%`,
      metric: 'ctr',
      value: avgCTR,
    })
  }

  // Check average position
  if (avgPosition > thresholds.position.target) {
    alerts.push({
      type: 'warning',
      message: `Average position needs improvement: ${avgPosition.toFixed(1)}`,
      metric: 'position',
      value: avgPosition,
    })
  } else if (avgPosition <= thresholds.position.excellent) {
    alerts.push({
      type: 'success',
      message: `Excellent average position: ${avgPosition.toFixed(1)}`,
      metric: 'position',
      value: avgPosition,
    })
  }

  return alerts
}

/**
 * Calculate performance trends
 */
export function calculateTrends(
  currentPeriod: SearchConsoleData[],
  previousPeriod: SearchConsoleData[]
): PerformanceReport['trends'] {
  const currentImpressions = currentPeriod.reduce((sum, d) => sum + d.impressions, 0)
  const previousImpressions = previousPeriod.reduce((sum, d) => sum + d.impressions, 0)

  const currentClicks = currentPeriod.reduce((sum, d) => sum + d.clicks, 0)
  const previousClicks = previousPeriod.reduce((sum, d) => sum + d.clicks, 0)

  const currentAvgPosition =
    currentPeriod.reduce((sum, d) => sum + d.position, 0) / currentPeriod.length
  const previousAvgPosition =
    previousPeriod.reduce((sum, d) => sum + d.position, 0) / previousPeriod.length

  return {
    impressionsTrend:
      currentImpressions > previousImpressions * 1.1
        ? 'up'
        : currentImpressions < previousImpressions * 0.9
          ? 'down'
          : 'stable',
    clicksTrend:
      currentClicks > previousClicks * 1.1
        ? 'up'
        : currentClicks < previousClicks * 0.9
          ? 'down'
          : 'stable',
    positionTrend:
      currentAvgPosition < previousAvgPosition - 0.5
        ? 'improving'
        : currentAvgPosition > previousAvgPosition + 0.5
          ? 'declining'
          : 'stable',
  }
}

/**
 * Get top performing queries
 */
export function getTopQueries(data: SearchConsoleData[], limit: number = 10) {
  const queryMap = new Map<string, SearchConsoleData>()

  data.forEach((item) => {
    if (item.query) {
      const existing = queryMap.get(item.query)
      if (existing) {
        existing.impressions += item.impressions
        existing.clicks += item.clicks
      } else {
        queryMap.set(item.query, { ...item })
      }
    }
  })

  return Array.from(queryMap.values())
    .map((d) => ({
      query: d.query!,
      impressions: d.impressions,
      clicks: d.clicks,
      ctr: d.clicks / d.impressions,
      position: d.position,
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, limit)
}

/**
 * Get top performing pages
 */
export function getTopPages(data: SearchConsoleData[], limit: number = 10) {
  const pageMap = new Map<string, SearchConsoleData>()

  data.forEach((item) => {
    if (item.page) {
      const existing = pageMap.get(item.page)
      if (existing) {
        existing.impressions += item.impressions
        existing.clicks += item.clicks
      } else {
        pageMap.set(item.page, { ...item })
      }
    }
  })

  return Array.from(pageMap.values())
    .map((d) => ({
      page: d.page!,
      impressions: d.impressions,
      clicks: d.clicks,
      ctr: d.clicks / d.impressions,
      position: d.position,
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, limit)
}

/**
 * Monitor keyword rankings
 */
export function monitorKeywordRankings(data: SearchConsoleData[]) {
  const { targetKeywords } = SEARCH_CONSOLE_CONFIG
  const allKeywords = [
    ...targetKeywords.primary,
    ...targetKeywords.secondary,
    ...targetKeywords.longTail,
    ...targetKeywords.local,
  ]

  const rankings: Record<string, { position: number; impressions: number; clicks: number }> = {}

  data.forEach((item) => {
    if (item.query) {
      const matchedKeyword = allKeywords.find((kw) =>
        item.query!.toLowerCase().includes(kw.toLowerCase())
      )

      if (matchedKeyword) {
        if (!rankings[matchedKeyword]) {
          rankings[matchedKeyword] = { position: 0, impressions: 0, clicks: 0 }
        }
        rankings[matchedKeyword].position = item.position
        rankings[matchedKeyword].impressions += item.impressions
        rankings[matchedKeyword].clicks += item.clicks
      }
    }
  })

  return rankings
}

/**
 * Generate indexing requests for new cruise pages
 */
export function generateIndexingRequests(urls: string[]) {
  return urls.map((url) => ({
    url: `https://nexttripanywhere.com${url}`,
    type: 'URL_UPDATED' as const,
    notifyTime: new Date().toISOString(),
  }))
}

/**
 * Create performance tracking spreadsheet data
 */
export function createTrackingSpreadsheetData(report: PerformanceReport) {
  return {
    summary: [
      ['Metric', 'Value', 'Trend', 'Status'],
      ['Total Impressions', report.totalImpressions, report.trends.impressionsTrend, ''],
      ['Total Clicks', report.totalClicks, report.trends.clicksTrend, ''],
      ['Average CTR', `${(report.averageCTR * 100).toFixed(2)}%`, '', ''],
      ['Average Position', report.averagePosition.toFixed(1), report.trends.positionTrend, ''],
    ],
    topQueries: [
      ['Query', 'Impressions', 'Clicks', 'CTR', 'Position'],
      ...report.topQueries.map((q) => [
        q.query,
        q.impressions,
        q.clicks,
        `${(q.ctr * 100).toFixed(2)}%`,
        q.position.toFixed(1),
      ]),
    ],
    topPages: [
      ['Page', 'Impressions', 'Clicks', 'CTR', 'Position'],
      ...report.topPages.map((p) => [
        p.page,
        p.impressions,
        p.clicks,
        `${(p.ctr * 100).toFixed(2)}%`,
        p.position.toFixed(1),
      ]),
    ],
    alerts: [
      ['Type', 'Message', 'Metric', 'Value'],
      ...report.alerts.map((a) => [a.type, a.message, a.metric, a.value]),
    ],
  }
}
