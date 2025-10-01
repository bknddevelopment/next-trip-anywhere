/**
 * Pricing Section for Package Pages
 * Lazy-loaded component with CSS containment for better performance
 */

import { type VacationPackage } from '@/lib/data/vacation-packages'

interface PricingSectionProps {
  pkg: VacationPackage
}

export default function PricingSection({ pkg }: PricingSectionProps) {
  if (!pkg.content.startingPrice) {
    return null
  }

  return (
    <section className="py-16 bg-blue-900 text-white" style={{ contain: 'layout style paint' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Package Pricing</h2>
          <div className="bg-white/10 backdrop-blur rounded-lg p-8">
            <p className="text-2xl mb-2">Starting from</p>
            <p className="text-5xl font-bold mb-4">${pkg.content.startingPrice}</p>
            <p className="text-xl mb-6">per person</p>
            {pkg.content.savingsAmount && (
              <p className="text-2xl text-yellow-300 font-semibold mb-4">
                Save up to ${pkg.content.savingsAmount}!
              </p>
            )}
            {pkg.content.averageDuration && (
              <p className="text-lg mb-4">Average Duration: {pkg.content.averageDuration}</p>
            )}
            {pkg.content.bestTimeToVisit && (
              <p className="text-lg">{pkg.content.bestTimeToVisit}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
