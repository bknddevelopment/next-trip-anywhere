/**
 * @fileoverview Glen Ridge-specific travel agency page
 * @module app/travel-from-glen-ridge/page
 *
 * Landing page optimized for Glen Ridge, NJ families seeking stylish travel experiences.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS['glen-ridge']

export const metadata: Metadata = generateTownMetadata(town)

export default function GlenRidgeTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Elizabeth Morgan',
      location: 'Ridgewood Avenue',
      rating: 5,
      text: "Next Trip Anywhere planned our family's European grand tour with impeccable taste and attention to detail. Every hotel and experience was first-class.",
      destination: 'Paris, Rome & Barcelona',
    },
    {
      name: 'Dr. William Foster',
      location: 'Forest Avenue',
      rating: 5,
      text: 'They understand Glen Ridge families want sophisticated travel. Our African safari was luxurious yet authentic - exactly what we wanted.',
      destination: 'Tanzania Safari',
    },
    {
      name: 'Catherine Walsh',
      location: 'Highland Avenue',
      rating: 5,
      text: 'Exceptional service for our multi-generational trip to Japan. They accommodated everyone from grandparents to teenagers perfectly.',
      destination: 'Japan Family Tour',
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

      {/* Page Content with Glen Ridge-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Glen Ridge-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Glen Ridge Families Travel in Style
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Premium Family Travel</h3>
              <p className="text-gray-700 mb-4">
                Sophisticated travel experiences for discerning Glen Ridge families:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Luxury family resorts with kids' programs</li>
                <li>• Educational travel with expert guides</li>
                <li>• Private villa rentals in exclusive destinations</li>
                <li>• Multi-generational cruise suites</li>
                <li>• Boutique hotels and unique properties</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Curated Experiences</h3>
              <p className="text-gray-700 mb-4">
                Handpicked adventures for the Glen Ridge lifestyle:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Wine country tours in Bordeaux and Tuscany</li>
                <li>• Private yacht charters in the Mediterranean</li>
                <li>• Exclusive golf resort packages</li>
                <li>• Art and architecture tours</li>
                <li>• Wellness retreats and spa destinations</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient from Glen Ridge</h3>
            <p className="text-gray-700 mb-4">
              Located near Glen Ridge Country Club and the Congregational Church. Easy access via
              Ridgewood Avenue or Bloomfield Avenue. White-glove service for our Glen Ridge
              neighbors.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From Glen Ridge Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Glen Ridge Country Club</li>
                  <li>• 3 min from Freeman Gardens</li>
                  <li>• 7 min from Hurrell Field</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Airport Access:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 25 min to Newark Airport (EWR)</li>
                  <li>• 20 min to Teterboro Airport</li>
                  <li>• 45 min to JFK International</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
