/**
 * Analytics utilities for comprehensive tracking across the application
 */

import { v4 as uuidv4 } from 'uuid'

// Analytics event types
export interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

// E-commerce item interface
export interface EcommerceItem {
  item_id: string
  item_name: string
  item_category: string
  item_category2?: string
  item_brand?: string
  price: number
  quantity?: number
  currency?: string
}

// Conversion tracking interface
export interface ConversionData {
  type: 'lead' | 'phone_call' | 'email' | 'form_submit' | 'booking' | 'quote_request'
  value?: number
  currency?: string
  transaction_id?: string
  items?: EcommerceItem[]
  form_data?: Record<string, any>
}

/**
 * Enhanced analytics tracking with multiple platforms
 */
class Analytics {
  private initialized = false
  private userId: string | null = null
  private sessionId: string
  private pageViewStartTime: number = Date.now()

  constructor() {
    this.sessionId = uuidv4()
    
    if (typeof window !== 'undefined') {
      this.init()
    }
  }

  private init() {
    if (this.initialized) return
    
    // Check if user has analytics consent
    const cookiePreferences = localStorage.getItem('nexttrip_cookie_preferences')
    if (cookiePreferences) {
      try {
        const prefs = JSON.parse(cookiePreferences)
        if (!prefs.analytics) {
          console.log('Analytics disabled by user preference')
          return
        }
      } catch (error) {
        console.error('Error parsing cookie preferences:', error)
      }
    }

    // Get or create user ID for cross-session tracking
    this.userId = localStorage.getItem('ntw_user_id') || uuidv4()
    localStorage.setItem('ntw_user_id', this.userId)

    // Initialize scroll tracking
    this.initScrollTracking()
    
    // Initialize engagement tracking
    this.initEngagementTracking()
    
    // Track page load performance
    this.trackPagePerformance()

    this.initialized = true
  }

  /**
   * Track page views with enhanced data
   */
  trackPageView(page?: string) {
    if (!this.initialized) return

    const pageData = {
      event: 'page_view',
      page_title: document.title,
      page_location: window.location.href,
      page_path: page || window.location.pathname,
      user_id: this.userId,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
      page_type: this.getPageType(),
      traffic_source: this.getTrafficSource(),
      device_info: this.getDeviceInfo(),
    }

    this.pushToDataLayer(pageData)
    this.pageViewStartTime = Date.now()
  }

