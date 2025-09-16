/**
 * Nutley Airport Transfers Service Page
 * Generated for Essex County SEO - Phase 1
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('nutley')!
const service = getServiceBySlug('airport-transfers')!
const cityData = getCityById('nutley')

export const metadata: Metadata = {
  title: `Airport Transfers in Nutley, NJ | Next Trip Anywhere`,
  description: `Reliable airport transfers for Nutley and surrounding areas. Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports. Available 24/7 at 833-874-1019.`,
  keywords: [
    `airport-transfers Nutley`,
    `Nutley airport transfers`,
    ...[
      'airport transfers',
      'Newark airport',
      'EWR transportation',
      'airport shuttle',
      'airport limo',
    ],
    `Nutley NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-nutley/airport-transfers`,
  },
  openGraph: {
    title: `Airport Transfers in Nutley | Next Trip Anywhere`,
    description: `Professional airport transfers for Nutley residents. Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports.`,
    url: `https://nexttripanywhere.com/travel-from-nutley/airport-transfers`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function NutleyAirportTransfersPage() {
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
    localInfo: 'Serving Nutley with premium airport transfers solutions since 2010.',
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
            <h2 className="text-2xl font-bold mb-6">Airport Transfers for Nutley Residents</h2>
            <div className="prose max-w-none">
              <p>
                Serving Nutley with premium airport transfers solutions since 2010. With a
                population of 30,143, Nutley residents trust Next Trip Anywhere for reliable airport
                transfers services.
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
                <h3 className="text-xl font-semibold mb-4">Service Areas in Nutley</h3>
                <p>
                  We proudly serve all neighborhoods in Nutley, including residential areas,
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
