'use client'

import { useEffect } from 'react'

// Type definitions for Web Vitals
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number
  startTime: number
}

interface LayoutShift extends PerformanceEntry {
  value: number
  hadRecentInput: boolean
}

declare global {
  interface Window {
    gtag?: (command: 'event', action: string, parameters: Record<string, unknown>) => void
  }
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          if (lastEntry) {
            // LCP value recorded: lastEntry.startTime

            // Report to analytics
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'LCP',
                value: Math.round(lastEntry.startTime),
                non_interaction: true,
              })
            }
          }
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            const performanceEventTiming = entry as PerformanceEventTiming
            if ('processingStart' in performanceEventTiming) {
              const delay =
                performanceEventTiming.processingStart - performanceEventTiming.startTime
              // FID value recorded: delay

              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  event_category: 'Web Vitals',
                  event_label: 'FID',
                  value: Math.round(delay),
                  non_interaction: true,
                })
              }
            }
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })

        // Cumulative Layout Shift (CLS)
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as LayoutShift
            if ('hadRecentInput' in layoutShiftEntry && !layoutShiftEntry.hadRecentInput) {
              if ('value' in layoutShiftEntry) {
                clsValue += layoutShiftEntry.value
                // CLS value recorded: clsValue
              }
            }
          }
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })

        // Report final CLS when page is hidden
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden' && window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'CLS',
              value: Math.round(clsValue * 1000),
              non_interaction: true,
            })
          }
        })

        // Interaction to Next Paint (INP)
        const inpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const eventEntry = entry as PerformanceEventTiming
            if (
              'interactionId' in eventEntry &&
              (eventEntry as unknown as { interactionId?: string }).interactionId
            ) {
              // INP candidate recorded: entry.duration
            }
          }
        })
        inpObserver.observe({ entryTypes: ['event'] })

        // Cleanup observers
        return () => {
          lcpObserver.disconnect()
          fidObserver.disconnect()
          clsObserver.disconnect()
          inpObserver.disconnect()
        }
      } catch (error) {
        // Silently fail if Performance Observer is not supported
        console.error('Performance monitoring failed:', error)
      }
    }
    return undefined
  }, [])

  return null
}
