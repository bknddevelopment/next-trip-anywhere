import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import Link from 'next/link'
import {
  allInclusiveResorts,
  resortRegions,
  resortStats,
  getLuxuryResorts,
  getFamilyResorts,
  getAdultsOnlyResorts,
} from '@/lib/data/all-inclusive-resorts'
import {
  generateResortSchemaGraph,
  generateWebPageSchema,
  generateHowToSchema,
} from '@/lib/utils/resortSchema'
import OptimizedBookingForm from '@/components/forms/OptimizedBookingForm'
import ResortListingClient from './ResortListingClient'

// Lazy load heavy components
const BudgetCalculator = dynamic(() => import('@/components/resorts/BudgetCalculator'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />,
})

export const metadata: Metadata = {
  title: 'All-Inclusive Resorts from Newark | 100+ Resorts | Essex County Travel',
  description:
    'Discover 100+ all-inclusive resorts from Newark Airport. Caribbean, Mexico & Central America packages for Essex County residents. Expert local planning, best prices guaranteed. Call 833-874-1019.',
  keywords:
    'all inclusive resorts from Newark, Newark all inclusive vacations, Essex County all inclusive, Caribbean resorts from EWR, Mexico all inclusive Newark, adults only resorts Newark, family resorts New Jersey',
  openGraph: {
    title: 'All-Inclusive Resorts from Newark Airport | Next Trip Anywhere',
    description:
      'Your complete guide to 100+ all-inclusive resorts accessible from Newark. Expert Essex County travel agency with 25+ years experience.',
    type: 'website',
    url: 'https://nexttripanywhere.com/all-inclusive-resorts-from-newark',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/all-inclusive-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'All-Inclusive Resorts from Newark',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/all-inclusive-resorts-from-newark',
  },
}

