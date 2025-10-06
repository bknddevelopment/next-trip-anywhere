import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, Ship, MapPin, Star, Calendar, DollarSign, Anchor } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Royal Caribbean Cruises from New Jersey 2025 | Cape Liberty Departures',
  description:
    'Royal Caribbean cruises from NJ depart year-round from Cape Liberty. Anthem of the Seas, Adventure of the Seas sailing to Caribbean, Bermuda, Canada. Free quotes from Essex County experts.',
  keywords: [
    'royal caribbean cruises from new jersey',
    'royal caribbean nj',
    'royal caribbean cape liberty',
    'anthem of the seas',
    'adventure of the seas',
    'royal caribbean bayonne',
    'royal caribbean newark',
    'cruises from new jersey',
    'nj cruise port',
  ],
  openGraph: {
    title: 'Royal Caribbean Cruises from New Jersey | Cape Liberty Departures 2025',
    description:
      'Year-round Royal Caribbean sailings from Cape Liberty, NJ. Caribbean, Bermuda, Canada destinations. Expert booking from Essex County travel specialists.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RoyalCaribbeanNJPage() {
  const ships = [
    {
      name: 'Anthem of the Seas',
      class: 'Quantum-class',
      capacity: '4,905 passengers',
      tonnage: '168,666 GT',
      features: [
        'North Star observation capsule',
        'RipCord by iFLY skydiving simulator',
        'SeaPlex (largest indoor activity space at sea)',
        'Two70 entertainment venue',
        'Bionic Bar with robot bartenders',
        'FlowRider surf simulator',
      ],
      dining: "18 restaurants including Jamie's Italian, Wonderland, Chops Grille",
      entertainment: 'Broadway-style shows, live music, movies under the stars',
    },
    {
      name: 'Adventure of the Seas',
      class: 'Voyager-class',
      capacity: '3,807 passengers',
      tonnage: '137,276 GT',
      features: [
        'Royal Promenade indoor street',
        'Ice skating rink',
        'Rock climbing wall',
        'Mini golf course',
        'FlowRider surf simulator',
        'H2O Zone water park',
      ],
      dining: "14 restaurants including Chops Grille, Giovanni's Table, Izumi",
      entertainment: 'Ice shows, aqua theater performances, Vegas-style entertainment',
    },
  ]

  const destinations = [
    {
      destination: 'Caribbean (Eastern)',
      duration: '7-9 nights',
      ports: 'St. Thomas, St. Maarten, Puerto Rico',
      season: 'Year-round',
      highlights: 'Pristine beaches, duty-free shopping, snorkeling',
    },
    {
      destination: 'Caribbean (Southern)',
      duration: '9-12 nights',
      ports: 'Aruba, Curacao, Barbados, St. Lucia',
      season: 'Winter months',
      highlights: 'ABC Islands, colonial history, diverse cultures',
    },
    {
      destination: 'Bermuda',
      duration: '5-7 nights',
      ports: "King's Wharf (overnight stay)",
      season: 'May - October',
      highlights: 'Pink sand beaches, British culture, golf courses',
    },
    {
      destination: 'Canada/New England',
      duration: '7-12 nights',
      ports: 'Halifax, Bar Harbor, Quebec City, Boston',
      season: 'September - October',
      highlights: 'Fall foliage, maritime history, French culture',
    },
    {
      destination: 'Bahamas',
      duration: '4-5 nights',
      ports: 'Nassau, CocoCay (private island)',
      season: 'Year-round',
      highlights: 'Perfect Day at CocoCay, short getaway',
    },
  ]

  const whyRoyalCaribbean = [
    {
      icon: Ship,
      title: 'Innovative Ships',
      description:
        'Quantum and Voyager-class ships feature first-at-sea attractions like skydiving simulators, robot bartenders, and observation capsules 300 feet above the ocean.',
    },
    {
      icon: Star,
      title: 'Award-Winning Service',
      description:
        'Consistently rated among the best cruise lines for overall experience, dining quality, and family-friendly amenities by Cruise Critic and Travel + Leisure.',
    },
    {
      icon: Calendar,
      title: 'Year-Round Departures',
      description:
        'Unlike seasonal cruise lines, Royal Caribbean sails from Cape Liberty 12 months a year with consistent weekly Caribbean departures and seasonal specialty sailings.',
    },
    {
      icon: DollarSign,
      title: 'Exceptional Value',
      description:
        'All-inclusive base fare includes accommodations, meals, entertainment, and activities. No fly costs from Newark - just drive to Cape Liberty and start your vacation.',
    },
  ]

  const essexCountyBenefits = [
    'Drive to Cape Liberty in 15-35 minutes from anywhere in Essex County',
    'Free parking or affordable hotel park-and-cruise packages',
    'No expensive flights to Miami or Fort Lauderdale',
    'Sleep in your own bed the night before - no hotel costs',
    'Easy to bring extra luggage without baggage fees',
    'Family and friends can see you off at the port',
  ]

  const faqs = [
    {
      question: 'Which Royal Caribbean ships sail from New Jersey?',
      answer:
        "Royal Caribbean currently operates Anthem of the Seas (Quantum-class, 4,905 passengers) and Adventure of the Seas (Voyager-class, 3,807 passengers) from Cape Liberty in Bayonne, NJ. Anthem typically offers year-round Caribbean and seasonal Bermuda sailings, while Adventure provides Caribbean itineraries. Both ships feature Royal Caribbean's signature innovations like FlowRider surf simulators, rock climbing walls, and award-winning dining options.",
    },
    {
      question: 'Where do Royal Caribbean cruises from NJ go?',
      answer:
        "Royal Caribbean offers diverse itineraries from Cape Liberty: Year-round Eastern and Southern Caribbean cruises (7-12 nights) visiting islands like St. Thomas, St. Maarten, Aruba, and Barbados. Seasonal Bermuda cruises (5-7 nights) from May-October with overnight stays in King's Wharf. Fall foliage Canada/New England cruises (7-12 nights) September-October to Halifax, Quebec, and Bar Harbor. Short Bahamas getaways (4-5 nights) to Nassau and Royal Caribbean's private island, Perfect Day at CocoCay.",
    },
    {
      question: 'How much does a Royal Caribbean cruise from New Jersey cost?',
      answer:
        "Prices vary by season, cabin type, and itinerary. Budget interior cabins start around $449 per person for 4-5 night Bahamas cruises. Caribbean 7-night cruises from $649 per person interior, $849 balcony. Bermuda sailings $599-$999 per person. Canada/New England $899-$1,499 per person. Suites $1,500-$5,000+ per person. Prices are per person double occupancy and don't include taxes ($200-400), gratuities ($15/day per person), drinks, or shore excursions. Book early for best prices - cruises often sell out 6-9 months in advance for peak seasons.",
    },
    {
      question: "What's included in Royal Caribbean cruise fare?",
      answer:
        "Your cruise fare includes: Stateroom accommodations, all main dining room meals and buffet, casual dining venues (Windjammer, Cafe Promenade, Sorrento's Pizza), room service (delivery fee may apply), most onboard activities (rock climbing, FlowRider, pools, fitness center), Broadway-caliber entertainment and shows, kids and teens programs. NOT included: Specialty restaurants ($20-60 per person), alcoholic beverages, soda, premium coffee, spa services, shore excursions, photos, casino, shopping, WiFi, gratuities ($15/day per person auto-charged).",
    },
    {
      question: 'Can I drive to the Royal Caribbean terminal in New Jersey?',
      answer:
        'Yes! Royal Caribbean sails from Cape Liberty Cruise Port in Bayonne, NJ, just 15-35 minutes from Essex County. The port offers parking for $25-40 per day depending on type (standard/covered/valet). GPS address: 14 Port Terminal Blvd, Bayonne, NJ 07002. From Newark, take I-78 East to NJ Turnpike Extension, Exit 14A to Route 440 South. Follow signs for "Cruise Ship Terminal." Arrive 2-3 hours before sailing time. Park in designated lots and take the free shuttle to your terminal.',
    },
    {
      question: 'Is Royal Caribbean good for families with kids?',
      answer:
        "Absolutely! Royal Caribbean is renowned as one of the best family cruise lines. Complimentary Adventure Ocean youth programs for ages 3-17 with age-appropriate activities. Nursery for 6-36 months ($8/hour). Teen-only venues and activities. Family-friendly dining with kids menus. Ships feature water parks, mini golf, rock climbing, ice skating (Adventure), and skydiving simulator (Anthem). Connecting staterooms available. Family suites with separate bedrooms. Kids sail free promotions during select seasons. The ships' innovations keep kids and teens entertained all week.",
    },
  ]

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': 'https://nexttripanywhere.com/cruises/royal-caribbean-nj/#organization',
    name: 'Next Trip Anywhere - Royal Caribbean Specialists',
    description: 'Expert planning for Royal Caribbean cruises from New Jersey',
    url: 'https://nexttripanywhere.com/cruises/royal-caribbean-nj/',
    telephone: '+1-833-874-1019',
    email: 'info@nexttripanywhere.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'NJ',
    },
    areaServed: [
      { '@type': 'State', name: 'New Jersey' },
      { '@type': 'State', name: 'New York' },
    ],
    priceRange: '$$',
    knowsAbout: [
      'Royal Caribbean International',
      'Anthem of the Seas',
      'Adventure of the Seas',
      'Cape Liberty Cruise Port',
      'Caribbean Cruises',
      'Bermuda Cruises',
    ],
  }

  const jsonLdFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://nexttripanywhere.com/',
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
        name: 'Royal Caribbean NJ',
        item: 'https://nexttripanywhere.com/cruises/royal-caribbean-nj/',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Ship className="h-6 w-6" />
              <span className="bg-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Year-Round Departures from Cape Liberty, NJ
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Royal Caribbean Cruises from New Jersey
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl">
              Experience the world's most innovative cruise ships sailing from your backyard. Anthem
              of the Seas and Adventure of the Seas depart Cape Liberty year-round.
            </p>
            <div className="flex flex-wrap gap-6 text-sm md:text-base mb-8">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Cape Liberty, Bayonne NJ</span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5" />
                <span>2 Ships Year-Round</span>
              </div>
              <div className="flex items-center gap-2">
                <Anchor className="h-5 w-5" />
                <span>5 Destination Regions</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>Award-Winning Service</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+18338741019"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
              >
                <Phone className="h-5 w-5" />
                833-874-1019
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="h-5 w-5" />
                Get Free Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Why Royal Caribbean from NJ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Why Choose Royal Caribbean from New Jersey?
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              The perfect combination of innovative ships, diverse destinations, and unbeatable
              convenience for Essex County residents
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyRoyalCaribbean.map((reason, index) => {
                const Icon = reason.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                  >
                    <Icon className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                    <p className="text-gray-600">{reason.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Ships Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Royal Caribbean Ships from New Jersey
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {ships.map((ship, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
                    <h3 className="text-2xl font-bold mb-2">{ship.name}</h3>
                    <p className="text-blue-100">{ship.class}</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                      <div>
                        <p className="text-sm text-gray-600">Capacity</p>
                        <p className="font-semibold">{ship.capacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Size</p>
                        <p className="font-semibold">{ship.tonnage}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Signature Features:</h4>
                      <ul className="space-y-1">
                        {ship.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-700">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Dining:</h4>
                      <p className="text-sm text-gray-700">{ship.dining}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Entertainment:</h4>
                      <p className="text-sm text-gray-700">{ship.entertainment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Destinations Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Where Can You Cruise from New Jersey?
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Royal Caribbean offers year-round variety with seasonal specialty sailings
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {destinations.map((dest, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4">
                    <h3 className="text-xl font-bold">{dest.destination}</h3>
                    <p className="text-blue-100 text-sm">{dest.duration}</p>
                  </div>
                  <div className="p-6 space-y-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Featured Ports:</span>
                      <p className="text-gray-600">{dest.ports}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Season:</span>
                      <p className="text-gray-600">{dest.season}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Highlights:</span>
                      <p className="text-gray-600">{dest.highlights}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Essex County Benefits */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Perfect for Essex County Residents
              </h2>
              <p className="text-xl text-blue-100 text-center mb-12">
                Royal Caribbean from Cape Liberty offers unbeatable convenience compared to flying
                to distant ports
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {essexCountyBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-blue-800 rounded-lg p-4">
                    <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                    <span className="text-blue-50">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-12 bg-blue-800 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Cost Comparison: NJ vs Miami Departure</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-blue-300 mb-2">Flying to Miami</p>
                    <div className="space-y-2 text-sm">
                      <p>• Flights: $400-800 per person</p>
                      <p>• Airport parking: $15/day x 7 = $105</p>
                      <p>• Miami hotel night before: $150+</p>
                      <p>• Miami transport/parking: $100+</p>
                      <p className="text-red-400 font-bold">Total: $750-$1,155+ per person</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-green-300 mb-2">Cape Liberty Departure</p>
                    <div className="space-y-2 text-sm">
                      <p>• Flights: $0</p>
                      <p>• Drive from Essex County: $5 gas</p>
                      <p>• Cape Liberty parking: $175 (7 days)</p>
                      <p>• Hotel: $0 (sleep at home)</p>
                      <p className="text-green-400 font-bold">Total: $180 per family</p>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-xl font-bold text-green-400">
                  Save $500-$1,000+ per person by sailing from New Jersey!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Royal Caribbean from NJ - Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Book Your Royal Caribbean Cruise from NJ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Essex County's Royal Caribbean experts. We handle everything from cabin selection to
              Cape Liberty logistics. 15+ years of experience booking Royal Caribbean cruises from
              New Jersey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:+18338741019"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Call Now: 833-874-1019
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="h-5 w-5" />
                Request Free Quote
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="h-4 w-4" />
                <span>All Royal Caribbean Ships</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-semibold text-center mb-8">Explore More Cruise Options</h3>
            <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Link
                href="/cruises/cape-liberty-port"
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
              >
                <h4 className="font-semibold text-blue-700 mb-2">Cape Liberty Guide</h4>
                <p className="text-sm text-gray-600">Port information</p>
              </Link>
              <Link
                href="/cruises/from-newark"
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
              >
                <h4 className="font-semibold text-blue-700 mb-2">All Newark Cruises</h4>
                <p className="text-sm text-gray-600">Browse all options</p>
              </Link>
              <Link
                href="/cruises/caribbean"
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
              >
                <h4 className="font-semibold text-blue-700 mb-2">Caribbean Cruises</h4>
                <p className="text-sm text-gray-600">Tropical getaways</p>
              </Link>
              <Link
                href="/cruises/last-minute-deals"
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
              >
                <h4 className="font-semibold text-blue-700 mb-2">Last-Minute Deals</h4>
                <p className="text-sm text-gray-600">Save up to 70%</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
