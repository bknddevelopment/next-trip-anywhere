/**
 * @fileoverview Destinations grid component with filtering and pagination
 * @module components/destinations/DestinationsGrid
 *
 * This component displays a grid of destination cards with search, filtering, and pagination.
 */

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, MapPin, DollarSign, X } from 'lucide-react'
import type { DestinationListItem } from '@/types/destination'

interface DestinationsGridProps {
  destinations: DestinationListItem[]
  total: number
  page: number
  perPage: number
  totalPages: number
  regions: string[]
  tags: string[]
  currentFilters: {
    query?: string
    region?: string
    tags?: string[]
  }
}

export default function DestinationsGrid({
  destinations,
  total,
  page,
  perPage,
  totalPages,
  regions,
  tags,
  currentFilters,
}: DestinationsGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(currentFilters.query || '')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(currentFilters.region || '')
  const [selectedTags, setSelectedTags] = useState<string[]>(currentFilters.tags || [])

  // Update URL with new search params
  const updateSearchParams = (updates: Record<string, any>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        params.delete(key)
      } else if (Array.isArray(value)) {
        params.delete(key)
        value.forEach((v) => params.append(key, v))
      } else {
        params.set(key, String(value))
      }
    })

    // Reset to page 1 when filters change
    if (!Object.prototype.hasOwnProperty.call(updates, 'page')) {
      params.set('page', '1')
    }

    router.push(`/destinations?${params.toString()}`)
  }

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateSearchParams({ q: searchQuery })
  }

  // Handle region filter
  const handleRegionChange = (region: string) => {
    setSelectedRegion(region)
    updateSearchParams({ region })
  }

  // Handle tag selection
  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    setSelectedTags(newTags)
    updateSearchParams({ tags: newTags })
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedRegion('')
    setSelectedTags([])
    router.push('/destinations')
  }

  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedRegion || selectedTags.length > 0

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            Filters
            {hasActiveFilters && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {(selectedRegion ? 1 : 0) + selectedTags.length}
              </span>
            )}
          </button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <X className="w-5 h-5" />
              Clear
            </button>
          )}
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t">
            {/* Region Filter */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Region</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleRegionChange('')}
                  className={`px-4 py-2 rounded-lg border ${
                    !selectedRegion ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  All Regions
                </button>
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => handleRegionChange(region)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedRegion === region
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <h3 className="font-semibold mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {destinations.length} of {total} destinations
        </p>
      </div>

      {/* Destinations Grid */}
      {destinations.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href={`/destinations/${destination.slug}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={destination.heroImage?.url || '/images/default-destination.jpg'}
                  alt={destination.heroImage?.alt || destination.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {destination.featured && (
                  <span className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {destination.region ? `${destination.region}, ` : ''}
                    {destination.country}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {destination.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {destination.shortDescription}
                </p>

                {/* Tags */}
                {destination.tags && destination.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {destination.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t">
                  {destination.startingPrice ? (
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">From</span>
                      <span className="font-semibold text-green-600">
                        ${destination.startingPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-600">Contact for pricing</span>
                  )}
                  <span className="text-blue-600 text-sm font-semibold group-hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No destinations found matching your criteria.</p>
          <button onClick={clearFilters} className="mt-4 text-blue-600 hover:underline">
            Clear filters and try again
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {/* Previous */}
          <button
            onClick={() => updateSearchParams({ page: page - 1 })}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg ${
              page === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border hover:bg-gray-50'
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (page <= 3) {
                pageNum = i + 1
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = page - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => updateSearchParams({ page: pageNum })}
                  className={`px-4 py-2 rounded-lg ${
                    page === pageNum ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>

          {/* Next */}
          <button
            onClick={() => updateSearchParams({ page: page + 1 })}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg ${
              page === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
