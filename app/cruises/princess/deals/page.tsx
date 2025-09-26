import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, Mail, Star, Clock, Ship, MapPin, Calendar, Tag, Award } from 'lucide-react'
import { getCruiseLineBySlug, getDealsByCruiseLine } from '@/lib/data/cruise-lines'

export const metadata: Metadata = {
  title: 'Princess Cruises Deals 2025-2026 | Princess Plus Included | Best Rates',
  description:
    'Exclusive Princess Cruises deals with Princess Plus included. Exceptional rates on Alaska, Caribbean, Europe cruises. Complimentary drinks, WiFi, gratuities. 3rd & 4th guests sail free. Call 833-874-1019.',
  keywords:
    'Princess cruise deals, Princess Plus deals, Princess discounts 2026, Alaska cruise deals, Caribbean cruise deals, Princess promotions, MedallionClass deals, cruise specials',
  openGraph: {
    title: 'Princess Cruises Deals - Exclusive Group Rates + Princess Plus Included',
    description:
      'Exclusive Princess deals with Princess Plus amenities included. Limited time offers on Alaska, Caribbean, and worldwide cruises.',
    url: 'https://nexttripanywhere.com/cruises/princess/deals',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/princess-deals-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Princess Cruises Deals',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/princess/deals',
  },
}

