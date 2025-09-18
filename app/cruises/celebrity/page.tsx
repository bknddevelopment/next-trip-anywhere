import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, Mail, Star, Clock, Users, Ship, MapPin, Sparkles } from 'lucide-react'
import { getCruiseLineBySlug, getDealsByCruiseLine } from '@/lib/data/cruise-lines'

export const metadata: Metadata = {
  title: 'Celebrity Cruises Deals & Modern Luxury | Exclusive Rates | Next Trip Anywhere',
  description:
    'Book Celebrity Cruises with Always Included pricing. Modern luxury cruising with drinks, WiFi, tips included. Edge Series ships, Galapagos expeditions. Call 833-874-1019.',
  keywords:
    'Celebrity Cruises, Celebrity Edge, modern luxury cruises, Always Included, Celebrity deals, Edge Series, Celebrity Beyond, Galapagos cruises, luxury cruises',
  openGraph: {
    title: 'Celebrity Cruises - Modern Luxury Lives Here | Best Available Rates',
    description:
      'Experience modern luxury with Celebrity Cruises. Always Included pricing with drinks, WiFi, and tips. Revolutionary Edge Series ships.',
    url: 'https://nexttripanywhere.com/cruises/celebrity',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/celebrity-cruise-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Celebrity Cruises Ships',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/celebrity',
  },
}

