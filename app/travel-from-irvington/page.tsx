/**
 * @fileoverview Irvington-specific travel agency page
 * @module app/travel-from-irvington/page
 *
 * Landing page optimized for Irvington, NJ residents seeking passport to world travel.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS.irvington

export const metadata: Metadata = generateTownMetadata(town)

export default function IrvingtonTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Marcus Johnson',
      location: 'Springfield Avenue',
      rating: 5,
      text: "Next Trip Anywhere helped me visit family in Jamaica with the best rates I could find. They truly are Irvington's passport to the world!",
      destination: 'Kingston, Jamaica',
    },
    {
      name: 'Fatima Hassan',
      location: 'Clinton Avenue',
      rating: 5,
      text: 'They made our Hajj pilgrimage planning stress-free and affordable. Their understanding of religious travel needs is exceptional.',
      destination: 'Saudi Arabia',
    },
    {
      name: 'Patricia Brown',
      location: 'Grove Street',
      rating: 5,
      text: 'Our church group trip to Israel was perfectly organized. They handled everything for 30 people with professionalism and care.',
      destination: 'Holy Land Tour',
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

      {/* Page Content with Irvington-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Irvington-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Irvington's Passport to the World
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Community Group Travel</h3>
              <p className="text-gray-700 mb-4">
                Specializing in group travel for Irvington organizations:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Church and religious group pilgrimages</li>
                <li>• School educational trips</li>
                <li>• Family reunion packages</li>
                <li>• Community organization tours</li>
                <li>• Sports team travel arrangements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">International Connections</h3>
              <p className="text-gray-700 mb-4">Linking Irvington to destinations worldwide:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Caribbean island vacations</li>
                <li>• African heritage journeys</li>
                <li>• Central & South American tours</li>
                <li>• Middle Eastern pilgrimages</li>
                <li>• European cultural experiences</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient from Irvington</h3>
            <p className="text-gray-700 mb-4">
              Located near Irvington Park and Clinton Cemetery. Easy access via Springfield Avenue
              or Clinton Avenue. We speak multiple languages to serve Irvington's diverse community.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From Irvington Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Irvington Park</li>
                  <li>• 3 min from Olympic Park</li>
                  <li>• 7 min from Frank H. Morrell High School</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Airport Access:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 15 min to Newark Airport (EWR)</li>
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
