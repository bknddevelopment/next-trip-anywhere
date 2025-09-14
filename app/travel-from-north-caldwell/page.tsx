/**
 * @fileoverview North Caldwell-specific travel agency page
 * @module app/travel-from-north-caldwell/page
 *
 * Landing page optimized for North Caldwell, NJ residents seeking luxury travel experiences.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS['north-caldwell']

export const metadata: Metadata = generateTownMetadata(town)

export default function NorthCaldwellTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Victoria Blackwell',
      location: 'Mountain Avenue',
      rating: 5,
      text: 'Next Trip Anywhere understands luxury travel. Our private jet tour of European capitals was flawlessly executed with extraordinary attention to detail.',
      destination: 'European Capitals',
    },
    {
      name: 'Jonathan Reed',
      location: 'Near Green Brook CC',
      rating: 5,
      text: "They arranged an exclusive golf tour of Scotland's premier courses with luxury accommodations. Every aspect exceeded our high expectations.",
      destination: 'Scotland Golf Tour',
    },
    {
      name: 'Margaret Sinclair',
      location: 'Grandview Area',
      rating: 5,
      text: 'Their connections got us into Monaco during the Grand Prix with VIP access. This is how North Caldwell should travel!',
      destination: 'Monaco Grand Prix',
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

      {/* Page Content with North Caldwell-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* North Caldwell-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Luxury Travel from North Caldwell
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Ultra-Luxury Experiences</h3>
              <p className="text-gray-700 mb-4">
                Exclusive travel befitting North Caldwell's discerning residents:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Private jet and helicopter charters</li>
                <li>• Ultra-luxury resort reservations</li>
                <li>• Superyacht charters and sailing</li>
                <li>• Private island rentals</li>
                <li>• Bespoke safari experiences</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Exclusive Access</h3>
              <p className="text-gray-700 mb-4">
                VIP treatment at the world's most exclusive venues:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Private museum and gallery tours</li>
                <li>• Michelin-starred restaurant reservations</li>
                <li>• VIP sporting event packages</li>
                <li>• Fashion week and red carpet events</li>
                <li>• Private wine estate visits</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient from North Caldwell</h3>
            <p className="text-gray-700 mb-4">
              Located near Green Brook and Cedar Ridge Country Clubs. Easy access via Mountain
              Avenue or Central Avenue. Discreet, professional service for North Caldwell's elite.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From North Caldwell Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Green Brook Country Club</li>
                  <li>• 3 min from Cedar Ridge Country Club</li>
                  <li>• 7 min from Mountain Avenue shops</li>
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
