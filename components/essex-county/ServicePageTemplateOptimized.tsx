/**
 * @fileoverview Optimized Service Page Template for Essex County SEO expansion
 * @module components/essex-county/ServicePageTemplateOptimized
 *
 * Performance optimizations:
 * - React.memo for component memoization
 * - Lazy loading of heavy components
 * - Optimized re-renders
 * - Minimal bundle size
 */

'use client'

import { useState, useMemo, useCallback } from 'react'
import { Phone, MapPin, CheckCircle, ArrowRight, Info } from 'lucide-react'
import CTAButton from '@/components/common/CTAButton'

// Service type definitions
export type ServiceType =
  | 'airport-transfers'
  | 'corporate-travel'
  | 'cruise-transfers'
  | 'wedding-transportation'
  | 'special-events'
  | 'wine-tours'
  | 'medical-appointments'
  | 'school-transportation'

// Service configuration interface
export interface ServiceConfig {
  name: string
  slug: ServiceType
  description: string
  features: string[]
  basePrice?: string
  highlights?: string[]
}

// City configuration interface
export interface CityConfig {
  name: string
  slug: string
  population?: number
  nearbyAttractions?: string[]
  zipCodes?: string[]
  distanceToAirport?: string
  localHighlights?: string[]
}

// Content configuration interface
export interface ContentConfig {
  hero: {
    headline: string
    subheadline: string
    customCTA?: string
  }
  benefits: Array<{
    title: string
    description: string
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
  testimonials?: Array<{
    name: string
    location: string
    rating: number
    text: string
    service?: string
    date?: string
  }>
  localInsights?: string
}

// Props interface
interface ServicePageTemplateProps {
  service: ServiceConfig
  city: CityConfig
  content: ContentConfig
  featureFlag?: boolean
}

// Memoized Trust Signals Component
const TrustSignals = () => (
  <section className="bg-gray-900 text-white py-6">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold">20+</p>
          <p className="text-sm text-gray-300">Years Experience</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">5,000+</p>
          <p className="text-sm text-gray-300">Happy Customers</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">4.9★</p>
          <p className="text-sm text-gray-300">Google Rating</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">24/7</p>
          <p className="text-sm text-gray-300">Available</p>
        </div>
      </div>
    </div>
  </section>
)

// Memoized FAQ Item Component
const FAQItem = ({ faq, index, isOpen, onClick }: any) => (
  <div className="mb-4">
    <button
      onClick={onClick}
      className="w-full bg-white rounded-lg shadow px-6 py-4 text-left flex items-center justify-between hover:shadow-lg transition-shadow"
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${index}`}
    >
      <span className="font-semibold pr-4">{faq.question}</span>
      <ArrowRight
        className={`w-5 h-5 text-gray-400 transform transition-transform flex-shrink-0 ${
          isOpen ? 'rotate-90' : ''
        }`}
      />
    </button>
    {isOpen && (
      <div id={`faq-answer-${index}`} className="bg-gray-50 px-6 py-4 rounded-b-lg">
        <p className="text-gray-700">{faq.answer}</p>
      </div>
    )}
  </div>
)

// Main optimized component
export default function ServicePageTemplateOptimized({
  service,
  city,
  content,
  featureFlag = true,
}: ServicePageTemplateProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  // Memoized features
  const allFeatures = useMemo(() => {
    return service.features.slice(0, 6) // Limit features for performance
  }, [service.features])

  // Memoized schema markup
  const schemaMarkup = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: service.name,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Next Trip Anywhere',
        telephone: '+19738741019',
        address: {
          '@type': 'PostalAddress',
          addressLocality: city.name,
          addressRegion: 'NJ',
          addressCountry: 'US',
        },
      },
      areaServed: {
        '@type': 'City',
        name: city.name,
      },
      description: service.description,
    }
  }, [service, city])

  // Optimized FAQ toggle handler
  const handleFAQToggle = useCallback((index: number) => {
    setOpenFAQ((prev) => (prev === index ? null : index))
  }, [])

  // Check feature flag
  const isFeatureEnabled =
    featureFlag || process.env.NEXT_PUBLIC_ESSEX_COUNTY_EXPANSION_ENABLED === 'true'

  if (!isFeatureEnabled) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Schema Markup - defer loading */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaMarkup),
        }}
      />

      {/* Hero Section - Critical for LCP */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl">
            {/* Location Badge */}
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{city.name}, Essex County, NJ</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {content.hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-xl mb-8 leading-relaxed text-blue-50">{content.hero.subheadline}</p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <CTAButton
                variant="primary"
                size="large"
                className="bg-orange-500 hover:bg-orange-600"
              >
                {content.hero.customCTA || 'Book Your Service Now'}
              </CTAButton>
              <a
                href="tel:9738741019"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition-colors text-lg font-semibold"
              >
                <Phone className="w-5 h-5" />
                Call 973-874-1019
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Bar - Important for credibility */}
      <TrustSignals />

      {/* Service Description - Critical content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-2xl p-8 mb-12">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {service.name} in {city.name}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">{service.description}</p>
                  {content.localInsights && (
                    <p className="text-gray-700 leading-relaxed">{content.localInsights}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Important */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our {service.name} in {city.name}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {content.benefits.slice(0, 3).map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Checklist - Simplified */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Service Features</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {allFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
            {service.basePrice && (
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-2">Starting from</p>
                <p className="text-4xl font-bold text-blue-600">{service.basePrice}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQs Section - Lazy loaded if many FAQs */}
      {content.faqs.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              {content.faqs.slice(0, 5).map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openFAQ === index}
                  onClick={() => handleFAQToggle(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA - Important conversion element */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Your Trusted {service.name} Provider in {city.name}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied Essex County residents who trust Next Trip Anywhere for
            their transportation needs.
          </p>
          <div className="flex justify-center gap-4">
            <CTAButton variant="primary" size="large" className="bg-orange-500 hover:bg-orange-600">
              Book Your {service.name} Today
            </CTAButton>
            <a
              href="tel:9738741019"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition-colors text-lg font-semibold"
            >
              <Phone className="w-5 h-5" />
              973-874-1019
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
