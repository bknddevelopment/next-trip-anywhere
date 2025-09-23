/**
 * Cruise-specific analytics tracking configuration
 * Provides comprehensive tracking for cruise pages including:
 * - Page views with enhanced metadata
 * - CTA interactions (book consultation, get quote)
 * - Scroll depth tracking
 * - Lead form conversions
 * - Search behavior tracking
 */

import { trackEvent, trackConversion, trackEcommerce } from '@/components/analytics/GoogleAnalytics'
import {
  pushToDataLayer,
  trackEcommerceEvent,
  trackFormEvent,
} from '@/components/analytics/GoogleTagManager'
import { analytics } from '@/lib/analytics'

// Cruise page types for enhanced tracking
export type CruisePageType =
  | 'cruise-landing'
  | 'cruise-destination'
  | 'cruise-line'
  | 'cruise-deals'
  | 'cruise-from-location'
  | 'cruise-search'
  | 'cruise-details'

// Cruise CTA types
export type CruiseCTAType =
  | 'book_consultation'
  | 'get_quote'
  | 'view_deals'
  | 'download_brochure'
  | 'call_expert'
  | 'chat_start'
  | 'email_inquiry'
  | 'save_cruise'
  | 'share_cruise'

// Cruise tracking event interface
export interface CruiseTrackingEvent {
  eventType: 'page_view' | 'cta_click' | 'form_interaction' | 'search' | 'engagement'
  category: string
  action: string
  label?: string
  value?: number
  cruiseData?: {
    cruiseLine?: string
    destination?: string
    duration?: number
    departurePort?: string
    priceRange?: string
    shipName?: string
    cabinType?: string
    sailingDate?: string
  }
}

/**
 * Track cruise page views with enhanced metadata
 */
export function trackCruisePageView(
  pageType: CruisePageType,
  cruiseData?: CruiseTrackingEvent['cruiseData']
) {
  const pageData = {
    event: 'cruise_page_view',
    page_type: pageType,
    page_category: 'cruises',
    ...cruiseData,
  }

  // Send to Google Analytics
  trackEvent('page_view', 'Cruise Pages', pageType, undefined, pageData)

  // Send to GTM dataLayer
  pushToDataLayer(pageData)

  // Send to internal analytics
  analytics.trackPageView()

  // Initialize scroll depth tracking for content pages
  if (['cruise-destination', 'cruise-details', 'cruise-from-location'].includes(pageType)) {
    initializeCruiseScrollTracking(pageType)
  }
}

/**
 * Track cruise CTA clicks with conversion data
 */
export function trackCruiseCTA(
  ctaType: CruiseCTAType,
  location: string,
  cruiseData?: CruiseTrackingEvent['cruiseData'],
  value?: number
) {
  const ctaData = {
    event: 'cruise_cta_click',
    cta_type: ctaType,
    cta_location: location,
    timestamp: new Date().toISOString(),
    ...cruiseData,
  }

  // Send to Google Analytics
  trackEvent('cta_click', 'Cruise CTAs', `${ctaType}_${location}`, value, ctaData)

  // Send to GTM dataLayer
  pushToDataLayer(ctaData)

  // Track as conversion for high-value CTAs
  if (['book_consultation', 'get_quote', 'call_expert'].includes(ctaType)) {
    trackCruiseConversion(ctaType as 'book_consultation' | 'get_quote' | 'call_expert', value)
  }

  // Send to internal analytics
  analytics.trackEvent({
    event: 'cruise_cta',
    category: 'Cruise',
    action: ctaType,
    label: location,
    value,
    custom_parameters: cruiseData,
  })
}

/**
 * Track cruise form interactions
 */
