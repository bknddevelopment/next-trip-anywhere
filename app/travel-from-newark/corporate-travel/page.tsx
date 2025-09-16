/**
 * Newark Corporate Travel Service Page
 * Generated for Essex County SEO - Phase 4
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('newark')!
const service = getServiceBySlug('corporate-travel')!
const cityData = getCityById('newark')

export const metadata: Metadata = {
  title: `Corporate Travel in Newark, NJ | Next Trip Anywhere`,
  description: `Comprehensive business travel solutions including flight booking, hotel arrangements, and expense management. Serving Newark and surrounding Essex County areas. Call 833-874-1019 for immediate assistance.`,
  keywords: [
    `corporate-travel Newark`,
    `Newark corporate travel`,
    ...[
      'corporate travel',
      'business travel',
      'company trips',
      'executive travel',
      'business class',
    ],
    `Newark NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-newark/corporate-travel`,
  },
  openGraph: {
    title: `Corporate Travel in Newark | Next Trip Anywhere`,
    description: `Professional corporate travel for Newark residents. Comprehensive business travel solutions including flight booking, hotel arrangements, and expense management.`,
    url: `https://nexttripanywhere.com/travel-from-newark/corporate-travel`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function NewarkCorporateTravelPage() {
  const serviceData = {
    city: city.name,
    service: service.name,
    description: service.description,
    features: [
      'Dedicated account management',
      'Expense reporting integration',
      'Negotiated corporate rates',
      'VIP lounge access',
    ],
    localInfo: 'Professional corporate travel services for Newark businesses and executives.',
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
            <h2 className="text-2xl font-bold mb-6">Corporate Travel for Newark Residents</h2>
            <div className="prose max-w-none">
              <p>
                Professional corporate travel services for Newark businesses and executives. With a
                population of 311,549, Newark residents trust Next Trip Anywhere for reliable
                corporate travel services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Why Choose Our Corporate Travel Service?
              </h3>
              <ul className="space-y-2">
                <li>• Dedicated account management</li>
                <li>• Expense reporting integration</li>
                <li>• Negotiated corporate rates</li>
                <li>• VIP lounge access</li>
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Areas in Newark</h3>
                <p>
                  We proudly serve all neighborhoods in Newark, including residential areas,
                  business districts, and surrounding communities. Our corporate travel service is
                  available 24/7 for your convenience.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Book Your Corporate Travel Today</h3>
                <p>
                  Ready to experience premium corporate travel service? Contact Next Trip Anywhere
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
