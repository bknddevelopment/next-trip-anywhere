'use client'

import { useState } from 'react'
import { BarChart3, Plus, X, Star, Check, AlertCircle, TrendingUp, Users, Calendar, Ship, Anchor } from 'lucide-react'

interface CruiseOption {
  id: string
  cruiseLine: string
  shipName: string
  destination: string
  duration: number
  departureDate: string
  departurePort: string
  price: number
  cabinType: string
  rating: number
  reviews: number
  features: string[]
  pros: string[]
  cons: string[]
  capacity: number
  yearBuilt: number
  tonnage: number
  essexRecommended?: boolean
}

const sampleCruises: CruiseOption[] = [
  {
    id: '1',
    cruiseLine: 'Royal Caribbean',
    shipName: 'Symphony of the Seas',
    destination: '7-Night Eastern Caribbean',
    duration: 7,
    departureDate: '2025-03-15',
    departurePort: 'Cape Liberty, Bayonne NJ',
    price: 1299,
    cabinType: 'Balcony',
    rating: 4.6,
    reviews: 3847,
    features: ['Water Slides', 'Broadway Shows', 'Ice Skating', '20+ Dining Options', 'Robot Bar', 'Central Park'],
    pros: ['Departs from Bayonne - 30 min from Newark', 'Family-friendly activities', 'Newest ship class', 'Perfect Day at CocoCay'],
    cons: ['Can be crowded', 'Extra charges for specialty dining', 'Limited adult-only spaces'],
    capacity: 6680,
    yearBuilt: 2018,
    tonnage: 228081,
    essexRecommended: true
  },
  {
    id: '2',
    cruiseLine: 'Carnival',
    shipName: 'Carnival Magic',
    destination: '8-Night Caribbean',
    duration: 8,
    departureDate: '2025-03-14',
    departurePort: 'Manhattan, NYC',
    price: 899,
    cabinType: 'Balcony',
    rating: 4.3,
    reviews: 2654,
    features: ['WaterWorks', 'Comedy Club', 'Mini Golf', 'Serenity Adult Retreat', 'Guy\'s Burgers', 'RedFrog Pub'],
    pros: ['Budget-friendly pricing', 'Fun atmosphere', 'Departs from Manhattan', 'Great nightlife'],
    cons: ['Older ship', 'Party crowd', 'Basic cabin amenities'],
    capacity: 3690,
    yearBuilt: 2011,
    tonnage: 130000,
    essexRecommended: false
  },
  {
    id: '3',
    cruiseLine: 'Norwegian',
    shipName: 'Norwegian Breakaway',
    destination: '7-Night Bermuda',
    duration: 7,
    departureDate: '2025-05-10',
    departurePort: 'Manhattan, NYC',
    price: 1199,
    cabinType: 'Balcony',
    rating: 4.5,
    reviews: 3102,
    features: ['Freestyle Cruising', 'The Waterfront', 'Broadway Shows', 'Ropes Course', 'Ocean Blue', 'The Haven'],
    pros: ['3 days in Bermuda', 'No fixed dining times', 'Departs from Manhattan', 'Great for couples'],
    cons: ['Charges for many restaurants', 'Can feel nickel-and-dimed', 'Crowded pool areas'],
    capacity: 3963,
    yearBuilt: 2013,
    tonnage: 145655,
    essexRecommended: true
  },
  {
    id: '4',
    cruiseLine: 'Celebrity',
    shipName: 'Celebrity Summit',
    destination: '7-Night Bermuda',
    duration: 7,
    departureDate: '2025-05-17',
    departurePort: 'Cape Liberty, Bayonne NJ',
    price: 1599,
    cabinType: 'Balcony',
    rating: 4.7,
    reviews: 1876,
    features: ['Lawn Club', 'Canyon Ranch Spa', 'Specialty Restaurants', 'Solarium', 'Wine Bar', 'Modern Art'],
    pros: ['Premium experience', 'Excellent food', 'Less crowded', 'Adults-oriented', 'Departs from Bayonne'],
    cons: ['Higher price point', 'Less family entertainment', 'Older demographic'],
    capacity: 2158,
    yearBuilt: 2001,
    tonnage: 91000,
    essexRecommended: true
  },
  {
    id: '5',
    cruiseLine: 'Princess',
    shipName: 'Caribbean Princess',
    destination: '10-Night Southern Caribbean',
    duration: 10,
    departureDate: '2025-04-05',
    departurePort: 'Brooklyn, NYC',
    price: 1799,
    cabinType: 'Balcony',
    rating: 4.4,
    reviews: 2234,
    features: ['Movies Under Stars', 'Sanctuary Adult Retreat', 'Crown Grill', 'Lotus Spa', 'Piazza', 'Casino'],
    pros: ['Traditional cruising', 'Excellent service', 'Good itinerary', 'Departs from Brooklyn'],
    cons: ['Older crowd', 'Slower pace', 'Limited nightlife'],
    capacity: 3142,
    yearBuilt: 2004,
    tonnage: 112894,
    essexRecommended: false
  }
]

