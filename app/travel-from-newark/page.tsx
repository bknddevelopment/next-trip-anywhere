/**
 * @fileoverview Newark-specific travel agency page
 * @module app/travel-from-newark/page
 *
 * Landing page optimized for Newark, NJ residents seeking travel services.
 * Emphasizes airport convenience and diverse travel options.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS.newark

export const metadata: Metadata = generateTownMetadata(town)

export default function NewarkTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Robert Williams',
      location: 'Newark Ironbound',
      rating: 5,
      text: 'Living next to the airport, I thought I knew all about travel deals. Next Trip Anywhere found me better prices and handled everything perfectly. Their local knowledge is unmatched!',
      destination: 'Portugal',
    },
    {
      name: 'Maria Santos',
      location: 'Newark Downtown',
      rating: 5,
      text: 'They arranged our family reunion trip to Brazil with 15 people flying from Newark. Every detail was perfect, and they saved us thousands compared to booking ourselves.',
      destination: 'Brazil',
    },
    {
      name: 'James Cooper',
      location: 'Newark North Ward',
      rating: 5,
      text: 'As a frequent business traveler, I appreciate their efficiency and attention to detail. They always find me the best routes from EWR.',
      destination: 'Multiple Cities',
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

      {/* Page Content with Newark-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Newark-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Newark Residents Choose Next Trip Anywhere
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Newark Airport Advantage</h3>
              <p className="text-gray-700 mb-4">
                As a Newark resident, you have the incredible advantage of living near Newark
                Liberty International Airport (EWR). We leverage this proximity to find you the best
                direct flights and connections worldwide. Our expertise with EWR means:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Best terminal and parking recommendations</li>
                <li>• Direct flight options to 140+ destinations</li>
                <li>• United Airlines hub advantages</li>
                <li>• Quick access via NJ Transit and PATH</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Serving Newark's Diverse Community</h3>
              <p className="text-gray-700 mb-4">
                Newark is one of America's most diverse cities, and we celebrate that by offering
                specialized travel services for all communities:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Portuguese and Brazilian destinations</li>
                <li>• Latin American vacation packages</li>
                <li>• African heritage tours</li>
                <li>• Caribbean island getaways</li>
                <li>• European cultural experiences</li>
                <li>• Asian adventure travel</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Newark Neighborhoods We Serve</h3>
            <div className="grid md:grid-cols-3 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Downtown/Penn Station</h4>
                <p className="text-sm">Convenient for business travelers</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Ironbound</h4>
                <p className="text-sm">Specializing in Portugal & Brazil trips</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">North Ward</h4>
                <p className="text-sm">Family vacation packages</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Central Ward</h4>
                <p className="text-sm">Budget-friendly travel options</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">South Ward</h4>
                <p className="text-sm">Group travel specialists</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">West Ward</h4>
                <p className="text-sm">Educational & cultural tours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local landmarks and directions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-blue-50 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6">Easy to Reach from Anywhere in Newark</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">From Major Newark Landmarks:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• 5 minutes from Prudential Center</li>
                  <li>• 7 minutes from Newark Penn Station</li>
                  <li>• 10 minutes from Branch Brook Park</li>
                  <li>• 8 minutes from NJPAC</li>
                  <li>• 3 minutes from Newark Airport</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Transportation Options:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• NJ Transit bus lines: 1, 13, 25, 27, 39, 62, 67, 70</li>
                  <li>• Newark Light Rail: Orange/Grove Street stops</li>
                  <li>• PATH Train: Newark Penn Station</li>
                  <li>• Free parking available for consultations</li>
                  <li>• Virtual consultations via video call</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
