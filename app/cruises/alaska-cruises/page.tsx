/**
 * Alaska Cruises Alternate Page
 * Targeting 22.2K monthly searches with detailed destination content
 * Complementary to main Alaska page with focus on planning and tips
 */

import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { alaskaCruise } from '@/lib/data/cruise-destinations'

// Lazy load non-critical components
const TrustBadges = dynamic(
  () => import('@/components/ui/TrustSignals').then((mod) => ({ default: mod.TrustBadges })),
  { ssr: true }
)

// Generate metadata for SEO
export const metadata: Metadata = {
  title: 'Alaska Cruises 2025 | Complete Guide to Glaciers, Wildlife & Inside Passage',
  description:
    'Plan your perfect Alaska cruise with our complete guide. Inside Passage, Glacier Bay, ports, excursions & insider tips. Save up to 40% - Call 833-874-1019',
  keywords: [
    'Alaska cruises 2025',
    'Alaska cruise vacation',
    'Alaska cruise ports',
    'Alaska cruise planning',
    'Alaska cruise guide',
    'best Alaska cruise itinerary',
    'Alaska cruise tips',
    'Alaska cruise ships',
    'Inside Passage cruise',
    'Glacier Bay cruise',
  ].join(', '),
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/alaska-cruises',
  },
  openGraph: {
    title: 'Alaska Cruises 2025 | Complete Last Frontier Guide',
    description:
      'Your complete guide to Alaska cruising. Explore glaciers, wildlife, ports, and exclusive deals. Expert planning assistance.',
    url: 'https://nexttripanywhere.com/cruises/alaska-cruises',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
    images: [
      {
        url: '/images/cruises/alaska-glaciers.jpg',
        width: 1200,
        height: 630,
        alt: 'Alaska Cruise Glaciers and Wildlife',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alaska Cruises 2025 | Complete Guide',
    description:
      'Plan your perfect Alaska cruise. Glaciers, wildlife & Inside Passage with expert guidance.',
    images: ['/images/cruises/alaska-glaciers.jpg'],
  },
}

// Planning tip component
const PlanningTip = ({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start">
      <span className="text-3xl mr-4 flex-shrink-0">{icon}</span>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-blue-900">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
)

// FAQ component
const FAQ = ({ question, answer }: { question: string; answer: string }) => (
  <details className="group border-b border-gray-200 pb-4 mb-4">
    <summary className="cursor-pointer list-none">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-blue-900">{question}</h3>
        <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
      </div>
    </summary>
    <p className="mt-4 text-gray-700 leading-relaxed">{answer}</p>
  </details>
)

export default function AlaskaCruisesPage() {
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
      },
      {
        '@type': 'WebPage',
        '@id': 'https://nexttripanywhere.com/cruises/alaska-cruises',
        url: 'https://nexttripanywhere.com/cruises/alaska-cruises',
        name: 'Alaska Cruises Complete Guide',
        description: metadata.description,
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
              name: 'Alaska Cruises Guide',
              item: 'https://nexttripanywhere.com/cruises/alaska-cruises',
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: alaskaCruise.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  }

  return (
    <>
      <Script
        id="schema-alaska-cruises"
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
                Alaska Cruises Guide
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-800 via-blue-900 to-blue-800 text-white py-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Alaska Cruises: Complete 2025 Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Everything you need to know about cruising America's Last Frontier
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold">16</p>
                    <p className="text-sm">Massive Glaciers</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">8</p>
                    <p className="text-sm">Wildlife Species</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">500+</p>
                    <p className="text-sm">Miles of Coastline</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">40%</p>
                    <p className="text-sm">Savings Available</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18338741019"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  📞 Speak to Alaska Expert
                </a>
                <Link
                  href="/cruises/alaska"
                  className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  View Cruise Deals
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="bg-blue-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">Quick Navigation</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <Link
                  href="#planning"
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <span className="text-3xl mb-2 block">📋</span>
                  <span className="font-semibold text-blue-900">Planning Guide</span>
                </Link>
                <Link
                  href="#routes"
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <span className="text-3xl mb-2 block">🗺️</span>
                  <span className="font-semibold text-blue-900">Routes & Itineraries</span>
                </Link>
                <Link
                  href="#wildlife"
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <span className="text-3xl mb-2 block">🐋</span>
                  <span className="font-semibold text-blue-900">Wildlife Guide</span>
                </Link>
                <Link
                  href="#tips"
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <span className="text-3xl mb-2 block">💡</span>
                  <span className="font-semibold text-blue-900">Expert Tips</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Your Complete Alaska Cruise Guide</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  An Alaska cruise represents one of the world's most spectacular travel
                  experiences, combining the convenience of unpacking once with the adventure of
                  exploring America's last frontier. From the moment you embark, you'll be immersed
                  in a world of towering glaciers, pristine wilderness, and abundant wildlife that
                  exists nowhere else in such accessible abundance.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The Inside Passage, your primary route, is a protected network of waterways that
                  winds through islands and fjords, offering calm waters and breathtaking scenery at
                  every turn. Here, you'll witness glaciers actively calving into the sea, pods of
                  orcas hunting in coordinated groups, and bald eagles soaring overhead – all from
                  the comfort of your ship or during carefully curated shore excursions.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Whether you're drawn to the gold rush history of Skagway, the Russian heritage of
                  Sitka, or the raw natural beauty of Glacier Bay National Park, an Alaska cruise
                  offers experiences that will stay with you for a lifetime. Our expert team has
                  sailed these waters countless times and can help you choose the perfect itinerary,
                  ship, and season for your Alaska adventure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Planning Section */}
        <section id="planning" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Alaska Cruise Planning Guide</h2>

              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                  Essential Planning Tips
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <PlanningTip
                    icon="📅"
                    title="Book 12-18 Months Ahead"
                    description="Alaska cruises sell out quickly, especially balcony cabins and suites. Book early for best selection and prices."
                  />
                  <PlanningTip
                    icon="🚢"
                    title="Choose Your Ship Size"
                    description="Smaller ships (under 1,000 passengers) access more ports and offer intimate experiences. Larger ships have more amenities."
                  />
                  <PlanningTip
                    icon="🛏️"
                    title="Invest in a Balcony"
                    description="A balcony is worth the extra cost for Alaska. You'll have private viewing for wildlife and glaciers."
                  />
                  <PlanningTip
                    icon="📸"
                    title="Bring Good Optics"
                    description="Pack binoculars (8x42 recommended) and a camera with zoom lens for wildlife and glacier viewing."
                  />
                  <PlanningTip
                    icon="🧥"
                    title="Layer Your Clothing"
                    description="Alaska weather changes quickly. Pack waterproof outer layer, warm middle layer, and moisture-wicking base layer."
                  />
                  <PlanningTip
                    icon="🎯"
                    title="Book Excursions Early"
                    description="Popular excursions like helicopter glacier landings sell out months in advance. Book as soon as possible."
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-blue-900">
                  Alaska Cruise Costs Breakdown
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Expense Category</th>
                        <th className="text-center py-2">Budget</th>
                        <th className="text-center py-2">Mid-Range</th>
                        <th className="text-center py-2">Luxury</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">7-Day Cruise (per person)</td>
                        <td className="text-center">Budget Range</td>
                        <td className="text-center">Mid Range</td>
                        <td className="text-center">Premium</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Cabin Type</td>
                        <td className="text-center">Interior</td>
                        <td className="text-center">Balcony</td>
                        <td className="text-center">Suite</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Excursions (per port)</td>
                        <td className="text-center">Budget Options</td>
                        <td className="text-center">Standard Tours</td>
                        <td className="text-center">Premium Experiences</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Gratuities (per day)</td>
                        <td className="text-center">Standard</td>
                        <td className="text-center">Standard Plus</td>
                        <td className="text-center">Suite Level</td>
                      </tr>
                      <tr className="font-semibold">
                        <td className="py-2">Total Estimated Cost</td>
                        <td className="text-center">Value Package</td>
                        <td className="text-center">Comfort Package</td>
                        <td className="text-center">Luxury Package</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Routes Section */}
        <section id="routes" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Alaska Cruise Routes & Itineraries
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">Inside Passage Route</h3>
                  <p className="text-gray-600 mb-4">
                    The most popular route, sailing through protected waters with stops at
                    Ketchikan, Juneau, and Skagway.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Round-trip from Seattle or Vancouver
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Calm, protected waters
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Perfect for first-time cruisers
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      7-day standard duration
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">Gulf of Alaska Route</h3>
                  <p className="text-gray-600 mb-4">
                    One-way cruises between Vancouver and Anchorage, covering more territory and
                    glaciers.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      More glaciers and fjords
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Includes Hubbard Glacier
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Option for land tours
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      7-14 day options
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-blue-900">
                  Sample 7-Day Itinerary
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                      1
                    </span>
                    <div>
                      <strong>Day 1:</strong> Depart Seattle - Scenic cruising through Puget Sound
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                      2
                    </span>
                    <div>
                      <strong>Day 2:</strong> Inside Passage - Wildlife viewing and scenic cruising
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                      3
                    </span>
                    <div>
                      <strong>Day 3:</strong> Ketchikan - Totem poles, salmon, and lumberjack show
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                      4
                    </span>
                    <div>
                      <strong>Day 4:</strong> Juneau - Mendenhall Glacier and whale watching
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                      5
                    </span>
                    <div>
                      <strong>Day 5:</strong> Skagway - White Pass Railway and Gold Rush history
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                      6
                    </span>
                    <div>
                      <strong>Day 6:</strong> Glacier Bay - Full day scenic cruising with rangers
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                      7
                    </span>
                    <div>
                      <strong>Day 7:</strong> Return to Seattle - Final scenic cruising
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wildlife Section */}
        <section id="wildlife" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Alaska Wildlife Guide</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-blue-600 text-white p-4">
                    <h3 className="text-xl font-semibold">Marine Mammals</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-2xl mr-3">🐋</span>
                        <div>
                          <strong>Humpback Whales</strong>
                          <p className="text-sm text-gray-600">
                            Best: June-September, especially near Juneau
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-2xl mr-3">🐋</span>
                        <div>
                          <strong>Orcas (Killer Whales)</strong>
                          <p className="text-sm text-gray-600">Year-round, often in pods of 5-30</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-2xl mr-3">🦭</span>
                        <div>
                          <strong>Sea Lions & Seals</strong>
                          <p className="text-sm text-gray-600">Common at all ports and rookeries</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-2xl mr-3">🦦</span>
                        <div>
                          <strong>Sea Otters</strong>
                          <p className="text-sm text-gray-600">Especially common near Sitka</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-green-600 text-white p-4">
                    <h3 className="text-xl font-semibold">Land Animals</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-2xl mr-3">🐻</span>
                        <div>
                          <strong>Brown/Grizzly Bears</strong>
                          <p className="text-sm text-gray-600">
                            Best viewing: July-September during salmon runs
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-2xl mr-3">🐻</span>
                        <div>
                          <strong>Black Bears</strong>
                          <p className="text-sm text-gray-600">Common in forests near all ports</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-2xl mr-3">🦌</span>
                        <div>
                          <strong>Moose</strong>
                          <p className="text-sm text-gray-600">Interior Alaska, rare from ships</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-2xl mr-3">🐺</span>
                        <div>
                          <strong>Wolves</strong>
                          <p className="text-sm text-gray-600">
                            Elusive but present in all regions
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-yellow-600 text-white p-4">
                    <h3 className="text-xl font-semibold">Birds</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-2xl mr-3">🦅</span>
                        <div>
                          <strong>Bald Eagles</strong>
                          <p className="text-sm text-gray-600">Abundant, especially in Ketchikan</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-2xl mr-3">🐧</span>
                        <div>
                          <strong>Puffins</strong>
                          <p className="text-sm text-gray-600">Coastal cliffs, May-September</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-2xl mr-3">🦜</span>
                        <div>
                          <strong>Arctic Terns</strong>
                          <p className="text-sm text-gray-600">
                            Summer visitors, incredible migrations
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-2xl mr-3">🦉</span>
                        <div>
                          <strong>Ravens</strong>
                          <p className="text-sm text-gray-600">
                            Sacred to Native cultures, very intelligent
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-100 rounded-lg p-6 text-center">
                <p className="text-lg font-semibold text-blue-900 mb-2">
                  Wildlife Viewing Guarantee
                </p>
                <p className="text-gray-700">
                  Most Alaska cruises guarantee whale sightings or provide compensation. Ask about
                  wildlife guarantees when booking!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Tips Section */}
        <section id="tips" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Expert Alaska Cruise Tips</h2>

              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">Money-Saving Tips</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">💰</span>
                      <span>Book shoulder season (May or September) for 30-40% savings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">💰</span>
                      <span>
                        Consider older ships for better value - Alaska scenery is the star
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">💰</span>
                      <span>Book ship excursions for glaciers, independent for towns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">💰</span>
                      <span>Pack lunch in ports for significant daily savings</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">Photography Tips</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">📸</span>
                      <span>Bring extra batteries - cold drains them faster</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">📸</span>
                      <span>Use polarizing filter to reduce glare off water and ice</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">📸</span>
                      <span>Best glacier photos: overcast days reduce harsh shadows</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">📸</span>
                      <span>Stabilized binoculars double as telephoto for phones</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">
                    What Most People Don't Know
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-3 mt-1">💡</span>
                      <span>Glacier Bay entry permits are limited - not all ships can enter</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-3 mt-1">💡</span>
                      <span>Smaller ships can navigate Misty Fjords and Tracy Arm better</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-3 mt-1">💡</span>
                      <span>September cruises may see Northern Lights</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-3 mt-1">💡</span>
                      <span>Pack seasickness remedies for Gulf of Alaska crossings</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

              {alaskaCruise.faqs.map((faq, idx) => (
                <FAQ key={idx} question={faq.question} answer={faq.answer} />
              ))}

              <FAQ
                question="What's the difference between Inside Passage and Gulf of Alaska cruises?"
                answer="Inside Passage cruises are round-trip from Seattle or Vancouver through protected waters, ideal for first-timers. Gulf of Alaska cruises are one-way between Vancouver and Anchorage, covering more territory including Hubbard Glacier and College Fjord, but crossing open ocean."
              />

              <FAQ
                question="How rough are Alaska cruise seas?"
                answer="Inside Passage waters are generally calm and protected. However, Gulf of Alaska crossings can be rough, especially in shoulder seasons. If prone to seasickness, choose Inside Passage routes and bring remedies for any Gulf crossings."
              />

              <FAQ
                question="Should I book excursions through the cruise line or independently?"
                answer="Book glacier tours, flightseeing, and remote excursions through the cruise line for timing guarantees. City tours, museums, and walking tours can be done independently for significant savings. The ship will wait if their excursion runs late, but not for independent tours."
              />
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <TrustBadges />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-slate-800 to-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Start Planning Your Alaska Adventure</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              With so many cruise lines, ships, and itineraries available, finding the perfect
              Alaska cruise can be overwhelming. Let our Alaska cruise specialists help you navigate
              the choices and find the ideal voyage for your budget and travel style.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl font-semibold mb-4">Why Book With Next Trip Anywhere?</h3>
              <ul className="text-left space-y-3">
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Alaska cruise specialists with firsthand experience</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Exclusive group rates and shipboard credits</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>Pre and post cruise land packages available</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">✓</span>
                  <span>24/7 support throughout your journey</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                📞 Call 833-874-1019
              </a>
              <Link
                href="/contact"
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Request Free Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
