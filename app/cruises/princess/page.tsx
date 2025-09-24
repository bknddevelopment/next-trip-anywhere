import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, Mail, Star, Clock, Users, Ship, MapPin, Award } from 'lucide-react'
import { getCruiseLineBySlug, getDealsByCruiseLine } from '@/lib/data/cruise-lines'

export const metadata: Metadata = {
  title: 'Princess Cruises Deals & Packages | Come Back New | Exclusive Rates | Next Trip Anywhere',
  description:
    'Book Princess Cruises with Princess Plus included. MedallionClass experience from all US ports. Free drinks, WiFi, gratuities. Alaska & Caribbean specialists. Call 833-874-1019.',
  keywords:
    'Princess Cruises, Princess cruise deals, MedallionClass, Princess Plus, Alaska cruises, Caribbean cruises, Princess ships, Discovery Princess, Enchanted Princess, cruise packages',
  openGraph: {
    title: 'Princess Cruises - Come Back New | Best Available Rates',
    description:
      'Experience Princess MedallionClass cruising with Princess Plus included. Premium service, gourmet dining, and immersive destinations.',
    url: 'https://nexttripanywhere.com/cruises/princess',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/princess-cruise-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Princess Cruises Ships',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/princess',
  },
}

export default function PrincessCruisePage() {
  const cruiseLine = getCruiseLineBySlug('princess')
  const deals = getDealsByCruiseLine('princess')
  const featuredDeals = deals.filter((deal) => deal.featured).slice(0, 3)

  if (!cruiseLine) {
    return <div>Cruise line not found</div>
  }

  // Schema markup
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        name: 'Next Trip Anywhere - Princess Cruises Specialist',
        description: cruiseLine.description,
        url: 'https://nexttripanywhere.com/cruises/princess',
        telephone: '+1-833-874-1019',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Broad St',
          addressLocality: 'Newark',
          addressRegion: 'NJ',
          postalCode: '07102',
          addressCountry: 'US',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: cruiseLine.rating.value,
          reviewCount: cruiseLine.rating.count,
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Princess MedallionClass?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'MedallionClass uses the OceanMedallion wearable device to provide touchless embarkation, keyless stateroom entry, locating friends and family, ordering food and drinks delivered anywhere on the ship, and contactless payment.',
            },
          },
          {
            '@type': 'Question',
            name: "What's included in Princess Plus?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Princess Plus includes WiFi (1 device), beverages (including cocktails, wine and beer), gratuities, premium desserts (2 per day), fitness classes, and room service delivery. Princess Premier adds unlimited WiFi devices, premium beverages, specialty dining, and photo package.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which Princess ship is best for Alaska?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Discovery Princess, Ruby Princess, and Royal Princess are excellent for Alaska with enhanced wildlife viewing areas, naturalist programs, and North to Alaska experiences. All feature specialty Alaska seafood and scenic cruising programs.',
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <Script
        id="princess-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-teal-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-yellow-500 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
              EXCLUSIVE: Princess Plus Included + 3rd & 4th Guests Free
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Princess Cruises
              <span className="block text-3xl md:text-4xl mt-4 text-teal-300">Come Back New®</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/95">{cruiseLine.shortDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call 833-874-1019
              </a>
              <Link
                href="/cruises/princess/deals"
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
              >
                View Princess Plus Deals
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">{cruiseLine.fleetSize}</div>
                <div className="text-sm">Premium Ships</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">{cruiseLine.rating.value}★</div>
                <div className="text-sm">Guest Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">#1</div>
                <div className="text-sm">Alaska Leader</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">60+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Princess Plus Banner */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-900 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 text-center">
            <span className="font-bold text-lg">PRINCESS PLUS INCLUDED:</span>
            <span className="bg-blue-900/10 px-3 py-1 rounded-full">WiFi</span>
            <span className="bg-blue-900/10 px-3 py-1 rounded-full">Drinks</span>
            <span className="bg-blue-900/10 px-3 py-1 rounded-full">Gratuities</span>
            <span className="bg-blue-900/10 px-3 py-1 rounded-full">Premium Desserts</span>
            <span className="bg-blue-900/10 px-3 py-1 rounded-full">Fitness Classes</span>
          </div>
        </div>
      </section>

      {/* Why Princess Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose Princess Cruises?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cruiseLine.highlights.slice(0, 6).map((highlight, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl mb-4">
                  {index === 0 && '🎖️'}
                  {index === 1 && '🎬'}
                  {index === 2 && '🌺'}
                  {index === 3 && '🍕'}
                  {index === 4 && '🐧'}
                  {index === 5 && '🍫'}
                </div>
                <p className="text-gray-700">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Featured Princess Cruise Deals
            </h2>
            <p className="text-xl text-gray-600">
              Princess Plus included on every sailing - drinks, WiFi, gratuities & more
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                {deal.limitedTime && (
                  <div className="bg-red-500 text-white text-center py-2 rounded-t-xl font-semibold">
                    LIMITED TIME OFFER
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-900">{deal.title}</h3>
                  <p className="text-gray-600 mb-4">{deal.description}</p>

                  <div className="flex items-center gap-2 mb-2">
                    <Ship className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">{deal.ship}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">{deal.departurePort}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">{deal.duration}</span>
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="text-sm text-gray-600 mb-2">Princess Plus Includes:</div>
                    <ul className="text-sm space-y-1">
                      {deal.perks.slice(0, 3).map((perk, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-gray-700">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Special Offer</div>
                        <div className="text-xl font-bold text-green-600">Best Available Rate</div>
                        <div className="text-sm text-orange-600 font-semibold">
                          Exclusive value included
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/cruises/princess/deals"
                      className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/cruises/princess/deals"
              className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Princess Deals
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* MedallionClass Experience */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              MedallionClass® Experience
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-900">
                  Your Vacation, Personalized
                </h3>
                <p className="text-gray-700 mb-6">
                  The OceanMedallion is a complimentary wearable device that elevates your cruise
                  with enhanced experiences and personalized service. About the size of a quarter,
                  it's your key to a seamless vacation.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-100 rounded-full p-1 mt-0.5">
                      <svg
                        className="w-4 h-4 text-teal-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">Touchless embarkation and disembarkation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-100 rounded-full p-1 mt-0.5">
                      <svg
                        className="w-4 h-4 text-teal-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">Keyless stateroom entry</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-100 rounded-full p-1 mt-0.5">
                      <svg
                        className="w-4 h-4 text-teal-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">Food & drinks delivered anywhere on ship</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-100 rounded-full p-1 mt-0.5">
                      <svg
                        className="w-4 h-4 text-teal-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">Locate friends and family onboard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-100 rounded-full p-1 mt-0.5">
                      <svg
                        className="w-4 h-4 text-teal-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">Contactless payment everywhere</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl p-8">
                <div className="text-center">
                  <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-blue-900 mb-2">Award-Winning Service</h4>
                  <p className="text-gray-700 mb-4">
                    Princess has won more awards for their Alaska and Caribbean programs than any
                    other cruise line
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-3xl font-bold text-blue-900 mb-1">
                      {cruiseLine.rating.value} ★★★★★
                    </div>
                    <div className="text-sm text-gray-600">
                      from {cruiseLine.rating.count.toLocaleString()} reviews
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Princess Fleet - {cruiseLine.fleetSize} World-Class Ships
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {cruiseLine.ships.map((ship) => (
              <div
                key={ship}
                className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow border border-blue-100"
              >
                <Ship className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-800">{ship}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Explore 380+ Destinations Worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {cruiseLine.destinations.map((destination) => (
              <div
                key={destination}
                className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow text-center"
              >
                <MapPin className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="font-medium text-gray-800">{destination}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              Exclusive Princess Perks
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              More value when you book with Next Trip Anywhere
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-blue-900">Princess Plus Benefits</h3>
                <ul className="space-y-3">
                  {cruiseLine.perks.map((perk, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-green-100 rounded-full p-1 mt-0.5">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-blue-900 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Why Book With Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Star className="w-5 h-5 mt-0.5" />
                    <span>Princess Elite specialists with insider knowledge</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 mt-0.5" />
                    <span>Group rates not available to the public</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="w-5 h-5 mt-0.5" />
                    <span>Captain's Circle benefits maximized</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5" />
                    <span>24/7 support before, during, and after</span>
                  </li>
                </ul>
                <a
                  href="tel:+18338741019"
                  className="inline-flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold mt-6 hover:bg-blue-800 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call 833-874-1019
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Come Back New?</h2>
          <p className="text-xl mb-8 text-white/95">
            Let our Princess Cruises experts plan your perfect escape
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+18338741019"
              className="bg-gold-500 hover:bg-gold-600 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call 833-874-1019
            </a>
            <a
              href="mailto:cruises@nexttripanywhere.com"
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Email for Quote
            </a>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <h2>Princess Cruises - Come Back New</h2>
            <p>
              {cruiseLine.description} With {cruiseLine.fleetSize} beautiful ships sailing to{' '}
              {cruiseLine.destinations.length} destinations across all seven continents, Princess
              offers the perfect escape for every traveler.
            </p>

            <h3>The Princess Difference</h3>
            <p>
              Princess Cruises stands apart with their commitment to immersive destination
              experiences and personalized service. The MedallionClass experience revolutionizes
              cruising with touchless technology that anticipates your needs. From Movies Under the
              Stars to the adults-only Sanctuary retreat, every detail is designed to help you relax
              and rejuvenate.
            </p>

            <h3>Princess Plus - Incredible Value Included</h3>
            <p>
              Princess Plus packages provide exceptional value with WiFi, beverages (including
              alcohol included), gratuities, premium desserts, and fitness classes all included.
              Upgrade to Princess Premier for unlimited WiFi devices, premium beverages, specialty
              dining, and professional photo packages. These inclusive packages save hundreds of
              dollars compared to purchasing items separately.
            </p>

            <h3>Alaska & Caribbean Excellence</h3>
            <p>
              Princess is the undisputed leader in Alaska cruising with more glacier viewing
              experiences, longer port stays, and the exclusive Discovery and Animal Planet
              programs. In the Caribbean, Princess offers diverse itineraries from quick getaways to
              Grand Adventures visiting hidden gems throughout the region. Their Caribbean Princess
              and other ships feature private balconies on 80% of staterooms.
            </p>

            <h3>Book Your Princess Cruise Today</h3>
            <p>
              As certified Princess specialists with Elite status, we secure the best rates and
              exclusive perks you won't find elsewhere. Our experts know every ship, every
              itinerary, and every promotion to ensure maximum value. With Princess Plus included
              and 3rd/4th guests often sailing free, now is the perfect time to book. Contact us at
              833-874-1019 for your complimentary consultation.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
