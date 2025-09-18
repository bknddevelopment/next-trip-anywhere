/**
 * Cruise Deals Page
 * Aggregated deals from all cruise lines
 * Target: 90.5K searches/month for "cruise deals"
 */

import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Suspense } from 'react'
import {
  cruiseDeals,
  getFeaturedDeals,
  getLastMinuteDeals,
  getCheapCruises,
  cruiseLines,
  departurePorts,
  CruiseDeal,
} from '@/lib/data/cruise-deals'

// Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  const title = 'Cruise Deals & Discounts | Exclusive Group Rates | Next Trip Anywhere'
  const description =
    'Exclusive cruise deals with complimentary upgrades, onboard credits, and valuable perks included. Caribbean, Alaska, Mediterranean cruises from all US ports. Call 833-874-1019.'
  const canonical = 'https://nexttripanywhere.com/cruises/deals'

  return {
    title,
    description,
    keywords: [
      'cruise deals',
      'cruise discounts',
      'cruise sales',
      'best cruise deals',
      'cruise specials',
      'cruise promotions',
      'cheap cruise deals',
      'last minute cruise deals',
      'cruise packages',
      'cruise offers',
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
          url: '/images/cruise-deals-hero.jpg',
          width: 1200,
          height: 630,
          alt: 'Cruise Deals and Discounts',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/cruise-deals-hero.jpg'],
    },
  }
}

// Service icons
const ServiceIcon = ({ icon, size = 'text-4xl' }: { icon: string; size?: string }) => (
  <span className={`${size} select-none`} role="img" aria-hidden="true">
    {icon}
  </span>
)

