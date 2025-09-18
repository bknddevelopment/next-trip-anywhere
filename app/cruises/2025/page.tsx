/**
 * 2025 Cruises Page
 * Upcoming year cruise planning with early booking incentives
 * Target: 74K searches/month for "2025 cruises"
 */

import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { get2025Cruises, CruiseDeal } from '@/lib/data/cruise-deals'

// Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  const title = '2025 Cruises | Book Early & Save | Best 2025 Cruise Deals'
  const description =
    'Plan your 2025 cruise vacation now and save! Early booking discounts, free upgrades, and best cabin selection. Caribbean, Alaska, Mediterranean cruises. Call 833-874-1019.'
  const canonical = 'https://nexttripanywhere.com/cruises/2025'

  return {
    title,
    description,
    keywords: [
      '2025 cruises',
      '2025 cruise deals',
      '2025 Caribbean cruises',
      '2025 Alaska cruises',
      '2025 Mediterranean cruises',
      'cruises in 2025',
      'best 2025 cruises',
      '2025 cruise calendar',
      '2025 cruise schedule',
      'early booking cruises 2025',
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
          url: '/images/2025-cruises-hero.jpg',
          width: 1200,
          height: 630,
          alt: '2025 Cruise Deals',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/2025-cruises-hero.jpg'],
    },
  }
}

// Service icons
const ServiceIcon = ({ icon, size = 'text-4xl' }: { icon: string; size?: string }) => (
  <span className={`${size} select-none`} role="img" aria-hidden="true">
    {icon}
  </span>
)

