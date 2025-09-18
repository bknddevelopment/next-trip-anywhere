import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, Mail, Star, Clock, Ship, MapPin, Calendar, Tag } from 'lucide-react'
import { getCruiseLineBySlug, getDealsByCruiseLine } from '@/lib/data/cruise-lines'

export const metadata: Metadata = {
  title: 'Norwegian Cruise Line Deals 2024-2025 | Free at Sea | Best Rates',
  description:
    'Exclusive Norwegian Cruise Line deals with Free at Sea perks. Exceptional rates on Caribbean, Alaska, Europe cruises. Complimentary drinks, WiFi, dining. Limited time offers. Call 833-874-1019.',
  keywords:
    'Norwegian cruise deals, NCL deals 2024, Free at Sea, Norwegian discounts, last minute cruises, Caribbean cruise deals, Alaska cruise deals, Norwegian promotions, cruise specials',
  openGraph: {
    title: 'Norwegian Cruise Line Deals - Exclusive Rates + Free at Sea',
    description:
      'Exclusive NCL deals with valuable Free at Sea perks included. Limited time offers on Caribbean, Alaska, and Europe cruises.',
    url: 'https://nexttripanywhere.com/cruises/norwegian/deals',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/norwegian-deals-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Norwegian Cruise Line Deals',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/norwegian/deals',
  },
}

