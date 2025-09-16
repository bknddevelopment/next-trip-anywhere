/**
 * Newark School Transportation Service Page
 * Generated for Essex County SEO - Phase 4
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('newark')!
const service = getServiceBySlug('school-transportation')!
const cityData = getCityById('newark')

export const metadata: Metadata = {
  title: `School Transportation in Newark, NJ | Next Trip Anywhere`,
  description: `Safe student transportation for field trips, sports events, and daily school runs with certified drivers. Serving Newark and surrounding Essex County areas. Call 833-874-1019 for immediate assistance.`,
  keywords: [
    `school-transportation Newark`,
    `Newark school transportation`,
    ...[
      'school transportation',
      'student transport',
      'field trips',
      'school bus',
      'student shuttle',
    ],
    `Newark NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-newark/school-transportation`,
  },
  openGraph: {
    title: `School Transportation in Newark | Next Trip Anywhere`,
    description: `Professional school transportation for Newark residents. Safe student transportation for field trips, sports events, and daily school runs with certified drivers.`,
    url: `https://nexttripanywhere.com/travel-from-newark/school-transportation`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function NewarkSchoolTransportationPage() {
  const serviceData = {
    city: city.name,
    service: service.name,
    description: service.description,
    features: [
      'Certified drivers',
      'Safety-first approach',
      'GPS tracking available',
      'Flexible scheduling',
    ],
    localInfo:
      'Reliable school transportation services for Newark students and educational institutions.',
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
            <h2 className="text-2xl font-bold mb-6">School Transportation for Newark Residents</h2>
            <div className="prose max-w-none">
              <p>
                Reliable school transportation services for Newark students and educational
                institutions. With a population of 311,549, Newark residents trust Next Trip
                Anywhere for reliable school transportation services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Why Choose Our School Transportation Service?
              </h3>
              <ul className="space-y-2">
                <li>• Certified drivers</li>
                <li>• Safety-first approach</li>
                <li>• GPS tracking available</li>
                <li>• Flexible scheduling</li>
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Areas in Newark</h3>
                <p>
                  We proudly serve all neighborhoods in Newark, including residential areas,
                  business districts, and surrounding communities. Our school transportation service
                  is available 24/7 for your convenience.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                  Book Your School Transportation Today
                </h3>
                <p>
                  Ready to experience premium school transportation service? Contact Next Trip
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
