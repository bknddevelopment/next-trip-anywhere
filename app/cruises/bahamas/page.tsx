/**
 * Bahamas Cruises Landing Page
 * Target: "bahamas cruise from newark" (22,200 searches/month)
 * SEO-optimized 2000+ words with Essex County local angle
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
  title: 'Bahamas Cruise from Newark 2025 | 3-9 Day Getaways from Cape Liberty',
  description:
    'Book Bahamas cruises departing from Newark/Cape Liberty. Visit Nassau, Freeport, and Perfect Day at CocoCay. Quick 3-day escapes to week-long adventures. Family-friendly with Essex County transport. Call 833-874-1019.',
  keywords: [
    'Bahamas cruise from Newark',
    'Bahamas cruise from New Jersey',
    'Nassau cruise from Newark',
    'Cape Liberty Bahamas cruise',
    'Perfect Day at CocoCay',
    'short cruises from Newark',
    '3 day cruise from NJ',
    'weekend cruise Bahamas',
    'family cruise Bahamas',
    'Essex County Bahamas cruise',
    'Freeport cruise from Newark',
    'Royal Caribbean Bahamas',
  ].join(', '),
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/bahamas',
  },
  openGraph: {
    title: 'Bahamas Cruises from Newark - Quick Caribbean Escapes',
    description:
      'Perfect getaway cruises to the Bahamas from Cape Liberty. Nassau, private islands, and crystal-clear waters just a short cruise from Essex County.',
    url: 'https://nexttripanywhere.com/cruises/bahamas',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
    images: [
      {
        url: '/images/cruises/bahamas-cruise-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Bahamas Cruise Paradise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bahamas Cruises from Newark/Cape Liberty',
    description:
      'Quick getaway cruises to Nassau and private islands. Perfect for Essex County families.',
    images: ['/images/cruises/bahamas-cruise-hero.jpg'],
  },
}

// Island card component
const IslandCard = ({
  name,
  type,
  highlights,
  bestFor,
  duration,
}: {
  name: string
  type: string
  highlights: string[]
  bestFor: string[]
  duration: string
}) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
    <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-teal-100 text-sm">{type}</p>
    </div>
    <div className="p-6">
      <p className="text-sm text-gray-600 mb-3">⏱️ Typical visit: {duration}</p>
      <div className="mb-4">
        <p className="font-semibold text-gray-700 mb-2">Highlights:</p>
        <ul className="text-sm text-gray-600 space-y-1">
          {highlights.map((item, idx) => (
            <li key={idx}>• {item}</li>
          ))}
        </ul>
      </div>
      <div className="border-t pt-3">
        <p className="font-semibold text-gray-700 mb-2">Best For:</p>
        <div className="flex flex-wrap gap-2">
          {bestFor.map((item, idx) => (
            <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
)

// FAQ component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className="border-b border-gray-200 pb-6 mb-6">
    <h3 className="text-xl font-semibold mb-3 text-blue-900">{question}</h3>
    <p className="text-gray-700 leading-relaxed">{answer}</p>
  </div>
)

export default function BahamasCruisePage() {
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
        name: 'Bahamas Cruises from Newark/Cape Liberty',
        description:
          'Quick getaway cruises to the Bahamas departing from Cape Liberty Cruise Port, perfect for Essex County families seeking sun, sand, and relaxation.',
        provider: {
          '@id': 'https://nexttripanywhere.com/#organization',
        },
        touristType: 'Families, Couples, Weekend Travelers',
        itinerary: {
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Nassau, Bahamas',
              description: 'Capital city with beaches, shopping, and Atlantis Resort',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Perfect Day at CocoCay',
              description: "Royal Caribbean's private island paradise",
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Freeport, Grand Bahama',
              description: 'Beaches, nature parks, and Port Lucaya Marketplace',
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How long is a Bahamas cruise from Newark?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bahamas cruises from Cape Liberty range from 3-9 nights. The most popular are 3-4 night weekend getaways and 7-night voyages that include multiple islands plus Florida ports.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the best time for a Bahamas cruise from New Jersey?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Year-round cruising is available, but the best times are April-May and September-November for perfect weather and fewer crowds. Summer is popular for families but can be hot and humid.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need a passport for a Bahamas cruise from Newark?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For closed-loop cruises (round-trip from Cape Liberty), U.S. citizens can use a birth certificate and government ID, though a passport is strongly recommended for easier re-entry and emergency situations.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which cruise lines offer Bahamas cruises from Cape Liberty?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Royal Caribbean is the primary carrier with year-round Bahamas cruises from Cape Liberty. Celebrity Cruises occasionally offers Bahamas itineraries. Ships include Anthem of the Seas and Liberty of the Seas.',
            },
          },
          {
            '@type': 'Question',
            name: 'How far are the Bahamas from Cape Liberty cruise port?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Bahamas are approximately 1,000 nautical miles from Cape Liberty, with Nassau reachable after 1.5 days at sea. This makes it perfect for both short getaways and longer cruises with multiple stops.',
            },
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://nexttripanywhere.com/cruises/bahamas',
        url: 'https://nexttripanywhere.com/cruises/bahamas',
        name: 'Bahamas Cruises from Newark - Cape Liberty Departures',
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
              name: 'Bahamas',
              item: 'https://nexttripanywhere.com/cruises/bahamas',
            },
          ],
        },
      },
    ],
  }

  // Bahamas destinations data
  const bahamasIslands = [
    {
      name: 'Nassau & Paradise Island',
      type: 'Capital City & Resort Island',
      highlights: [
        'Atlantis Resort day passes',
        "Queen's Staircase historic site",
        'Cable Beach pristine waters',
        'Straw Market shopping',
        'Swimming with dolphins',
      ],
      bestFor: ['Families', 'First-timers', 'Beach lovers', 'Shoppers'],
      duration: '8-10 hours',
    },
    {
      name: 'Perfect Day at CocoCay',
      type: "Royal Caribbean's Private Island",
      highlights: [
        'Thrill Waterpark slides',
        'Up Up and Away balloon',
        'Coco Beach Club luxury',
        'Complimentary beaches',
        'Oasis Lagoon pool',
      ],
      bestFor: ['Families', 'Thrill-seekers', 'Beach relaxation', 'All ages'],
      duration: '8-9 hours',
    },
    {
      name: 'Freeport, Grand Bahama',
      type: 'Nature & Shopping',
      highlights: [
        'Lucayan National Park',
        'Port Lucaya Marketplace',
        'Garden of the Groves',
        'Taino Beach',
        'Swim with sharks experience',
      ],
      bestFor: ['Nature lovers', 'Shoppers', 'Adventure seekers', 'Couples'],
      duration: '7-8 hours',
    },
    {
      name: 'Half Moon Cay',
      type: "Carnival's Private Island",
      highlights: [
        '2-mile pristine beach',
        'Horseback riding in water',
        'Stingray Cove encounter',
        'Private cabanas',
        'Captain Morgan Bar',
      ],
      bestFor: ['Beach lovers', 'Couples', 'Relaxation', 'Water sports'],
      duration: '7-8 hours',
    },
    {
      name: 'Princess Cays',
      type: "Princess Cruises' Private Beach",
      highlights: [
        'Secluded beach sanctuary',
        'Kayaking and snorkeling',
        'Beach barbecue lunch',
        'Sanctuary adults-only area',
        'Local craft market',
      ],
      bestFor: ['Couples', 'Snorkelers', 'Quiet relaxation', 'Adults'],
      duration: '6-7 hours',
    },
    {
      name: 'Great Stirrup Cay',
      type: "NCL's Private Island",
      highlights: [
        'Underwater sculpture garden',
        'Zipline over ocean',
        'Flamingo encounters',
        'Silver Cove lagoon',
        'Beach volleyball',
      ],
      bestFor: ['Active travelers', 'Families', 'Snorkelers', 'Groups'],
      duration: '7-8 hours',
    },
  ]

  return (
    <>
      <Script
        id="schema-bahamas-cruise"
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
                Bahamas
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-teal-500 via-blue-600 to-blue-700 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Bahamas Cruises from Newark & Essex County
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Your Quick Escape to Paradise - Just 3 Days Away from Cape Liberty
              </p>
              <p className="text-lg mb-8 max-w-3xl mx-auto">
                Perfect for Essex County families seeking sunshine, crystal-clear waters, and island
                adventures without the long flight. Depart from nearby Cape Liberty for weekend
                getaways or week-long Bahamas explorations.
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
                Quick 3-day getaways from $399 • Family packages available
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

        {/* Why Bahamas from Newark Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
                Why Essex County Families Choose Bahamas Cruises
              </h2>

              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-700 leading-relaxed mb-6">
                  For Essex County residents, a Bahamas cruise from Cape Liberty offers the perfect
                  tropical escape without the hassle of airports, long flights, or complicated
                  logistics. In just three days, you can trade the hustle of Newark, Montclair, or
                  Livingston for the pristine beaches of Nassau, the thrills of Perfect Day at
                  CocoCay, or the natural beauty of Grand Bahama Island.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The Bahamas, located just 180 miles off Florida's coast and about 1,000 nautical
                  miles from Cape Liberty, provide an ideal cruise destination for both first-time
                  cruisers and seasoned travelers. The short sailing distance means you can enjoy a
                  long weekend getaway without using much vacation time - perfect for busy Essex
                  County professionals and families with school schedules to consider.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-6 text-blue-900">
                  The Perfect Quick Getaway from Essex County
                </h3>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-teal-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-teal-900">
                      🌴 Minimal Time, Maximum Relaxation
                    </h4>
                    <p className="text-gray-700">
                      Leave Cape Liberty on a Friday afternoon and return Monday morning refreshed.
                      With just one sea day each way, you'll have a full day or two exploring
                      Nassau, swimming at private islands, or enjoying Freeport's beaches. It's the
                      equivalent of flying to the Caribbean but without airport security, baggage
                      fees, or flight delays.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-blue-900">
                      👨‍👩‍👧‍👦 Family-Friendly Paradise
                    </h4>
                    <p className="text-gray-700">
                      Bahamas cruises are perfect for Essex County families. Kids love the adventure
                      of cruising, the ship's pools and activities, and the excitement of visiting
                      tropical islands. Parents appreciate the ease of unpacking once, supervised
                      kids' clubs, and the all-inclusive nature of cruise vacations. From toddlers
                      to teenagers, everyone finds something to love.
                    </p>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-orange-900">
                      💰 Incredible Value from Your Doorstep
                    </h4>
                    <p className="text-gray-700">
                      When you factor in the proximity of Cape Liberty (just 15-35 minutes from
                      Essex County), the money saved on flights, and the all-inclusive nature of
                      cruising, Bahamas cruises offer exceptional value. Three-day cruises start at
                      $399 per person, including accommodation, meals, entertainment, and
                      transportation to multiple islands.
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-purple-900">
                      🎯 Perfect for Special Occasions
                    </h4>
                    <p className="text-gray-700">
                      Essex County residents love Bahamas cruises for milestone celebrations.
                      Whether it's a birthday, anniversary, graduation, or family reunion, a quick
                      Bahamas cruise provides a special backdrop without the complexity of
                      international travel. Many locals use these cruises for bachelorette parties
                      and romantic getaways.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bahamas Islands Guide */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900">
                Bahamas Islands & Ports You'll Visit
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                From bustling Nassau to exclusive private islands, each stop offers unique
                experiences perfect for Essex County travelers seeking sun, sand, and adventure.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bahamasIslands.map((island, idx) => (
                  <IslandCard key={idx} {...island} />
                ))}
              </div>

              <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                  Nassau Deep Dive: The Crown Jewel
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-orange-500">
                      Must-Do Experiences
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        • <strong>Atlantis Day Pass:</strong> $195 adults, includes water park
                      </li>
                      <li>
                        • <strong>Swimming with Dolphins:</strong> Blue Lagoon Island ($195)
                      </li>
                      <li>
                        • <strong>Queen's Staircase:</strong> Free historic 65-step limestone
                        stairway
                      </li>
                      <li>
                        • <strong>Junkanoo Beach:</strong> Free public beach, 10-min walk from port
                      </li>
                      <li>
                        • <strong>Graycliff Rum Distillery:</strong> Tour and tasting ($45)
                      </li>
                      <li>
                        • <strong>Straw Market:</strong> Local crafts and souvenirs
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-600">
                      Local Essex County Tips
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Book Atlantis passes on ship to save vs. gate prices</li>
                      <li>• Junkanoo Beach has chair rentals for $10-15</li>
                      <li>• Taxi to Paradise Island is $8-10 per person</li>
                      <li>• Bring cash - many vendors don't take cards</li>
                      <li>• Senior Frog's near port is popular with NJ cruisers</li>
                      <li>• Buy rum at duty-free for Essex County friends</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-teal-50 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3 text-teal-800">
                    🏝️ Perfect Day at CocoCay Insider Guide
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Royal Caribbean's private island is a favorite among Essex County families.
                    Here's what's included with your cruise fare:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <strong>Free Amenities:</strong>
                      <ul className="mt-2 space-y-1">
                        <li>✓ Chill Island beaches and loungers</li>
                        <li>✓ Oasis Lagoon freshwater pool</li>
                        <li>✓ Splashaway Bay kids water park</li>
                        <li>✓ Sports courts and activities</li>
                        <li>✓ Lunch at multiple venues</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Worth the Splurge:</strong>
                      <ul className="mt-2 space-y-1">
                        <li>• Thrill Waterpark: $99-139 per person</li>
                        <li>• Up Up and Away balloon: $99-119</li>
                        <li>• Coco Beach Club: $199 (adults only)</li>
                        <li>• Zip line: $89-109</li>
                        <li>• Cabanas: $299-1,599 (sleeps 4-8)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Itinerary Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
                Popular Bahamas Cruise Itineraries from Cape Liberty
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6">
                    <h3 className="text-2xl font-semibold mb-2">3-Night Quick Escape</h3>
                    <p className="text-green-100">Perfect for long weekends</p>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="font-semibold text-gray-700 mb-2">Itinerary:</p>
                      <ul className="text-gray-600 space-y-1">
                        <li>Day 1: Depart Cape Liberty (4 PM)</li>
                        <li>Day 2: Nassau, Bahamas</li>
                        <li>Day 3: At Sea</li>
                        <li>Day 4: Return Cape Liberty (6 AM)</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <p className="font-semibold text-gray-700 mb-2">Best For:</p>
                      <p className="text-gray-600">
                        First-time cruisers, couples, weekend warriors
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-orange-500 mb-2">From $399</p>
                    <p className="text-sm text-gray-600">per person, interior cabin</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6">
                    <h3 className="text-2xl font-semibold mb-2">5-Night Island Hopper</h3>
                    <p className="text-blue-100">Two islands, more fun</p>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="font-semibold text-gray-700 mb-2">Itinerary:</p>
                      <ul className="text-gray-600 space-y-1">
                        <li>Day 1: Depart Cape Liberty</li>
                        <li>Day 2: At Sea</li>
                        <li>Day 3: Nassau, Bahamas</li>
                        <li>Day 4: CocoCay or Freeport</li>
                        <li>Day 5: At Sea</li>
                        <li>Day 6: Return Cape Liberty</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <p className="font-semibold text-gray-700 mb-2">Best For:</p>
                      <p className="text-gray-600">Families, beach lovers, adventure seekers</p>
                    </div>
                    <p className="text-2xl font-bold text-orange-500 mb-2">From $599</p>
                    <p className="text-sm text-gray-600">per person, ocean view</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
                    <h3 className="text-2xl font-semibold mb-2">7-Night Bahamas & Florida</h3>
                    <p className="text-purple-100">Complete Caribbean experience</p>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="font-semibold text-gray-700 mb-2">Itinerary:</p>
                      <ul className="text-gray-600 space-y-1">
                        <li>Day 1: Depart Cape Liberty</li>
                        <li>Day 2: At Sea</li>
                        <li>Day 3: Port Canaveral, FL</li>
                        <li>Day 4: Nassau, Bahamas</li>
                        <li>Day 5: CocoCay</li>
                        <li>Day 6-7: At Sea</li>
                        <li>Day 8: Return Cape Liberty</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <p className="font-semibold text-gray-700 mb-2">Best For:</p>
                      <p className="text-gray-600">Full vacation, theme park combo, families</p>
                    </div>
                    <p className="text-2xl font-bold text-orange-500 mb-2">From $899</p>
                    <p className="text-sm text-gray-600">per person, balcony cabin</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                  Essex County Cruiser's Calendar
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-green-700">
                      Best Times to Cruise
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        • <strong>April-May:</strong> Perfect weather, spring break crowds gone
                      </li>
                      <li>
                        • <strong>September-November:</strong> Great weather, lower prices
                      </li>
                      <li>
                        • <strong>Presidents Week:</strong> Popular with Essex County schools off
                      </li>
                      <li>
                        • <strong>Memorial Day Weekend:</strong> Kick off summer (book early)
                      </li>
                      <li>
                        • <strong>Labor Day Weekend:</strong> Last summer hurrah
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-red-700">Times to Avoid</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        • <strong>June-August:</strong> Hot, humid, possible hurricanes
                      </li>
                      <li>
                        • <strong>Spring Break:</strong> Crowded ships and islands
                      </li>
                      <li>
                        • <strong>Christmas Week:</strong> Highest prices of the year
                      </li>
                      <li>
                        • <strong>Hurricane Season Peak:</strong> September-October
                      </li>
                      <li>
                        • <strong>January-February:</strong> Can be choppy seas
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Planning Your Trip Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
                Planning Your Bahamas Cruise from Essex County
              </h2>

              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                  What to Pack for Your Bahamas Cruise
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-orange-500">
                      Essentials Checklist
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>✓ Passport or birth certificate + ID</li>
                      <li>✓ Sunscreen (SPF 30+ reef-safe)</li>
                      <li>✓ 2-3 swimsuits (they take time to dry)</li>
                      <li>✓ Light layers for air-conditioned ship</li>
                      <li>✓ Comfortable walking shoes</li>
                      <li>✓ Flip-flops or water shoes</li>
                      <li>✓ Day bag for shore excursions</li>
                      <li>✓ Medications in original containers</li>
                      <li>✓ Power strip (non-surge protected)</li>
                      <li>✓ Waterproof phone case</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-600">Dress Codes</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>
                        • <strong>Daytime:</strong> Resort casual, swimwear on deck
                      </li>
                      <li>
                        • <strong>Dinner:</strong> Smart casual (no shorts/flip-flops)
                      </li>
                      <li>
                        • <strong>Formal Night:</strong> Optional on 7+ night cruises
                      </li>
                      <li>
                        • <strong>Nassau:</strong> Modest dress for downtown
                      </li>
                      <li>
                        • <strong>Beach Days:</strong> Cover-ups required off beach
                      </li>
                      <li>
                        • <strong>Ship AC:</strong> Bring light sweater/wrap
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3 text-yellow-800">
                    💡 Essex County Packing Tips
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Local insights from experienced Newark-area cruisers:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      • Buy sunscreen at CVS/Walgreens before leaving - ship prices are 3x higher
                    </li>
                    <li>• Pack a small bag for embarkation day - luggage arrives at cabin later</li>
                    <li>• Bring $1 and $5 bills for tips in Nassau (get from local bank)</li>
                    <li>• Wine allowance: 2 bottles per cabin at embarkation</li>
                    <li>• Stop at ShopRite Bayonne for forgotten items before boarding</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                  Transportation & Logistics
                </h3>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 text-green-700">
                    Getting to Cape Liberty from Essex County
                  </h4>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <p className="font-semibold text-blue-600 mb-2">Drive & Park</p>
                      <p className="text-sm text-gray-700">
                        15-35 min drive. Port parking $25-40/day. Book online to save $5/day.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="font-semibold text-purple-600 mb-2">Uber/Lyft</p>
                      <p className="text-sm text-gray-700">
                        $25-55 from Essex County. Split with other cruisers to save.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="font-semibold text-orange-600 mb-2">Private Transfer</p>
                      <p className="text-sm text-gray-700">
                        $120-180 per vehicle. Door-to-door service, no parking worries.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3 text-blue-800">
                    📍 Day-of-Cruise Timeline
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Sample schedule for Essex County residents (4 PM sailing):
                  </p>

                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex">
                      <span className="font-semibold mr-3">10:00 AM:</span>
                      <span>Leave home in Newark/Montclair area</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold mr-3">10:30 AM:</span>
                      <span>Arrive Cape Liberty, drop luggage with porters</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold mr-3">11:00 AM:</span>
                      <span>Park and take shuttle to terminal</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold mr-3">11:30 AM:</span>
                      <span>Check-in and security screening</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold mr-3">12:00 PM:</span>
                      <span>Board ship, lunch at buffet</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold mr-3">1:00 PM:</span>
                      <span>Explore ship, cabin ready</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold mr-3">3:30 PM:</span>
                      <span>Mandatory safety drill</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold mr-3">4:00 PM:</span>
                      <span>Sail away party on deck!</span>
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
                Frequently Asked Questions About Bahamas Cruises from Newark
              </h2>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <FAQItem
                  question="How long is a Bahamas cruise from Newark/Cape Liberty?"
                  answer="Bahamas cruises from Cape Liberty range from quick 3-night weekend getaways to 9-night extended voyages. The most popular options for Essex County residents are 3-4 night long weekend cruises (perfect for trying cruising or when you can't take much time off) and 7-night full week cruises that often combine the Bahamas with Florida ports or multiple Bahamas islands. The 5-night cruises offer a sweet spot - enough time to relax and visit 2-3 ports without using too much vacation time."
                />

                <FAQItem
                  question="What is the best time of year for a Bahamas cruise from New Jersey?"
                  answer="The Bahamas enjoy year-round cruise weather, but the best times for Essex County residents are April-May and September-November. These months offer perfect weather (75-85°F), calm seas, and fewer crowds. Summer (June-August) is popular with families when Essex County schools are out but can be hot, humid, and occasionally affected by tropical weather. Winter cruises (December-March) offer an escape from New Jersey cold but seas can be rougher. Hurricane season officially runs June-November, with peak activity in September-October, though modern ships easily navigate around any weather systems."
                />

                <FAQItem
                  question="Do I need a passport for a Bahamas cruise from Cape Liberty?"
                  answer="For closed-loop cruises (departing and returning to Cape Liberty), U.S. citizens technically only need a government-issued birth certificate and driver's license. However, we strongly recommend all Essex County cruisers get a passport. Why? If you miss the ship in Nassau or have a medical emergency requiring you to fly home, you'll need a passport to re-enter the U.S. by air. Plus, checking in with a passport is faster and easier. Children under 16 can use just a birth certificate. Non-U.S. citizens should bring their passport and green card or appropriate visa."
                />

                <FAQItem
                  question="Which cruise lines offer Bahamas cruises from Cape Liberty?"
                  answer="Royal Caribbean is the dominant cruise line for Bahamas cruises from Cape Liberty, with year-round sailings on ships like Anthem of the Seas (one of the most technologically advanced ships at sea) and Liberty of the Seas. These ships offer everything from rock climbing and surf simulators to Broadway shows and specialty dining. Celebrity Cruises occasionally includes Bahamas ports on longer Caribbean itineraries. During repositioning seasons (spring and fall), you might find Norwegian or Carnival ships offering special Bahamas sailings from Cape Liberty. Each line has its style - Royal Caribbean for families and innovation, Celebrity for modern luxury."
                />

                <FAQItem
                  question="How far are the Bahamas from Cape Liberty cruise port?"
                  answer="The Bahamas are approximately 1,000 nautical miles from Cape Liberty. Nassau, the most common first stop, is reached after about 36 hours of sailing (1.5 days). This distance is perfect for short cruises - you'll depart Cape Liberty around 4 PM, enjoy a relaxing sea day with all the ship's amenities, and wake up the following morning in Nassau. The relatively short distance means even 3-night cruises give you a full day in port, while longer cruises can visit multiple islands. The journey itself is part of the experience, with most of the sailing done overnight while you sleep."
                />

                <FAQItem
                  question="What should Essex County families budget for a Bahamas cruise?"
                  answer="Budget $150-300 per person per day for a Bahamas cruise, all-inclusive. The cruise fare (starting at $399 for 3-nights, $899 for 7-nights) covers your cabin, all meals in main dining rooms and buffets, most entertainment, and kids' clubs. Additional costs include: gratuities ($15/day per person), drinks ($50-80/day for beverage packages), specialty dining ($30-50 per restaurant), shore excursions ($75-200 per person in Nassau), spa services, casino, and shopping. Essex County families often spend $2,000-4,000 total for a family of four on a 7-night cruise, including everything. Pro tip: Book drink packages and excursions in advance for savings, and set a casino/shopping budget beforehand."
                />

                <FAQItem
                  question="What are the must-do activities in Nassau for first-time visitors?"
                  answer="For Essex County cruisers visiting Nassau for the first time, start with these highlights: Atlantis Resort's water park and aquarium (book ship's excursion for best price - $195 adults), swimming with dolphins at Blue Lagoon Island ($195, includes lunch and beach time), or for budget-conscious families, take a $8 taxi to Junkanoo Beach for free beach access with $10 chair rentals. History buffs should see Queen's Staircase (free) and Fort Charlotte ($5). Shop at the famous Straw Market for authentic Bahamian crafts (bring cash and bargain - expect to pay 50-60% of asking price). For families, the Pirates Museum ($13) is a hit with kids. Book excursions through the cruise line for guarantee ship won't leave without you."
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready for Your Bahamas Escape?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Let our Essex County cruise experts help you plan the perfect Bahamas getaway from
              Cape Liberty. From quick weekend escapes to week-long island adventures - we'll find
              the ideal cruise for your family.
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
                className="bg-white text-secondary-700 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Get Your Free Quote
              </Link>
            </div>
            <p className="mt-6 text-secondary-100">
              Local experts • Best prices guaranteed • Group rates available
            </p>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6 text-center text-blue-900">
                Explore More Cruise Options
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <Link
                  href="/cruises/from-newark"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
                >
                  <h4 className="font-semibold text-blue-700 mb-2">All Newark Cruises</h4>
                  <p className="text-sm text-gray-600">Every departure option</p>
                </Link>
                <Link
                  href="/cruises/caribbean"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
                >
                  <h4 className="font-semibold text-blue-700 mb-2">Caribbean Cruises</h4>
                  <p className="text-sm text-gray-600">Eastern & Western routes</p>
                </Link>
                <Link
                  href="/cruises/cape-liberty-port"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
                >
                  <h4 className="font-semibold text-blue-700 mb-2">Port Guide</h4>
                  <p className="text-sm text-gray-600">Cape Liberty info</p>
                </Link>
                <Link
                  href="/contact"
                  className="bg-orange-100 p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
                >
                  <h4 className="font-semibold text-orange-700 mb-2">Book Now</h4>
                  <p className="text-sm text-gray-600">Start planning today</p>
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
