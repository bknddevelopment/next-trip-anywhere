/**
 * Performance Monitor Component
 * Displays real-time performance metrics in development mode
 */

'use client'

import { useEffect, useState } from 'react'
import { initWebVitals, getPerformanceMetrics } from '@/lib/performance/web-vitals'

interface PerformanceMetrics {
  lcp?: number
  fid?: number
  cls?: number
  fcp?: number
  ttfb?: number
  inp?: number
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})
  const [showMonitor, setShowMonitor] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    // Initialize Web Vitals monitoring
    initWebVitals()

    // Listen for Web Vitals updates (custom event approach)
    const handleMetricUpdate = (event: CustomEvent) => {
      const { name, value } = event.detail
      setMetrics((prev) => ({ ...prev, [name.toLowerCase()]: value }))
    }

    window.addEventListener('web-vital', handleMetricUpdate as EventListener)

    // Get initial performance metrics
    const metrics = getPerformanceMetrics()
    if (metrics) {
      console.log('[Performance Metrics]', metrics)
    }

    // Keyboard shortcut to toggle monitor (Ctrl + Shift + P)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setShowMonitor((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('web-vital', handleMetricUpdate as EventListener)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  // Don't render if monitor is hidden
  if (!showMonitor) {
    return (
      <button
        onClick={() => setShowMonitor(true)}
        className="fixed bottom-4 right-4 z-50 bg-black text-white px-3 py-1 rounded text-xs font-mono opacity-50 hover:opacity-100 transition-opacity"
        title="Press Ctrl+Shift+P to toggle"
      >
        Perf
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black text-white p-4 rounded-lg shadow-xl max-w-sm font-mono text-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Performance Monitor</h3>
        <button onClick={() => setShowMonitor(false)} className="text-gray-400 hover:text-white">
          ×
        </button>
      </div>

      <div className="space-y-1">
        <MetricRow
          label="LCP"
          value={metrics.lcp}
          unit="ms"
          good={2500}
          poor={4000}
          description="Largest Contentful Paint"
        />
        <MetricRow
          label="FID"
          value={metrics.fid}
          unit="ms"
          good={100}
          poor={300}
          description="First Input Delay"
        />
        <MetricRow
          label="CLS"
          value={metrics.cls}
          unit=""
          good={0.1}
          poor={0.25}
          description="Cumulative Layout Shift"
        />
        <MetricRow
          label="FCP"
          value={metrics.fcp}
          unit="ms"
          good={1800}
          poor={3000}
          description="First Contentful Paint"
        />
        <MetricRow
          label="TTFB"
          value={metrics.ttfb}
          unit="ms"
          good={800}
          poor={1800}
          description="Time to First Byte"
        />
        <MetricRow
          label="INP"
          value={metrics.inp}
          unit="ms"
          good={200}
          poor={500}
          description="Interaction to Next Paint"
        />
      </div>

      <div className="mt-3 pt-3 border-t border-gray-700 text-[10px] text-gray-400">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  )
}

interface MetricRowProps {
  label: string
  value?: number
  unit: string
  good: number
  poor: number
  description: string
}

function MetricRow({ label, value, unit, good, poor, description }: MetricRowProps) {
  const getColor = () => {
    if (!value) {
      return 'text-gray-500'
    }
    if (value <= good) {
      return 'text-green-400'
    }
    if (value <= poor) {
      return 'text-yellow-400'
    }
    return 'text-red-400'
  }

  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400" title={description}>
        {label}:
      </span>
      <span className={getColor()}>
        {value ? `${value.toFixed(unit === '' ? 3 : 0)}${unit}` : '---'}
      </span>
    </div>
  )
}
