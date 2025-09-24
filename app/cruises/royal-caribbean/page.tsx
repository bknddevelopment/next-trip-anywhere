import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, Mail, MapPin, Clock, Award, Ship, Users, Globe } from 'lucide-react'
import { getCruiseLineBySlug, getDealsByCruiseLine } from '@/lib/data/cruise-lines'
import { getNewestShips, getLargestShips } from '@/lib/data/royal-caribbean-ships'

export const metadata: Metadata = {
  title: 'Royal Caribbean Cruises 2026 | Kids Sail FREE + $50 Onboard Credit',
  description:
    '⚓ BOOK NOW: Royal Caribbean from $299/person. Kids sail FREE! Icon of the Seas availability. Perfect Day at CocoCay included. Call 833-874-1019 for instant quotes & exclusive perks.',
  keywords:
    'royal caribbean, royal caribbean cruises, icon of the seas, perfect day at cococay, wonder of the seas, symphony of the seas, caribbean cruises, alaska cruises, cruise deals',
  openGraph: {
    title: "Royal Caribbean Cruises - World's Most Innovative Cruise Line",
    description:
      "Experience the world's largest ships with groundbreaking amenities. Exclusive group rates and perks available when you book with Next Trip Anywhere.",
    url: 'https://nexttripanywhere.com/cruises/royal-caribbean',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/royal-caribbean-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Royal Caribbean Cruise Ships',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/royal-caribbean',
  },
}

// Get Royal Caribbean data
const royalCaribbean = getCruiseLineBySlug('royal-caribbean')!
const rcDeals = getDealsByCruiseLine('royal-caribbean')
const newestShips = getNewestShips(3)
const largestShips = getLargestShips(3)

// Schema markup for Royal Caribbean
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Next Trip Anywhere - Royal Caribbean Specialist',
  description:
    'Authorized Royal Caribbean travel agency offering exclusive deals and Crown & Anchor benefits',
  url: 'https://nexttripanywhere.com/cruises/royal-caribbean',
  telephone: '+1-833-874-1019',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Newark',
    addressRegion: 'NJ',
    addressCountry: 'US',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '2456',
  },
}

const cruiseLineSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Royal Caribbean International',
  url: 'https://nexttripanywhere.com/cruises/royal-caribbean',
  description: royalCaribbean?.description,
  foundingDate: '1968',
  numberOfEmployees: '85000',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: royalCaribbean?.rating.value,
    reviewCount: royalCaribbean?.rating.count,
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
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
      name: 'Royal Caribbean',
      item: 'https://nexttripanywhere.com/cruises/royal-caribbean',
    },
  ],
}

