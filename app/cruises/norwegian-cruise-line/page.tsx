import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Phone, Ship, MapPin, Calendar, Users, Anchor, Utensils } from 'lucide-react'

const LegitTrustBadges = dynamic(() => import('@/components/home/LegitTrustBadges'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg m-4" />,
})

export const metadata: Metadata = {
  title: 'Norwegian Cruise Line 2025 | Complete Guide | Freestyle Cruising & Free at Sea',
  description:
    'Complete Norwegian Cruise Line guide: Freestyle Cruising, Free at Sea perks, 19-ship fleet. Expert booking from Essex County NJ. Call 833-874-1019.',
  keywords: [
    'norwegian cruise line',
    'ncl cruises',
    'freestyle cruising',
    'free at sea',
    'norwegian breakaway',
    'ncl prima',
    'norwegian ships',
  ],
  openGraph: {
    title: 'Norwegian Cruise Line Complete Guide 2025 | Freestyle Cruising',
    description:
      'Expert NCL guide: Freestyle Cruising, Free at Sea offers, 19 ships. Book with NJ travel experts.',
    type: 'website',
  },
}

export default function NorwegianCruiseLinePage() {
  const primaClass = [
    {
      name: 'Norwegian Viva',
      year: '2023',
      tonnage: '142,500',
      passengers: '3,219',
      highlights:
        'Newest Prima-class, The Concourse outdoor promenade, Ocean Boulevard, Infinity Beach',
    },
    {
      name: 'Norwegian Prima',
      year: '2022',
      tonnage: '142,500',
      passengers: '3,215',
      highlights:
        'First Prima-class, largest 3-story racetrack, Infinity Beach, The Haven luxury enclave',
    },
  ]

  const breakawayClass = [
    {
      name: 'Norwegian Escape',
      year: '2015',
      passengers: '4,266',
      highlights:
        'Largest ropes course at sea, The Haven, Food Republic dining complex, Snow Room spa',
    },
    {
      name: 'Norwegian Getaway',
      year: '2014',
      passengers: '3,963',
      highlights: 'Miami year-round, spectacular hull art, Illusionarium dinner theater',
    },
    {
      name: 'Norwegian Breakaway',
      year: '2013',
      passengers: '3,963',
      highlights: 'NYC homeport, Waterfront boardwalk, Ice Bar, Broadway shows',
    },
  ]

  const freestyleFeatures = [
    {
      title: 'No Set Dining Times',
      description:
        'Eat when you want, where you want. No assigned tables, no rigid schedules. Choose from 15+ restaurants.',
    },
    {
      title: 'Casual Dress Code',
      description:
        'No formal nights required. Resort casual throughout the ship (though specialty dining suggests smart casual).',
    },
    {
      title: 'Entertainment Variety',
      description:
        'Broadway shows, live music venues, comedy clubs, casinos - all included in your fare.',
    },
    {
      title: 'Free at Sea',
      description:
        'Choose 5 free perks: beverage package, specialty dining, shore excursions, WiFi, or friends/family sail free.',
    },
  ]

  const freeAtSeaPerks = [
    {
      perk: 'Free Open Bar',
      value: 'Up to $138/day value',
      details: 'Unlimited cocktails, beer, wine, spirits, sodas, juices',
    },
    {
      perk: 'Specialty Dining',
      value: 'Up to $200 value',
      details:
        "3+ meals at premium restaurants (Cagney's Steakhouse, Le Bistro French, Teppanyaki)",
    },
    {
      perk: 'Shore Excursions',
      value: 'Up to $100/port',
      details: 'Credit toward tours and activities at each destination',
    },
    {
      perk: 'WiFi Package',
      value: 'Up to $180 value',
      details: '150-300 minutes internet access for entire cruise',
    },
    {
      perk: '3rd/4th Guests Free',
      value: 'Varies',
      details: 'Friends & family in same cabin sail free (taxes/fees apply)',
    },
  ]

  const diningOptions = [
    'Complimentary: 3 Main Dining Rooms, buffet, casual cafes, room service',
    "Cagney's Steakhouse - Premium cuts, classic sides ($45-55 per person)",
    'Le Bistro French - Five-course French fine dining ($35 per person)',
    'Teppanyaki - Japanese hibachi experience ($35 per person)',
    'Ocean Blue - Seafood specialist by Geoffrey Zakarian ($49 per person)',
    'Food Republic - Pan-Asian with 8 cuisines ($25 per person)',
    'Los Lobos - Modern Mexican by Jose Garces ($25 per person)',
  ]

  const havenExperience = [
    'Private keycard-access complex on top decks',
    'Exclusive Haven Restaurant with butler service',
    'Private sundeck, courtyard, pool, hot tubs',
    'Concierge and 24/7 butler for every Haven suite',
    'Priority boarding, tendering, disembarkation',
    'Complimentary specialty dining and premium beverages',
  ]

  const faqs = [
    {
      question: 'What is Freestyle Cruising on Norwegian Cruise Line?',
      answer:
        "Freestyle Cruising is Norwegian's signature concept offering maximum flexibility. Unlike traditional cruising, there are no set dining times or assigned tables - eat whenever you want at 15+ restaurants. No formal nights or strict dress codes (resort casual works everywhere). Entertainment, activities, and shore excursions operate on your schedule. The philosophy: your cruise vacation should adapt to you, not the other way around. This casual, flexible approach appeals to modern travelers who prefer spontaneity over rigid schedules.",
    },
    {
      question: "How does Norwegian's Free at Sea work?",
      answer:
        'Free at Sea allows guests to choose up to 5 complimentary perks based on cabin category. Options include: (1) Free Open Bar - unlimited drinks worth $138/day, (2) Specialty Dining - 3+ meals at premium restaurants, (3) Shore Excursion credits - $50-100 per port, (4) WiFi package - 150-300 minutes, (5) Friends & Family Free - 3rd/4th guests in same cabin. The number of free perks depends on cabin type: Studios/Inside/Oceanview get 2 perks, Balcony gets 3 perks, Mini-Suite+ gets 5 perks. Book early for best perk selection.',
    },
    {
      question: 'Which Norwegian ships sail from New York area?',
      answer:
        "Norwegian Breakaway is homeported in Manhattan at the New York Cruise Terminal (Pier 88, Hell's Kitchen) from spring through fall, offering Bermuda cruises and Canada/New England sailings. This is convenient for Essex County travelers - 30-40 minutes to Manhattan pier. No Norwegian ships currently homeport at Cape Liberty (Bayonne), but we can arrange fly-cruise packages from Newark Airport to Norwegian's ships departing Miami, Port Canaveral, and other ports with excellent bundled pricing.",
    },
    {
      question: "What's The Haven on Norwegian ships?",
      answer:
        "The Haven is Norwegian's exclusive ship-within-a-ship luxury complex available on most ships. It's a private keycard-access area on the top decks featuring: dedicated Haven Restaurant with butler service, private sundeck with pool/hot tubs, concierge desk, exclusive lounge. Haven suite guests enjoy priority everything (boarding, dining reservations, disembarkation), butler service 24/7, complimentary specialty dining and premium beverages. Suites range from 2-bedroom family suites to lavish Owner's Suites with private balconies and outdoor hot tubs. Pricing: $3,500-15,000 per person for 7-day Caribbean.",
    },
    {
      question: 'How does Norwegian compare to Carnival and Royal Caribbean?',
      answer:
        'Norwegian: Most flexible (Freestyle Cruising, no dress codes), Free at Sea perks make it excellent value, smaller ships feel less crowded, extensive specialty dining. Carnival: Most affordable base fares, Fun Ship casual vibe, best for families with kids, Guy Fieri burgers. Royal Caribbean: Largest ships with most activities, innovation leaders (North Star, BOLT coaster), best for variety seekers. For Essex County: Norwegian Breakaway from Manhattan (40 min), Royal Caribbean Anthem from Cape Liberty (20 min), Carnival Venezia from Cape Liberty (20 min). We help match you to the right line based on priorities.',
    },
  ]

  const essexTips = [
    'Norwegian Breakaway sails from Manhattan - 35 minutes from Newark, easy parking at Manhattan Cruise Terminal',
    'Free at Sea beverage package is the best perk for most cruisers - pays for itself after 3-4 drinks per day',
    'Book balcony or higher to get more Free at Sea perks (3-5 vs 2 for inside cabins)',
    'The Haven is worth considering for special occasions - butler service and exclusive areas justify premium pricing',
    'Specialty dining reservations fill up - book your favorites immediately after booking cruise',
    'Solo travelers: Norwegian Studios are the only true solo cabins at sea (no single supplement)',
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
                description: 'Norwegian Cruise Line Experts - Essex County NJ',
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
      <section className="bg-gradient-to-br from-blue-800 via-blue-600 to-cyan-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Ship className="w-5 h-5" />
              <span className="text-sm font-semibold">
                Freestyle Cruising • Free at Sea • 19 Ships
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Norwegian Cruise Line: Freestyle Cruising Guide 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cyan-100">
              No Set Dining Times • Free Perks • The Haven Luxury • Norwegian Prima Innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="tel:833-874-1019"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call 833-874-1019
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-cyan-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-600 transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
            <p className="text-cyan-100 text-sm">
              <MapPin className="w-4 h-4 inline mr-2" />
              Serving Essex County NJ • Norwegian Breakaway from Manhattan (35 min)
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed">
            <strong>Norwegian Cruise Line (NCL)</strong> revolutionized cruising with Freestyle
            Cruising - eliminating set dining times, assigned tables, and formal dress codes. With
            19 ships ranging from intimate 2,000-passenger vessels to the innovative 3,200-passenger
            Prima-class, Norwegian offers maximum flexibility, extensive dining options, and their
            signature Free at Sea perks program.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For <strong>Essex County travelers</strong>, Norwegian Breakaway sails from Manhattan
            (35 minutes from Newark) offering Bermuda and Canada/New England cruises. We also
            arrange fly-cruise packages from Newark Airport to Norwegian ships in Miami, the
            Caribbean, and worldwide destinations with bundled savings.
          </p>
        </div>

        {/* Prima Class */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Prima Class: Newest Innovation</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {primaClass.map((ship) => (
              <div
                key={ship.name}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{ship.name}</h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Launched:</strong> {ship.year} • <strong>Size:</strong> {ship.tonnage}{' '}
                    tons
                  </p>
                  <p>
                    <strong>Passengers:</strong> {ship.passengers}
                  </p>
                  <p className="text-blue-700 pt-2">{ship.highlights}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Breakaway Class */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Breakaway Class: East Coast Favorites
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {breakawayClass.map((ship) => (
              <div key={ship.name} className="bg-white border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{ship.name}</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Year:</strong> {ship.year}
                  </p>
                  <p>
                    <strong>Capacity:</strong> {ship.passengers}
                  </p>
                  <p className="text-blue-600 text-xs pt-2">{ship.highlights}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Freestyle Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Freestyle Cruising?</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {freestyleFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-cyan-50 border-l-4 border-cyan-600 p-6 rounded"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Free at Sea */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Anchor className="w-8 h-8 text-blue-600" />
            Free at Sea: Choose Your Perks
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <p className="text-lg text-gray-800">
              <strong>Best Value:</strong> Balcony cabins get 3 free perks, Mini-Suites+ get 5 free
              perks. Open Bar perk saves most money (up to $966 per person on 7-day cruise).
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeAtSeaPerks.map((perk) => (
              <div key={perk.perk} className="bg-white border-2 border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{perk.perk}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-3">{perk.value}</p>
                <p className="text-gray-700 text-sm">{perk.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dining */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Utensils className="w-8 h-8 text-blue-600" />
            Dining: 15+ Restaurant Choices
          </h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <ul className="space-y-3 text-gray-700">
              {diningOptions.map((option, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>{option}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The Haven */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            The Haven: Luxury Ship-Within-a-Ship
          </h2>
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-lg p-8">
            <p className="text-lg text-gray-800 mb-6">
              <strong>Ultimate Norwegian Experience:</strong> Private keycard-access complex
              exclusively for Haven suite guests with dedicated restaurant, sundeck, pool, butler
              service, and concierge.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {havenExperience.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Essex Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Essex County Traveler Tips</h2>
          <div className="bg-blue-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {essexTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
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
        <section className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white rounded-2xl p-12 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Freestyle Cruising?
          </h2>
          <p className="text-xl mb-8 text-cyan-100">
            Expert guidance • Free at Sea perks • Best rates • Essex County specialists
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:833-874-1019"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call 833-874-1019
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors border-2 border-white"
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
              href="/cruises/cape-liberty-port"
              className="text-blue-600 hover:underline font-medium"
            >
              Cape Liberty Port
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