export function trackCruiseForm(
  formName: string,
  action: 'view' | 'start' | 'field_complete' | 'submit' | 'error' | 'abandon',
  fieldData?: Record<string, any>,
  cruiseData?: CruiseTrackingEvent['cruiseData']
) {
  const formData = {
    form_name: `cruise_${formName}`,
    form_action: action,
    form_category: 'cruise_forms',
    ...fieldData,
    ...cruiseData,
  }

  // Track with GTM - Map action to supported GTM form actions
  const gtmAction = ((): 'start' | 'progress' | 'submit' | 'error' => {
    switch (action) {
      case 'start':
      case 'view':
        return 'start'
      case 'field_complete':
        return 'progress'
      case 'submit':
        return 'submit'
      case 'error':
      case 'abandon':
        return 'error'
      default:
        return 'progress'
    }
  })()
  trackFormEvent(gtmAction, `cruise_${formName}`, formData)

  // Track with GA
  trackEvent('form_interaction', 'Cruise Forms', `${formName}_${action}`, undefined, formData)

  // Track with internal analytics
  analytics.trackFormInteraction(`cruise_${formName}`, action as any, {
    ...fieldData,
    ...cruiseData,
  })

  // Track conversion on submit
  if (action === 'submit') {
    trackCruiseConversion('form_submit', undefined, formName)
  }
}

/**
 * Track cruise search behavior
 */
export function trackCruiseSearch(
  searchType: 'destination' | 'cruise_line' | 'date' | 'advanced',
  searchQuery: string,
  resultsCount: number,
  filters?: Record<string, any>
) {
  const searchData = {
    event: 'cruise_search',
    search_type: searchType,
    search_query: searchQuery,
    results_count: resultsCount,
    search_filters: filters,
    timestamp: new Date().toISOString(),
  }

  // Send to Google Analytics
  trackEvent('search', 'Cruise Search', searchType, resultsCount, searchData)

  // Send to GTM
  pushToDataLayer(searchData)

  // Send to internal analytics
  analytics.trackSearch(searchQuery, `cruise_${searchType}`, resultsCount)
}

/**
 * Track cruise conversions with enhanced e-commerce data
 */
export function trackCruiseConversion(
  conversionType: 'book_consultation' | 'get_quote' | 'call_expert' | 'form_submit',
  value?: number,
  additionalData?: string | Record<string, any>
) {
  // Map conversion types to GA conversion events
  const conversionMap = {
    book_consultation: 'lead',
    get_quote: 'lead',
    call_expert: 'phone_call',
    form_submit: 'form_submit',
  }

  // Track with Google Analytics
  trackConversion(conversionMap[conversionType] as any, value)

  // Track with enhanced e-commerce if value provided
  if (value) {
    trackEcommerce(
      'begin_checkout',
      [
        {
          id: `cruise_${conversionType}_${Date.now()}`,
          name: `Cruise ${conversionType.replace('_', ' ')}`,
          category: 'Cruise Services',
          price: value,
          quantity: 1,
        },
      ],
      value
    )
  }

  // Track with GTM
  pushToDataLayer({
    event: 'cruise_conversion',
    conversion_type: conversionType,
    conversion_value: value,
    conversion_data:
      typeof additionalData === 'string' ? { details: additionalData } : additionalData,
  })

  // Track with internal analytics
  analytics.trackConversion({
    type: conversionMap[conversionType] as any,
    value,
    currency: 'USD',
    transaction_id: `cruise_conv_${Date.now()}`,
  })
}

/**
 * Initialize scroll depth tracking for cruise content
 */
export function initializeCruiseScrollTracking(pageType: CruisePageType) {
  if (typeof window === 'undefined') {
    return
  }

  let maxScroll = 0
  const milestones = [10, 25, 50, 75, 90, 100]
  const tracked = new Set<number>()

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    )

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone)

          // Track scroll depth
          trackEvent('scroll_depth', 'Cruise Engagement', `${pageType}_scroll`, milestone, {
            page_type: pageType,
            scroll_percentage: milestone,
            page_height: document.documentElement.scrollHeight,
          })

          // Also push to dataLayer
          pushToDataLayer({
            event: 'cruise_scroll_depth',
            page_type: pageType,
            scroll_depth: milestone,
          })
        }
      })
    }
  }

  // Throttle scroll events
  let scrollTimer: NodeJS.Timeout
  const throttledScroll = () => {
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(handleScroll, 150)
  }

  window.addEventListener('scroll', throttledScroll, { passive: true })

  // Clean up on page change
  return () => {
    window.removeEventListener('scroll', throttledScroll)
    clearTimeout(scrollTimer)
  }
}