// Deal card component with more details
const DetailedDealCard = ({ deal }: { deal: CruiseDeal }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500">
      <div className="p-6">
        {/* Header with badges */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-xl text-blue-900 mb-1">{deal.title}</h3>
            <p className="text-gray-600 text-sm">
              {deal.cruiseLine} • {deal.ship}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            {deal.featured && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">FEATURED</span>
            )}
            {deal.isLastMinute && (
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                LAST MINUTE
              </span>
            )}
            {deal.featured && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                SPECIAL OFFER
              </span>
            )}
          </div>
        </div>

        {/* Trip details */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center text-gray-700">
            <ServiceIcon icon="📅" size="text-lg" />
            <span className="ml-2 text-sm">
              {deal.duration} days • {deal.departureDate}
            </span>
          </div>
          <div className="flex items-center text-gray-700">
            <ServiceIcon icon="📍" size="text-lg" />
            <span className="ml-2 text-sm">Departs: {deal.departurePort}</span>
          </div>
          <div className="flex items-start text-gray-700">
            <ServiceIcon icon="🗺️" size="text-lg" />
            <span className="ml-2 text-sm">
              Visits: {deal.destinations.slice(0, 3).join(', ')}
              {deal.destinations.length > 3 && ` +${deal.destinations.length - 3} more`}
            </span>
          </div>
          <div className="flex items-center text-gray-700">
            <ServiceIcon icon="🛏️" size="text-lg" />
            <span className="ml-2 text-sm">{deal.cabinType} Cabin</span>
          </div>
        </div>

        {/* Perks */}
        {deal.perks && deal.perks.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-600 mb-1">INCLUDED PERKS:</p>
            <div className="flex flex-wrap gap-1">
              {deal.perks.slice(0, 3).map((perk, idx) => (
                <span key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
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
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-gray-600">Exclusive Offer</p>
                <p className="text-xl font-bold text-green-600">Special Group Rate</p>
                <p className="text-sm text-orange-600 font-semibold">Exceptional value included</p>
              </div>
            </div>
            <div className="text-right">
              {deal.availability === 'limited' && (
                <p className="text-orange-600 text-xs font-semibold mb-2">Limited Availability</p>
              )}
              {deal.bookingDeadline && (
                <p className="text-red-600 text-xs mb-2">Book by {deal.bookingDeadline}</p>
              )}
              <a
                href="tel:+18338741019"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-semibold inline-block"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Filter component
const FilterBar = ({
  selectedLine,
  selectedPort,
  selectedDuration,
}: {
  selectedLine?: string
  selectedPort?: string
  selectedDuration?: string
}) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="grid md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cruise Line</label>
        <select
          value={selectedLine}
          disabled
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Cruise Lines</option>
          {cruiseLines.map((line) => (
            <option key={line} value={line}>
              {line}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Departure Port</label>
        <select
          value={selectedPort}
          disabled
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Ports</option>
          {departurePorts.map((port) => (
            <option key={`${port.city}-${port.state}`} value={port.city}>
              {port.city}, {port.state}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
        <select
          value={selectedDuration}
          disabled
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Any Length</option>
          <option value="3-5">3-5 Days</option>
          <option value="6-8">6-8 Days</option>
          <option value="9-14">9-14 Days</option>
          <option value="15+">15+ Days</option>
        </select>
      </div>
    </div>
  </div>
)

export default function CruiseDealsPage() {
  const featuredDeals = getFeaturedDeals()
  const lastMinuteDeals = getLastMinuteDeals()
  const cheapDeals = getCheapCruises()

  // Schema markup for deals page
  const dealsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cruise Deals',
    description: 'Exclusive cruise deals and discounts',
    numberOfItems: cruiseDeals.length,
    itemListElement: cruiseDeals.slice(0, 10).map((deal, index) => ({
      '@type': 'Offer',
      position: index + 1,
      name: deal.title,
      price: 'Contact for pricing',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
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
        id="deals-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dealsSchema),
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
                Deals
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur rounded-full mb-4">
                <ServiceIcon icon="🎯" size="text-4xl" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Cruise Deals</h1>
              <p className="text-xl mb-6 text-white/90">
                Exclusive group rates plus valuable perks included with every booking
              </p>

              {/* Urgency banner */}
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 inline-block">
                <p className="font-semibold text-lg mb-2">
                  <ServiceIcon icon="🔥" size="text-2xl" />
                  <span className="ml-2">LIMITED TIME OFFERS</span>
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-sm">
                  <span className="bg-white/20 px-3 py-1 rounded-full">Free Balcony Upgrades</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    Generous Onboard Credit
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">Free Beverage Package</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">Kids Sail Free</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18338741019"
                  className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  <ServiceIcon icon="📞" size="text-2xl" />
                  <span className="ml-2">Call for Best Deals</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-blue-900">{cruiseDeals.length}+</p>
                <p className="text-gray-600">Active Deals</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">75%</p>
                <p className="text-gray-600">Max Savings</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">{lastMinuteDeals.length}</p>
                <p className="text-gray-600">Last Minute</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-600">Great</p>
                <p className="text-gray-600">Value Rates</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Deals */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Featured Cruise Deals</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Hand-picked offers with the best value and exclusive perks you won't find anywhere
                  else
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredDeals.map((deal) => (
                  <DetailedDealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Last Minute Deals Section */}
        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-full mb-4">
                  <ServiceIcon icon="⏰" size="text-3xl" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Last Minute Cruise Deals</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Sail within 60 days and save big! Limited cabins available at these prices
                </p>
                <Link
                  href="/cruises/last-minute"
                  className="inline-block mt-4 text-purple-600 hover:text-purple-700 font-semibold"
                >
                  View All Last Minute Deals →
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lastMinuteDeals.slice(0, 3).map((deal) => (
                  <DetailedDealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cheap Cruises Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-4">
                  <ServiceIcon icon="💰" size="text-3xl" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Budget-Friendly Cruise Options</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Amazing voyages at budget-friendly prices. Perfect for first-time cruisers!
                </p>
                <Link
                  href="/cruises/cheap-cruises"
                  className="inline-block mt-4 text-green-600 hover:text-green-700 font-semibold"
                >
                  View All Cheap Cruises →
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cheapDeals.slice(0, 3).map((deal) => (
                  <DetailedDealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Deals with Filters */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Browse All Cruise Deals</h2>

              {/* Filter Bar would go here - simplified for static version */}
              <div className="mb-8">
                <FilterBar selectedLine="" selectedPort="" selectedDuration="" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cruiseDeals.map((deal) => (
                  <DetailedDealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Book With Us */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12">Why Our Deals Are Better</h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ServiceIcon icon="🎁" size="text-3xl" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Exclusive Perks</h3>
                  <p className="text-blue-100">
                    Complimentary upgrades, onboard credits, and valuable packages included
                  </p>
                </div>

                <div>
                  <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ServiceIcon icon="💎" size="text-3xl" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">VIP Treatment</h3>
                  <p className="text-blue-100">
                    Priority boarding, specialty dining reservations, and concierge service
                  </p>
                </div>

                <div>
                  <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ServiceIcon icon="🛡️" size="text-3xl" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Price Protection</h3>
                  <p className="text-blue-100">
                    We monitor prices and rebook if rates drop before final payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Save on Your Next Cruise?</h2>
            <p className="text-xl mb-8">
              Our cruise experts will find you the best deal with maximum perks
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <ServiceIcon icon="📞" size="text-2xl" />
                <span className="ml-2">Call 833-874-1019</span>
              </a>
              <Link
                href="/contact"
                className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Request a Quote
              </Link>
            </div>
            <p className="mt-6 text-white/80">
              Speak to a cruise specialist • No booking fees • Best price guarantee
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
