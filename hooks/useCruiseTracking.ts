/**
 * React hook for cruise page analytics tracking
 * Provides easy-to-use tracking functions for cruise components
 */

import { useEffect, useCallback, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  trackCruisePageView,
  trackCruiseCTA,
  trackCruiseForm,
  trackCruiseSearch,
  trackCruiseEngagement,
  initializeCruiseTracking,
  getCruisePageType,
  type CruisePageType,
  type CruiseCTAType,
  type CruiseTrackingEvent,
} from '@/lib/analytics/cruise-tracking'

interface UseCruiseTrackingOptions {
  pageType?: CruisePageType
  cruiseData?: CruiseTrackingEvent['cruiseData']
  autoTrackPageView?: boolean
  autoTrackScroll?: boolean
}

interface CruiseTrackingReturn {
  trackCTA: (ctaType: CruiseCTAType, location?: string, value?: number) => void
  trackFormStart: (formName: string) => void
  trackFormField: (formName: string, fieldName: string, value: any) => void
  trackFormSubmit: (formName: string, data?: Record<string, any>) => void
  trackFormError: (formName: string, error: string) => void
  trackSearch: (query: string, filters?: Record<string, any>, results?: number) => void
  trackEngagement: (type: string, details?: Record<string, any>) => void
  trackVideoPlay: (videoId: string, title?: string) => void
  trackGalleryView: (imageIndex: number, totalImages: number) => void
  trackItineraryExpand: (day: number, destination: string) => void
  trackPriceCalculator: (cabinType: string, guests: number, totalPrice: number) => void
}

/**
 * Custom hook for cruise page tracking
 */
export function useCruiseTracking(options: UseCruiseTrackingOptions = {}): CruiseTrackingReturn {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hasTrackedPageView = useRef(false)
  const formStartTime = useRef<Record<string, number>>({})

  const {
    pageType: providedPageType,
    cruiseData = {},
    autoTrackPageView = true,
    autoTrackScroll = true,
  } = options

  // Determine page type from URL if not provided
  const pageType = providedPageType || getCruisePageType(pathname)

  // Auto-track page view on mount and route changes
  useEffect(() => {
    if (autoTrackPageView && pageType && !hasTrackedPageView.current) {
      initializeCruiseTracking(pageType, cruiseData)
      hasTrackedPageView.current = true
    }

    // Reset flag on route change
    return () => {
      hasTrackedPageView.current = false
    }
  }, [pathname, searchParams, pageType, cruiseData, autoTrackPageView])

  // Track CTA clicks
  const trackCTA = useCallback(
    (ctaType: CruiseCTAType, location: string = 'unknown', value?: number) => {
      const ctaLocation = location || `${pageType || 'cruise'}_page`
      trackCruiseCTA(ctaType, ctaLocation, cruiseData, value)
    },
    [pageType, cruiseData]
  )

  // Track form start
  const trackFormStart = useCallback(
    (formName: string) => {
      formStartTime.current[formName] = Date.now()
      trackCruiseForm(formName, 'start', undefined, cruiseData)
    },
    [cruiseData]
  )

  // Track form field completion
  const trackFormField = useCallback(
    (formName: string, fieldName: string, value: any) => {
      trackCruiseForm(
        formName,
        'field_complete',
        {
          field_name: fieldName,
          field_value: typeof value === 'string' ? value : JSON.stringify(value),
        },
        cruiseData
      )
    },
    [cruiseData]
  )

  // Track form submission
  const trackFormSubmit = useCallback(
    (formName: string, data?: Record<string, any>) => {
      const timeToComplete = formStartTime.current[formName]
        ? Math.round((Date.now() - formStartTime.current[formName]) / 1000)
        : undefined

      trackCruiseForm(
        formName,
        'submit',
        {
          ...data,
          time_to_complete: timeToComplete,
        },
        cruiseData
      )

      // Clean up
      delete formStartTime.current[formName]
    },
    [cruiseData]
  )

  // Track form errors
  const trackFormError = useCallback(
    (formName: string, error: string) => {
      trackCruiseForm(
        formName,
        'error',
        {
          error_message: error,
        },
        cruiseData
      )
    },
    [cruiseData]
  )

  // Track search
  const trackSearch = useCallback(
    (query: string, filters?: Record<string, any>, results: number = 0) => {
      const searchType = filters?.advanced ? 'advanced' : 'destination'
      trackCruiseSearch(searchType, query, results, filters)
    },
    []
  )

  // Track general engagement
  const trackEngagement = useCallback(
    (type: string, details?: Record<string, any>) => {
      trackCruiseEngagement(type as any, {
        ...details,
        ...cruiseData,
      })
    },
    [cruiseData]
  )

  // Track video play
  const trackVideoPlay = useCallback(
    (videoId: string, title?: string) => {
      trackCruiseEngagement('video_play', {
        video_id: videoId,
        video_title: title,
        ...cruiseData,
      })
    },
    [cruiseData]
  )

  // Track gallery view
  const trackGalleryView = useCallback(
    (imageIndex: number, totalImages: number) => {
      trackCruiseEngagement('image_gallery', {
        image_index: imageIndex,
        total_images: totalImages,
        gallery_progress: `${imageIndex}/${totalImages}`,
        ...cruiseData,
      })
    },
    [cruiseData]
  )

  // Track itinerary expansion
  const trackItineraryExpand = useCallback(
    (day: number, destination: string) => {
      trackCruiseEngagement('itinerary_expand', {
        day_number: day,
        destination,
        ...cruiseData,
      })
    },
    [cruiseData]
  )

  // Track price calculator usage
  const trackPriceCalculator = useCallback(
    (cabinType: string, guests: number, totalPrice: number) => {
      trackCruiseEngagement('price_calculator', {
        cabin_type: cabinType,
        number_of_guests: guests,
        calculated_price: totalPrice,
        ...cruiseData,
      })
    },
    [cruiseData]
  )

  return {
    trackCTA,
    trackFormStart,
    trackFormField,
    trackFormSubmit,
    trackFormError,
    trackSearch,
    trackEngagement,
    trackVideoPlay,
    trackGalleryView,
    trackItineraryExpand,
    trackPriceCalculator,
  }
}

