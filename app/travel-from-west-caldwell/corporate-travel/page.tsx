/**
 * West Caldwell Corporate Travel Service Page
 * Generated for Essex County SEO - Phase 1
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('west-caldwell')!
const service = getServiceBySlug('corporate-travel')!
const cityData = getCityById('west-caldwell')

export const metadata: Metadata = {
  title: `Corporate Travel in West Caldwell, NJ | Next Trip Anywhere`,
  description: `Professional corporate travel services for West Caldwell residents. Comprehensive business travel solutions including flight booking, hotel arrangements, and expense management. Call 833-874-1019 for immediate assistance.`,
  keywords: [
    `corporate-travel West Caldwell`,
    `West Caldwell corporate travel`,
    ...[
      'corporate travel',
      'business travel',
      'company trips',
      'executive travel',
      'business class',
    ],
    `West Caldwell NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-west-caldwell/corporate-travel`,
  },
  openGraph: {
    title: `Corporate Travel in West Caldwell | Next Trip Anywhere`,
    description: `Professional corporate travel for West Caldwell residents. Comprehensive business travel solutions including flight booking, hotel arrangements, and expense management.`,
    url: `https://nexttripanywhere.com/travel-from-west-caldwell/corporate-travel`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function WestCaldwellCorporateTravelPage() {
  const serviceData = {
    city: city.name,
    service: service.name,
    description: service.description,
    features: [
      'Dedicated corporate account manager',
      'Streamlined expense reporting',
      'Negotiated corporate rates',
      'VIP lounge access',
    ],
    localInfo: 'Serving West Caldwell with premium corporate travel solutions since 2010.',
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
            <h2 className="text-2xl font-bold mb-6">
              Corporate Travel for West Caldwell Residents
            </h2>
            <div className="prose max-w-none">
              <p>
                Serving West Caldwell with premium corporate travel solutions since 2010. With a
                population of 11,223, West Caldwell residents trust Next Trip Anywhere for reliable
                corporate travel services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Why Choose Our Corporate Travel Service?
              </h3>
              <ul className="space-y-2">
                <li>• Dedicated corporate account manager</li>
                <li>• Streamlined expense reporting</li>
                <li>• Negotiated corporate rates</li>
                <li>• VIP lounge access</li>
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Areas in West Caldwell</h3>
                <p>
                  We proudly serve all neighborhoods in West Caldwell, including residential areas,
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
