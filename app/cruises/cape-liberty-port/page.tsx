/**
 * Cape Liberty Cruise Port Complete Guide
 * Target: "cape liberty cruise port" (8,100 searches/month)
 * Comprehensive 3000+ word pillar page with local Essex County focus
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
  title: 'Cape Liberty Cruise Port Guide 2025 | Parking, Hotels, Transport from Essex County',
  description:
    'Complete guide to Cape Liberty Cruise Port in Bayonne, NJ. Parking options, hotels, directions from Essex County, cruise lines, terminals, and insider tips. Your comprehensive resource for cruising from New Jersey.',
  keywords: [
    'Cape Liberty cruise port',
    'Cape Liberty parking',
    'Cape Liberty hotels',
    'Bayonne cruise terminal',
    'Cape Liberty directions',
    'Newark to Cape Liberty',
    'Essex County to Cape Liberty',
    'Cape Liberty cruise lines',
    'Royal Caribbean Cape Liberty',
    'Celebrity Cruises Cape Liberty',
    'Cape Liberty terminal guide',
    'New Jersey cruise port',
    'Cape Liberty transportation',
    'Cape Liberty port address',
    'Cape Liberty cruise schedule',
  ].join(', '),
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/cape-liberty-port',
  },
  openGraph: {
    title: 'Complete Guide to Cape Liberty Cruise Port - Everything You Need to Know',
    description:
      'Your comprehensive resource for cruising from Cape Liberty Port in Bayonne, NJ. Parking, hotels, directions, cruise lines, and expert tips.',
    url: 'https://nexttripanywhere.com/cruises/cape-liberty-port',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
    images: [
      {
        url: '/images/cruises/cape-liberty-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'Cape Liberty Cruise Port Terminal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cape Liberty Cruise Port - Complete Guide',
    description:
      'Everything you need to know about cruising from Cape Liberty Port in Bayonne, NJ.',
    images: ['/images/cruises/cape-liberty-guide.jpg'],
  },
}

// Direction card component for Essex County cities
const DirectionCard = ({
  city,
  miles,
  time,
  route,
  tolls,
  tips,
}: {
  city: string
  miles: string
  time: string
  route: string
  tolls: string
  tips: string
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h4 className="font-semibold text-lg text-blue-900 mb-3">{city} to Cape Liberty</h4>
    <div className="space-y-2 text-sm">
      <p>
        <span className="font-medium">📍 Distance:</span> {miles}
      </p>
      <p>
        <span className="font-medium">⏱️ Drive Time:</span> {time}
      </p>
      <p>
        <span className="font-medium">🛣️ Best Route:</span> {route}
      </p>
      <p>
        <span className="font-medium">💰 Tolls:</span> {tolls}
      </p>
      <p className="text-gray-600 italic">
        <span className="font-medium">💡 Tip:</span> {tips}
      </p>
    </div>
  </div>
)

// Hotel card component
const HotelCard = ({
  name,
  distance,
  price,
  features,
  parkPackage,
  phone,
}: {
  name: string
  distance: string
  price: string
  features: string[]
  parkPackage?: string
  phone: string
}) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
      <h4 className="text-lg font-semibold">{name}</h4>
      <p className="text-blue-100 text-sm">{distance} from port</p>
    </div>
    <div className="p-6">
      <p className="text-2xl font-bold text-orange-500 mb-2">{price}</p>
      <p className="text-sm text-gray-600 mb-4">per night (avg)</p>
      {parkPackage && (
        <div className="bg-green-50 p-3 rounded mb-4">
          <p className="text-sm font-semibold text-green-800">Park & Cruise Package</p>
          <p className="text-sm text-green-700">{parkPackage}</p>
        </div>
      )}
      <ul className="space-y-1 mb-4">
        {features.map((feature, idx) => (
          <li key={idx} className="text-sm text-gray-700">
            ✓ {feature}
          </li>
        ))}
      </ul>
      <p className="text-sm font-medium">📞 {phone}</p>
    </div>
  </div>
)

export default function CapeLibertyCruisePortPage() {
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
      },
      {
        '@type': 'TouristAttraction',
        name: 'Cape Liberty Cruise Port',
        description:
          'Major cruise port serving the New York/New Jersey metropolitan area with departures to Caribbean, Bermuda, Canada, and Europe.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '14 Port Terminal Blvd',
          addressLocality: 'Bayonne',
          addressRegion: 'NJ',
          postalCode: '07002',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 40.6502,
          longitude: -74.0725,
        },
        openingHours: 'Mo-Su 06:00-20:00',
        telephone: '+1-201-823-3737',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the address of Cape Liberty Cruise Port?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cape Liberty Cruise Port is located at 14 Port Terminal Blvd, Bayonne, NJ 07002. The port is easily accessible from the New Jersey Turnpike Extension and Route 440.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much is parking at Cape Liberty?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Official port parking rates are $30/day for standard parking and $35/day for covered parking. Pre-booking online saves $5/day. Premium valet parking is $40/day.',
            },
          },
          {
            '@type': 'Question',
            name: 'What cruise lines use Cape Liberty?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Royal Caribbean and Celebrity Cruises are the primary cruise lines at Cape Liberty. Royal Caribbean operates year-round while Celebrity offers seasonal sailings. Norwegian and Carnival occasionally offer special departures.',
            },
          },
          {
            '@type': 'Question',
            name: 'How early should I arrive at Cape Liberty before my cruise?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Arrive at Cape Liberty 2-3 hours before your scheduled sailing time. Boarding typically begins 4 hours before departure. Consider traffic from Essex County when planning your arrival.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are there hotels near Cape Liberty with parking packages?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, several hotels offer park and cruise packages including Hyatt Regency Jersey City, Courtyard Marriott Newark, and Homewood Suites Newark. Packages typically include one night stay plus parking for your cruise duration.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I get from Newark Airport to Cape Liberty?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Newark Airport is 10 miles from Cape Liberty, about 20-25 minutes by car. Options include taxi ($60-80), Uber/Lyft ($40-60), pre-arranged shuttle ($35-45 per person), or private car service ($120-150).',
            },
          },
          {
            '@type': 'Question',
            name: 'What amenities are available at Cape Liberty terminal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cape Liberty offers wheelchair accessibility, porter services ($5-10 per bag), restrooms, seating areas, vending machines, and free WiFi. Food options are limited, so eat before arriving.',
            },
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://nexttripanywhere.com/cruises/cape-liberty-port',
        url: 'https://nexttripanywhere.com/cruises/cape-liberty-port',
        name: 'Cape Liberty Cruise Port Complete Guide',
        description: metadata.description,
        inLanguage: 'en-US',
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
              name: 'Cape Liberty Port',
              item: 'https://nexttripanywhere.com/cruises/cape-liberty-port',
            },
          ],
        },
      },
    ],
  }

  // Comprehensive Essex County directions data
  const essexCountyDirections = [
    {
      city: 'Newark',
      miles: '8-10 miles',
      time: '15-20 minutes',
      route: 'I-78 E to NJ Turnpike Extension, Exit 14A to Route 440 S',
      tolls: '$3.50 (NJ Turnpike)',
      tips: 'Avoid rush hour 7-9 AM and 4-7 PM. Sunday mornings are ideal for cruise departures.',
    },
    {
      city: 'Montclair',
      miles: '14-16 miles',
      time: '25-30 minutes',
      route: 'Garden State Parkway S to I-78 E, then NJ Turnpike to Route 440',
      tolls: '$5.00 (combined tolls)',
      tips: 'Use Route 3 E as alternative during Parkway backups. Add 10 minutes for Upper Montclair.',
    },
    {
      city: 'West Orange',
      miles: '13-15 miles',
      time: '24-28 minutes',
      route: 'I-280 E to NJ Turnpike, Exit 14A to Route 440 S',
      tolls: '$3.50 (NJ Turnpike)',
      tips: 'Pleasant Valley Way to Main St provides scenic alternative route.',
    },
    {
      city: 'Livingston',
      miles: '16-18 miles',
      time: '30-35 minutes',
      route: 'Route 10 E to I-280 E to NJ Turnpike Extension',
      tolls: '$3.50 (NJ Turnpike)',
      tips: 'Leave extra early on summer Saturdays - shore traffic affects travel times.',
    },
    {
      city: 'Millburn/Short Hills',
      miles: '15-17 miles',
      time: '28-32 minutes',
      route: 'Route 24 E to I-78 E to NJ Turnpike Extension',
      tolls: '$3.50 (NJ Turnpike)',
      tips: 'Millburn Avenue provides local alternative if highway is congested.',
    },
    {
      city: 'Maplewood/South Orange',
      miles: '13-15 miles',
      time: '24-29 minutes',
      route: 'Route 24 E or I-78 E to NJ Turnpike Extension',
      tolls: '$3.50 (NJ Turnpike)',
      tips: 'Valley Street through Orange provides backup route. Check NJ Transit for train+shuttle option.',
    },
    {
      city: 'Bloomfield/Glen Ridge',
      miles: '11-13 miles',
      time: '22-27 minutes',
      route: 'Route 3 E to NJ Turnpike N, Exit 14A to Route 440',
      tolls: '$3.50 (NJ Turnpike)',
      tips: 'Broad Street through Newark works as local alternative. Light Sunday traffic.',
    },
    {
      city: 'Nutley/Belleville',
      miles: '10-12 miles',
      time: '20-25 minutes',
      route: 'Route 21 S to I-280 E to NJ Turnpike',
      tolls: '$3.50 (NJ Turnpike)',
      tips: 'Route 7 provides toll-free alternative but adds 10-15 minutes.',
    },
    {
      city: 'Caldwell/Verona',
      miles: '14-16 miles',
      time: '26-31 minutes',
      route: 'Bloomfield Ave E to Route 3 E to NJ Turnpike',
      tolls: '$3.50 (NJ Turnpike)',
      tips: 'Passaic Avenue through Nutley offers scenic route with fewer trucks.',
    },
    {
      city: 'East/Orange',
      miles: '10-12 miles',
      time: '20-25 minutes',
      route: 'I-280 E to NJ Turnpike Extension, Exit 14A',
      tolls: '$3.50 (NJ Turnpike)',
      tips: 'Central Avenue provides direct local route through Newark.',
    },
    {
      city: 'Irvington',
      miles: '9-11 miles',
      time: '18-23 minutes',
      route: 'Route 78 E to NJ Turnpike Extension',
      tolls: '$3.50 (NJ Turnpike)',
      tips: 'Springfield Avenue offers toll-free alternative through Newark.',
    },
    {
      city: 'Roseland/Essex Fells',
      miles: '18-20 miles',
      time: '33-38 minutes',
      route: 'I-280 E to NJ Turnpike Extension',
      tolls: '$3.50 (NJ Turnpike)',
      tips: 'Leave 45 minutes early during peak season. Consider staying at airport hotel night before.',
    },
  ]

  return (
    <>
      <Script
        id="schema-cape-liberty"
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
                Cape Liberty Port Guide
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Cape Liberty Cruise Port Complete Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Everything Essex County Residents Need to Know About New Jersey's Premier Cruise
                Terminal
              </p>
              <p className="text-lg mb-8 max-w-4xl mx-auto">
                Your comprehensive resource for cruising from Cape Liberty in Bayonne, NJ. From
                detailed driving directions and parking options to nearby hotels and terminal
                amenities - we've got you covered for a smooth departure.
              </p>
              <div className="bg-blue-900/50 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Cape Liberty Quick Facts</h2>
                <div className="grid grid-cols-2 gap-4 text-left text-sm">
                  <div>
                    📍 <strong>Address:</strong> 14 Port Terminal Blvd, Bayonne, NJ
                  </div>
                  <div>
                    📞 <strong>Port Phone:</strong> (201) 823-3737
                  </div>
                  <div>
                    🚢 <strong>Terminals:</strong> 3 active berths
                  </div>
                  <div>
                    🅿️ <strong>Parking:</strong> $25-40/day
                  </div>
                  <div>
                    ✈️ <strong>From EWR:</strong> 10 miles (20 min)
                  </div>
                  <div>
                    🏙️ <strong>From NYC:</strong> 7 miles (25 min)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="bg-white py-8 border-b">
          <div className="container mx-auto px-4">
            <TrustBar />
          </div>
        </section>

        {/* Port Overview Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
                About Cape Liberty Cruise Port
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Cape Liberty Cruise Port, officially known as Port Liberty Bayonne, stands as the
                  New York metropolitan area's premier cruise terminal and New Jersey's gateway to
                  the world's oceans. Located on a 430-acre peninsula in Bayonne, this former
                  military ocean terminal has been transformed into a state-of-the-art cruise
                  facility that serves over 750,000 passengers annually.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The port's strategic location offers unparalleled convenience for Essex County
                  residents. Situated just across the Hudson River from Manhattan and mere miles
                  from Newark, Cape Liberty provides the perfect departure point without the hassle
                  of New York City traffic or expensive Manhattan parking. The port features
                  breathtaking views of the Statue of Liberty, Ellis Island, and the Manhattan
                  skyline, making your cruise departure as memorable as the voyage itself.
                </p>

                <h3 className="text-2xl font-semibold mt-10 mb-6 text-blue-900">
                  Port History & Development
                </h3>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Originally built as a U.S. Navy base in 1942, the Bayonne Military Ocean Terminal
                  served as a crucial embarkation point during World War II and subsequent
                  conflicts. In 2004, Royal Caribbean International partnered with the Port
                  Authority of New York and New Jersey to transform this historic facility into a
                  modern cruise terminal. The $75 million renovation created one of the most
                  efficient and passenger-friendly cruise ports on the East Coast.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Today, Cape Liberty features three cruise berths capable of handling the world's
                  largest cruise ships. The port underwent additional expansions in 2014 and 2019,
                  adding enhanced security facilities, improved passenger processing areas, and
                  modernized boarding bridges. These investments have made Cape Liberty the
                  fastest-growing cruise port in the Northeast, with annual passenger counts
                  increasing by over 300% since its opening.
                </p>

                <h3 className="text-2xl font-semibold mt-10 mb-6 text-blue-900">
                  Why Essex County Chooses Cape Liberty
                </h3>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-blue-900">
                      🚗 Unbeatable Accessibility
                    </h4>
                    <p className="text-gray-700">
                      Unlike Manhattan cruise terminals that require navigating bridge or tunnel
                      traffic, Cape Liberty offers direct highway access via the New Jersey Turnpike
                      Extension and Route 440. Essex County residents can reach the port in 15-35
                      minutes without crossing any major waterways. The port's location eliminates
                      the stress of New York City traffic, making embarkation day relaxed and
                      enjoyable.
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-green-900">
                      💰 Cost-Effective Cruising
                    </h4>
                    <p className="text-gray-700">
                      Parking at Cape Liberty costs a fraction of Manhattan rates, saving families
                      $200+ on a week-long cruise. The port's proximity to Essex County eliminates
                      expensive taxi fares or airport transfers. Many local hotels offer
                      park-and-cruise packages that include shuttle service, providing additional
                      savings compared to flying to distant ports like Miami or Fort Lauderdale.
                    </p>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-orange-900">
                      🎯 Convenient Logistics
                    </h4>
                    <p className="text-gray-700">
                      Being just minutes from home means Essex County cruisers can sleep in their
                      own beds the night before departure. Forgot something? You're close enough to
                      run home. Need a ride? Local friends and family can easily drop you off. This
                      proximity transforms cruise logistics from a stressful ordeal into a simple
                      drive to Bayonne.
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-purple-900">
                      🌟 Premium Cruise Lines
                    </h4>
                    <p className="text-gray-700">
                      Cape Liberty hosts Royal Caribbean's innovative Anthem of the Seas and Liberty
                      of the Seas, plus Celebrity Cruises' sophisticated Summit and Reflection.
                      These ships offer Broadway-caliber entertainment, multiple specialty
                      restaurants, and activities ranging from rock climbing to robotic bartenders -
                      all departing from your backyard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Directions Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900">
                Detailed Directions from Every Essex County Municipality
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                Step-by-step driving directions from your Essex County town to Cape Liberty,
                including best routes, toll information, and local tips for avoiding traffic.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {essexCountyDirections.map((direction, idx) => (
                  <DirectionCard key={idx} {...direction} />
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                  General Driving Tips for Essex County Residents
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-orange-500">
                      Best Times to Travel
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        • <strong>Ideal:</strong> Sunday mornings before 10 AM
                      </li>
                      <li>
                        • <strong>Good:</strong> Saturdays before noon
                      </li>
                      <li>
                        • <strong>Avoid:</strong> Weekday rush hours (7-9 AM, 4-7 PM)
                      </li>
                      <li>
                        • <strong>Factor in:</strong> Yankees/Mets game traffic
                      </li>
                      <li>
                        • <strong>Summer:</strong> Add 15 min for shore traffic
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-600">
                      Navigation & GPS Tips
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• GPS Address: 14 Port Terminal Blvd, Bayonne, NJ 07002</li>
                      <li>• Alternative: Search "Cape Liberty Cruise Port"</li>
                      <li>• Use Waze for real-time traffic updates</li>
                      <li>• Download offline maps as backup</li>
                      <li>• Follow "Cruise Ship" signs from Route 440</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3 text-yellow-800">
                    ⚠️ Traffic Alert System
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Major events that impact Cape Liberty access from Essex County:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                    <li>• MetLife Stadium events (adds 20-30 min)</li>
                    <li>• Prudential Center games (impacts Newark routes)</li>
                    <li>• NYC marathons/parades (affects tunnels)</li>
                    <li>• Summer beach traffic (Friday afternoons)</li>
                    <li>• Holiday weekends (arrive 1 hour earlier)</li>
                    <li>• Port Newark cargo traffic (weekday mornings)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Parking Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
                Complete Cape Liberty Parking Guide & Strategies
              </h2>

              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                  Official Port Parking Options
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border-2 border-blue-200 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-blue-700">Standard Parking</h4>
                    <div className="text-3xl font-bold text-orange-500 mb-2">$25/day</div>
                    <p className="text-sm text-gray-600 mb-4">Pre-book online (saves $5/day)</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✓ Uncovered outdoor lot</li>
                      <li>✓ Shuttle every 10-15 minutes</li>
                      <li>✓ 24/7 security patrols</li>
                      <li>✓ 5-minute ride to terminal</li>
                      <li>✓ Best value for trips under 7 days</li>
                    </ul>
                  </div>

                  <div className="border-2 border-green-200 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-green-700">Covered Parking</h4>
                    <div className="text-3xl font-bold text-orange-500 mb-2">$30/day</div>
                    <p className="text-sm text-gray-600 mb-4">Pre-book online (saves $5/day)</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✓ Protected from weather</li>
                      <li>✓ Closer to terminal</li>
                      <li>✓ Priority shuttle service</li>
                      <li>✓ Ideal for winter cruises</li>
                      <li>✓ Worth it for luxury vehicles</li>
                    </ul>
                  </div>

                  <div className="border-2 border-purple-200 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-purple-700">Premium Valet</h4>
                    <div className="text-3xl font-bold text-orange-500 mb-2">$40/day</div>
                    <p className="text-sm text-gray-600 mb-4">Drop at terminal door</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✓ Curbside drop-off</li>
                      <li>✓ Porter assistance included</li>
                      <li>✓ Car ready at disembarkation</li>
                      <li>✓ Perfect for mobility issues</li>
                      <li>✓ VIP treatment</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3 text-blue-800">
                    💡 Smart Parking Strategies
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <strong>For 3-5 Day Cruises:</strong>
                      <ul className="mt-2 space-y-1">
                        <li>• Official port parking most convenient</li>
                        <li>• Pre-book online for best rates</li>
                        <li>• Standard parking sufficient</li>
                      </ul>
                    </div>
                    <div>
                      <strong>For 7+ Day Cruises:</strong>
                      <ul className="mt-2 space-y-1">
                        <li>• Consider off-site lots (save 40-50%)</li>
                        <li>• Hotel park packages best value</li>
                        <li>• Book shuttle parking early</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                  Off-Site Parking Alternatives
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-3 text-green-700">
                      Liberty Park & Cruise
                    </h4>
                    <p className="text-2xl font-bold text-orange-500 mb-2">$15-18/day</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>📍 65 Sipco Dr, Bayonne (2 miles from port)</li>
                      <li>🚐 24/7 shuttle service included</li>
                      <li>🔒 Fenced, secured lot with cameras</li>
                      <li>📞 Reserve: (201) 339-7275</li>
                      <li>💡 Best for budget-conscious cruisers</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-3 text-blue-700">EZ Cruise Parking</h4>
                    <p className="text-2xl font-bold text-orange-500 mb-2">$12-15/day</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>📍 440 Avenue E, Bayonne (3 miles from port)</li>
                      <li>🚐 Shuttle every 30 minutes</li>
                      <li>🔒 24-hour security patrol</li>
                      <li>📞 Reserve: (201) 437-0111</li>
                      <li>💡 Lowest price, basic service</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-3 text-purple-700">
                      WallyPark Newark Airport
                    </h4>
                    <p className="text-2xl font-bold text-orange-500 mb-2">$20/day + shuttle</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>📍 Newark Airport area (10 miles)</li>
                      <li>🚐 Arrange Cape Liberty shuttle ($40)</li>
                      <li>🔒 Premium security features</li>
                      <li>📞 Reserve: (973) 824-4444</li>
                      <li>💡 Good for fly/cruise packages</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-3 text-red-700">
                      Bayonne Cruise Parking
                    </h4>
                    <p className="text-2xl font-bold text-orange-500 mb-2">$13/day</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>📍 200 Goldsborough Dr, Bayonne</li>
                      <li>🚐 Shuttle on demand</li>
                      <li>🔒 Basic security</li>
                      <li>📞 Reserve: (201) 858-5200</li>
                      <li>💡 Local family-owned option</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hotels Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
                Hotels Near Cape Liberty with Park & Cruise Packages
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <HotelCard
                  name="Hyatt Regency Jersey City"
                  distance="3 miles"
                  price="$189-249"
                  features={[
                    'Hudson River views',
                    'Indoor pool & fitness',
                    'Vu Restaurant on-site',
                    'Free WiFi',
                    'Pet-friendly',
                  ]}
                  parkPackage="$189 includes 1 night + 7 days parking + shuttle"
                  phone="(201) 469-1234"
                />

                <HotelCard
                  name="Courtyard Newark Downtown"
                  distance="8 miles"
                  price="$149-189"
                  features={[
                    'Walking to Penn Station',
                    'The Bistro restaurant',
                    'Business center',
                    'Fitness center',
                    'Prudential Center nearby',
                  ]}
                  parkPackage="$149 includes 1 night + parking + arranged shuttle"
                  phone="(973) 848-0200"
                />

                <HotelCard
                  name="Homewood Suites Newark"
                  distance="7 miles"
                  price="$139-179"
                  features={[
                    'Free hot breakfast',
                    'Kitchen in every suite',
                    'Evening social Mon-Thu',
                    'Indoor pool',
                    'Free parking',
                  ]}
                  parkPackage="$139 includes 1 night + 7 days parking"
                  phone="(973) 645-3000"
                />

                <HotelCard
                  name="Residence Inn Newark"
                  distance="10 miles"
                  price="$159-199"
                  features={[
                    'Full kitchens',
                    'Free breakfast buffet',
                    'Grocery delivery',
                    'Pet-friendly',
                    'Airport shuttle',
                  ]}
                  parkPackage="$159 includes 1 night + parking (airport lot)"
                  phone="(973) 824-3200"
                />

                <HotelCard
                  name="Hampton Inn Linden"
                  distance="12 miles"
                  price="$119-149"
                  features={[
                    'Hot breakfast included',
                    'Indoor pool',
                    '24-hour business center',
                    'Free WiFi',
                    'Near shopping',
                  ]}
                  parkPackage="$119 night + arrange Cape Liberty shuttle"
                  phone="(908) 862-3333"
                />

                <HotelCard
                  name="DoubleTree Newark Penn"
                  distance="8 miles"
                  price="$169-209"
                  features={[
                    'Warm cookie at check-in',
                    'Metropolitan Grill',
                    'City views',
                    'Connected to Penn Station',
                    'Concierge service',
                  ]}
                  parkPackage="Custom packages available"
                  phone="(973) 622-5000"
                />
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                  Hotel Strategy for Essex County Cruisers
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-green-700">
                      When to Book a Pre-Cruise Hotel
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>✓ Early morning cruise departure (before 11 AM)</li>
                      <li>✓ Traveling from western Essex County</li>
                      <li>✓ Winter cruises (weather concerns)</li>
                      <li>✓ Groups wanting to start vacation early</li>
                      <li>✓ International flights day before</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-700">
                      Park & Cruise Package Benefits
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>✓ Often cheaper than parking alone</li>
                      <li>✓ Stress-free morning departure</li>
                      <li>✓ Breakfast included at most hotels</li>
                      <li>✓ Car security for cruise duration</li>
                      <li>✓ Shuttle coordination handled</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Terminal Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
                Cape Liberty Terminal Information & Boarding Process
              </h2>

              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                  Terminal Facilities & Services
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-orange-500">
                      Terminal Amenities
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>🏢 Three modern cruise terminals</li>
                      <li>♿ Full wheelchair accessibility</li>
                      <li>🛄 Porter services ($5-10 per bag)</li>
                      <li>🪑 Comfortable seating areas</li>
                      <li>🚻 Clean, modern restrooms</li>
                      <li>🥤 Vending machines & water fountains</li>
                      <li>📶 Free WiFi in terminal</li>
                      <li>🏧 ATM machines available</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-600">Check-In Process</h4>
                    <ol className="space-y-2 text-gray-700">
                      <li>1️⃣ Drop luggage at curbside (porters available)</li>
                      <li>2️⃣ Park vehicle or get dropped off</li>
                      <li>3️⃣ Security screening (similar to TSA)</li>
                      <li>4️⃣ Check-in at cruise line counters</li>
                      <li>5️⃣ Receive SeaPass card/boarding pass</li>
                      <li>6️⃣ Wait in departure lounge</li>
                      <li>7️⃣ Board by group number (Priority available)</li>
                      <li>8️⃣ Photo at gangway for security</li>
                    </ol>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-green-50 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3 text-green-800">
                    🎯 Boarding Time Guidelines
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <strong>Recommended Arrival Times:</strong>
                      <ul className="mt-2 space-y-1">
                        <li>• First-time cruisers: 11:00 AM - 12:00 PM</li>
                        <li>• Suite guests: Any time after 11:00 AM</li>
                        <li>• Regular cabins: 12:00 PM - 2:00 PM</li>
                        <li>• Avoid rush: After 2:00 PM</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Important Cutoffs:</strong>
                      <ul className="mt-2 space-y-1">
                        <li>• Check-in opens: 11:00 AM</li>
                        <li>• Boarding begins: 11:30 AM</li>
                        <li>• All aboard: 3:30 PM (4:00 PM sail)</li>
                        <li>• Terminal closes: 3:45 PM sharp</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                  What to Expect on Departure Day
                </h3>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6">
                    Your cruise departure day from Cape Liberty should be exciting, not stressful.
                    Here's a detailed timeline to help Essex County residents plan their departure
                    day:
                  </p>

                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h4 className="text-xl font-semibold mb-4 text-blue-900">
                      Sample Departure Day Timeline (4:00 PM sailing)
                    </h4>

                    <div className="space-y-3 text-gray-700">
                      <div className="flex items-start">
                        <span className="font-semibold mr-3">9:00 AM:</span>
                        <span>
                          Final packing, double-check documents (passport, SeaPass docs,
                          medications)
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold mr-3">10:00 AM:</span>
                        <span>Leave Essex County home (account for traffic and parking)</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold mr-3">10:30 AM:</span>
                        <span>
                          Arrive at Cape Liberty, drop luggage with porters (tip $2-3/bag)
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold mr-3">10:45 AM:</span>
                        <span>Park car and take shuttle to terminal (or get dropped off)</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold mr-3">11:00 AM:</span>
                        <span>Enter terminal, go through security screening</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold mr-3">11:30 AM:</span>
                        <span>Complete check-in, receive SeaPass card</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold mr-3">12:00 PM:</span>
                        <span>Board ship! Head to buffet for lunch</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold mr-3">1:00 PM:</span>
                        <span>Explore ship, cabins usually ready</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold mr-3">3:30 PM:</span>
                        <span>Mandatory muster drill</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold mr-3">4:00 PM:</span>
                        <span>Sail away! Wave goodbye to the Statue of Liberty</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transportation Options */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
                Transportation Services to Cape Liberty
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-orange-500">Ride Services</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold">Uber/Lyft</p>
                      <p className="text-gray-600 text-sm">From Newark: $25-40</p>
                      <p className="text-gray-600 text-sm">From Montclair: $35-50</p>
                      <p className="text-gray-600 text-sm">From Livingston: $40-55</p>
                    </div>
                    <div>
                      <p className="font-semibold">Local Taxi</p>
                      <p className="text-gray-600 text-sm">Fixed rates available</p>
                      <p className="text-gray-600 text-sm">Reserve in advance</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">Private Transfers</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold">Sedan (1-3 passengers)</p>
                      <p className="text-gray-600 text-sm">$120-150 one way</p>
                    </div>
                    <div>
                      <p className="font-semibold">SUV (4-6 passengers)</p>
                      <p className="text-gray-600 text-sm">$150-200 one way</p>
                    </div>
                    <div>
                      <p className="font-semibold">Van (7-10 passengers)</p>
                      <p className="text-gray-600 text-sm">$200-300 one way</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-green-600">Group Options</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold">Mini-bus (14 passengers)</p>
                      <p className="text-gray-600 text-sm">$350-450 one way</p>
                    </div>
                    <div>
                      <p className="font-semibold">Coach (25 passengers)</p>
                      <p className="text-gray-600 text-sm">$600-800 one way</p>
                    </div>
                    <div>
                      <p className="font-semibold">Luxury Coach (50 passengers)</p>
                      <p className="text-gray-600 text-sm">$1000-1400 one way</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                  Public Transportation Options
                </h3>

                <div className="p-6 bg-yellow-50 rounded-lg">
                  <p className="text-yellow-800 font-semibold mb-4">
                    ⚠️ Note: Public transit to Cape Liberty is limited and not recommended with
                    luggage
                  </p>

                  <div className="space-y-4 text-gray-700">
                    <div>
                      <strong>From Newark Penn Station:</strong>
                      <p className="text-sm mt-1">
                        NJ Transit bus #120 to Bayonne, then taxi to port ($15-20 taxi). Total time:
                        60-90 minutes.
                      </p>
                    </div>
                    <div>
                      <strong>From NYC:</strong>
                      <p className="text-sm mt-1">
                        PATH train to Newark, then bus #120. Or Hudson-Bergen Light Rail to 34th
                        Street Bayonne, then taxi ($15).
                      </p>
                    </div>
                    <div>
                      <strong>Why driving is better:</strong>
                      <p className="text-sm mt-1">
                        Public transit requires multiple transfers, doesn't run early mornings/late
                        nights, and is difficult with cruise luggage.
                      </p>
                    </div>
                  </div>
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
                Frequently Asked Questions About Cape Liberty
              </h2>

              <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-900">
                    What is the full address of Cape Liberty Cruise Port?
                  </h3>
                  <p className="text-gray-700">
                    Cape Liberty Cruise Port is located at 14 Port Terminal Blvd, Bayonne, NJ 07002.
                    For GPS navigation, you can also search "Cape Liberty Cruise Port" or "Port
                    Liberty Bayonne." The port is situated on a peninsula in Bayonne, with easy
                    access from Route 440 and the New Jersey Turnpike Extension (I-78). Look for the
                    cruise ship signs once you exit onto Route 440.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-900">
                    How much does parking cost at Cape Liberty?
                  </h3>
                  <p className="text-gray-700">
                    Official port parking rates vary by type: Standard uncovered parking is $30/day
                    (walk-up) or $25/day (pre-booked online). Covered parking is $35/day (walk-up)
                    or $30/day (pre-booked). Premium valet parking is $40/day. For longer cruises,
                    consider off-site alternatives like Liberty Park & Cruise ($15-18/day) or EZ
                    Cruise Parking ($12-15/day), both including shuttle service. Many Essex County
                    residents find that hotel park-and-cruise packages offer the best value for 7+
                    day cruises.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-900">
                    Which cruise lines operate from Cape Liberty?
                  </h3>
                  <p className="text-gray-700">
                    Royal Caribbean is the primary cruise line at Cape Liberty, operating year-round
                    with ships like Anthem of the Seas (Quantum-class) and Liberty of the Seas
                    (Freedom-class). Celebrity Cruises offers seasonal sailings with Celebrity
                    Summit and occasionally Celebrity Reflection. Norwegian Cruise Line and Carnival
                    Cruise Line occasionally offer special departures or repositioning cruises from
                    Cape Liberty. The port can accommodate the world's largest cruise ships, making
                    it attractive for premium cruise lines.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-900">
                    How early should I arrive at Cape Liberty before my cruise?
                  </h3>
                  <p className="text-gray-700">
                    Plan to arrive at Cape Liberty 2-3 hours before your scheduled sailing time.
                    Check-in typically opens at 11:00 AM for afternoon departures. Boarding usually
                    begins around 11:30 AM. If you're driving from Essex County, factor in 15-35
                    minutes for the drive, plus time for parking and taking the shuttle to the
                    terminal. First-time cruisers should arrive between 11:00 AM and noon to avoid
                    stress. The terminal strictly closes 30 minutes before sailing (usually 3:30 PM
                    for 4:00 PM departures), so don't cut it close!
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-900">
                    Are there hotels near Cape Liberty with cruise parking packages?
                  </h3>
                  <p className="text-gray-700">
                    Yes, several hotels offer excellent park-and-cruise packages. The Hyatt Regency
                    Jersey City (3 miles away) offers packages from $189 including one night's stay,
                    7 days of parking, and shuttle service. Courtyard Newark Downtown and Homewood
                    Suites Newark both offer packages around $149-159. These packages are often
                    cheaper than parking alone for week-long cruises. Hotels provide breakfast,
                    allowing you to start your cruise day relaxed. Book these packages directly with
                    hotels for the best rates and confirm shuttle times to Cape Liberty.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-900">
                    How do I get from Newark Airport to Cape Liberty?
                  </h3>
                  <p className="text-gray-700">
                    Newark Liberty International Airport (EWR) is just 10 miles from Cape Liberty,
                    about a 20-25 minute drive. Transportation options include taxi ($60-80),
                    Uber/Lyft ($40-60), pre-arranged private shuttle ($35-45 per person), or private
                    car service ($120-150 per vehicle). Some hotels near the airport offer
                    park-fly-cruise packages. For the most economical option, book a shared shuttle
                    in advance. If arriving the day of your cruise, allow at least 3 hours between
                    landing and ship departure to account for baggage claim and traffic.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-900">
                    What amenities and services are available at Cape Liberty terminal?
                  </h3>
                  <p className="text-gray-700">
                    Cape Liberty offers full accessibility features including wheelchair access,
                    elevators, and accessible restrooms. Porter services are available curbside for
                    $5-10 per bag (cash tips expected). The terminal has comfortable seating areas,
                    vending machines, water fountains, and free WiFi. There's limited food service,
                    so eat before arriving. ATMs are available but may charge fees. The terminal
                    opens at 11:00 AM for afternoon sailings. Security screening is similar to TSA
                    at airports. Priority boarding is available for suite guests and loyalty program
                    members. The terminal has modern facilities but can get crowded during peak
                    boarding times (noon-1:00 PM).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
                Insider Tips from Essex County Cruisers
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-orange-500">
                    🚗 Driving & Parking Tips
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• Take photos of your parking spot and shuttle stop location</li>
                    <li>• Keep parking ticket in phone case - you'll need it upon return</li>
                    <li>• Arrive Sunday morning for least traffic from Essex County</li>
                    <li>• Use E-ZPass for tolls - faster than cash lanes</li>
                    <li>• Download offline maps in case of poor signal at port</li>
                    <li>• Consider valet parking for winter cruises - worth the extra cost</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">
                    ✈️ Check-In & Boarding
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• Complete online check-in 3 days before for faster boarding</li>
                    <li>• Print SeaPass documents - WiFi at terminal can be slow</li>
                    <li>• Pack carry-on with swimsuit - luggage delivery takes hours</li>
                    <li>• Bring empty water bottle - fill after security</li>
                    <li>• Porters expect $2-3 per bag cash tip</li>
                    <li>• Take stairs at boarding - elevator lines are long</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-green-600">💰 Money Savers</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• Book parking online - saves $5/day automatically</li>
                    <li>• Split Uber costs with other Essex County cruisers via Facebook groups</li>
                    <li>• Hotel park packages often cheaper than parking alone</li>
                    <li>• Bring snacks for terminal - limited food options</li>
                    <li>• Use credit card with no foreign transaction fees</li>
                    <li>• Book shore excursions in advance for better prices</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-purple-600">📱 Local Knowledge</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• Join "NJ Cruisers from Cape Liberty" Facebook group</li>
                    <li>• Stop at ShopRite Bayonne for forgotten items - 5 min from port</li>
                    <li>• Statue of Liberty sail-away is on starboard side (right)</li>
                    <li>• Newark Airport lost luggage can be delivered to ship</li>
                    <li>• Local weather differs from Caribbean - pack layers</li>
                    <li>• Essex County AAA office offers cruise planning services</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Cruise from Cape Liberty?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Let our Essex County-based cruise experts help you navigate every aspect of your Cape
              Liberty departure. From finding the perfect cruise to arranging transportation from
              your doorstep - we handle all the details.
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
                Plan Your Cape Liberty Cruise
              </Link>
            </div>
            <p className="mt-6 text-blue-100">
              Local experts • Transportation arrangements • Best prices guaranteed • 24/7 support
            </p>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6 text-center text-blue-900">
                Explore Cruises from Cape Liberty
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <Link
                  href="/cruises/from-newark"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
                >
                  <h4 className="font-semibold text-blue-700 mb-2">Newark Cruises</h4>
                  <p className="text-sm text-gray-600">All departures</p>
                </Link>
                <Link
                  href="/cruises/caribbean"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
                >
                  <h4 className="font-semibold text-blue-700 mb-2">Caribbean</h4>
                  <p className="text-sm text-gray-600">Tropical escapes</p>
                </Link>
                <Link
                  href="/cruises/bahamas"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
                >
                  <h4 className="font-semibold text-blue-700 mb-2">Bahamas</h4>
                  <p className="text-sm text-gray-600">Quick getaways</p>
                </Link>
                <Link
                  href="/contact"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
                >
                  <h4 className="font-semibold text-blue-700 mb-2">Book Now</h4>
                  <p className="text-sm text-gray-600">Get started</p>
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
