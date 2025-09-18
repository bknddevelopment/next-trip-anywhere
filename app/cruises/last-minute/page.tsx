/**
 * Last Minute Cruises Page
 * Dedicated last-minute deals with urgency messaging
 * Target: 74K searches/month for "last minute cruises"
 */

import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { getLastMinuteDeals, CruiseDeal } from '@/lib/data/cruise-deals'

// Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  const title = 'Last Minute Cruise Deals | Sail Within 60 Days | Best Rates Available'
  const description =
    'Book last minute cruises departing within 60 days and save big! Caribbean, Bahamas, Mexico cruises at exceptional rates. Limited cabins available. Call 833-874-1019 now.'
  const canonical = 'https://nexttripanywhere.com/cruises/last-minute'

  return {
    title,
    description,
    keywords: [
      'last minute cruises',
      'last minute cruise deals',
      'cheap last minute cruises',
      'cruise deals last minute',
      'last minute caribbean cruises',
      'last minute bahamas cruises',
      'quick cruise getaways',
      'sail soon cruises',
      'urgent cruise deals',
      'closeout cruises',
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
          url: '/images/last-minute-cruises-hero.jpg',
          width: 1200,
          height: 630,
          alt: 'Last Minute Cruise Deals',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/last-minute-cruises-hero.jpg'],
    },
  }
}

// Service icons
const ServiceIcon = ({ icon, size = 'text-4xl' }: { icon: string; size?: string }) => (
  <span className={`${size} select-none`} role="img" aria-hidden="true">
    {icon}
  </span>
)

