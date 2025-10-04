'use client'

/**
 * @fileoverview Client-only components wrapper for lazy loading non-critical features
 * @module ClientComponents
 *
 * This file contains client-side only components that should be lazy loaded
 * to reduce initial bundle size and improve performance. These components
 * don't affect the initial page render and can load after hydration.
 */

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load all non-critical components with no SSR
const ServiceWorkerRegistration = dynamic(() => import('@/components/ServiceWorkerRegistration'), {
  ssr: false,
})

const PerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'), {
  ssr: false,
})

const CoreWebVitalsMonitor = dynamic(() => import('@/components/CoreWebVitalsMonitor'), {
  ssr: false,
})

const PerformanceInit = dynamic(() => import('@/components/common/PerformanceInit'), {
  ssr: false,
})

const ResourceHints = dynamic(() => import('@/components/common/ResourceHints'), {
  ssr: false,
})

const GoogleTagManager = dynamic(() => import('@/components/analytics/GoogleTagManager'), {
  ssr: false,
})

const GoogleAnalytics = dynamic(() => import('@/components/analytics/GoogleAnalytics'), {
  ssr: false,
})

const CookieConsent = dynamic(() => import('@/components/analytics/CookieConsent'), {
  ssr: false,
})

/**
 * Client-only components wrapper
 *
 * Loads all analytics, monitoring, and non-critical components after initial paint
 * to improve Core Web Vitals and initial load performance.
 */
export function ClientOnlyComponents() {
  return (
    <>
      <ServiceWorkerRegistration />
      <PerformanceMonitor />
      <CoreWebVitalsMonitor />
      <PerformanceInit />
      <ResourceHints />

      <Suspense fallback={null}>
        <GoogleTagManager />
        <GoogleAnalytics />
      </Suspense>

      <CookieConsent />
    </>
  )
}
