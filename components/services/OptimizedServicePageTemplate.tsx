/**
 * Optimized Service Page Template Component
 * Performance-optimized version with lazy loading, code splitting, and improved Core Web Vitals
 */

'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, Clock, CheckCircle } from 'lucide-react'

// Lazy load heavy components
const TransportationNeeds = lazy(() => import('./sections/TransportationNeeds'))
const LocalLandmarks = lazy(() => import('./sections/LocalLandmarks'))

// Skeleton loaders for better perceived performance
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
)

interface OptimizedServicePageTemplateProps {
  city: string
  service: string
  description: string
  features: string[]
  localInfo: string
  population: number
  nearbyAirports?: Array<{
    name: string
    code: string
    distance: string
  }>
  landmarks?: Array<{
    name: string
    type: string
    description: string
  }>
  transportationNeeds?: string[]
}

export default function OptimizedServicePageTemplate({
  city,
  service,
  description,
  features,
  localInfo,
  population,
  nearbyAirports = [],
  landmarks = [],
  transportationNeeds = [],
}: OptimizedServicePageTemplateProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showLandmarks, setShowLandmarks] = useState(false)

  // Progressive enhancement - show content as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const halfwayPoint = document.documentElement.scrollHeight / 2

      if (scrollPosition > halfwayPoint && !showLandmarks) {
        setShowLandmarks(true)
      }
    }

    // Check initial position
    handleScroll()

    // Throttled scroll handler
    let ticking = false
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [showLandmarks])

  useEffect(() => {
    // Fade in animation after component mounts
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section - Critical Content */}
      <section
        className={`bg-gradient-to-b from-blue-600 to-blue-800 text-white py-20 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {service} in {city}, NJ
            </h1>
            <p className="text-xl mb-8 text-blue-100">{description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:833-874-1019"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2"
                aria-label={`Call Next Trip Anywhere at 833-874-1019 for ${service} in ${city}`}
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Call 833-874-1019
              </a>
              <Link
                href="/contact"
                className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition"
                prefetch={false}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Above the fold critical content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our {service}?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle
                    className="w-6 h-6 text-green-500 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local Information - Optimized with smaller initial payload */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Serving {city} Residents</h2>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <p className="text-lg text-gray-700 mb-6">{localInfo}</p>

              {nearbyAirports.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Nearby Airports</h3>
                  <ul className="space-y-2">
                    {nearbyAirports.map((airport, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-blue-500" aria-hidden="true" />
                        {airport.name} ({airport.code}) - {airport.distance}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Lazy load landmarks section */}
              {landmarks.length > 0 && showLandmarks && (
                <Suspense fallback={<SkeletonLoader />}>
                  <LocalLandmarks location={city} landmarks={landmarks} />
                </Suspense>
              )}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-center text-gray-700">
                  Proudly serving{' '}
                  <span className="font-semibold">{population.toLocaleString()}</span> residents in{' '}
                  {city} with professional {service.toLowerCase()} services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Book Your {service}?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Our experienced team is ready to assist you with all your {service.toLowerCase()}{' '}
              needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:833-874-1019"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2"
                aria-label={`Call Now for ${service} in ${city}`}
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Call Now: 833-874-1019
              </a>
              <div className="flex items-center gap-2 text-blue-100">
                <Clock className="w-5 h-5" aria-hidden="true" />
                <span>Available 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation Needs Section - Lazy loaded */}
      {transportationNeeds.length > 0 && (
        <Suspense fallback={<SkeletonLoader />}>
          <TransportationNeeds
            location={city}
            services={transportationNeeds.map((need) => ({
              title: need,
              description: `Professional ${need.toLowerCase()} services in ${city}`,
            }))}
          />
        </Suspense>
      )}
    </main>
  )
}
