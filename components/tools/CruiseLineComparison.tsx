'use client'

import { useState, useEffect } from 'react'
import { getAllCruiseLines, compareCruiseLines, getPopularComparisons } from '@/lib/api/cruiseLines'
import { CruiseLine } from '@/lib/data/cruise-lines'
import { CruiseLineComparison, ComparisonScore } from '@/lib/types/comparison'
import { Star, Ship, DollarSign, Utensils, Theater, MapPin, Check, X, Plus, Minus } from 'lucide-react'

export default function CruiseLineComparisonTool() {
  const [cruiseLines, setCruiseLines] = useState<CruiseLine[]>([])
  const [selectedLines, setSelectedLines] = useState<string[]>([])
  const [comparison, setComparison] = useState<CruiseLineComparison | null>(null)
  const [loading, setLoading] = useState(false)
  const [popularComparisons, setPopularComparisons] = useState<any[]>([])
  const [filters, setFilters] = useState({
    budget: 'all',
    travelStyle: 'all'
  })

  useEffect(() => {
    loadCruiseLines()
    loadPopularComparisons()
  }, [])

  useEffect(() => {
    // Auto-save to localStorage
    if (comparison) {
      localStorage.setItem('cruiseComparison', JSON.stringify(comparison))
    }
  }, [comparison])

  const loadCruiseLines = async () => {
    const lines = await getAllCruiseLines()
    setCruiseLines(lines)
  }

  const loadPopularComparisons = async () => {
    const popular = await getPopularComparisons()
    setPopularComparisons(popular)
  }

  const handleSelectLine = (lineId: string) => {
    if (selectedLines.includes(lineId)) {
      setSelectedLines(selectedLines.filter(id => id !== lineId))
    } else if (selectedLines.length < 4) {
      setSelectedLines([...selectedLines, lineId])
    }
  }

  const handleCompare = async () => {
    if (selectedLines.length < 2) return

    setLoading(true)
    try {
      const result = await compareCruiseLines(selectedLines, filters)
      setComparison(result)
    } catch (error) {
      console.error('Comparison failed:', error)
    }
    setLoading(false)
  }

  const handleQuickCompare = async (lineIds: string[]) => {
    setSelectedLines(lineIds)
    setLoading(true)
    try {
      const result = await compareCruiseLines(lineIds, filters)
      setComparison(result)
    } catch (error) {
      console.error('Comparison failed:', error)
    }
    setLoading(false)
  }

  const clearComparison = () => {
    setComparison(null)
    setSelectedLines([])
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const renderComparisonResults = () => {
    if (!comparison) return null

    return (
      <div className="mt-8 space-y-6">
        {/* Overall Rankings */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Overall Rankings</h3>
          <div className="space-y-4">
            {comparison.score?.map((score, index) => {
              const line = comparison.cruiseLines.find(l => l.id === score.itemId)
              if (!line) return null

              return (
                <div key={score.itemId} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-gray-400">#{score.rank}</div>
                    <div>
                      <h4 className="font-semibold">{line.displayName}</h4>
                      <p className="text-sm text-gray-700">{line.shortDescription}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(score.totalScore)}`}>
                      {score.totalScore}/100
                    </div>
                    <p className="text-sm text-gray-600">Overall Score</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detailed Comparison */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Detailed Comparison</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Feature
                  </th>
                  {comparison.cruiseLines.map(line => (
                    <th key={line.id} className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                      {line.displayName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Fleet Size */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Ship className="inline-block w-4 h-4 mr-2" />
                    Fleet Size
                  </td>
                  {comparison.cruiseLines.map(line => (
                    <td key={line.id} className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {line.fleetSize} ships
                    </td>
                  ))}
                </tr>

                {/* Price Range */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <DollarSign className="inline-block w-4 h-4 mr-2" />
                    Price Range
                  </td>
                  {comparison.cruiseLines.map(line => (
                    <td key={line.id} className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      ${line.priceRange.min} - ${line.priceRange.max}
                      <div className="text-xs text-gray-600">Avg: ${line.priceRange.average}</div>
                    </td>
                  ))}
                </tr>

                {/* Destinations */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <MapPin className="inline-block w-4 h-4 mr-2" />
                    Destinations
                  </td>
                  {comparison.cruiseLines.map(line => (
                    <td key={line.id} className="px-6 py-4 text-sm text-center">
                      {line.destinations.length} regions
                      <div className="text-xs text-gray-600 mt-1">
                        {line.destinations.slice(0, 3).join(', ')}...
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Star className="inline-block w-4 h-4 mr-2" />
                    Guest Rating
                  </td>
                  {comparison.cruiseLines.map(line => (
                    <td key={line.id} className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <div className="flex justify-center items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        {line.rating.value}
                      </div>
                      <div className="text-xs text-gray-600">({line.rating.count} reviews)</div>
                    </td>
                  ))}
                </tr>

                {/* Ideal For */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Best For
                  </td>
                  {comparison.cruiseLines.map(line => (
                    <td key={line.id} className="px-6 py-4 text-sm">
                      <div className="space-y-1">
                        {line.idealFor.slice(0, 3).map((ideal, idx) => (
                          <div key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {ideal}
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Key Features */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Key Features
                  </td>
                  {comparison.cruiseLines.map(line => (
                    <td key={line.id} className="px-6 py-4 text-sm">
                      <ul className="space-y-1">
                        {line.highlights.slice(0, 3).map((highlight, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="w-3 h-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                            <span className="text-xs">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Book Your Cruise?</h3>
          <p className="text-lg mb-6">
            Our Essex County travel experts can help you choose the perfect cruise line and get the best deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:833-874-1019"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Call 833-874-1019
            </a>
            <button
              onClick={() => window.print()}
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Save Comparison
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Cruise Line Comparison Tool</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Compare up to 4 cruise lines side-by-side to find the perfect match for your vacation style and budget
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-4">Filter by Preferences</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
            <select
              value={filters.budget}
              onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Budgets</option>
              <option value="budget">Budget Friendly</option>
              <option value="moderate">Moderate</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Travel Style</label>
            <select
              value={filters.travelStyle}
              onChange={(e) => setFilters({ ...filters, travelStyle: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Styles</option>
              <option value="family">Family</option>
              <option value="romantic">Romantic</option>
              <option value="adventure">Adventure</option>
              <option value="relaxation">Relaxation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Compare Options */}
      {popularComparisons.length > 0 && !comparison && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="font-semibold mb-4">Popular Comparisons</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {popularComparisons.map((comp, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickCompare(comp.cruiseLines)}
                className="text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-semibold">{comp.title}</div>
                <div className="text-sm text-gray-600">{comp.count} people compared these</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cruise Line Selection */}
      {!comparison && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Select Cruise Lines to Compare</h3>
            <span className="text-sm text-gray-600">{selectedLines.length}/4 selected</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {cruiseLines.map(line => (
              <div
                key={line.id}
                onClick={() => handleSelectLine(line.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedLines.includes(line.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${selectedLines.length >= 4 && !selectedLines.includes(line.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{line.displayName}</h4>
                  {selectedLines.includes(line.id) && (
                    <Check className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{line.shortDescription}</p>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{line.fleetSize} ships</span>
                  <span>${line.priceRange.average} avg</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleCompare}
              disabled={selectedLines.length < 2 || loading}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                selectedLines.length >= 2
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? 'Comparing...' : `Compare ${selectedLines.length} Cruise Lines`}
            </button>
          </div>
        </div>
      )}

      {/* Comparison Results */}
      {comparison && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Comparison Results</h3>
            <button
              onClick={clearComparison}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Start New Comparison
            </button>
          </div>
          {renderComparisonResults()}
        </>
      )}

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold mb-2">Need Help Choosing?</h3>
        <p className="text-gray-700 mb-4">
          Our travel experts from Essex County have sailed with all major cruise lines and can provide personalized recommendations based on your preferences.
        </p>
        <a href="tel:833-874-1019" className="text-blue-600 font-semibold hover:underline">
          Call 833-874-1019 for Expert Advice →
        </a>
      </div>
    </div>
  )
}