import Link from 'next/link'

interface RelatedLink {
  href: string
  text: string
  priority?: 'high' | 'medium' | 'low'
}

interface CruiseInternalLinksProps {
  currentPage?: string
  showRelatedDestinations?: boolean
  showCruiseLines?: boolean
  showDeals?: boolean
}

export default function CruiseInternalLinks({
  currentPage = '',
  showRelatedDestinations = true,
  showCruiseLines = true,
  showDeals = true,
}: CruiseInternalLinksProps) {
  // High-priority cruise destination pages
  const destinationLinks: RelatedLink[] = [
    { href: '/cruises/caribbean', text: 'Caribbean Cruises', priority: 'high' },
    { href: '/cruises/alaska', text: 'Alaska Cruises', priority: 'high' },
    { href: '/cruises/mediterranean', text: 'Mediterranean Cruises', priority: 'high' },
    { href: '/cruises/bahamas', text: 'Bahamas Cruises', priority: 'medium' },
    { href: '/cruises/european', text: 'European Cruises', priority: 'medium' },
    { href: '/cruises/hawaii', text: 'Hawaii Cruises', priority: 'low' },
  ]

  // Major cruise lines
  const cruiseLineLinks: RelatedLink[] = [
    { href: '/cruises/royal-caribbean', text: 'Royal Caribbean', priority: 'high' },
    { href: '/cruises/carnival', text: 'Carnival Cruises', priority: 'high' },
    { href: '/cruises/norwegian', text: 'Norwegian Cruise Line', priority: 'high' },
    { href: '/cruises/princess', text: 'Princess Cruises', priority: 'medium' },
    { href: '/cruises/celebrity', text: 'Celebrity Cruises', priority: 'medium' },
  ]

  // Deal pages
  const dealLinks: RelatedLink[] = [
    { href: '/cruises/deals', text: 'Best Cruise Deals', priority: 'high' },
    { href: '/cruises/last-minute', text: 'Last Minute Cruises', priority: 'high' },
    { href: '/cruises/cheap-cruises', text: 'Cheap Cruises', priority: 'medium' },
    { href: '/cruises/2025', text: '2025 Cruises', priority: 'medium' },
  ]

  // Filter out current page and select links based on priority
  const filterLinks = (links: RelatedLink[], limit: number = 3) => {
    return links
      .filter((link) => !currentPage.includes(link.href))
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority || 'low'] - priorityOrder[b.priority || 'low']
      })
      .slice(0, limit)
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-navy">
            Explore More Cruise Options
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Popular Destinations */}
            {showRelatedDestinations && (
              <div>
                <h3 className="font-semibold text-lg mb-4 text-blue-900">
                  Popular Cruise Destinations
                </h3>
                <ul className="space-y-2">
                  {filterLinks(destinationLinks, 4).map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                      >
                        <span>→</span>
                        <span>{link.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cruise Lines */}
            {showCruiseLines && (
              <div>
                <h3 className="font-semibold text-lg mb-4 text-blue-900">Top Cruise Lines</h3>
                <ul className="space-y-2">
                  {filterLinks(cruiseLineLinks, 4).map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                      >
                        <span>→</span>
                        <span>{link.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Special Offers */}
            {showDeals && (
              <div>
                <h3 className="font-semibold text-lg mb-4 text-blue-900">Special Offers</h3>
                <ul className="space-y-2">
                  {filterLinks(dealLinks, 4).map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                      >
                        <span>→</span>
                        <span>{link.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? Our cruise experts are here to help!
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/cruises"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                View All Cruises
              </Link>
              <a
                href="tel:+18338741019"
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
              >
                Call 833-874-1019
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