export default function RoyalCaribbeanPage() {
  return (
    <>
      <Script
        id="royal-caribbean-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [organizationSchema, cruiseLineSchema, breadcrumbSchema],
          }),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-100 py-3" aria-label="Breadcrumb">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link href="/cruises" className="text-gray-700 hover:text-blue-600">
                Cruises
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-blue-600 font-semibold">Royal Caribbean</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/ocean-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
              <Award className="w-4 h-4" />
              WAVE SEASON - Exclusive Group Rates Available!
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Royal Caribbean International
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/95">
              The World&apos;s Most Innovative Cruise Line
            </p>
            <p className="text-lg mb-8 text-blue-50 max-w-3xl mx-auto">
              From the world&apos;s largest ship Icon of the Seas to the award-winning Perfect Day
              at CocoCay, experience vacation adventures that only Royal Caribbean can deliver.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call 833-874-1019
              </a>
              <Link
                href="/cruises/royal-caribbean/deals"
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                View Exclusive Deals
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400">27</div>
              <div className="text-white/90">Ships in Fleet</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400">300+</div>
              <div className="text-white/90">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400">#1</div>
              <div className="text-white/90">Innovation at Sea</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400">4.8★</div>
              <div className="text-white/90">Guest Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 text-center">
            <span className="font-bold text-lg">LIMITED TIME:</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Kids Sail FREE</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Special 2nd Guest Pricing</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              Complimentary Upgrades Available
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Onboard Credits Included</span>
          </div>
        </div>
      </section>

      {/* Why Book Royal Caribbean */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">
              Why Book Royal Caribbean with Next Trip Anywhere?
            </h2>
            <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
              As Crown & Anchor preferred partners, we offer exclusive perks and insider access you
              won&apos;t find anywhere else
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-blue-900">Exclusive Perks</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Complimentary cabin upgrades when available</li>
                  <li>• Valuable onboard credits included</li>
                  <li>• Priority check-in and boarding</li>
                  <li>• Specialty dining packages</li>
                  <li>• WiFi and beverage package deals</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-blue-900">Expert Service</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Crown & Anchor specialists</li>
                  <li>• Best cabin selection guidance</li>
                  <li>• Group rates and amenities</li>
                  <li>• Shore excursion planning</li>
                  <li>• 24/7 support while cruising</li>
                </ul>
              </div>

              <div className="bg-orange-50 rounded-lg p-6">
                <div className="bg-orange-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-blue-900">Best Value</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Price match guarantee</li>
                  <li>• Exclusive group rates</li>
                  <li>• Wave season specials</li>
                  <li>• Kids sail free promotions</li>
                  <li>• Military & senior discounts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ships */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">
              The World&apos;s Most Innovative Ships
            </h2>
            <p className="text-center text-gray-700 mb-12">
              From record-breaking Icon Class to revolutionary Oasis Class ships
            </p>

            {/* Newest Ships */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-blue-900 flex items-center gap-2">
                <Ship className="w-6 h-6" />
                Newest Ships in the Fleet
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {newestShips.map((ship) => (
                  <div
                    key={ship.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-xl text-blue-900">{ship.name}</h4>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                          {ship.yearBuilt}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{ship.class}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-semibold">
                            {ship.passengerCapacity.toLocaleString()} guests
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tonnage:</span>
                          <span className="font-semibold">
                            {ship.grossTonnage.toLocaleString()} GT
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Homeports:</span>
                          <span className="font-semibold text-right">{ship.homeports[0]}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="text-sm text-gray-700">Key Features:</div>
                        <ul className="text-sm text-gray-700 mt-2 space-y-1">
                          {ship.highlights.slice(0, 3).map((highlight, index) => (
                            <li key={index}>• {highlight}</li>
                          ))}
                        </ul>
                      </div>
                      <Link
                        href="/cruises/royal-caribbean/ships"
                        className="mt-4 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        View Ship Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Perfect Day at CocoCay */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-8 text-white">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Perfect Day at CocoCay</h3>
                  <p className="mb-4">
                    Experience Royal Caribbean&apos;s award-winning private island in the Bahamas.
                    Featuring the tallest waterslide in North America, the largest freshwater pool
                    in the Caribbean, and the only balloon ride offering 450-foot high views of
                    paradise.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li>✓ Thrill Waterpark with 13 slides</li>
                    <li>✓ Up, Up and Away helium balloon</li>
                    <li>✓ Coco Beach Club exclusive retreat</li>
                    <li>✓ Zip line across the island</li>
                    <li>✓ Complimentary beaches and dining</li>
                  </ul>
                  <Link
                    href="/cruises/royal-caribbean/deals"
                    className="inline-block bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Book Perfect Day Cruises
                  </Link>
                </div>
                <div className="w-full md:w-1/3 bg-white/10 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold mb-2">4.9/5</div>
                  <div className="text-xl mb-2">Guest Rating</div>
                  <div className="text-sm opacity-90">Voted Best Private Island</div>
                  <div className="text-sm opacity-90">- Cruise Critic 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Deals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">
              Exclusive Royal Caribbean Deals
            </h2>
            <p className="text-center text-gray-700 mb-12">
              Limited-time offers available only through Next Trip Anywhere
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {rcDeals.slice(0, 4).map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors"
                >
                  {deal.limitedTime && (
                    <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                      LIMITED TIME
                    </span>
                  )}
                  <h3 className="font-bold text-xl mb-2 text-blue-900">{deal.title}</h3>
                  <p className="text-gray-700 mb-4">{deal.description}</p>

                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <div className="text-sm text-gray-700 mb-1">Exclusive Offer</div>
                    <div className="text-xl font-bold text-green-600">Best Available Rates</div>
                    <div className="text-sm text-orange-600 font-semibold mt-1">
                      Plus valuable perks included
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="text-sm text-gray-700 mb-2">Includes:</div>
                    <ul className="text-sm text-gray-700 space-y-1 mb-4">
                      {deal.perks.slice(0, 3).map((perk, index) => (
                        <li key={index}>✓ {perk}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href="tel:+18338741019"
                      className="flex-1 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Call to Book
                    </a>
                    <Link
                      href="/cruises/royal-caribbean/deals"
                      className="flex-1 bg-gray-100 text-blue-600 text-center py-2 rounded hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/cruises/royal-caribbean/deals"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
              >
                View All Royal Caribbean Deals →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Itineraries */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
              Popular Royal Caribbean Itineraries
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {royalCaribbean?.popularItineraries.map((itinerary, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-lg mb-2 text-blue-900">{itinerary}</h3>
                  <div className="text-sm text-gray-700 mb-3">Multiple ships available</div>
                  <Link
                    href="/cruises/royal-caribbean/deals"
                    className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                  >
                    View Sailings →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Crown & Anchor Benefits */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Crown & Anchor Society Benefits</h2>
            <p className="text-xl mb-8 text-white/95">
              Earn points and unlock exclusive perks with every Royal Caribbean cruise
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-2xl font-bold mb-2">Gold</div>
                <div className="text-sm text-blue-200 mb-3">3+ Points</div>
                <ul className="text-sm text-left space-y-1">
                  <li>• SeaPass recognition</li>
                  <li>• Exclusive offers</li>
                  <li>• Priority check-in</li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-2xl font-bold mb-2">Platinum</div>
                <div className="text-sm text-blue-200 mb-3">30+ Points</div>
                <ul className="text-sm text-left space-y-1">
                  <li>• Priority boarding</li>
                  <li>• Spa discount</li>
                  <li>• Specialty restaurant priority</li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-2xl font-bold mb-2">Diamond</div>
                <div className="text-sm text-blue-200 mb-3">80+ Points</div>
                <ul className="text-sm text-left space-y-1">
                  <li>• Complimentary drinks</li>
                  <li>• Executive lounge access</li>
                  <li>• Priority tender tickets</li>
                </ul>
              </div>
            </div>

            <p className="text-white/90 mb-6">
              As your Crown & Anchor specialist, we help maximize your member benefits and ensure
              you receive all available perks
            </p>

            <a
              href="tel:+18338741019"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Call Our Crown & Anchor Experts
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Book Your Royal Caribbean Adventure?
            </h2>
            <p className="text-xl mb-8">
              Our Royal Caribbean specialists are standing by to help you plan the perfect cruise
              with exclusive perks you won&apos;t find anywhere else
            </p>

            <div className="bg-white/10 rounded-lg p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Clock className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-bold">Hours</div>
                  <div className="text-sm">Mon-Fri: 9AM-8PM EST</div>
                  <div className="text-sm">Sat-Sun: 10AM-6PM EST</div>
                </div>
                <div>
                  <Phone className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-bold">Call Us</div>
                  <a href="tel:+18338741019" className="text-xl font-bold hover:text-orange-400">
                    833-874-1019
                  </a>
                </div>
                <div>
                  <Mail className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-bold">Email</div>
                  <a
                    href="mailto:royalcaribbean@nexttripanywhere.com"
                    className="hover:text-orange-400"
                  >
                    royalcaribbean@nexttripanywhere.com
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now for Best Rates
              </a>
              <Link
                href="/book"
                className="inline-flex items-center justify-center bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                Request a Quote Online
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <h2>Your Royal Caribbean Cruise Experts</h2>
            <p>
              Next Trip Anywhere is your authorized Royal Caribbean travel partner, specializing in
              creating unforgettable cruise vacations aboard the world&apos;s most innovative ships.
              With over 14 years of experience and Crown & Anchor Society expertise, we provide
              exclusive benefits and insider knowledge that ensure you get the most value from your
              Royal Caribbean cruise.
            </p>

            <h3>The Royal Caribbean Difference</h3>
            <p>
              Royal Caribbean International has revolutionized cruising with industry-first
              innovations that turn ordinary vacations into extraordinary adventures. From the
              record-breaking Icon of the Seas with its Category 6 water park to Perfect Day at
              CocoCay&apos;s thrilling attractions, Royal Caribbean delivers experiences you
              won&apos;t find with any other cruise line.
            </p>

            <h3>Fleet Innovation & Ship Classes</h3>
            <ul>
              <li>
                <strong>Icon Class:</strong> The newest and largest ships in the world, featuring 8
                distinct neighborhoods and the first suspended infinity pool at sea
              </li>
              <li>
                <strong>Oasis Class:</strong> Revolutionary mega-ships with Central Park, Boardwalk,
                and the AquaTheater
              </li>
              <li>
                <strong>Quantum Class:</strong> High-tech vessels with North Star observation
                capsules, RipCord skydiving, and Two70 venues
              </li>
              <li>
                <strong>Freedom Class:</strong> Family-friendly ships with FlowRider surf simulators
                and ice skating rinks
              </li>
              <li>
                <strong>Voyager Class:</strong> The ships that started it all with rock climbing
                walls and Royal Promenades
              </li>
            </ul>

            <h3>Why Book Royal Caribbean Through Next Trip Anywhere?</h3>
            <p>
              While you can book directly with Royal Caribbean, booking through Next Trip Anywhere
              provides significant advantages:
            </p>
            <ul>
              <li>Access to exclusive group rates with significant savings</li>
              <li>Complimentary cabin upgrades based on availability</li>
              <li>Valuable onboard credits included with every booking</li>
              <li>Free or reduced-rate beverage packages and specialty dining</li>
              <li>Crown & Anchor Society point maximization strategies</li>
              <li>Expert guidance on cabin selection to avoid noise and motion</li>
              <li>Personalized shore excursion recommendations</li>
              <li>24/7 support before, during, and after your cruise</li>
            </ul>

            <h3>Perfect Day at CocoCay - Exclusive Paradise</h3>
            <p>
              Royal Caribbean&apos;s massive transformation of their private island in the Bahamas
              has created the ultimate cruise destination. Perfect Day at CocoCay features Thrill
              Waterpark with 13 slides, the tallest waterslide in North America (Daredevil&apos;s
              Peak), the largest wave pool in the Caribbean, and the Up, Up and Away helium balloon
              offering 450-foot high panoramic views. Most Royal Caribbean Caribbean itineraries now
              include a stop at this award-winning destination.
            </p>

            <h3>Popular Royal Caribbean Cruise Destinations</h3>
            <p>
              From Royal Caribbean&apos;s home ports across the United States, you can explore
              incredible destinations:
            </p>
            <ul>
              <li>
                <strong>Caribbean:</strong> Eastern, Western, and Southern routes to tropical
                islands
              </li>
              <li>
                <strong>Alaska:</strong> Glacier viewing and wildlife from Seattle, Vancouver, and
                Seward
              </li>
              <li>
                <strong>Europe:</strong> Mediterranean, Northern Europe, and Transatlantic crossings
              </li>
              <li>
                <strong>Asia:</strong> Singapore, Hong Kong, Japan, and Southeast Asia explorations
              </li>
              <li>
                <strong>Australia & New Zealand:</strong> Sydney, Melbourne, and Fjordland
                adventures
              </li>
            </ul>

            <h3>Book Your Royal Caribbean Cruise Today</h3>
            <p>
              Don&apos;t miss out on the exclusive perks and savings available only through Next
              Trip Anywhere. Our Royal Caribbean specialists are standing by to help you choose the
              perfect ship, itinerary, and cabin for your dream vacation. With our price match
              guarantee and exclusive group rates, you&apos;ll get more value than booking anywhere
              else. Contact us today for a free consultation and discover why millions choose Royal
              Caribbean for unforgettable cruise vacations.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
