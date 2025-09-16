/**
 * Newark Airport Transfers Service Page
 * Generated for Essex County SEO - Phase 4
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('newark')!
const service = getServiceBySlug('airport-transfers')!
const cityData = getCityById('newark')

export const metadata: Metadata = {
  title: `Airport Transfers in Newark, NJ | Next Trip Anywhere`,
  description: `Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports. Serving Newark and surrounding Essex County areas. Call 833-874-1019 for immediate assistance.`,
  keywords: [
    `airport-transfers Newark`,
    `Newark airport transfers`,
    ...[
      'airport transfers',
      'Newark airport',
      'EWR transportation',
      'airport shuttle',
      'airport limo',
    ],
    `Newark NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-newark/airport-transfers`,
  },
  openGraph: {
    title: `Airport Transfers in Newark | Next Trip Anywhere`,
    description: `Professional airport transfers for Newark residents. Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports.`,
    url: `https://nexttripanywhere.com/travel-from-newark/airport-transfers`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function NewarkAirportTransfersPage() {
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
      'Convenient airport transfers from Newark to Newark Airport (EWR), JFK, LGA, and Philadelphia.',
    population: city.population,
    nearbyAirports: cityData?.nearbyAirports || [],
    landmarks: cityData?.landmarks || [],
    transportationNeeds: cityData?.transportationNeeds || [],
  }

  return (
    <>
      <ServicePageTemplate {...serviceData} />

      {/* Local SEO Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Airport Transfers for Newark Residents</h2>
            <div className="prose max-w-none">
              <p>
                Convenient airport transfers from Newark to Newark Airport (EWR), JFK, LGA, and
                Philadelphia. With a population of 311,549, Newark residents trust Next Trip
                Anywhere for reliable airport transfers services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Why Choose Our Airport Transfers Service?
              </h3>
              <ul className="space-y-2">
                <li>• On-time pickup guarantee</li>
                <li>• Flight tracking for accurate timing</li>
                <li>• Meet & greet service available</li>
                <li>• Luggage assistance included</li>
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Areas in Newark</h3>
                <p>
                  We proudly serve all neighborhoods in Newark, including residential areas,
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
