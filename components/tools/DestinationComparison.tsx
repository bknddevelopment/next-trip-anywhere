'use client'

import { useState, useEffect } from 'react'
import {
  compareDestinations,
  getTravelMetrics,
  getWeatherMetrics,
  getBudgetMetrics,
  getPopularDestinations
} from '@/lib/api/destinations'
import {
  DestinationComparison,
  TravelMetrics,
  WeatherMetrics,
  BudgetMetrics
} from '@/lib/types/comparison'
import {
  Plane,
  Sun,
  CloudRain,
  DollarSign,
  Calendar,
  MapPin,
  ThermometerSun,
  Wind,
  AlertTriangle,
  TrendingUp,
  Users
} from 'lucide-react'

interface DestinationOption {
  id: string
  name: string
  region: string
  distanceFromNewark: number
  flightTime: number
  climate: string
}

const DESTINATIONS: DestinationOption[] = [
  {
    id: 'caribbean',
    name: 'Caribbean',
    region: 'Caribbean Islands',
    distanceFromNewark: 1600,
    flightTime: 4,
    climate: 'Tropical'
  },
  {
    id: 'mexico',
    name: 'Cancun, Mexico',
    region: 'Mexico',
    distanceFromNewark: 1550,
    flightTime: 3.5,
    climate: 'Tropical'
  },
  {
    id: 'bahamas',
    name: 'Bahamas',
    region: 'Caribbean',
    distanceFromNewark: 1100,
    flightTime: 2.5,
    climate: 'Tropical'
  },
  {
    id: 'bermuda',
    name: 'Bermuda',
    region: 'Atlantic',
    distanceFromNewark: 775,
    flightTime: 2,
    climate: 'Subtropical'
  },
  {
    id: 'hawaii',
    name: 'Hawaii',
    region: 'Pacific',
    distanceFromNewark: 4950,
    flightTime: 11,
    climate: 'Tropical'
  },
  {
    id: 'europe',
    name: 'Mediterranean',
    region: 'Europe',
    distanceFromNewark: 4280,
    flightTime: 9,
    climate: 'Mediterranean'
  }
]

