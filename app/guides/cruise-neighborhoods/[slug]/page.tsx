import { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { cruiseNeighborhoods, getRelatedNeighborhoods } from '@/lib/data/cruise-neighborhoods'
import CruiseNeighborhoodHero from '@/components/cruise-neighborhoods/CruiseNeighborhoodHero'
import CabinCategoriesTable from '@/components/cruise-neighborhoods/CabinCategoriesTable'
import DeckPlanVisualization from '@/components/cruise-neighborhoods/DeckPlanVisualization'
import AmenitiesProximity from '@/components/cruise-neighborhoods/AmenitiesProximity'
import ProsConsComparison from '@/components/cruise-neighborhoods/ProsConsComparison'
import BookingTipsSection from '@/components/cruise-neighborhoods/BookingTipsSection'
import NeighborhoodFAQ from '@/components/cruise-neighborhoods/NeighborhoodFAQ'
import CapeLibertyCTA from '@/components/cruise-neighborhoods/CapeLibertyCTA'

export async function generateStaticParams() {
  return cruiseNeighborhoods.map((neighborhood) => ({
    slug: neighborhood.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const neighborhood = cruiseNeighborhoods.find((n) => n.slug === slug)

  if (!neighborhood) {
    return {
      title: 'Cruise Neighborhood Guide Not Found',
      description: 'The requested cruise neighborhood guide could not be found.',
    }
  }

  return {
    title: neighborhood.metaTitle,
    description: neighborhood.metaDescription,
    keywords: neighborhood.keywords.join(', '),
    openGraph: {
      title: neighborhood.metaTitle,
      description: neighborhood.metaDescription,
      type: 'article',
      locale: 'en_US',
      siteName: 'Next Trip Anywhere',
      images: [
        {
          url: `https://nexttripanywhere.com/images/cruise-neighborhoods/${neighborhood.slug}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${neighborhood.neighborhoodName} on ${neighborhood.shipName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: neighborhood.metaTitle,
      description: neighborhood.metaDescription,
      images: [
        `https://nexttripanywhere.com/images/cruise-neighborhoods/${neighborhood.slug}-og.jpg`,
      ],
    },
    alternates: {
      canonical: `https://nexttripanywhere.com/guides/cruise-neighborhoods/${neighborhood.slug}`,
    },
  }
}

function generateNeighborhoodSchema(neighborhood: (typeof cruiseNeighborhoods)[0]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `https://nexttripanywhere.com/guides/cruise-neighborhoods/${neighborhood.slug}#article`,
        headline: neighborhood.hero.headline,
        description: neighborhood.metaDescription,
        datePublished: neighborhood.lastUpdated,
        dateModified: neighborhood.lastUpdated,
        author: {
          '@type': 'Organization',
          name: 'Next Trip Anywhere',
          url: 'https://nexttripanywhere.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Next Trip Anywhere',
          logo: {
            '@type': 'ImageObject',
            url: 'https://nexttripanywhere.com/logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://nexttripanywhere.com/guides/cruise-neighborhoods/${neighborhood.slug}`,
        },
      },
      {
        '@type': 'TravelAgency',
        '@id': 'https://nexttripanywhere.com/#organization',
        name: 'Next Trip Anywhere',
        description: "Essex County's premier cruise specialists with Cape Liberty expertise",
        telephone: '833-874-1019',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Newark',
          addressRegion: 'NJ',
          addressCountry: 'US',
        },
        areaServed: [
          {
            '@type': 'Place',
            name: 'Essex County, New Jersey',
          },
          {
            '@type': 'Place',
            name: 'Cape Liberty Cruise Port',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: neighborhood.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': 'https://nexttripanywhere.com/',
              name: 'Home',
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@id': 'https://nexttripanywhere.com/guides',
              name: 'Travel Guides',
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@id': 'https://nexttripanywhere.com/guides/cruise-neighborhoods',
              name: 'Cruise Neighborhoods',
            },
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@id': `https://nexttripanywhere.com/guides/cruise-neighborhoods/${neighborhood.slug}`,
              name: `${neighborhood.neighborhoodName} - ${neighborhood.shipName}`,
            },
          },
        ],
      },
      {
        '@type': 'Service',
        name: `${neighborhood.shipName} ${neighborhood.neighborhoodName} Cabin Booking`,
        provider: {
          '@type': 'Organization',
          name: 'Next Trip Anywhere',
        },
        serviceType: 'Cruise Cabin Selection and Booking',
        areaServed: {
          '@type': 'Place',
          name: 'Cape Liberty Cruise Port',
        },
        description: `Expert assistance selecting and booking ${neighborhood.neighborhoodName} cabins on ${neighborhood.shipName} departing from Cape Liberty.`,
        offers: {
          '@type': 'Offer',
          priceRange: neighborhood.cabinCategories[0]?.priceRange || '$$$$',
        },
      },
    ],
  }
}

