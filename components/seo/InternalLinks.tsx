/**
 * Internal Links Component for SEO Optimization
 *
 * This component provides contextual internal linking for all pages
 * to improve SEO through better link distribution and topic clustering.
 *
 * Target: 8-12 internal links per page (excluding navigation)
 */

import Link from 'next/link'

export interface InternalLinkSection {
  title: string
  links: {
    href: string
    text: string
    description?: string
  }[]
}

interface InternalLinksProps {
  sections: InternalLinkSection[]
  className?: string
}

/**
 * Renders internal links sections for SEO optimization
 */
export function InternalLinks({ sections, className = '' }: InternalLinksProps) {
  return (
    <div className={`bg-gray-50 py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-blue-900">
            Explore More Travel Options
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-blue-800">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-start group"
                      >
                        <span className="mr-2 text-gray-400 group-hover:text-blue-600 transition-colors">
                          →
                        </span>
                        <span className="flex-1">
                          {link.text}
                          {link.description && (
                            <span className="block text-sm text-gray-600 mt-1">
                              {link.description}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Preset link groups for different page types
 */
export const linkPresets = {
  // For cruise destination pages
  cruiseDestination: [
    {
      title: 'Popular Cruise Destinations',
      links: [
        { href: '/cruises/caribbean', text: 'Caribbean Cruises' },
        { href: '/cruises/bahamas', text: 'Bahamas Cruises' },
        { href: '/cruises/alaska', text: 'Alaska Cruises' },
        { href: '/cruises/mediterranean', text: 'Mediterranean Cruises' },
      ],
    },
    {
      title: 'Cruise Planning Resources',
      links: [
        { href: '/guides/first-time-cruiser', text: 'First Time Cruiser Guide' },
        { href: '/guides/packing-for-cruise', text: 'Cruise Packing List' },
        { href: '/tools/cruise-price-calculator', text: 'Price Calculator' },
        { href: '/guides/choosing-cabin', text: 'How to Choose a Cabin' },
      ],
    },
    {
      title: 'Local Services',
      links: [
        { href: '/cruises/from-newark', text: 'Cruises from Newark' },
        { href: '/cruises/cape-liberty-port', text: 'Cape Liberty Port Guide' },
        { href: '/services/cruise-transfers', text: 'Port Transfer Service' },
        { href: '/essex-county', text: 'Essex County Travel' },
      ],
    },
  ],

  // For package pages
  vacationPackage: [
    {
      title: 'More Vacation Packages',
      links: [
        { href: '/packages/all-inclusive', text: 'All-Inclusive Resorts' },
        { href: '/packages/family', text: 'Family Vacations' },
        { href: '/packages/luxury', text: 'Luxury Escapes' },
        { href: '/packages/budget', text: 'Budget-Friendly Deals' },
      ],
    },
    {
      title: 'Popular Destinations',
      links: [
        { href: '/destinations/caribbean-from-nj', text: 'Caribbean from NJ' },
        { href: '/destinations/bahamas-from-newark', text: 'Bahamas Getaways' },
        { href: '/destinations/bermuda-weekend', text: 'Bermuda Weekends' },
        { href: '/destinations/florida-vacation', text: 'Florida Vacations' },
      ],
    },
    {
      title: 'Travel Planning',
      links: [
        { href: '/guides/travel-insurance', text: 'Travel Insurance Guide' },
        { href: '/guides/passport-requirements', text: 'Passport Requirements' },
        { href: '/tools/budget-calculator', text: 'Budget Calculator' },
        { href: '/blog', text: 'Travel Tips & News' },
      ],
    },
  ],

  // For guide pages
  travelGuide: [
    {
      title: 'Essential Guides',
      links: [
        { href: '/guides/first-time-cruiser', text: 'First Time Cruising' },
        { href: '/guides/travel-documents', text: 'Travel Documents' },
        { href: '/guides/travel-insurance', text: 'Insurance Explained' },
        { href: '/guides/tsa-security', text: 'TSA Security Tips' },
      ],
    },
    {
      title: 'Cruise Information',
      links: [
        { href: '/cruises', text: 'Browse All Cruises' },
        { href: '/cruises/deals', text: 'Cruise Deals' },
        { href: '/cruises/2025', text: '2025 Cruises' },
        { href: '/cruises/last-minute', text: 'Last Minute Cruises' },
      ],
    },
    {
      title: 'Vacation Planning',
      links: [
        { href: '/packages', text: 'Vacation Packages' },
        { href: '/destinations', text: 'Destinations' },
        { href: '/flights', text: 'Flight Booking' },
        { href: '/contact', text: 'Get Expert Help' },
      ],
    },
  ],

  // For Essex County pages
  essexCounty: [
    {
      title: 'Travel Services',
      links: [
        { href: '/services/airport-transfers', text: 'Airport Transfers' },
        { href: '/services/cruise-transfers', text: 'Cruise Port Transfers' },
        { href: '/services/group-travel', text: 'Group Travel' },
        { href: '/services/corporate-travel', text: 'Corporate Travel' },
      ],
    },
    {
      title: 'Popular Trips from Essex',
      links: [
        { href: '/cruises/from-newark', text: 'Newark Cruises' },
        { href: '/destinations/nyc-from-essex', text: 'NYC Day Trips' },
        { href: '/destinations/atlantic-city', text: 'Atlantic City' },
        { href: '/destinations/poconos', text: 'Poconos Getaways' },
      ],
    },
    {
      title: 'Travel Resources',
      links: [
        { href: '/guides/newark-airport', text: 'Newark Airport Guide' },
        { href: '/guides/cape-liberty-parking', text: 'Port Parking Tips' },
        { href: '/blog', text: 'Local Travel Blog' },
        { href: '/about', text: 'About Us' },
      ],
    },
  ],

  // For tool pages
  tools: [
    {
      title: 'Planning Tools',
      links: [
        { href: '/tools/cruise-price-calculator', text: 'Cruise Price Calculator' },
        { href: '/tools/budget-calculator', text: 'Vacation Budget Tool' },
        { href: '/tools/packing-checklist', text: 'Packing Checklist' },
        { href: '/tools/weather-forecast', text: 'Destination Weather' },
      ],
    },
    {
      title: 'Travel Guides',
      links: [
        { href: '/guides/first-time-cruiser', text: 'Cruising 101' },
        { href: '/guides/travel-insurance', text: 'Insurance Guide' },
        { href: '/guides/passport-requirements', text: 'Passport Info' },
        { href: '/guides/tsa-security', text: 'Security Tips' },
      ],
    },
    {
      title: 'Book Your Trip',
      links: [
        { href: '/cruises', text: 'Find Cruises' },
        { href: '/packages', text: 'Vacation Packages' },
        { href: '/flights', text: 'Book Flights' },
        { href: '/contact', text: 'Get Help' },
      ],
    },
  ],
}

/**
 * Get recommended internal links based on page type and current path
 */
export function getRecommendedLinks(
  pageType: 'cruise' | 'package' | 'guide' | 'essex' | 'tool',
  currentPath: string
): InternalLinkSection[] {
  const preset = {
    cruise: linkPresets.cruiseDestination,
    package: linkPresets.vacationPackage,
    guide: linkPresets.travelGuide,
    essex: linkPresets.essexCounty,
    tool: linkPresets.tools,
  }[pageType]

  // Filter out the current page from links
  return preset.map((section) => ({
    ...section,
    links: section.links.filter((link) => link.href !== currentPath),
  }))
}

/**
 * Topic cluster component for hub pages
 */
export function TopicCluster({
  hubTitle,
  clusters,
}: {
  hubTitle: string
  clusters: Array<{
    title: string
    description: string
    links: Array<{ href: string; text: string }>
  }>
}) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">{hubTitle}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore our comprehensive collection of resources and destinations
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clusters.map((cluster, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-800">{cluster.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{cluster.description}</p>
                <ul className="space-y-2">
                  {cluster.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-blue-600 hover:text-blue-800 hover:underline text-sm flex items-center"
                      >
                        <span className="mr-2">→</span>
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InternalLinks
