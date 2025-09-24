/**
 * SEO Dashboard Component
 *
 * Displays real-time SEO health metrics for monitoring and optimization
 */

'use client'

import { useState, useEffect } from 'react'

interface SEOMetric {
  label: string
  value: number | string
  target?: number | string
  status: 'good' | 'warning' | 'error'
  description?: string
}

interface SEOCategory {
  title: string
  metrics: SEOMetric[]
}

export function SEODashboard() {
  const [metrics, setMetrics] = useState<SEOCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In production, these would come from an API or analytics
    const seoData: SEOCategory[] = [
      {
        title: 'Internal Linking',
        metrics: [
          {
            label: 'Pages with 8+ Links',
            value: 3,
            target: 44,
            status: 'error',
            description: 'Only 7% of pages meet minimum requirement',
          },
          {
            label: 'Average Links per Page',
            value: 4.4,
            target: 10,
            status: 'warning',
            description: 'Target: 8-12 internal links per page',
          },
          {
            label: 'Orphan Pages',
            value: 50,
            target: 0,
            status: 'error',
            description: 'Pages with < 3 internal links pointing to them',
          },
          {
            label: 'Topic Clusters',
            value: 0,
            target: 5,
            status: 'error',
            description: 'Hub-and-spoke content structures needed',
          },
        ],
      },
      {
        title: 'Technical SEO',
        metrics: [
          {
            label: 'Indexed Pages',
            value: 260,
            target: 300,
            status: 'warning',
            description: 'Some pages may not be indexed yet',
          },
          {
            label: 'Schema Markup',
            value: '100%',
            target: '100%',
            status: 'good',
            description: 'All pages have proper structured data',
          },
          {
            label: 'Meta Tags',
            value: '100%',
            target: '100%',
            status: 'good',
            description: 'Unique titles and descriptions',
          },
          {
            label: 'Sitemap Status',
            value: 'Valid',
            target: 'Valid',
            status: 'good',
            description: 'Dynamic sitemap with all pages',
          },
        ],
      },
      {
        title: 'Core Web Vitals',
        metrics: [
          {
            label: 'INP (Interaction)',
            value: 'TBD',
            target: '< 200ms',
            status: 'warning',
            description: 'Needs measurement',
          },
          {
            label: 'LCP (Load)',
            value: '< 2.5s',
            target: '< 2.5s',
            status: 'good',
            description: 'Lazy loading implemented',
          },
          {
            label: 'CLS (Layout Shift)',
            value: '< 0.1',
            target: '< 0.1',
            status: 'good',
            description: 'Fixed dimensions on images',
          },
          {
            label: 'Mobile Score',
            value: 90,
            target: 90,
            status: 'good',
            description: 'Mobile-first responsive design',
          },
        ],
      },
      {
        title: 'Content Quality',
        metrics: [
          {
            label: 'Avg Word Count',
            value: 1500,
            target: 1500,
            status: 'good',
            description: 'Meeting minimum content requirements',
          },
          {
            label: 'Pages with FAQs',
            value: 44,
            target: 44,
            status: 'good',
            description: 'All cruise/package pages have FAQs',
          },
          {
            label: 'Local Content',
            value: '100%',
            target: '100%',
            status: 'good',
            description: 'Essex County relevance on all pages',
          },
          {
            label: 'Fresh Content',
            value: 'Jan 2025',
            target: 'Monthly',
            status: 'good',
            description: 'Recently updated content',
          },
        ],
      },
    ]

    setMetrics(seoData)
    setLoading(false)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return '✅'
      case 'warning':
        return '⚠️'
      case 'error':
        return '❌'
      default:
        return '❓'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600'
      case 'warning':
        return 'text-yellow-600'
      case 'error':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse">Loading SEO metrics...</div>
      </div>
    )
  }

  // Calculate overall health score
  const totalMetrics = metrics.reduce((acc, cat) => acc + cat.metrics.length, 0)
  const goodMetrics = metrics.reduce(
    (acc, cat) => acc + cat.metrics.filter((m) => m.status === 'good').length,
    0
  )
  const healthScore = Math.round((goodMetrics / totalMetrics) * 100)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">SEO Health Dashboard</h2>

        {/* Overall Score */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Overall SEO Health</h3>
              <p className="text-sm text-blue-700 mt-1">
                Based on {totalMetrics} metrics across {metrics.length} categories
              </p>
            </div>
            <div className="text-center">
              <div
                className={`text-4xl font-bold ${
                  healthScore >= 80
                    ? 'text-green-600'
                    : healthScore >= 60
                      ? 'text-yellow-600'
                      : 'text-red-600'
                }`}
              >
                {healthScore}%
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {goodMetrics}/{totalMetrics} passing
              </div>
            </div>
          </div>
        </div>

        {/* Metrics by Category */}
        <div className="grid md:grid-cols-2 gap-6">
          {metrics.map((category, catIdx) => (
            <div key={catIdx} className="border rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-3 text-gray-800">{category.title}</h4>
              <div className="space-y-3">
                {category.metrics.map((metric, metIdx) => (
                  <div key={metIdx} className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span>{getStatusIcon(metric.status)}</span>
                        <span className="text-sm font-medium">{metric.label}</span>
                      </div>
                      {metric.description && (
                        <p className="text-xs text-gray-500 mt-1 ml-7">{metric.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${getStatusColor(metric.status)}`}>
                        {metric.value}
                      </div>
                      {metric.target && metric.value !== metric.target && (
                        <div className="text-xs text-gray-500">Target: {metric.target}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Items */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-lg mb-3 text-yellow-900">
            🎯 Priority Actions Required
          </h4>
          <ol className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-yellow-700 font-semibold mr-2">1.</span>
              <span>Add InternalLinks component to 20 pages missing adequate internal linking</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-700 font-semibold mr-2">2.</span>
              <span>Convert 12 anchor tags to Next.js Link components in Essex County page</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-700 font-semibold mr-2">3.</span>
              <span>Create 5 topic clusters with hub-and-spoke content structure</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-700 font-semibold mr-2">4.</span>
              <span>Measure INP (Interaction to Next Paint) for Core Web Vitals</span>
            </li>
          </ol>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => (window.location.href = '/scripts/enhance-internal-linking.js')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Run Link Analysis
          </button>
          <button
            onClick={() => (window.location.href = '/SEO-HEALTH-REPORT.md')}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            View Full Report
          </button>
          <button
            onClick={() => (window.location.href = 'https://pagespeed.web.dev')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Test Core Web Vitals
          </button>
        </div>
      </div>
    </div>
  )
}

export default SEODashboard