export default function NorwegianDealsPage() {
  const cruiseLine = getCruiseLineBySlug('norwegian')
  const allDeals = getDealsByCruiseLine('norwegian')

  if (!cruiseLine) {
    return <div>Cruise line not found</div>
  }

  // Separate deals by category
  const limitedTimeDeals = allDeals.filter((deal) => deal.limitedTime)
  const regularDeals = allDeals.filter((deal) => !deal.limitedTime)

  // Schema markup for deals
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'OfferCatalog',
        name: 'Norwegian Cruise Line Deals',
        description: 'Exclusive Norwegian cruise deals with Free at Sea perks',
        url: 'https://nexttripanywhere.com/cruises/norwegian/deals',
        provider: {
          '@type': 'TravelAgency',
          name: 'Next Trip Anywhere',
          telephone: '+1-833-874-1019',
        },
        hasOfferCatalog: allDeals.map((deal) => ({
          '@type': 'Offer',
          name: deal.title,
          description: deal.description,
          price: deal.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://nexttripanywhere.com/cruises/norwegian/deals',
          validFrom: new Date().toISOString(),
          priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })),
      },
    ],
  }

  return (
    <>
      <Script
        id="norwegian-deals-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
              <Tag className="w-4 h-4" />
              FLASH SALE: Extra Savings + Double Perks
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Norwegian Cruise Line Deals
              <span className="block text-3xl md:text-4xl mt-4 text-yellow-300">
                Exclusive Rates + Free at Sea
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Exclusive offers on {allDeals.length}+ Norwegian cruises with exceptional perks
              included
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">Best</div>
                <div className="text-sm">Available Rates</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">Premium</div>
                <div className="text-sm">Perks Value</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">{allDeals.length}</div>
                <div className="text-sm">Active Deals</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">48hrs</div>
                <div className="text-sm">Sale Ends</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call 833-874-1019 Now
              </a>
              <Link
                href="/cruises/norwegian"
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
              >
                Learn About Norwegian
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Free at Sea Perks Bar */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-6 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="font-bold text-lg">FREE AT SEA INCLUDED:</span>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🍹 Open Bar</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                🍽️ Specialty Dining
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">📶 WiFi</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🎯 Shore Credits</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">✈️ Free Airfare</span>
            </div>
            <a
              href="tel:+18338741019"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-semibold transition-colors animate-pulse"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* Limited Time Deals Section */}
      {limitedTimeDeals.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-bounce">
                <Clock className="w-4 h-4" />
                LIMITED TIME OFFERS - BOOK TODAY!
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Flash Sale - Ending Soon
              </h2>
              <p className="text-xl text-gray-600">
                These exclusive rates won't last - secure your cabin now
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {limitedTimeDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 rounded-bl-lg font-bold text-sm">
                    LIMITED TIME
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
                    <h3 className="text-xl font-bold">{deal.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">{deal.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Ship className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{deal.ship}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{deal.departurePort}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{deal.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{deal.departureDate}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <div className="text-xs font-semibold text-blue-900 mb-2">
                        FREE AT SEA PERKS:
                      </div>
                      <ul className="text-xs space-y-1">
                        {deal.perks.map((perk, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span className="text-gray-700">{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-gray-400 line-through text-sm">
                            Was ${deal.originalPrice}
                          </div>
                          <div className="text-3xl font-bold text-orange-600">${deal.price}</div>
                          <div className="text-green-600 font-bold">Save ${deal.savings}!</div>
                        </div>
                        <a
                          href="tel:+18338741019"
                          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Deals Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              All Norwegian Cruise Deals
            </h2>
            <p className="text-xl text-gray-600">
              Incredible savings on every Norwegian ship and itinerary
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {regularDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
                  <h3 className="text-xl font-bold">{deal.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{deal.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Ship className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{deal.ship}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{deal.departurePort}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{deal.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{deal.departureDate}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="text-xs font-semibold text-gray-700 mb-2">INCLUDED PERKS:</div>
                    <ul className="text-xs space-y-1">
                      {deal.perks.slice(0, 3).map((perk, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span className="text-gray-700">{perk}</span>
                        </li>
                      ))}
                      {deal.perks.length > 3 && (
                        <li className="text-blue-600 font-semibold">
                          + {deal.perks.length - 3} more perks...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-gray-400 line-through text-sm">
                          ${deal.originalPrice}
                        </div>
                        <div className="text-3xl font-bold text-blue-900">${deal.price}</div>
                        <div className="text-green-600 font-semibold text-sm">
                          Save ${deal.savings}
                        </div>
                      </div>
                      <a
                        href="tel:+18338741019"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Get Quote
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Book Norwegian With Next Trip Anywhere?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-10 h-10 text-yellow-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Exclusive Group Rates</h3>
                <p className="text-blue-100">
                  Access to unadvertised group space with rates 20-50% below published prices
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-yellow-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Enhanced Free at Sea</h3>
                <p className="text-blue-100">
                  We maximize your Free at Sea perks and often add extra onboard credits
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-10 h-10 text-yellow-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Support</h3>
                <p className="text-blue-100">
                  NCL specialists handle dining, shows, and shore excursions for you
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-8 mt-12">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-yellow-300 mb-2">
                  {cruiseLine.rating.value} ★★★★★
                </div>
                <div className="text-blue-100">
                  Rated by {cruiseLine.rating.count.toLocaleString()} happy cruisers
                </div>
              </div>
              <div className="text-center">
                <p className="text-xl mb-6">Don't miss these limited-time Norwegian deals!</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+18338741019"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call 833-874-1019
                  </a>
                  <a
                    href="mailto:cruises@nexttripanywhere.com"
                    className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Email for Deals
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <h2>Norwegian Cruise Line Deals - Maximum Savings Guaranteed</h2>
            <p>
              Our exclusive Norwegian Cruise Line deals combine the best of Free at Sea promotions
              with our group rates and special perks. With exceptional savings off brochure rates
              plus valuable free perks, these offers represent the absolute best value in cruising.
            </p>

            <h3>Understanding Free at Sea</h3>
            <p>
              Norwegian's Free at Sea promotion lets you choose from valuable perks including
              unlimited open bar, specialty dining packages, shore excursion credits, free WiFi
              (250+ minutes), and even free airfare for your companion on select sailings. When
              combined with our exclusive rates, the total value is exceptional.
            </p>

            <h3>Current Deal Highlights</h3>
            <ul>
              <li>Special pricing for second guest on all sailings</li>
              <li>Free at Sea perks on every cruise</li>
              <li>Kids sail free on select dates</li>
              <li>Flexible deposit options</li>
              <li>Free cabin upgrades (subject to availability)</li>
              <li>Extra onboard credits exclusive to our agency</li>
            </ul>

            <h3>Book with Confidence</h3>
            <p>
              All our Norwegian deals include price protection - if NCL lowers the rate after you
              book, we'll automatically adjust your fare. Plus, with Norwegian's Peace of Mind
              policy, you can cancel up to 15 days before sailing for a future cruise credit. Our
              expert agents monitor your booking and ensure you get every available perk and
              discount.
            </p>

            <h3>Act Fast - Limited Availability</h3>
            <p>
              These exclusive Norwegian deals have limited inventory and time restrictions. Popular
              sailings, especially Alaska summer and holiday Caribbean cruises, sell out quickly at
              these rates. Contact our NCL specialists today at 833-874-1019 to secure your cabin
              and lock in these incredible savings.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
