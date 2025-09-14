/**
 * @fileoverview Bloomfield-specific travel agency page
 * @module app/travel-from-bloomfield/page
 *
 * Landing page optimized for Bloomfield, NJ residents seeking budget-friendly travel.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS.bloomfield

export const metadata: Metadata = generateTownMetadata(town)

export default function BloomfieldTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Anthony Russo',
      location: 'Bloomfield Center',
      rating: 5,
      text: 'I was amazed at the deals they found for our family vacation. We got a week in Florida for less than what I was seeing online. Great value!',
      destination: 'Orlando',
    },
    {
      name: 'Maria Gonzalez',
      location: 'Watsessing',
      rating: 5,
      text: 'They helped us plan a beautiful Dominican Republic trip within our budget. The all-inclusive resort was perfect and affordable.',
      destination: 'Dominican Republic',
    },
    {
      name: "John and Pat O'Brien",
      location: 'Brookdale',
      rating: 5,
      text: 'Retired and on a fixed income, we still want to travel. They found us amazing cruise deals that fit our budget perfectly.',
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

      {/* Page Content with Bloomfield-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Bloomfield-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Affordable Travel Solutions for Bloomfield
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Budget-Friendly Options</h3>
              <p className="text-gray-700 mb-4">
                Great vacations don't have to break the bank. We specialize in:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Off-season travel deals</li>
                <li>• All-inclusive value packages</li>
                <li>• Last-minute discounts</li>
                <li>• Group rates for families</li>
                <li>• Budget cruise specials</li>
                <li>• Affordable Caribbean getaways</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Payment Flexibility</h3>
              <p className="text-gray-700 mb-4">
                Making travel accessible for all Bloomfield residents:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Payment plan options</li>
                <li>• Layaway vacation programs</li>
                <li>• Early booking discounts</li>
                <li>• Senior citizen specials</li>
                <li>• Military and veteran discounts</li>
                <li>• Group booking savings</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Serving All of Bloomfield</h3>
            <p className="text-gray-700 mb-4">
              Conveniently located for all Bloomfield neighborhoods. Easy access from Broad Street
              and Bloomfield Avenue. Near Bloomfield Center and public transportation.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Near Bloomfield Locations:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Bloomfield Center</li>
                  <li>• 3 min from Brookdale Park</li>
                  <li>• 8 min from Watsessing Park</li>
                  <li>• Near Bloomfield College</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Value-Added Services:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Free travel consultation</li>
                  <li>• Price match guarantee</li>
                  <li>• Exclusive package deals</li>
                  <li>• Travel insurance options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
