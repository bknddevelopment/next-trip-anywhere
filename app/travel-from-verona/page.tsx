/**
 * @fileoverview Verona-specific travel agency page
 * @module app/travel-from-verona/page
 *
 * Landing page optimized for Verona, NJ residents seeking worldwide travel adventures.
 */

import { Metadata } from 'next'
import LocalTravelPageTemplate from '@/components/local/LocalTravelPageTemplate'
import {
  generateTownMetadata,
  generateLocalBusinessSchema,
  generateLocalFAQSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/local-metadata'

const town = ESSEX_COUNTY_TOWNS.verona

export const metadata: Metadata = generateTownMetadata(town)

export default function VeronaTravelPage() {
  const businessSchema = generateLocalBusinessSchema(town)
  const faqSchema = generateLocalFAQSchema(town)

  const testimonials = [
    {
      name: 'Anthony Russo',
      location: 'Verona Park Area',
      rating: 5,
      text: 'From historic Verona to the ancient ruins of Rome! Next Trip Anywhere created an incredible Italian heritage tour that connected us to our roots.',
      destination: 'Italy Heritage Tour',
    },
    {
      name: 'Michelle Foster',
      location: 'Sunset Avenue',
      rating: 5,
      text: 'They understand what Verona families want. Our Hawaiian vacation was perfectly planned with activities for everyone, from kids to grandparents.',
      destination: 'Maui & Oahu',
    },
    {
      name: 'Dr. James Baldwin',
      location: 'Fairview Avenue',
      rating: 5,
      text: 'Outstanding service for business and leisure travel. They handle my conference trips and family vacations with equal expertise.',
      destination: 'London & Edinburgh',
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

      {/* Page Content with Verona-specific customization */}
      <LocalTravelPageTemplate town={town} testimonials={testimonials} />

      {/* Verona-specific content section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Historic Verona to Worldwide Adventures
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Heritage & Cultural Tours</h3>
              <p className="text-gray-700 mb-4">
                Verona residents appreciate history and culture. We specialize in:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• European heritage tours and ancestry trips</li>
                <li>• Historical site expeditions worldwide</li>
                <li>• Museum and art gallery tours</li>
                <li>• Cultural immersion experiences</li>
                <li>• Wine country and culinary tours</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Romance & Special Occasions</h3>
              <p className="text-gray-700 mb-4">
                Celebrating life's special moments with unforgettable travel:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Honeymoon and anniversary packages</li>
                <li>• Destination weddings planning</li>
                <li>• Romantic European getaways</li>
                <li>• Couples spa retreats</li>
                <li>• Milestone birthday celebrations</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Convenient from Verona</h3>
            <p className="text-gray-700 mb-4">
              Located near Verona Park and the Community Center. Easy access via Bloomfield Avenue
              or Lakeside Avenue. Serving the Verona community with personalized travel planning.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">From Verona Landmarks:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 5 min from Verona Park</li>
                  <li>• 3 min from Verona Community Center</li>
                  <li>• 7 min from White Rock Lake</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Airport Access:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 25 min to Newark Airport (EWR)</li>
                  <li>• 20 min to Teterboro Airport</li>
                  <li>• 45 min to JFK International</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
