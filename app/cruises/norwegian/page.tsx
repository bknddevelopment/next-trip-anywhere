import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, Mail, Star, Clock, Users, Ship, MapPin, CreditCard } from 'lucide-react'
import { getCruiseLineBySlug, getDealsByCruiseLine } from '@/lib/data/cruise-lines'

export const metadata: Metadata = {
  title: 'Norwegian Cruise Line Deals & Freestyle Cruising | Exclusive Rates | Next Trip Anywhere',
  description:
    'Book Norwegian Cruise Line with exclusive Free at Sea perks. Freestyle Cruising from all US ports - Miami, NYC, Seattle. Free drinks, WiFi, specialty dining. Expert NCL specialists. Call 833-874-1019.',
  keywords:
    'Norwegian Cruise Line, NCL cruises, Norwegian deals, Freestyle Cruising, Free at Sea, Norwegian Breakaway, Norwegian Getaway, Norwegian Bliss, Caribbean cruises, Alaska cruises, Europe cruises',
  openGraph: {
    title: 'Norwegian Cruise Line - Freestyle Cruising Deals | Best Available Rates',
    description:
      'Experience Freestyle Cruising with Norwegian. Free at Sea perks, no fixed dining times, casual atmosphere. Expert booking assistance.',
    url: 'https://nexttripanywhere.com/cruises/norwegian',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/norwegian-cruise-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Norwegian Cruise Line Ships',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/norwegian',
  },
}

