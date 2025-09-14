/**
 * @fileoverview Essex Fells-specific travel agency page
 * @module app/travel-from-essex-fells/page
 *
 * Landing page optimized for Essex Fells, NJ residents seeking exclusive travel experiences.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS['essex-fells']

export const metadata: Metadata = generateTownMetadata(town)

export default function EssexFellsTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Alexander Whitmore',
      location: 'The Fells Historic District',
      rating: 5,
      text: "Next Trip Anywhere arranged our family's private villa in the Amalfi Coast with staff. The level of luxury and privacy was exactly what Essex Fells expects.",
      destination: 'Amalfi Coast',
    },
    {
      name: 'Eleanor Vanderbilt',
      location: 'Near Essex Fells CC',
      rating: 5,
      text: 'They secured impossible reservations at Le Bernardin and arranged our entire NYC weekend with limousine service. Impeccable taste and connections.',
      destination: 'New York City',
    },
    {
      name: 'Charles Montgomery',
      location: 'Fells Manor Area',
      rating: 5,
      text: 'Our private yacht charter through the Greek islands was beyond exceptional. They understand the Essex Fells standard of excellence.',
      destination: 'Greek Islands',
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

      {/* Page Content with Essex Fells-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Essex Fells-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Exclusive Travel for Essex Fells</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Ultra-Exclusive Destinations</h3>
              <p className="text-gray-700 mb-4">
                Access to the world's most exclusive and private destinations:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Private island resort buyouts</li>
                <li>• Members-only club access worldwide</li>
                <li>• Royal suite accommodations</li>
                <li>• Private estate rentals in Europe</li>
                <li>• Invitation-only events and galas</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Bespoke Luxury Services</h3>
              <p className="text-gray-700 mb-4">
                White-glove service befitting Essex Fells' standards:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Personal butler and concierge services</li>
                <li>• Private chef and sommelier experiences</li>
                <li>• Couture shopping with personal stylists</li>
                <li>• Art acquisition and gallery appointments</li>
                <li>• Philanthropic travel opportunities</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient from Essex Fells</h3>
            <p className="text-gray-700 mb-4">
              Located near Essex Fells Country Club and the Historic District. Discreet service via
              private appointment. Maintaining the privacy and exclusivity Essex Fells residents
              expect.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From Essex Fells Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Essex Fells Country Club</li>
                  <li>• 3 min from Trotter Park</li>
                  <li>• 7 min from The Fells Historic District</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Airport Access:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 25 min to Newark Airport (EWR)</li>
                  <li>• 15 min to Morristown Airport</li>
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
