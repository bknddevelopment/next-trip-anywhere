import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Phone, Ship, MapPin, Calendar, Users, Heart, Crown } from 'lucide-react'

const LegitTrustBadges = dynamic(() => import('@/components/home/LegitTrustBadges'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg m-4" />,
})

export const metadata: Metadata = {
  title: 'Princess Cruises 2025 | Complete Guide | Love Boat Legacy & MedallionClass',
  description:
    'Complete Princess Cruises guide: MedallionClass technology, 17-ship fleet, worldwide destinations. Expert Essex County booking. Call 833-874-1019.',
  keywords: [
    'princess cruises',
    'medallionclass',
    'love boat',
    'princess cruise ships',
    'caribbean princess',
    'alaska princess cruises',
    'royal class ships',
  ],
  openGraph: {
    title: 'Princess Cruises Complete Guide 2025 | MedallionClass Experience',
    description:
      'Expert Princess guide: MedallionClass wearable, 17 ships, Alaska specialists. Book with NJ experts.',
    type: 'website',
  },
}

export default function PrincessCruisesPage() {
  const royalClass = [
    {
      name: 'Discovery Princess',
      year: '2022',
      tonnage: '145,281',
      passengers: '3,660',
      highlights:
        'Newest Royal-class, Sky Suite with 270° balconies, Sanctuary adults-only retreat',
    },
    {
      name: 'Enchanted Princess',
      year: '2020',
      tonnage: '145,281',
      passengers: '3,660',
      highlights: 'Sky Suite luxury, MedallionClass, Movies Under the Stars, Piazza entertainment',
    },
    {
      name: 'Sky Princess',
      year: '2019',
      tonnage: '143,700',
      passengers: '3,660',
      highlights: 'First with Sky Suites, largest balconies in class, Take 5 jazz lounge',
    },
    {
      name: 'Regal Princess',
      year: '2014',
      tonnage: '142,229',
      passengers: '3,560',
      highlights: 'Caribbean specialist, SeaWalk glass walkway, SeaView Bar, Princess Theater',
    },
    {
      name: 'Royal Princess',
      year: '2013',
      tonnage: '142,229',
      passengers: '3,560',
      highlights: 'Inaugural Royal-class, christened by Kate Middleton, Mediterranean favorite',
    },
  ]

  const medallionFeatures = [
    {
      title: 'Touch-Free Everything',
      description:
        'Unlock cabin, order drinks poolside, pay for services - all without touching anything or pulling out wallet',
    },
    {
      title: 'Ocean Compass',
      description:
        'Interactive app shows where everyone in your party is on ship, real-time wait times, personalized recommendations',
    },
    {
      title: 'On-Demand Dining',
      description:
        'Order food/drinks from anywhere on ship delivered to you - pool deck, cabin, theater, anywhere',
    },
    {
      title: 'Smart Wayfinding',
      description:
        'Never get lost - medallion guides you to dining reservations, shows, shore excursion meeting points',
    },
  ]

  const alaskaExpertise = [
    'Largest Alaska fleet: 6 ships, 130+ Alaska departures in 2025',
    'Direct-to-wilderness lodges in Denali, Kenai Peninsula, Copper River',
    'Private Glacier Bay access with park rangers onboard (limited permits)',
    'Early arrival in Skagway (7am) before other cruise ships for best tours',
    'Exclusive Mt. McKinley Princess Wilderness Lodge stays',
    'More scenic cruising time than competitors (Inside Passage, Hubbard Glacier)',
  ]

  const diningExperience = [
    {
      category: 'Traditional Dining',
      details: 'Fixed seating times (6pm or 8:15pm), same table/servers nightly, dress up nights',
    },
    {
      category: 'Anytime Dining',
      details: 'Flexible hours (5:30-10pm), different table each night, more casual',
    },
    {
      category: 'Specialty Restaurants',
      details:
        "Crown Grill Steakhouse ($39), Sabatini's Italian ($35), Chef's Table Lumiere ($115), Shabu-Shabu ($38)",
    },
    {
      category: 'Casual Options',
      description:
        "World Fresh Marketplace buffet, Alfredo's Pizza, International Café, Trident Grill, 24-hour room service",
    },
  ]

  const plusPremierPerks = [
    'Princess Plus ($60/day): Drinks, WiFi, crew appreciation, 2 specialty dinners, fitness classes',
    'Princess Premier ($80/day): Everything in Plus + unlimited specialty dining, premium drinks, photos, Medallion upgrades',
    'Both packages save 30-40% vs paying separately',
    'Best value for cruisers who would purchase drink package anyway',
  ]

  const faqs = [
    {
      question: 'What is MedallionClass on Princess Cruises?',
      answer:
        "MedallionClass is Princess's award-winning wearable technology - a quarter-sized device you wear as wristband, clip, or necklace. It enables touch-free cabin entry, on-demand dining (order from anywhere on ship), real-time party locator via Ocean Compass app, expedited boarding, and personalized service (crew knows your preferences). The Medallion also tracks your location for smart wayfinding to dining reservations, shows, and shore excursions. All Princess ships are now MedallionClass-enabled - it's included free in your cruise fare.",
    },
    {
      question: 'Why is Princess Cruises called "The Love Boat"?',
      answer:
        'Princess Cruises achieved fame as the setting for the hit TV series "The Love Boat" (1977-1987), filmed aboard Pacific Princess and Island Princess. The show introduced millions to cruising and established Princess as the romantic cruise choice. Today Princess continues the legacy with "Love Boat" deck parties, themed events, and Captain\'s Circle loyalty program. Princess specializes in destination-focused cruising (Alaska, Europe, World Cruises) with refined atmosphere appealing to couples, mature travelers, and multi-generational families.',
    },
    {
      question: 'Which Princess ships sail from the New York area?',
      answer:
        'Princess does not currently homeport ships at New York/Cape Liberty year-round. However, several Princess ships offer seasonal Northeast departures including Canada/New England fall foliage cruises and transatlantic repositioning cruises. For Essex County travelers, we arrange fly-cruise packages from Newark Airport to Princess ships in Fort Lauderdale (Caribbean), Los Angeles (Mexican Riviera), Seattle (Alaska), and worldwide ports with bundled airfare + cruise savings of $200-500 per person.',
    },
    {
      question: 'Is Princess good for Alaska cruises?',
      answer:
        'Princess is the Alaska cruise leader with 6 ships, 130+ departures, and 50+ years Alaska experience. Advantages: (1) Direct-to-the-Wilderness land tours with Princess-owned lodges in Denali and Kenai Peninsula, (2) Exclusive Glacier Bay access with park rangers onboard (limited permits), (3) Early arrival times in ports (Skagway 7am before other ships), (4) More scenic cruising hours than competitors. Princess Alaska cruises range from 7-day Inside Passage to 10-14 day cruisetours combining cruise + land exploration. Pricing: $1,099-$2,999 per person for 7 days depending on cabin and season.',
    },
    {
      question: "What's included in Princess Plus and Princess Premier?",
      answer:
        'Princess Plus ($60/day): Unlimited drinks ($15 value or less), WiFi, crew appreciation (tips), 2 specialty dining meals, juice bar, fitness classes. Princess Premier ($80/day): All Plus benefits PLUS unlimited specialty dining, premium drinks ($20 value), unlimited photos, premium desserts, Medallion Net unlimited devices. Both packages save 30-40% vs buying items separately. Best for: Plus package if you drink moderately (3-5 drinks/day), Premier if you want specialty dining nightly and unlimited photos. Solo travelers pay 150% of package rate.',
    },
  ]

  const essexTips = [
    'No Princess ships homeport in NY/NJ - we arrange fly-cruise packages from Newark Airport with bundled savings',
    'Book Princess Plus package at time of booking for best rate (20-30% discount vs onboard purchase)',
    'Alaska cruises: Book 10-12 months ahead for best cabin selection and promotional rates',
    'MedallionClass app must be downloaded before boarding - set up profiles for whole family pre-cruise',
    "Captain's Circle loyalty starts after first cruise - perks include priority boarding, free internet minutes",
    'Princess specializes in longer cruises (10-14 days) and world cruises - excellent for retired/flexible travelers',
  ]

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'TravelAgency',
                '@id': 'https://nexttripanywhere.com/#organization',
                name: 'Next Trip Anywhere',
                description: 'Princess Cruises Specialists - Essex County NJ',
                url: 'https://nexttripanywhere.com',
                telephone: '833-874-1019',
              },
              {
                '@type': 'FAQPage',
                mainEntity: faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-pink-700 to-rose-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-semibold">
                The Love Boat • MedallionClass • 17 Ships
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Princess Cruises: Complete Guide 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-pink-100">
              MedallionClass Technology • Alaska Experts • Worldwide Destinations • Refined Elegance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="tel:833-874-1019"
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-pink-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call 833-874-1019
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-pink-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-pink-600 transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
            <p className="text-pink-100 text-sm">
              <MapPin className="w-4 h-4 inline mr-2" />
              Serving Essex County NJ • Fly-Cruise Packages from Newark Airport
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed">
            <strong>Princess Cruises</strong> is renowned for destination-focused itineraries,
            refined onboard atmosphere, and innovative MedallionClass wearable technology. With 17
            ships ranging from intimate 2,000-passenger vessels to 3,660-passenger Royal-class
            ships, Princess specializes in Alaska (largest fleet), Europe, World Cruises, and exotic
            destinations.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Famous as &quot;The Love Boat&quot; from the iconic TV series, Princess appeals to
            couples, mature travelers, and multi-generational families seeking elegant yet
            accessible cruising. For <strong>Essex County travelers</strong>, we arrange fly-cruise
            packages from Newark Airport with bundled airfare and cruise savings.
          </p>
        </div>

        {/* Royal Class */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Crown className="w-8 h-8 text-purple-600" />
            Royal Class: Flagship Fleet
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {royalClass.slice(0, 4).map((ship) => (
              <div
                key={ship.name}
                className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{ship.name}</h3>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p>
                    <strong>Year:</strong> {ship.year} • <strong>Size:</strong> {ship.tonnage} tons
                  </p>
                  <p>
                    <strong>Passengers:</strong> {ship.passengers}
                  </p>
                  <p className="text-purple-700 pt-2">{ship.highlights}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MedallionClass */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            MedallionClass: Wearable Technology
          </h2>
          <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mb-8">
            <p className="text-lg text-gray-800">
              <strong>Industry First:</strong> Princess invented the cruise wearable with Ocean
              Medallion - a quarter-sized device enabling touch-free experiences, real-time party
              tracking, and on-demand service. Included free on all Princess cruises.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {medallionFeatures.map((feature) => (
              <div key={feature.title} className="bg-white border-2 border-pink-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Alaska Expertise */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Alaska: The Princess Advantage</h2>
          <div className="bg-blue-50 rounded-lg p-8">
            <p className="text-lg text-gray-800 mb-6">
              <strong>50+ Years Alaska Experience:</strong> Princess operates the largest Alaska
              fleet with 6 ships, 130+ departures, and exclusive partnerships with Denali lodges and
              Glacier Bay National Park.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {alaskaExpertise.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dining */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Dining Options</h2>
          <div className="space-y-4">
            {diningExperience.map((dining) => (
              <div key={dining.category} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{dining.category}</h3>
                <p className="text-gray-700">{dining.details || dining.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Plus/Premier */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Princess Plus & Premier Packages
          </h2>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8">
            <div className="space-y-4">
              {plusPremierPerks.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700">{perk}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Essex Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Essex County Booking Tips</h2>
          <div className="bg-pink-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {essexTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-purple-700 to-pink-600 text-white rounded-2xl p-12 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Sail with Princess?</h2>
          <p className="text-xl mb-8 text-pink-100">
            MedallionClass innovation • Alaska expertise • Worldwide destinations • Essex County
            specialists
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:833-874-1019"
              className="inline-flex items-center justify-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-pink-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call 833-874-1019
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-pink-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-pink-600 transition-colors border-2 border-white"
            >
              Get Free Quote
            </Link>
          </div>
        </section>

        <LegitTrustBadges />

        {/* Related */}
        <section className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Cruise Guides</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/cruises/royal-caribbean-ships"
              className="text-blue-600 hover:underline font-medium"
            >
              Royal Caribbean Ships
            </Link>
            <Link
              href="/cruises/carnival-cruise-line"
              className="text-blue-600 hover:underline font-medium"
            >
              Carnival Cruise Line
            </Link>
            <Link
              href="/cruises/norwegian-cruise-line"
              className="text-blue-600 hover:underline font-medium"
            >
              Norwegian Cruise Line
            </Link>
            <Link href="/cruises" className="text-blue-600 hover:underline font-medium">
              All Cruises
            </Link>
          </div>
        </section>
      </article>
    </div>
  )
}
