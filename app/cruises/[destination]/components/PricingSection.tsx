/**
 * Lazy-loaded Pricing Section Component
 * Optimized for performance with CSS containment
 */

import { type CruiseDestination } from '@/lib/data/cruises'

interface PricingSectionProps {
  cruise: CruiseDestination
}

export default function PricingSection({ cruise }: PricingSectionProps) {
  if (!cruise.content.startingPrice) {
    return null
  }

  return (
    <section
      className="py-16 bg-blue-900 text-white"
      style={{
        contain: 'layout style paint', // CSS containment for performance
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Cruise Pricing</h2>
          <div className="bg-white/10 backdrop-blur rounded-lg p-8">
            <p className="text-2xl mb-2">Starting from</p>
            <p className="text-5xl font-bold mb-4">${cruise.content.startingPrice}</p>
            <p className="text-xl mb-6">per person</p>
            {cruise.content.averageDuration && (
              <p className="text-lg mb-6">Average Duration: {cruise.content.averageDuration}</p>
            )}
            {cruise.content.bestTimeToVisit && (
              <p className="text-lg">{cruise.content.bestTimeToVisit}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
