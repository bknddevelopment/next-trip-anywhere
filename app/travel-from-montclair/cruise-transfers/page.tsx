/**
 * Montclair Cruise Transfers Service Page
 * Generated for Essex County SEO - Phase 4
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('montclair')!
const service = getServiceBySlug('cruise-transfers')!
const cityData = getCityById('montclair')

export const metadata: Metadata = {
  title: `Cruise Transfers in Montclair, NJ | Next Trip Anywhere`,
  description: `Direct transfers to Manhattan, Brooklyn, and Cape Liberty cruise terminals with luggage assistance. Serving Montclair and surrounding Essex County areas. Call 833-874-1019 for immediate assistance.`,
  keywords: [
    `cruise-transfers Montclair`,
    `Montclair cruise transfers`,
    ...[
      'cruise transfers',
      'port transportation',
      'cruise terminal',
      'Manhattan cruise port',
      'Cape Liberty',
    ],
    `Montclair NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-montclair/cruise-transfers`,
  },
  openGraph: {
    title: `Cruise Transfers in Montclair | Next Trip Anywhere`,
    description: `Professional cruise transfers for Montclair residents. Direct transfers to Manhattan, Brooklyn, and Cape Liberty cruise terminals with luggage assistance.`,
    url: `https://nexttripanywhere.com/travel-from-montclair/cruise-transfers`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function MontclairCruiseTransfersPage() {
  const serviceData = {
    city: city.name,
    service: service.name,
    description: service.description,
    features: [
      'Direct transfers to cruise ports',
      'Luggage handling service',
      'Group coordination available',
      'Return trip scheduling',
    ],
    localInfo:
      'Reliable cruise port transfers from Montclair to Manhattan, Brooklyn, and Cape Liberty terminals.',
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
            <h2 className="text-2xl font-bold mb-6">Cruise Transfers for Montclair Residents</h2>
            <div className="prose max-w-none">
              <p>
                Reliable cruise port transfers from Montclair to Manhattan, Brooklyn, and Cape
                Liberty terminals. With a population of 40,921, Montclair residents trust Next Trip
                Anywhere for reliable cruise transfers services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Why Choose Our Cruise Transfers Service?
              </h3>
              <ul className="space-y-2">
                <li>• Direct transfers to cruise ports</li>
                <li>• Luggage handling service</li>
                <li>• Group coordination available</li>
                <li>• Return trip scheduling</li>
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Areas in Montclair</h3>
                <p>
                  We proudly serve all neighborhoods in Montclair, including residential areas,
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
