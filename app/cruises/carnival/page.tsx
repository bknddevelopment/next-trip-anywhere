import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, Mail, Ship, Users, Globe, Star, Anchor, PartyPopper } from 'lucide-react'
import { getCruiseLineBySlug, getDealsByCruiseLine } from '@/lib/data/cruise-lines'

export const metadata: Metadata = {
  title: "Carnival Cruises | Fun Ships | America's Cruise Line",
  description:
    'Book Carnival cruises at exclusive rates. Choose fun with BOLT roller coaster, Dr. Seuss at Sea, and Guy Fieri restaurants. Kids sail free! Early Saver special pricing available. Call 833-874-1019.',
  keywords:
    'carnival cruise, carnival cruise line, fun ships, carnival deals, mardi gras ship, carnival celebration, cheap cruises, caribbean cruises',
  openGraph: {
    title: 'Carnival Cruise Line - Choose Fun at Sea',
    description:
      "America's Cruise Line offers affordable fun with the newest fleet and most departures from US ports. Exclusive group rates available when you book with us.",
    url: 'https://nexttripanywhere.com/cruises/carnival',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/carnival-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Carnival Cruise Ships',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/carnival',
  },
}

// Get Carnival data
const carnival = getCruiseLineBySlug('carnival')!
const carnivalDeals = getDealsByCruiseLine('carnival')

// Schema markup
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Next Trip Anywhere - Carnival Specialist',
  description:
    'Authorized Carnival Cruise Line travel agency offering exclusive deals and VIFP Club benefits',
  url: 'https://nexttripanywhere.com/cruises/carnival',
  telephone: '+1-833-874-1019',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Newark',
    addressRegion: 'NJ',
    addressCountry: 'US',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    reviewCount: '3128',
  },
}

const cruiseLineSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Carnival Cruise Line',
  url: 'https://nexttripanywhere.com/cruises/carnival',
  description: carnival?.description,
  foundingDate: '1972',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: carnival?.rating.value,
    reviewCount: carnival?.rating.count,
  },
}

// Fun features data
const funFeatures = [
  {
    icon: '🎢',
    title: 'BOLT Roller Coaster',
    description: 'First roller coaster at sea',
  },
  {
    icon: '💦',
    title: 'WaterWorks',
    description: 'Aqua parks with waterslides',
  },
  {
    icon: '🍔',
    title: "Guy's Burger Joint",
    description: 'Free burgers all day',
  },
  {
    icon: '🍕',
    title: '24/7 Pizza',
    description: 'Complimentary pizzeria',
  },
  {
    icon: '🎭',
    title: 'Playlist Productions',
    description: 'Broadway-style shows',
  },
  {
    icon: '🍹',
    title: 'RedFrog Rum Bar',
    description: 'Caribbean-inspired drinks',
  },
]

