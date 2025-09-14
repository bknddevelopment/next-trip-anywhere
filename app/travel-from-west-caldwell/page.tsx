/**
 * @fileoverview West Caldwell-specific travel agency page
 * @module app/travel-from-west-caldwell/page
 *
 * Landing page optimized for West Caldwell, NJ residents seeking wanderlust fulfillment.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS['west-caldwell']

export const metadata: Metadata = generateTownMetadata(town)

export default function WestCaldwellTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Brian Mitchell',
      location: 'Near James Caldwell HS',
      rating: 5,
      text: 'Next Trip Anywhere fulfilled our wanderlust with an amazing Southeast Asia backpacking tour. Perfect blend of adventure and comfort!',
      destination: 'Thailand, Vietnam & Cambodia',
    },
    {
      name: 'Jessica Palmer',
      location: 'Passaic Avenue',
      rating: 5,
      text: 'They planned our dream honeymoon to Bora Bora. Every detail was perfect, from the overwater bungalow to the sunset dinners.',
      destination: 'Bora Bora',
    },
    {
      name: 'The Harrison Family',
      location: 'Crane Park Area',
      rating: 5,
      text: 'Our kids still talk about the amazing Costa Rica eco-adventure. Educational, fun, and perfectly organized for our family.',
      destination: 'Costa Rica',
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

      {/* Page Content with West Caldwell-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* West Caldwell-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            West Caldwell Wanderlust Fulfilled
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Adventure Travel</h3>
              <p className="text-gray-700 mb-4">
                Fulfilling West Caldwell's spirit of adventure and exploration:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Hiking and trekking expeditions</li>
                <li>• Scuba diving and water sports vacations</li>
                <li>• Safari and wildlife adventures</li>
                <li>• Mountain climbing and skiing trips</li>
                <li>• Cycling tours through scenic countries</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Romantic Escapes</h3>
              <p className="text-gray-700 mb-4">Perfect getaways for West Caldwell couples:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Tropical island honeymoons</li>
                <li>• European romantic city breaks</li>
                <li>• Wine country retreats</li>
                <li>• Couples spa resorts</li>
                <li>• Anniversary celebration packages</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient from West Caldwell</h3>
            <p className="text-gray-700 mb-4">
              Located near James Caldwell High School and Crane Park. Easy access via Passaic Avenue
              or Bloomfield Avenue. Your West Caldwell neighbors for worldwide adventures.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From West Caldwell Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from James Caldwell High School</li>
                  <li>• 3 min from Crane Park</li>
                  <li>• 7 min from Hatfield Swamp</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Airport Access:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 25 min to Newark Airport (EWR)</li>
                  <li>• 20 min to Morristown Airport</li>
                  <li>• 20 min to Teterboro Airport</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
