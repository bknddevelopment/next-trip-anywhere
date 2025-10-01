/**
 * Related Packages Component
 * Lazy-loaded for better code splitting
 */

import Link from 'next/link'
import { vacationPackages } from '@/lib/data/vacation-packages'

interface RelatedPackagesProps {
  currentSlug: string
}

export default function RelatedPackages({ currentSlug }: RelatedPackagesProps) {
  const relatedPackages = vacationPackages.filter((pkg) => pkg.slug !== currentSlug).slice(0, 3)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Explore More Vacation Options</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {relatedPackages.map((pkg) => (
            <Link
              key={pkg.slug}
              href={`/packages/${pkg.slug}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
              prefetch={false}
            >
              <div className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-2">
                {pkg.packageType.replace('-', ' ')}
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{pkg.title}</h3>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {pkg.content.description.substring(0, 150)}...
              </p>
              <div className="flex items-center justify-between">
                {pkg.content.startingPrice && (
                  <span className="text-green-600 font-semibold">
                    From ${pkg.content.startingPrice}
                  </span>
                )}
                <span className="text-blue-600 hover:text-blue-800 font-medium">Learn More →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