export default function CarnivalPage() {
  return (
    <>
      <Script
        id="carnival-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [organizationSchema, cruiseLineSchema],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-red-600 via-red-500 to-orange-500 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/confetti-pattern.svg')] opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-bounce">
              <PartyPopper className="w-4 h-4" />
              EARLY SAVER - Exclusive Group Rates!
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Carnival Cruise Line
            </h1>
            <p className="text-xl md:text-2xl mb-4">Choose Fun® with America&apos;s Cruise Line</p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              From the revolutionary Mardi Gras with the first roller coaster at sea to 24 Fun Ships
              departing from 14 US homeports, Carnival delivers affordable vacations packed with
              non-stop entertainment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call 833-874-1019
              </a>
              <Link
                href="/cruises/carnival/deals"
                className="bg-yellow-400 text-red-700 hover:bg-yellow-300 px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                View Fun Deals
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">24</div>
              <div className="text-white">Fun Ships</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">14</div>
              <div className="text-white">US Homeports</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">5M+</div>
              <div className="text-white">Guests Annually</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">4.3★</div>
              <div className="text-white">Guest Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 text-center">
            <span className="font-bold text-lg">LIMITED TIME:</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Early Saver 40% Off</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Kids Sail FREE</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Free Cheers! Package</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Reduced Deposits</span>
          </div>
        </div>
      </section>

      {/* Why Choose Carnival */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-red-700">
              Why Book Carnival with Next Trip Anywhere?
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              As VIFP Club specialists, we offer exclusive perks and insider deals you won&apos;t
              find anywhere else
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-red-50 rounded-lg p-6">
                <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-red-700">Best Value at Sea</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Early Saver exclusive rates</li>
                  <li>• Pack & Go last-minute deals</li>
                  <li>• Complimentary room upgrades</li>
                  <li>• Kids sail free promotions</li>
                  <li>• Flexible deposit options</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <div className="bg-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-red-700">Fun for Everyone</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• BOLT roller coaster at sea</li>
                  <li>• Dr. Seuss at Sea program</li>
                  <li>• Guy Fieri restaurants</li>
                  <li>• WaterWorks aqua parks</li>
                  <li>• 24/7 pizza and ice cream</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-red-700">Most US Departures</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 14 convenient homeports</li>
                  <li>• Year-round Caribbean</li>
                  <li>• Short 3-4 day getaways</li>
                  <li>• Alaska from Seattle</li>
                  <li>• Hawaii from Long Beach</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Features Grid */}
      <section className="py-16 bg-gradient-to-b from-red-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-red-700">
              Only on Carnival Fun Ships
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Exclusive attractions and experiences you won&apos;t find anywhere else at sea
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {funFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-center"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-xl mb-2 text-red-700">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Excel Class Ships Feature */}
            <div className="mt-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-8 text-white">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">
                    Excel Class Ships - The Ultimate Fun Ships
                  </h3>
                  <p className="mb-4">
                    Experience Carnival&apos;s newest and largest ships: Mardi Gras, Carnival
                    Celebration, and Carnival Jubilee. These revolutionary ships feature the first
                    roller coaster at sea, 6 themed zones, and over 20 restaurants.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li>✓ BOLT - The first roller coaster at sea reaching 40 mph</li>
                    <li>✓ Ultimate Playground with 3-story slide</li>
                    <li>✓ Emeril&apos;s Bistro 1397</li>
                    <li>✓ Grand Central zone with 3-story atrium</li>
                    <li>✓ Cloud 9 Spa with thermal suite</li>
                  </ul>
                  <Link
                    href="/cruises/carnival/deals"
                    className="inline-block bg-yellow-400 text-red-700 hover:bg-yellow-300 px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    Book Excel Class Ships
                  </Link>
                </div>
                <div className="w-full md:w-1/3 bg-white/10 rounded-lg p-6 text-center">
                  <Ship className="w-16 h-16 mx-auto mb-3" />
                  <div className="text-3xl font-bold mb-2">6,500+</div>
                  <div className="text-xl mb-2">Guest Capacity</div>
                  <div className="text-sm">Mardi Gras • Celebration • Jubilee</div>
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
            <h2 className="text-3xl font-bold text-center mb-4 text-red-700">
              Carnival Cruise Deals
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Exclusive offers available only through Next Trip Anywhere
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {carnivalDeals.slice(0, 4).map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-red-500 transition-colors"
                >
                  {deal.limitedTime && (
                    <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                      LIMITED TIME
                    </span>
                  )}
                  <h3 className="font-bold text-xl mb-2 text-red-700">{deal.title}</h3>
                  <p className="text-gray-600 mb-4">{deal.description}</p>

                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <div className="text-sm text-gray-600 mb-1">Special Offer</div>
                    <div className="text-xl font-bold text-green-600">Exclusive Group Rates</div>
                    <div className="text-sm text-orange-600 font-semibold mt-1">
                      Plus valuable perks included
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="text-sm text-gray-600 mb-2">Includes:</div>
                    <ul className="text-sm text-gray-700 space-y-1 mb-4">
                      {deal.perks.slice(0, 3).map((perk, index) => (
                        <li key={index}>✓ {perk}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href="tel:+18338741019"
                      className="flex-1 bg-red-600 text-white text-center py-2 rounded hover:bg-red-700 transition-colors"
                    >
                      Call to Book
                    </a>
                    <Link
                      href="/cruises/carnival/deals"
                      className="flex-1 bg-gray-100 text-red-600 text-center py-2 rounded hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/cruises/carnival/deals"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-red-700 px-8 py-3 rounded-lg font-bold transition-colors"
              >
                View All Carnival Deals →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Itineraries */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-red-700">
              Popular Carnival Itineraries
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {carnival?.popularItineraries.map((itinerary, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-lg mb-2 text-red-700">{itinerary}</h3>
                  <div className="text-sm text-gray-600 mb-3">Multiple ships available</div>
                  <Link
                    href="/cruises/carnival/deals"
                    className="text-red-600 hover:text-red-800 text-sm font-semibold"
                  >
                    View Sailings →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VIFP Club Benefits */}
      <section className="py-16 bg-gradient-to-b from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">VIFP Club - Very Important Fun Person</h2>
            <p className="text-xl mb-8 text-blue-100">
              Earn points and unlock exclusive perks with every Carnival cruise
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-2xl font-bold mb-2">Red</div>
                <div className="text-sm text-blue-200 mb-3">2nd Cruise</div>
                <ul className="text-sm text-left space-y-1">
                  <li>• Member offers</li>
                  <li>• Faster to the Fun priority</li>
                  <li>• VIFP pin recognition</li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-2xl font-bold mb-2">Gold</div>
                <div className="text-sm text-blue-200 mb-3">25+ Days</div>
                <ul className="text-sm text-left space-y-1">
                  <li>• Priority boarding</li>
                  <li>• Free drinks at Captain&apos;s toast</li>
                  <li>• Complimentary laundry</li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-2xl font-bold mb-2">Platinum</div>
                <div className="text-sm text-blue-200 mb-3">75+ Days</div>
                <ul className="text-sm text-left space-y-1">
                  <li>• Priority tender tickets</li>
                  <li>• 5% discount on cruises</li>
                  <li>• Complimentary water</li>
                </ul>
              </div>
            </div>

            <p className="text-blue-100 mb-6">
              As your VIFP specialist, we help maximize your member benefits and ensure you receive
              all available perks
            </p>

            <a
              href="tel:+18338741019"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Call Our VIFP Experts
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Choose Fun with Carnival?</h2>
            <p className="text-xl mb-8">
              Our Carnival specialists are ready to help you plan the perfect Fun Ship vacation with
              exclusive perks
            </p>

            <div className="bg-white/10 rounded-lg p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Ship className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-bold">24 Ships</div>
                  <div className="text-sm">Newest fleet at sea</div>
                </div>
                <div>
                  <Phone className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-bold">Call Us</div>
                  <a href="tel:+18338741019" className="text-xl font-bold hover:text-yellow-400">
                    833-874-1019
                  </a>
                </div>
                <div>
                  <Mail className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-bold">Email</div>
                  <a href="mailto:carnival@nexttripanywhere.com" className="hover:text-yellow-400">
                    carnival@nexttripanywhere.com
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-red-700 px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg gap-2"
              >
                <Phone className="w-5 h-5" />
                Call for Best Rates
              </a>
              <Link
                href="/book"
                className="inline-flex items-center justify-center bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <h2>Your Carnival Cruise Experts</h2>
            <p>
              Next Trip Anywhere is your authorized Carnival Cruise Line travel partner,
              specializing in creating fun, affordable cruise vacations aboard America&apos;s Cruise
              Line. With over 14 years of experience and VIFP Club expertise, we provide exclusive
              benefits and insider knowledge that ensure you get the most value from your Carnival
              cruise.
            </p>

            <h3>Why Carnival is America&apos;s Favorite Cruise Line</h3>
            <p>
              Carnival Cruise Line has earned its reputation as America&apos;s Cruise Line by
              offering affordable, fun-filled vacations that appeal to all ages. With more ships
              departing from US homeports than any other cruise line, Carnival makes it easy to
              cruise without expensive flights. Their &quot;Choose Fun&quot; philosophy means
              non-stop entertainment, delicious dining that&apos;s mostly included, and innovative
              attractions you won&apos;t find anywhere else.
            </p>

            <h3>Carnival&apos;s Fleet Innovation</h3>
            <ul>
              <li>
                <strong>Excel Class:</strong> The newest and largest ships featuring BOLT roller
                coaster, 6 themed zones, and over 20 dining venues on Mardi Gras, Carnival
                Celebration, and Carnival Jubilee
              </li>
              <li>
                <strong>Vista Class:</strong> Featuring SkyRide suspended cycling, IMAX Theatre, and
                Havana-themed areas
              </li>
              <li>
                <strong>Dream Class:</strong> Popular ships with WaterWorks, mini golf, and Serenity
                Adult Retreat
              </li>
              <li>
                <strong>Conquest Class:</strong> Classic favorites perfect for families and
                first-time cruisers
              </li>
            </ul>

            <h3>Why Book Carnival Through Next Trip Anywhere?</h3>
            <p>
              While you can book directly with Carnival, booking through Next Trip Anywhere provides
              significant advantages:
            </p>
            <ul>
              <li>Early Saver rates saving up to 40% off published prices</li>
              <li>Access to Pack & Go last-minute deals</li>
              <li>Free room location upgrades based on availability</li>
              <li>Cheers! beverage package discounts and deals</li>
              <li>VIFP Club point maximization strategies</li>
              <li>Expert cabin selection to avoid noise and motion</li>
              <li>Group rates for 8+ staterooms</li>
              <li>24/7 support before, during, and after your cruise</li>
            </ul>

            <h3>Exclusive Carnival Dining & Entertainment</h3>
            <p>
              Carnival revolutionized cruise dining with celebrity chef partnerships and included
              specialty restaurants. Guy Fieri&apos;s Burger Joint and Smokehouse, Emeril&apos;s
              restaurants, and authentic Mexican at BlueIguana Cantina are all included in your
              cruise fare. Plus, enjoy 24/7 pizza and ice cream, ensuring you never go hungry.
              Entertainment includes Playlist Productions shows, comedy clubs featuring top
              comedians, and live music venues throughout the ship.
            </p>

            <h3>Popular Carnival Cruise Destinations</h3>
            <p>With 14 convenient US homeports, Carnival makes cruising accessible:</p>
            <ul>
              <li>
                <strong>Caribbean:</strong> Year-round from Miami, Galveston, New Orleans, and more
              </li>
              <li>
                <strong>Bahamas:</strong> Quick 3-4 day getaways from multiple Florida ports
              </li>
              <li>
                <strong>Mexico:</strong> Baja from Long Beach, Riviera Maya from Gulf ports
              </li>
              <li>
                <strong>Alaska:</strong> Seasonal cruises from Seattle and San Francisco
              </li>
              <li>
                <strong>Hawaii:</strong> Island-hopping cruises from Long Beach
              </li>
            </ul>

            <h3>Book Your Carnival Cruise Today</h3>
            <p>
              Don&apos;t miss out on the fun and savings available only through Next Trip Anywhere.
              Our Carnival specialists are ready to help you choose the perfect ship, itinerary, and
              stateroom for your fun vacation at sea. With our Early Saver rates and exclusive
              perks, you&apos;ll get more value than booking anywhere else. Contact us today for a
              free consultation and discover why millions choose Carnival for affordable, fun-filled
              cruise vacations.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
