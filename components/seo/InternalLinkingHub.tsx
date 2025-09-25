import Link from 'next/link'

interface InternalLink {
  href: string
  text: string
  priority?: 'high' | 'medium' | 'low'
}

interface InternalLinkingHubProps {
  currentPath: string
  pageType: 'cruise' | 'destination' | 'package' | 'guide' | 'essex' | 'blog'
  relatedLinks?: InternalLink[]
}

/**
 * Smart internal linking component that ensures proper link distribution
 * Implements contextual linking strategy for SEO optimization
 */
export default function InternalLinkingHub({
  currentPath,
  pageType,
  relatedLinks = []
}: InternalLinkingHubProps) {

  // Core hub pages - every page should link to these
  const coreHubs: InternalLink[] = [
    { href: '/cruises', text: 'Cruise Deals', priority: 'high' },
    { href: '/destinations', text: 'Destinations', priority: 'high' },
    { href: '/packages', text: 'Vacation Packages', priority: 'high' },
    { href: '/guides', text: 'Travel Guides', priority: 'medium' },
    { href: '/essex-county', text: 'Essex County Travel', priority: 'medium' },
  ]

  // Context-specific links based on page type
  const contextLinks: Record<string, InternalLink[]> = {
    cruise: [
      { href: '/cruises/caribbean-cruises', text: 'Caribbean Cruises' },
      { href: '/cruises/from-newark', text: 'Cruises from Newark' },
      { href: '/cruises/royal-caribbean', text: 'Royal Caribbean' },
      { href: '/cruises/deals', text: 'Last Minute Cruise Deals' },
      { href: '/cruises/2025', text: '2025 Cruises' },
    ],
    destination: [
      { href: '/destinations/caribbean-from-nj', text: 'Caribbean from NJ' },
      { href: '/destinations/bahamas-from-newark', text: 'Bahamas from Newark' },
      { href: '/destinations/europe-from-newark', text: 'Europe Travel' },
      { href: '/destinations/florida-from-nj', text: 'Florida Vacations' },
      { href: '/destinations/mexico-from-newark', text: 'Mexico Getaways' },
    ],
    package: [
      { href: '/packages/all-inclusive-caribbean', text: 'All-Inclusive Caribbean' },
      { href: '/packages/family-resorts-from-newark', text: 'Family Resorts' },
      { href: '/packages/luxury-caribbean', text: 'Luxury Resorts' },
      { href: '/packages/spring-break-deals', text: 'Spring Break' },
      { href: '/packages/sandals-resorts-deals', text: 'Sandals Resorts' },
    ],
    guide: [
      { href: '/guides/first-time-cruiser', text: 'First Time Cruiser Guide' },
      { href: '/guides/passport-requirements', text: 'Passport Requirements' },
      { href: '/guides/caribbean-hurricane-season', text: 'Hurricane Season Guide' },
      { href: '/guides/cruise-packing-checklist', text: 'Packing Checklist' },
      { href: '/guides/travel-insurance', text: 'Travel Insurance Guide' },
    ],
    essex: [
      { href: '/travel-from-newark', text: 'Travel from Newark' },
      { href: '/travel-from-montclair', text: 'Travel from Montclair' },
      { href: '/travel-from-livingston', text: 'Travel from Livingston' },
      { href: '/locations/essex-county/newark/cruise-transfers', text: 'Newark Cruise Transfers' },
      { href: '/locations/essex-county/west-orange/airport-transfers', text: 'West Orange Airport Transfers' },
    ],
    blog: [
      { href: '/blog', text: 'Travel Blog' },
      { href: '/blog/thanksgiving-2025-newark', text: 'Thanksgiving Travel' },
      { href: '/blog/europe-entry-rules-2025', text: 'Europe Entry Rules' },
      { href: '/blog/best-time-caribbean', text: 'Best Time for Caribbean' },
      { href: '/blog/cruise-deals-2025', text: '2025 Cruise Deals' },
    ],
  }

  // Get relevant links based on page type
  const relevantLinks = contextLinks[pageType] || []

  // Combine all links and filter out current page
  const allLinks = [
    ...coreHubs,
    ...relevantLinks,
    ...relatedLinks,
  ].filter(link => link.href !== currentPath)

  // Separate by priority
  const highPriorityLinks = allLinks.filter(link => link.priority === 'high')
  const mediumPriorityLinks = allLinks.filter(link => link.priority === 'medium')
  const lowPriorityLinks = allLinks.filter(link => !link.priority || link.priority === 'low')

  return (
    <nav className="internal-links" aria-label="Related pages">
      {/* High Priority Links - Most prominent */}
      {highPriorityLinks.length > 0 && (
        <div className="mb-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Popular Travel Options</h3>
          <div className="flex flex-wrap gap-3">
            {highPriorityLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                {link.text}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Content Section */}
      {(mediumPriorityLinks.length > 0 || lowPriorityLinks.length > 0) && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Related Travel Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...mediumPriorityLinks, ...lowPriorityLinks].slice(0, 9).map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <span className="text-blue-600 hover:text-blue-800 font-medium">
                  {link.text} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Breadcrumb Schema Support */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: pageType.charAt(0).toUpperCase() + pageType.slice(1),
                item: `https://nexttripanywhere.com/${pageType}`,
              },
            ],
          }),
        }}
      />
    </nav>
  )
}