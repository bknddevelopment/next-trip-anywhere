import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, Tag, Calendar, Ship, MapPin, Clock, DollarSign, Star } from 'lucide-react'
import { getDealsByCruiseLine, getCruiseLineBySlug } from '@/lib/data/cruise-lines'

export const metadata: Metadata = {
  title: 'Royal Caribbean Cruise Deals 2024-2025 | Exclusive Rates + Kids Sail Free',
  description:
    'Exclusive Royal Caribbean deals: Best group rates, kids sail free, special pricing for second guest, complimentary upgrades. Icon of the Seas, Perfect Day at CocoCay. Limited time offers - Call 833-874-1019.',
  keywords:
    'royal caribbean deals, royal caribbean sales, cruise deals 2024, kids sail free, royal caribbean discounts, icon of the seas deals, perfect day cococay deals',
  openGraph: {
    title: 'Royal Caribbean Cruise Deals - Exclusive Group Rates + Perks',
    description:
      'Limited time Royal Caribbean offers with free upgrades, onboard credits, and kids sail free. Book now for best prices.',
    url: 'https://nexttripanywhere.com/cruises/royal-caribbean/deals',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/royal-caribbean-deals.jpg',
        width: 1200,
        height: 630,
        alt: 'Royal Caribbean Cruise Deals',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/royal-caribbean/deals',
  },
}

// Get deals data
const royalCaribbean = getCruiseLineBySlug('royal-caribbean')!
const allDeals = getDealsByCruiseLine('royal-caribbean')
const featuredDeals = allDeals.filter((deal) => deal.featured)
const limitedTimeDeals = allDeals.filter((deal) => deal.limitedTime)

// Schema markup
const dealsPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Royal Caribbean Cruise Deals',
  description: 'Exclusive Royal Caribbean cruise deals and promotions',
  url: 'https://nexttripanywhere.com/cruises/royal-caribbean/deals',
  provider: {
    '@type': 'TravelAgency',
    name: 'Next Trip Anywhere',
    telephone: '+1-833-874-1019',
  },
}

// Current promotions data
const currentPromotions = [
  {
    title: 'Wave Season Sale',
    description: 'Book by March 31st',
    savings: 'Exceptional savings',
    icon: '🌊',
  },
  {
    title: 'Kids Sail Free',
    description: '3rd & 4th guests free',
    savings: 'Ages 12 & under',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    title: '60% Off 2nd Guest',
    description: 'Plus reduced deposits',
    savings: 'Select sailings',
    icon: '💰',
  },
  {
    title: 'Free Upgrades',
    description: 'Ocean View to Balcony',
    savings: 'Limited availability',
    icon: '⬆️',
  },
]

