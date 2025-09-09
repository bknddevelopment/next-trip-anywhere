'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// Global declarations are already in ErrorBoundary.tsx
declare global {
  interface Window {
    dataLayer?: any[]
    GTM_ID?: string
  }
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXX'

/**
 * Google Tag Manager component for comprehensive tracking setup
 */
export default function GoogleTagManager() {
  useEffect(() => {
    // Initialize dataLayer if not present
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.GTM_ID = GTM_ID

      // Push initial dataLayer configuration
      window.dataLayer?.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
        // Site information
        site_name: 'Next Trip Anywhere',
        site_version: process.env.NEXT_PUBLIC_VERSION || '1.0.0',
        // User information (when available)
        user_properties: {
          visitor_type: 'guest', // Will be updated for returning users
          device_type: getDeviceType(),
          page_type: getPageType(),
        }
      })
    }
  }, [])

  if (!GTM_ID || GTM_ID === 'GTM-XXXXXX') {
    console.warn('Google Tag Manager ID not configured')
    return null
  }

  return (
    <>
      {/* Google Tag Manager Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}

/**
 * Get device type for analytics
 */
function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown'
  
  const width = window.innerWidth
  if (width >= 1024) return 'desktop'
  if (width >= 768) return 'tablet'
  return 'mobile'
}

/**
 * Get page type based on current URL
 */
function getPageType(): string {
  if (typeof window === 'undefined') return 'unknown'
  
  const path = window.location.pathname
  if (path === '/') return 'homepage'
  if (path.startsWith('/flights')) return 'flights'
  if (path.startsWith('/cruises')) return 'cruises'
  if (path.startsWith('/packages')) return 'packages'
  if (path.startsWith('/from/')) return 'location'
  if (path === '/contact') return 'contact'
  if (path === '/about') return 'about'
  return 'other'
}

/**
 * Enhanced dataLayer push function with type safety
 */
export function pushToDataLayer(data: Record<string, any>) {
  if (typeof window === 'undefined' || !window.dataLayer) return
  
  window.dataLayer.push({
    ...data,
    timestamp: new Date().toISOString(),
    page_url: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  })
}

/**
 * Track enhanced e-commerce events via dataLayer
 */
export function trackEcommerceEvent(
  event: string,
  data: {
    transaction_id?: string
    value?: number
    currency?: string
    items?: Array<{
      item_id: string
      item_name: string
      item_category?: string
      item_category2?: string
      item_brand?: string
      price: number
      quantity?: number
    }>
    [key: string]: any
  }
) {
  pushToDataLayer({
    event,
    ecommerce: {
      ...data,
      currency: data.currency || 'USD',
    }
  })
}

/**
 * Track conversion events
 */
export function trackGTMConversion(
  conversionLabel: string,
  value?: number,
  currency: string = 'USD'
) {
  pushToDataLayer({
    event: 'conversion',
    conversion_label: conversionLabel,
    conversion_value: value,
    conversion_currency: currency,
    conversion_id: `conv_${Date.now()}`,
  })
}

/**
 * Track form events
 */
export function trackFormEvent(
  action: 'start' | 'progress' | 'submit' | 'error',
  formName: string,
  additionalData?: Record<string, any>
) {
  pushToDataLayer({
    event: 'form_interaction',
    form_name: formName,
    form_action: action,
    ...additionalData,
  })
}