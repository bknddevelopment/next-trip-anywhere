'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Custom 404 Page with Smart Suggestions
 * Helps users find what they're looking for when landing on non-existent pages
 */
export default function NotFound() {
  const pathname = usePathname()
  const [suggestions, setSuggestions] = useState<string[]>([])

  // Popular pages for quick navigation
  const popularPages = [
    { href: '/cruises', label: 'Cruise Deals' },
    { href: '/cruises/caribbean-cruises', label: 'Caribbean Cruises' },
    { href: '/cruises/from-newark', label: 'Cruises from Newark' },
    { href: '/packages/all-inclusive-caribbean', label: 'All-Inclusive Packages' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/essex-county', label: 'Essex County Travel' },
    { href: '/blog', label: 'Travel Blog' },
    { href: '/contact', label: 'Contact Us' },
  ]

  // Try to guess what the user was looking for based on the URL
  useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split('/').filter(Boolean)
      const lastSegment = pathSegments[pathSegments.length - 1]

      // Clean up the segment for display
      const cleaned = lastSegment
        ?.replace(/-/g, ' ')
        .replace(/%20/g, ' ')
        .toLowerCase()

      if (cleaned) {
        // Generate smart suggestions based on the attempted URL
        const smartSuggestions = []

        if (cleaned.includes('cruise')) {
          smartSuggestions.push('/cruises', '/cruises/deals', '/cruises/caribbean-cruises')
        }
        if (cleaned.includes('caribbean') || cleaned.includes('bahamas')) {
          smartSuggestions.push('/cruises/caribbean-cruises', '/destinations/caribbean-from-nj')
        }
        if (cleaned.includes('package') || cleaned.includes('all inclusive')) {
          smartSuggestions.push('/packages', '/packages/all-inclusive-caribbean')
        }
        if (cleaned.includes('newark') || cleaned.includes('essex')) {
          smartSuggestions.push('/essex-county', '/cruises/from-newark')
        }
        if (cleaned.includes('flight')) {
          smartSuggestions.push('/flights')
        }

        setSuggestions(smartSuggestions.slice(0, 3))
      }
    }
  }, [pathname])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* Error Code */}
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>

        {/* Error Message */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
          It may have been moved or no longer exists.
        </p>

        {/* Smart Suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-8 p-6 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-3">Were you looking for:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {suggestions.map((suggestion) => (
                <Link
                  key={suggestion}
                  href={suggestion}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  {suggestion.split('/').pop()?.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase())}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mb-8 text-center">
          <p className="text-lg text-gray-700 mb-4">
            Let our travel experts help you find exactly what you're looking for.
          </p>
          <a
            href="https://nextripanywhere.app.n8n.cloud/form/travel-quote-form"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Travel Help
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Popular Pages */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Popular Pages
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {popularPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="block p-3 text-center bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <span className="text-blue-600 hover:text-blue-800 font-medium">
                  {page.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="border-t pt-8">
          <p className="text-gray-600 mb-4">
            Need help? Our travel experts are here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:833-874-1019"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 833-874-1019
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go to Homepage
            </Link>
          </div>
        </div>

        {/* SEO Schema for 404 page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: '404 Error - Page Not Found',
              description: 'The requested page could not be found on Next Trip Anywhere',
              url: `https://nexttripanywhere.com${pathname}`,
              isPartOf: {
                '@type': 'WebSite',
                name: 'Next Trip Anywhere',
                url: 'https://nexttripanywhere.com',
              },
            }),
          }}
        />
      </div>
    </div>
  )
}