  /**
   * Track custom events
   */
  trackEvent(eventData: AnalyticsEvent) {
    if (!this.initialized) return

    const enrichedEvent = {
      ...eventData,
      event_time: new Date().toISOString(),
      user_id: this.userId,
      session_id: this.sessionId,
      page_location: window.location.href,
      page_title: document.title,
    }

    this.pushToDataLayer(enrichedEvent)

    // Also send to Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventData.action, {
        event_category: eventData.category,
        event_label: eventData.label,
        value: eventData.value,
        ...eventData.custom_parameters,
      })
    }
  }

  /**
   * Track conversions with enhanced e-commerce data
   */
  trackConversion(conversionData: ConversionData) {
    if (!this.initialized) return

    const conversionEvent = {
      event: 'conversion',
      conversion_type: conversionData.type,
      conversion_id: conversionData.transaction_id || `conv_${Date.now()}`,
      value: conversionData.value,
      currency: conversionData.currency || 'USD',
      user_id: this.userId,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    }

    // Create enriched conversion event with proper typing
    const enrichedConversionEvent: Record<string, any> = { ...conversionEvent }

    // Add e-commerce data if present
    if (conversionData.items) {
      enrichedConversionEvent.items = conversionData.items
      enrichedConversionEvent.ecommerce = {
        currency: conversionData.currency || 'USD',
        value: conversionData.value || this.calculateItemsValue(conversionData.items),
        items: conversionData.items,
      }
    }

    // Add form data if present
    if (conversionData.form_data) {
      enrichedConversionEvent.form_data = this.sanitizeFormData(conversionData.form_data)
    }

    this.pushToDataLayer(enrichedConversionEvent)

    // Track specific conversion goals
    this.trackConversionGoals(conversionData.type, conversionData.value)
  }

  /**
   * Track form interactions
   */
  trackFormInteraction(
    formName: string, 
    action: 'view' | 'start' | 'progress' | 'submit' | 'error' | 'abandon',
    fieldData?: Record<string, any>
  ) {
    if (!this.initialized) return

    this.trackEvent({
      event: 'form_interaction',
      category: 'Form',
      action: `${formName}_${action}`,
      label: formName,
      custom_parameters: {
        form_name: formName,
        form_action: action,
        form_fields: fieldData ? Object.keys(fieldData).length : undefined,
        ...fieldData,
      }
    })
  }

  /**
   * Track search events
   */
  trackSearch(searchTerm: string, searchType: string, resultsCount?: number) {
    if (!this.initialized) return

    this.trackEvent({
      event: 'search',
      category: 'Search',
      action: 'search',
      label: searchType,
      value: resultsCount,
      custom_parameters: {
        search_term: searchTerm,
        search_type: searchType,
        results_count: resultsCount,
      }
    })
  }

  /**
   * Track user engagement metrics
   */
  trackEngagement(engagementType: string, engagementValue?: number) {
    if (!this.initialized) return

    this.trackEvent({
      event: 'engagement',
      category: 'Engagement',
      action: engagementType,
      value: engagementValue,
      custom_parameters: {
        engagement_time_msec: Date.now() - this.pageViewStartTime,
      }
    })
  }

  /**
   * Track scroll depth
   */
  private initScrollTracking() {
    if (typeof window === 'undefined') return

    let maxScroll = 0
    const thresholds = [10, 25, 50, 75, 90, 100]
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
            this.trackEngagement('scroll_depth', threshold)
          }
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
  }

  /**
   * Track engagement time
   */
  private initEngagementTracking() {
    if (typeof window === 'undefined') return

    let startTime = Date.now()
    let totalEngagedTime = 0
    let isEngaged = true
    let lastActivity = Date.now()

    // Track user activity
    const trackActivity = () => {
      lastActivity = Date.now()
      if (!isEngaged) {
        startTime = Date.now()
        isEngaged = true
      }
    }

    // Check for inactivity
    const checkInactivity = () => {
      if (Date.now() - lastActivity > 30000) { // 30 seconds
        if (isEngaged) {
          totalEngagedTime += Date.now() - startTime
          isEngaged = false
        }
      }
    }

    // Track engagement on page unload
    const trackFinalEngagement = () => {
      if (isEngaged) {
        totalEngagedTime += Date.now() - startTime
      }
      
      const engagementSeconds = Math.round(totalEngagedTime / 1000)
      if (engagementSeconds > 0) {
        this.trackEngagement('page_engagement_time', engagementSeconds)
      }
    }

    // Event listeners
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, trackActivity, { passive: true })
    })

    // Check inactivity every 15 seconds
    setInterval(checkInactivity, 15000)

    // Track on visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (isEngaged) {
          totalEngagedTime += Date.now() - startTime
          isEngaged = false
        }
      } else {
        startTime = Date.now()
        isEngaged = true
      }
    })

    // Track on page unload
    window.addEventListener('beforeunload', trackFinalEngagement)
    window.addEventListener('pagehide', trackFinalEngagement)
  }

  /**
   * Track page performance metrics
   */
  private trackPagePerformance() {
    if (typeof window === 'undefined' || !('performance' in window)) return

    // Wait for the page to fully load
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType('paint')
        
        if (navigation) {
          this.trackEvent({
            event: 'page_performance',
            category: 'Performance',
            action: 'page_load_timing',
            custom_parameters: {
              page_load_time: Math.round(navigation.loadEventEnd - navigation.fetchStart),
              dom_content_loaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
              first_byte: Math.round(navigation.responseStart - navigation.fetchStart),
            }
          })
        }

        // First Paint and First Contentful Paint
        paint.forEach(entry => {
          this.trackEvent({
            event: 'web_vitals',
            category: 'Performance',
            action: entry.name.replace('-', '_'),
            value: Math.round(entry.startTime),
          })
        })

        // Core Web Vitals (if available)
        if ('web-vital' in window) {
          ['LCP', 'FID', 'CLS', 'FCP', 'TTFB', 'INP'].forEach(vital => {
            if ((window as any)[`web-vital-${vital}`]) {
              this.trackEvent({
                event: 'web_vitals',
                category: 'Performance',
                action: vital.toLowerCase(),
                value: Math.round((window as any)[`web-vital-${vital}`]),
              })
            }
          })
        }
      }, 1000)
    })
  }

  /**
   * Get page type from URL
   */
  private getPageType(): string {
    if (typeof window === 'undefined') return 'unknown'
    
    const path = window.location.pathname
    if (path === '/') return 'homepage'
    if (path.startsWith('/flights')) return 'flights'
    if (path.startsWith('/cruises')) return 'cruises'
    if (path.startsWith('/packages')) return 'packages'
    if (path.startsWith('/from/')) return 'location_page'
    if (path === '/contact') return 'contact'
    if (path === '/about') return 'about'
    return 'other'
  }

  /**
   * Get traffic source information
   */
  private getTrafficSource(): Record<string, string> {
    if (typeof window === 'undefined') return {}

    const urlParams = new URLSearchParams(window.location.search)
    const referrer = document.referrer

    return {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_term: urlParams.get('utm_term') || '',
      utm_content: urlParams.get('utm_content') || '',
      referrer: referrer || 'direct',
      gclid: urlParams.get('gclid') || '',
      fbclid: urlParams.get('fbclid') || '',
    }
  }

  /**
   * Get device information
   */
  private getDeviceInfo(): Record<string, any> {
    if (typeof window === 'undefined') return {}

    return {
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      device_type: this.getDeviceType(),
      user_agent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  }

  /**
   * Get device type
   */
  private getDeviceType(): string {
    if (typeof window === 'undefined') return 'unknown'
    
    const width = window.innerWidth
    if (width >= 1024) return 'desktop'
    if (width >= 768) return 'tablet'
    return 'mobile'
  }

  /**
   * Calculate total value of items
   */
  private calculateItemsValue(items: EcommerceItem[]): number {
    return items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
  }

  /**
   * Sanitize form data for tracking
   */
  private sanitizeFormData(formData: Record<string, any>): Record<string, any> {
    const sensitive = ['password', 'ssn', 'credit_card', 'card_number', 'cvv', 'social_security']
    const sanitized: Record<string, any> = {}

    Object.keys(formData).forEach(key => {
      const lowerKey = key.toLowerCase()
      if (sensitive.some(s => lowerKey.includes(s))) {
        sanitized[key] = '[REDACTED]'
      } else {
        sanitized[key] = formData[key]
      }
    })

    return sanitized
  }

  /**
   * Track conversion goals in GA4
   */
  private trackConversionGoals(type: string, value?: number) {
    if (typeof window === 'undefined' || !window.gtag) return

    const conversionActions = {
      lead: 'generate_lead',
      phone_call: 'contact',
      email: 'contact',
      form_submit: 'submit_application',
      booking: 'purchase',
      quote_request: 'generate_lead',
    }

    const action = conversionActions[type as keyof typeof conversionActions] || 'conversion'
    
    window.gtag('event', action, {
      currency: 'USD',
      value: value || 0,
    })
  }

  /**
   * Push data to dataLayer
   */
  private pushToDataLayer(data: Record<string, any>) {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(data)
    }
  }
}

// Export singleton instance
export const analytics = new Analytics()

// Export utility functions
export const trackPageView = (page?: string) => analytics.trackPageView(page)
export const trackEvent = (eventData: AnalyticsEvent) => analytics.trackEvent(eventData)
export const trackConversion = (conversionData: ConversionData) => analytics.trackConversion(conversionData)
export const trackFormInteraction = (formName: string, action: 'view' | 'start' | 'progress' | 'submit' | 'error' | 'abandon', fieldData?: Record<string, any>) => 
  analytics.trackFormInteraction(formName, action, fieldData)
export const trackSearch = (searchTerm: string, searchType: string, resultsCount?: number) => 
  analytics.trackSearch(searchTerm, searchType, resultsCount)
export const trackEngagement = (engagementType: string, engagementValue?: number) => 
  analytics.trackEngagement(engagementType, engagementValue)