export default function CruiseComparison() {
  const [selectedCruises, setSelectedCruises] = useState<string[]>([])
  const [cruiseOptions, setCruiseOptions] = useState<CruiseOption[]>(sampleCruises)
  const [filterDestination, setFilterDestination] = useState('')
  const [filterDuration, setFilterDuration] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
  const [showEssexOnly, setShowEssexOnly] = useState(false)

  const addToComparison = (cruiseId: string) => {
    if (selectedCruises.length < 3 && !selectedCruises.includes(cruiseId)) {
      setSelectedCruises([...selectedCruises, cruiseId])
    }
  }

  const removeFromComparison = (cruiseId: string) => {
    setSelectedCruises(selectedCruises.filter(id => id !== cruiseId))
  }

  const getComparisonCruises = () => {
    return selectedCruises.map(id => cruiseOptions.find(c => c.id === id)).filter(Boolean) as CruiseOption[]
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const getFilteredCruises = () => {
    return cruiseOptions.filter(cruise => {
      if (filterDestination && !cruise.destination.toLowerCase().includes(filterDestination.toLowerCase())) {
        return false
      }
      if (filterDuration && cruise.duration !== Number(filterDuration)) {
        return false
      }
      if (filterPrice) {
        const maxPrice = Number(filterPrice)
        if (cruise.price > maxPrice) return false
      }
      if (showEssexOnly && !cruise.essexRecommended) {
        return false
      }
      return true
    })
  }

  const comparisonCruises = getComparisonCruises()
  const filteredCruises = getFilteredCruises()

  const getPriceComparison = (cruises: CruiseOption[]) => {
    if (cruises.length === 0) return null
    const prices = cruises.map(c => c.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    return { minPrice, maxPrice, difference: maxPrice - minPrice }
  }

  const priceComparison = getPriceComparison(comparisonCruises)

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-teal-600 p-4 rounded-full">
              <BarChart3 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cruise Comparison Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare up to 3 cruises side-by-side. Find the perfect voyage for Essex County travelers
            with detailed analysis of price, itinerary, and amenities.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Filter Cruises</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <select
                value={filterDestination}
                onChange={(e) => setFilterDestination(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">All Destinations</option>
                <option value="Caribbean">Caribbean</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Alaska">Alaska</option>
                <option value="Mediterranean">Mediterranean</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <select
                value={filterDuration}
                onChange={(e) => setFilterDuration(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Any Duration</option>
                <option value="3">3 Nights</option>
                <option value="4">4 Nights</option>
                <option value="5">5 Nights</option>
                <option value="7">7 Nights</option>
                <option value="8">8 Nights</option>
                <option value="10">10+ Nights</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price
              </label>
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Any Price</option>
                <option value="1000">Under $1,000</option>
                <option value="1500">Under $1,500</option>
                <option value="2000">Under $2,000</option>
                <option value="3000">Under $3,000</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showEssexOnly}
                  onChange={(e) => setShowEssexOnly(e.target.checked)}
                  className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-sm font-medium text-gray-700">Essex County Recommended</span>
              </label>
            </div>
          </div>
        </div>

        {/* Available Cruises */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Available Cruises ({filteredCruises.length})</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredCruises.map(cruise => (
                  <div key={cruise.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                              {cruise.cruiseLine} - {cruise.shipName}
                            </h3>
                            <p className="text-gray-600">{cruise.destination}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {cruise.departureDate}
                              </span>
                              <span className="flex items-center gap-1">
                                <Anchor className="w-4 h-4" />
                                {cruise.departurePort}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-2xl font-bold text-teal-600">
                                {formatPrice(cruise.price)}
                              </span>
                              <span className="text-sm text-gray-500">per person</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{cruise.rating}</span>
                                <span className="text-sm text-gray-500">({cruise.reviews})</span>
                              </div>
                            </div>
                          </div>
                          {cruise.essexRecommended && (
                            <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                              Essex Pick
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => addToComparison(cruise.id)}
                        disabled={selectedCruises.includes(cruise.id) || selectedCruises.length >= 3}
                        className={`ml-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                          selectedCruises.includes(cruise.id)
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : selectedCruises.length >= 3
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}
                      >
                        {selectedCruises.includes(cruise.id) ? 'Added' :
                         selectedCruises.length >= 3 ? 'Max 3' : 'Compare'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected for Comparison */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">Selected for Comparison ({selectedCruises.length}/3)</h3>
              {selectedCruises.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Select up to 3 cruises to compare
                </p>
              ) : (
                <div className="space-y-3">
                  {comparisonCruises.map(cruise => (
                    <div key={cruise.id} className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{cruise.cruiseLine}</p>
                        <p className="text-xs text-gray-600">{cruise.shipName}</p>
                        <p className="text-sm font-bold text-teal-600">{formatPrice(cruise.price)}</p>
                      </div>
                      <button
                        onClick={() => removeFromComparison(cruise.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {selectedCruises.length > 1 && (
                <button
                  onClick={() => document.getElementById('comparison-table')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full mt-4 bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  View Comparison
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        {comparisonCruises.length > 1 && (
          <div id="comparison-table" className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Side-by-Side Comparison</h2>

            {/* Price Summary */}
            {priceComparison && (
              <div className="mb-6 p-4 bg-teal-50 rounded-lg">
                <p className="text-sm text-gray-600">Price Range:</p>
                <p className="text-lg">
                  <span className="font-bold text-green-600">{formatPrice(priceComparison.minPrice)}</span>
                  {' to '}
                  <span className="font-bold text-red-600">{formatPrice(priceComparison.maxPrice)}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    (Difference: {formatPrice(priceComparison.difference)})
                  </span>
                </p>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4">Feature</th>
                    {comparisonCruises.map(cruise => (
                      <th key={cruise.id} className="text-center py-3 px-4 min-w-[200px]">
                        <div>
                          <p className="font-bold">{cruise.cruiseLine}</p>
                          <p className="text-sm text-gray-600">{cruise.shipName}</p>
                          {cruise.essexRecommended && (
                            <span className="inline-block mt-1 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                              Essex Recommended
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Price */}
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Price</td>
                    {comparisonCruises.map(cruise => (
                      <td key={cruise.id} className="text-center py-3 px-4">
                        <span className={`text-lg font-bold ${
                          priceComparison && cruise.price === priceComparison.minPrice ? 'text-green-600' : ''
                        }`}>
                          {formatPrice(cruise.price)}
                        </span>
                        <p className="text-xs text-gray-500">per person</p>
                      </td>
                    ))}
                  </tr>

                  {/* Destination */}
                  <tr className="border-b bg-gray-50">
                    <td className="py-3 px-4 font-medium">Destination</td>
                    {comparisonCruises.map(cruise => (
                      <td key={cruise.id} className="text-center py-3 px-4">
                        {cruise.destination}
                      </td>
                    ))}
                  </tr>

                  {/* Duration */}
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Duration</td>
                    {comparisonCruises.map(cruise => (
                      <td key={cruise.id} className="text-center py-3 px-4">
                        {cruise.duration} nights
                      </td>
                    ))}
                  </tr>

                  {/* Departure */}
                  <tr className="border-b bg-gray-50">
                    <td className="py-3 px-4 font-medium">Departure Port</td>
                    {comparisonCruises.map(cruise => (
                      <td key={cruise.id} className="text-center py-3 px-4">
                        <p className="text-sm">{cruise.departurePort}</p>
                        {cruise.departurePort.includes('Bayonne') && (
                          <p className="text-xs text-green-600">30 min from Newark</p>
                        )}
                        {cruise.departurePort.includes('Manhattan') && (
                          <p className="text-xs text-green-600">40 min from Newark</p>
                        )}
                        {cruise.departurePort.includes('Brooklyn') && (
                          <p className="text-xs text-green-600">45 min from Newark</p>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Date */}
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Departure Date</td>
                    {comparisonCruises.map(cruise => (
                      <td key={cruise.id} className="text-center py-3 px-4">
                        {cruise.departureDate}
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr className="border-b bg-gray-50">
                    <td className="py-3 px-4 font-medium">Guest Rating</td>
                    {comparisonCruises.map(cruise => (
                      <td key={cruise.id} className="text-center py-3 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{cruise.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">({cruise.reviews} reviews)</p>
                      </td>
                    ))}
                  </tr>

                  {/* Ship Info */}
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Ship Details</td>
                    {comparisonCruises.map(cruise => (
                      <td key={cruise.id} className="text-center py-3 px-4 text-sm">
                        <p>Capacity: {cruise.capacity.toLocaleString()}</p>
                        <p>Built: {cruise.yearBuilt}</p>
                        <p>Size: {cruise.tonnage.toLocaleString()} tons</p>
                      </td>
                    ))}
                  </tr>

                  {/* Features */}
                  <tr className="border-b bg-gray-50">
                    <td className="py-3 px-4 font-medium">Top Features</td>
                    {comparisonCruises.map(cruise => (
                      <td key={cruise.id} className="py-3 px-4">
                        <ul className="text-sm space-y-1">
                          {cruise.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Pros */}
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Pros</td>
                    {comparisonCruises.map(cruise => (
                      <td key={cruise.id} className="py-3 px-4">
                        <ul className="text-sm space-y-1">
                          {cruise.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Cons */}
                  <tr className="border-b bg-gray-50">
                    <td className="py-3 px-4 font-medium">Cons</td>
                    {comparisonCruises.map(cruise => (
                      <td key={cruise.id} className="py-3 px-4">
                        <ul className="text-sm space-y-1">
                          {cruise.cons.map((con, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Best For */}
                  <tr>
                    <td className="py-3 px-4 font-medium">Best For</td>
                    {comparisonCruises.map(cruise => (
                      <td key={cruise.id} className="text-center py-3 px-4">
                        <p className="text-sm font-medium text-teal-600">
                          {cruise.cruiseLine === 'Royal Caribbean' && 'Families & First-timers'}
                          {cruise.cruiseLine === 'Carnival' && 'Budget & Party Seekers'}
                          {cruise.cruiseLine === 'Norwegian' && 'Flexible Dining & Couples'}
                          {cruise.cruiseLine === 'Celebrity' && 'Premium Experience'}
                          {cruise.cruiseLine === 'Princess' && 'Traditional Cruisers'}
                        </p>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recommendation */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-600" />
                Essex County Recommendation
              </h3>
              <p className="text-sm text-gray-700">
                Based on your comparison, we recommend{' '}
                <span className="font-semibold">
                  {comparisonCruises.find(c => c.essexRecommended)?.cruiseLine || comparisonCruises[0].cruiseLine}
                </span>{' '}
                for Essex County residents. It offers the best combination of convenient departure location,
                value for money, and guest satisfaction. The departure from{' '}
                {comparisonCruises.find(c => c.essexRecommended)?.departurePort || comparisonCruises[0].departurePort}{' '}
                makes it especially convenient for Newark area travelers.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <a
                href="/contact"
                className="flex-1 bg-teal-600 text-white text-center font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Book with Expert Help
              </a>
              <a
                href="tel:833-874-1019"
                className="flex-1 bg-white text-teal-600 border-2 border-teal-600 text-center font-bold py-3 px-4 rounded-lg hover:bg-teal-50 transition-colors"
              >
                Call 833-874-1019
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}