/**
 * Track cruise content engagement
 */
export function trackCruiseEngagement(
  engagementType:
    | 'video_play'
    | 'image_gallery'
    | 'review_read'
    | 'itinerary_expand'
    | 'price_calculator',
  details?: Record<string, any>
) {
  const engagementData = {
    event: 'cruise_engagement',
    engagement_type: engagementType,
    timestamp: new Date().toISOString(),
    ...details,
  }

  // Send to Google Analytics
  trackEvent('engagement', 'Cruise Content', engagementType, undefined, engagementData)

  // Send to GTM
  pushToDataLayer(engagementData)

  // Send to internal analytics
  analytics.trackEngagement(`cruise_${engagementType}`)
}

/**
 * Track cruise page performance metrics
 */
export function trackCruisePerformance(metrics: {
  pageLoadTime?: number
  timeToInteractive?: number
  firstContentfulPaint?: number
  largestContentfulPaint?: number
}) {
  const performanceData = {
    event: 'cruise_performance',
    page_category: 'cruises',
    ...metrics,
  }

  // Send to Google Analytics
  trackEvent('performance', 'Cruise Pages', 'load_metrics', undefined, performanceData)

  // Send to GTM
  pushToDataLayer(performanceData)
}

/**
 * Initialize comprehensive cruise tracking on page load
 */
export function initializeCruiseTracking(
  pageType: CruisePageType,
  cruiseData?: CruiseTrackingEvent['cruiseData']
) {
  // Track page view
  trackCruisePageView(pageType, cruiseData)

  // Set up engagement tracking
  if (typeof window !== 'undefined') {
    // Track time on page
    const startTime = Date.now()

    const trackTimeOnPage = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000)
      trackEvent('engagement_time', 'Cruise Pages', pageType, timeOnPage)
      pushToDataLayer({
        event: 'cruise_time_on_page',
        page_type: pageType,
        time_seconds: timeOnPage,
      })
    }

    // Track on page unload
    window.addEventListener('beforeunload', trackTimeOnPage)
    window.addEventListener('pagehide', trackTimeOnPage)

    // Track performance metrics when available
    if ('performance' in window && performance.getEntriesByType) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType(
            'navigation'
          )[0] as PerformanceNavigationTiming
          if (navigation) {
            trackCruisePerformance({
              pageLoadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
              timeToInteractive: Math.round(navigation.domInteractive - navigation.fetchStart),
            })
          }
        }, 1000)
      })
    }
  }
}

/**
 * Utility function to get cruise page type from URL
 */
export function getCruisePageType(pathname: string): CruisePageType | null {
  if (pathname === '/cruises') {
    return 'cruise-landing'
  }
  if (pathname.includes('/cruises/deals') || pathname.includes('/cruises/cheap')) {
    return 'cruise-deals'
  }
  if (pathname.includes('/cruises/from-')) {
    return 'cruise-from-location'
  }
  if (pathname.includes('/cruises/search')) {
    return 'cruise-search'
  }
  if (pathname.match(/\/cruises\/(caribbean|alaska|mediterranean|european|bahamas|hawaii)/)) {
    return 'cruise-destination'
  }
  if (pathname.match(/\/cruises\/(royal-caribbean|carnival|norwegian|celebrity|princess)/)) {
    return 'cruise-line'
  }
  if (pathname.includes('/cruises/') && pathname.split('/').length > 3) {
    return 'cruise-details'
  }
  return null
}
