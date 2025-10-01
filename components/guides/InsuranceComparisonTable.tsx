'use client'

import React, { useState } from 'react'
import {
  DynamicChevronDown as ChevronDown,
  DynamicChevronUp as ChevronUp,
  DynamicCheck as Check,
  DynamicX as X,
  DynamicInfo as Info,
} from '@/lib/dynamicIcons'

interface InsuranceProvider {
  name: string
  logo?: string
  rating: number
  medicalCoverage: string
  evacuationCoverage: string
  tripCancellation: string
  cfar: boolean
  preExisting: boolean
  priceRange: string
  pros: string[]
  cons: string[]
  bestFor: string
}

const providers: InsuranceProvider[] = [
  {
    name: 'Allianz Travel',
    rating: 4.5,
    medicalCoverage: '$50,000 - $1M',
    evacuationCoverage: '$250,000 - $1M',
    tripCancellation: '100% of trip cost',
    cfar: true,
    preExisting: true,
    priceRange: '$150-$500',
    pros: [
      'Excellent mobile app',
      '24/7 assistance hotline',
      'Fast claim processing',
      'Wide coverage options',
    ],
    cons: ['Higher premiums', 'Complex policy language', 'Limited adventure sports'],
    bestFor: 'Premium coverage seekers & frequent cruisers',
  },
  {
    name: 'Travel Guard (AIG)',
    rating: 4.3,
    medicalCoverage: '$100,000 - $500,000',
    evacuationCoverage: '$500,000 - $1M',
    tripCancellation: '100% of trip cost',
    cfar: true,
    preExisting: true,
    priceRange: '$125-$450',
    pros: [
      'Strong evacuation coverage',
      'Good pre-existing waivers',
      'Covers many activities',
      'Reliable claim payment',
    ],
    cons: ['Customer service delays', 'Website navigation issues', 'Higher deductibles'],
    bestFor: 'Adventure cruisers & medical evacuation priority',
  },
  {
    name: 'World Nomads',
    rating: 4.1,
    medicalCoverage: '$100,000 - $300,000',
    evacuationCoverage: '$300,000 - $500,000',
    tripCancellation: '100% of trip cost',
    cfar: false,
    preExisting: false,
    priceRange: '$100-$350',
    pros: [
      'Adventure activity coverage',
      'Buy while traveling',
      'Flexible policies',
      'Good for younger travelers',
    ],
    cons: [
      'No CFAR option',
      'No pre-existing coverage',
      'Age restrictions (70+)',
      'Limited cruise focus',
    ],
    bestFor: 'Young adventurers & last-minute buyers',
  },
  {
    name: 'Royal Caribbean Insurance',
    rating: 3.5,
    medicalCoverage: '$25,000',
    evacuationCoverage: '$50,000',
    tripCancellation: '100% cruise fare only',
    cfar: true,
    preExisting: true,
    priceRange: '$99-$299',
    pros: [
      'Convenient booking',
      'Covers supplier default',
      'Integrated with cruise',
      'Simple claims process',
    ],
    cons: [
      'Low medical limits',
      'Minimal evacuation coverage',
      'Cruise fare only',
      'No flight coverage',
    ],
    bestFor: 'Short Caribbean cruises & convenience seekers',
  },
  {
    name: 'Carnival Vacation Protection',
    rating: 3.7,
    medicalCoverage: '$30,000',
    evacuationCoverage: '$100,000',
    tripCancellation: '100% + Cruise Guarantee',
    cfar: true,
    preExisting: true,
    priceRange: '$109-$349',
    pros: [
      'Unique cruise guarantee',
      'Better medical than Royal',
      'Covers shore excursions',
      'Cancel during cruise',
    ],
    cons: [
      'Still low medical limits',
      'Excludes many activities',
      'Mixed claim reviews',
      'Limited to Carnival',
    ],
    bestFor: 'Carnival loyalists & flexible travelers',
  },
  {
    name: 'Norwegian Booksafe (Premium)',
    rating: 4.0,
    medicalCoverage: '$100,000',
    evacuationCoverage: '$1,000,000',
    tripCancellation: '100% of trip cost',
    cfar: true,
    preExisting: true,
    priceRange: '$199-$599',
    pros: [
      'Highest cruise line evacuation',
      'Comprehensive coverage',
      'Peace of Mind policy',
      'Good claim approval rate',
    ],
    cons: [
      'Most expensive cruise option',
      'Complex tier system',
      'Future credit not cash',
      'NCL cruises only',
    ],
    bestFor: 'NCL cruisers wanting cruise line coverage',
  },
  {
    name: 'Travelex Insurance',
    rating: 4.2,
    medicalCoverage: '$50,000 - $500,000',
    evacuationCoverage: '$500,000 - $1M',
    tripCancellation: '100% of trip cost',
    cfar: true,
    preExisting: true,
    priceRange: '$135-$475',
    pros: [
      'Family-friendly options',
      'Good senior coverage',
      'Flight accident coverage',
      'Rental car coverage',
    ],
    cons: ['Slower claim processing', 'Limited sports coverage', 'Complex exclusions'],
    bestFor: 'Families & multi-generational cruisers',
  },
  {
    name: 'John Hancock',
    rating: 4.4,
    medicalCoverage: '$100,000 - $250,000',
    evacuationCoverage: '$500,000 - $1M',
    tripCancellation: '100% - 150% of trip cost',
    cfar: true,
    preExisting: true,
    priceRange: '$145-$525',
    pros: [
      'Return of premium option',
      'Up to 150% coverage',
      'Strong senior plans',
      'Good medical coverage',
    ],
    cons: ['Higher premiums', 'Age-based pricing', 'Limited availability'],
    bestFor: 'Seniors & those wanting premium refunds',
  },
]