// 2025 Deal Card
const Deal2025Card = ({ deal }: { deal: CruiseDeal }) => {
  const monthsAway = Math.floor(
    (new Date(deal.departureDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30)
  )

  // Get month name for departure
  const departureMonth = new Date(deal.departureDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all border-2 border-blue-500 relative overflow-hidden">
      {/* Year badge */}
      <div className="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1">
        <p className="text-xs font-bold">2025 VOYAGE</p>
      </div>

      {deal.featured && (
        <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1">
          <p className="text-xs font-bold">EARLY BIRD SPECIAL</p>
        </div>
      )}

      <div className="p-6 pt-10">
        {/* Deal header */}
        <div className="mb-3">
          <h3 className="font-bold text-xl text-blue-900 mb-1">{deal.title}</h3>
          <p className="text-gray-600 text-sm">
            {deal.cruiseLine} • {deal.ship}
          </p>
        </div>

        {/* Departure timing */}
        <div className="bg-blue-50 rounded p-3 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-blue-800">Departing:</p>
              <p className="text-lg font-bold text-blue-900">{departureMonth}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Book {monthsAway} months early</p>
              <p className="text-sm font-semibold text-green-600">Save extra 10%!</p>
            </div>
          </div>
        </div>

        {/* Trip details */}
        <div className="mb-4 space-y-1 text-sm">
          <div className="flex items-center text-gray-700">
            <ServiceIcon icon="📅" size="text-base" />
            <span className="ml-2">
              {deal.duration} days • {deal.departureDate} - {deal.returnDate}
            </span>
          </div>
          <div className="flex items-center text-gray-700">
            <ServiceIcon icon="📍" size="text-base" />
            <span className="ml-2">From: {deal.departurePort}</span>
          </div>
          <div className="flex items-start text-gray-700">
            <ServiceIcon icon="🗺️" size="text-base" />
            <span className="ml-2">Visits: {deal.destinations.join(', ')}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <ServiceIcon icon="🛏️" size="text-base" />
            <span className="ml-2">{deal.cabinType} Cabin</span>
          </div>
        </div>

        {/* Early booking perks */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-600 mb-2">EARLY BOOKING BENEFITS:</p>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded">
              Best cabin selection
            </div>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded">Lowest prices</div>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded">Free upgrades</div>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded">Flexible payment</div>
          </div>
        </div>

        {/* Included perks */}
        {deal.perks && deal.perks.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-600 mb-1">INCLUDES:</p>
            <div className="flex flex-wrap gap-1">
              {deal.perks.map((perk, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {perk}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pricing */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-blue-900">Contact for Pricing</p>
              </div>
              <p className="text-green-600 font-semibold text-sm">
                Early booking savings available
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600 mb-2">Low deposits available</p>
              <a
                href="tel:+18338741019"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-semibold inline-block"
              >
                Reserve Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Month selector component
const MonthSelector = ({ selectedMonth }: { selectedMonth?: string }) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-lg mb-3">Browse 2025 Cruises by Month:</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {months.map((month) => (
          <div
            key={month}
            className={`py-2 px-3 rounded text-sm font-medium text-center ${
              selectedMonth === month ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {month.slice(0, 3)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Cruises2025Page() {
  const cruises2025 = get2025Cruises()

  // Group cruises by season
  const winterCruises = cruises2025.filter((cruise) => {
    const month = new Date(cruise.departureDate).getMonth()
    return month === 11 || month <= 1 // Dec, Jan, Feb
  })

  const springCruises = cruises2025.filter((cruise) => {
    const month = new Date(cruise.departureDate).getMonth()
    return month >= 2 && month <= 4 // Mar, Apr, May
  })

  const summerCruises = cruises2025.filter((cruise) => {
    const month = new Date(cruise.departureDate).getMonth()
    return month >= 5 && month <= 7 // Jun, Jul, Aug
  })

  const fallCruises = cruises2025.filter((cruise) => {
    const month = new Date(cruise.departureDate).getMonth()
    return month >= 8 && month <= 10 // Sep, Oct, Nov
  })

  // Schema markup for 2025 cruises
  const cruises2025Schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '2025 Cruise Deals',
    description: 'Cruise deals and packages for 2025',
    numberOfItems: cruises2025.length,
    itemListElement: cruises2025.slice(0, 10).map((deal, index) => ({
      '@type': 'Offer',
      position: index + 1,
      name: deal.title,
      price: 'Contact for pricing',
      priceCurrency: 'USD',
      availability: 'https://schema.org/PreOrder',
      availabilityStarts: deal.departureDate,
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
        id="2025-cruises-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cruises2025Schema),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Breadcrumb */}
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
                2025
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-16">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur rounded-full mb-4">
                <ServiceIcon icon="📅" size="text-5xl" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">2025 Cruise Collection</h1>
              <p className="text-2xl mb-4 text-yellow-300 font-semibold">
                Book Early for Best Prices & Cabin Selection
              </p>
              <p className="text-lg mb-8 text-white/90">
                Plan your 2025 adventure with {cruises2025.length} incredible voyages. Early booking
                provides best rates plus complimentary upgrades!
              </p>

              {/* Benefits badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
                  <ServiceIcon icon="✨" size="text-lg" />
                  <span className="ml-1">Best Prices Now</span>
                </span>
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">
                  <ServiceIcon icon="🎁" size="text-lg" />
                  <span className="ml-1">Free Upgrades</span>
                </span>
                <span className="bg-purple-500 text-white px-4 py-2 rounded-full font-semibold">
                  <ServiceIcon icon="💳" size="text-lg" />
                  <span className="ml-1">Low Deposits</span>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18338741019"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg text-lg font-bold transition-colors inline-flex items-center justify-center"
                >
                  <ServiceIcon icon="📞" size="text-2xl" />
                  <span className="ml-2">Call 833-874-1019</span>
                </a>
                <Link
                  href="#deals"
                  className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Browse 2025 Cruises
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Early Booking Benefits */}
        <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <ServiceIcon icon="🎯" size="text-5xl" />
                <h2 className="text-3xl font-bold mt-4 mb-4">Why Book Your 2025 Cruise Now?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  The earlier you book, the more you save! Plus, get exclusive perks only available
                  with advance booking.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ServiceIcon icon="💰" size="text-3xl" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Lowest Prices</h3>
                  <p className="text-gray-700 mb-3">
                    Cruise lines offer their best rates 6-12 months in advance
                  </p>
                  <p className="text-green-600 font-semibold">Best available rates</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ServiceIcon icon="🛏️" size="text-3xl" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Best Cabin Choice</h3>
                  <p className="text-gray-700 mb-3">
                    Get your preferred location, deck, and cabin type
                  </p>
                  <p className="text-blue-600 font-semibold">100% Selection</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ServiceIcon icon="🎁" size="text-3xl" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Exclusive Perks</h3>
                  <p className="text-gray-700 mb-3">Free upgrades, onboard credits, and packages</p>
                  <p className="text-purple-600 font-semibold">Exceptional value</p>
                </div>
              </div>

              {/* Payment plan info */}
              <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Flexible Payment Plans</h3>
                <p className="text-gray-700 mb-6">
                  Reserve your 2025 cruise with flexible low deposits. Pay the balance closer to
                  your sail date!
                </p>
                <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  <div className="bg-gray-50 rounded p-4">
                    <p className="font-semibold">Step 1</p>
                    <p className="text-sm text-gray-600">Pay small deposit today</p>
                  </div>
                  <div className="bg-gray-50 rounded p-4">
                    <p className="font-semibold">Step 2</p>
                    <p className="text-sm text-gray-600">Optional monthly payments</p>
                  </div>
                  <div className="bg-gray-50 rounded p-4">
                    <p className="font-semibold">Step 3</p>
                    <p className="text-sm text-gray-600">Final payment 60-90 days out</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Month Selector */}
        <section className="py-8 bg-white shadow-sm" id="deals">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <MonthSelector selectedMonth="" />
            </div>
          </div>
        </section>

        {/* Winter 2025 Cruises */}
        {winterCruises.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <ServiceIcon icon="❄️" size="text-4xl" />
                  <h2 className="text-3xl font-bold mt-4 mb-4">Winter 2025 Cruises</h2>
                  <p className="text-gray-600">
                    Escape the cold with Caribbean & tropical destinations
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {winterCruises.map((deal) => (
                    <Deal2025Card key={deal.id} deal={deal} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Spring 2025 Cruises */}
        {springCruises.length > 0 && (
          <section className="py-16 bg-green-50">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <ServiceIcon icon="🌸" size="text-4xl" />
                  <h2 className="text-3xl font-bold mt-4 mb-4">Spring 2025 Cruises</h2>
                  <p className="text-gray-600">Perfect weather in the Mediterranean & Caribbean</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {springCruises.map((deal) => (
                    <Deal2025Card key={deal.id} deal={deal} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Summer 2025 Cruises */}
        {summerCruises.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <ServiceIcon icon="☀️" size="text-4xl" />
                  <h2 className="text-3xl font-bold mt-4 mb-4">Summer 2025 Cruises</h2>
                  <p className="text-gray-600">
                    Alaska, Northern Europe & Mediterranean adventures
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {summerCruises.map((deal) => (
                    <Deal2025Card key={deal.id} deal={deal} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Fall 2025 Cruises */}
        {fallCruises.length > 0 && (
          <section className="py-16 bg-orange-50">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <ServiceIcon icon="🍂" size="text-4xl" />
                  <h2 className="text-3xl font-bold mt-4 mb-4">Fall 2025 Cruises</h2>
                  <p className="text-gray-600">
                    Canada/New England foliage & shoulder season savings
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fallCruises.map((deal) => (
                    <Deal2025Card key={deal.id} deal={deal} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Popular 2025 Itineraries */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Most Popular 2025 Cruise Itineraries
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-4">Caribbean & Bahamas</h3>
                  <ul className="space-y-2 text-blue-100">
                    <li>• 7-Day Western Caribbean</li>
                    <li>• 7-Day Eastern Caribbean</li>
                    <li>• 4-Day Bahamas & Perfect Day</li>
                    <li>• 5-Day Key West & Cozumel</li>
                    <li>• 10-Day Southern Caribbean</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-4">Alaska</h3>
                  <ul className="space-y-2 text-blue-100">
                    <li>• 7-Day Inside Passage</li>
                    <li>• 7-Day Glacier Bay</li>
                    <li>• 10-Day Glacier Explorer</li>
                    <li>• 14-Day Alaska & Canada</li>
                    <li>• One-way Seattle to Alaska</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-4">Mediterranean</h3>
                  <ul className="space-y-2 text-blue-100">
                    <li>• 7-Day Western Mediterranean</li>
                    <li>• 10-Day Greek Isles</li>
                    <li>• 12-Day Italy & France</li>
                    <li>• 14-Day Holy Land</li>
                    <li>• Transatlantic Crossings</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-4">Special Interest</h3>
                  <ul className="space-y-2 text-blue-100">
                    <li>• Hawaii Island Hopping</li>
                    <li>• Northern Europe Fjords</li>
                    <li>• Asia & Japan</li>
                    <li>• Australia & New Zealand</li>
                    <li>• World Cruises (90+ days)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">2025 Cruise Booking Timeline</h2>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Now - 12 Months Before</p>
                      <p className="text-gray-600">
                        Best time to book! Lowest prices, maximum selection, early booking perks
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      !
                    </div>
                    <div>
                      <p className="font-semibold text-lg">6-12 Months Before</p>
                      <p className="text-gray-600">
                        Good selection remains, some price increases, popular dates filling
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      ⚠
                    </div>
                    <div>
                      <p className="font-semibold text-lg">3-6 Months Before</p>
                      <p className="text-gray-600">
                        Limited cabin selection, higher prices, final payment approaching
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      ×
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Less than 3 Months</p>
                      <p className="text-gray-600">
                        Very limited availability, last-minute rates (could be higher or lower)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
                  <p className="font-semibold text-blue-900 mb-2">
                    Don't Wait! Book Your 2025 Cruise Today
                  </p>
                  <p className="text-gray-700">
                    The best deals and cabins are selling fast for 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <ServiceIcon icon="🚢" size="text-5xl" />
            <h2 className="text-3xl font-bold mt-4 mb-4">Your 2025 Adventure Awaits!</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Lock in today's prices for next year's vacation. Small deposits, huge savings!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-4 rounded-lg text-lg font-bold transition-colors inline-flex items-center justify-center"
              >
                <ServiceIcon icon="📞" size="text-2xl" />
                <span className="ml-2">Call 833-874-1019</span>
              </a>
              <Link
                href="/contact"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Get 2025 Quote
              </Link>
            </div>
            <p className="mt-6 text-white/80">
              Expert planning • Best price guarantee • Flexible payments
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
