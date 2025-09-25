/**
 * Cheap Cruises Page
 * Budget-friendly cruise options with value-focused messaging
 * Target: 74K searches/month for "cheap cruises"
 */

import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { getCheapCruises, CruiseDeal, getDealsByPriceRange } from '@/lib/data/cruise-deals'

// Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  const title = 'Cheap Cruises | Budget-Friendly Cruise Deals | Next Trip Anywhere'
  const description =
    'Find budget-friendly cruises at exceptional rates. Caribbean, Bahamas, Mexico cruises at unbeatable value. Kids sail free on select sailings. Call 833-874-1019.'
  const canonical = 'https://nexttripanywhere.com/cruises/cheap-cruises'

  return {
    title,
    description,
    keywords: [
      'cheap cruises',
      'budget cruises',
      'affordable cruises',
      'discount cruises',
      'cheap Caribbean cruises',
      'cheap Bahamas cruises',
      'cheap Mexico cruises',
      'cruises under 500',
      'budget cruise deals',
      'inexpensive cruises',
    ].join(', '),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      locale: 'en_US',
      siteName: 'Next Trip Anywhere',
      images: [
        {
          url: '/images/cheap-cruises-hero.jpg',
          width: 1200,
          height: 630,
          alt: 'Cheap Cruise Deals',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/cheap-cruises-hero.jpg'],
    },
  }
}

// Service icons
const ServiceIcon = ({ icon, size = 'text-4xl' }: { icon: string; size?: string }) => (
  <span className={`${size} select-none`} role="img" aria-hidden="true">
    {icon}
  </span>
)