export default function NorwegianCruisePage() {
  const cruiseLine = getCruiseLineBySlug('norwegian')
  const deals = getDealsByCruiseLine('norwegian')
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
        name: 'Next Trip Anywhere - Norwegian Cruise Line Specialist',
        description: cruiseLine.description,
        url: 'https://nexttripanywhere.com/cruises/norwegian',
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
            name: 'What is Norwegian Freestyle Cruising?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Freestyle Cruising means no fixed dining times, no formal dress codes, and the freedom to do whatever you want, whenever you want. Choose from up to 25 dining venues, dress casually, and enjoy entertainment on your schedule.',
            },
          },
          {
            '@type': 'Question',
            name: "What's included in Norwegian's Free at Sea promotion?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Free at Sea includes your choice of free perks: unlimited open bar, specialty dining package, shore excursion credits, free WiFi minutes, and free airfare for second guest on select sailings. The more perks you choose, the better the value.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which Norwegian ship is best for families?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Norwegian Escape, Breakaway, and Getaway are excellent for families with water slides, ropes courses, and kids clubs. The newer Prima and Viva offer go-kart tracks and the largest variety of activities at sea.',
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <Script
        id="norwegian-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
              LIMITED TIME: Free at Sea Plus - 70% Off Second Guest
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Norwegian Cruise Line
              <span className="block text-3xl md:text-4xl mt-4 text-orange-300">
                Freestyle Cruising at Its Best
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">{cruiseLine.shortDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call 833-874-1019
              </a>
              <Link
                href="/cruises/norwegian/deals"
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
              >
                View Exclusive Deals
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-orange-300">{cruiseLine.fleetSize}</div>
                <div className="text-sm">Ships Worldwide</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-orange-300">{cruiseLine.rating.value}★</div>
                <div className="text-sm">Customer Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-orange-300">50%</div>
                <div className="text-sm">Average Savings</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-orange-300">24/7</div>
                <div className="text-sm">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free at Sea Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 text-center">
            <span className="font-bold text-lg">FREE AT SEA PERKS:</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Free Open Bar</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Free Specialty Dining</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Free WiFi</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Free Shore Excursions</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Free Airfare</span>
          </div>
        </div>
      </section>

      {/* Why Norwegian Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose Norwegian Cruise Line?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cruiseLine.highlights.slice(0, 6).map((highlight, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl mb-4">
                  {index === 0 && '🎭'}
                  {index === 1 && '🏰'}
                  {index === 2 && '🎪'}
                  {index === 3 && '🏎️'}
                  {index === 4 && '🌊'}
                  {index === 5 && '🍽️'}
                </div>
                <p className="text-gray-700">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Exclusive Norwegian Cruise Deals
            </h2>
            <p className="text-xl text-gray-600">
              Exclusive rates plus Free at Sea perks with incredible value
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
                  <h3 className="text-xl font-bold mb-2 text-blue-900">{deal.title}</h3>
                  <p className="text-gray-600 mb-4">{deal.description}</p>

                  <div className="flex items-center gap-2 mb-2">
                    <Ship className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{deal.ship}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{deal.departurePort}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{deal.duration}</span>
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="text-sm text-gray-600 mb-2">Includes:</div>
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
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Special Offer</div>
                        <div className="text-xl font-bold text-green-600">Best Available Rate</div>
                        <div className="text-sm text-orange-600 font-semibold">
                          Exclusive savings included
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/cruises/norwegian/deals"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
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
              href="/cruises/norwegian/deals"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Norwegian Deals
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Fleet Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Norwegian Fleet - {cruiseLine.fleetSize} Incredible Ships
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {cruiseLine.ships.map((ship) => (
              <div
                key={ship}
                className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
              >
                <Ship className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-800">{ship}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Sail to Amazing Destinations Worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {cruiseLine.destinations.map((destination) => (
              <div
                key={destination}
                className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow text-center"
              >
                <MapPin className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <div className="font-medium text-gray-800">{destination}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              Exclusive Perks When You Book With Us
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Get more value with perks you won't find booking direct
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-blue-900">Free at Sea Perks</h3>
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

              <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Why Book With Next Trip Anywhere?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Star className="w-5 h-5 mt-0.5" />
                    <span>Expert NCL specialists with insider knowledge</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 mt-0.5" />
                    <span>Exclusive group rates saving you 20-50%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 mt-0.5" />
                    <span>Dedicated support from booking to return</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5" />
                    <span>24/7 emergency assistance while traveling</span>
                  </li>
                </ul>
                <a
                  href="tel:+18338741019"
                  className="inline-flex items-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold mt-6 hover:bg-gray-100 transition-colors"
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
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Freestyle Cruising?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Let our Norwegian Cruise Line experts help you plan the perfect voyage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+18338741019"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call 833-874-1019
            </a>
            <a
              href="mailto:cruises@nexttripanywhere.com"
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
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
            <h2>Norwegian Cruise Line - Freestyle Cruising Revolution</h2>
            <p>
              {cruiseLine.description} With {cruiseLine.fleetSize} innovative ships sailing to{' '}
              {cruiseLine.destinations.length} destinations worldwide, Norwegian offers the perfect
              cruise vacation for every traveler.
            </p>

            <h3>What Makes Norwegian Different?</h3>
            <p>
              Norwegian revolutionized the cruise industry with Freestyle Cruising, eliminating the
              rigid schedules and formal requirements of traditional cruising. Choose from up to 25
              dining venues, dress however you feel comfortable, and enjoy Broadway-caliber
              entertainment on your schedule. The Haven suite complex offers a ship-within-a-ship
              luxury experience with butler service and exclusive amenities.
            </p>

            <h3>Free at Sea - The Industry's Best Promotion</h3>
            <p>
              Norwegian's Free at Sea promotion offers incredible value with your choice of free
              perks with exceptional value. Choose from unlimited open bar, specialty dining
              packages, shore excursion credits, free WiFi, and free airfare for your second guest.
              The more perks you select, the better the value - and we can help you maximize these
              benefits.
            </p>

            <h3>Perfect for Every Type of Traveler</h3>
            <p>
              Whether you're a first-time cruiser, traveling with kids, or seeking adventure,
              Norwegian has something for everyone. Solo travelers love the Studio cabins designed
              specifically for single guests. Families enjoy the massive water parks, go-kart
              tracks, and kids' clubs. Couples appreciate the specialty restaurants and adult-only
              areas. Groups benefit from connecting cabins and flexible dining options.
            </p>

            <h3>Book Your Norwegian Cruise Today</h3>
            <p>
              As certified Norwegian Cruise Line specialists, we have access to exclusive rates,
              group space, and perks you won't find anywhere else. Our experts know every ship,
              every itinerary, and every promotion to ensure you get the absolute best value. Don't
              miss out on current promotions - contact us today at 833-874-1019 for your free
              consultation.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
