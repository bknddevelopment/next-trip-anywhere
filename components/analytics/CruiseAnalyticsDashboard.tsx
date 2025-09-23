/**
 * Cruise Analytics Dashboard Component
 * Real-time monitoring and reporting of cruise page performance
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Activity,
  MousePointer,
  Eye,
  Search,
  Target,
  Users,
  DollarSign,
  BarChart3,
  LineChart,
  AlertCircle,
  CheckCircle,
  Info,
} from 'lucide-react'

interface MetricCard {
  title: string
  value: string | number
  change: number
  trend: 'up' | 'down' | 'stable'
  icon: React.ReactNode
  color: string
}

interface PerformanceMetrics {
  pageViews: number
  uniqueVisitors: number
  avgTimeOnPage: number
  bounceRate: number
  conversionRate: number
  ctaClicks: number
  formSubmissions: number
  scrollDepth: number
}

interface SearchMetrics {
  impressions: number
  clicks: number
  ctr: number
  avgPosition: number
  topQueries: Array<{ query: string; clicks: number; impressions: number }>
  topPages: Array<{ page: string; views: number; conversions: number }>
}

interface Alert {
  type: 'warning' | 'error' | 'success' | 'info'
  title: string
  message: string
  timestamp: Date
}

export default function CruiseAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d')
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    pageViews: 0,
    uniqueVisitors: 0,
    avgTimeOnPage: 0,
    bounceRate: 0,
    conversionRate: 0,
    ctaClicks: 0,
    formSubmissions: 0,
    scrollDepth: 0,
  })
  const [searchMetrics, setSearchMetrics] = useState<SearchMetrics>({
    impressions: 0,
    clicks: 0,
    ctr: 0,
    avgPosition: 0,
    topQueries: [],
    topPages: [],
  })
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  // Simulate data fetching (replace with actual API calls)
  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data (replace with actual data fetching)
      setPerformanceMetrics({
        pageViews: 15234,
        uniqueVisitors: 8456,
        avgTimeOnPage: 185, // seconds
        bounceRate: 42.3,
        conversionRate: 3.7,
        ctaClicks: 892,
        formSubmissions: 234,
        scrollDepth: 67.8,
      })

      setSearchMetrics({
        impressions: 45678,
        clicks: 2341,
        ctr: 5.12,
        avgPosition: 8.7,
        topQueries: [
          { query: 'cruises from Newark', clicks: 234, impressions: 3456 },
          { query: 'cheap Caribbean cruises NJ', clicks: 189, impressions: 2890 },
          { query: 'Royal Caribbean Newark deals', clicks: 156, impressions: 2345 },
          { query: 'Cape Liberty cruise port', clicks: 134, impressions: 2123 },
          { query: 'last minute cruises Newark', clicks: 112, impressions: 1890 },
        ],
        topPages: [
          { page: '/cruises/from-newark', views: 3456, conversions: 89 },
          { page: '/cruises/caribbean', views: 2890, conversions: 72 },
          { page: '/cruises/deals', views: 2345, conversions: 65 },
          { page: '/cruises/royal-caribbean', views: 1890, conversions: 48 },
          { page: '/cruises/cape-liberty-port', views: 1567, conversions: 42 },
        ],
      })

      setAlerts([
        {
          type: 'success',
          title: 'Conversion Rate Up',
          message: 'Cruise page conversions increased by 15% this week',
          timestamp: new Date(),
        },
        {
          type: 'warning',
          title: 'Position Drop',
          message: 'Average position for "Newark cruises" dropped from 5 to 8',
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          type: 'info',
          title: 'New Pages Indexed',
          message: '12 new cruise pages have been indexed by Google',
          timestamp: new Date(Date.now() - 7200000),
        },
      ])

      setLoading(false)
    }

    fetchMetrics()
  }, [timeRange])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const metrics: MetricCard[] = [
    {
      title: 'Page Views',
      value: formatNumber(performanceMetrics.pageViews),
      change: 12.5,
      trend: 'up',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Unique Visitors',
      value: formatNumber(performanceMetrics.uniqueVisitors),
      change: 8.3,
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-green-500',
    },
    {
      title: 'Conversion Rate',
      value: `${performanceMetrics.conversionRate}%`,
      change: 15.2,
      trend: 'up',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-purple-500',
    },
    {
      title: 'CTA Clicks',
      value: formatNumber(performanceMetrics.ctaClicks),
      change: -3.4,
      trend: 'down',
      icon: <MousePointer className="w-6 h-6" />,
      color: 'bg-orange-500',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Cruise Analytics Dashboard</h2>
        <div className="flex gap-2">
          {(['24h', '7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? 'bg-brand-blue text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range === '24h'
                ? 'Day'
                : range === '7d'
                  ? 'Week'
                  : range === '30d'
                    ? 'Month'
                    : 'Quarter'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-lg ${metric.color} bg-opacity-10`}>
                <div className={`${metric.color.replace('bg-', 'text-')}`}>{metric.icon}</div>
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(metric.change)}%</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Search Performance</h3>
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Impressions</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatNumber(searchMetrics.impressions)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Clicks</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatNumber(searchMetrics.clicks)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">CTR</p>
                <p className="text-xl font-bold text-gray-900">{searchMetrics.ctr}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Position</p>
                <p className="text-xl font-bold text-gray-900">
                  {searchMetrics.avgPosition.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Engagement Metrics</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Avg Time on Page</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatTime(performanceMetrics.avgTimeOnPage)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Bounce Rate</p>
                <p className="text-xl font-bold text-gray-900">{performanceMetrics.bounceRate}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Scroll Depth</p>
                <p className="text-xl font-bold text-gray-900">{performanceMetrics.scrollDepth}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Form Submissions</p>
                <p className="text-xl font-bold text-gray-900">
                  {performanceMetrics.formSubmissions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Queries and Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Search Queries</h3>
          <div className="space-y-3">
            {searchMetrics.topQueries.map((query, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{query.query}</p>
                  <p className="text-xs text-gray-500">
                    {query.clicks} clicks • {query.impressions} impressions
                  </p>
                </div>
                <div className="text-sm font-medium text-brand-blue">
                  {((query.clicks / query.impressions) * 100).toFixed(1)}% CTR
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Pages</h3>
          <div className="space-y-3">
            {searchMetrics.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{page.page}</p>
                  <p className="text-xs text-gray-500">
                    {formatNumber(page.views)} views • {page.conversions} conversions
                  </p>
                </div>
                <div className="text-sm font-medium text-green-600">
                  {((page.conversions / page.views) * 100).toFixed(1)}% CVR
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
            >
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <p className="font-medium text-gray-900">{alert.title}</p>
                <p className="text-sm text-gray-600">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(alert.timestamp).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
