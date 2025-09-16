/**
 * Bloomfield Wine Tours & Day Trips Service Page
 * Generated for Essex County SEO - Phase 1
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('bloomfield')!
const service = getServiceBySlug('wine-tours-day-trips')!
const cityData = getCityById('bloomfield')

export const metadata: Metadata = {
  title: `Wine Tours & Day Trips in Bloomfield, NJ | Next Trip Anywhere`,
  description: `Reliable wine tours & day trips for Bloomfield and surrounding areas. Guided wine tours to NJ wineries, NYC day trips, and Atlantic City excursions with comfortable transportation. Available 24/7 at 833-874-1019.`,
  keywords: [
    `wine-tours-day-trips Bloomfield`,
    `Bloomfield wine tours & day trips`,
    ...['wine tours', 'day trips', 'winery tours', 'NYC tours', 'Atlantic City trips'],
    `Bloomfield NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-bloomfield/wine-tours-day-trips`,
  },
  openGraph: {
    title: `Wine Tours & Day Trips in Bloomfield | Next Trip Anywhere`,
    description: `Professional wine tours & day trips for Bloomfield residents. Guided wine tours to NJ wineries, NYC day trips, and Atlantic City excursions with comfortable transportation.`,
    url: `https://nexttripanywhere.com/travel-from-bloomfield/wine-tours-day-trips`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function BloomfieldWineToursDayTripsPage() {
  const serviceData = {
    city: city.name,
    service: service.name,
    description: service.description,
    features: [
      'Knowledgeable tour guides',
      'Curated winery selection',
      'Lunch arrangements included',
      'Safe designated driver',
    ],
    localInfo:
      'Professional wine tours & day trips services tailored for Bloomfield residents and businesses.',
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
              Wine Tours & Day Trips for Bloomfield Residents
            </h2>
            <div className="prose max-w-none">
              <p>
                Professional wine tours & day trips services tailored for Bloomfield residents and
                businesses. With a population of 53,105, Bloomfield residents trust Next Trip
                Anywhere for reliable wine tours & day trips services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Why Choose Our Wine Tours & Day Trips Service?
              </h3>
              <ul className="space-y-2">
                <li>• Knowledgeable tour guides</li>
                <li>• Curated winery selection</li>
                <li>• Lunch arrangements included</li>
                <li>• Safe designated driver</li>
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Areas in Bloomfield</h3>
                <p>
                  We proudly serve all neighborhoods in Bloomfield, including residential areas,
                  business districts, and surrounding communities. Our wine tours & day trips
                  service is available 24/7 for your convenience.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                  Book Your Wine Tours & Day Trips Today
                </h3>
                <p>
                  Ready to experience premium wine tours & day trips service? Contact Next Trip
                  Anywhere at{' '}
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