export default function RoyalCaribbeanDealsPage() {
  return (
    <>
      <Script
        id="rc-deals-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dealsPageSchema),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-orange-600 to-red-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/confetti-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-bounce">
              <Tag className="w-4 h-4" />
              LIMITED TIME OFFERS - Book by March 31st!
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Royal Caribbean Cruise Deals
            </h1>
            <p className="text-xl md:text-2xl mb-8">Exclusive Group Rates + Kids Sail Free</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
              {currentPromotions.map((promo, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-3 backdrop-blur">
                  <div className="text-2xl mb-1">{promo.icon}</div>
                  <div className="font-bold text-sm">{promo.title}</div>
                  <div className="text-xs opacity-90">{promo.savings}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call 833-874-1019 for Best Price
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer Bar */}
      <section className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 animate-pulse" />
            <span className="font-bold">FLASH SALE ENDS SOON:</span>
            <span>Extra savings per cabin + Complimentary beverage package on select sailings</span>
          </div>
        </div>
      </section>

      {/* Featured Deals Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">
              Featured Royal Caribbean Deals
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Hand-picked offers with the best value and most popular ships
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {deal.limitedTime && (
                    <div className="bg-red-500 text-white text-center py-2 text-sm font-bold">
                      LIMITED TIME OFFER - BOOK NOW!
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 text-blue-900">{deal.title}</h3>
                    <p className="text-gray-600 mb-4">{deal.description}</p>

                    {/* Price Display */}
                    <div className="bg-green-50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <span className="text-sm text-gray-500">From</span>
                          <div className="text-3xl font-bold text-green-600">${deal.price}</div>
                          <div className="text-sm text-gray-500">per person</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 line-through">
                            Was ${deal.originalPrice}
                          </div>
                          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            Save ${deal.savings}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Deal Details */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Ship className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold">Ship:</span> {deal.ship}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold">From:</span> {deal.departurePort}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold">When:</span> {deal.departureDate}
                      </div>
                    </div>

                    {/* Included Perks */}
                    <div className="border-t pt-4 mb-4">
                      <div className="font-semibold text-sm mb-2 text-blue-900">
                        Exclusive Perks:
                      </div>
                      <ul className="space-y-1">
                        {deal.perks.map((perk, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-1">
                            <span className="text-green-500">✓</span>
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-2">
                      <a
                        href="tel:+18338741019"
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-lg font-bold transition-colors"
                      >
                        Call to Book
                      </a>
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors">
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Deals Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
              All Royal Caribbean Deals & Promotions
            </h2>

            {/* Deals by Category */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-blue-900 border-b-2 border-blue-900 pb-2">
                Caribbean & Bahamas Deals
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {allDeals
                  .filter(
                    (deal) =>
                      deal.destination.includes('Caribbean') || deal.destination.includes('Bahamas')
                  )
                  .map((deal) => (
                    <div
                      key={deal.id}
                      className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-lg text-blue-900 flex-1">{deal.title}</h4>
                        {deal.limitedTime && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold ml-2">
                            LIMITED
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{deal.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-green-600">${deal.price}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${deal.originalPrice}
                          </span>
                        </div>
                        <a
                          href="tel:+18338741019"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition-colors"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Alaska Deals */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-blue-900 border-b-2 border-blue-900 pb-2">
                Alaska Cruise Deals
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {allDeals
                  .filter((deal) => deal.destination.includes('Alaska'))
                  .map((deal) => (
                    <div
                      key={deal.id}
                      className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-lg text-blue-900 flex-1">{deal.title}</h4>
                        <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                          POPULAR
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{deal.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-green-600">${deal.price}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${deal.originalPrice}
                          </span>
                        </div>
                        <a
                          href="tel:+18338741019"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition-colors"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotion Details */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
              Current Royal Caribbean Promotions
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">Wave Season Sale 2024-2025</h3>
                </div>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <strong>Best available rates:</strong> On sailings 6 nights or longer
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <strong>60% off second guest:</strong> Applies to cruise fare only
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <strong>Kids sail free:</strong> 3rd & 4th guests 12 and under
                    </div>
                  </li>
                </ul>
                <p className="text-sm text-gray-600">
                  Valid on new bookings through March 31, 2024
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">Perfect Day Bonus Package</h3>
                </div>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <strong>Generous onboard credit:</strong> For Perfect Day itineraries
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <strong>Free WiFi package:</strong> Surf & Stream for entire sailing
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <strong>Thrill Waterpark pass:</strong> 50% off for all guests
                    </div>
                  </li>
                </ul>
                <p className="text-sm text-gray-600">Must include Perfect Day at CocoCay stop</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">Group & Family Benefits</h3>
                </div>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <strong>Group rates:</strong> Book 8+ staterooms for extra savings
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <strong>Free amenities:</strong> Complimentary cocktail party
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <strong>Flexible payment:</strong> Reduced deposits for groups
                    </div>
                  </li>
                </ul>
                <p className="text-sm text-gray-600">Contact our group specialists for details</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">Crown & Anchor Member Offers</h3>
                </div>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <strong>Exclusive rates:</strong> Member-only pricing
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <strong>Double points:</strong> On select sailings
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <strong>Balcony credit:</strong> Special value for balcony bookings
                    </div>
                  </li>
                </ul>
                <p className="text-sm text-gray-600">
                  Must provide Crown & Anchor number at booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-blue-900">
              Why Our Royal Caribbean Deals Are Better
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-lg p-6 shadow">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Exclusive Group Rates</h3>
                <p className="text-gray-600">
                  Access to unadvertised group space with rates 20-40% below Royal Caribbean&apos;s
                  website
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <Tag className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Added Perks</h3>
                <p className="text-gray-600">
                  Onboard credits, free gratuities, and specialty dining not available when booking
                  direct
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <Phone className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Expert Support</h3>
                <p className="text-gray-600">
                  Crown & Anchor specialists who know which cabins to book and which to avoid
                </p>
              </div>
            </div>

            <div className="bg-blue-900 text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Save on Your Royal Caribbean Cruise?
              </h3>
              <p className="text-lg mb-6">
                Our agents are standing by with exclusive deals you won&apos;t find online
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18338741019"
                  className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call 833-874-1019
                </a>
                <Link
                  href="/cruises/royal-caribbean"
                  className="inline-flex items-center justify-center bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold transition-all"
                >
                  Back to Royal Caribbean
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