export default function DestinationComparisonTool() {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [comparison, setComparison] = useState<DestinationComparison | null>(null)
  const [detailedMetrics, setDetailedMetrics] = useState<{
    travel: Record<string, TravelMetrics>
    weather: Record<string, WeatherMetrics>
    budget: Record<string, BudgetMetrics>
  }>({
    travel: {},
    weather: {},
    budget: {}
  })
  const [loading, setLoading] = useState(false)
  const [preferences, setPreferences] = useState({
    budget: 'moderate',
    duration: 7,
    travelMonth: new Date().getMonth() + 1,
    groupSize: 2,
    priorities: [] as string[]
  })
  const [popularDestinations, setPopularDestinations] = useState<any[]>([])

  useEffect(() => {
    loadPopularDestinations()
  }, [])

  useEffect(() => {
    if (comparison) {
      localStorage.setItem('destinationComparison', JSON.stringify(comparison))
    }
  }, [comparison])

  const loadPopularDestinations = async () => {
    const destinations = await getPopularDestinations()
    setPopularDestinations(destinations)
  }

  const handleSelectDestination = (destId: string) => {
    if (selectedDestinations.includes(destId)) {
      setSelectedDestinations(selectedDestinations.filter(id => id !== destId))
    } else if (selectedDestinations.length < 3) {
      setSelectedDestinations([...selectedDestinations, destId])
    }
  }

  const handleCompare = async () => {
    if (selectedDestinations.length < 2) return

    setLoading(true)
    try {
      const result = await compareDestinations(
        selectedDestinations,
        {
          start: new Date().toISOString(),
          end: new Date(Date.now() + preferences.duration * 24 * 60 * 60 * 1000).toISOString()
        },
        preferences
      )
      setComparison(result)

      // Load detailed metrics for each destination
      const travelMetrics: Record<string, TravelMetrics> = {}
      const weatherMetrics: Record<string, WeatherMetrics> = {}
      const budgetMetrics: Record<string, BudgetMetrics> = {}

      for (const destId of selectedDestinations) {
        travelMetrics[destId] = await getTravelMetrics(destId)
        weatherMetrics[destId] = await getWeatherMetrics(destId)
        budgetMetrics[destId] = await getBudgetMetrics(destId)
      }

      setDetailedMetrics({
        travel: travelMetrics,
        weather: weatherMetrics,
        budget: budgetMetrics
      })
    } catch (error) {
      console.error('Comparison failed:', error)
    }
    setLoading(false)
  }

  const clearComparison = () => {
    setComparison(null)
    setSelectedDestinations([])
    setDetailedMetrics({ travel: {}, weather: {}, budget: {} })
  }

  const getBudgetIcon = (level: string) => {
    const icons = level.split('').map((char, idx) => (
      char === '$' ? <DollarSign key={idx} className="w-4 h-4 text-green-600" /> : null
    ))
    return <div className="flex">{icons}</div>
  }

  const getMonthName = (month: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months[month - 1]
  }

  const renderComparisonResults = () => {
    if (!comparison) return null

    return (
      <div className="space-y-6">
        {/* Quick Overview */}
        <div className="grid md:grid-cols-3 gap-4">
          {selectedDestinations.map(destId => {
            const destination = DESTINATIONS.find(d => d.id === destId)
            const travel = detailedMetrics.travel[destId]
            const weather = detailedMetrics.weather[destId]
            const budget = detailedMetrics.budget[destId]

            if (!destination) return null

            return (
              <div key={destId} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">{destination.name}</h3>

                {/* Travel Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Distance</span>
                    <span className="font-medium">{destination.distanceFromNewark} miles</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Flight Time</span>
                    <span className="font-medium">{destination.flightTime} hours</span>
                  </div>
                  {travel && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Avg Flight Cost</span>
                      <span className="font-medium">${travel.averageFlightCost}</span>
                    </div>
                  )}
                </div>

                {/* Weather Info */}
                {weather && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Temperature</span>
                      <span className="font-medium">{weather.averageTemp.high}°F / {weather.averageTemp.low}°F</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Rainy Days</span>
                      <span className="font-medium">{weather.rainyDays} days/month</span>
                    </div>
                    {weather.hurricaneRisk && (
                      <div className="flex items-center text-amber-600 text-sm mt-2">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Hurricane season active
                      </div>
                    )}
                  </div>
                )}

                {/* Budget Info */}
                {budget && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">Daily Budget</div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-xs text-gray-600">Budget</div>
                        <div className="font-semibold">${budget.dailyBudget.budget}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-xs text-gray-600">Mid</div>
                        <div className="font-semibold">${budget.dailyBudget.midRange}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-xs text-gray-600">Luxury</div>
                        <div className="font-semibold">${budget.dailyBudget.luxury}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Best Months */}
                {weather && (
                  <div className="border-t pt-4">
                    <div className="text-sm text-gray-600 mb-2">Best Months to Visit</div>
                    <div className="flex flex-wrap gap-1">
                      {weather.bestMonths.map(month => (
                        <span key={month} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          {getMonthName(month)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Detailed Comparison Chart */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold">Detailed Comparison</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Metric
                  </th>
                  {selectedDestinations.map(destId => {
                    const dest = DESTINATIONS.find(d => d.id === destId)
                    return (
                      <th key={destId} className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                        {dest?.name}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Flight Time */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <Plane className="inline w-4 h-4 mr-2" />
                    Flight Time
                  </td>
                  {selectedDestinations.map(destId => {
                    const dest = DESTINATIONS.find(d => d.id === destId)
                    return (
                      <td key={destId} className="px-6 py-4 text-sm text-center">
                        {dest?.flightTime} hours
                      </td>
                    )
                  })}
                </tr>

                {/* Direct Flights */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Direct Flights
                  </td>
                  {selectedDestinations.map(destId => {
                    const travel = detailedMetrics.travel[destId]
                    return (
                      <td key={destId} className="px-6 py-4 text-sm text-center">
                        {travel?.directFlights ? (
                          <span className="text-green-600">✓ Available</span>
                        ) : (
                          <span className="text-gray-600">Connections</span>
                        )}
                      </td>
                    )
                  })}
                </tr>

                {/* Visa Required */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Visa Required
                  </td>
                  {selectedDestinations.map(destId => {
                    const travel = detailedMetrics.travel[destId]
                    return (
                      <td key={destId} className="px-6 py-4 text-sm text-center">
                        {travel?.visaRequired ? (
                          <span className="text-amber-600">Required</span>
                        ) : (
                          <span className="text-green-600">Not Required</span>
                        )}
                      </td>
                    )
                  })}
                </tr>

                {/* Climate */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <ThermometerSun className="inline w-4 h-4 mr-2" />
                    Climate
                  </td>
                  {selectedDestinations.map(destId => {
                    const dest = DESTINATIONS.find(d => d.id === destId)
                    return (
                      <td key={destId} className="px-6 py-4 text-sm text-center">
                        {dest?.climate}
                      </td>
                    )
                  })}
                </tr>

                {/* Hurricane Risk */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <AlertTriangle className="inline w-4 h-4 mr-2" />
                    Hurricane Risk
                  </td>
                  {selectedDestinations.map(destId => {
                    const weather = detailedMetrics.weather[destId]
                    return (
                      <td key={destId} className="px-6 py-4 text-sm text-center">
                        {weather?.hurricaneRisk ? (
                          <span className="text-amber-600">Yes (Jun-Nov)</span>
                        ) : (
                          <span className="text-green-600">No</span>
                        )}
                      </td>
                    )
                  })}
                </tr>

                {/* Hotel Cost */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <DollarSign className="inline w-4 h-4 mr-2" />
                    Hotel (Mid-Range)
                  </td>
                  {selectedDestinations.map(destId => {
                    const budget = detailedMetrics.budget[destId]
                    return (
                      <td key={destId} className="px-6 py-4 text-sm text-center">
                        ${budget?.hotelCost.midRange}/night
                      </td>
                    )
                  })}
                </tr>

                {/* Meal Cost */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Average Meal Cost
                  </td>
                  {selectedDestinations.map(destId => {
                    const budget = detailedMetrics.budget[destId]
                    return (
                      <td key={destId} className="px-6 py-4 text-sm text-center">
                        ${budget?.mealCost}
                      </td>
                    )
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations */}
        {comparison.recommendations && comparison.recommendations.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Our Recommendation</h3>
            {comparison.recommendations.map((rec, idx) => {
              const dest = DESTINATIONS.find(d => d.id === rec.itemId)
              if (!dest) return null

              return (
                <div key={idx} className="mb-4 last:mb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{dest.name}</h4>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                      <span className="text-green-600 font-semibold">{rec.score}/100</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{rec.reason}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-semibold text-green-700 mb-1">Pros:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {rec.pros.map((pro, pIdx) => (
                          <li key={pIdx}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-red-700 mb-1">Cons:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {rec.cons.map((con, cIdx) => (
                          <li key={cIdx}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-sm font-semibold text-gray-700 mb-1">Best For:</h5>
                    <div className="flex flex-wrap gap-2">
                      {rec.bestFor.map((item, bIdx) => (
                        <span key={bIdx} className="px-2 py-1 bg-white rounded text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Book Your Dream Vacation?</h3>
          <p className="text-lg mb-6">
            Our Essex County travel experts can help you plan the perfect getaway to any of these destinations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:833-874-1019"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Call 833-874-1019
            </a>
            <button
              onClick={() => {
                const data = {
                  destinations: selectedDestinations.map(id => DESTINATIONS.find(d => d.id === id)?.name),
                  comparison: comparison,
                  metrics: detailedMetrics
                }
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'destination-comparison.json'
                a.click()
              }}
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Export Comparison
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Destination Comparison Tool</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Compare up to 3 destinations to find the perfect match for your travel dates, budget, and preferences
        </p>
      </div>

      {/* Preferences */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-4">Your Travel Preferences</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget Level</label>
            <select
              value={preferences.budget}
              onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="budget">Budget</option>
              <option value="moderate">Moderate</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trip Duration</label>
            <select
              value={preferences.duration}
              onChange={(e) => setPreferences({ ...preferences, duration: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="3">3 days</option>
              <option value="5">5 days</option>
              <option value="7">7 days</option>
              <option value="10">10 days</option>
              <option value="14">14 days</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Travel Month</label>
            <select
              value={preferences.travelMonth}
              onChange={(e) => setPreferences({ ...preferences, travelMonth: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {getMonthName(i + 1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
            <input
              type="number"
              min="1"
              max="10"
              value={preferences.groupSize}
              onChange={(e) => setPreferences({ ...preferences, groupSize: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Priorities (select all that apply)</label>
          <div className="flex flex-wrap gap-2">
            {['Beach', 'Culture', 'Adventure', 'Relaxation', 'Family', 'Romance', 'Budget', 'Luxury'].map(priority => (
              <button
                key={priority}
                onClick={() => {
                  const priorities = preferences.priorities.includes(priority)
                    ? preferences.priorities.filter(p => p !== priority)
                    : [...preferences.priorities, priority]
                  setPreferences({ ...preferences, priorities })
                }}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  preferences.priorities.includes(priority)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Destination Selection */}
      {!comparison && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Select Destinations to Compare</h3>
            <span className="text-sm text-gray-600">{selectedDestinations.length}/3 selected</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {DESTINATIONS.map(dest => (
              <div
                key={dest.id}
                onClick={() => handleSelectDestination(dest.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedDestinations.includes(dest.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${selectedDestinations.length >= 3 && !selectedDestinations.includes(dest.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{dest.name}</h4>
                    <p className="text-sm text-gray-600">{dest.region}</p>
                  </div>
                  {selectedDestinations.includes(dest.id) && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">{selectedDestinations.indexOf(dest.id) + 1}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Flight:</span>
                    <span className="font-medium">{dest.flightTime}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span className="font-medium">{dest.distanceFromNewark} mi</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Climate:</span>
                    <span className="font-medium">{dest.climate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleCompare}
              disabled={selectedDestinations.length < 2 || loading}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                selectedDestinations.length >= 2
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              {loading ? 'Comparing...' : `Compare ${selectedDestinations.length} Destinations`}
            </button>
          </div>
        </div>
      )}

      {/* Comparison Results */}
      {comparison && (
        <>
          <div className="flex justify-between items-center mb-6">
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
          Our travel experts from Essex County have visited all these destinations and can provide personalized recommendations based on your specific needs.
        </p>
        <div className="flex items-center space-x-4">
          <a href="tel:833-874-1019" className="text-blue-600 font-semibold hover:underline">
            Call 833-874-1019 for Expert Advice →
          </a>
          <Users className="w-5 h-5 text-blue-600" />
        </div>
      </div>
    </div>
  )
}