export default function PrincessDealsPage() {
  const cruiseLine = getCruiseLineBySlug('princess')
  const allDeals = getDealsByCruiseLine('princess')

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
        name: 'Princess Cruises Deals',
        description: 'Exclusive Princess cruise deals with Princess Plus included',
        url: 'https://nexttripanywhere.com/cruises/princess/deals',
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
          url: 'https://nexttripanywhere.com/cruises/princess/deals',
          validFrom: new Date().toISOString(),
          priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })),
      },
    ],
  }

  return (
    <>
      <Script
        id="princess-deals-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-teal-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
              <Tag className="w-4 h-4" />
              LIMITED TIME: 40% OFF + Princess Plus Included
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Princess Cruises Deals
              <span className="block text-3xl md:text-4xl mt-4 text-teal-300">
                Princess Plus Included on Every Sailing
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {allDeals.length}+ exclusive offers with drinks, WiFi, and gratuities included
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">Best</div>
                <div className="text-sm">Available Rates</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">Plus</div>
                <div className="text-sm">Premium Value</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">Free</div>
                <div className="text-sm">3rd & 4th Guests</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">{allDeals.length}</div>
                <div className="text-sm">Active Deals</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call 833-874-1019 Now
              </a>
              <Link
                href="/cruises/princess"
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
              >
                Learn About Princess
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Princess Plus Value Bar */}
      <section className="bg-gradient-to-r from-teal-700 to-blue-800 text-white py-6 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="font-bold text-lg">PRINCESS PLUS INCLUDED:</span>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">📶 WiFi</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🍹 Drinks</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">💵 Gratuities</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🍰 Desserts</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🏋️ Fitness</span>
            </div>
            <a
              href="tel:+18338741019"
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-4 py-2 rounded-full font-semibold transition-colors animate-pulse"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* Limited Time Deals Section */}
      {limitedTimeDeals.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-yellow-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-bounce">
                <Clock className="w-4 h-4" />
                LIMITED TIME OFFERS - BOOK TODAY!
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Exclusive Princess Flash Sale
              </h2>
              <p className="text-xl text-gray-600">
                Princess Plus included on all sailings - incredible value!
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
                  <div className="bg-gradient-to-r from-teal-600 to-blue-700 text-white p-4">
                    <h3 className="text-xl font-bold">{deal.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">{deal.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Ship className="w-4 h-4 text-teal-600" />
                        <span className="text-sm">{deal.ship}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-teal-600" />
                        <span className="text-sm">{deal.departurePort}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-teal-600" />
                        <span className="text-sm">{deal.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-teal-600" />
                        <span className="text-sm">{deal.departureDate}</span>
                      </div>
                    </div>

                    <div className="bg-teal-50 rounded-lg p-3 mb-4">
                      <div className="text-xs font-semibold text-teal-900 mb-2">
                        PRINCESS PLUS INCLUDES:
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
                          <div className="text-3xl font-bold text-teal-700">${deal.price}</div>
                          <div className="text-green-600 font-bold">Save ${deal.savings}!</div>
                        </div>
                        <a
                          href="tel:+18338741019"
                          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
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
              All Princess Cruise Deals
            </h2>
            <p className="text-xl text-gray-600">
              Princess Plus included on every sailing - exceptional value guaranteed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {regularDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-blue-800 to-teal-700 text-white p-4">
                  <h3 className="text-xl font-bold">{deal.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{deal.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Ship className="w-4 h-4 text-teal-600" />
                      <span className="text-sm">{deal.ship}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-teal-600" />
                      <span className="text-sm">{deal.departurePort}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-teal-600" />
                      <span className="text-sm">{deal.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      <span className="text-sm">{deal.departureDate}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="text-xs font-semibold text-blue-900 mb-2">INCLUDED PERKS:</div>
                    <ul className="text-xs space-y-1">
                      {deal.perks.slice(0, 3).map((perk, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span className="text-gray-700">{perk}</span>
                        </li>
                      ))}
                      {deal.perks.length > 3 && (
                        <li className="text-teal-600 font-semibold">
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
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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
      <section className="py-16 bg-gradient-to-br from-blue-900 to-teal-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Book Princess With Next Trip Anywhere?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-10 h-10 text-yellow-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Best Price Guarantee</h3>
                <p className="text-blue-100">
                  Exclusive group rates and Princess Plus deals you won't find online
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-yellow-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Elite Status Benefits</h3>
                <p className="text-blue-100">
                  Captain's Circle perks maximized with priority boarding and cabin selection
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-yellow-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Princess Specialists</h3>
                <p className="text-blue-100">
                  Expert knowledge of every ship, destination, and MedallionClass feature
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-8 mt-12">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-yellow-300 mb-2">
                  {cruiseLine.rating.value} ★★★★★
                </div>
                <div className="text-blue-100">
                  Rated by {cruiseLine.rating.count.toLocaleString()} Princess cruisers
                </div>
              </div>
              <div className="text-center">
                <p className="text-xl mb-6">
                  Don't miss these Princess Plus deals - limited inventory!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+18338741019"
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
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
            <h2>Princess Cruises Deals - Maximum Value with Princess Plus</h2>
            <p>
              Our exclusive Princess Cruises deals combine the best promotional rates with Princess
              Plus included on every sailing. With exceptional group rates plus the inclusive
              Princess Plus package with incredible value, these offers represent exceptional value
              in premium cruising.
            </p>

            <h3>Understanding Princess Plus Value</h3>
            <p>
              Princess Plus transforms your cruise into an all-inclusive experience. The package
              includes WiFi (one device), beverages including alcohol, crew gratuities, premium
              desserts (2 per day), fitness classes, and room service delivery. When you calculate
              the daily value, Princess Plus provides exceptional value throughout your cruise!
            </p>

            <h3>Current Princess Promotions</h3>
            <ul>
              <li>Princess Plus included on all cruises (exceptional value)</li>
              <li>3rd & 4th guests sail free on select sailings</li>
              <li>Exclusive group rates available</li>
              <li>Complimentary room location upgrades</li>
              <li>Flexible deposit options</li>
              <li>Military, first responder, and past guest discounts</li>
              <li>Captain's Circle loyalty benefits</li>
            </ul>

            <h3>Alaska Cruise Excellence</h3>
            <p>
              Princess is the undisputed leader in Alaska cruising with more glacier viewing
              experiences, longer scenic cruising, and exclusive Discovery and Animal Planet
              programs. Our Alaska deals include the best cabin locations for wildlife viewing,
              priority tender access in ports like Ketchikan and Sitka, and specialty dining
              reservations for Alaska seafood experiences.
            </p>

            <h3>Book Your Princess Cruise Today</h3>
            <p>
              These Princess deals have limited availability, especially for popular Alaska summer
              sailings and holiday Caribbean cruises. With Princess Plus included and 3rd/4th guests
              often sailing free, the value is unprecedented. Our Princess specialists monitor
              prices daily and will automatically adjust your fare if rates drop. Contact us today
              at 833-874-1019 to secure these exceptional Princess Cruise deals.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
