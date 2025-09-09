'use client'

import { useEffect, useCallback } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { 
  analytics, 
  trackPageView, 
  trackEvent, 
  trackConversion, 
  trackFormInteraction,
  trackSearch,
  trackEngagement,
  type AnalyticsEvent,
  type ConversionData,
  type EcommerceItem 
} from '@/lib/analytics'

/**
 * Hook for analytics tracking throughout the application
 */
export function useAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views automatically
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    trackPageView(url)
  }, [pathname, searchParams])

  // Track custom events
  const track = useCallback((eventData: AnalyticsEvent) => {
    trackEvent(eventData)
  }, [])

  // Track conversions
  const trackConversionEvent = useCallback((conversionData: ConversionData) => {
    trackConversion(conversionData)
  }, [])

  // Track form interactions
  const trackForm = useCallback((
    formName: string, 
    action: 'view' | 'start' | 'progress' | 'submit' | 'error' | 'abandon',
    fieldData?: Record<string, any>
  ) => {
    trackFormInteraction(formName, action, fieldData)
  }, [])

  // Track search
  const trackSearchEvent = useCallback((searchTerm: string, searchType: string, resultsCount?: number) => {
    trackSearch(searchTerm, searchType, resultsCount)
  }, [])

  // Track engagement
  const trackEngagementEvent = useCallback((engagementType: string, engagementValue?: number) => {
    trackEngagement(engagementType, engagementValue)
  }, [])

  return {
    track,
    trackConversion: trackConversionEvent,
    trackForm,
    trackSearch: trackSearchEvent,
    trackEngagement: trackEngagementEvent,
  }
}

/**
 * Hook for tracking form interactions with automatic event binding
 */
export function useFormAnalytics(formName: string) {
  const { trackForm } = useAnalytics()

  // Auto-track form view on mount
  useEffect(() => {
    trackForm(formName, 'view')
  }, [formName, trackForm])

  const trackFormStart = useCallback(() => {
    trackForm(formName, 'start')
  }, [formName, trackForm])

  const trackFormProgress = useCallback((fieldData?: Record<string, any>) => {
    trackForm(formName, 'progress', fieldData)
  }, [formName, trackForm])

  const trackFormSubmit = useCallback((fieldData?: Record<string, any>) => {
    trackForm(formName, 'submit', fieldData)
  }, [formName, trackForm])

  const trackFormError = useCallback((errorData?: Record<string, any>) => {
    trackForm(formName, 'error', errorData)
  }, [formName, trackForm])

  const trackFormAbandon = useCallback(() => {
    trackForm(formName, 'abandon')
  }, [formName, trackForm])

  return {
    trackFormStart,
    trackFormProgress,
    trackFormSubmit,
    trackFormError,
    trackFormAbandon,
  }
}

/**
 * Hook for tracking e-commerce events
 */
export function useEcommerceAnalytics() {
  const { track } = useAnalytics()

  const trackProductView = useCallback((item: EcommerceItem) => {
    track({
      event: 'view_item',
      category: 'Ecommerce',
      action: 'view_item',
      label: item.item_name,
      value: item.price,
      custom_parameters: {
        currency: item.currency || 'USD',
        items: [item],
      }
    })
  }, [track])

  const trackAddToCart = useCallback((item: EcommerceItem) => {
    track({
      event: 'add_to_cart',
      category: 'Ecommerce',
      action: 'add_to_cart',
      label: item.item_name,
      value: item.price * (item.quantity || 1),
      custom_parameters: {
        currency: item.currency || 'USD',
        items: [item],
      }
    })
  }, [track])

  const trackRemoveFromCart = useCallback((item: EcommerceItem) => {
    track({
      event: 'remove_from_cart',
      category: 'Ecommerce',
      action: 'remove_from_cart',
      label: item.item_name,
      value: item.price * (item.quantity || 1),
      custom_parameters: {
        currency: item.currency || 'USD',
        items: [item],
      }
    })
  }, [track])

  const trackBeginCheckout = useCallback((items: EcommerceItem[], value: number) => {
    track({
      event: 'begin_checkout',
      category: 'Ecommerce',
      action: 'begin_checkout',
      value: value,
      custom_parameters: {
        currency: 'USD',
        items: items,
      }
    })
  }, [track])

  const trackPurchase = useCallback((
    transactionId: string, 
    items: EcommerceItem[], 
    value: number,
    currency: string = 'USD'
  ) => {
    track({
      event: 'purchase',
      category: 'Ecommerce',
      action: 'purchase',
      value: value,
      custom_parameters: {
        transaction_id: transactionId,
        currency: currency,
        items: items,
      }
    })
  }, [track])

  return {
    trackProductView,
    trackAddToCart,
    trackRemoveFromCart,
    trackBeginCheckout,
    trackPurchase,
  }
}

/**
 * Hook for tracking user interactions
 */
