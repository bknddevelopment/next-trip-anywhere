/**
 * @fileoverview Livingston-specific travel agency page
 * @module app/travel-from-livingston/page
 *
 * Landing page optimized for Livingston, NJ residents seeking business and premium travel.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS.livingston

export const metadata: Metadata = generateTownMetadata(town)

export default function LivingstonTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Steven Goldman',
      location: 'Livingston Circle',
      rating: 5,
      text: 'As a CEO with constant international travel needs, I rely on Next Trip Anywhere for seamless business arrangements. They handle complex itineraries with ease.',
      destination: 'London & Hong Kong',
    },
    {
      name: 'Rebecca Patel',
      location: 'Northfield',
      rating: 5,
      text: 'They organized our company retreat for 50 employees. Every detail from flights to team-building activities was perfectly coordinated.',
      destination: 'Costa Rica',
    },
    {
      name: 'Jonathan Miller',
      location: 'Collins',
      rating: 5,
      text: 'Premium service for premium travel. Our anniversary trip to the Maldives was absolutely perfect. They secured upgrades we never could have gotten ourselves.',
      destination: 'Maldives',
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

      {/* Page Content with Livingston-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Livingston-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Business & Premium Travel for Livingston Professionals
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Corporate Travel Excellence</h3>
              <p className="text-gray-700 mb-4">
                Livingston's business leaders trust us for sophisticated travel management:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Executive business class bookings</li>
                <li>• Corporate travel account management</li>
                <li>• Last-minute itinerary changes</li>
                <li>• Airport lounge access arrangements</li>
                <li>• Global entry and TSA PreCheck assistance</li>
                <li>• Conference and trade show logistics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Premium Leisure Travel</h3>
              <p className="text-gray-700 mb-4">
                When Livingston professionals vacation, they expect the best:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Luxury resort reservations</li>
                <li>• Private island getaways</li>
                <li>• Golf and spa vacations</li>
                <li>• Wine country tours</li>
                <li>• Exclusive cruise suites</li>
                <li>• Concierge-level services</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient for Livingston Executives</h3>
            <p className="text-gray-700 mb-4">
              Strategically located for busy Livingston professionals. Quick access from Route 10
              and Livingston Avenue. Near Livingston Mall and corporate centers.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Quick Access From:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Livingston Town Center</li>
                  <li>• Livingston Mall area</li>
                  <li>• Riker Hill Art Park</li>
                  <li>• Major corporate offices</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Business Services:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 24/7 emergency support</li>
                  <li>• Expense report documentation</li>
                  <li>• Corporate billing accounts</li>
                  <li>• Travel policy compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