// Urgency Deal Card
const UrgencyDealCard = ({ deal }: { deal: CruiseDeal }) => {
  const daysUntilDeparture = Math.floor(
    (new Date(deal.departureDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all border-2 border-red-500 relative overflow-hidden">
      {/* Urgency banner */}
      <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 transform rotate-12 translate-x-3 translate-y-3">
        <p className="text-xs font-bold">SAILS IN {daysUntilDeparture} DAYS!</p>
      </div>

      <div className="p-6">
        {/* Deal header */}
        <div className="mb-3">
          <h3 className="font-bold text-xl text-blue-900 mb-1">{deal.title}</h3>
          <p className="text-gray-600 text-sm">
            {deal.cruiseLine} • {deal.ship}
          </p>
        </div>

        {/* Quick details */}
        <div className="mb-4 space-y-1">
          <div className="flex items-center text-gray-700">
            <ServiceIcon icon="📅" size="text-base" />
            <span className="ml-2 text-sm font-semibold text-red-600">
              Departs:{' '}
              {new Date(deal.departureDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center text-gray-700">
            <ServiceIcon icon="⏱️" size="text-base" />
            <span className="ml-2 text-sm">{deal.duration} days</span>
          </div>
          <div className="flex items-center text-gray-700">
            <ServiceIcon icon="📍" size="text-base" />
            <span className="ml-2 text-sm">From: {deal.departurePort}</span>
          </div>
          <div className="flex items-start text-gray-700">
            <ServiceIcon icon="🏝️" size="text-base" />
            <span className="ml-2 text-sm">
              {deal.destinations.slice(0, 2).join(', ')}
              {deal.destinations.length > 2 && ` +${deal.destinations.length - 2}`}
            </span>
          </div>
        </div>

        {/* Perks if any */}
        {deal.perks && deal.perks.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {deal.perks.slice(0, 2).map((perk, idx) => (
                <span key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {perk}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pricing and action */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-blue-900">Contact Us</p>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                  LAST MINUTE
                </span>
              </div>
            </div>
            <div className="text-right">
              {deal.availability === 'limited' && (
                <p className="text-orange-600 text-xs font-bold mb-2 animate-pulse">
                  Limited availability
                </p>
              )}
              <a
                href="tel:+18338741019"
                className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition-colors text-sm font-bold inline-block animate-pulse"
              >
                Book NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Countdown timer component
const CountdownTimer = () => {
  return (
    <div className="bg-red-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-4">
          <ServiceIcon icon="⏰" size="text-2xl" />
          <span className="font-bold text-lg">FLASH SALE ENDS IN:</span>
          <div className="flex gap-3">
            <div className="bg-white/20 px-3 py-1 rounded">
              <span className="font-mono text-xl font-bold">23</span>
              <span className="text-xs block">HRS</span>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded">
              <span className="font-mono text-xl font-bold">59</span>
              <span className="text-xs block">MIN</span>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded">
              <span className="font-mono text-xl font-bold">47</span>
              <span className="text-xs block">SEC</span>
            </div>
          </div>
          <a
            href="tel:+18338741019"
            className="bg-white text-red-600 px-4 py-2 rounded font-bold hover:bg-gray-100 transition-colors"
          >
            CALL NOW: 833-874-1019
          </a>
        </div>
      </div>
    </div>
  )
}

export default function LastMinuteCruisesPage() {
  const lastMinuteDeals = getLastMinuteDeals()

  // Group deals by departure timeframe
  const thisWeek = lastMinuteDeals.filter((deal) => {
    const days = Math.floor(
      (new Date(deal.departureDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )
    return days <= 7
  })

  const thisMonth = lastMinuteDeals.filter((deal) => {
    const days = Math.floor(
      (new Date(deal.departureDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )
    return days > 7 && days <= 30
  })

  const next60Days = lastMinuteDeals.filter((deal) => {
    const days = Math.floor(
      (new Date(deal.departureDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )
    return days > 30 && days <= 60
  })

  // Schema markup for last minute deals
  const lastMinuteSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Last Minute Cruise Deals',
    description: 'Cruise deals departing within 60 days',
    numberOfItems: lastMinuteDeals.length,
    itemListElement: lastMinuteDeals.slice(0, 5).map((deal, index) => ({
      '@type': 'Offer',
      position: index + 1,
      name: deal.title,
      price: 'Contact for pricing',
      priceCurrency: 'USD',
      availability: 'https://schema.org/LimitedAvailability',
      validThrough: deal.departureDate,
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
        id="lastminute-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(lastMinuteSchema),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-red-50 to-white">
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
                Last Minute
              </li>
            </ol>
          </div>
        </nav>

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-16">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur rounded-full mb-4 animate-bounce">
                <ServiceIcon icon="⏰" size="text-5xl" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Last Minute Cruise Deals</h1>
              <p className="text-2xl mb-4 text-yellow-300 font-semibold">
                Exceptional Rates on Cruises Departing Soon!
              </p>
              <p className="text-lg mb-8 text-white/90">
                {lastMinuteDeals.length} incredible deals sailing within the next 60 days. Limited
                cabins at these prices - book today before they're gone!
              </p>

              {/* Urgency badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold animate-pulse">
                  <ServiceIcon icon="🔥" size="text-lg" />
                  <span className="ml-1">Selling Fast!</span>
                </span>
                <span className="bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold">
                  <ServiceIcon icon="⚡" size="text-lg" />
                  <span className="ml-1">Limited Availability</span>
                </span>
                <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
                  <ServiceIcon icon="💰" size="text-lg" />
                  <span className="ml-1">Lowest Prices</span>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18338741019"
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors inline-flex items-center justify-center animate-pulse"
                >
                  <ServiceIcon icon="📞" size="text-2xl" />
                  <span className="ml-2">Call Now: 833-874-1019</span>
                </a>
                <Link
                  href="#deals"
                  className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  View All Deals
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Departing This Week - MOST URGENT */}
        {thisWeek.length > 0 && (
          <section className="py-16 bg-red-50" id="deals">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-bounce">
                    DEPARTING THIS WEEK!
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Sail Within 7 Days</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    These cruises are departing extremely soon. Grab these deals NOW before they
                    sail away!
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {thisWeek.map((deal) => (
                    <UrgencyDealCard key={deal.id} deal={deal} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Departing This Month */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                  DEPARTING THIS MONTH
                </div>
                <h2 className="text-3xl font-bold mb-4">Sail Within 30 Days</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Great last-minute deals with more cabin selection. Book now for best availability!
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {thisMonth.map((deal) => (
                  <UrgencyDealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Next 60 Days */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                  NEXT 60 DAYS
                </div>
                <h2 className="text-3xl font-bold mb-4">Sail Within 60 Days</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Still time to plan, but these deals won't last long. Secure your cabin today!
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {next60Days.map((deal) => (
                  <UrgencyDealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Book Last Minute */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Why Book Last Minute Cruises?
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <ServiceIcon icon="💸" size="text-3xl" />
                  <h3 className="font-semibold text-xl mt-4 mb-3">Incredible Savings</h3>
                  <p className="text-blue-100">
                    Cruise lines slash prices to fill remaining cabins. Save 50-70% off regular
                    rates!
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <ServiceIcon icon="🎁" size="text-3xl" />
                  <h3 className="font-semibold text-xl mt-4 mb-3">Extra Perks</h3>
                  <p className="text-blue-100">
                    Get free upgrades, onboard credits, and packages as cruise lines compete for
                    bookings.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <ServiceIcon icon="🚀" size="text-3xl" />
                  <h3 className="font-semibold text-xl mt-4 mb-3">Quick Getaway</h3>
                  <p className="text-blue-100">
                    Perfect for spontaneous travelers. Pack your bags and sail away in days, not
                    months!
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <ServiceIcon icon="🌟" size="text-3xl" />
                  <h3 className="font-semibold text-xl mt-4 mb-3">Same Experience</h3>
                  <p className="text-blue-100">
                    Enjoy all the same amenities and activities as guests who paid full price.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Last Minute Booking Tips</h2>

              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-xl mb-4 flex items-center">
                  <ServiceIcon icon="💡" size="text-2xl" />
                  <span className="ml-2">Pro Tips from Our Cruise Experts</span>
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="ml-2">
                      <strong>Be Flexible:</strong> The best deals require flexibility on dates,
                      ships, and cabin types
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="ml-2">
                      <strong>Have Documents Ready:</strong> Ensure passports are valid and you can
                      travel on short notice
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="ml-2">
                      <strong>Book Immediately:</strong> Last minute deals sell out within hours -
                      don't hesitate!
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="ml-2">
                      <strong>Consider Drive-To Ports:</strong> Save on flights by choosing nearby
                      departure ports
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="ml-2">
                      <strong>Pack Light:</strong> You'll have less time to prepare, so pack
                      essentials only
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <ServiceIcon icon="⏰" size="text-5xl" />
            <h2 className="text-3xl font-bold mt-4 mb-4">
              Don't Wait - These Deals Disappear Fast!
            </h2>
            <p className="text-xl mb-8">
              Last minute cruise inventory changes by the hour. Call now to secure your cabin!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-bold transition-colors inline-flex items-center justify-center animate-pulse"
              >
                <ServiceIcon icon="📞" size="text-2xl" />
                <span className="ml-2">Call 833-874-1019 NOW</span>
              </a>
            </div>
            <p className="mt-6 text-white/80">
              Available 7 days a week • Expert agents standing by • Book in minutes
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