export function useInteractionAnalytics() {
  const { track } = useAnalytics()

  const trackClick = useCallback((elementName: string, location?: string) => {
    track({
      event: 'click',
      category: 'Interaction',
      action: 'click',
      label: elementName,
      custom_parameters: {
        element_name: elementName,
        click_location: location,
      }
    })
  }, [track])

  const trackVideoPlay = useCallback((videoTitle: string, videoUrl?: string) => {
    track({
      event: 'video_play',
      category: 'Video',
      action: 'play',
      label: videoTitle,
      custom_parameters: {
        video_title: videoTitle,
        video_url: videoUrl,
      }
    })
  }, [track])

  const trackVideoPause = useCallback((videoTitle: string, currentTime: number) => {
    track({
      event: 'video_pause',
      category: 'Video',
      action: 'pause',
      label: videoTitle,
      value: Math.round(currentTime),
      custom_parameters: {
        video_title: videoTitle,
        video_current_time: currentTime,
      }
    })
  }, [track])

  const trackVideoComplete = useCallback((videoTitle: string, videoDuration: number) => {
    track({
      event: 'video_complete',
      category: 'Video',
      action: 'complete',
      label: videoTitle,
      value: Math.round(videoDuration),
      custom_parameters: {
        video_title: videoTitle,
        video_duration: videoDuration,
      }
    })
  }, [track])

  const trackDownload = useCallback((fileName: string, fileType: string, fileUrl?: string) => {
    track({
      event: 'file_download',
      category: 'Download',
      action: 'download',
      label: fileName,
      custom_parameters: {
        file_name: fileName,
        file_type: fileType,
        file_url: fileUrl,
      }
    })
  }, [track])

  const trackExternalLink = useCallback((linkUrl: string, linkText?: string) => {
    track({
      event: 'click',
      category: 'External Link',
      action: 'click',
      label: linkUrl,
      custom_parameters: {
        link_url: linkUrl,
        link_text: linkText,
        link_domain: new URL(linkUrl).hostname,
      }
    })
  }, [track])

  const trackPhoneCall = useCallback((phoneNumber: string, location?: string) => {
    track({
      event: 'phone_call',
      category: 'Contact',
      action: 'phone_call',
      label: phoneNumber,
      custom_parameters: {
        phone_number: phoneNumber,
        call_location: location,
      }
    })
  }, [track])

  const trackEmailClick = useCallback((emailAddress: string, location?: string) => {
    track({
      event: 'email_click',
      category: 'Contact',
      action: 'email_click',
      label: emailAddress,
      custom_parameters: {
        email_address: emailAddress,
        email_location: location,
      }
    })
  }, [track])

  return {
    trackClick,
    trackVideoPlay,
    trackVideoPause,
    trackVideoComplete,
    trackDownload,
    trackExternalLink,
    trackPhoneCall,
    trackEmailClick,
  }
}

/**
 * Hook for tracking travel-specific events
 */
export function useTravelAnalytics() {
  const { track, trackConversion } = useAnalytics()

  const trackDestinationView = useCallback((destination: string, origin?: string) => {
    track({
      event: 'destination_view',
      category: 'Travel',
      action: 'destination_view',
      label: destination,
      custom_parameters: {
        destination: destination,
        origin: origin,
      }
    })
  }, [track])

  const trackFlightSearch = useCallback((searchParams: {
    origin: string
    destination: string
    departure_date: string
    return_date?: string
    passengers: number
  }) => {
    track({
      event: 'flight_search',
      category: 'Travel',
      action: 'flight_search',
      label: `${searchParams.origin} to ${searchParams.destination}`,
      value: searchParams.passengers,
      custom_parameters: {
        ...searchParams,
        trip_type: searchParams.return_date ? 'round_trip' : 'one_way',
      }
    })
  }, [track])

  const trackCruiseSearch = useCallback((searchParams: {
    destination: string
    duration: number
    departure_date: string
    passengers: number
  }) => {
    track({
      event: 'cruise_search',
      category: 'Travel',
      action: 'cruise_search',
      label: searchParams.destination,
      value: searchParams.duration,
      custom_parameters: searchParams,
    })
  }, [track])

  const trackQuoteRequest = useCallback((
    serviceType: 'flight' | 'cruise' | 'package',
    details: Record<string, any>,
    estimatedValue?: number
  ) => {
    // Track as conversion
    trackConversion({
      type: 'quote_request',
      value: estimatedValue,
      form_data: {
        service_type: serviceType,
        ...details,
      }
    })

    // Also track as custom event
    track({
      event: 'quote_request',
      category: 'Travel',
      action: 'quote_request',
      label: serviceType,
      value: estimatedValue,
      custom_parameters: {
        service_type: serviceType,
        ...details,
      }
    })
  }, [track, trackConversion])

  const trackBookingStart = useCallback((
    serviceType: 'flight' | 'cruise' | 'package',
    bookingDetails: Record<string, any>
  ) => {
    track({
      event: 'booking_start',
      category: 'Travel',
      action: 'booking_start',
      label: serviceType,
      custom_parameters: {
        service_type: serviceType,
        ...bookingDetails,
      }
    })
  }, [track])

  const trackBookingComplete = useCallback((
    transactionId: string,
    serviceType: 'flight' | 'cruise' | 'package',
    value: number,
    bookingDetails: Record<string, any>
  ) => {
    // Track as conversion
    trackConversion({
      type: 'booking',
      transaction_id: transactionId,
      value: value,
      form_data: {
        service_type: serviceType,
        ...bookingDetails,
      }
    })

    // Also track as purchase event
    track({
      event: 'purchase',
      category: 'Travel',
      action: 'booking_complete',
      label: serviceType,
      value: value,
      custom_parameters: {
        transaction_id: transactionId,
        service_type: serviceType,
        ...bookingDetails,
      }
    })
  }, [track, trackConversion])

  return {
    trackDestinationView,
    trackFlightSearch,
    trackCruiseSearch,
    trackQuoteRequest,
    trackBookingStart,
    trackBookingComplete,
  }
}