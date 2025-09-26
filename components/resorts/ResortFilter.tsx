'use client'

import { useState, useEffect } from 'react'
import { Resort } from '@/lib/data/all-inclusive-resorts'
import {
  ResortFilters,
  AMENITY_OPTIONS,
  CATEGORY_LABELS,
  SORT_LABELS,
  DEFAULT_FILTERS,
  type SortOption,
} from '@/lib/utils/resortFilters'

interface ResortFilterProps {
  resorts: Resort[]
  filters: ResortFilters
  onFiltersChange: (filters: ResortFilters) => void
}

export default function ResortFilter({ resorts, filters, onFiltersChange }: ResortFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [priceRange, setPriceRange] = useState([filters.priceMin, filters.priceMax])

  // Get unique destinations from resorts
  const destinations = Array.from(new Set(resorts.map((r) => r.destination))).sort()

  // Get category counts
  const categoryCounts = new Map<Resort['category'], number>()
  resorts.forEach((resort) => {
    const count = categoryCounts.get(resort.category) || 0
    categoryCounts.set(resort.category, count + 1)
  })

  // Update price range when filters change
  useEffect(() => {
    setPriceRange([filters.priceMin, filters.priceMax])
  }, [filters.priceMin, filters.priceMax])

  const handleDestinationToggle = (destination: string) => {
    const newDestinations = filters.destinations.includes(destination)
      ? filters.destinations.filter((d) => d !== destination)
      : [...filters.destinations, destination]

    onFiltersChange({ ...filters, destinations: newDestinations })
  }

  const handleCategoryToggle = (category: Resort['category']) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]

    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity]

    onFiltersChange({ ...filters, amenities: newAmenities })
  }

  const handlePriceChange = () => {
    onFiltersChange({
      ...filters,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
    })
  }

  const handleRatingChange = (rating: number | null) => {
    onFiltersChange({ ...filters, rating })
  }

  const handleSortChange = (sortBy: SortOption) => {
    onFiltersChange({ ...filters, sortBy })
  }

  const handleReset = () => {
    onFiltersChange(DEFAULT_FILTERS)
    setPriceRange([DEFAULT_FILTERS.priceMin, DEFAULT_FILTERS.priceMax])
  }

  const activeFilterCount =
    filters.destinations.length +
    filters.categories.length +
    filters.amenities.length +
    (filters.rating !== null ? 1 : 0) +
    (filters.priceMin !== DEFAULT_FILTERS.priceMin || filters.priceMax !== DEFAULT_FILTERS.priceMax
      ? 1
      : 0) +
    (filters.beachfront !== null ? 1 : 0)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filter Resorts</h2>
        <div className="flex items-center gap-4">
          {activeFilterCount > 0 && (
            <button
              onClick={handleReset}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all ({activeFilterCount})
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden text-blue-600 hover:text-blue-700"
          >
            {isExpanded ? 'Hide' : 'Show'} Filters
          </button>
        </div>
      </div>

      <div className={`space-y-6 ${!isExpanded ? 'hidden lg:block' : ''}`}>
        {/* Sort Options */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Price Range (per person, 7 nights)
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                onMouseUp={handlePriceChange}
                onTouchEnd={handlePriceChange}
                className="flex-1"
              />
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                onMouseUp={handlePriceChange}
                onTouchEnd={handlePriceChange}
                className="flex-1"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Destinations */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Destinations</label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {destinations.map((destination) => {
              const count = resorts.filter((r) => r.destination === destination).length
              return (
                <label
                  key={destination}
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={filters.destinations.includes(destination)}
                    onChange={() => handleDestinationToggle(destination)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 flex-1">{destination}</span>
                  <span className="text-xs text-gray-500">({count})</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Resort Type</label>
          <div className="space-y-2">
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => {
              const count = categoryCounts.get(value as Resort['category']) || 0
              if (count === 0) {
                return null
              }
              return (
                <label
                  key={value}
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(value as Resort['category'])}
                    onChange={() => handleCategoryToggle(value as Resort['category'])}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 flex-1">{label}</span>
                  <span className="text-xs text-gray-500">({count})</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Star Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Minimum Star Rating
          </label>
          <div className="flex gap-2">
            {[null, 3, 4, 4.5, 5].map((rating) => (
              <button
                key={rating || 'all'}
                onClick={() => handleRatingChange(rating)}
                className={`px-3 py-1 text-sm rounded-lg border ${
                  filters.rating === rating
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {rating ? `${rating}★+` : 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Amenities</label>
          <div className="grid grid-cols-2 gap-2">
            {AMENITY_OPTIONS.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded text-sm"
              >
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700 text-xs">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Flight Time */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Max Flight Time from Newark
          </label>
          <div className="flex gap-2">
            {[null, 3, 4, 5, 6].map((hours) => (
              <button
                key={hours || 'any'}
                onClick={() => onFiltersChange({ ...filters, flightTime: hours })}
                className={`px-3 py-1 text-sm rounded-lg border ${
                  filters.flightTime === hours
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {hours ? `${hours}h` : 'Any'}
              </button>
            ))}
          </div>
        </div>

        {/* Beachfront */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
          <div className="flex gap-2">
            {[null, true, false].map((value) => (
              <button
                key={String(value)}
                onClick={() => onFiltersChange({ ...filters, beachfront: value })}
                className={`px-3 py-1 text-sm rounded-lg border ${
                  filters.beachfront === value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {value === null ? 'All' : value ? 'Beachfront' : 'Not Beachfront'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
