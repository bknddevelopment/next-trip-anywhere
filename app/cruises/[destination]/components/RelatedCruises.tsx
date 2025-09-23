/**
 * Lazy-loaded Related Cruises Component
 * Optimized with intersection observer for performance
 */

import Link from 'next/link'
import { cruiseDestinations } from '@/lib/data/cruises'

interface RelatedCruisesProps {
  currentSlug: string
}

export default function RelatedCruises({ currentSlug }: RelatedCruisesProps) {
  const relatedCruises = cruiseDestinations
    .filter((cruise) => cruise.slug !== currentSlug)
    .slice(0, 3)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Explore More Cruise Options</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {relatedCruises.map((cruise) => (
            <Link
              key={cruise.slug}
              href={`/cruises/${cruise.slug}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 transform hover:scale-105 transition-transform duration-200"
              prefetch={false} // Don't prefetch to save bandwidth
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{cruise.title}</h3>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {cruise.content.description.substring(0, 150)}...
              </p>
              <div className="flex items-center justify-between">
                {cruise.content.startingPrice && (
                  <span className="text-green-600 font-semibold">
                    From ${cruise.content.startingPrice}
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
