'use client'

import { Resort } from '@/lib/data/all-inclusive-resorts'

interface ComparisonToolProps {
  resorts: Resort[]
  onRemove: (resortId: string) => void
  onClear: () => void
}

export default function ComparisonTool({ resorts, onRemove, onClear }: ComparisonToolProps) {
  if (resorts.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">⚖️</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Compare Resorts Side-by-Side</h3>
        <p className="text-gray-600">
          Select up to 3 resorts to compare their features, amenities, and prices.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Resort Comparison</h2>
          <button onClick={onClear} className="text-white/90 hover:text-white text-sm font-medium">
            Clear All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-700 sticky left-0 bg-gray-50 z-10">
                Feature
              </th>
              {resorts.map((resort) => (
                <th key={resort.id} className="p-4 text-left min-w-[250px]">
                  <div className="space-y-1">
                    <div className="font-bold text-gray-900">{resort.name}</div>
                    <div className="text-sm text-gray-600">
                      {resort.location}, {resort.destination}
                    </div>
                    <button
                      onClick={() => onRemove(resort.id)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {/* Price */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white z-10">
                Price Range
              </td>
              {resorts.map((resort) => (
                <td key={resort.id} className="p-4">
                  <div className="font-bold text-lg text-blue-600">
                    ${resort.priceRange.min.toLocaleString()} - $
                    {resort.priceRange.max.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">per person (7 nights)</div>
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white z-10">Ratings</td>
              {resorts.map((resort) => (
                <td key={resort.id} className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">{'★'.repeat(Math.floor(resort.rating))}</span>
                    <span className="font-semibold">{resort.rating}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {resort.reviewScore}/10 ({resort.reviewCount.toLocaleString()} reviews)
                  </div>
                </td>
              ))}
            </tr>

            {/* Category */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white z-10">
                Resort Type
              </td>
              {resorts.map((resort) => (
                <td key={resort.id} className="p-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      resort.category === 'adults-only'
                        ? 'bg-purple-100 text-purple-700'
                        : resort.category === 'luxury'
                          ? 'bg-yellow-100 text-yellow-700'
                          : resort.category === 'family'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {resort.category.replace('-', ' ')}
                  </span>
                </td>
              ))}
            </tr>

            {/* Flight Time */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white z-10">
                Flight from Newark
              </td>
              {resorts.map((resort) => (
                <td key={resort.id} className="p-4">
                  <div className="font-semibold">{resort.flightTime} hours</div>
                  <div className="text-xs text-gray-600">to {resort.nearestAirport}</div>
                </td>
              ))}
            </tr>

            {/* Transfer Time */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white z-10">
                Airport Transfer
              </td>
              {resorts.map((resort) => (
                <td key={resort.id} className="p-4">
                  {resort.transferTime} minutes
                </td>
              ))}
            </tr>

            {/* Restaurants & Bars */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white z-10">Dining</td>
              {resorts.map((resort) => (
                <td key={resort.id} className="p-4">
                  <div>{resort.restaurants} Restaurants</div>
                  <div>{resort.bars} Bars</div>
                </td>
              ))}
            </tr>

            {/* Pools */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white z-10">Pools</td>
              {resorts.map((resort) => (
                <td key={resort.id} className="p-4">
                  {resort.pools} Pools
                </td>
              ))}
            </tr>

            {/* Beach */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white z-10">
                Beachfront
              </td>
              {resorts.map((resort) => (
                <td key={resort.id} className="p-4">
                  {resort.beachfront ? (
                    <span className="text-green-600 font-semibold">✓ Yes</span>
                  ) : (
                    <span className="text-gray-500">No</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Key Amenities */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white z-10">
                Key Amenities
              </td>
              {resorts.map((resort) => (
                <td key={resort.id} className="p-4">
                  <div className="space-y-1">
                    {resort.amenities.slice(0, 5).map((amenity, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="text-green-500 mr-1">✓</span> {amenity}
                      </div>
                    ))}
                    {resort.amenities.length > 5 && (
                      <div className="text-xs text-gray-500">
                        +{resort.amenities.length - 5} more
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>

            {/* Highlights */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white z-10">
                Highlights
              </td>
              {resorts.map((resort) => (
                <td key={resort.id} className="p-4">
                  <ul className="space-y-1">
                    {resort.highlights.slice(0, 3).map((highlight, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {highlight}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Best For */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white z-10">
                Best For
              </td>
              {resorts.map((resort) => (
                <td key={resort.id} className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {resort.bestFor.map((item, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Current Deals */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white z-10">
                Current Deals
              </td>
              {resorts.map((resort) => (
                <td key={resort.id} className="p-4">
                  {resort.currentDeals && resort.currentDeals.length > 0 ? (
                    <div className="space-y-1">
                      {resort.currentDeals.map((deal, index) => (
                        <div key={index} className="text-sm text-green-600">
                          🎉 {deal}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">No current deals</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-gray-50 border-t">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Comparing {resorts.length} of 3 maximum resorts</p>
          <a
            href="tel:833-874-1019"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Call to Discuss Options
          </a>
        </div>
      </div>
    </div>
  )
}
