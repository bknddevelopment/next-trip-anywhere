/**
 * Caribbean Cruises Landing Page
 * High-traffic page targeting 60.5K monthly searches
 * SEO-optimized with comprehensive content and local schema markup
 */

import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { caribbeanCruise as caribbeanCruiseData } from '@/lib/data/cruise-destinations'
import { TrustBar, DetailedTrustSection } from '@/components/ui/TrustSignals'
import { InternalLinks, getRecommendedLinks } from '@/components/seo/InternalLinks'

// Lazy load non-critical components
const OptimizedImage = dynamic(() => import('@/components/ui/OptimizedImage'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
})

// Generate metadata for SEO
export const metadata: Metadata = {
  title: caribbeanCruiseData.metaTitle,
  description: caribbeanCruiseData.metaDescription,
  keywords: [
    'Caribbean cruises',
    'Caribbean cruise deals',
    'Eastern Caribbean cruises',
    'Western Caribbean cruises',
    'Southern Caribbean cruises',
    'Caribbean cruise packages',
    'best Caribbean cruises',
    'Caribbean cruise lines',
    'Caribbean islands cruise',
    'tropical cruises',
    'beach cruises',
    'all inclusive Caribbean cruises',
  ].join(', '),
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/caribbean',
  },
  openGraph: {
    title: caribbeanCruiseData.metaTitle,
    description: caribbeanCruiseData.metaDescription,
    url: 'https://nexttripanywhere.com/cruises/caribbean',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
    images: [
      {
        url: '/images/cruises/caribbean-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Caribbean Cruise Paradise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: caribbeanCruiseData.metaTitle,
    description: caribbeanCruiseData.metaDescription,
    images: ['/images/cruises/caribbean-hero.jpg'],
  },
}

// Service card component
const ServiceCard = ({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="text-4xl mb-4 text-center">{icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-blue-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

// Itinerary card component
const ItineraryCard = ({ itinerary }: { itinerary: any }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
      <h3 className="text-xl font-semibold">{itinerary.name}</h3>
      <p className="text-blue-100">{itinerary.duration}</p>
    </div>
    <div className="p-6">
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Ports of Call:</p>
        <p className="text-gray-800">{itinerary.ports.join(' → ')}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Highlights:</p>
        <ul className="text-gray-800 text-sm list-disc list-inside">
          {itinerary.highlights.map((highlight: string, idx: number) => (
            <li key={idx}>{highlight}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Best For:</p>
        <div className="flex flex-wrap gap-2">
          {itinerary.bestFor.map((item: string, idx: number) => (
            <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {item}
            </span>
          ))}
        </div>
      </div>
      {itinerary.startingPrice && (
        <div className="border-t pt-4">
          <p className="text-2xl font-bold text-orange-500">{itinerary.startingPrice}</p>
          <p className="text-sm text-gray-600">per person</p>
        </div>
      )}
      <Link
        href="/contact"
        className="mt-4 block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Check Availability
      </Link>
    </div>
  </div>
)

export default function CaribbeanCruisePage() {
  // Schema markup for SEO
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        '@id': 'https://nexttripanywhere.com/#organization',
        name: 'Next Trip Anywhere',
        url: 'https://nexttripanywhere.com',
        telephone: '+1-833-874-1019',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '185 Franklin Ave',
          addressLocality: 'Nutley',
          addressRegion: 'NJ',
          postalCode: '07110',
          addressCountry: 'US',
        },
      },
      {
        '@type': 'TouristTrip',
        name: 'Caribbean Cruises',
        description: caribbeanCruiseData.heroDescription,
        provider: {
          '@id': 'https://nexttripanywhere.com/#organization',
        },
        touristType: 'Cruise passengers',
        itinerary: {
          '@type': 'ItemList',
          itemListElement: caribbeanCruiseData.popularPorts.map((port, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: port.name,
            description: port.description,
          })),
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://nexttripanywhere.com/cruises/caribbean',
        url: 'https://nexttripanywhere.com/cruises/caribbean',
        name: caribbeanCruiseData.metaTitle,
        description: caribbeanCruiseData.metaDescription,
        inLanguage: 'en-US',
        isPartOf: {
          '@id': 'https://nexttripanywhere.com/#website',
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://nexttripanywhere.com',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Cruises',
              item: 'https://nexttripanywhere.com/cruises',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Caribbean Cruises',
              item: 'https://nexttripanywhere.com/cruises/caribbean',
            },
          ],
        },
      },
    ],
  }

  return (
    <>
      <Script
        id="schema-caribbean-cruise"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      <main className="min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav className="bg-gray-50 py-3 px-4" aria-label="Breadcrumb">
          <div className="container mx-auto">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href="/cruises" className="text-blue-600 hover:text-blue-800">
                  Cruises
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-700" aria-current="page">
                Caribbean
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {caribbeanCruiseData.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                {caribbeanCruiseData.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18338741019"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  <span className="mr-2">📞</span> Call 833-874-1019
                </a>
                <Link
                  href="/contact"
                  className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="bg-white py-8 border-b">
          <div className="container mx-auto px-4">
            <TrustBar />
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Why Choose a Caribbean Cruise?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {caribbeanCruiseData.heroDescription}
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <ServiceCard
                  icon="🏝️"
                  title="Multiple Islands"
                  description="Visit multiple tropical destinations while unpacking only once"
                />
                <ServiceCard
                  icon="🍹"
                  title="All-Inclusive Value"
                  description="Meals, entertainment, and accommodation all in one price"
                />
                <ServiceCard
                  icon="🎭"
                  title="Endless Activities"
                  description="From beach excursions to onboard entertainment for all ages"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Caribbean Regions - Temporarily disabled until data structure is updated */}
        {/*
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Caribbean Cruise Regions</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {caribbeanCruiseData.regions?.map((region, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4">
                      <h3 className="text-xl font-semibold">{region.name}</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-4">{region.description}</p>
                      <div className="border-t pt-4">
                        <p className="text-sm font-semibold text-gray-600 mb-2">Popular Ports:</p>
                        <div className="flex flex-wrap gap-2">
                          {region.popularPorts.map((port, portIdx) => (
                            <span key={portIdx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                              {port}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        */}

        {/* Popular Itineraries - Temporarily disabled until data structure is updated */}
        {/*
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Popular Caribbean Cruise Itineraries</h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                From quick getaways to extended voyages, find the perfect Caribbean cruise for your vacation
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {caribbeanCruiseData.popularItineraries.map((itinerary, idx) => (
                  <ItineraryCard key={idx} itinerary={itinerary} />
                ))}
              </div>
            </div>
          </div>
        </section>
        */}

        {/* Cruise Lines */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Top Caribbean Cruise Lines</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caribbeanCruiseData.cruiseLines.map((line, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-3 text-blue-900">{line.name}</h3>
                    <p className="text-gray-600 mb-4">
                      Specializes in: {line.specialties.join(', ')}
                    </p>
                    {line.ships && (
                      <div className="border-t pt-4">
                        <p className="text-sm font-semibold text-gray-600 mb-2">Featured Ships:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {line.ships.map((ship, shipIdx) => (
                            <li key={shipIdx}>• {ship}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                When to Take a Caribbean Cruise
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {caribbeanCruiseData.bestTimeToVisit.map((season, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-2 text-blue-900">{season.season}</h3>
                    <p className="text-orange-500 font-semibold mb-3">{season.months.join(', ')}</p>
                    <p className="text-gray-600">{season.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Travel Tips - Temporarily disabled until data structure is updated */}
        {/*
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Caribbean Cruise Travel Tips</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-900">What to Pack</h3>
                  <ul className="space-y-3">
                    {caribbeanCruiseData.packingTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-900">Expert Tips</h3>
                  <ul className="space-y-3">
                    {caribbeanCruiseData.travelTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">💡</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Set Sail to Paradise?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let our cruise experts help you find the perfect Caribbean cruise at the best price.
              We'll handle all the details so you can focus on making memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <span className="mr-2">📞</span> Call 833-874-1019
              </a>
              <Link
                href="/contact"
                className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Start Planning Your Cruise
              </Link>
            </div>
            <p className="mt-6 text-orange-100">
              Free consultation • No booking fees • Best price guarantee
            </p>
          </div>
        </section>

        {/* Internal Links for SEO */}
        <InternalLinks sections={getRecommendedLinks('cruise', '/cruises/caribbean')} />

        {/* Trust Section */}
        <DetailedTrustSection />
      </main>
    </>
  )
}
