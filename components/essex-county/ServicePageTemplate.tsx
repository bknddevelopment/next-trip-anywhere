/**
 * @fileoverview Enhanced Service Page Template for Essex County SEO expansion
 * @module components/essex-county/ServicePageTemplate
 *
 * This component renders service-specific landing pages for Essex County cities,
 * optimized for local SEO with dynamic content, schema markup, and conversions.
 */

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  Star,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Shield,
  Info,
  Plane,
  Ship,
  PartyPopper,
  Heart,
  GraduationCap,
  Wine,
  Building,
  Briefcase,
} from 'lucide-react'
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
  icon?: React.ComponentType<{ className?: string }>
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
    icon?: React.ComponentType<{ className?: string }>
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

// Service icon mapping
const serviceIconMap: Record<ServiceType, React.ComponentType<{ className?: string }>> = {
  'airport-transfers': Plane,
  'corporate-travel': Briefcase,
  'cruise-transfers': Ship,
  'wedding-transportation': Heart,
  'special-events': PartyPopper,
  'wine-tours': Wine,
  'medical-appointments': Building,
  'school-transportation': GraduationCap,
}

// Default service features by type
const defaultServiceFeatures: Record<ServiceType, string[]> = {
  'airport-transfers': [
    'Door-to-door service',
    'Flight tracking',
    '24/7 availability',
    'Meet & greet service',
    'Luggage assistance',
    'Child seats available',
  ],
  'corporate-travel': [
    'Executive vehicles',
    'Professional chauffeurs',
    'Flexible scheduling',
    'Corporate accounts',
    'Receipt management',
    'WiFi enabled vehicles',
  ],
  'cruise-transfers': [
    'Port pickup & drop-off',
    'Luggage handling',
    'Group coordination',
    'Pre-cruise tours',
    'Return trip scheduling',
    'Terminal assistance',
  ],
  'wedding-transportation': [
    'Luxury vehicle options',
    'Wedding party coordination',
    'Photo opportunities',
    'Decorated vehicles',
    'Multiple pickup points',
    'Timeline management',
  ],
  'special-events': [
    'Concert & show transportation',
    'Sports event shuttles',
    'Birthday celebrations',
    'Anniversary trips',
    'Prom & graduation',
    'Holiday light tours',
  ],
  'wine-tours': [
    'Winery selection expertise',
    'Designated driver',
    'Customized itineraries',
    'Group packages',
    'Picnic arrangements',
    'Local vineyard knowledge',
  ],
  'medical-appointments': [
    'Wheelchair accessible',
    'Companion seating',
    'Recurring appointments',
    'Hospital navigation',
    'Prescription pickups',
    'Insurance documentation',
  ],
  'school-transportation': [
    'Safety certified drivers',
    'Background checks',
    'Real-time tracking',
    'After-school programs',
    'Field trip services',
    'Special needs equipped',
  ],
}

export default function ServicePageTemplate({
  service,
  city,
  content,
  featureFlag = true,
}: ServicePageTemplateProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  // Merge default features with custom features
  const allFeatures = useMemo(() => {
    const defaults = defaultServiceFeatures[service.slug] || []
    return [...new Set([...defaults, ...service.features])]
  }, [service])

  // Generate schema markup
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
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: 'Essex County',
        },
      },
      description: service.description,
      offers: service.basePrice
        ? {
            '@type': 'Offer',
            price: service.basePrice,
            priceCurrency: 'USD',
          }
        : undefined,
    }
  }, [service, city])

  // Generate FAQ schema
  const faqSchema = useMemo(() => {
    if (!content.faqs || content.faqs.length === 0) {
      return null
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }
  }, [content.faqs])

  // Check feature flag
  const isFeatureEnabled =
    featureFlag || process.env.NEXT_PUBLIC_ESSEX_COUNTY_EXPANSION_ENABLED === 'true'

  if (!isFeatureEnabled) {
    return null
  }

  // Get service icon
  const ServiceIcon = service.icon || serviceIconMap[service.slug] || Plane

  return (
    <div className="min-h-screen bg-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([schemaMarkup, faqSchema].filter(Boolean)),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl">
            {/* Location Badge */}
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{city.name}, Essex County, NJ</span>
            </div>

            {/* Service Type Badge */}
            <div className="flex items-center gap-3 mb-6">
              <ServiceIcon className="w-8 h-8" />
              <span className="text-lg font-medium uppercase tracking-wide">{service.name}</span>
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

      {/* Trust Signals Bar */}
      <section className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">20+</p>
              <p className="text-sm text-gray-300">Years in {city.name}</p>
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

      {/* Service Description with Local Context */}
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
                  {city.distanceToAirport && service.slug === 'airport-transfers' && (
                    <p className="text-blue-600 font-medium mt-4">
                      📍 Just {city.distanceToAirport} from Newark Liberty International Airport
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Local Area Information */}
            {city.nearbyAttractions && city.nearbyAttractions.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Serving {city.name} & Nearby Areas</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {city.nearbyAttractions.map((attraction, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our {service.name} in {city.name}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {content.benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon || Award
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <BenefitIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Checklist */}
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
                <p className="text-sm text-gray-500 mt-2">
                  *Prices may vary based on specific requirements
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {content.testimonials && content.testimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What {city.name} Residents Say</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {content.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="border-t pt-3">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                    {testimonial.service && (
                      <p className="text-sm text-blue-600 mt-1">{testimonial.service}</p>
                    )}
                    {testimonial.date && (
                      <p className="text-sm text-gray-500 mt-1">{testimonial.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions about {service.name}
          </h2>
          <div className="max-w-3xl mx-auto">
            {content.faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full bg-white rounded-lg shadow px-6 py-4 text-left flex items-center justify-between hover:shadow-lg transition-shadow"
                  aria-expanded={openFAQ === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold pr-4">{faq.question}</span>
                  <ArrowRight
                    className={`w-5 h-5 text-gray-400 transform transition-transform flex-shrink-0 ${
                      openFAQ === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div id={`faq-answer-${index}`} className="bg-gray-50 px-6 py-4 rounded-b-lg">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Area Highlights */}
      {city.localHighlights && city.localHighlights.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Serving {city.name}'s Community
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  {city.localHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{highlight}</p>
                    </div>
                  ))}
                </div>
                {city.population && (
                  <div className="mt-6 pt-6 border-t text-center">
                    <p className="text-gray-600">
                      Proudly serving {city.name}'s {city.population.toLocaleString()} residents
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Service-Specific CTAs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Book Your {service.name}?</h2>
              <p className="text-xl mb-8 text-blue-50">
                Experience the best {service.name.toLowerCase()} service in {city.name}. Our local
                team is ready to assist you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <CTAButton
                  variant="primary"
                  size="large"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Get Free Quote
                </CTAButton>
                <a
                  href="tel:9738741019"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors text-lg font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  Call Now: 973-874-1019
                </a>
              </div>
              <p className="text-sm text-blue-100 mt-6">
                Available 24/7 • Free Consultation • No Hidden Fees
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Other Services in {city.name}</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {Object.entries(serviceIconMap)
              .filter(([slug]) => slug !== service.slug)
              .slice(0, 6)
              .map(([slug, Icon]) => (
                <Link
                  key={slug}
                  href={`/locations/essex-county/${city.slug}/${slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-5 h-5 text-blue-600" />
                  <span className="capitalize">{slug.replace('-', ' ')}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
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
          <div className="mt-8 flex justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Essex County's Choice</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Family Owned</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
