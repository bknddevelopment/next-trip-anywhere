/**
 * A/B Testing Framework for NextTripAnywhere
 * Supports client-side experiments with localStorage persistence
 */

export interface ABTest {
  id: string
  name: string
  description: string
  variants: ABVariant[]
  traffic: number // Percentage of users to include (0-100)
  startDate: Date
  endDate?: Date
  isActive: boolean
  targetUrl?: string // Specific URL pattern to run test on
  excludeUrl?: string // URL pattern to exclude
}

export interface ABVariant {
  id: string
  name: string
  traffic: number // Percentage split within the test (should sum to 100)
  config: Record<string, any>
}

export interface ABTestResult {
  testId: string
  variantId: string
  userId: string
  timestamp: Date
  conversionEvents: ConversionEvent[]
}

export interface ConversionEvent {
  event: string
  value?: number
  timestamp: Date
  metadata?: Record<string, any>
}

// Active A/B Tests Configuration
export const AB_TESTS: Record<string, ABTest> = {
  'homepage-hero-cta': {
    id: 'homepage-hero-cta',
    name: 'Homepage Hero CTA Test',
    description: 'Test different CTA button text and colors on homepage hero',
    traffic: 50, // Only 50% of users will see this test
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-03-01'),
    isActive: true,
    targetUrl: '^/$', // Only on homepage
    variants: [
      {
        id: 'control',
        name: 'Control - Current Design',
        traffic: 50,
        config: {
          primaryCtaText: 'Start Planning My Trip',
          primaryCtaColor: 'bg-gradient-to-r from-primary-500 to-primary-600',
          secondaryCtaText: 'Surprise Me with Deals!',
          secondaryCtaColor: 'bg-gradient-to-r from-accent-500 to-accent-600'
        }
      },
      {
        id: 'urgent',
        name: 'Urgency Focused',
        traffic: 50,
        config: {
          primaryCtaText: 'Get Exclusive Deals Now',
          primaryCtaColor: 'bg-gradient-to-r from-red-500 to-red-600',
          secondaryCtaText: 'Save Up to 40% Today!',
          secondaryCtaColor: 'bg-gradient-to-r from-orange-500 to-orange-600'
        }
      }
    ]
  },
  'booking-form-steps': {
    id: 'booking-form-steps',
    name: 'Booking Form Complexity Test',
    description: 'Test 2-step vs 3-step booking form',
    traffic: 100,
    startDate: new Date('2025-01-15'),
    endDate: new Date('2025-04-15'),
    isActive: true,
    variants: [
      {
        id: 'three-step',
        name: '3-Step Form (Control)',
        traffic: 50,
        config: {
          steps: 3,
          collectAllInfo: true
        }
      },
      {
        id: 'two-step',
        name: '2-Step Simplified Form',
        traffic: 50,
        config: {
          steps: 2,
          collectEssentialOnly: true
        }
      }
    ]
  },
  'pricing-display': {
    id: 'pricing-display',
    name: 'Pricing Display Strategy',
    description: 'Test different ways to display savings and pricing',
    traffic: 75,
    startDate: new Date('2025-01-01'),
    isActive: true,
    variants: [
      {
        id: 'percentage',
        name: 'Percentage Savings',
        traffic: 33.33,
        config: {
          showPercentage: true,
          showDollar: false,
          emphasis: 'percentage'
        }
      },
      {
        id: 'dollar',
        name: 'Dollar Amount Savings',
        traffic: 33.33,
        config: {
          showPercentage: false,
          showDollar: true,
          emphasis: 'dollar'
        }
      },
      {
        id: 'both',
        name: 'Both Percentage and Dollar',
        traffic: 33.34,
        config: {
          showPercentage: true,
          showDollar: true,
          emphasis: 'both'
        }
      }
    ]
  }
}

class ABTestingFramework {
  private userId: string
  private assignments: Record<string, string> = {}

  constructor() {
    this.userId = this.getUserId()
    this.loadAssignments()
  }

