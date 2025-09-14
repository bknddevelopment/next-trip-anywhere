/**
 * @fileoverview Millburn-specific travel agency page
 * @module app/travel-from-millburn/page
 *
 * Landing page optimized for Millburn, NJ residents seeking luxury and exclusive travel.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS.millburn

export const metadata: Metadata = generateTownMetadata(town)

export default function MillburnTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Elizabeth Rothschild',
      location: 'Short Hills',
      rating: 5,
      text: 'Next Trip Anywhere understands luxury travel. Our private villa in Tuscany with chef and sommelier was beyond expectations. True white-glove service.',
      destination: 'Tuscany',
    },
    {
      name: 'Robert Sterling',
      location: 'Old Short Hills',
      rating: 5,
      text: 'They arranged our Antarctic expedition with private yacht charter. The level of exclusivity and attention to detail was remarkable.',
      destination: 'Antarctica',
    },
    {
      name: 'Victoria Chen-Williams',
      location: 'Wyoming',
      rating: 5,
      text: "For our daughter's graduation, they planned an incredible Asian grand tour with Four Seasons throughout. Flawless execution.",
      destination: 'Japan, Singapore & Bali',
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

      {/* Page Content with Millburn-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Millburn-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ultra-Luxury Travel for Millburn & Short Hills
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Exclusive Access & Experiences</h3>
              <p className="text-gray-700 mb-4">
                Millburn residents expect nothing but the finest. We deliver with:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Private jet and helicopter charters</li>
                <li>• Ultra-luxury hotel suites and villas</li>
                <li>• Private island buyouts</li>
                <li>• Superyacht charters</li>
                <li>• Exclusive event access (Fashion Week, Film Festivals)</li>
                <li>• Private art and shopping experiences</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Bespoke Journey Planning</h3>
              <p className="text-gray-700 mb-4">
                Every trip is customized to your exact preferences:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Multi-destination grand tours</li>
                <li>• Milestone celebration planning</li>
                <li>• Exclusive safari experiences</li>
                <li>• Private cultural immersions</li>
                <li>• Wellness and spa retreats</li>
                <li>• Rare adventure expeditions</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Serving Millburn's Discerning Travelers</h3>
            <p className="text-gray-700 mb-4">
              Conveniently located near Short Hills Mall and Paper Mill Playhouse. We offer private
              consultations at your home or office for your convenience.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Millburn Landmarks Nearby:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Short Hills Mall</li>
                  <li>• 3 min from Paper Mill Playhouse</li>
                  <li>• 8 min from Cora Hartshorn Arboretum</li>
                  <li>• 10 min from Baltusrol Golf Club</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Exclusive Services:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Home/office consultations</li>
                  <li>• Personal shopping coordination</li>
                  <li>• Private security arrangements</li>
                  <li>• Medical tourism planning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