// Generate FAQ data
const faqs = [
  {
    question: "What's the best time to book all-inclusive resorts from Newark?",
    answer:
      'Book 60-90 days in advance for best prices from Newark Airport. January-March bookings offer 30-40% savings for spring/summer travel. Essex County residents should avoid booking during NJ school vacation weeks when prices spike. Our local office tracks Newark flight deals and can alert you to flash sales.',
  },
  {
    question: 'How much does an all-inclusive vacation from Newark really cost?',
    answer:
      'Budget $1,500-2,500 per person for 7 nights including flights from EWR. Add $273 for weekly Newark Airport parking, $100-150 for transfers, and 5-10% for tips. Luxury resorts run $3,500-7,000 per person. Our Essex County agents provide transparent total pricing including all fees.',
  },
  {
    question: "What's included in all-inclusive resorts?",
    answer:
      "All meals, snacks, alcoholic/non-alcoholic drinks, room, daily activities, entertainment, non-motorized water sports, kids clubs, and basic WiFi. Some include spa credits, golf, or scuba diving. Premium liquors, spa services, and motorized water sports typically cost extra. We explain exactly what's included at each resort.",
  },
  {
    question: 'Which airports should Newark residents use for all-inclusive vacations?',
    answer:
      'Newark Liberty (EWR) offers most direct flights to Caribbean and Mexico, with 50+ daily departures. JFK has more luxury airline options but adds 1-2 hours travel time from Essex County. LGA mainly serves domestic routes. We recommend EWR for convenience and price, monitoring all three for deals.',
  },
  {
    question: 'Are all-inclusive resorts good for families with kids?',
    answer:
      'Absolutely! Family resorts offer supervised kids clubs (ages 4-17), water parks, game rooms, teen lounges, and kids-eat-free programs. Many provide free stays for children under 12. Babysitting services available for date nights. Our Essex County families love Moon Palace Cancun and Beaches Turks & Caicos.',
  },
  {
    question: 'What documents do NJ residents need for Caribbean travel?',
    answer:
      'U.S. passport required for all international travel. Passport cards only work for cruises, not flights. Processing takes 6-8 weeks (expedited 2-3 weeks) at Newark or NYC passport offices. Children need their own passports. Some countries require 6 months validity remaining. We verify requirements for your destination.',
  },
  {
    question: 'Should I book all-inclusive directly or through a travel agent?',
    answer:
      'Travel agents access wholesale rates 10-30% below online prices, plus exclusive perks like room upgrades, resort credits, and free airport transfers. We handle issues if problems arise and match any lower price found. Our Essex County office provides local support before, during, and after travel.',
  },
  {
    question: "What's the difference between adults-only and family resorts?",
    answer:
      'Adults-only resorts (18+ or 21+) offer quieter pools, romantic dining, premium liquors, and sophisticated entertainment. Family resorts feature water parks, kids clubs, and casual dining. Some properties like Hard Rock have separate adults-only sections. We match you with the right atmosphere.',
  },
  {
    question: 'How far in advance should I book from Newark Airport?',
    answer:
      'Peak season (December-April) requires 3-4 months advance booking for best selection. Summer travel book by March. Last-minute deals occasionally appear 2-3 weeks out but limit choices. Newark flights fill quickly during NJ school vacations. We monitor availability and advise optimal booking windows.',
  },
  {
    question: 'Are all-inclusive resorts safe for Americans?',
    answer:
      'Major resort areas in Mexico, Jamaica, and Dominican Republic maintain excellent security with gated properties, security staff, and safe tourist zones. Stay on resort property and book excursions through the hotel. We provide detailed safety briefings and 24/7 support for Essex County travelers.',
  },
  {
    question: "What's the weather like year-round in the Caribbean?",
    answer:
      'Caribbean averages 80-85°F year-round. December-April is dry season with perfect weather. May-November sees occasional rain showers (usually brief). Hurricane season June-November peaks in September-October. Aruba, Barbados, and Curacao sit outside the hurricane belt with consistent conditions.',
  },
  {
    question: 'How much should I budget for extras at all-inclusive resorts?',
    answer:
      'Budget $500-1,000 per couple for spa services, excursions, souvenirs, and premium experiences. Tips run $100-200 per week. Airport transfers $50-150 per person. Optional romantic dinners $100-200. Motorized water sports $75-150. We provide detailed budget worksheets for Essex County travelers.',
  },
  {
    question: 'Can I leave the resort to explore?',
    answer:
      'Yes, but book excursions through the resort for safety and insurance coverage. Popular trips include Mayan ruins, catamaran cruises, zip-lining, and swimming with dolphins ($75-200 per person). Taxis available for shopping or dining off-property. We recommend must-do excursions for each destination.',
  },
  {
    question: "What's the dress code at all-inclusive resorts?",
    answer:
      'Breakfast/lunch are casual (cover-ups required). Dinner restaurants often require resort casual: men need long pants, closed shoes, collared shirts; women need sundresses or nice shorts. No swimwear, tank tops, or flip-flops at dinner. Pack 2-3 dinner outfits. Luxury resorts have stricter codes.',
  },
  {
    question: 'Do all-inclusive resorts accommodate dietary restrictions?',
    answer:
      'Most resorts handle vegetarian, vegan, gluten-free, and common allergies with advance notice. Kosher and severe allergies may have limited options. Buffets offer most variety. Contact us 30 days before travel to arrange special meal requirements with the resort.',
  },
  {
    question: 'What happens if my flight from Newark is cancelled?',
    answer:
      'Travel insurance covers trip interruption, missed connections, and cancellation penalties. Resorts typically waive one-night penalties for flight delays. We monitor Newark Airport delays and proactively rebook affected Essex County clients. Our 24/7 support handles all communications with resorts.',
  },
  {
    question: 'Are resort weddings and honeymoons worth it?',
    answer:
      "Absolutely! Many resorts offer free weddings with 3-7 night stays. Packages include ceremony, cake, bouquet, and photos. Upgrades available for receptions, décor, and spa services. Honeymoon perks include room upgrades, romantic dinners, and couple's massages. We coordinate with on-site planners.",
  },
  {
    question: 'How do I choose between Cancun, Jamaica, and Punta Cana?',
    answer:
      'Cancun offers best variety with 100+ resorts, Mayan culture, and calm beaches (4-hour flight). Jamaica provides authentic Caribbean culture, lush mountains, and reggae vibes (3.75-hour flight). Punta Cana features longest beaches, value pricing, and modern resorts (3.5-hour flight). We match destinations to your preferences.',
  },
  {
    question: "What's the advantage of booking with an Essex County travel agent?",
    answer:
      'Local expertise with Newark Airport logistics, NJ school calendar awareness, and understanding of what Essex County families want. We offer in-person consultations in Newark, local phone support, and know which resorts NJ residents love. Plus exclusive group rates when multiple Essex County families book together.',
  },
  {
    question: 'Do I need travel insurance for all-inclusive vacations?',
    answer:
      'Highly recommended! Covers trip cancellation, medical emergencies, evacuation, lost luggage, and missed connections. Costs 5-8% of trip total. Especially important during hurricane season. Some credit cards offer coverage. We compare policies and explain what Essex County residents need.',
  },
]

