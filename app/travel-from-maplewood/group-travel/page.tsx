/**
 * Maplewood Group Travel Service Page
 * Generated for Essex County SEO - Phase 1
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('maplewood')!
const service = getServiceBySlug('group-travel')!
const cityData = getCityById('maplewood')

export const metadata: Metadata = {
  title: `Group Travel in Maplewood, NJ | Next Trip Anywhere`,
  description: `Group Travel in Maplewood, NJ - Next Trip Anywhere provides professional group travel coordination for schools, churches, sports teams, and organizations. Serving Essex County with excellence.`,
  keywords: [
    `group-travel Maplewood`,
    `Maplewood group travel`,
    ...['group travel', 'organization trips', 'school travel', 'church groups', 'sports teams'],
    `Maplewood NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-maplewood/group-travel`,
  },
  openGraph: {
    title: `Group Travel in Maplewood | Next Trip Anywhere`,
    description: `Professional group travel for Maplewood residents. Professional group travel coordination for schools, churches, sports teams, and organizations.`,
    url: `https://nexttripanywhere.com/travel-from-maplewood/group-travel`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function MaplewoodGroupTravelPage() {
  const serviceData = {
    city: city.name,
    service: service.name,
    description: service.description,
    features: [
      'Dedicated group coordinator',
      'Special group rates',
      'Customized itineraries',
      '24/7 support',
    ],
    localInfo: 'Serving Maplewood with premium group travel solutions since 2010.',
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
            <h2 className="text-2xl font-bold mb-6">Group Travel for Maplewood Residents</h2>
            <div className="prose max-w-none">
              <p>
                Serving Maplewood with premium group travel solutions since 2010. With a population
                of 25,684, Maplewood residents trust Next Trip Anywhere for reliable group travel
                services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Why Choose Our Group Travel Service?
              </h3>
              <ul className="space-y-2">
                <li>• Dedicated group coordinator</li>
                <li>• Special group rates</li>
                <li>• Customized itineraries</li>
                <li>• 24/7 support</li>
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Areas in Maplewood</h3>
                <p>
                  We proudly serve all neighborhoods in Maplewood, including residential areas,
                  business districts, and surrounding communities. Our group travel service is
                  available 24/7 for your convenience.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Book Your Group Travel Today</h3>
                <p>
                  Ready to experience premium group travel service? Contact Next Trip Anywhere at{' '}
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
