/**
 * @fileoverview South Orange-specific travel agency page
 * @module app/travel-from-south-orange/page
 *
 * Landing page optimized for South Orange, NJ residents including students and families.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS['south-orange']

export const metadata: Metadata = generateTownMetadata(town)

export default function SouthOrangeTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Emily Rodriguez',
      location: 'Seton Hall Student',
      rating: 5,
      text: 'They helped me plan an affordable spring break trip with my friends. Great deals and they understood our budget constraints. Will use them again!',
      destination: 'Cancun',
    },
    {
      name: 'Professor James Wilson',
      location: 'Montrose Park',
      rating: 5,
      text: 'Next Trip Anywhere organized our academic conference travel and a personal sabbatical tour through Europe. Excellent service for both.',
      destination: 'Oxford & Edinburgh',
    },
    {
      name: 'The Kumar Family',
      location: 'Newstead',
      rating: 5,
      text: 'With one child at Seton Hall and another in high school, we needed flexible travel plans. They found us perfect options for college visits and family vacations.',
      destination: 'California Universities Tour',
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

      {/* Page Content with South Orange-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* South Orange-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Student & Family Travel from South Orange
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Student Travel Specialists</h3>
              <p className="text-gray-700 mb-4">
                Serving Seton Hall University and South Orange students with:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Spring break packages</li>
                <li>• Study abroad programs</li>
                <li>• Student budget travel deals</li>
                <li>• Group trips for organizations</li>
                <li>• Graduation celebration trips</li>
                <li>• International student home visits</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Educational & Cultural Tours</h3>
              <p className="text-gray-700 mb-4">Perfect for South Orange's academic community:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• College tour packages</li>
                <li>• Educational family trips</li>
                <li>• Historical site tours</li>
                <li>• Language immersion programs</li>
                <li>• Academic conference travel</li>
                <li>• Cultural exchange programs</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient for South Orange</h3>
            <p className="text-gray-700 mb-4">
              Easy access from Seton Hall University and South Orange downtown. Walking distance
              from South Orange train station for NYC connections.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Near South Orange Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Seton Hall University</li>
                  <li>• 3 min from SOPAC</li>
                  <li>• 2 min from South Orange Train Station</li>
                  <li>• 5 min from Cameron Field</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Student Services:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Student discounts available</li>
                  <li>• Payment plan options</li>
                  <li>• Parent-approved bookings</li>
                  <li>• Group leader travels free</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
