/**
 * Dynamic Import Utilities for Code Splitting
 * Optimizes bundle sizes for 500+ page site
 */

import dynamic from 'next/dynamic'
import React, { ComponentType, ReactElement } from 'react'

// Loading component for lazy-loaded components
const LoadingSpinner = (): ReactElement => {
  return React.createElement(
    'div',
    { className: 'flex items-center justify-center p-8' },
    React.createElement('div', {
      className: 'h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent',
    })
  )
}

// Error fallback component
const ErrorFallback = ({ error }: { error?: Error }): ReactElement => {
  return React.createElement(
    'div',
    { className: 'rounded-lg border border-red-200 bg-red-50 p-4 text-red-800' },
    React.createElement('p', { className: 'font-semibold' }, 'Failed to load component'),
    error && React.createElement('p', { className: 'mt-1 text-sm' }, error.message)
  )
}

/**
 * Creates a dynamically imported component with loading and error states
 */
export function createDynamicComponent<P = {}>(
  loader: () => Promise<{ default: ComponentType<P> }>,
  options?: {
    loading?: () => React.ReactElement
    ssr?: boolean
  }
): ComponentType<P> {
  return dynamic(loader, {
    loading: options?.loading || LoadingSpinner,
    ssr: options?.ssr ?? true,
  }) as ComponentType<P>
}

/**
 * Route-based dynamic imports
 * These components are lazy-loaded based on the current route
 */

// Heavy components that should be lazy loaded
export const DynamicComponents = {
  // Forms - lazy load heavy form libraries (commented out until components are created)
  // LeadCaptureForm: createDynamicComponent(
  //   () => import('@/components/forms/LeadCaptureForm'),
  //   { ssr: false }
  // ),
  // ContactForm: createDynamicComponent(
  //   () => import('@/components/forms/ContactForm'),
  //   { ssr: false }
  // ),
  // BookingForm: createDynamicComponent(
  //   () => import('@/components/forms/BookingForm'),
  //   { ssr: false }
  // ),
  // All components commented out until they are created
  // Maps - always lazy load map components
  // LocationMap: createDynamicComponent(
  //   () => import('@/components/maps/LocationMap'),
  //   { ssr: false }
  // ),
}

/**
 * Route-based component loader
 * Automatically loads components based on the current route
 */
export function getRouteComponents(pathname: string): ComponentType[] {
  const components: ComponentType[] = []

  // Core components always loaded
  if (pathname === '/') {
    // Homepage components are in main bundle
    return components
  }

  // Component loading disabled until components are created
  /*
  // Cruise pages
  if (pathname.startsWith('/cruises')) {
    components.push(DynamicComponents.CruiseDetails)
    if (pathname.includes('compare')) {
      components.push(DynamicComponents.CruiseComparison)
    }
  }

  // Package pages
  if (pathname.startsWith('/packages')) {
    components.push(DynamicComponents.PackageDetails)
    components.push(DynamicComponents.PriceCalculator)
  }

  // Destination pages
  if (pathname.startsWith('/destinations')) {
    components.push(DynamicComponents.DestinationGuide)
    components.push(DynamicComponents.ImageGallery)
    components.push(DynamicComponents.LocationMap)
  }

  // Blog pages
  if (pathname.startsWith('/blog')) {
    components.push(DynamicComponents.BlogComments)
  }

  // Contact pages
  if (pathname.includes('contact') || pathname.includes('quote')) {
    components.push(DynamicComponents.ContactForm)
    components.push(DynamicComponents.LeadCaptureForm)
  }

  // Flight pages
  if (pathname.includes('flight')) {
    components.push(DynamicComponents.FlightSearch)
  }
  */

  return components
}

/**
 * Preload components for anticipated navigation
 */
export function preloadComponents(components: string[]) {
  if (typeof window === 'undefined') {
    return
  }

  // Disabled until components are created
  /*
  components.forEach((componentName) => {
    const component = DynamicComponents[componentName as keyof typeof DynamicComponents]
    if (component && typeof component === 'function') {
      // Trigger the dynamic import to cache it
      ;(component as any).preload?.()
    }
  })
  */
}

/**
 * Route prefetching strategy
 */
export function setupRoutePrefetch() {
  if (typeof window === 'undefined') {
    return
  }

  // Prefetch components when links are hovered
  document.addEventListener('mouseover', (e) => {
    const link = (e.target as HTMLElement).closest('a')
    if (!link) {
      return
    }

    const href = link.getAttribute('href')
    if (!href || !href.startsWith('/')) {
      return
    }

    // Preload components for the target route
    const components = getRouteComponents(href)
    components.forEach((component) => {
      if (typeof component === 'function') {
        ;(component as any).preload?.()
      }
    })
  })
}

/**
 * Intersection Observer for lazy loading
 */
export function setupLazyLoading() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement
          const componentName = element.dataset.lazyComponent

          if (componentName && DynamicComponents[componentName as keyof typeof DynamicComponents]) {
            // Load the component
            const Component = DynamicComponents[componentName as keyof typeof DynamicComponents]

            // Replace placeholder with component
            // This is a simplified version - in practice, you'd use React portals
            console.log(`Loading lazy component: ${componentName}`)

            observer.unobserve(element)
          }
        }
      })
    },
    {
      rootMargin: '50px',
      threshold: 0.01,
    }
  )

  // Observe all elements with data-lazy-component attribute
  document.querySelectorAll('[data-lazy-component]').forEach((element) => {
    observer.observe(element)
  })

  return observer
}

/**
 * Progressive enhancement for non-critical features
 */
export function progressiveEnhancement() {
  if (typeof window === 'undefined') {
    return
  }

  // Load non-critical features after page load
  window.addEventListener('load', () => {
    // Load analytics after 1 second
    // Disabled - initAnalytics doesn't exist
    // setTimeout(() => {
    //   import('@/lib/analytics').then(({ initAnalytics }) => {
    //     initAnalytics()
    //   })
    // }, 1000)

    // Load service worker after 2 seconds
    setTimeout(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch((error) => {
          console.error('Service worker registration failed:', error)
        })
      }
    }, 2000)

    // Setup route prefetching after 3 seconds
    setTimeout(() => {
      setupRoutePrefetch()
    }, 3000)

    // Setup lazy loading immediately
    setupLazyLoading()
  })
}

// Export utility types
export type DynamicComponentKey = keyof typeof DynamicComponents
export type DynamicComponentType<K extends DynamicComponentKey> = (typeof DynamicComponents)[K]
