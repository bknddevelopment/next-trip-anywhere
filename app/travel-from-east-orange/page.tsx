/**
 * @fileoverview East Orange-specific travel agency page
 * @module app/travel-from-east-orange/page
 *
 * Landing page optimized for East Orange, NJ residents seeking worldwide travel connections.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS['east-orange']

export const metadata: Metadata = generateTownMetadata(town)

export default function EastOrangeTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Denise Williams',
      location: 'Brick Church',
      rating: 5,
      text: 'Next Trip Anywhere made my dream of visiting Africa come true! They arranged an incredible tour to Ghana that was both affordable and meaningful.',
      destination: 'Ghana Heritage Tour',
    },
    {
      name: 'Jerome Thompson',
      location: 'Main Street',
      rating: 5,
      text: 'From East Orange to everywhere! They helped me plan a business trip to Dubai that turned into an amazing cultural experience.',
      destination: 'Dubai, UAE',
    },
    {
      name: 'Angela Roberts',
      location: 'Grove Street',
      rating: 5,
      text: 'They understand our community and deliver excellent service. Our family reunion cruise was perfectly organized and everyone had a great time.',
      destination: 'Bahamas Cruise',
    },
  ]

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([businessSchema, faqSchema]),
        }}
      />

      {/* Page Content with East Orange-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* East Orange-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">East Orange to Everywhere</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Affordable Travel Options</h3>
              <p className="text-gray-700 mb-4">
                Making world travel accessible for East Orange residents:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Payment plans and flexible booking options</li>
                <li>• Group travel discounts and deals</li>
                <li>• Off-season bargain packages</li>
                <li>• Budget-friendly all-inclusive resorts</li>
                <li>• Student and senior travel specials</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Heritage & Diaspora Travel</h3>
              <p className="text-gray-700 mb-4">Connecting East Orange to global destinations:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• African heritage tours and safaris</li>
                <li>• Caribbean cultural experiences</li>
                <li>• Southern US historical tours</li>
                <li>• Religious and spiritual journeys</li>
                <li>• Family reunion travel planning</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient from East Orange</h3>
            <p className="text-gray-700 mb-4">
              Located near East Orange City Hall and Brick Church Station. Easy access via Main
              Street or Central Avenue. Serving our diverse community with pride and expertise.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From East Orange Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from City Hall</li>
                  <li>• 3 min from Brick Church Station</li>
                  <li>• 7 min from Elmwood Park</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Airport Access:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 20 min to Newark Airport (EWR)</li>
                  <li>• 40 min to JFK International</li>
                  <li>• 35 min to LaGuardia Airport</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
