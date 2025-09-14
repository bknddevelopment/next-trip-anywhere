/**
 * @fileoverview Fairfield-specific travel agency page
 * @module app/travel-from-fairfield/page
 *
 * Landing page optimized for Fairfield, NJ residents seeking business and leisure travel expertise.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS.fairfield

export const metadata: Metadata = generateTownMetadata(town)

export default function FairfieldTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Joseph Romano',
      location: 'Hollywood Avenue',
      rating: 5,
      text: 'As a business owner, I need reliable travel planning. Next Trip Anywhere handles both my corporate trips and family vacations perfectly.',
      destination: 'Tokyo Business Trip',
    },
    {
      name: 'Linda Patel',
      location: 'Fairfield Business Park',
      rating: 5,
      text: 'They expertly balanced our work conference in Vegas with a leisure extension to the Grand Canyon. Best of both worlds!',
      destination: 'Las Vegas & Grand Canyon',
    },
    {
      name: 'Mark Sullivan',
      location: 'Near Passaic River',
      rating: 5,
      text: 'Outstanding corporate group travel planning. They coordinated our entire team retreat to Cancun with meeting spaces and activities.',
      destination: 'Cancun Team Retreat',
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

      {/* Page Content with Fairfield-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Fairfield-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Fairfield's Business & Leisure Experts
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Corporate Travel Solutions</h3>
              <p className="text-gray-700 mb-4">
                Supporting Fairfield's business community with professional travel services:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Corporate travel management</li>
                <li>• Conference and trade show planning</li>
                <li>• Team building retreats</li>
                <li>• Executive travel arrangements</li>
                <li>• Group meeting logistics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Work-Life Balance Travel</h3>
              <p className="text-gray-700 mb-4">
                Perfect leisure escapes for hardworking Fairfield residents:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Weekend getaway packages</li>
                <li>• Spa and wellness retreats</li>
                <li>• Golf resort vacations</li>
                <li>• Family resort stays</li>
                <li>• Cruise vacations</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient from Fairfield</h3>
            <p className="text-gray-700 mb-4">
              Located near the Hollywood Avenue Business Park and Fairfield Recreation Complex. Easy
              access via Route 46 or Passaic Avenue. Your Fairfield business and leisure travel
              headquarters.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From Fairfield Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Hollywood Ave Business Park</li>
                  <li>• 3 min from Fairfield Recreation Complex</li>
                  <li>• 7 min from Dutch Reformed Church</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Airport Access:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 20 min to Newark Airport (EWR)</li>
                  <li>• 15 min to Morristown Airport</li>
                  <li>• 15 min to Teterboro Airport</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
