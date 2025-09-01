/**
 * Analytics tracking utility for user behavior and business metrics
 */

export interface AnalyticsEvent {
  name: string
  category: 'navigation' | 'interaction' | 'conversion' | 'error' | 'performance'
  properties?: Record<string, any>
  value?: number
  timestamp?: number
}

export interface UserProperties {
  userId?: string
  email?: string
  plan?: string
  createdAt?: string
  [key: string]: unknown
}

class Analytics {
  private static instance: Analytics
  private queue: AnalyticsEvent[] = []
  private userProperties: UserProperties = {}
  private isInitialized = false
  private sessionId: string

  private constructor() {
    this.sessionId = this.generateSessionId()
    this.initializeAnalytics()
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  /**
   * Initialize analytics providers
   */
  private initializeAnalytics(): void {
    if (typeof window === 'undefined') {
      return
    }

    // Initialize Google Analytics
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      this.initializeGoogleAnalytics()
    }

    // Initialize other analytics providers as needed
    this.isInitialized = true
    this.flushQueue()
  }

  /**
   * Initialize Google Analytics
   */
  private initializeGoogleAnalytics(): void {
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`
    script.async = true
    document.head.appendChild(script)
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).gtag = function (...args: unknown[]) {
      ;(window as any).dataLayer.push(args)
    }
    ;(window as any).gtag('js', new Date())
    ;(window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      send_page_view: false,
      custom_map: {
        dimension1: 'user_id',
        dimension2: 'session_id',
      },
    })
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Track page view
   */
  public pageView(path: string, title?: string): void {
    const event: AnalyticsEvent = {
      name: 'page_view',
      category: 'navigation',
      properties: {
        path,
        title: title || document.title,
        referrer: document.referrer,
        session_id: this.sessionId,
      },
    }

    this.track(event)
  }

  /**
   * Track custom events
   */
  public track(event: AnalyticsEvent): void {
    const enrichedEvent = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      properties: {
        ...event.properties,
        ...this.userProperties,
        session_id: this.sessionId,
      },
    }

    if (!this.isInitialized) {
      this.queue.push(enrichedEvent)
      return
    }

    this.sendEvent(enrichedEvent)
  }

  /**
   * Send event to analytics providers
   */
  private sendEvent(event: AnalyticsEvent): void {
    // Google Analytics
    if (typeof (window as any).gtag !== 'undefined') {
      ;(window as any).gtag('event', event.name, {
        event_category: event.category,
        event_label: event.properties?.label,
        value: event.value,
        custom_parameters: event.properties,
      })
    }

    // Custom analytics endpoint
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      }).catch(() => {})
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event)
    }
  }

  /**
   * Flush queued events
   */
  private flushQueue(): void {
    while (this.queue.length > 0) {
      const event = this.queue.shift()
      if (event) {
        this.sendEvent(event)
      }
    }
  }

  /**
   * Set user properties
   */
  public identify(properties: UserProperties): void {
    this.userProperties = { ...this.userProperties, ...properties }

    // Update Google Analytics user properties
    if (typeof (window as any).gtag !== 'undefined') {
      ;(window as any).gtag('set', 'user_properties', properties)
    }
  }

  /**
   * Track conversion events
   */
  public trackConversion(
    conversionType: string,
    value?: number,
    properties?: Record<string, any>
  ): void {
    this.track({
      name: `conversion_${conversionType}`,
      category: 'conversion',
      value,
      properties: {
        conversion_type: conversionType,
        ...properties,
      },
    })
  }

  /**
   * Track errors
   */
  public trackError(error: Error, context?: Record<string, any>): void {
    this.track({
      name: 'error',
      category: 'error',
      properties: {
        error_message: error.message,
        error_stack: error.stack,
        ...context,
      },
    })
  }

  /**
   * Track performance metrics
   */
  public trackPerformance(metric: string, value: number, properties?: Record<string, any>): void {
    this.track({
      name: `performance_${metric}`,
      category: 'performance',
      value,
      properties: {
        metric,
        ...properties,
      },
    })
  }

  /**
   * Track user interactions
   */
  public trackInteraction(action: string, target: string, properties?: Record<string, any>): void {
    this.track({
      name: `interaction_${action}`,
      category: 'interaction',
      properties: {
        action,
        target,
        ...properties,
      },
    })
  }

  /**
   * Track search events
   */
  public trackSearch(query: string, results: number, properties?: Record<string, any>): void {
    this.track({
      name: 'search',
      category: 'interaction',
      properties: {
        search_query: query,
        results_count: results,
        ...properties,
      },
    })
  }

  /**
   * Track timing events
   */
  public trackTiming(category: string, variable: string, time: number): void {
    this.track({
      name: 'timing',
      category: 'performance',
      value: time,
      properties: {
        timing_category: category,
        timing_variable: variable,
      },
    })
  }

  /**
   * Reset analytics (e.g., on logout)
   */
  public reset(): void {
    this.userProperties = {}
    this.sessionId = this.generateSessionId()
  }
}

// Export singleton instance
export const analytics = Analytics.getInstance()

// React hook for analytics
export function useAnalytics() {
  return analytics
}
