/**
 * @fileoverview Montclair-specific travel agency page
 * @module app/travel-from-montclair/page
 *
 * Landing page optimized for Montclair, NJ residents seeking luxury travel services.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS.montclair

export const metadata: Metadata = generateTownMetadata(town)

export default function MontclairTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Jennifer Hayes',
      location: 'Upper Montclair',
      rating: 5,
      text: 'Next Trip Anywhere curated the perfect luxury European tour for our anniversary. Their attention to detail and knowledge of high-end travel is exceptional.',
      destination: 'French Riviera',
    },
    {
      name: 'Dr. Michael Chen',
      location: 'Montclair Heights',
      rating: 5,
      text: 'They understand the sophisticated traveler. Our African safari exceeded every expectation, from the private jets to the exclusive lodges.',
      destination: 'Kenya & Tanzania',
    },
    {
      name: 'Susan Richardson',
      location: 'South End',
      rating: 5,
      text: 'As an art enthusiast, I appreciated their cultural travel expertise. The private museum tours in Italy were unforgettable.',
      destination: 'Florence & Venice',
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

      {/* Page Content with Montclair-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Montclair-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Luxury Travel Services for Montclair
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Exclusive Experiences</h3>
              <p className="text-gray-700 mb-4">
                Montclair residents expect the finest in travel, and we deliver with our curated
                collection of luxury experiences:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Private jet and first-class flight arrangements</li>
                <li>• Five-star hotels and exclusive resorts</li>
                <li>• Private tours and VIP access</li>
                <li>• Yacht charters and villa rentals</li>
                <li>• Michelin-starred dining reservations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Cultural & Educational Travel</h3>
              <p className="text-gray-700 mb-4">Perfect for Montclair's cultured community:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Art and museum tours worldwide</li>
                <li>• Music festivals and opera experiences</li>
                <li>• Culinary tours and cooking classes</li>
                <li>• Historical and archaeological expeditions</li>
                <li>• Educational family travel programs</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient from Montclair</h3>
            <p className="text-gray-700 mb-4">
              Located near Montclair Art Museum and Wellmont Theater. Easy access via Bloomfield Ave
              or Valley Road. We offer complimentary car service for trip consultations.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From Montclair Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Montclair Art Museum</li>
                  <li>• 3 min from Wellmont Theater</li>
                  <li>• 7 min from Montclair State University</li>
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
