'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

// Global declarations are already in ErrorBoundary.tsx

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

/**
 * Google Analytics 4 component with enhanced e-commerce and conversion tracking
 */
export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) {
      return
    }

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    
    // Track page view
    window.gtag!('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
    })

    // Track Core Web Vitals
    if ('web-vital' in window) {
      const vitals = ['CLS', 'FID', 'FCP', 'LCP', 'TTFB', 'INP']
      vitals.forEach(vital => {
        window.gtag!('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: vital,
          value: Math.round(vital === 'CLS' ? ((window as unknown as Record<string, unknown>)[`web-vital-${vital}`] as number) * 1000 : (window as unknown as Record<string, unknown>)[`web-vital-${vital}`] as number),
          non_interaction: true,
        })
      })
    }
  }, [pathname, searchParams])

  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('Google Analytics ID not configured')
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
            link_attribution: true,
          });
        `}
      </Script>
    </>
  )
}

/**
 * Track custom events for conversions and user interactions
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number,
  parameters?: Record<string, unknown>
) {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  window.gtag!('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...parameters,
  })
}

/**
 * Track conversion events
 */
export function trackConversion(
  conversionType: 'lead' | 'phone_call' | 'email' | 'form_submit' | 'booking',
  value?: number,
  currency: string = 'USD'
) {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  const conversionIds: Record<typeof conversionType, string> = {
    lead: 'AW-XXXXXXXXX/XXXXXXXXXXXXXXXXX',
    phone_call: 'AW-XXXXXXXXX/YYYYYYYYYYYYYYYYY',
    email: 'AW-XXXXXXXXX/ZZZZZZZZZZZZZZZZZ',
    form_submit: 'AW-XXXXXXXXX/AAAAAAAAAAAAAAAAAA',
    booking: 'AW-XXXXXXXXX/BBBBBBBBBBBBBBBBB',
  }

  // Track as GA4 event
  window.gtag!('event', 'conversion', {
    send_to: conversionIds[conversionType],
    value: value,
    currency: currency,
    transaction_id: Date.now().toString(),
  })

  // Also track as custom event for GA4
  trackEvent(`${conversionType}_conversion`, 'Conversions', undefined, value)
}

/**
 * Track e-commerce events
 */
export function trackEcommerce(
  eventType: 'view_item' | 'add_to_cart' | 'begin_checkout' | 'purchase',
  items: Array<{
    id: string
    name: string
    category?: string
    price: number
    quantity?: number
  }>,
  value?: number,
  currency: string = 'USD'
) {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  window.gtag!('event', eventType, {
    currency: currency,
    value: value || items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category || 'Travel',
      price: item.price,
      quantity: item.quantity || 1,
    })),
  })
}

/**
 * Track search events
 */
export function trackSearch(searchTerm: string, searchType?: string) {
  trackEvent('search', 'Site Search', searchType || 'general', undefined, {
    search_term: searchTerm,
  })
}

/**
 * Track scroll depth
 */
export function initScrollTracking() {
  if (typeof window === 'undefined') {
    return
  }

  let maxScroll = 0
  const thresholds = [25, 50, 75, 90, 100]
  const tracked = new Set<number>()

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    )

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold)
          trackEvent('scroll_depth', 'Engagement', `${threshold}%`, threshold)
        }
      })
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}

/**
 * Track engagement time
 */
export function initEngagementTracking() {
  if (typeof window === 'undefined') {
    return
  }

  let startTime = Date.now()
  let totalTime = 0
  let isActive = true

  const trackTime = () => {
    if (isActive) {
      totalTime += Date.now() - startTime
    }
    
    const seconds = Math.round(totalTime / 1000)
    trackEvent('engagement_time', 'Engagement', 'Total Time', seconds)
  }

  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (isActive) {
        totalTime += Date.now() - startTime
        isActive = false
      }
    } else {
      if (!isActive) {
        startTime = Date.now()
        isActive = true
      }
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('beforeunload', trackTime)

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    window.removeEventListener('beforeunload', trackTime)
  }
}