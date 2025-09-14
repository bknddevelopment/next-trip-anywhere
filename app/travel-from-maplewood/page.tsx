/**
 * @fileoverview Maplewood-specific travel agency page
 * @module app/travel-from-maplewood/page
 *
 * Landing page optimized for Maplewood, NJ residents seeking eco-friendly travel.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS.maplewood

export const metadata: Metadata = generateTownMetadata(town)

export default function MaplewoodTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Sarah Green',
      location: 'Maplewood Village',
      rating: 5,
      text: "They found us an amazing eco-lodge in Costa Rica with carbon-neutral travel options. It's great to work with an agency that shares our environmental values.",
      destination: 'Costa Rica',
    },
    {
      name: 'Tom and Lisa Chen',
      location: 'Ridgewood Road',
      rating: 5,
      text: 'Our sustainable tourism trip to Iceland was perfectly planned. From electric car rentals to eco-certified hotels, every detail aligned with our values.',
      destination: 'Iceland',
    },
    {
      name: 'Michael Harper',
      location: 'Springfield Avenue',
      rating: 5,
      text: 'They arranged a volunteer vacation where our family could give back while exploring Peru. An incredible, meaningful experience!',
      destination: 'Peru',
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

      {/* Page Content with Maplewood-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Maplewood-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Sustainable Travel for Maplewood's Conscious Community
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Eco-Friendly Travel Options</h3>
              <p className="text-gray-700 mb-4">Maplewood values sustainability, and so do we:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Carbon-neutral flight options</li>
                <li>• Eco-certified accommodations</li>
                <li>• Sustainable tourism destinations</li>
                <li>• Wildlife conservation trips</li>
                <li>• Farm-to-table culinary tours</li>
                <li>• Electric vehicle rentals</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Community & Cultural Travel</h3>
              <p className="text-gray-700 mb-4">Travel that makes a difference:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Volunteer vacation programs</li>
                <li>• Cultural immersion experiences</li>
                <li>• Local community tourism</li>
                <li>• Educational eco-tours</li>
                <li>• Fair trade shopping tours</li>
                <li>• Indigenous community visits</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Your Maplewood Travel Partner</h3>
            <p className="text-gray-700 mb-4">
              Located near Maplewood Village, easily accessible by foot, bike, or public transit. We
              support local businesses and sustainable practices in all we do.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Near Maplewood Favorites:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 3 min from Maplewood Village</li>
                  <li>• 5 min from Memorial Park</li>
                  <li>• 2 min from Maplewood Train Station</li>
                  <li>• 8 min from South Mountain Reservation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Green Travel Services:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Carbon offset programs</li>
                  <li>• Paperless booking options</li>
                  <li>• Local guide connections</li>
                  <li>• Sustainable packing advice</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
