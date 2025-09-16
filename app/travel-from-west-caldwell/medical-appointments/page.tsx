/**
 * West Caldwell Medical Appointments Service Page
 * Generated for Essex County SEO - Phase 1
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('west-caldwell')!
const service = getServiceBySlug('medical-appointments')!
const cityData = getCityById('west-caldwell')

export const metadata: Metadata = {
  title: `Medical Appointments in West Caldwell, NJ | Next Trip Anywhere`,
  description: `Professional medical appointments services for West Caldwell residents. Safe, reliable transportation to medical appointments, treatments, and hospital visits. Call 833-874-1019 for immediate assistance.`,
  keywords: [
    `medical-appointments West Caldwell`,
    `West Caldwell medical appointments`,
    ...[
      'medical transportation',
      'hospital transport',
      'doctor appointments',
      'medical shuttle',
      'healthcare transport',
    ],
    `West Caldwell NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-west-caldwell/medical-appointments`,
  },
  openGraph: {
    title: `Medical Appointments in West Caldwell | Next Trip Anywhere`,
    description: `Professional medical appointments for West Caldwell residents. Safe, reliable transportation to medical appointments, treatments, and hospital visits.`,
    url: `https://nexttripanywhere.com/travel-from-west-caldwell/medical-appointments`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function WestCaldwellMedicalAppointmentsPage() {
  const serviceData = {
    city: city.name,
    service: service.name,
    description: service.description,
    features: [
      'Wheelchair accessible vehicles',
      'Trained medical transport staff',
      'Door-to-door service',
      'Appointment scheduling assistance',
    ],
    localInfo: 'Your trusted medical appointments provider in West Caldwell and Essex County.',
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
              Medical Appointments for West Caldwell Residents
            </h2>
            <div className="prose max-w-none">
              <p>
                Your trusted medical appointments provider in West Caldwell and Essex County. With a
                population of 11,223, West Caldwell residents trust Next Trip Anywhere for reliable
                medical appointments services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Why Choose Our Medical Appointments Service?
              </h3>
              <ul className="space-y-2">
                <li>• Wheelchair accessible vehicles</li>
                <li>• Trained medical transport staff</li>
                <li>• Door-to-door service</li>
                <li>• Appointment scheduling assistance</li>
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Areas in West Caldwell</h3>
                <p>
                  We proudly serve all neighborhoods in West Caldwell, including residential areas,
                  business districts, and surrounding communities. Our medical appointments service
                  is available 24/7 for your convenience.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Book Your Medical Appointments Today</h3>
                <p>
                  Ready to experience premium medical appointments service? Contact Next Trip
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
