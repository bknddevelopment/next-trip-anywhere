/**
 * Glen Ridge Wedding Transportation Service Page
 * Generated for Essex County SEO - Phase 1
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('glen-ridge')!
const service = getServiceBySlug('wedding-transportation')!
const cityData = getCityById('glen-ridge')

export const metadata: Metadata = {
  title: `Wedding Transportation in Glen Ridge, NJ | Next Trip Anywhere`,
  description: `Wedding Transportation in Glen Ridge, NJ - Next Trip Anywhere provides elegant wedding transportation including limousines, party buses, and guest shuttle services. Serving Essex County with excellence.`,
  keywords: [
    `wedding-transportation Glen Ridge`,
    `Glen Ridge wedding transportation`,
    ...['wedding transportation', 'wedding limo', 'bridal party', 'guest shuttle', 'wedding cars'],
    `Glen Ridge NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-glen-ridge/wedding-transportation`,
  },
  openGraph: {
    title: `Wedding Transportation in Glen Ridge | Next Trip Anywhere`,
    description: `Professional wedding transportation for Glen Ridge residents. Elegant wedding transportation including limousines, party buses, and guest shuttle services.`,
    url: `https://nexttripanywhere.com/travel-from-glen-ridge/wedding-transportation`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function GlenRidgeWeddingTransportationPage() {
  const serviceData = {
    city: city.name,
    service: service.name,
    description: service.description,
    features: [
      'Luxury vehicle selection',
      'Red carpet service',
      'Complimentary champagne',
      'Decorated vehicles available',
    ],
    localInfo: 'Your trusted wedding transportation provider in Glen Ridge and Essex County.',
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
              Wedding Transportation for Glen Ridge Residents
            </h2>
            <div className="prose max-w-none">
              <p>
                Your trusted wedding transportation provider in Glen Ridge and Essex County. With a
                population of 7,852, Glen Ridge residents trust Next Trip Anywhere for reliable
                wedding transportation services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Why Choose Our Wedding Transportation Service?
              </h3>
              <ul className="space-y-2">
                <li>• Luxury vehicle selection</li>
                <li>• Red carpet service</li>
                <li>• Complimentary champagne</li>
                <li>• Decorated vehicles available</li>
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Areas in Glen Ridge</h3>
                <p>
                  We proudly serve all neighborhoods in Glen Ridge, including residential areas,
                  business districts, and surrounding communities. Our wedding transportation
                  service is available 24/7 for your convenience.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                  Book Your Wedding Transportation Today
                </h3>
                <p>
                  Ready to experience premium wedding transportation service? Contact Next Trip
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
