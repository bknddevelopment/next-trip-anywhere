/**
 * @fileoverview Roseland-specific travel agency page
 * @module app/travel-from-roseland/page
 *
 * Landing page optimized for Roseland, NJ residents seeking smart travel planning.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS.roseland

export const metadata: Metadata = generateTownMetadata(town)

export default function RoselandTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Daniel Chen',
      location: 'Eagle Rock Avenue',
      rating: 5,
      text: 'Smart travel planning at its best! Next Trip Anywhere found us incredible deals on business class flights to Asia and luxury hotels.',
      destination: 'Singapore & Hong Kong',
    },
    {
      name: 'Rachel Cooper',
      location: 'Harrison Avenue',
      rating: 5,
      text: 'They understand that Roseland residents want value without compromising quality. Our European river cruise was sophisticated yet affordable.',
      destination: 'Danube River Cruise',
    },
    {
      name: 'Steven Martinez',
      location: 'Near Becker Park',
      rating: 5,
      text: 'Excellent planning for our multi-city European tour. They maximized our time and budget with smart routing and great hotel choices.',
      destination: 'London, Paris & Amsterdam',
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

      {/* Page Content with Roseland-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Roseland-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Roseland Residents Travel Smart</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Smart Travel Planning</h3>
              <p className="text-gray-700 mb-4">
                Intelligent travel solutions for savvy Roseland residents:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Optimal routing to maximize experiences</li>
                <li>• Shoulder season travel for better value</li>
                <li>• Loyalty program maximization</li>
                <li>• Strategic booking for best rates</li>
                <li>• Travel hacking tips and tricks</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Business & Leisure Balance</h3>
              <p className="text-gray-700 mb-4">Perfect for Roseland's professional community:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Bleisure travel planning</li>
                <li>• Corporate meeting extensions</li>
                <li>• Executive retreat packages</li>
                <li>• Workation destinations</li>
                <li>• Digital nomad hotspots</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient from Roseland</h3>
            <p className="text-gray-700 mb-4">
              Located near Becker Park and the Harrison Avenue business district. Easy access via
              Eagle Rock Avenue. Smart travel planning for intelligent Roseland residents.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From Roseland Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Becker Park</li>
                  <li>• 3 min from Roseland Free Public Library</li>
                  <li>• 7 min from Harrison Avenue shops</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Airport Access:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 25 min to Newark Airport (EWR)</li>
                  <li>• 20 min to Morristown Airport</li>
                  <li>• 25 min to Teterboro Airport</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
