import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { cruiseNeighborhoods } from '@/lib/data/cruise-neighborhoods'

export const metadata: Metadata = {
  title: 'Cruise Ship Neighborhood Guides 2025 | Cabin Selection Expert Advice',
  description:
    'Complete guides to cruise ship neighborhoods on Royal Caribbean, Carnival, Norwegian & more. Expert cabin selection advice for Cape Liberty departures. Call 833-874-1019.',
  keywords:
    'cruise ship neighborhoods, cruise cabin guide, Icon of the Seas Central Park, Wonder of the Seas Boardwalk, cruise cabin selection, Cape Liberty cruises',
  openGraph: {
    title: 'Cruise Ship Neighborhood Guides 2025 | Expert Cabin Selection',
    description:
      'Comprehensive guides to every cruise ship neighborhood. Find the perfect cabin location for your Cape Liberty departure.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/guides/cruise-neighborhoods',
  },
}

function generateHubSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://nexttripanywhere.com/guides/cruise-neighborhoods',
        name: 'Cruise Ship Neighborhood Guides',
        description: 'Complete collection of cruise ship neighborhood guides for cabin selection',
        publisher: {
          '@type': 'Organization',
          name: 'Next Trip Anywhere',
        },
        hasPart: cruiseNeighborhoods.map((n) => ({
          '@type': 'Article',
          name: `${n.neighborhoodName} on ${n.shipName}`,
          url: `https://nexttripanywhere.com/guides/cruise-neighborhoods/${n.slug}`,
        })),
      },
      {
        '@type': 'TravelAgency',
        '@id': 'https://nexttripanywhere.com/#organization',
        name: 'Next Trip Anywhere',
        description: "Essex County's premier cruise specialists",
        telephone: '833-874-1019',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Newark',
          addressRegion: 'NJ',
          addressCountry: 'US',
        },
      },
    ],
  }
}

export default function CruiseNeighborhoodsHub() {
  const schemaData = generateHubSchema()

  // Group neighborhoods by cruise line
  const neighborhoodsByCruiseLine = cruiseNeighborhoods.reduce(
    (acc, neighborhood) => {
      if (!acc[neighborhood.cruiseLine]) {
        acc[neighborhood.cruiseLine] = []
      }
      acc[neighborhood.cruiseLine].push(neighborhood)
      return acc
    },
    {} as Record<string, typeof cruiseNeighborhoods>
  )

  const cruiseLineNames: Record<string, string> = {
    'royal-caribbean': 'Royal Caribbean',
    carnival: 'Carnival Cruise Line',
    norwegian: 'Norwegian Cruise Line',
    celebrity: 'Celebrity Cruises',
    princess: 'Princess Cruises',
    msc: 'MSC Cruises',
    disney: 'Disney Cruise Line',
  }

  const cruiseLineColors: Record<string, string> = {
    'royal-caribbean': 'border-blue-500 bg-blue-50',
    carnival: 'border-red-500 bg-red-50',
    norwegian: 'border-purple-500 bg-purple-50',
    celebrity: 'border-gray-700 bg-gray-50',
    princess: 'border-teal-500 bg-teal-50',
    msc: 'border-blue-700 bg-blue-50',
    disney: 'border-red-600 bg-red-50',
  }

  return (
    <>
      <Script
        id="schema-cruise-neighborhoods-hub"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Cruise Ship Neighborhood Guides 2025
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8">
                Expert cabin selection advice for every major cruise ship neighborhood
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold">{cruiseNeighborhoods.length}+ Neighborhoods</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold">7 Cruise Lines</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold">Cape Liberty Experts</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Choosing the right neighborhood on a cruise ship can make or break your vacation
                experience. Whether you're seeking the tranquility of Central Park on Icon of the
                Seas, the family fun of Wonder's Boardwalk, or the luxury of The Haven on Norwegian
                ships, our comprehensive guides help Essex County cruisers make informed cabin
                selections for their Cape Liberty departures.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Each guide provides detailed insights into cabin categories, walking distances,
                noise levels, pros and cons, and insider booking tips specific to each neighborhood.
                Our local cruise specialists have personally inspected these neighborhoods and know
                exactly which cabins offer the best value and experience for New Jersey families.
              </p>
            </div>
          </div>
        </section>

        {/* Neighborhood Grid by Cruise Line */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {Object.entries(neighborhoodsByCruiseLine).map(([cruiseLine, neighborhoods]) => (
              <div key={cruiseLine} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span
                    className={`inline-block w-4 h-4 rounded-full mr-3 ${
                      cruiseLine === 'royal-caribbean'
                        ? 'bg-blue-500'
                        : cruiseLine === 'carnival'
                          ? 'bg-red-500'
                          : cruiseLine === 'norwegian'
                            ? 'bg-purple-500'
                            : cruiseLine === 'celebrity'
                              ? 'bg-gray-700'
                              : cruiseLine === 'princess'
                                ? 'bg-teal-500'
                                : cruiseLine === 'msc'
                                  ? 'bg-blue-700'
                                  : 'bg-red-600'
                    }`}
                  />
                  {cruiseLineNames[cruiseLine as keyof typeof cruiseLineNames]}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {neighborhoods.map((neighborhood) => (
                    <Link
                      key={neighborhood.slug}
                      href={`/guides/cruise-neighborhoods/${neighborhood.slug}`}
                      className={`block border-2 rounded-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1 ${
                        cruiseLineColors[cruiseLine as keyof typeof cruiseLineColors]
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-gray-900">
                          {neighborhood.neighborhoodName}
                        </h3>
                        {neighborhood.priority === 'HIGH' && (
                          <span className="px-2 py-1 bg-yellow-400 text-xs font-semibold rounded">
                            POPULAR
                          </span>
                        )}
                      </div>

                      <div className="text-gray-600 mb-3">
                        <div className="font-semibold">{neighborhood.shipName}</div>
                        <div className="text-sm">{neighborhood.shipClass}</div>
                      </div>

                      <div className="text-sm text-gray-500 mb-3">
                        Decks {neighborhood.deckNumbers.join(', ')}
                      </div>

                      <div className="space-y-1 mb-4">
                        {neighborhood.hero.highlights.slice(0, 2).map((highlight, index) => (
                          <div key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-green-500 mr-1">✓</span>
                            {highlight}
                          </div>
                        ))}
                      </div>

                      {neighborhood.searchVolume && (
                        <div className="text-xs text-gray-500 mb-3">
                          {neighborhood.searchVolume.toLocaleString()}+ monthly searches
                        </div>
                      )}

                      <div className="text-blue-600 font-semibold">View Complete Guide →</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Need Help Choosing the Perfect Neighborhood?
              </h2>
              <p className="text-xl mb-8 opacity-95">
                Our Cape Liberty cruise experts know every ship's best-kept secrets
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:833-874-1019"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition"
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call 833-874-1019
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition"
                >
                  Request Custom Recommendations
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Common Neighborhood Questions</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">Q:</span>
                Which neighborhoods are best for families with young children?
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">Q:</span>
                Are inward-facing neighborhoods worth the premium price?
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">Q:</span>
                How do I avoid noisy cabins near entertainment venues?
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">Q:</span>
                What's the difference between neighborhood guarantee and specific cabin selection?
              </li>
            </ul>
            <p className="mt-6 text-sm text-gray-600">
              Find answers to these questions and more in our individual neighborhood guides, or
              call our Essex County cruise specialists at 833-874-1019 for personalized advice.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
