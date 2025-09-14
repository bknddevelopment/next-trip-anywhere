/**
 * @fileoverview Cedar Grove-specific travel agency page
 * @module app/travel-from-cedar-grove/page
 *
 * Landing page optimized for Cedar Grove, NJ residents seeking personalized travel services.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS['cedar-grove']

export const metadata: Metadata = generateTownMetadata(town)

export default function CedarGroveTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Patricia Miller',
      location: 'Cedar Grove',
      rating: 5,
      text: 'Next Trip Anywhere helped us plan the perfect family reunion cruise. Their attention to detail and knowledge of group travel made everything seamless.',
      destination: 'Caribbean Cruise',
    },
    {
      name: 'Robert Thompson',
      location: 'Little Falls Border',
      rating: 5,
      text: 'Living in a small town, I appreciate the personalized service. They arranged an amazing European river cruise that exceeded all expectations.',
      destination: 'Rhine River',
    },
    {
      name: 'Lisa Anderson',
      location: 'Near Mills Reservation',
      rating: 5,
      text: 'Their global expertise is remarkable. From a safari in Kenya to exploring Japan, they make dream vacations a reality for Cedar Grove families.',
      destination: 'Tokyo & Kyoto',
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

      {/* Page Content with Cedar Grove-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Cedar Grove-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Small Town Charm, Global Destinations
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Family-Focused Travel</h3>
              <p className="text-gray-700 mb-4">
                Cedar Grove families trust us for memorable vacations that bring everyone together:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Multi-generational family cruises and resorts</li>
                <li>• Educational travel experiences for children</li>
                <li>• Disney and theme park vacation planning</li>
                <li>• Family-friendly all-inclusive resorts</li>
                <li>• Summer vacation packages</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Adventure & Nature Travel</h3>
              <p className="text-gray-700 mb-4">Perfect for Cedar Grove's outdoor enthusiasts:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• National park tours and hiking adventures</li>
                <li>• Eco-tourism and wildlife experiences</li>
                <li>• Mountain resort getaways</li>
                <li>• Active vacation packages</li>
                <li>• Scenic rail journeys worldwide</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient from Cedar Grove</h3>
            <p className="text-gray-700 mb-4">
              Located near Cedar Grove Community Park and Mills Reservation. Easy access via Pompton
              Avenue or Ridge Road. We're your neighbors, ready to help you explore the world.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From Cedar Grove Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Cedar Grove Community Park</li>
                  <li>• 3 min from Mills Reservation</li>
                  <li>• 7 min from Hilltop Reservation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Airport Access:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 20 min to Newark Airport (EWR)</li>
                  <li>• 15 min to Teterboro Airport</li>
                  <li>• 25 min to Morristown Airport</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
