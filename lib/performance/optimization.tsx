/**
 * Performance Optimization Utilities
 * Core Web Vitals and performance monitoring
 */

import React from 'react'

// Performance thresholds based on Core Web Vitals
export const PERFORMANCE_THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint < 2.5s
  FID: 100, // First Input Delay < 100ms
  CLS: 0.1, // Cumulative Layout Shift < 0.1
  FCP: 1800, // First Contentful Paint < 1.8s
  TTFB: 600, // Time to First Byte < 600ms
  INP: 200, // Interaction to Next Paint < 200ms
}

// Performance monitoring utility
export function measurePerformance(metric: string, value: number) {
  if (typeof window !== 'undefined' && window.performance) {
    // Log to analytics if available
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: metric,
        value: Math.round(metric === 'CLS' ? value * 1000 : value),
        non_interaction: true,
      })
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${metric}: ${value}ms`)
    }
  }
}

// Resource hint generator
export function generateResourceHints(resources: {
  preconnect?: string[]
  dnsPrefetch?: string[]
  preload?: Array<{ href: string; as: string; type?: string }>
  prefetch?: string[]
}) {
  const hints: React.ReactElement[] = []

  if (resources.preconnect) {
    resources.preconnect.forEach((url) => {
      hints.push(<link key={`preconnect-${url}`} rel="preconnect" href={url} />)
    })
  }

  if (resources.dnsPrefetch) {
    resources.dnsPrefetch.forEach((url) => {
      hints.push(<link key={`dns-prefetch-${url}`} rel="dns-prefetch" href={url} />)
    })
  }

  if (resources.preload) {
    resources.preload.forEach((resource) => {
      hints.push(
        <link
          key={`preload-${resource.href}`}
          rel="preload"
          href={resource.href}
          as={resource.as}
          type={resource.type}
        />
      )
    })
  }

  if (resources.prefetch) {
    resources.prefetch.forEach((url) => {
      hints.push(<link key={`prefetch-${url}`} rel="prefetch" href={url} />)
    })
  }

  return hints
}

// Critical CSS extraction helper
export function extractCriticalCSS(componentName: string): string {
  const criticalStyles: Record<string, string> = {
    hero: `
      .hero-section { min-height: 50vh; position: relative; }
      .hero-content { position: relative; z-index: 1; }
      @media (min-width: 768px) { .hero-section { min-height: 60vh; } }
    `,
    serviceInfo: `
      .service-grid { display: grid; gap: 1rem; }
      @media (min-width: 768px) { .service-grid { grid-template-columns: repeat(2, 1fr); } }
    `,
    contact: `
      .contact-cta { padding: 2rem; text-align: center; }
      .contact-buttons { display: flex; gap: 1rem; justify-content: center; }
    `,
  }

  return criticalStyles[componentName] || ''
}

// Lazy loading intersection observer options
export const LAZY_LOAD_OPTIONS = {
  root: null,
  rootMargin: '50px 0px',
  threshold: 0.01,
}

// Image optimization settings
export const IMAGE_OPTIMIZATION = {
  quality: 85,
  formats: ['webp', 'avif'],
  sizes: {
    mobile: 640,
    tablet: 1024,
    desktop: 1920,
  },
  placeholderBlur: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
}

// Bundle size optimization utilities
export function shouldLoadPolyfill(feature: string): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  const polyfillMap: Record<string, () => boolean> = {
    intersectionObserver: () => !('IntersectionObserver' in window),
    webp: () => {
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 1
      return !canvas.toDataURL('image/webp').startsWith('data:image/webp')
    },
    smoothScroll: () => !('scrollBehavior' in document.documentElement.style),
  }

  return polyfillMap[feature]?.() || false
}

// Performance budget checker
export function checkPerformanceBudget(metrics: {
  bundleSize?: number
  imageWeight?: number
  requestCount?: number
  thirdPartySize?: number
}) {
  const budget = {
    bundleSize: 200000, // 200KB for JS
    imageWeight: 1000000, // 1MB for images
    requestCount: 50, // Max 50 requests
    thirdPartySize: 100000, // 100KB for third-party scripts
  }

  const violations: string[] = []

  Object.entries(metrics).forEach(([key, value]) => {
    if (value && value > budget[key as keyof typeof budget]) {
      violations.push(`${key} exceeds budget: ${value} > ${budget[key as keyof typeof budget]}`)
    }
  })

  return {
    passed: violations.length === 0,
    violations,
  }
}

// Dynamic import helper with retry logic
export async function dynamicImportWithRetry<T>(
  importFn: () => Promise<{ default: T }>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    const module = await importFn()
    return module.default
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay))
      return dynamicImportWithRetry(importFn, retries - 1, delay * 2)
    }
    throw error
  }
}

// Request idle callback polyfill
export const requestIdleCallback =
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (cb: IdleRequestCallback) =>
        setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 } as IdleDeadline), 1)

// Debounce utility for expensive operations
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Throttle utility for scroll/resize events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(null, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Preload critical resources
export function preloadCriticalResources(resources: string[]) {
  if (typeof window === 'undefined') {
    return
  }

  resources.forEach((resource) => {
    const link = document.createElement('link')
    link.rel = 'preload'

    if (resource.endsWith('.css')) {
      link.as = 'style'
    } else if (resource.endsWith('.js')) {
      link.as = 'script'
    } else if (resource.match(/\.(jpg|jpeg|png|webp|avif)$/)) {
      link.as = 'image'
    } else if (resource.match(/\.(woff|woff2)$/)) {
      link.as = 'font'
      link.crossOrigin = 'anonymous'
    }

    link.href = resource
    document.head.appendChild(link)
  })
}
