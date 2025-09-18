/**
 * Caribbean Cruises Alternate Page
 * Targeting 18.1K monthly searches with detailed destination content
 * Complementary to main Caribbean page with focus on destinations and ports
 */

import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { caribbeanCruise as caribbeanCruiseData } from '@/lib/data/cruise-destinations'

// Lazy load non-critical components
const TrustBadges = dynamic(
  () => import('@/components/ui/TrustSignals').then((mod) => ({ default: mod.TrustBadges })),
  { ssr: true }
)

// Generate metadata for SEO
export const metadata: Metadata = {
  title: 'Caribbean Cruises 2025 | Complete Guide to Island Paradise Voyages',
  description:
    'Plan your perfect Caribbean cruise with our complete guide. Eastern, Western & Southern routes, best ships, ports, excursions & insider tips. Save up to 75% - Call 833-874-1019',
  keywords: [
    'Caribbean cruises 2025',
    'Caribbean cruise vacation',
    'Caribbean cruise ports',
    'Caribbean cruise destinations',
    'Caribbean cruise excursions',
    'Caribbean cruise planning',
    'Caribbean cruise guide',
    'best Caribbean cruise itinerary',
    'Caribbean cruise tips',
    'Caribbean cruise ships',
  ].join(', '),
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/caribbean-cruises',
  },
  openGraph: {
    title: 'Caribbean Cruises 2025 | Complete Island Paradise Guide',
    description:
      'Your complete guide to Caribbean cruising. Explore ports, itineraries, ships, and exclusive deals. Expert planning assistance.',
    url: 'https://nexttripanywhere.com/cruises/caribbean-cruises',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
    images: [
      {
        url: '/images/cruises/caribbean-ports.jpg',
        width: 1200,
        height: 630,
        alt: 'Caribbean Cruise Destinations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caribbean Cruises 2025 | Complete Guide',
    description:
      'Plan your perfect Caribbean cruise. Eastern, Western & Southern routes with expert guidance.',
    images: ['/images/cruises/caribbean-ports.jpg'],
  },
}

// Port highlight card component
const PortCard = ({ port }: { port: any }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all">
    <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4">
      <h3 className="text-xl font-semibold">{port.name}</h3>
      <p className="text-teal-100">{port.country}</p>
    </div>
    <div className="p-6">
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-600 mb-2">Top Attractions:</p>
        <ul className="space-y-1">
          {port.highlights.map((highlight: string, idx: number) => (
            <li key={idx} className="flex items-start">
              <span className="text-teal-500 mr-2">•</span>
              <span className="text-gray-700 text-sm">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-600 mb-2">Popular Excursions:</p>
        <div className="space-y-1">
          {port.popularExcursions.map((excursion: string, idx: number) => (
            <div key={idx} className="bg-blue-50 rounded px-3 py-1 text-sm text-blue-700">
              {excursion}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

// FAQ component
const FAQ = ({ question, answer }: { question: string; answer: string }) => (
  <div className="border-b border-gray-200 pb-6 mb-6">
    <h3 className="text-lg font-semibold mb-3 text-blue-900">{question}</h3>
    <p className="text-gray-700 leading-relaxed">{answer}</p>
  </div>
)

export default function CaribbeanCruisesPage() {
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
      },
      {
        '@type': 'WebPage',
        '@id': 'https://nexttripanywhere.com/cruises/caribbean-cruises',
        url: 'https://nexttripanywhere.com/cruises/caribbean-cruises',
        name: 'Caribbean Cruises Complete Guide',
        description: metadata.description,
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
              name: 'Caribbean Cruises Guide',
              item: 'https://nexttripanywhere.com/cruises/caribbean-cruises',
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the best time to take a Caribbean cruise?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The best time for Caribbean cruises is December through April when the weather is perfect with low humidity and minimal rain. May and November offer great value with good weather and fewer crowds.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long are typical Caribbean cruises?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Caribbean cruises typically range from 3 to 14 days. The most popular are 7-day cruises which allow you to visit 3-5 ports. Shorter 3-5 day cruises are perfect for first-timers or quick getaways.',
            },
          },
          {
            '@type': 'Question',
            name: 'What documents do I need for a Caribbean cruise?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'U.S. citizens need a valid passport for most Caribbean cruises. Some closed-loop cruises (departing and returning to the same U.S. port) accept birth certificates and government-issued photo IDs, but a passport is strongly recommended.',
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <Script
        id="schema-caribbean-cruises"
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
                Caribbean Cruises Guide
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-teal-600 via-blue-600 to-blue-700 text-white py-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Caribbean Cruises: Complete 2025 Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Everything you need to know about cruising the Caribbean islands
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold">50+</p>
                    <p className="text-sm">Islands to Explore</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">15+</p>
                    <p className="text-sm">Cruise Lines</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">100+</p>
                    <p className="text-sm">Ships Available</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">75%</p>
                    <p className="text-sm">Savings Possible</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18338741019"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  📞 Speak to an Expert
                </a>
                <Link
                  href="/cruises/caribbean"
                  className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  View Cruise Deals
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="bg-blue-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">Quick Navigation</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <Link
                  href="#destinations"
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <span className="text-3xl mb-2 block">🏝️</span>
                  <span className="font-semibold text-blue-900">Top Destinations</span>
                </Link>
                <Link
                  href="#planning"
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <span className="text-3xl mb-2 block">📅</span>
                  <span className="font-semibold text-blue-900">Planning Guide</span>
                </Link>
                <Link
                  href="#ports"
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <span className="text-3xl mb-2 block">⚓</span>
                  <span className="font-semibold text-blue-900">Port Guides</span>
                </Link>
                <Link
                  href="#faq"
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <span className="text-3xl mb-2 block">❓</span>
                  <span className="font-semibold text-blue-900">FAQs</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Your Complete Caribbean Cruise Guide</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Caribbean cruises offer an unparalleled vacation experience, combining the
                  convenience of unpacking once with the excitement of exploring multiple tropical
                  destinations. Whether you're drawn to the pristine beaches of the Eastern
                  Caribbean, the adventure-filled ports of the Western Caribbean, or the exotic
                  beauty of the Southern Caribbean, there's a perfect cruise waiting for you.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  With over 50 islands to explore and more than 15 major cruise lines offering
                  Caribbean itineraries, the options can seem overwhelming. That's where our
                  expertise comes in. We've helped thousands of travelers find their ideal Caribbean
                  cruise, matching them with the perfect ship, itinerary, and cabin to suit their
                  preferences and budget.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  From intimate yacht-style vessels carrying 100 passengers to massive floating
                  resorts with over 6,000 guests, Caribbean cruises cater to every travel style.
                  Family-friendly ships offer water parks and kids' clubs, while adult-only vessels
                  provide sophisticated dining and serene spa experiences. Let us help you navigate
                  these choices to find your perfect match.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Deep Dive */}
        <section id="destinations" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Caribbean Cruise Destinations In-Depth
              </h2>

              {/* Region-based content temporarily disabled - data structure update needed
              {caribbeanCruiseData.regions?.map((region, idx) => (
                <div key={idx} className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6">
                    <h3 className="text-2xl font-bold mb-2">{region.name}</h3>
                    <p className="text-blue-100">{region.description}</p>
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-lg mb-4">Featured Ports of Call:</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {region.popularPorts.map((port, portIdx) => (
                        <div key={portIdx} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2">📍</span>
                            <span className="font-semibold text-gray-800">{port}</span>
                          </div>
                          <Link href="/contact" className="text-blue-600 hover:text-blue-800 text-sm">
                            Learn more →
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              */}

              {/* Use popular ports data directly instead */}
              <div className="grid md:grid-cols-2 gap-8">
                {caribbeanCruiseData.popularPorts.map((port, idx) => (
                  <PortCard
                    key={idx}
                    port={{
                      ...port,
                      highlights: port.attractions,
                      popularExcursions: ['Beach Day', 'Snorkeling', 'City Tour', 'Adventure'],
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Ports Section */}
        <section id="ports" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Popular Caribbean Ports</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {caribbeanCruiseData.popularPorts.slice(0, 4).map((port, idx) => (
                  <PortCard
                    key={idx}
                    port={{
                      ...port,
                      highlights: port.attractions,
                      popularExcursions: ['Beach Day', 'Snorkeling', 'City Tour', 'Adventure'],
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Planning Guide Section */}
        <section id="planning" className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Caribbean Cruise Planning Guide
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-900">Before You Book</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">✓</span>
                      <div>
                        <p className="font-semibold">Choose Your Region</p>
                        <p className="text-gray-600 text-sm">
                          Eastern for beaches, Western for adventure, Southern for exotic
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">✓</span>
                      <div>
                        <p className="font-semibold">Select Duration</p>
                        <p className="text-gray-600 text-sm">
                          3-5 days for quick trips, 7 days most popular, 10+ for extensive
                          exploration
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">✓</span>
                      <div>
                        <p className="font-semibold">Pick Your Ship Style</p>
                        <p className="text-gray-600 text-sm">
                          Mega-ships for activities, mid-size for balance, small for intimacy
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">✓</span>
                      <div>
                        <p className="font-semibold">Consider Cabin Type</p>
                        <p className="text-gray-600 text-sm">
                          Interior for budget, oceanview for natural light, balcony for private
                          space
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-900">Booking Tips</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">💡</span>
                      <div>
                        <p className="font-semibold">Book Early or Last Minute</p>
                        <p className="text-gray-600 text-sm">
                          Best prices 12+ months ahead or within 60 days of sailing
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">💡</span>
                      <div>
                        <p className="font-semibold">Consider Repositioning Cruises</p>
                        <p className="text-gray-600 text-sm">
                          One-way cruises offer great value in spring and fall
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">💡</span>
                      <div>
                        <p className="font-semibold">Look for Package Deals</p>
                        <p className="text-gray-600 text-sm">
                          Bundles with drinks, Wi-Fi, and gratuities save money
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">💡</span>
                      <div>
                        <p className="font-semibold">Use a Travel Agent</p>
                        <p className="text-gray-600 text-sm">
                          Expert agents find deals and perks you can't get online
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-blue-900">
                  What's Included in Your Cruise
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <span className="text-4xl mb-3 block">🛏️</span>
                    <p className="font-semibold">Accommodation</p>
                    <p className="text-sm text-gray-600">
                      Comfortable cabin with daily housekeeping
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl mb-3 block">🍽️</span>
                    <p className="font-semibold">Dining</p>
                    <p className="text-sm text-gray-600">
                      Main dining room, buffet, and casual options
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl mb-3 block">🎭</span>
                    <p className="font-semibold">Entertainment</p>
                    <p className="text-sm text-gray-600">
                      Shows, live music, movies, and activities
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl mb-3 block">🏊</span>
                    <p className="font-semibold">Amenities</p>
                    <p className="text-sm text-gray-600">Pools, fitness center, sports courts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faq" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

              <FAQ
                question="What is the best time to take a Caribbean cruise?"
                answer="The best time for Caribbean cruises is December through April when the weather is perfect with low humidity and minimal rain. This is peak season with higher prices but ideal conditions. May and November offer great value as shoulder seasons with good weather and fewer crowds. June through October is hurricane season with lower prices but higher risk of itinerary changes."
              />

              <FAQ
                question="How long are typical Caribbean cruises?"
                answer="Caribbean cruises typically range from 3 to 14 days. The most popular are 7-day cruises which allow you to visit 3-5 ports while providing a good balance of sea days and port days. Shorter 3-5 day cruises are perfect for first-timers or quick getaways, often visiting the Bahamas or Cozumel. Longer 10-14 day cruises explore the Southern Caribbean or combine multiple regions."
              />

              <FAQ
                question="What documents do I need for a Caribbean cruise?"
                answer="U.S. citizens need a valid passport for most Caribbean cruises. Some closed-loop cruises (departing and returning to the same U.S. port) accept birth certificates and government-issued photo IDs, but a passport is strongly recommended for emergencies. Non-U.S. citizens should check visa requirements for each port. All travelers should ensure documents are valid for at least 6 months after travel."
              />

              <FAQ
                question="How much does a Caribbean cruise cost?"
                answer="Caribbean cruise prices vary widely based on cruise line, ship, cabin type, and season. Budget cruises offer exceptional value for interior cabins. Mainstream lines provide great rates for balcony cabins. Luxury cruises command premium pricing. Remember to budget for gratuities, drinks, specialty dining, excursions, and other extras which can add to your total cost. Contact us for exclusive group rates and current pricing."
              />

              <FAQ
                question="What should I pack for a Caribbean cruise?"
                answer="Pack lightweight, breathable clothing including multiple swimsuits, cover-ups, and casual wear. Bring at least one formal outfit for elegant nights. Essential items include reef-safe sunscreen, comfortable walking shoes, sandals, a light jacket for air-conditioned spaces, and any medications. Don't forget a waterproof phone case, beach bag, and power strip (surge-protector free) for your cabin."
              />
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <TrustBadges />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Start Planning Your Caribbean Adventure</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              With so many options available, finding the perfect Caribbean cruise can be
              overwhelming. Let our expert cruise consultants help you navigate the choices and find
              the ideal voyage for your budget and travel style.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl font-semibold mb-4">Why Book With Us?</h3>
              <ul className="text-left space-y-3">
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Expert cruise specialists with firsthand Caribbean knowledge</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Access to exclusive deals and shipboard credits</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Free consultation and personalized recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Support before, during, and after your cruise</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                📞 Call 833-874-1019
              </a>
              <Link
                href="/contact"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Request Free Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