export default function InsuranceComparisonTable() {
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'medical'>('rating')
  const [filterCFAR, setFilterCFAR] = useState(false)
  const [filterPreExisting, setFilterPreExisting] = useState(false)
  const [visibleCount, setVisibleCount] = useState(5) // Initially show only 5 providers

  const sortedProviders = [...providers]
    .filter((p) => !filterCFAR || p.cfar)
    .filter((p) => !filterPreExisting || p.preExisting)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'price':
          return (
            parseInt(a.priceRange.split('-')[0].replace('$', '')) -
            parseInt(b.priceRange.split('-')[0].replace('$', ''))
          )
        case 'medical': {
          const aMed = a.medicalCoverage.includes('1M')
            ? 1000000
            : parseInt(a.medicalCoverage.match(/\$(\d+),000/)?.[1] || '0') * 1000
          const bMed = b.medicalCoverage.includes('1M')
            ? 1000000
            : parseInt(b.medicalCoverage.match(/\$(\d+),000/)?.[1] || '0') * 1000
          return bMed - aMed
        }
        default:
          return 0
      }
    })

  const toggleExpanded = (name: string) => {
    setExpandedProvider(expandedProvider === name ? null : name)
  }

  return (
    <div className="w-full">
      {/* Filters and Sorting */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Compare Insurance Providers</h3>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'price' | 'medical')}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="rating">Best Rating</option>
              <option value="price">Lowest Price</option>
              <option value="medical">Medical Coverage</option>
            </select>
          </div>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filterCFAR}
              onChange={(e) => setFilterCFAR(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">CFAR Coverage Only</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filterPreExisting}
              onChange={(e) => setFilterPreExisting(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Pre-Existing Coverage Only</span>
          </label>
        </div>

        <p className="text-sm text-gray-600">
          <Info className="inline w-4 h-4 mr-1" />
          Prices shown are typical ranges for 7-day Caribbean cruises. Actual costs vary by age,
          destination, and coverage limits.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <th className="px-4 py-3 text-left text-sm font-semibold">Provider</th>
              <th className="px-4 py-3 text-center text-sm font-semibold hidden sm:table-cell">
                Rating
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Medical</th>
              <th className="px-4 py-3 text-center text-sm font-semibold hidden md:table-cell">
                Evacuation
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold hidden lg:table-cell">
                CFAR
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Price Range</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {sortedProviders.slice(0, visibleCount).map((provider, index) => (
              <React.Fragment key={provider.name}>
                <tr
                  className={`border-b hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-semibold text-gray-900">{provider.name}</div>
                      <div className="text-xs text-gray-600 sm:hidden">
                        Rating: {provider.rating}/5
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <div className="flex items-center justify-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="font-medium">{provider.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {provider.medicalCoverage}
                    </div>
                    <div className="text-xs text-gray-600 md:hidden">
                      Evac: {provider.evacuationCoverage}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    <div className="text-sm font-medium text-gray-900">
                      {provider.evacuationCoverage}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center hidden lg:table-cell">
                    {provider.cfar ? (
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="text-sm font-bold text-blue-600">{provider.priceRange}</div>
                    <div className="text-xs text-gray-600 lg:hidden">
                      CFAR: {provider.cfar ? 'Yes' : 'No'}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleExpanded(provider.name)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      aria-label={`${expandedProvider === provider.name ? 'Hide' : 'Show'} details for ${provider.name}`}
                    >
                      {expandedProvider === provider.name ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>

                {/* Expanded Details Row */}
                {expandedProvider === provider.name && (
                  <tr>
                    <td colSpan={7} className="px-4 py-4 bg-gradient-to-r from-blue-50 to-teal-50">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-semibold text-green-700 mb-2">Pros</h4>
                          <ul className="text-sm space-y-1">
                            {provider.pros.map((pro, i) => (
                              <li key={i} className="flex items-start">
                                <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-700 mb-2">Cons</h4>
                          <ul className="text-sm space-y-1">
                            {provider.cons.map((con, i) => (
                              <li key={i} className="flex items-start">
                                <X className="w-4 h-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-2">Best For</h4>
                          <p className="text-sm text-gray-700">{provider.bestFor}</p>

                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Trip Cancellation:</span>
                              <span className="font-medium text-gray-900">
                                {provider.tripCancellation}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Pre-Existing Waiver:</span>
                              <span className="font-medium">
                                {provider.preExisting ? (
                                  <span className="text-green-600">Available</span>
                                ) : (
                                  <span className="text-red-500">Not Available</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show More Button */}
      {sortedProviders.length > visibleCount && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setVisibleCount(sortedProviders.length)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Show All {sortedProviders.length} Providers
          </button>
        </div>
      )}

      {/* Key Insights */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Key Insights for Essex County Cruisers</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>
            • Third-party insurers (Allianz, Travel Guard, John Hancock) offer superior medical
            coverage
          </li>
          <li>
            • Cruise line insurance works for short Caribbean trips but lacks adequate evacuation
            coverage
          </li>
          <li>• CFAR coverage adds 40-50% to premiums but provides maximum flexibility</li>
          <li>
            • Purchase within 14-21 days of initial deposit for pre-existing condition waivers
          </li>
          <li>• Cape Liberty departures don't require missed connection coverage, saving money</li>
        </ul>
      </div>
    </div>
  )
}