  /**
   * Get or create a persistent user ID
   */
  private getUserId(): string {
    if (typeof window === 'undefined') return 'server-side'
    
    let userId = localStorage.getItem('ab_user_id')
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('ab_user_id', userId)
    }
    return userId
  }

  /**
   * Load existing test assignments from localStorage
   */
  private loadAssignments(): void {
    if (typeof window === 'undefined') return
    
    const saved = localStorage.getItem('ab_assignments')
    if (saved) {
      try {
        this.assignments = JSON.parse(saved)
      } catch (e) {
        console.warn('Failed to parse AB test assignments:', e)
      }
    }
  }

  /**
   * Save test assignments to localStorage
   */
  private saveAssignments(): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('ab_assignments', JSON.stringify(this.assignments))
  }

  /**
   * Check if user should be included in a test
   */
  private shouldIncludeUser(test: ABTest): boolean {
    // Check if test is active
    if (!test.isActive) return false

    // Check date range
    const now = new Date()
    if (now < test.startDate) return false
    if (test.endDate && now > test.endDate) return false

    // Check URL targeting
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      
      if (test.targetUrl && !new RegExp(test.targetUrl).test(currentPath)) {
        return false
      }
      
      if (test.excludeUrl && new RegExp(test.excludeUrl).test(currentPath)) {
        return false
      }
    }

    // Check traffic allocation
    const hash = this.hashString(this.userId + test.id)
    return (hash % 100) < test.traffic
  }

  /**
   * Simple hash function for consistent assignment
   */
  private hashString(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
  }

  /**
   * Assign user to a variant within a test
   */
  private assignVariant(test: ABTest): string {
    if (this.assignments[test.id]) {
      return this.assignments[test.id]
    }

    const hash = this.hashString(this.userId + test.id + 'variant')
    const randomValue = hash % 100
    
    let cumulativeTraffic = 0
    for (const variant of test.variants) {
      cumulativeTraffic += variant.traffic
      if (randomValue < cumulativeTraffic) {
        this.assignments[test.id] = variant.id
        this.saveAssignments()
        
        // Track assignment event
        this.trackEvent(test.id, variant.id, 'assigned')
        
        return variant.id
      }
    }

    // Fallback to first variant
    const fallback = test.variants[0]?.id || 'control'
    this.assignments[test.id] = fallback
    this.saveAssignments()
    return fallback
  }

  /**
   * Get the variant assignment for a test
   */
  getVariant(testId: string): ABVariant | null {
    const test = AB_TESTS[testId]
    if (!test || !this.shouldIncludeUser(test)) {
      return null
    }

    const variantId = this.assignVariant(test)
    return test.variants.find(v => v.id === variantId) || null
  }

  /**
   * Check if user is in a specific variant
   */
  isInVariant(testId: string, variantId: string): boolean {
    const variant = this.getVariant(testId)
    return variant?.id === variantId
  }

  /**
   * Get configuration for a test variant
   */
  getVariantConfig(testId: string): Record<string, any> {
    const variant = this.getVariant(testId)
    return variant?.config || {}
  }

  /**
   * Track conversion events
   */
  trackConversion(testId: string, event: string, value?: number, metadata?: Record<string, any>): void {
    const variant = this.getVariant(testId)
    if (!variant) return

    this.trackEvent(testId, variant.id, event, value, metadata)
  }

  /**
   * Track any AB test event
   */
  private trackEvent(
    testId: string, 
    variantId: string, 
    event: string, 
    value?: number, 
    metadata?: Record<string, any>
  ): void {
    // In a real implementation, send this to your analytics service
    const eventData = {
      testId,
      variantId,
      event,
      value,
      metadata,
      userId: this.userId,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : undefined
    }

    // Log to console for development
    console.log('AB Test Event:', eventData)

    // Store in localStorage for debugging
    if (typeof window !== 'undefined') {
      const events = JSON.parse(localStorage.getItem('ab_events') || '[]')
      events.push(eventData)
      // Keep only last 100 events
      const recentEvents = events.slice(-100)
      localStorage.setItem('ab_events', JSON.stringify(recentEvents))
    }

    // TODO: Send to analytics service
    // Example: analytics.track('ab_test_event', eventData)
  }

  /**
   * Get all active test assignments for debugging
   */
  getActiveTests(): Record<string, string> {
    const activeAssignments: Record<string, string> = {}
    
    for (const [testId, test] of Object.entries(AB_TESTS)) {
      if (this.shouldIncludeUser(test)) {
        const variant = this.getVariant(testId)
        if (variant) {
          activeAssignments[testId] = variant.id
        }
      }
    }
    
    return activeAssignments
  }

  /**
   * Force assignment to a specific variant (for testing)
   */
  forceVariant(testId: string, variantId: string): void {
    this.assignments[testId] = variantId
    this.saveAssignments()
  }

  /**
   * Reset all test assignments
   */
  resetAssignments(): void {
    this.assignments = {}
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ab_assignments')
    }
  }
}

// Global instance
export const abTesting = new ABTestingFramework()

// React hook for easy component usage
import { useEffect, useState } from 'react'

export function useABTest(testId: string) {
  const [variant, setVariant] = useState<ABVariant | null>(null)
  const [config, setConfig] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const assignedVariant = abTesting.getVariant(testId)
    setVariant(assignedVariant)
    setConfig(assignedVariant?.config || {})
    setIsLoading(false)
  }, [testId])

  const trackConversion = (event: string, value?: number, metadata?: Record<string, any>) => {
    abTesting.trackConversion(testId, event, value, metadata)
  }

  return {
    variant,
    config,
    isLoading,
    isInVariant: (variantId: string) => variant?.id === variantId,
    trackConversion
  }
}

// Utility function to track conversions from anywhere
export function trackABConversion(
  testId: string, 
  event: string, 
  value?: number, 
  metadata?: Record<string, any>
): void {
  abTesting.trackConversion(testId, event, value, metadata)
}

// Common conversion events
export const AB_EVENTS = {
  PAGE_VIEW: 'page_view',
  CTA_CLICK: 'cta_click',
  FORM_START: 'form_start',
  FORM_COMPLETE: 'form_complete',
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',
  BOOKING_STARTED: 'booking_started',
  BOOKING_COMPLETED: 'booking_completed',
  NEWSLETTER_SIGNUP: 'newsletter_signup'
} as const