// Generate breadcrumb data
const breadcrumbs = [
  { name: 'Home', url: 'https://nexttripanywhere.com' },
  {
    name: 'All-Inclusive Resorts',
    url: 'https://nexttripanywhere.com/all-inclusive-resorts-from-newark',
  },
]

export default function AllInclusiveResortsPage() {
  // Get resort statistics for content
  const luxuryResorts = getLuxuryResorts()
  const familyResorts = getFamilyResorts()
  const adultsOnlyResorts = getAdultsOnlyResorts()

  // Generate schema
  const schemaGraph = generateResortSchemaGraph({
    resorts: allInclusiveResorts,
    pageTitle: 'All-Inclusive Resorts from Newark',
    pageDescription:
      'Comprehensive guide to 100+ all-inclusive resorts accessible from Newark Airport for Essex County residents',
    pageUrl: 'https://nexttripanywhere.com/all-inclusive-resorts-from-newark',
    faqs,
    breadcrumbs,
  })

  const webPageSchema = generateWebPageSchema({
    title: 'All-Inclusive Resorts from Newark | Complete 2025 Guide',
    description: metadata.description || '',
    url: 'https://nexttripanywhere.com/all-inclusive-resorts-from-newark',
    dateModified: new Date().toISOString(),
  })

  const howToSchema = generateHowToSchema()

  return (
    <>
      <Script id="schema-resort" type="application/ld+json">
        {JSON.stringify(schemaGraph)}
      </Script>
      <Script id="schema-webpage" type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </Script>
      <Script id="schema-howto" type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </Script>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              All-Inclusive Resorts from Newark Airport
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your Essex County Gateway to {resortStats.totalResorts}+ Caribbean & Mexico Resorts
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">{resortStats.totalResorts}+</div>
                <div className="text-sm text-blue-100">Resorts</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">{resortStats.totalCountries}</div>
                <div className="text-sm text-blue-100">Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">$1,500</div>
                <div className="text-sm text-blue-100">Starting Price</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">3-6h</div>
                <div className="text-sm text-blue-100">Flight Time</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:833-874-1019"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                📞 Call 833-874-1019
              </a>
              <a
                href="#resorts"
                className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 transition-colors"
              >
                Browse All Resorts
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Your Essex County All-Inclusive Resort Experts Since 1999
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                Planning an all-inclusive vacation from Newark Airport doesn't have to be
                overwhelming. As Essex County's premier travel agency for over 25 years, we've
                helped thousands of New Jersey families find their perfect Caribbean or Mexico
                getaway. With {resortStats.totalResorts} carefully vetted resorts across{' '}
                {resortStats.totalDestinations} stunning destinations, we match you with the ideal
                property for your travel style, budget, and dates.
              </p>
              <p className="mb-4">
                Newark Liberty International Airport (EWR) serves as your gateway to paradise,
                offering direct flights to every major resort destination in under 6 hours. Whether
                you're seeking a romantic adults-only escape to Turks & Caicos, a fun-filled family
                adventure at a Cancun water park resort, or a luxury retreat in Barbados, our local
                expertise ensures you get the best value and experience possible.
              </p>
              <p className="mb-4">
                What sets us apart? We're not just another online booking site. We're your neighbors
                in Essex County who understand the unique needs of New Jersey travelers. We know
                which resorts offer the best kids' programs during Millburn school breaks, where
                Montclair couples celebrate anniversaries, and which properties Newark families
                return to year after year. Our relationships with major resort chains like Sandals,
                RIU, Dreams, and Iberostar mean exclusive perks you won't find online—room upgrades,
                resort credits, and VIP treatment that transforms good vacations into unforgettable
                experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Book from Newark Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Newark Residents Choose All-Inclusive Resorts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">✈️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Flights from EWR</h3>
                <p className="text-gray-600">
                  Newark Airport offers 50+ daily nonstop flights to Caribbean and Mexico. No
                  connections means arriving relaxed and maximizing vacation time. Most destinations
                  under 4 hours.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Predictable Budgeting</h3>
                <p className="text-gray-600">
                  One upfront price covers accommodations, all meals, drinks, and entertainment.
                  Perfect for Essex County families who want to relax without watching every
                  expense.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Something for Everyone</h3>
                <p className="text-gray-600">
                  From kids clubs to adult pools, water sports to spa services, all-inclusive
                  resorts offer activities for every age and interest without leaving the property.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">🏖️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Prime Beach Locations</h3>
                <p className="text-gray-600">
                  All-inclusive resorts occupy the best beachfront real estate in the Caribbean.
                  Wake up to ocean views and walk straight from your room to pristine sand.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">🍽️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Diverse Dining Options</h3>
                <p className="text-gray-600">
                  Modern resorts feature 5-20 restaurants per property, from buffets to gourmet à la
                  carte. No reservations needed at most, and dietary restrictions accommodated.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Safety & Security</h3>
                <p className="text-gray-600">
                  Gated properties with 24/7 security provide peace of mind for New Jersey families.
                  English-speaking staff and familiar amenities ensure comfort abroad.
                </p>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                The convenience factor cannot be overstated for busy Essex County professionals and
                families. After a quick 30-minute drive to Newark Airport (or affordable
                Park-Sleep-Fly packages at airport hotels), you'll board a direct flight and land in
                paradise before lunch. No meal planning, no restaurant reservations, no calculating
                tips at every turn—just pure relaxation from the moment you arrive. This
                predictability and ease make all-inclusive resorts the preferred choice for over 60%
                of New Jersey international travelers, especially during peak winter months when
                escaping the cold becomes a necessity rather than a luxury.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Resort Database */}
      <section id="resorts" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Browse {resortStats.totalResorts}+ All-Inclusive Resorts
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Filter by destination, price, amenities, and travel style. Compare resorts
                side-by-side and find your perfect match. Every resort is accessible via direct or
                one-stop flights from Newark Airport.
              </p>
            </div>

            {/* Client-side resort listing component */}
            <ResortListingClient resorts={allInclusiveResorts} />
          </div>
        </div>
      </section>

      {/* Destinations Guide Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Top All-Inclusive Destinations from Newark
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {resortRegions.slice(0, 6).map((region) => (
                <div
                  key={region.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🏝️</div>
                      <div className="font-semibold">{region.name}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{region.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <span className="mr-4">✈️ {region.avgFlightTime}h flight</span>
                      <span>
                        📍{' '}
                        {
                          allInclusiveResorts.filter(
                            (r) => r.destination === region.name.split(' &')[0]
                          ).length
                        }{' '}
                        resorts
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">{region.description}</p>
                    <div className="text-xs text-gray-500">
                      <strong>Best months:</strong> {region.bestMonths.join(', ')}
                    </div>
                    {region.weatherNotes && (
                      <div className="text-xs text-amber-600 mt-2">⚠️ {region.weatherNotes}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="prose prose-lg max-w-none text-gray-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Choosing Your Perfect Destination
              </h3>
              <p className="mb-4">
                <strong>Mexico's Caribbean Coast (Cancun & Riviera Maya)</strong> reigns as the most
                popular choice for Essex County families, offering the perfect combination of
                beautiful beaches, ancient Mayan culture, and modern resort infrastructure. The
                4-hour flight time from Newark makes it accessible for long weekends, while the
                variety of over 100 resorts ensures options for every budget. The calm, turquoise
                waters of the Caribbean Sea provide ideal swimming conditions for children, while
                adults appreciate the sophisticated dining and nightlife options.
              </p>
              <p className="mb-4">
                <strong>Jamaica</strong> delivers authentic Caribbean culture just 3.75 hours from
                Newark. Beyond the beaches, you'll find lush mountains, cascading waterfalls, and
                the infectious rhythm of reggae music. Montego Bay and Ocho Rios host world-class
                resorts like Sandals and Couples, while Negril's Seven Mile Beach offers a more
                laid-back vibe. The island's warm hospitality and "no worries" attitude provide the
                perfect antidote to busy Essex County life.
              </p>
              <p className="mb-4">
                <strong>Dominican Republic (Punta Cana)</strong> offers exceptional value with
                modern resorts at competitive prices. The 3.5-hour flight from EWR makes it one of
                the closest Caribbean options. With 30 miles of pristine beaches and consistent
                trade winds, it's a paradise for beach lovers and water sports enthusiasts. The
                massive resort complexes here often feature multiple hotels sharing facilities,
                providing incredible variety without leaving the property.
              </p>
              <p>
                <strong>Turks & Caicos</strong> represents the luxury end of the spectrum with
                pristine Grace Bay Beach consistently ranked world's best. While pricier than other
                destinations, the incredible turquoise waters, excellent diving, and upscale resorts
                justify the premium for special occasions. Aruba sits outside the hurricane belt,
                guaranteeing good weather year-round with a unique Dutch-Caribbean culture. The
                Bahamas, just 3 hours from Newark, offers the shortest flight times and iconic
                properties like Atlantis Paradise Island.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Calculator Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <BudgetCalculator />
          </div>
        </div>
      </section>

      {/* Monthly Travel Guide */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Best Times to Travel from Newark: Month-by-Month Guide
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 mb-3">January - February</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    ⭐ <strong>Peak Season:</strong> Perfect weather, highest prices
                  </p>
                  <p>
                    🎓 <strong>NJ Schools:</strong> MLK weekend, Presidents Week popular
                  </p>
                  <p>
                    💰 <strong>Deals:</strong> Book by November for best rates
                  </p>
                  <p>
                    🌡️ <strong>Weather:</strong> 78-82°F, minimal rain
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 mb-3">March - April</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    🎉 <strong>Spring Break:</strong> Busy with families
                  </p>
                  <p>
                    🎓 <strong>NJ Schools:</strong> Spring break varies by district
                  </p>
                  <p>
                    💰 <strong>Deals:</strong> Early March and late April better
                  </p>
                  <p>
                    🌡️ <strong>Weather:</strong> 80-85°F, dry season ends
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 mb-3">May - June</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    💎 <strong>Value Season:</strong> Great deals before summer
                  </p>
                  <p>
                    🎓 <strong>NJ Schools:</strong> Memorial Day popular
                  </p>
                  <p>
                    💰 <strong>Deals:</strong> 30-40% off peak prices
                  </p>
                  <p>
                    🌡️ <strong>Weather:</strong> 85-88°F, humidity increases
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 mb-3">July - August</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    ☀️ <strong>Summer:</strong> Families dominate
                  </p>
                  <p>
                    🎓 <strong>NJ Schools:</strong> Peak family travel
                  </p>
                  <p>
                    💰 <strong>Deals:</strong> Book 3+ months ahead
                  </p>
                  <p>
                    🌡️ <strong>Weather:</strong> 88-90°F, afternoon showers
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 mb-3">September - October</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    🌀 <strong>Hurricane Season:</strong> Peak risk period
                  </p>
                  <p>
                    🎓 <strong>NJ Schools:</strong> Columbus Day weekend busy
                  </p>
                  <p>
                    💰 <strong>Deals:</strong> Lowest prices of year
                  </p>
                  <p>
                    🌡️ <strong>Weather:</strong> 85-88°F, higher rain chance
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 mb-3">November - December</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    🦃 <strong>Holidays:</strong> Thanksgiving & Christmas peak
                  </p>
                  <p>
                    🎓 <strong>NJ Schools:</strong> Thanksgiving week, winter break
                  </p>
                  <p>
                    💰 <strong>Deals:</strong> Early November, early December
                  </p>
                  <p>
                    🌡️ <strong>Weather:</strong> 78-82°F, dry season returns
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                Essex County School Calendar Considerations
              </h3>
              <p className="text-gray-700 mb-3">
                New Jersey school districts typically have breaks during: Presidents Week
                (February), Spring Break (March/April varies), Memorial Day, Summer (late June-early
                September), Columbus Day, Thanksgiving Week, and Winter Break (December 23-January
                2). Prices spike 30-50% during these periods, so Essex County families should book
                3-4 months in advance or consider traveling during non-peak times if schedules
                allow.
              </p>
              <p className="text-gray-700">
                <strong>Money-Saving Tip:</strong> If you can travel the week after NJ schools
                return from break, you'll find significantly lower prices and fewer crowds while
                still enjoying excellent weather. Many Essex County retirees and couples without
                school-age children take advantage of these "shoulder" periods for premium value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Airport Guide Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Newark Airport Guide for All-Inclusive Travelers
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Newark Liberty (EWR)</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    ✅ <strong>Best for:</strong> Essex County residents
                  </p>
                  <p>
                    ✈️ <strong>Direct flights:</strong> All major resort destinations
                  </p>
                  <p>
                    🚗 <strong>Parking:</strong> $39/day economy, $59/day terminal
                  </p>
                  <p>
                    ⏱️ <strong>From Essex County:</strong> 15-45 minutes
                  </p>
                  <p>
                    💡 <strong>Tips:</strong> Terminal C for United, Terminal B for JetBlue
                  </p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">JFK International</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    ✅ <strong>Best for:</strong> Premium airlines, more options
                  </p>
                  <p>
                    ✈️ <strong>Direct flights:</strong> More Caribbean islands
                  </p>
                  <p>
                    🚗 <strong>Parking:</strong> $35/day economy
                  </p>
                  <p>
                    ⏱️ <strong>From Essex County:</strong> 60-90 minutes
                  </p>
                  <p>
                    ⚠️ <strong>Consider:</strong> Traffic can double travel time
                  </p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">LaGuardia (LGA)</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    ✅ <strong>Best for:</strong> Connecting flights only
                  </p>
                  <p>
                    ✈️ <strong>Direct flights:</strong> Limited Caribbean
                  </p>
                  <p>
                    🚗 <strong>Parking:</strong> $39/day
                  </p>
                  <p>
                    ⏱️ <strong>From Essex County:</strong> 45-75 minutes
                  </p>
                  <p>
                    ⚠️ <strong>Note:</strong> Fewer international options
                  </p>
                </div>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-gray-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Newark Airport Logistics for Essex County Travelers
              </h3>
              <p className="mb-4">
                For Essex County residents, Newark Liberty International Airport (EWR) offers
                unmatched convenience for all-inclusive resort travel. Located just 15-45 minutes
                from most Essex County towns, EWR eliminates the stress of navigating New York
                traffic. The AirTrain connects all terminals and links to NJ Transit, offering an
                alternative to driving. For those driving, Economy Parking P6 offers the best value
                at $39/day with free shuttle service to terminals.
              </p>
              <p className="mb-4">
                <strong>Smart Parking Strategy:</strong> Book parking online at least 24 hours in
                advance to save $5-10 per day. Consider Park-Sleep-Fly packages at Newark Airport
                Marriott or Hilton, which include parking for up to 14 days and shuttle service. For
                trips longer than 10 days, off-airport lots like WallyPark or Park Plus offer rates
                as low as $15/day with frequent shuttles.
              </p>
              <p>
                <strong>Terminal Navigation:</strong> Terminal C serves United Airlines with the
                most Caribbean and Mexico routes. Terminal B houses JetBlue, offering competitive
                fares to popular destinations. Terminal A handles international carriers and some
                American Airlines flights. Arrive 3 hours early for international flights during
                peak season, 2.5 hours during off-peak. TSA PreCheck/Global Entry (enrollment center
                at EWR) reduces wait times significantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding All-Inclusive: What's Really Included?
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Always Included ✅</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">All Meals:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Breakfast, lunch, dinner, plus snacks throughout the day
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">Beverages:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Unlimited alcoholic and non-alcoholic drinks, including most cocktails
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">Accommodations:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Your room, daily housekeeping, and basic amenities
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">Entertainment:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Shows, live music, theme parties, and beach activities
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">Pools & Beach:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Access to all pools, hot tubs, and beach with loungers
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">Kids Clubs:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Supervised activities for ages 4-17 at family resorts
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">Non-Motorized Sports:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Kayaking, paddleboarding, snorkeling, sailing
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">Fitness Center:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Gym equipment and often group fitness classes
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Usually Extra Cost ❌</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <div>
                      <strong className="text-gray-900">Spa Services:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Massages, facials, salon services ($100-300)
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <div>
                      <strong className="text-gray-900">Premium Liquors:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Top-shelf brands, wine bottles, champagne
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <div>
                      <strong className="text-gray-900">Motorized Water Sports:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Jet skiing, parasailing, water skiing ($75-150)
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <div>
                      <strong className="text-gray-900">Off-Site Excursions:</strong>
                      <span className="text-gray-600"> Tours, diving, fishing trips ($75-200)</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <div>
                      <strong className="text-gray-900">Special Dining:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Private dinners, in-room dining, lobster (varies)
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <div>
                      <strong className="text-gray-900">WiFi Upgrades:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Premium internet for streaming ($10-25/day)
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <div>
                      <strong className="text-gray-900">Photos:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Professional photography services ($150-500)
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <div>
                      <strong className="text-gray-900">Airport Transfers:</strong>
                      <span className="text-gray-600">
                        {' '}
                        Transportation to/from resort ($50-150/person)
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h4 className="font-bold text-lg text-gray-900 mb-3">Budget Resorts Include</h4>
                <p className="text-sm text-gray-600">
                  Basic rooms, buffet dining, local drinks, pools, beach access, evening
                  entertainment. Limited à la carte restaurants (reservations required). House wine
                  and beer brands.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
                <h4 className="font-bold text-lg text-gray-900 mb-3">Mid-Range Resorts Add</h4>
                <p className="text-sm text-gray-600">
                  Room upgrades available, 5-8 restaurants, international liquors, room service,
                  kids club, teen zone, more water sports, better beach locations, nightly shows.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-yellow-400">
                <h4 className="font-bold text-lg text-gray-900 mb-3">Luxury Resorts Include</h4>
                <p className="text-sm text-gray-600">
                  Premium spirits, 24-hour room service, butler service, spa credits, golf, scuba
                  diving, private pools, exclusive beaches, gourmet dining, top-shelf everything.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How to Book Your All-Inclusive Vacation from Newark
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Choose Dates & Budget</h3>
                <p className="text-sm text-gray-600">
                  Consider NJ school calendars, weather patterns, and your budget. Flexible dates
                  save 20-30%.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Select Destination</h3>
                <p className="text-sm text-gray-600">
                  Match destination to your interests: beaches, culture, adventure, or relaxation
                  focus.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Compare Resorts</h3>
                <p className="text-sm text-gray-600">
                  Review amenities, read reviews, check locations. We provide honest
                  recommendations.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Book & Prepare</h3>
                <p className="text-sm text-gray-600">
                  Secure with deposit, add insurance, arrange airport parking, get documents ready.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Book with Next Trip Anywhere?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">◆</span>
                    <span className="text-gray-700">
                      Access to wholesale rates 10-30% below online prices
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">◆</span>
                    <span className="text-gray-700">
                      Exclusive perks: room upgrades, resort credits, VIP treatment
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">◆</span>
                    <span className="text-gray-700">
                      Local Essex County office for in-person consultations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">◆</span>
                    <span className="text-gray-700">
                      24/7 support during travel if issues arise
                    </span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">◆</span>
                    <span className="text-gray-700">Price match guarantee plus added benefits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">◆</span>
                    <span className="text-gray-700">
                      Group rates for families traveling together
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">◆</span>
                    <span className="text-gray-700">
                      Payment plans available for larger bookings
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">◆</span>
                    <span className="text-gray-700">
                      Expert knowledge of which resorts suit NJ travelers
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 text-center">
                <a
                  href="tel:833-874-1019"
                  className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  Call 833-874-1019 to Start Planning
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions from Essex County Travelers
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local Support CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Your Essex County Neighbors in Travel Since 1999
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of satisfied New Jersey families who trust us with their precious
              vacation time. Our local expertise, wholesale pricing, and personal service make all
              the difference.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-3xl mb-3">📍</div>
                <h3 className="font-bold mb-2">Local Office</h3>
                <p className="text-sm text-blue-100">
                  Meet in person to plan your perfect getaway with maps, brochures, and expert
                  advice
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-bold mb-2">Best Price Guarantee</h3>
                <p className="text-sm text-blue-100">
                  We match any price and add exclusive perks like upgrades and resort credits
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="font-bold mb-2">Full Support</h3>
                <p className="text-sm text-blue-100">
                  24/7 assistance during travel plus help with documents, insurance, and planning
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:833-874-1019"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                📞 Call 833-874-1019
              </a>
              <Link
                href="/contact"
                className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 transition-colors"
              >
                Request Free Consultation
              </Link>
            </div>
            <p className="mt-6 text-sm text-blue-100">
              Monday-Friday 9AM-6PM | Saturday 10AM-4PM | Sunday by Appointment
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Start Planning Your All-Inclusive Escape
            </h2>
            <OptimizedBookingForm />
          </div>
        </div>
      </section>
    </>
  )
}
