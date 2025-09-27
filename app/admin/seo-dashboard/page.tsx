import { Metadata } from 'next'
// import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

// Force static generation for this page
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'SEO Dashboard - Next Trip Anywhere Admin',
  description: 'Monitor SEO health, indexation status, and Core Web Vitals',
  robots: 'noindex, nofollow',
}

/**
 * SEO Monitoring Dashboard for 500+ Page Site
 * Provides real-time SEO health monitoring and reporting
 */
export default async function SEODashboard() {
  // Auth check disabled for static export
  // const headersList = await headers()
  // const authHeader = headersList.get('authorization')

  // Basic protection - disabled for static export
  // if (process.env.NODE_ENV === 'production' && !authHeader) {
  //   notFound()
  // }

  // Simulated metrics - in production, fetch from analytics API
  const metrics = {
    totalPages: 458,
    indexedPages: 412,
    crawlErrors: 3,
    brokenLinks: 2,
    missingMeta: 5,
    duplicateTitles: 8,
    coreWebVitals: {
      lcp: { good: 78, needsImprovement: 15, poor: 7 },
      inp: { good: 82, needsImprovement: 12, poor: 6 },
      cls: { good: 91, needsImprovement: 6, poor: 3 },
    },
    topPages: [
      { url: '/cruises/caribbean-cruises', visits: 15234, ctr: 4.2 },
      { url: '/cruises/from-newark', visits: 12456, ctr: 3.8 },
      { url: '/packages/all-inclusive-caribbean', visits: 9876, ctr: 3.5 },
      { url: '/destinations/bahamas-from-newark', visits: 8234, ctr: 3.2 },
      { url: '/essex-county', visits: 7654, ctr: 2.9 },
    ],
    recentCrawls: [
      { date: '2025-01-24', pages: 458, errors: 0 },
      { date: '2025-01-23', pages: 456, errors: 2 },
      { date: '2025-01-22', pages: 455, errors: 1 },
      { date: '2025-01-21', pages: 454, errors: 3 },
      { date: '2025-01-20', pages: 452, errors: 0 },
    ],
  }

  const indexationRate = ((metrics.indexedPages / metrics.totalPages) * 100).toFixed(1)
  const healthScore = Math.round(
    (metrics.indexedPages / metrics.totalPages) * 100 -
      metrics.crawlErrors * 2 -
      metrics.brokenLinks * 3 -
      metrics.missingMeta -
      metrics.duplicateTitles * 0.5
  )

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SEO Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor site health for 500+ pages</p>
        </div>

        {/* Health Score */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Overall SEO Health</h2>
          <div className="flex items-center space-x-4">
            <div
              className={`text-5xl font-bold ${
                healthScore >= 90
                  ? 'text-green-600'
                  : healthScore >= 70
                    ? 'text-yellow-600'
                    : 'text-red-600'
              }`}
            >
              {healthScore}%
            </div>
            <div className="flex-1">
              <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    healthScore >= 90
                      ? 'bg-green-600'
                      : healthScore >= 70
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                  }`}
                  style={{ width: `${healthScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Total Pages" value={metrics.totalPages} status="neutral" />
          <MetricCard
            title="Indexed Pages"
            value={`${metrics.indexedPages} (${indexationRate}%)`}
            status={parseFloat(indexationRate) >= 90 ? 'good' : 'warning'}
          />
          <MetricCard
            title="Crawl Errors"
            value={metrics.crawlErrors}
            status={
              metrics.crawlErrors === 0 ? 'good' : metrics.crawlErrors > 5 ? 'error' : 'warning'
            }
          />
          <MetricCard
            title="Broken Links"
            value={metrics.brokenLinks}
            status={metrics.brokenLinks === 0 ? 'good' : 'error'}
          />
        </div>

        {/* Core Web Vitals */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Core Web Vitals (% of pages)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <WebVitalMetric
              name="LCP (Largest Contentful Paint)"
              target="< 2.5s"
              data={metrics.coreWebVitals.lcp}
            />
            <WebVitalMetric
              name="INP (Interaction to Next Paint)"
              target="< 200ms"
              data={metrics.coreWebVitals.inp}
            />
            <WebVitalMetric
              name="CLS (Cumulative Layout Shift)"
              target="< 0.1"
              data={metrics.coreWebVitals.cls}
            />
          </div>
        </div>

        {/* Issues to Fix */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Issues Requiring Attention</h2>
          <div className="space-y-3">
            <IssueItem
              type="error"
              count={metrics.brokenLinks}
              description="Broken internal links"
              action="Fix immediately"
            />
            <IssueItem
              type="warning"
              count={metrics.missingMeta}
              description="Pages with missing meta descriptions"
              action="Add descriptions"
            />
            <IssueItem
              type="warning"
              count={metrics.duplicateTitles}
              description="Duplicate title tags"
              action="Make unique"
            />
            <IssueItem
              type="info"
              count={metrics.totalPages - metrics.indexedPages}
              description="Pages not indexed"
              action="Review and optimize"
            />
          </div>
        </div>

        {/* Top Performing Pages */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Top Performing Pages</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">URL</th>
                  <th className="text-right py-2">Visits</th>
                  <th className="text-right py-2">CTR</th>
                </tr>
              </thead>
              <tbody>
                {metrics.topPages.map((page, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">
                      <a href={page.url} className="text-blue-600 hover:underline">
                        {page.url}
                      </a>
                    </td>
                    <td className="text-right py-2">{page.visits.toLocaleString()}</td>
                    <td className="text-right py-2">{page.ctr}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Crawl History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Crawl History</h2>
          <div className="space-y-2">
            {metrics.recentCrawls.map((crawl, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">{crawl.date}</span>
                <span className="font-medium">{crawl.pages} pages</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    crawl.errors === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {crawl.errors} errors
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Component helpers
function MetricCard({
  title,
  value,
  status,
}: {
  title: string
  value: string | number
  status: 'good' | 'warning' | 'error' | 'neutral'
}) {
  const statusColors = {
    good: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200',
  }

  return (
    <div className={`p-4 rounded-lg border ${statusColors[status]}`}>
      <div className="text-sm font-medium mb-1">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}

function WebVitalMetric({
  name,
  target,
  data,
}: {
  name: string
  target: string
  data: { good: number; needsImprovement: number; poor: number }
}) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-3">Target: {target}</p>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-16 text-sm">Good:</div>
          <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div className="bg-green-600 h-full" style={{ width: `${data.good}%` }} />
          </div>
          <div className="w-12 text-right text-sm">{data.good}%</div>
        </div>
        <div className="flex items-center">
          <div className="w-16 text-sm">Needs:</div>
          <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div className="bg-yellow-600 h-full" style={{ width: `${data.needsImprovement}%` }} />
          </div>
          <div className="w-12 text-right text-sm">{data.needsImprovement}%</div>
        </div>
        <div className="flex items-center">
          <div className="w-16 text-sm">Poor:</div>
          <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div className="bg-red-600 h-full" style={{ width: `${data.poor}%` }} />
          </div>
          <div className="w-12 text-right text-sm">{data.poor}%</div>
        </div>
      </div>
    </div>
  )
}

function IssueItem({
  type,
  count,
  description,
  action,
}: {
  type: 'error' | 'warning' | 'info'
  count: number
  description: string
  action: string
}) {
  const typeStyles = {
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  }

  if (count === 0) {
    return null
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
      <div className="flex items-center space-x-3">
        <span className={`px-2 py-1 rounded text-sm font-medium ${typeStyles[type]}`}>{count}</span>
        <span>{description}</span>
      </div>
      <button className="text-blue-600 hover:underline text-sm">{action} →</button>
    </div>
  )
}
