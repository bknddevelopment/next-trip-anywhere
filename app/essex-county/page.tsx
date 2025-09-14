/**
 * Essex County Landing Page with LocalBusiness Schema
 * Example implementation showing how to use the Essex County schema
 */

import { Metadata } from 'next'
import Script from 'next/script'
import {
  generateEssexCountyLocalBusinessSchema,
  generateEssexCountyServiceSchema,
  ESSEX_COUNTY_TOWNS,
} from '@/lib/seo/essex-county-schema'

export const metadata: Metadata = {
  title: 'Travel Agency Essex County NJ | Next Trip Anywhere Newark Office',
  description:
    'Premier travel agency serving all of Essex County, NJ. Expert travel planning for Newark, Montclair, West Orange, Livingston and surrounding areas. Call 833-874-1019.',
  keywords:
    'travel agency essex county, newark travel agent, montclair vacation planning, west orange travel, livingston travel agency',
  alternates: {
    canonical: 'https://nexttripanywhere.com/essex-county',
  },
  openGraph: {
    title: 'Essex County Travel Agency | Next Trip Anywhere',
    description:
      'Your trusted Essex County travel experts. Newark office serving all 22 municipalities with exclusive deals on flights, cruises, and vacation packages.',
    url: 'https://nexttripanywhere.com/essex-county',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/essex-county-office.jpg',
        width: 1200,
        height: 630,
        alt: 'Next Trip Anywhere Essex County Office',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Essex County Travel Agency | Next Trip Anywhere',
    description:
      'Expert travel planning for Essex County residents. Newark office. Call 833-874-1019.',
    images: ['https://nexttripanywhere.com/images/essex-county-office.jpg'],
  },
}

export default function EssexCountyPage() {
  // Generate schemas
  const localBusinessSchema = generateEssexCountyLocalBusinessSchema()
  const serviceSchema = generateEssexCountyServiceSchema()

  // Combine into a graph
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [localBusinessSchema, serviceSchema],
  }

  return (
    <>
      {/* Inject schema markup */}
      <Script
        id="essex-county-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaGraph),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Essex County's Premier Travel Agency
              </h1>
              <p className="text-xl mb-8">
                Serving Newark, Montclair, West Orange, Livingston, and all 22 Essex County
                municipalities with expert travel planning and exclusive deals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18338741019"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Call 833-874-1019
                </a>
                <a
                  href="/book"
                  className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Book Your Trip
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Office Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Newark Office Location</h2>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Visit Our Office</h3>
                    <address className="not-italic text-gray-700 space-y-2">
                      <p>744 Broad Street, Suite 1700</p>
                      <p>Newark, NJ 07102</p>
                      <p className="pt-2">
                        <strong>Phone:</strong>{' '}
                        <a href="tel:+18338741019" className="text-blue-600 hover:underline">
                          833-874-1019
                        </a>
                      </p>
                      <p>
                        <strong>Email:</strong>{' '}
                        <a
                          href="mailto:info@nexttripanywhere.com"
                          className="text-blue-600 hover:underline"
                        >
                          info@nexttripanywhere.com
                        </a>
                      </p>
                    </address>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                    <div className="text-gray-700 space-y-1">
                      <p>
                        <strong>Monday - Friday:</strong> 6:00 AM - 11:00 PM
                      </p>
                      <p>
                        <strong>Saturday - Sunday:</strong> 7:00 AM - 10:00 PM
                      </p>
                      <p className="text-sm text-gray-600 pt-2">
                        Extended hours for your convenience. 24/7 emergency support available.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Towns We Serve */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Serving All Essex County Communities
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ESSEX_COUNTY_TOWNS.map((town) => (
                  <a
                    key={town.name}
                    href={`/travel-from-${town.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
                  >
                    <h3 className="font-semibold text-gray-800">{town.name}</h3>
                    {town.population && (
                      <p className="text-sm text-gray-600">
                        Pop: {town.population.toLocaleString()}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Travel Services</h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Flights</h3>
                  <p className="text-gray-700">
                    Exclusive deals from Newark Airport (EWR) and all major airports
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7h18M3 12h18m-9 5h9"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Cruises</h3>
                  <p className="text-gray-700">
                    Caribbean, Alaska, and European cruises from NY/NJ ports
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Packages</h3>
                  <p className="text-gray-700">
                    All-inclusive resorts, honeymoons, and custom vacation packages
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12">Why Essex County Chooses Us</h2>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">✈️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Local Expertise</h3>
                    <p className="text-gray-700">
                      Newark office with deep knowledge of Essex County travel needs
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Exclusive Deals</h3>
                    <p className="text-gray-700">
                      Access to unpublished fares and bulk discounts you won't find online
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Award-Winning Service</h3>
                    <p className="text-gray-700">
                      Best Travel Agency Essex County 2024 with 4.8★ rating
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">24/7 Support</h3>
                    <p className="text-gray-700">
                      Extended hours and emergency support whenever you need us
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Next Trip?</h2>
            <p className="text-xl mb-8">Essex County's trusted travel experts are here to help</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Call 833-874-1019
              </a>
              <a
                href="/book"
                className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Book Online
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