export default function CelebrityCruisePage() {
  const cruiseLine = getCruiseLineBySlug('celebrity')
  const deals = getDealsByCruiseLine('celebrity')
  const featuredDeals = deals.filter((deal) => deal.featured).slice(0, 3)

  if (!cruiseLine) {
    return <div>Cruise line not found</div>
  }

  // Schema markup
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        name: 'Next Trip Anywhere - Celebrity Cruises Specialist',
        description: cruiseLine.description,
        url: 'https://nexttripanywhere.com/cruises/celebrity',
        telephone: '+1-833-874-1019',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Broad St',
          addressLocality: 'Newark',
          addressRegion: 'NJ',
          postalCode: '07102',
          addressCountry: 'US',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: cruiseLine.rating.value,
          reviewCount: cruiseLine.rating.count,
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Celebrity Always Included?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Always Included provides drinks (including premium brands), basic WiFi, and tips in your cruise fare. You can upgrade to Elevate or Indulge packages for premium WiFi, shore excursion credits, and onboard credit.',
            },
          },
          {
            '@type': 'Question',
            name: 'What makes Celebrity Edge Series special?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Edge Series features revolutionary outward-facing design, the iconic Magic Carpet platform that moves between decks, Infinite Verandas that blend indoor and outdoor spaces, and Eden - a multi-story experiential venue.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Celebrity offer Galapagos cruises?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Celebrity offers exclusive Galapagos expeditions on Celebrity Flora, Xploration, and Xpedition. These intimate ships provide naturalist-guided exploration of the Galapagos Islands with all-inclusive luxury.',
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <Script
        id="celebrity-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
              EXCLUSIVE: 75% Off 2nd Guest + Always Included
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Celebrity Cruises
              <span className="block text-3xl md:text-4xl mt-4 text-purple-300">
                Modern Luxury Lives Here
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              {cruiseLine.shortDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call 833-874-1019
              </a>
              <Link
                href="/cruises/celebrity/deals"
                className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
              >
                View Luxury Deals
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-300">{cruiseLine.fleetSize}</div>
                <div className="text-sm">Luxury Ships</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-300">{cruiseLine.rating.value}★</div>
                <div className="text-sm">Guest Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-300">Edge</div>
                <div className="text-sm">Series Innovation</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-300">All</div>
                <div className="text-sm">Inclusive</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Always Included Banner */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 text-center">
            <span className="font-bold text-lg">ALWAYS INCLUDED:</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Classic Drinks</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Basic WiFi</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Tips Included</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Room Service</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Main Dining</span>
          </div>
        </div>
      </section>

      {/* Why Celebrity Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose Celebrity Cruises?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cruiseLine.highlights.slice(0, 6).map((highlight, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl mb-4">
                  {index === 0 && '🚢'}
                  {index === 1 && '🎰'}
                  {index === 2 && '♾️'}
                  {index === 3 && '🌿'}
                  {index === 4 && '🧘'}
                  {index === 5 && '👨‍🍳'}
                </div>
                <p className="text-gray-700">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Exclusive Celebrity Cruise Deals
            </h2>
            <p className="text-xl text-gray-600">
              Modern luxury with Always Included amenities on every sailing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                {deal.limitedTime && (
                  <div className="bg-red-500 text-white text-center py-2 rounded-t-xl font-semibold">
                    LIMITED TIME OFFER
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-900">{deal.title}</h3>
                  <p className="text-gray-600 mb-4">{deal.description}</p>

                  <div className="flex items-center gap-2 mb-2">
                    <Ship className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">{deal.ship}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">{deal.departurePort}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">{deal.duration}</span>
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="text-sm text-gray-600 mb-2">Always Included:</div>
                    <ul className="text-sm space-y-1">
                      {deal.perks.slice(0, 3).map((perk, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-gray-700">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Special Offer</div>
                        <div className="text-xl font-bold text-purple-600">Exclusive Rates</div>
                        <div className="text-sm text-orange-600 font-semibold">
                          Premium value included
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/cruises/celebrity/deals"
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/cruises/celebrity/deals"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Celebrity Deals
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Edge Series Innovation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Edge Series - Revolutionary Design
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-purple-900">
                  Redefining Modern Luxury
                </h3>
                <p className="text-gray-700 mb-6">
                  Celebrity's Edge Series ships feature the most innovative design in cruising. With
                  outward-facing architecture, these ships blur the boundaries between ship and sea,
                  bringing you closer to the world around you.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                      <svg
                        className="w-4 h-4 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      <strong>Magic Carpet:</strong> Cantilevered platform that moves between decks
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                      <svg
                        className="w-4 h-4 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      <strong>Infinite Verandas:</strong> Transform your room into an open-air space
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                      <svg
                        className="w-4 h-4 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      <strong>Eden:</strong> Three-story venue with ever-changing experiences
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                      <svg
                        className="w-4 h-4 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      <strong>Rooftop Garden:</strong> Real grass lawn club with live music
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-8">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-purple-900 mb-2">
                    Award-Winning Excellence
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Celebrity has won Best Premium Cruise Line for 12 consecutive years and features
                    Michelin-starred chef partnerships
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-3xl font-bold text-purple-900 mb-1">
                      {cruiseLine.rating.value} ★★★★★
                    </div>
                    <div className="text-sm text-gray-600">
                      from {cruiseLine.rating.count.toLocaleString()} reviews
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Celebrity Fleet - {cruiseLine.fleetSize} Modern Luxury Ships
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {cruiseLine.ships.map((ship) => (
              <div
                key={ship}
                className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow border border-purple-100"
              >
                <Ship className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-800 text-sm">{ship}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Extraordinary Destinations Worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {cruiseLine.destinations.map((destination) => (
              <div
                key={destination}
                className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow text-center"
              >
                <MapPin className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className="font-medium text-gray-800">{destination}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              Exclusive Celebrity Benefits
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              More luxury and value when you book with Next Trip Anywhere
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-purple-900">Always Included Perks</h3>
                <ul className="space-y-3">
                  {cruiseLine.perks.map((perk, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-green-100 rounded-full p-1 mt-0.5">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Why Book With Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Star className="w-5 h-5 mt-0.5" />
                    <span>Celebrity Elite specialists with insider access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 mt-0.5" />
                    <span>Exclusive group rates not available online</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 mt-0.5" />
                    <span>Captain's Club benefits maximized</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5" />
                    <span>Concierge service throughout your journey</span>
                  </li>
                </ul>
                <a
                  href="tel:+18338741019"
                  className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold mt-6 hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call 833-874-1019
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Modern Luxury at Sea?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Let our Celebrity Cruises experts craft your perfect luxury escape
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+18338741019"
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call 833-874-1019
            </a>
            <a
              href="mailto:cruises@nexttripanywhere.com"
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Email for Quote
            </a>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <h2>Celebrity Cruises - Modern Luxury Lives Here</h2>
            <p>
              {cruiseLine.description} With {cruiseLine.fleetSize} award-winning ships including the
              revolutionary Edge Series, Celebrity redefines what luxury cruising means in the 21st
              century.
            </p>

            <h3>The Celebrity Difference</h3>
            <p>
              Celebrity Cruises stands apart with their unwavering commitment to modern luxury.
              Every detail is thoughtfully crafted - from partnerships with Michelin-starred chefs
              to the innovative Edge Series design that brings you closer to the sea. The Lawn Club
              features real grass at sea, while the Magic Carpet platform creates a moveable deck
              experience unlike anything else afloat.
            </p>

            <h3>Always Included - Exceptional Value</h3>
            <p>
              Celebrity's Always Included pricing revolutionizes luxury cruising by including drinks
              (including alcohol), basic WiFi, and tips in your fare. No more surprise charges or
              complicated packages to navigate. Upgrade to Elevate or Indulge packages for premium
              WiFi, shore excursion credits, onboard credit, and premium beverages. This transparent
              pricing saves hundreds of dollars compared to other luxury lines.
            </p>

            <h3>Galapagos Excellence</h3>
            <p>
              Celebrity offers the most luxurious way to explore the Galapagos Islands with three
              expedition vessels: Celebrity Flora (100 guests), Celebrity Xploration (16 guests),
              and Celebrity Xpedition (48 guests). These all-inclusive expeditions feature certified
              naturalist guides, twice-daily excursions, and all equipment. It's the perfect blend
              of adventure and luxury.
            </p>

            <h3>Book Your Celebrity Cruise Today</h3>
            <p>
              As certified Celebrity specialists, we have access to exclusive rates and perks not
              available to the general public. Our experts know every ship, suite category, and
              specialty restaurant to ensure you experience the best of modern luxury. With Always
              Included pricing and 75% off second guests on select sailings, now is the perfect time
              to experience Celebrity. Contact us at 833-874-1019 for your complimentary
              consultation.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
