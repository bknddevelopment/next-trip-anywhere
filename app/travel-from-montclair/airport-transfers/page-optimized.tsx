/**
 * Montclair Airport Transfers Service Page - Performance Optimized
 * Generated for Essex County SEO - Phase 4 (Optimized Version)
 */

import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

// Dynamic import with loading state for better performance
const OptimizedServicePageTemplate = dynamic(
  () => import('@/components/services/OptimizedServicePageTemplate'),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    ),
  }
)

const city = getCityBySlug('montclair')!
const service = getServiceBySlug('airport-transfers')!
const cityData = getCityById('montclair')

export const metadata: Metadata = {
  title: `Airport Transfers in Montclair, NJ | Next Trip Anywhere`,
  description: `Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports. Serving Montclair and surrounding Essex County areas. Call 833-874-1019 for immediate assistance.`,
  keywords: [
    `airport-transfers Montclair`,
    `Montclair airport transfers`,
    ...[
      'airport transfers',
      'Newark airport',
      'EWR transportation',
      'airport shuttle',
      'airport limo',
    ],
    `Montclair NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-montclair/airport-transfers`,
  },
  openGraph: {
    title: `Airport Transfers in Montclair | Next Trip Anywhere`,
    description: `Professional airport transfers for Montclair residents. Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports.`,
    url: `https://nexttripanywhere.com/travel-from-montclair/airport-transfers`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function MontclairAirportTransfersPage() {
  const serviceData = {
    city: city.name,
    service: service.name,
    description: service.description,
    features: [
      'On-time pickup guarantee',
      'Flight tracking for accurate timing',
      'Meet & greet service available',
      'Luggage assistance included',
    ],
    localInfo:
      'Convenient airport transfers from Montclair to Newark Airport (EWR), JFK, LGA, and Philadelphia.',
    population: city.population,
    nearbyAirports: cityData?.nearbyAirports || [],
    landmarks: cityData?.landmarks || [],
    transportationNeeds: cityData?.transportationNeeds || [],
  }

  return (
    <>
      {/* Critical inline CSS for immediate render */}
      <style jsx global>{`
        .hero-section {
          background: linear-gradient(180deg, #2563eb 0%, #1e40af 100%);
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <OptimizedServicePageTemplate {...serviceData} />

      {/* Local SEO Content - Simplified and optimized */}
      <section className="py-12 bg-gray-50" aria-labelledby="local-seo-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 id="local-seo-heading" className="text-2xl font-bold mb-6">
              Airport Transfers for Montclair Residents
            </h2>
            <div className="prose max-w-none">
              <p className="mb-6">
                Convenient airport transfers from Montclair to Newark Airport (EWR), JFK, LGA, and
                Philadelphia. With a population of 40,921, Montclair residents trust Next Trip
                Anywhere for reliable airport transfers services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Why Choose Our Airport Transfers Service?
              </h3>
              <ul className="space-y-2 list-none pl-0">
                {[
                  'On-time pickup guarantee',
                  'Flight tracking for accurate timing',
                  'Meet & greet service available',
                  'Luggage assistance included',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Areas in Montclair</h3>
                <p>
                  We proudly serve all neighborhoods in Montclair, including residential areas,
                  business districts, and surrounding communities. Our airport transfers service is
                  available 24/7 for your convenience.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Book Your Airport Transfers Today</h3>
                <p>
                  Ready to experience premium airport transfers service? Contact Next Trip Anywhere
                  at{' '}
                  <a href="tel:833-874-1019" className="text-blue-600 font-semibold">
                    833-874-1019
                  </a>{' '}
                  or visit our office to discuss your needs with our experienced team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
