/**
 * @fileoverview West Orange-specific travel agency page
 * @module app/travel-from-west-orange/page
 *
 * Landing page optimized for West Orange, NJ residents seeking family vacation packages.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS['west-orange']

export const metadata: Metadata = generateTownMetadata(town)

export default function WestOrangeTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'The Martinez Family',
      location: 'Pleasant Valley',
      rating: 5,
      text: 'With three kids, planning vacations is challenging. Next Trip Anywhere found us the perfect all-inclusive resort with activities for everyone. They thought of everything!',
      destination: 'Turks and Caicos',
    },
    {
      name: 'David & Rachel Cohen',
      location: 'Gregory Section',
      rating: 5,
      text: 'They arranged an amazing Disney World trip for our family. The FastPass planning and restaurant reservations were perfect. Our kids still talk about it!',
      destination: 'Orlando',
    },
    {
      name: 'Patricia Thompson',
      location: 'St. Cloud',
      rating: 5,
      text: 'Planning a multigenerational cruise for 12 people seemed impossible, but they handled every detail beautifully. Everyone had an amazing time!',
      destination: 'Caribbean Cruise',
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

      {/* Page Content with West Orange-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* West Orange-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Family-Friendly Travel from West Orange
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Perfect Family Vacations</h3>
              <p className="text-gray-700 mb-4">
                West Orange families trust us to create memorable vacations that work for all ages:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• All-inclusive family resorts</li>
                <li>• Disney and Universal packages</li>
                <li>• Educational trips to Washington DC</li>
                <li>• Beach vacations with kids clubs</li>
                <li>• Adventure travel for active families</li>
                <li>• Multi-generational cruise planning</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">School Break Specialists</h3>
              <p className="text-gray-700 mb-4">
                We know the West Orange school calendar and plan accordingly:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Spring break getaways</li>
                <li>• Summer vacation planning</li>
                <li>• Winter break ski trips</li>
                <li>• Long weekend escapes</li>
                <li>• Educational summer programs abroad</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Serving West Orange Families</h3>
            <p className="text-gray-700 mb-4">
              Located conveniently for West Orange residents, with easy access from Eagle Rock
              Avenue and Main Street. Near Thomas Edison National Historical Park and Turtle Back
              Zoo.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From West Orange Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Thomas Edison Park</li>
                  <li>• 3 min from Turtle Back Zoo</li>
                  <li>• 8 min from South Mountain Reservation</li>
                  <li>• 10 min from The Manor</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Family-Friendly Services:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Car seat and stroller rentals</li>
                  <li>• Kids' travel documentation help</li>
                  <li>• Family group discounts</li>
                  <li>• Childcare at resorts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
