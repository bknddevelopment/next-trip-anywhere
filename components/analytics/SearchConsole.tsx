'use client'

import { useEffect } from 'react'
import Script from 'next/script'

const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ''

/**
 * Google Search Console verification and sitemap submission component
 */
export default function SearchConsole() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Submit sitemap to Google Search Console programmatically
    const submitSitemap = async () => {
      try {
        // This would typically be done through Google Search Console API
        // For now, we'll log the sitemap URL
        const sitemapUrl = `${window.location.origin}/sitemap.xml`
        console.log('Sitemap URL for Google Search Console:', sitemapUrl)
        
        // Track sitemap submission
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'sitemap_available',
            sitemap_url: sitemapUrl,
            timestamp: new Date().toISOString(),
          })
        }
      } catch (error) {
        console.error('Error with sitemap setup:', error)
      }
    }

    // Monitor Core Web Vitals for Search Console
    const monitorCoreWebVitals = () => {
      // These metrics are automatically collected by our performance monitoring
      // but we can also send them to Search Console via the API
      if ('web-vital' in window) {
        const vitals = ['CLS', 'FID', 'FCP', 'LCP', 'TTFB', 'INP']
        vitals.forEach(vital => {
          const value = (window as any)[`web-vital-${vital}`]
          if (value) {
            // Track Core Web Vitals for Search Console reporting
            if (window.dataLayer) {
              window.dataLayer.push({
                event: 'core_web_vital',
                metric_name: vital,
                metric_value: value,
                metric_rating: getCWVRating(vital, value),
                timestamp: new Date().toISOString(),
              })
            }
          }
        })
      }
    }

    submitSitemap()
    
    // Monitor Core Web Vitals after page load
    if (document.readyState === 'complete') {
      monitorCoreWebVitals()
    } else {
      window.addEventListener('load', monitorCoreWebVitals)
    }

    // Setup search performance monitoring
    setupSearchPerformanceTracking()

  }, [])

  if (!GOOGLE_SITE_VERIFICATION) {
    console.warn('Google Site Verification meta tag not configured')
  }

  return (
    <>
      {/* Google Site Verification Meta Tag */}
      {GOOGLE_SITE_VERIFICATION && (
        <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
      )}

      {/* Structured Data for Search Console */}
      <Script id="search-console-structured-data" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Next Trip Anywhere',
          url: 'https://nexttripanywhere.com',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://nexttripanywhere.com/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
          mainEntity: {
            '@type': 'TravelAgency',
            name: 'Next Trip Anywhere',
            description: "America's premier travel agency specializing in flights, cruises, and vacation packages.",
            url: 'https://nexttripanywhere.com',
            sameAs: [
              'https://www.facebook.com/nexttripanywhere',
              'https://www.instagram.com/nexttripanywhere',
              'https://www.twitter.com/nexttripanywhere',
              'https://www.linkedin.com/company/nexttripanywhere',
            ],
          }
        })}
      </Script>

      {/* Rich Snippets for Travel Services */}
      <Script id="travel-services-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Travel Agency Services',
          provider: {
            '@type': 'TravelAgency',
            name: 'Next Trip Anywhere',
            url: 'https://nexttripanywhere.com',
          },
          areaServed: {
            '@type': 'Country',
            name: 'United States',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Travel Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Flight Booking',
                  description: 'Domestic and international flight reservations with competitive prices',
                  category: 'Travel Booking',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Cruise Packages',
                  description: 'Caribbean, Mediterranean, and Alaska cruise packages',
                  category: 'Travel Booking',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Vacation Packages',
                  description: 'All-inclusive resort and destination packages',
                  category: 'Travel Booking',
                },
              },
            ],
          },
        })}
      </Script>
    </>
  )
}

/**
 * Get Core Web Vitals rating based on Google's thresholds
 */
function getCWVRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, { good: number; poor: number }> = {
    LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint (ms)
    FID: { good: 100, poor: 300 },   // First Input Delay (ms)
    CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
    FCP: { good: 1800, poor: 3000 }, // First Contentful Paint (ms)
    TTFB: { good: 800, poor: 1800 }, // Time to First Byte (ms)
    INP: { good: 200, poor: 500 },   // Interaction to Next Paint (ms)
  }

  const threshold = thresholds[metric]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

/**
 * Setup search performance tracking
 */
function setupSearchPerformanceTracking() {
  if (typeof window === 'undefined') return

  // Track search queries from URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const searchQuery = urlParams.get('q') || urlParams.get('query') || urlParams.get('s')
  
  if (searchQuery && window.dataLayer) {
    window.dataLayer.push({
      event: 'internal_search',
      search_term: searchQuery,
      search_results_count: document.querySelectorAll('[data-search-result]').length,
      timestamp: new Date().toISOString(),
    })
  }

  // Track search result clicks
  const trackSearchResultClick = (event: Event) => {
    const target = event.target as HTMLElement
    const searchResult = target.closest('[data-search-result]')
    
    if (searchResult && window.dataLayer) {
      const position = Array.from(document.querySelectorAll('[data-search-result]')).indexOf(searchResult) + 1
      const resultTitle = searchResult.querySelector('h2, h3, .title')?.textContent || 'Unknown'
      const resultUrl = searchResult.querySelector('a')?.href || window.location.href
      
      window.dataLayer.push({
        event: 'search_result_click',
        search_term: searchQuery || 'unknown',
        result_position: position,
        result_title: resultTitle,
        result_url: resultUrl,
        timestamp: new Date().toISOString(),
      })
    }
  }

  // Add click tracking to search results
  document.addEventListener('click', trackSearchResultClick, true)

  // Track 404 errors for Search Console
  if (document.title.toLowerCase().includes('404') || document.title.toLowerCase().includes('not found')) {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_error',
        error_type: '404',
        error_page: window.location.pathname,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
      })
    }
  }
}

/**
 * Track Search Console specific events
 */
export function trackSearchConsoleEvent(
  eventType: 'search_query' | 'search_result_click' | 'crawl_error' | 'mobile_usability',
  data: Record<string, any>
) {
  if (typeof window === 'undefined' || !window.dataLayer) return

  window.dataLayer.push({
    event: `search_console_${eventType}`,
    ...data,
    timestamp: new Date().toISOString(),
    page_url: window.location.href,
    page_path: window.location.pathname,
  })
}

/**
 * Monitor and report mobile usability issues
 */
export function initMobileUsabilityTracking() {
  if (typeof window === 'undefined') return

  const checkMobileUsability = () => {
    const issues: string[] = []
    
    // Check viewport meta tag
    const viewport = document.querySelector('meta[name="viewport"]')
    if (!viewport || !viewport.getAttribute('content')?.includes('width=device-width')) {
      issues.push('missing_viewport_meta')
    }

    // Check for clickable elements too close together
    const clickableElements = document.querySelectorAll('button, a, input[type="button"], input[type="submit"]')
    clickableElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect()
      if (rect.height > 0 && rect.height < 44) { // Apple's recommended minimum touch target
        issues.push(`small_touch_target_${index}`)
      }
    })

    // Check for text too small to read
    const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6')
    textElements.forEach((element, index) => {
      const styles = window.getComputedStyle(element)
      const fontSize = parseInt(styles.fontSize)
      if (fontSize > 0 && fontSize < 12) {
        issues.push(`small_font_size_${index}`)
      }
    })

    if (issues.length > 0) {
      trackSearchConsoleEvent('mobile_usability', {
        usability_issues: issues,
        issues_count: issues.length,
      })
    }
  }

  // Check mobile usability after page load
  if (document.readyState === 'complete') {
    checkMobileUsability()
  } else {
    window.addEventListener('load', checkMobileUsability)
  }
}