/**
 * Verona Cruise Transfers Service Page
 * Generated for Essex County SEO - Phase 1
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('verona')!
const service = getServiceBySlug('cruise-transfers')!
const cityData = getCityById('verona')

export const metadata: Metadata = {
  title: `Cruise Transfers in Verona, NJ | Next Trip Anywhere`,
  description: `Cruise Transfers in Verona, NJ - Next Trip Anywhere provides direct transfers to manhattan, brooklyn, and cape liberty cruise terminals with luggage assistance. Serving Essex County with excellence.`,
  keywords: [
    `cruise-transfers Verona`,
    `Verona cruise transfers`,
    ...[
      'cruise transfers',
      'port transportation',
      'cruise terminal',
      'Manhattan cruise port',
      'Cape Liberty',
    ],
    `Verona NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-verona/cruise-transfers`,
  },
  openGraph: {
    title: `Cruise Transfers in Verona | Next Trip Anywhere`,
    description: `Professional cruise transfers for Verona residents. Direct transfers to Manhattan, Brooklyn, and Cape Liberty cruise terminals with luggage assistance.`,
    url: `https://nexttripanywhere.com/travel-from-verona/cruise-transfers`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function VeronaCruiseTransfersPage() {
  const serviceData = {
    city: city.name,
    service: service.name,
    description: service.description,
    features: [
      'Direct service to all major cruise ports',
      'Luggage handling included',
      'Guaranteed on-time arrival',
      'Group coordination for families',
    ],
    localInfo: 'Your trusted cruise transfers provider in Verona and Essex County.',
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
            <h2 className="text-2xl font-bold mb-6">Cruise Transfers for Verona Residents</h2>
            <div className="prose max-w-none">
              <p>
                Your trusted cruise transfers provider in Verona and Essex County. With a population
                of 14,572, Verona residents trust Next Trip Anywhere for reliable cruise transfers
                services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Why Choose Our Cruise Transfers Service?
              </h3>
              <ul className="space-y-2">
                <li>• Direct service to all major cruise ports</li>
                <li>• Luggage handling included</li>
                <li>• Guaranteed on-time arrival</li>
                <li>• Group coordination for families</li>
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Areas in Verona</h3>
                <p>
                  We proudly serve all neighborhoods in Verona, including residential areas,
                  business districts, and surrounding communities. Our cruise transfers service is
                  available 24/7 for your convenience.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Book Your Cruise Transfers Today</h3>
                <p>
                  Ready to experience premium cruise transfers service? Contact Next Trip Anywhere
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
