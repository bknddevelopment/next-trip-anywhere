/**
 * Cruises from Newark Landing Page
 * Target: "cruises from newark" (9,900 searches/month)
 * SEO-optimized comprehensive content with local Essex County focus
 */

import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { TrustBar, DetailedTrustSection } from '@/components/ui/TrustSignals'

// Lazy load non-critical components
const OptimizedImage = dynamic(() => import('@/components/ui/OptimizedImage'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
})

// Generate metadata for SEO
export const metadata: Metadata = {
  title: 'Cruises from Newark 2025 | Cape Liberty Departures & Essex County Transport',
  description:
    'Find the best cruise deals departing from Newark/Cape Liberty Port. Free transportation from Essex County, parking guide, and expert booking assistance. Royal Caribbean, Celebrity, and more. Call 833-874-1019.',
  keywords: [
    'cruises from Newark',
    'Cape Liberty cruise port',
    'Newark cruise departures',
    'Essex County cruise transport',
    'cruises from New Jersey',
    'Newark to Cape Liberty',
    'cruise parking Newark',
    'Royal Caribbean Newark',
    'Celebrity cruises Newark',
    'Newark cruise terminal',
    'cruise deals from Newark',
    'Caribbean cruises from Newark',
  ].join(', '),
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/from-newark',
  },
  openGraph: {
    title: 'Cruises from Newark - Cape Liberty Port Departures',
    description:
      'Your gateway to unforgettable cruises from Newark/Cape Liberty. Expert booking, local transport from Essex County, and unbeatable deals.',
    url: 'https://nexttripanywhere.com/cruises/from-newark',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
    images: [
      {
        url: '/images/cruises/cape-liberty-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Cape Liberty Cruise Port Newark',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cruises from Newark - Cape Liberty Departures',
    description:
      'Expert cruise booking from Newark/Cape Liberty. Local Essex County transport available.',
    images: ['/images/cruises/cape-liberty-hero.jpg'],
  },
}

// Transportation card component
const TransportCard = ({
  city,
  distance,
  time,
  options,
}: {
  city: string
  distance: string
  time: string
  options: string[]
}) => (
  <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
    <h4 className="font-semibold text-blue-900 mb-2">{city}</h4>
    <div className="text-sm text-gray-600 space-y-1">
      <p>📍 Distance: {distance}</p>
      <p>⏱️ Drive time: {time}</p>
      <p className="text-xs">Options: {options.join(', ')}</p>
    </div>
  </div>
)

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className="border-b border-gray-200 pb-6 mb-6">
    <h3 className="text-xl font-semibold mb-3 text-blue-900">{question}</h3>
    <p className="text-gray-700 leading-relaxed">{answer}</p>
  </div>
)

