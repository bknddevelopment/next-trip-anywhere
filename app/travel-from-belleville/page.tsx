/**
 * @fileoverview Belleville-specific travel agency page
 * @module app/travel-from-belleville/page
 *
 * Landing page optimized for Belleville, NJ residents seeking trusted travel planning services.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS.belleville

export const metadata: Metadata = generateTownMetadata(town)

export default function BellevilleTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Carlos Mendez',
      location: 'Silver Lake',
      rating: 5,
      text: 'Finally found a travel agency that understands our needs! They arranged an amazing family trip to the Dominican Republic with everything we wanted.',
      destination: 'Dominican Republic',
    },
    {
      name: 'Sarah Johnson',
      location: 'Washington Avenue',
      rating: 5,
      text: "Next Trip Anywhere is our trusted partner for all vacations. They've planned three trips for us, each one better than the last!",
      destination: 'Orlando Theme Parks',
    },
    {
      name: 'Michael Davis',
      location: 'Belleville Turnpike',
      rating: 5,
      text: 'Excellent service and attention to detail. Our anniversary cruise to Alaska was absolutely perfect thanks to their planning.',
      destination: 'Alaska Cruise',
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

      {/* Page Content with Belleville-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Belleville-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Belleville Travelers' Trusted Partner
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Family-Friendly Destinations</h3>
              <p className="text-gray-700 mb-4">
                Belleville families trust us for safe, enjoyable vacations everyone will love:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Family resort packages with kids clubs</li>
                <li>• Multi-generational cruise vacations</li>
                <li>• Theme park vacation planning</li>
                <li>• Beach resort getaways</li>
                <li>• Educational travel experiences</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Cultural Heritage Tours</h3>
              <p className="text-gray-700 mb-4">
                Connecting Belleville's diverse community to their roots:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Latin American cultural tours</li>
                <li>• European heritage trips</li>
                <li>• Caribbean island experiences</li>
                <li>• Religious pilgrimage planning</li>
                <li>• Ancestry and genealogy tours</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient from Belleville</h3>
            <p className="text-gray-700 mb-4">
              Located near Branch Brook Park and Silver Lake. Easy access via Belleville Turnpike or
              Washington Avenue. We speak your language - services available in multiple languages.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From Belleville Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Branch Brook Park</li>
                  <li>• 3 min from Silver Lake</li>
                  <li>• 7 min from Hendricks Field</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Airport Access:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 15 min to Newark Airport (EWR)</li>
                  <li>• 20 min to Teterboro Airport</li>
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