export default async function CruiseNeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const neighborhood = cruiseNeighborhoods.find((n) => n.slug === slug)

  if (!neighborhood) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Neighborhood Guide Not Found</h1>
          <p className="mb-8">The requested cruise neighborhood guide could not be found.</p>
          <Link href="/guides" className="text-blue-600 hover:underline">
            View All Guides
          </Link>
        </div>
      </div>
    )
  }

  const schemaData = generateNeighborhoodSchema(neighborhood)
  const relatedNeighborhoods = getRelatedNeighborhoods(neighborhood.slug, 4)

  return (
    <>
      <Script
        id="schema-cruise-neighborhood"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <article className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <CruiseNeighborhoodHero neighborhood={neighborhood} />

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Overview Section */}
            <section className="mb-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6">
                  About {neighborhood.neighborhoodName} on {neighborhood.shipName}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {neighborhood.overview.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">Best For</h3>
                    <ul className="space-y-2">
                      {neighborhood.overview.bestFor.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-amber-800 mb-4">Not Ideal For</h3>
                    <ul className="space-y-2">
                      {neighborhood.overview.notIdealFor.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-900 font-medium">
                    💰 Price Comparison: {neighborhood.overview.priceComparison}
                  </p>
                </div>
              </div>
            </section>

            {/* Cabin Categories Table */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">
                Cabin Categories in {neighborhood.neighborhoodName}
              </h2>
              <CabinCategoriesTable categories={neighborhood.cabinCategories} />
            </section>

            {/* Deck Plan Visualization */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Deck Plan & Navigation</h2>
              <DeckPlanVisualization
                deckPlan={neighborhood.deckPlan}
                deckNumbers={neighborhood.deckNumbers}
                shipName={neighborhood.shipName}
              />
            </section>

            {/* Amenities Proximity */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Nearby Amenities & Walking Distances</h2>
              <AmenitiesProximity amenities={neighborhood.nearbyAmenities} />
            </section>

            {/* Pros and Cons Comparison */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">
                Pros & Cons of {neighborhood.neighborhoodName}
              </h2>
              <ProsConsComparison prosAndCons={neighborhood.prosAndCons} />
            </section>

            {/* Noise Considerations */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Noise Levels & Cabin Selection</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">🔇 Quietest Cabins</h3>
                  <ul className="space-y-2 mb-4">
                    {neighborhood.noiseConsiderations.quietAreas.map((area, index) => (
                      <li key={index} className="text-gray-700">
                        • {area}
                      </li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-green-700 mb-2">Best for Sleep:</h4>
                  <ul className="space-y-1">
                    {neighborhood.noiseConsiderations.bestCabinsForSleep.map((cabin, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {cabin}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-red-800 mb-4">🔊 Noisier Areas</h3>
                  <ul className="space-y-2 mb-4">
                    {neighborhood.noiseConsiderations.noisyAreas.map((area, index) => (
                      <li key={index} className="text-gray-700">
                        • {area}
                      </li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-red-700 mb-2">Cabins to Avoid:</h4>
                  <ul className="space-y-1">
                    {neighborhood.noiseConsiderations.avoidCabins.map((cabin, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {cabin}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Booking Tips */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">
                Insider Booking Tips for {neighborhood.neighborhoodName}
              </h2>
              <BookingTipsSection bookingTips={neighborhood.bookingTips} />
            </section>

            {/* Cape Liberty Information */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Cape Liberty Departure Information</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Embarkation Tips</h3>
                  <ul className="space-y-2">
                    {neighborhood.capeLiberty.embarkationTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">▸</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Nearby Hotels</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {neighborhood.capeLiberty.nearbyHotels.map((hotel, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg">
                        <div className="font-semibold">{hotel.name}</div>
                        <div className="text-sm text-gray-600">{hotel.distance}</div>
                        {hotel.shuttleService && (
                          <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            Shuttle Available
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Parking Information</h3>
                  <p className="text-gray-700">{neighborhood.capeLiberty.parkingInfo}</p>
                </div>
              </div>
            </section>

            {/* Local Tips for Essex County */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Tips for Essex County Cruisers</h2>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <ul className="space-y-3">
                  {neighborhood.localTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-600 text-xl mr-3">💡</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">
                Frequently Asked Questions About {neighborhood.neighborhoodName}
              </h2>
              <NeighborhoodFAQ faqs={neighborhood.faqs} />
            </section>

            {/* CTA Section */}
            <CapeLibertyCTA
              neighborhoodName={neighborhood.neighborhoodName}
              shipName={neighborhood.shipName}
            />

            {/* Related Neighborhoods */}
            {relatedNeighborhoods.length > 0 && (
              <section className="mt-12">
                <h2 className="text-3xl font-bold mb-6">Explore More Cruise Neighborhoods</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedNeighborhoods.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/guides/cruise-neighborhoods/${related.slug}`}
                      className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition hover:border-blue-300"
                    >
                      <div className="font-semibold text-lg mb-1">{related.neighborhoodName}</div>
                      <div className="text-sm text-gray-600 mb-2">{related.shipName}</div>
                      <div className="text-sm text-gray-500 capitalize">
                        {related.cruiseLine.replace('-', ' ')}
                      </div>
                      <div className="mt-3 text-blue-600 font-medium">View Guide →</div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </>
  )
}