export default function CruisesFromNewarkPage() {
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
        address: {
          '@type': 'PostalAddress',
          streetAddress: '185 Franklin Ave',
          addressLocality: 'Nutley',
          addressRegion: 'NJ',
          postalCode: '07110',
          addressCountry: 'US',
        },
        areaServed: {
          '@type': 'Place',
          name: 'Essex County, New Jersey',
        },
      },
      {
        '@type': 'TouristTrip',
        name: 'Cruises from Newark/Cape Liberty',
        description:
          'Premium cruise departures from Cape Liberty Cruise Port in Bayonne, serving Newark and Essex County residents with convenient access to Caribbean, Bermuda, and Transatlantic cruises.',
        provider: {
          '@id': 'https://nexttripanywhere.com/#organization',
        },
        departureTime: 'Various',
        departureLocation: {
          '@type': 'Place',
          name: 'Cape Liberty Cruise Port',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '14 Port Terminal Blvd',
            addressLocality: 'Bayonne',
            addressRegion: 'NJ',
            postalCode: '07002',
          },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How far is Cape Liberty cruise port from Newark?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cape Liberty Cruise Port in Bayonne is approximately 8-10 miles from Newark, about a 15-20 minute drive depending on traffic. The port is easily accessible via the New Jersey Turnpike Extension (I-78) or Route 440.',
            },
          },
          {
            '@type': 'Question',
            name: 'What cruise lines depart from Cape Liberty Newark?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Major cruise lines departing from Cape Liberty include Royal Caribbean (year-round), Celebrity Cruises (seasonal), and occasionally Norwegian Cruise Line and Carnival for special sailings.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where can I park at Cape Liberty cruise port?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cape Liberty offers official port parking at $30/day for standard vehicles. Covered parking is available at $35/day. Pre-booking online saves $5/day. Private off-site lots with shuttle service are available from $15-20/day.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I get transportation from Essex County to Cape Liberty?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, we arrange private transfers, shared shuttles, and luxury car service from all Essex County municipalities to Cape Liberty. Group rates available for families and travel parties.',
            },
          },
          {
            '@type': 'Question',
            name: 'What destinations are available from Cape Liberty?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Popular destinations include Caribbean (Eastern, Western, Southern), Bahamas, Bermuda, Canada/New England, and Transatlantic crossings to Europe. Seasonal offerings vary by cruise line.',
            },
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://nexttripanywhere.com/cruises/from-newark',
        url: 'https://nexttripanywhere.com/cruises/from-newark',
        name: 'Cruises from Newark - Cape Liberty Port Departures',
        description: metadata.description,
        inLanguage: 'en-US',
        isPartOf: {
          '@id': 'https://nexttripanywhere.com/#website',
        },
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
              name: 'From Newark',
              item: 'https://nexttripanywhere.com/cruises/from-newark',
            },
          ],
        },
      },
    ],
  }

  // Essex County cities data for transportation section
  const essexCountyCities = [
    {
      city: 'Newark',
      distance: '8-10 miles',
      time: '15-20 min',
      options: ['Private car', 'Uber/Lyft', 'Shuttle'],
    },
    {
      city: 'Belleville',
      distance: '9-11 miles',
      time: '18-22 min',
      options: ['Private car', 'Taxi', 'Shuttle'],
    },
    {
      city: 'Nutley',
      distance: '10-12 miles',
      time: '20-25 min',
      options: ['Private car', 'Uber/Lyft', 'Shuttle'],
    },
    {
      city: 'Bloomfield',
      distance: '11-13 miles',
      time: '22-27 min',
      options: ['Private car', 'Taxi', 'Shuttle'],
    },
    {
      city: 'Montclair',
      distance: '14-16 miles',
      time: '25-30 min',
      options: ['Private car', 'Uber/Lyft', 'Shuttle'],
    },
    {
      city: 'West Orange',
      distance: '13-15 miles',
      time: '24-28 min',
      options: ['Private car', 'Taxi', 'Shuttle'],
    },
    {
      city: 'East Orange',
      distance: '10-12 miles',
      time: '20-25 min',
      options: ['Private car', 'Uber/Lyft', 'Shuttle'],
    },
    {
      city: 'Orange',
      distance: '11-13 miles',
      time: '22-26 min',
      options: ['Private car', 'Taxi', 'Shuttle'],
    },
    {
      city: 'South Orange',
      distance: '12-14 miles',
      time: '23-28 min',
      options: ['Private car', 'Uber/Lyft', 'Shuttle'],
    },
    {
      city: 'Maplewood',
      distance: '13-15 miles',
      time: '24-29 min',
      options: ['Private car', 'Taxi', 'Shuttle'],
    },
    {
      city: 'Millburn',
      distance: '15-17 miles',
      time: '28-32 min',
      options: ['Private car', 'Uber/Lyft', 'Shuttle'],
    },
    {
      city: 'Livingston',
      distance: '16-18 miles',
      time: '30-35 min',
      options: ['Private car', 'Taxi', 'Shuttle'],
    },
    {
      city: 'Caldwell',
      distance: '14-16 miles',
      time: '26-31 min',
      options: ['Private car', 'Uber/Lyft', 'Shuttle'],
    },
    {
      city: 'Verona',
      distance: '12-14 miles',
      time: '23-28 min',
      options: ['Private car', 'Taxi', 'Shuttle'],
    },
    {
      city: 'Cedar Grove',
      distance: '13-15 miles',
      time: '25-30 min',
      options: ['Private car', 'Uber/Lyft', 'Shuttle'],
    },
    {
      city: 'Glen Ridge',
      distance: '11-13 miles',
      time: '21-26 min',
      options: ['Private car', 'Taxi', 'Shuttle'],
    },
    {
      city: 'Fairfield',
      distance: '17-19 miles',
      time: '32-37 min',
      options: ['Private car', 'Uber/Lyft', 'Shuttle'],
    },
    {
      city: 'Roseland',
      distance: '18-20 miles',
      time: '33-38 min',
      options: ['Private car', 'Taxi', 'Shuttle'],
    },
    {
      city: 'Essex Fells',
      distance: '16-18 miles',
      time: '30-35 min',
      options: ['Private car', 'Uber/Lyft', 'Shuttle'],
    },
    {
      city: 'North Caldwell',
      distance: '15-17 miles',
      time: '28-33 min',
      options: ['Private car', 'Taxi', 'Shuttle'],
    },
    {
      city: 'West Caldwell',
      distance: '16-18 miles',
      time: '30-35 min',
      options: ['Private car', 'Uber/Lyft', 'Shuttle'],
    },
    {
      city: 'Irvington',
      distance: '9-11 miles',
      time: '18-23 min',
      options: ['Private car', 'Taxi', 'Shuttle'],
    },
  ]

  return (
    <>
      <Script
        id="schema-newark-cruises"
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
                From Newark
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Cruises from Newark & Cape Liberty Port
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Your Gateway to Unforgettable Cruise Vacations from Essex County
              </p>
              <p className="text-lg mb-8 max-w-3xl mx-auto">
                Convenient departures from Cape Liberty Cruise Port in Bayonne - just minutes from
                Newark and all Essex County municipalities. Expert booking assistance,
                transportation arrangements, and unbeatable deals on Caribbean, Bermuda, and
                European cruises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18338741019"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  <span className="mr-2">📞</span> Call 833-874-1019
                </a>
                <Link
                  href="/contact"
                  className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  Get Free Quote
                </Link>
              </div>
              <p className="mt-6 text-blue-100">
                Local Essex County experts • No booking fees • Best price guarantee
              </p>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="bg-white py-8 border-b">
          <div className="container mx-auto px-4">
            <TrustBar />
          </div>
        </section>

        {/* Why Choose Cape Liberty Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
                Why Newark Residents Choose Cape Liberty Cruise Port
              </h2>

              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-700 leading-relaxed mb-6">
                  For Essex County residents, Cape Liberty Cruise Port in Bayonne offers the perfect
                  departure point for your next cruise vacation. Located just 8-10 miles from
                  downtown Newark, this modern cruise terminal provides convenient access without
                  the hassle of traveling to distant ports like Manhattan or Baltimore.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Cape Liberty has become the preferred cruise port for New Jersey residents,
                  offering year-round departures to the Caribbean, seasonal Bermuda cruises, fall
                  foliage tours to Canada and New England, and even transatlantic crossings to
                  Europe. The port's strategic location means you can leave your Essex County home
                  and be checked in for your cruise in under an hour.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4 text-blue-900">
                  Key Advantages of Cape Liberty
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-blue-900">
                      🚗 Easy Access from Essex County
                    </h4>
                    <p className="text-gray-700">
                      Direct routes via NJ Turnpike Extension (I-78) or Route 440. No bridge or
                      tunnel tolls required. Significantly less traffic than Manhattan terminals.
                      Average drive time from Essex County: 15-35 minutes.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-blue-900">
                      🅿️ Convenient Parking Options
                    </h4>
                    <p className="text-gray-700">
                      Official port parking with covered options available. Multiple private lots
                      with shuttle service. Valet parking services. Pre-booking discounts save you
                      money. No Manhattan parking prices!
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-blue-900">
                      🚢 Major Cruise Lines
                    </h4>
                    <p className="text-gray-700">
                      Royal Caribbean's Anthem of the Seas and Liberty of the Seas. Celebrity
                      Cruises' Summit and Reflection. Special sailings from Norwegian and Carnival.
                      Premium ships with modern amenities.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-blue-900">
                      ✈️ Pre/Post Cruise Convenience
                    </h4>
                    <p className="text-gray-700">
                      Newark Liberty Airport just 10 miles away for fly-cruise packages. Numerous
                      hotels nearby for pre-cruise stays. Easy connections to NYC attractions. Local
                      restaurants and shopping in Bayonne.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transportation from Essex County */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900">
                Transportation from All Essex County Municipalities
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                We arrange reliable transportation from every Essex County city and town to Cape
                Liberty. Door-to-door service ensures you start your cruise stress-free.
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                {essexCountyCities.map((city, idx) => (
                  <TransportCard key={idx} {...city} />
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                  Transportation Options & Pricing
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-orange-500">Shared Shuttle</h4>
                    <p className="text-3xl font-bold mb-2">$35-45</p>
                    <p className="text-gray-600 text-sm mb-4">per person, one way</p>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>✓ Multiple pickup points</li>
                      <li>✓ Luggage included</li>
                      <li>✓ 2-4 hour pickup window</li>
                      <li>✓ Best for budget travelers</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-6 border-blue-500 relative">
                    <span className="absolute -top-3 right-4 bg-blue-500 text-white px-3 py-1 rounded text-sm">
                      Most Popular
                    </span>
                    <h4 className="text-xl font-semibold mb-3 text-blue-900">Private Transfer</h4>
                    <p className="text-3xl font-bold mb-2">$120-180</p>
                    <p className="text-gray-600 text-sm mb-4">per vehicle, one way</p>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>✓ Door-to-door service</li>
                      <li>✓ Your schedule</li>
                      <li>✓ Up to 4 passengers</li>
                      <li>✓ All luggage included</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-purple-600">Luxury Service</h4>
                    <p className="text-3xl font-bold mb-2">$250-350</p>
                    <p className="text-gray-600 text-sm mb-4">per vehicle, one way</p>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>✓ Premium vehicles</li>
                      <li>✓ Champagne service</li>
                      <li>✓ Meet & greet</li>
                      <li>✓ VIP treatment</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-orange-50 rounded-lg">
                  <h4 className="text-xl font-semibold mb-3 text-orange-600">
                    Group Transportation Specials
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Traveling with family or friends? We offer special group rates for parties of 8
                    or more:
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Mini-bus (14 passengers): $350-450 one way</li>
                    <li>• Coach bus (25 passengers): $600-800 one way</li>
                    <li>• Luxury coach (50 passengers): $1,000-1,400 one way</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    All group transportation includes professional driver, luggage handling, and
                    flexible pickup locations throughout Essex County.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Cruises from Cape Liberty */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
                Popular Cruise Destinations from Newark/Cape Liberty
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6">
                    <h3 className="text-2xl font-semibold mb-2">Caribbean Cruises</h3>
                    <p className="text-blue-100">7-12 nights • Year-round</p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">
                      Escape to tropical paradise with cruises to the Eastern, Western, and Southern
                      Caribbean. Visit islands like St. Thomas, St. Maarten, Jamaica, Cozumel, and
                      more.
                    </p>
                    <ul className="text-gray-700 space-y-2 mb-4">
                      <li>• Eastern Caribbean: St. Thomas, St. Maarten, Puerto Rico</li>
                      <li>• Western Caribbean: Cozumel, Jamaica, Grand Cayman</li>
                      <li>• Southern Caribbean: Aruba, Barbados, St. Lucia</li>
                    </ul>
                    <p className="text-2xl font-bold text-orange-500 mb-2">From $599</p>
                    <p className="text-sm text-gray-600">per person, double occupancy</p>
                    <Link
                      href="/cruises/caribbean"
                      className="mt-4 block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Caribbean Cruises
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6">
                    <h3 className="text-2xl font-semibold mb-2">Bermuda Cruises</h3>
                    <p className="text-pink-100">7 nights • April-October</p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">
                      Experience the pink sand beaches and British charm of Bermuda. Most cruises
                      dock at King's Wharf for 2-3 days, giving you ample time to explore.
                    </p>
                    <ul className="text-gray-700 space-y-2 mb-4">
                      <li>• 2-3 days docked in Bermuda</li>
                      <li>• Pink sand beaches</li>
                      <li>• Crystal caves and historic St. George</li>
                    </ul>
                    <p className="text-2xl font-bold text-orange-500 mb-2">From $799</p>
                    <p className="text-sm text-gray-600">per person, double occupancy</p>
                    <Link
                      href="/contact"
                      className="mt-4 block text-center bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Check Bermuda Dates
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
                    <h3 className="text-2xl font-semibold mb-2">Bahamas Cruises</h3>
                    <p className="text-orange-100">3-9 nights • Year-round</p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">
                      Quick getaways to Nassau, Freeport, and private islands like Perfect Day at
                      CocoCay. Ideal for first-time cruisers and families.
                    </p>
                    <ul className="text-gray-700 space-y-2 mb-4">
                      <li>• Nassau & Paradise Island</li>
                      <li>• Perfect Day at CocoCay</li>
                      <li>• Great for long weekends</li>
                    </ul>
                    <p className="text-2xl font-bold text-orange-500 mb-2">From $399</p>
                    <p className="text-sm text-gray-600">per person, double occupancy</p>
                    <Link
                      href="/cruises/bahamas"
                      className="mt-4 block text-center bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      View Bahamas Cruises
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6">
                    <h3 className="text-2xl font-semibold mb-2">Canada & New England</h3>
                    <p className="text-green-100">7-10 nights • Sep-Oct</p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">
                      Witness spectacular fall foliage while visiting historic ports like Boston,
                      Portland, Bar Harbor, Halifax, and Quebec City.
                    </p>
                    <ul className="text-gray-700 space-y-2 mb-4">
                      <li>• Peak fall foliage viewing</li>
                      <li>• Historic coastal towns</li>
                      <li>• Fresh lobster and seafood</li>
                    </ul>
                    <p className="text-2xl font-bold text-orange-500 mb-2">From $899</p>
                    <p className="text-sm text-gray-600">per person, double occupancy</p>
                    <Link
                      href="/contact"
                      className="mt-4 block text-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      View Fall Cruises
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6">
                    <h3 className="text-2xl font-semibold mb-2">Transatlantic Crossings</h3>
                    <p className="text-indigo-100">12-15 nights • Apr & Oct</p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">
                      Cross the Atlantic in style, visiting the Azores or British Isles before
                      arriving in European ports like Southampton or Barcelona.
                    </p>
                    <ul className="text-gray-700 space-y-2 mb-4">
                      <li>• Repositioning cruise values</li>
                      <li>• Multiple sea days for relaxation</li>
                      <li>• One-way options available</li>
                    </ul>
                    <p className="text-2xl font-bold text-orange-500 mb-2">From $1,299</p>
                    <p className="text-sm text-gray-600">per person, double occupancy</p>
                    <Link
                      href="/contact"
                      className="mt-4 block text-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      View Transatlantic
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6">
                    <h3 className="text-2xl font-semibold mb-2">Florida & Bahamas</h3>
                    <p className="text-yellow-100">8-9 nights • Year-round</p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">
                      Combine Florida ports like Port Canaveral and Key West with Bahamas stops.
                      Perfect for theme park add-ons.
                    </p>
                    <ul className="text-gray-700 space-y-2 mb-4">
                      <li>• Orlando theme parks access</li>
                      <li>• Key West sunset celebration</li>
                      <li>• Nassau & private islands</li>
                    </ul>
                    <p className="text-2xl font-bold text-orange-500 mb-2">From $699</p>
                    <p className="text-sm text-gray-600">per person, double occupancy</p>
                    <Link
                      href="/contact"
                      className="mt-4 block text-center bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      View Florida Cruises
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parking Guide */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
                Cape Liberty Parking Guide for Essex County Residents
              </h2>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                      Official Port Parking
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-lg">Standard Parking</h4>
                        <p className="text-gray-700">
                          $30/day (walk-in) • $25/day (pre-book online)
                        </p>
                        <p className="text-sm text-gray-600">
                          Uncovered, secured lot with shuttle service
                        </p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-lg">Covered Parking</h4>
                        <p className="text-gray-700">
                          $35/day (walk-in) • $30/day (pre-book online)
                        </p>
                        <p className="text-sm text-gray-600">
                          Protected from weather, closer to terminal
                        </p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-lg">Premium Parking</h4>
                        <p className="text-gray-700">$40/day</p>
                        <p className="text-sm text-gray-600">
                          Closest to terminal, valet service available
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                      Off-Site Alternatives
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-orange-500 pl-4">
                        <h4 className="font-semibold text-lg">Liberty Park & Cruise</h4>
                        <p className="text-gray-700">$15-18/day</p>
                        <p className="text-sm text-gray-600">24/7 shuttle, 5 minutes to port</p>
                      </div>
                      <div className="border-l-4 border-red-500 pl-4">
                        <h4 className="font-semibold text-lg">EZ Cruise Parking</h4>
                        <p className="text-gray-700">$12-15/day</p>
                        <p className="text-sm text-gray-600">Secured lot, frequent shuttles</p>
                      </div>
                      <div className="border-l-4 border-teal-500 pl-4">
                        <h4 className="font-semibold text-lg">Hotel Park & Cruise</h4>
                        <p className="text-gray-700">$99-149 package</p>
                        <p className="text-sm text-gray-600">
                          One night hotel + parking for cruise duration
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
                  <h4 className="text-xl font-semibold mb-3 text-yellow-800">
                    💡 Money-Saving Parking Tips
                  </h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>✓ Always pre-book online for $5/day savings at official port parking</li>
                    <li>✓ Consider off-site lots for trips longer than 7 days</li>
                    <li>✓ Join cruise line loyalty programs for parking discounts</li>
                    <li>✓ Check Groupon for parking deals during off-season</li>
                    <li>✓ Split Uber/Lyft costs with other Essex County cruisers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
                Frequently Asked Questions About Cruises from Newark
              </h2>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <FAQItem
                  question="How far is Cape Liberty cruise port from Newark?"
                  answer="Cape Liberty Cruise Port in Bayonne is approximately 8-10 miles from downtown Newark, making it incredibly convenient for Essex County residents. The drive typically takes 15-20 minutes via the New Jersey Turnpike Extension (I-78) or Route 440. During peak travel times, allow 25-30 minutes. This proximity means you can leave your home in Newark, Nutley, Bloomfield, or any Essex County municipality and be at the cruise terminal in under an hour, eliminating the stress of long-distance travel on embarkation day."
                />

                <FAQItem
                  question="What cruise lines depart from Cape Liberty Newark?"
                  answer="Cape Liberty is home to several major cruise lines. Royal Caribbean operates year-round from the port with ships like Anthem of the Seas (one of the most innovative ships at sea) and Liberty of the Seas. Celebrity Cruises offers seasonal departures with Celebrity Summit providing premium experiences to the Caribbean and Bermuda. Norwegian Cruise Line and Carnival occasionally offer special sailings from Cape Liberty as well. Each cruise line brings its unique style - Royal Caribbean for families and innovation, Celebrity for modern luxury, Norwegian for freestyle cruising, and Carnival for fun, affordable vacations."
                />

                <FAQItem
                  question="Where can I park at Cape Liberty cruise port?"
                  answer="Cape Liberty offers multiple parking options to suit every budget. The official port parking includes standard uncovered parking at $30/day ($25/day if pre-booked online), covered parking at $35/day ($30/day pre-booked), and premium valet parking at $40/day. For longer cruises, consider off-site alternatives like Liberty Park & Cruise ($15-18/day) or EZ Cruise Parking ($12-15/day), both offering secure parking with shuttle service. Many Essex County travelers also choose hotel park-and-cruise packages, where one night's stay includes parking for your entire cruise duration - often the best value for cruises over 7 days."
                />

                <FAQItem
                  question="Can I get transportation from Essex County to Cape Liberty?"
                  answer="Absolutely! We arrange comprehensive transportation services from all 22 Essex County municipalities to Cape Liberty. Options include shared shuttles ($35-45 per person), private car service ($120-180 per vehicle for up to 4 passengers), and luxury transportation ($250-350 per vehicle). For groups, we offer mini-buses and coach buses with special rates. Many Essex County residents prefer private transfers for the convenience of door-to-door service on their schedule. We also coordinate with local taxi services and can help arrange Uber/Lyft pickups. All services include luggage handling and experienced drivers familiar with the best routes to Cape Liberty."
                />

                <FAQItem
                  question="What destinations are available from Cape Liberty?"
                  answer="Cape Liberty offers an impressive variety of cruise destinations throughout the year. Caribbean cruises are the most popular, with itineraries to the Eastern Caribbean (St. Thomas, St. Maarten, Puerto Rico), Western Caribbean (Cozumel, Jamaica, Grand Cayman), and Southern Caribbean (Aruba, Barbados, Curacao). Bermuda cruises run from April through October, offering 7-night voyages with 2-3 days docked at King's Wharf. Quick Bahamas getaways visit Nassau and private islands like Perfect Day at CocoCay. Seasonal offerings include Canada/New England fall foliage cruises (September-October) and repositioning cruises to Europe (spring and fall). The variety means Essex County residents can find everything from 3-day weekend escapes to 15-day transatlantic adventures."
                />

                <FAQItem
                  question="When is the best time to book a cruise from Newark?"
                  answer="The best booking strategy depends on your flexibility and preferences. For the lowest prices, book during 'Wave Season' (January-March) when cruise lines offer their best promotions, including reduced deposits, onboard credits, and free upgrades. For the best selection of cabins and itineraries, book 6-12 months in advance, especially for popular times like spring break, summer, and holidays. Last-minute deals (30-60 days before sailing) can offer exceptional value if you're flexible with dates and cabin categories. Essex County residents should also consider off-season advantages: fewer crowds at the port, easier parking, and often better prices. September-November (excluding Thanksgiving) and late January-early March typically offer the best combination of weather and value for Caribbean cruises."
                />

                <FAQItem
                  question="What documents do I need for a cruise from Cape Liberty?"
                  answer="Documentation requirements depend on your destination. For closed-loop cruises (departing and returning to the same U.S. port) to the Caribbean, Bahamas, and Bermuda, U.S. citizens can use a government-issued birth certificate and driver's license, though a passport is strongly recommended. For any cruise that visits Canada, a passport or passport card is required. International cruises and one-way cruises require a valid passport. Non-U.S. citizens should bring their green card or visa along with their passport. Children under 16 on closed-loop cruises can use just a birth certificate. We recommend all Essex County travelers get a passport for cruising - it provides the most flexibility and is required if you need to fly home from a foreign port due to emergency. Remember to check expiration dates: many countries require passports valid for 6 months beyond travel dates."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Local Testimonial Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
                What Essex County Cruisers Say
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-400 text-xl">★★★★★</div>
                    <span className="ml-2 text-gray-600">Royal Caribbean to Bermuda</span>
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "Living in Montclair, having Cape Liberty so close is a game-changer. We were on
                    the ship 30 minutes after leaving home! The convenience of not dealing with
                    airports made our Bermuda cruise so relaxing from start to finish."
                  </p>
                  <p className="text-sm text-gray-600">- Sarah M., Montclair</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-400 text-xl">★★★★★</div>
                    <span className="ml-2 text-gray-600">Celebrity Caribbean</span>
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "We've sailed from Cape Liberty five times now. As West Orange residents, we
                    love being able to drive ourselves and park. It's so much easier than schlepping
                    to Manhattan or flying to Florida!"
                  </p>
                  <p className="text-sm text-gray-600">- The Johnson Family, West Orange</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-400 text-xl">★★★★★</div>
                    <span className="ml-2 text-gray-600">Anthem of the Seas</span>
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "Next Trip Anywhere arranged our transfer from Livingston to Cape Liberty.
                    Door-to-door service was perfect for our group of 8. The driver knew exactly
                    where to go and handled all our luggage."
                  </p>
                  <p className="text-sm text-gray-600">- Robert K., Livingston</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-400 text-xl">★★★★★</div>
                    <span className="ml-2 text-gray-600">Bahamas Quick Getaway</span>
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "For a long weekend cruise to the Bahamas, Cape Liberty can't be beat. We left
                    Newark Friday afternoon and were back home Sunday night. Perfect mini-vacation
                    without the airport hassle!"
                  </p>
                  <p className="text-sm text-gray-600">- Maria T., Newark</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Sail from Newark?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Let our Essex County-based cruise experts help you plan the perfect voyage from Cape
              Liberty. We handle all the details - from finding the best deals to arranging your
              transportation to the port.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <span className="mr-2">📞</span> Call 833-874-1019
              </a>
              <Link
                href="/contact"
                className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Get Your Free Quote
              </Link>
            </div>
            <p className="mt-6 text-blue-100">
              Local experts • No booking fees • Price match guarantee • 24/7 support
            </p>
          </div>
        </section>

        {/* Related Pages Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6 text-center text-blue-900">
                Explore More Cruise Options
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/cruises/caribbean"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
                >
                  <h4 className="font-semibold text-blue-700 mb-2">Caribbean Cruises</h4>
                  <p className="text-sm text-gray-600">Tropical paradise awaits</p>
                </Link>
                <Link
                  href="/cruises/bahamas"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
                >
                  <h4 className="font-semibold text-blue-700 mb-2">Bahamas Getaways</h4>
                  <p className="text-sm text-gray-600">Quick escapes to Nassau</p>
                </Link>
                <Link
                  href="/cruises/cape-liberty-port"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
                >
                  <h4 className="font-semibold text-blue-700 mb-2">Cape Liberty Guide</h4>
                  <p className="text-sm text-gray-600">Complete port information</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <DetailedTrustSection />
      </main>
    </>
  )
}
