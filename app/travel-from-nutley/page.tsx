/**
 * @fileoverview Nutley-specific travel agency page
 * @module app/travel-from-nutley/page
 *
 * Landing page optimized for Nutley, NJ residents seeking dream vacation experiences.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS.nutley

export const metadata: Metadata = generateTownMetadata(town)

export default function NutleyTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Maria Rodriguez',
      location: 'Centre Street',
      rating: 5,
      text: 'Next Trip Anywhere made our dream vacation to Greece a reality! They found amazing deals and created an itinerary that fit our budget perfectly.',
      destination: 'Athens & Santorini',
    },
    {
      name: 'Thomas Kelly',
      location: 'Park Avenue',
      rating: 5,
      text: 'As a Nutley native, I love having a local travel expert who understands our community. They planned an incredible family trip to Costa Rica.',
      destination: 'Costa Rica',
    },
    {
      name: 'Jennifer Park',
      location: 'Franklin Avenue',
      rating: 5,
      text: 'Their expertise in Asian travel is exceptional. Our trip to Vietnam and Thailand was perfectly organized with authentic local experiences.',
      destination: 'Southeast Asia',
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

      {/* Page Content with Nutley-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Nutley-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nutley's Gateway to Dream Vacations
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Value-Packed Vacations</h3>
              <p className="text-gray-700 mb-4">
                Nutley families appreciate great value. We deliver dream vacations within your
                budget:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• All-inclusive resort packages with best rates</li>
                <li>• Off-season travel deals and early bird specials</li>
                <li>• Group discounts for family reunions</li>
                <li>• Budget-friendly European tours</li>
                <li>• Last-minute travel deals and flash sales</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Popular Destinations</h3>
              <p className="text-gray-700 mb-4">Where Nutley residents love to travel:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Florida beach resorts and theme parks</li>
                <li>• Caribbean island getaways</li>
                <li>• Mediterranean cruises</li>
                <li>• Las Vegas entertainment packages</li>
                <li>• Mexico all-inclusive resorts</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient from Nutley</h3>
            <p className="text-gray-700 mb-4">
              Located near Nutley Museum and Yanticaw Park. Easy access via Washington Avenue or
              Franklin Avenue. Your neighborhood travel experts ready to help you explore.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From Nutley Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Nutley Museum</li>
                  <li>• 3 min from Yanticaw Park</li>
                  <li>• 7 min from Memorial Park</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Airport Access:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 20 min to Newark Airport (EWR)</li>
                  <li>• 15 min to Teterboro Airport</li>
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
