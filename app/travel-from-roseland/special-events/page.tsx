/**
 * Roseland Special Events Service Page
 * Generated for Essex County SEO - Phase 1
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('roseland')!
const service = getServiceBySlug('special-events')!
const cityData = getCityById('roseland')

export const metadata: Metadata = {
  title: `Special Events in Roseland, NJ | Next Trip Anywhere`,
  description: `Reliable special events for Roseland and surrounding areas. Transportation for concerts, sporting events, proms, and special occasions throughout the tri-state area. Available 24/7 at 833-874-1019.`,
  keywords: [
    `special-events Roseland`,
    `Roseland special events`,
    ...['special events', 'concert transportation', 'sports events', 'prom limo', 'event shuttle'],
    `Roseland NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-roseland/special-events`,
  },
  openGraph: {
    title: `Special Events in Roseland | Next Trip Anywhere`,
    description: `Professional special events for Roseland residents. Transportation for concerts, sporting events, proms, and special occasions throughout the tri-state area.`,
    url: `https://nexttripanywhere.com/travel-from-roseland/special-events`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function RoselandSpecialEventsPage() {
  const serviceData = {
    city: city.name,
    service: service.name,
    description: service.description,
    features: [
      'VIP treatment for your special day',
      'Flexible scheduling options',
      'Group coordination services',
      'Safe return transportation',
    ],
    localInfo: 'Serving Roseland with premium special events solutions since 2010.',
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
            <h2 className="text-2xl font-bold mb-6">Special Events for Roseland Residents</h2>
            <div className="prose max-w-none">
              <p>
                Serving Roseland with premium special events solutions since 2010. With a population
                of 6,290, Roseland residents trust Next Trip Anywhere for reliable special events
                services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Why Choose Our Special Events Service?
              </h3>
              <ul className="space-y-2">
                <li>• VIP treatment for your special day</li>
                <li>• Flexible scheduling options</li>
                <li>• Group coordination services</li>
                <li>• Safe return transportation</li>
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Areas in Roseland</h3>
                <p>
                  We proudly serve all neighborhoods in Roseland, including residential areas,
                  business districts, and surrounding communities. Our special events service is
                  available 24/7 for your convenience.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Book Your Special Events Today</h3>
                <p>
                  Ready to experience premium special events service? Contact Next Trip Anywhere at{' '}
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