/**
 * Hook for tracking cruise search interactions
 */
export function useCruiseSearchTracking() {
  const searchStartTime = useRef<number>(0)
  const lastQuery = useRef<string>('')

  const startSearch = useCallback(() => {
    searchStartTime.current = Date.now()
  }, [])

  const trackSearchResults = useCallback(
    (query: string, results: any[], filters?: Record<string, any>) => {
      const searchTime = searchStartTime.current
        ? Math.round((Date.now() - searchStartTime.current) / 1000)
        : undefined

      // Only track if query changed
      if (query !== lastQuery.current) {
        trackCruiseSearch(filters?.advanced ? 'advanced' : 'destination', query, results.length, {
          ...filters,
          search_time_seconds: searchTime,
        })
        lastQuery.current = query
      }
    },
    []
  )

  return {
    startSearch,
    trackSearchResults,
  }
}

/**
 * Hook for tracking cruise comparison interactions
 */
export function useCruiseComparisonTracking() {
  const comparisonItems = useRef<Set<string>>(new Set())

  const addToComparison = useCallback((cruiseId: string, cruiseDetails?: Record<string, any>) => {
    comparisonItems.current.add(cruiseId)

    trackCruiseEngagement('price_calculator', {
      action: 'add_to_comparison',
      cruise_id: cruiseId,
      comparison_count: comparisonItems.current.size,
      ...cruiseDetails,
    })
  }, [])

  const removeFromComparison = useCallback((cruiseId: string) => {
    comparisonItems.current.delete(cruiseId)

    trackCruiseEngagement('price_calculator', {
      action: 'remove_from_comparison',
      cruise_id: cruiseId,
      comparison_count: comparisonItems.current.size,
    })
  }, [])

  const trackComparisonView = useCallback(() => {
    trackCruiseEngagement('price_calculator', {
      action: 'view_comparison',
      comparison_count: comparisonItems.current.size,
      cruise_ids: Array.from(comparisonItems.current),
    })
  }, [])

  return {
    addToComparison,
    removeFromComparison,
    trackComparisonView,
    comparisonCount: comparisonItems.current.size,
  }
}
