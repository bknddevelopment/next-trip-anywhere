'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Users, MousePointer, TrendingUp, Phone, Mail, FileText, Eye, Clock, Target } from 'lucide-react'

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: number
  conversions: number
  conversionRate: number
  topPages: Array<{ page: string; views: number }>
  trafficSources: Array<{ source: string; visitors: number; percentage: number }>
  deviceTypes: Array<{ type: string; percentage: number }>
  goals: Array<{ name: string; completions: number; rate: number }>
}

/**
 * Analytics dashboard component for monitoring SEO and conversion metrics
 */
export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [timeframe, setTimeframe] = useState('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, this would fetch data from Google Analytics API
    // For now, we'll simulate data
    const fetchAnalyticsData = async () => {
      setLoading(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data - replace with real GA4 API calls
      const mockData: AnalyticsData = {
        pageViews: 15420,
        uniqueVisitors: 8930,
        bounceRate: 42.3,
        avgSessionDuration: 185, // seconds
        conversions: 127,
        conversionRate: 1.42,
        topPages: [
          { page: '/', views: 4250 },
          { page: '/flights', views: 3120 },
          { page: '/cruises', views: 2890 },
          { page: '/packages', views: 2340 },
          { page: '/from/nyc', views: 1870 },
        ],
        trafficSources: [
          { source: 'Organic Search', visitors: 4560, percentage: 51.1 },
          { source: 'Direct', visitors: 2340, percentage: 26.2 },
          { source: 'Social Media', visitors: 1120, percentage: 12.5 },
          { source: 'Paid Search', visitors: 670, percentage: 7.5 },
          { source: 'Referral', visitors: 240, percentage: 2.7 },
        ],
        deviceTypes: [
          { type: 'Desktop', percentage: 45.2 },
          { type: 'Mobile', percentage: 42.8 },
          { type: 'Tablet', percentage: 12.0 },
        ],
        goals: [
          { name: 'Contact Form', completions: 89, rate: 1.2 },
          { name: 'Phone Calls', completions: 156, rate: 2.1 },
          { name: 'Email Signups', completions: 234, rate: 3.1 },
          { name: 'Quote Requests', completions: 67, rate: 0.9 },
        ]
      }
      
      setAnalyticsData(mockData)
      setLoading(false)
    }

    fetchAnalyticsData()
  }, [timeframe])

  if (loading || !analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor your SEO performance and user engagement</p>
          </div>
          
          <div className="flex gap-2">
            {[
              { value: '1d', label: 'Today' },
              { value: '7d', label: '7 Days' },
              { value: '30d', label: '30 Days' },
              { value: '90d', label: '90 Days' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeframe(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeframe === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Page Views</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.pageViews)}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unique Visitors</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.uniqueVisitors)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Session Duration</p>
                <p className="text-2xl font-bold text-gray-900">{formatDuration(analyticsData.avgSessionDuration)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.conversionRate}%</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Pages */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
            <div className="space-y-4">
              {analyticsData.topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    <span className="text-sm text-gray-900">{page.page}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatNumber(page.views)}
                    </span>
                    <span className="text-xs text-gray-500">views</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
            <div className="space-y-4">
              {analyticsData.trafficSources.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">{source.source}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                      {source.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Device Types */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Types</h3>
            <div className="space-y-4">
              {analyticsData.deviceTypes.map((device) => (
                <div key={device.type} className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">{device.type}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                      {device.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Goals */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Goals</h3>
            <div className="space-y-4">
              {analyticsData.goals.map((goal) => (
                <div key={goal.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded">
                      {goal.name === 'Contact Form' && <FileText className="h-4 w-4 text-blue-600" />}
                      {goal.name === 'Phone Calls' && <Phone className="h-4 w-4 text-blue-600" />}
                      {goal.name === 'Email Signups' && <Mail className="h-4 w-4 text-blue-600" />}
                      {goal.name === 'Quote Requests' && <Target className="h-4 w-4 text-blue-600" />}
                    </div>
                    <span className="text-sm text-gray-900">{goal.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatNumber(goal.completions)}
                    </div>
                    <div className="text-xs text-gray-500">{goal.rate}% rate</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEO Insights */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Insights & Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Performing Well</span>
              </div>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Organic traffic increased 15% this month</li>
                <li>• Core Web Vitals scores are excellent</li>
                <li>• Mobile usability issues resolved</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-900">Needs Attention</span>
              </div>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Bounce rate increased 3% this week</li>
                <li>• Some pages lack meta descriptions</li>
                <li>• Image alt texts need optimization</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <MousePointer className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Opportunities</span>
              </div>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Add more location-specific content</li>
                <li>• Create seasonal travel guides</li>
                <li>• Implement schema markup for reviews</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Export */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Export Data</h3>
              <p className="text-sm text-gray-600 mt-1">Download analytics reports for further analysis</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Export CSV
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Hook for fetching real-time analytics data
 */
export function useAnalyticsData(timeframe: string = '7d') {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        // In a real implementation, this would call Google Analytics API
        // const response = await fetch(`/api/analytics?timeframe=${timeframe}`)
        // const data = await response.json()
        
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // For now, return mock data based on timeframe
        const mockData: AnalyticsData = {
          pageViews: timeframe === '1d' ? 2140 : timeframe === '7d' ? 15420 : 45620,
          uniqueVisitors: timeframe === '1d' ? 1240 : timeframe === '7d' ? 8930 : 26780,
          bounceRate: 42.3,
          avgSessionDuration: 185,
          conversions: timeframe === '1d' ? 18 : timeframe === '7d' ? 127 : 381,
          conversionRate: 1.42,
          topPages: [
            { page: '/', views: timeframe === '1d' ? 580 : 4250 },
            { page: '/flights', views: timeframe === '1d' ? 420 : 3120 },
            { page: '/cruises', views: timeframe === '1d' ? 390 : 2890 },
            { page: '/packages', views: timeframe === '1d' ? 315 : 2340 },
            { page: '/from/nyc', views: timeframe === '1d' ? 252 : 1870 },
          ],
          trafficSources: [
            { source: 'Organic Search', visitors: 4560, percentage: 51.1 },
            { source: 'Direct', visitors: 2340, percentage: 26.2 },
            { source: 'Social Media', visitors: 1120, percentage: 12.5 },
            { source: 'Paid Search', visitors: 670, percentage: 7.5 },
            { source: 'Referral', visitors: 240, percentage: 2.7 },
          ],
          deviceTypes: [
            { type: 'Desktop', percentage: 45.2 },
            { type: 'Mobile', percentage: 42.8 },
            { type: 'Tablet', percentage: 12.0 },
          ],
          goals: [
            { name: 'Contact Form', completions: 89, rate: 1.2 },
            { name: 'Phone Calls', completions: 156, rate: 2.1 },
            { name: 'Email Signups', completions: 234, rate: 3.1 },
            { name: 'Quote Requests', completions: 67, rate: 0.9 },
          ]
        }
        
        setData(mockData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [timeframe])

  return { data, loading, error }
}