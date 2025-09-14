/**
 * @fileoverview Caldwell-specific travel agency page
 * @module app/travel-from-caldwell/page
 *
 * Landing page optimized for Caldwell, NJ residents seeking travel concierge services.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS.caldwell

export const metadata: Metadata = generateTownMetadata(town)

export default function CaldwellTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Richard Bennett',
      location: 'Bloomfield Avenue',
      rating: 5,
      text: 'Next Trip Anywhere provides true concierge-level service. They handled every detail of our Mediterranean cruise perfectly.',
      destination: 'Mediterranean Cruise',
    },
    {
      name: 'Amanda Stevens',
      location: 'Central Avenue',
      rating: 5,
      text: 'Being from the birthplace of Grover Cleveland, we appreciate history. Their historical tours of Washington DC and Philadelphia were outstanding.',
      destination: 'American History Tour',
    },
    {
      name: 'Prof. David Kim',
      location: 'Near Caldwell University',
      rating: 5,
      text: 'They arranged a fantastic educational tour of ancient sites in Greece and Turkey for our university group. Impeccable planning!',
      destination: 'Greece & Turkey',
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

      {/* Page Content with Caldwell-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Caldwell-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">The Caldwells' Travel Concierge</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Concierge Travel Services</h3>
              <p className="text-gray-700 mb-4">
                White-glove travel planning for Caldwell residents:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Personal travel consultation and planning</li>
                <li>• VIP airport services and transfers</li>
                <li>• Restaurant reservations and show tickets</li>
                <li>• Travel insurance and documentation</li>
                <li>• 24/7 travel support while abroad</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Historical & Cultural Tours</h3>
              <p className="text-gray-700 mb-4">
                From presidential history to world heritage sites:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• American presidential history tours</li>
                <li>• European historical expeditions</li>
                <li>• University and college tours</li>
                <li>• Literary and artistic journeys</li>
                <li>• Archaeological site visits</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient from Caldwell</h3>
            <p className="text-gray-700 mb-4">
              Located near Grover Cleveland Birthplace and Caldwell University. Easy access via
              Bloomfield Avenue or Central Avenue. Serving the Caldwell community with distinction.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From Caldwell Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Grover Cleveland Birthplace</li>
                  <li>• 3 min from Caldwell University</li>
                  <li>• 7 min from Memorial Park</li>
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
