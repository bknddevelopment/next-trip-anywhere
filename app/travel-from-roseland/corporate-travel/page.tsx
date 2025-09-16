/**
 * Roseland Corporate Travel Service Page
 * Generated for Essex County SEO - Phase 1
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('roseland')!
const service = getServiceBySlug('corporate-travel')!
const cityData = getCityById('roseland')

export const metadata: Metadata = {
  title: `Corporate Travel in Roseland, NJ | Next Trip Anywhere`,
  description: `Reliable corporate travel for Roseland and surrounding areas. Comprehensive business travel solutions including flight booking, hotel arrangements, and expense management. Available 24/7 at 833-874-1019.`,
  keywords: [
    `corporate-travel Roseland`,
    `Roseland corporate travel`,
    ...[
      'corporate travel',
      'business travel',
      'company trips',
      'executive travel',
      'business class',
    ],
    `Roseland NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-roseland/corporate-travel`,
  },
  openGraph: {
    title: `Corporate Travel in Roseland | Next Trip Anywhere`,
    description: `Professional corporate travel for Roseland residents. Comprehensive business travel solutions including flight booking, hotel arrangements, and expense management.`,
    url: `https://nexttripanywhere.com/travel-from-roseland/corporate-travel`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function RoselandCorporateTravelPage() {
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
    localInfo:
      'Professional corporate travel services tailored for Roseland residents and businesses.',
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
            <h2 className="text-2xl font-bold mb-6">Corporate Travel for Roseland Residents</h2>
            <div className="prose max-w-none">
              <p>
                Professional corporate travel services tailored for Roseland residents and
                businesses. With a population of 6,290, Roseland residents trust Next Trip Anywhere
                for reliable corporate travel services.
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
                <h3 className="text-xl font-semibold mb-4">Service Areas in Roseland</h3>
                <p>
                  We proudly serve all neighborhoods in Roseland, including residential areas,
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
