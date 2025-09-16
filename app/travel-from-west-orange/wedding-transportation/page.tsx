/**
 * West Orange Wedding Transportation Service Page
 * Generated for Essex County SEO - Phase 4
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('west-orange')!
const service = getServiceBySlug('wedding-transportation')!
const cityData = getCityById('west-orange')

export const metadata: Metadata = {
  title: `Wedding Transportation in West Orange, NJ | Next Trip Anywhere`,
  description: `Elegant wedding transportation including limousines, party buses, and guest shuttle services. Serving West Orange and surrounding Essex County areas. Call 833-874-1019 for immediate assistance.`,
  keywords: [
    `wedding-transportation West Orange`,
    `West Orange wedding transportation`,
    ...['wedding transportation', 'wedding limo', 'bridal party', 'guest shuttle', 'wedding cars'],
    `West Orange NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-west-orange/wedding-transportation`,
  },
  openGraph: {
    title: `Wedding Transportation in West Orange | Next Trip Anywhere`,
    description: `Professional wedding transportation for West Orange residents. Elegant wedding transportation including limousines, party buses, and guest shuttle services.`,
    url: `https://nexttripanywhere.com/travel-from-west-orange/wedding-transportation`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function WestOrangeWeddingTransportationPage() {
  const serviceData = {
    city: city.name,
    service: service.name,
    description: service.description,
    features: [
      'Luxury vehicle selection',
      'Red carpet service',
      'Decorated vehicles available',
      'Multiple pickup coordination',
    ],
    localInfo:
      'Elegant wedding transportation services for West Orange couples and wedding parties.',
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
              Wedding Transportation for West Orange Residents
            </h2>
            <div className="prose max-w-none">
              <p>
                Elegant wedding transportation services for West Orange couples and wedding parties.
                With a population of 48,843, West Orange residents trust Next Trip Anywhere for
                reliable wedding transportation services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Why Choose Our Wedding Transportation Service?
              </h3>
              <ul className="space-y-2">
                <li>• Luxury vehicle selection</li>
                <li>• Red carpet service</li>
                <li>• Decorated vehicles available</li>
                <li>• Multiple pickup coordination</li>
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Areas in West Orange</h3>
                <p>
                  We proudly serve all neighborhoods in West Orange, including residential areas,
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
