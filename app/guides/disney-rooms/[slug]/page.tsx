import { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { disneyRoomGuides } from '@/lib/data/disney-room-guides'
import OptimizedImage from '@/components/ui/OptimizedImage'

export async function generateStaticParams() {
  return disneyRoomGuides.map((room) => ({
    slug: room.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const room = disneyRoomGuides.find((r) => r.slug === slug)

  if (!room) {
    return {
      title: 'Disney Room Guide Not Found',
      description: 'The requested Disney room guide could not be found.',
    }
  }

  return {
    title: room.metaTitle,
    description: room.metaDescription,
    keywords: room.keywords.join(', '),
    openGraph: {
      title: room.metaTitle,
      description: room.metaDescription,
      type: 'article',
      locale: 'en_US',
      siteName: 'Next Trip Anywhere',
    },
    twitter: {
      card: 'summary_large_image',
      title: room.metaTitle,
      description: room.metaDescription,
    },
    alternates: {
      canonical: `https://nexttripanywhere.com/guides/disney-rooms/${room.slug}`,
    },
  }
}

function generateRoomSchema(room: (typeof disneyRoomGuides)[0]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `https://nexttripanywhere.com/guides/disney-rooms/${room.slug}#article`,
        headline: room.hero.headline,
        description: room.metaDescription,
        datePublished: room.lastUpdated,
        dateModified: room.lastUpdated,
        author: {
          '@type': 'Organization',
          name: 'Next Trip Anywhere',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Next Trip Anywhere',
          logo: {
            '@type': 'ImageObject',
            url: 'https://nexttripanywhere.com/logo.png',
          },
        },
      },
      {
        '@type': 'LodgingBusiness',
        '@id': `https://nexttripanywhere.com/guides/disney-rooms/${room.slug}#lodging`,
        name: room.resort,
        description: room.overview,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lake Buena Vista',
          addressRegion: 'FL',
          addressCountry: 'US',
        },
        amenityFeature: room.roomFeatures.map((feature) => ({
          '@type': 'LocationFeatureSpecification',
          name: feature,
          value: true,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: room.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://nexttripanywhere.com/#organization',
        name: 'Next Trip Anywhere',
        description: "Essex County's premier travel agency specializing in Disney vacations",
        telephone: '833-874-1019',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Newark',
          addressRegion: 'NJ',
          addressCountry: 'US',
        },
        areaServed: {
          '@type': 'Place',
          name: 'Essex County, New Jersey',
        },
      },
    ],
  }
}

export default async function DisneyRoomGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const room = disneyRoomGuides.find((r) => r.slug === slug)

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Room Guide Not Found</h1>
          <p className="mb-8">The requested Disney room guide could not be found.</p>
          <Link href="/guides" className="text-blue-600 hover:underline">
            View All Guides
          </Link>
        </div>
      </div>
    )
  }

  const schemaData = generateRoomSchema(room)

  return (
    <>
      <Script
        id="schema-disney-room"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <article className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {room.priority} PRIORITY • {room.searchVolume?.toLocaleString() || '1,000'}+
                  monthly searches
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{room.hero.headline}</h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8">{room.hero.subheadline}</p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 px-4 py-2 rounded-lg">
                  <span className="text-sm opacity-75">Resort</span>
                  <div className="font-semibold">{room.resort}</div>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg">
                  <span className="text-sm opacity-75">Room</span>
                  <div className="font-semibold">{room.roomNumber}</div>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg">
                  <span className="text-sm opacity-75">View Type</span>
                  <div className="font-semibold capitalize">{room.viewType.replace('-', ' ')}</div>
                </div>
                {room.building && (
                  <div className="bg-white/10 px-4 py-2 rounded-lg">
                    <span className="text-sm opacity-75">Building</span>
                    <div className="font-semibold">{room.building}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{room.overview}</p>
            </section>

            {/* Room Features */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Room Features & Amenities</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {room.roomFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Views */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">
                What You'll See From Room {room.roomNumber}
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">{room.views.description}</p>
                <div className="space-y-2">
                  {room.views.whatYouSee.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                {room.views.bestTimeForPhotos && (
                  <p className="mt-4 text-sm text-blue-700 font-medium">
                    📸 Best time for photos: {room.views.bestTimeForPhotos}
                  </p>
                )}
              </div>
            </section>

            {/* Location & Walking Distances */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Location & Walking Distances</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-1">To Lobby</div>
                  <div className="text-gray-700">{room.location.walkToLobby}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-1">To Pool</div>
                  <div className="text-gray-700">{room.location.walkToPool}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-1">To Dining</div>
                  <div className="text-gray-700">{room.location.walkToDining}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-1">To Transportation</div>
                  <div className="text-gray-700">{room.location.walkToTransportation}</div>
                </div>
              </div>
              <p className="mt-4 text-gray-700 italic">{room.location.proximityNotes}</p>
            </section>

            {/* Pros and Cons */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Pros & Cons of Room {room.roomNumber}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-4">Pros</h3>
                  <ul className="space-y-2">
                    {room.prosAndCons.pros.map((pro, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-600 mb-4">Cons</h3>
                  <ul className="space-y-2">
                    {room.prosAndCons.cons.map((con, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span className="text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* How to Request */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">How to Request Room {room.roomNumber}</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <ol className="space-y-3">
                  {room.howToRequest.map((step, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Alternative Rooms */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">
                Alternative Rooms If {room.roomNumber} Is Unavailable
              </h2>
              <div className="space-y-4">
                {room.alternativeRooms.map((alt, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <span className="font-semibold text-gray-900">Room {alt.roomNumber}:</span>
                    <span className="text-gray-700 ml-2">{alt.reason}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Local Tips */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Tips for Essex County Families</h2>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <ul className="space-y-3">
                  {room.localTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-500 mr-3 text-xl">💡</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {room.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Book Room {room.roomNumber}?</h2>
                <p className="text-xl mb-6">
                  Let our Disney specialists secure this exact room for your magical vacation.
                </p>
                <div className="mb-6">
                  <a
                    href="tel:833-874-1019"
                    className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
                  >
                    Call 833-874-1019 Now
                  </a>
                </div>
                <p className="text-sm opacity-90">
                  Essex County families trust Next Trip Anywhere for guaranteed room requests and
                  exclusive Disney perks.
                </p>
              </div>
            </section>

            {/* Related Content */}
            <section>
              <h2 className="text-3xl font-bold mb-6">More Disney Room Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {disneyRoomGuides
                  .filter((r) => r.slug !== room.slug)
                  .slice(0, 4)
                  .map((related) => (
                    <Link
                      key={related.slug}
                      href={`/guides/disney-rooms/${related.slug}`}
                      className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition"
                    >
                      <h3 className="font-semibold text-lg mb-2">{related.resort}</h3>
                      <p className="text-gray-600">
                        Room {related.roomNumber} • {related.building || related.category}
                      </p>
                      <p className="text-blue-600 mt-2">View Guide →</p>
                    </Link>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
