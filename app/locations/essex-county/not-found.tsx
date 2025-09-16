/**
 * 404 Page for Essex County Location Routes
 * Shown when an invalid city or service combination is accessed
 */

import Link from 'next/link'
import { ESSEX_CITIES, ESSEX_SERVICES } from '@/lib/seo/essex-county-services'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-6xl font-bold text-blue-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-12">
          The Essex County location or service you're looking for doesn't exist. Let's help you find
          what you need.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold mb-6">Popular Essex County Locations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ESSEX_CITIES.slice(0, 8).map((city) => (
              <Link
                key={city.slug}
                href={`/locations/essex-county/${city.slug}`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold mb-6">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ESSEX_SERVICES.slice(0, 6).map((service) => (
              <Link
                key={service.slug}
                href={`/locations/essex-county/newark/${service.slug}`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/essex-county"
            className="bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Visit Essex County Main Page
          </Link>
          <a
            href="tel:+18338741019"
            className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Call Us: 833-874-1019
          </a>
        </div>
      </div>
    </main>
  )
}
