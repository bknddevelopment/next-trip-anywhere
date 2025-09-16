/**
 * @fileoverview Orange-specific travel agency page
 * @module app/travel-from-orange/page
 *
 * Landing page optimized for Orange, NJ residents seeking travel services.
 * Emphasizes cultural diversity and affordable travel options.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS.orange

export const metadata: Metadata = generateTownMetadata(town)

export default function OrangeTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Patricia Johnson',
      location: 'Orange Valley',
      rating: 5,
      text: 'Next Trip Anywhere helped us plan an amazing family reunion in Jamaica. They understood our budget and found us the perfect resort with group rates. Outstanding service!',
      destination: 'Jamaica',
    },
    {
      name: 'Michael Brown',
      location: 'Orange Downtown',
      rating: 5,
      text: 'I needed affordable options for visiting family in North Carolina. They found me great deals and even helped with car rental. Will definitely use them again!',
      destination: 'North Carolina',
    },
    {
      name: 'Sandra Williams',
      location: 'Orange Central',
      rating: 5,
      text: 'They arranged our church group trip to the Holy Land with 30 people. Everything was perfectly organized and within our budget. Truly blessed by their service!',
      destination: 'Israel',
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

      {/* Page Content with Orange-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Orange-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Orange Residents Choose Next Trip Anywhere
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Serving Orange's Diverse Community</h3>
              <p className="text-gray-700 mb-4">
                Orange's rich cultural diversity is our strength. We specialize in travel to
                destinations that matter to our community, with expertise in:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Caribbean island vacations</li>
                <li>• African heritage tours</li>
                <li>• Southern U.S. family visits</li>
                <li>• Latin American destinations</li>
                <li>• Religious pilgrimage trips</li>
                <li>• Affordable cruise packages</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Budget-Friendly Travel Solutions</h3>
              <p className="text-gray-700 mb-4">
                We understand that value matters. Our Orange office specializes in finding the best
                deals without compromising quality:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Payment plans available</li>
                <li>• Group discounts for families</li>
                <li>• Off-season travel savings</li>
                <li>• Package deals including airfare & hotel</li>
                <li>• Senior citizen discounts</li>
                <li>• Student travel specials</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Orange Neighborhoods We Serve</h3>
            <div className="grid md:grid-cols-3 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Orange Downtown</h4>
                <p className="text-sm">Business & leisure travel</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Valley Section</h4>
                <p className="text-sm">Family vacation packages</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Central Orange</h4>
                <p className="text-sm">Group travel specialists</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Park Avenue Area</h4>
                <p className="text-sm">Cruise & resort bookings</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Scotland Road</h4>
                <p className="text-sm">International travel</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Main Street Corridor</h4>
                <p className="text-sm">Budget travel options</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local landmarks and directions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-blue-50 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6">Easy to Reach from Anywhere in Orange</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">From Major Orange Landmarks:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• 5 minutes from Orange Train Station</li>
                  <li>• 7 minutes from Orange Public Library</li>
                  <li>• 10 minutes from Central Park</li>
                  <li>• 8 minutes from Valley Arts District</li>
                  <li>• 15 minutes from Newark Airport</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Transportation Options:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• NJ Transit Morris & Essex Line</li>
                  <li>• NJ Transit bus lines: 21, 41, 71, 73, 79</li>
                  <li>• Easy access from Route 280</li>
                  <li>• Free parking available for consultations</li>
                  <li>• Virtual consultations via video call</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