// Budget Deal Card
const BudgetDealCard = ({ deal }: { deal: CruiseDeal }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all border-2 border-green-500 relative">
      {/* Value badge */}
      {deal.isValue && (
        <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm">
          BEST
          <br />
          VALUE
        </div>
      )}

      <div className="p-6">
        {/* Deal header */}
        <div className="mb-3">
          <h3 className="font-bold text-xl text-blue-900 mb-1">{deal.title}</h3>
          <p className="text-gray-600 text-sm">
            {deal.cruiseLine} • {deal.ship}
          </p>
        </div>

        {/* Value proposition */}
        <div className="bg-green-50 border border-green-300 rounded p-3 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-green-700">Great Value</p>
              <p className="text-xs text-green-600">Budget-friendly</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Pricing:</p>
              <p className="text-xl font-bold text-blue-900">Contact Us</p>
            </div>
          </div>
        </div>

        {/* Quick details */}
        <div className="mb-4 space-y-1 text-sm">
          <div className="flex items-center text-gray-700">
            <ServiceIcon icon="📅" size="text-base" />
            <span className="ml-2">
              {deal.duration} days • {deal.departureDate}
            </span>
          </div>
          <div className="flex items-center text-gray-700">
            <ServiceIcon icon="📍" size="text-base" />
            <span className="ml-2">From: {deal.departurePort}</span>
          </div>
          <div className="flex items-start text-gray-700">
            <ServiceIcon icon="🏝️" size="text-base" />
            <span className="ml-2">{deal.destinations.join(', ')}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <ServiceIcon icon="🛏️" size="text-base" />
            <span className="ml-2">{deal.cabinType}</span>
          </div>
        </div>

        {/* What's included */}
        <div className="border-t pt-3">
          <p className="text-xs font-semibold text-gray-600 mb-2">WHAT'S INCLUDED:</p>
          <div className="grid grid-cols-2 gap-1 text-xs text-gray-700 mb-3">
            <div className="flex items-center">
              <span className="text-green-600">✓</span>
              <span className="ml-1">All Meals</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-600">✓</span>
              <span className="ml-1">Entertainment</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-600">✓</span>
              <span className="ml-1">Kids Club</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-600">✓</span>
              <span className="ml-1">Pool & Gym</span>
            </div>
          </div>

          {/* Perks if any */}
          {deal.perks && deal.perks.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-600 mb-1">BONUS PERKS:</p>
              <div className="flex flex-wrap gap-1">
                {deal.perks.map((perk, idx) => (
                  <span
                    key={idx}
                    className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action button */}
          <a
            href="tel:+18338741019"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-colors text-center font-bold block"
          >
            Book This Deal
          </a>
        </div>
      </div>
    </div>
  )
}

// Price range selector
const PriceRangeCard = ({
  range,
  count,
  selected,
}: {
  range: string
  count: number
  selected?: boolean
}) => (
  <div
    className={`p-4 rounded-lg border-2 transition-all ${
      selected ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'
    }`}
  >
    <p className="font-bold text-lg text-blue-900">{range}</p>
    <p className="text-sm text-gray-600">{count} cruises</p>
  </div>
)

export default function CheapCruisesPage() {
  const cheapCruises = getCheapCruises()
  const under300 = getDealsByPriceRange(0, 299)
  const under500 = getDealsByPriceRange(300, 499)
  const under750 = getDealsByPriceRange(500, 749)

  // Schema markup for cheap cruises
  const cheapCruisesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cheap Cruise Deals',
    description: 'Budget-friendly cruise options at exceptional rates',
    numberOfItems: cheapCruises.length,
    itemListElement: cheapCruises.slice(0, 10).map((deal, index) => ({
      '@type': 'Offer',
      position: index + 1,
      name: deal.title,
      price: 'Contact for pricing',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: deal.departureDate,
      seller: {
        '@type': 'Organization',
        name: deal.cruiseLine,
      },
    })),
  }

  return (
    <>
      {/* Schema Markup */}
      <Script
        id="cheap-cruises-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cheapCruisesSchema),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Breadcrumb */}
        <nav className="bg-gray-50 py-3 px-4" aria-label="Breadcrumb">
          <div className="container mx-auto">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li>
                <Link href="/cruises" className="text-blue-600 hover:text-blue-800">
                  Cruises
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li className="text-gray-700" aria-current="page">
                Cheap Cruises
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-700 via-teal-700 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur rounded-full mb-4">
                <ServiceIcon icon="💰" size="text-5xl" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Budget-Friendly Cruise Deals</h1>
              <p className="text-2xl mb-4 text-yellow-100 font-semibold">
                Amazing Voyages at Unbeatable Prices
              </p>
              <p className="text-lg mb-8 text-white/90">
                Discover {cheapCruises.length} budget-friendly cruises perfect for families,
                couples, and solo travelers. All the fun without breaking the bank!
              </p>

              {/* Value props */}
              <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <ServiceIcon icon="🍽️" size="text-2xl" />
                  <p className="font-semibold mt-2">All Meals Included</p>
                  <p className="text-sm text-white/80">No hidden food costs</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <ServiceIcon icon="🎭" size="text-2xl" />
                  <p className="font-semibold mt-2">Free Entertainment</p>
                  <p className="text-sm text-white/80">Shows, pools, activities</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <ServiceIcon icon="👨‍👩‍👧‍👦" size="text-2xl" />
                  <p className="font-semibold mt-2">Kids Sail Free</p>
                  <p className="text-sm text-white/80">On select sailings</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18338741019"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors inline-flex items-center justify-center"
                >
                  <ServiceIcon icon="📞" size="text-2xl" />
                  <span className="ml-2">Call 833-874-1019</span>
                </a>
                <Link
                  href="#deals"
                  className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  View All Budget Deals
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Price Comparison */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Our Cruises Cost Less</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-4 text-green-800">What You Pay For:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ServiceIcon icon="✅" size="text-lg" />
                      <span className="ml-2">Accommodation for entire trip</span>
                    </li>
                    <li className="flex items-start">
                      <ServiceIcon icon="✅" size="text-lg" />
                      <span className="ml-2">All meals & snacks (breakfast, lunch, dinner)</span>
                    </li>
                    <li className="flex items-start">
                      <ServiceIcon icon="✅" size="text-lg" />
                      <span className="ml-2">Entertainment & activities</span>
                    </li>
                    <li className="flex items-start">
                      <ServiceIcon icon="✅" size="text-lg" />
                      <span className="ml-2">Transportation to multiple destinations</span>
                    </li>
                    <li className="flex items-start">
                      <ServiceIcon icon="✅" size="text-lg" />
                      <span className="ml-2">Kids programs & childcare</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-4 text-blue-800">How We Save You Money:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ServiceIcon icon="💡" size="text-lg" />
                      <span className="ml-2">Group rates & bulk buying power</span>
                    </li>
                    <li className="flex items-start">
                      <ServiceIcon icon="💡" size="text-lg" />
                      <span className="ml-2">Exclusive deals not available online</span>
                    </li>
                    <li className="flex items-start">
                      <ServiceIcon icon="💡" size="text-lg" />
                      <span className="ml-2">Interior cabins at deep discounts</span>
                    </li>
                    <li className="flex items-start">
                      <ServiceIcon icon="💡" size="text-lg" />
                      <span className="ml-2">Older ships with same amenities</span>
                    </li>
                    <li className="flex items-start">
                      <ServiceIcon icon="💡" size="text-lg" />
                      <span className="ml-2">Repositioning & shoulder season rates</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Value comparison */}
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 text-center">
                <h3 className="font-bold text-xl mb-4">Cruise vs. Land Vacation Value</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-lg mb-2">7-Day Cruise: Incredible Value</p>
                    <p className="text-sm text-gray-600">All-inclusive pricing per day</p>
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-2">7-Day Hotel: Much Higher Cost</p>
                    <p className="text-sm text-gray-600">
                      Plus separate costs for meals & activities
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-green-600 font-bold text-lg">
                  Exceptional Value with Cruising!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Price Range Selector */}
        <section className="py-16 bg-gray-50" id="deals">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Find Cruises in Your Budget</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                <PriceRangeCard range="Budget Value" count={under300.length} selected={true} />
                <PriceRangeCard range="Great Value" count={under500.length} selected={false} />
                <PriceRangeCard range="Premium Value" count={under750.length} selected={false} />
              </div>

              {/* Deals Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cheapCruises.map((deal) => (
                  <BudgetDealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Money Saving Tips */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                How to Get the Cheapest Cruise Deals
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <ServiceIcon icon="📅" size="text-3xl" />
                  <h3 className="font-bold text-xl mt-4 mb-3">Best Times to Book</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Wave Season (Jan-Mar) for best promotions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Last minute (30-60 days out) for deep discounts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Shoulder season (Apr-May, Sep-Nov)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Repositioning cruises (one-way routes)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <ServiceIcon icon="🛏️" size="text-3xl" />
                  <h3 className="font-bold text-xl mt-4 mb-3">Cabin Selection Tips</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Interior cabins save 40-50% vs. balconies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Guarantee cabins for lowest prices</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Lower decks cost less than upper decks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Quad occupancy splits costs for families</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <ServiceIcon icon="🚢" size="text-3xl" />
                  <h3 className="font-bold text-xl mt-4 mb-3">Cruise Line Savings</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Older ships offer same fun at lower prices</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Shorter cruises (3-5 days) cost less</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Drive-to ports save on airfare</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Look for "Kids Sail Free" promotions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <ServiceIcon icon="💳" size="text-3xl" />
                  <h3 className="font-bold text-xl mt-4 mb-3">Onboard Savings</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Book packages pre-cruise for discounts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Bring your own wine (where allowed)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Explore ports on your own vs. ship tours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600">•</span>
                      <span className="ml-2">Take advantage of free dining options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Family Deals Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <ServiceIcon icon="👨‍👩‍👧‍👦" size="text-5xl" />
              <h2 className="text-3xl font-bold mt-4 mb-8">Special Family Deals</h2>

              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Kids Sail Free!</h3>
                <p className="text-gray-700 mb-6">
                  On select sailings, kids 17 and under cruise free when sharing a cabin with two
                  adults. That's exceptional value for families!
                </p>

                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="bg-green-50 rounded p-4">
                    <h4 className="font-semibold mb-2">Family-Friendly Ships Include:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Disney Cruise Line - Character meet & greets</li>
                      <li>• Royal Caribbean - Rock walls & surf simulators</li>
                      <li>• Carnival - WaterWorks water parks</li>
                      <li>• Norwegian - Go-kart tracks & laser tag</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded p-4">
                    <h4 className="font-semibold mb-2">Free Kids Programs:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Ages 3-17 supervised activities</li>
                      <li>• Teen-only lounges and clubs</li>
                      <li>• Babysitting services available</li>
                      <li>• Family game shows & movies</li>
                    </ul>
                  </div>
                </div>
              </div>

              <a
                href="tel:+18338741019"
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-700 transition-colors inline-flex items-center justify-center"
              >
                <ServiceIcon icon="📞" size="text-2xl" />
                <span className="ml-2">Get Family Cruise Quote</span>
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <ServiceIcon icon="🎉" size="text-5xl" />
            <h2 className="text-3xl font-bold mt-4 mb-4">Start Your Affordable Adventure Today!</h2>
            <p className="text-xl mb-8">
              Don't let budget hold you back from your dream cruise vacation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-bold transition-colors inline-flex items-center justify-center"
              >
                <ServiceIcon icon="📞" size="text-2xl" />
                <span className="ml-2">Call 833-874-1019</span>
              </a>
              <Link
                href="/contact"
                className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
            <p className="mt-6 text-white/80">
              No hidden fees • Best price guarantee • Payment plans available
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
