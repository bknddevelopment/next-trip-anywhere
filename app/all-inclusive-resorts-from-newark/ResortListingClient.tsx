'use client'

import { useState, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Resort } from '@/lib/data/all-inclusive-resorts'
import {
  ResortFilters,
  DEFAULT_FILTERS,
  filterResorts,
  sortResorts,
  getFilterStats,
} from '@/lib/utils/resortFilters'
import ResortFilter from '@/components/resorts/ResortFilter'
import ResortCard from '@/components/resorts/ResortCard'

// Lazy load comparison tool
const ComparisonTool = dynamic(() => import('@/components/resorts/ComparisonTool'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />,
})

interface ResortListingClientProps {
  resorts: Resort[]
}

export default function ResortListingClient({ resorts }: ResortListingClientProps) {
  const [filters, setFilters] = useState<ResortFilters>(DEFAULT_FILTERS)
  const [compareList, setCompareList] = useState<Resort[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)

  // Filter and sort resorts
  const processedResorts = useMemo(() => {
    const filtered = filterResorts(resorts, filters)
    return sortResorts(filtered, filters.sortBy)
  }, [resorts, filters])

  // Get filter statistics
  const stats = useMemo(() => {
    return getFilterStats(resorts, processedResorts)
  }, [resorts, processedResorts])

  // Handle comparison
  const handleCompare = useCallback((resort: Resort) => {
    setCompareList((prev) => {
      const exists = prev.find((r) => r.id === resort.id)
      if (exists) {
        return prev.filter((r) => r.id !== resort.id)
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 resorts at a time')
        return prev
      }
      return [...prev, resort]
    })
  }, [])

  const handleRemoveFromComparison = useCallback((resortId: string) => {
    setCompareList((prev) => prev.filter((r) => r.id !== resortId))
  }, [])

  const handleClearComparison = useCallback(() => {
    setCompareList([])
    setShowComparison(false)
  }, [])

  // Load more resorts
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12)
  }

  // Visible resorts
  const visibleResorts = processedResorts.slice(0, visibleCount)

  return (
    <div>
      {/* Comparison Tool */}
      {compareList.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              Comparing {compareList.length} Resort{compareList.length > 1 ? 's' : ''}
            </h3>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {showComparison ? 'Hide' : 'Show'} Comparison
            </button>
          </div>
          {showComparison && (
            <ComparisonTool
              resorts={compareList}
              onRemove={handleRemoveFromComparison}
              onClear={handleClearComparison}
            />
          )}
        </div>
      )}

      {/* Filter and Results */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <ResortFilter resorts={resorts} filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {stats.totalResults} Resort{stats.totalResults !== 1 ? 's' : ''} Found
                </h3>
                {stats.totalResults > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    Prices from ${stats.priceRange.min.toLocaleString()} to $
                    {stats.priceRange.max.toLocaleString()} per person
                  </p>
                )}
              </div>
              {compareList.length > 0 && !showComparison && (
                <button
                  onClick={() => setShowComparison(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Compare ({compareList.length})
                </button>
              )}
            </div>
          </div>

          {/* Resort Grid */}
          {processedResorts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleResorts.map((resort) => (
                  <ResortCard
                    key={resort.id}
                    resort={resort}
                    onCompare={handleCompare}
                    isComparing={compareList.some((r) => r.id === resort.id)}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < processedResorts.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Load More Resorts ({processedResorts.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-gray-50 rounded-xl p-12 text-center">
              <div className="text-4xl mb-4">🏝️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Resorts Match Your Filters
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or clearing them to see all available resorts.
              </p>
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Quick Stats */}
          {processedResorts.length > 0 && (
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.totalResults}</div>
                <div className="text-sm text-gray-600">Total Resorts</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.avgRating.toFixed(1)}★
                </div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.avgFlightTime.toFixed(1)}h
                </div>
                <div className="text-sm text-gray-600">Avg Flight</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.destinations.size}</div>
                <div className="text-sm text-gray-600">Destinations</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
