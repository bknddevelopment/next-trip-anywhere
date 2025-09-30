'use client'

import { useState, useEffect } from 'react'
import { Ship, Calendar, Users, Bed, MapPin, Sparkles, Phone, Info } from 'lucide-react'

/**
 * CruisePriceCalculator - Interactive cruise pricing calculator
 *
 * Features:
 * - Departure port selection with Essex County focus
 * - Destination-based pricing (Caribbean, Alaska, Europe, etc.)
 * - Cabin type selection with base pricing
 * - Seasonal pricing adjustments (peak vs off-peak)
 * - Essex County resident discount (5-10%)
 * - Group discounts (4+ passengers)
 * - localStorage persistence for user preferences
 * - Fully accessible (WCAG 2.1 AA compliant)
 * - Mobile responsive design
 */

// Departure ports with distances from Essex County
const DEPARTURE_PORTS = {
  'cape-liberty': {
    name: 'Cape Liberty (Bayonne, NJ)',
    distance: '15 miles from Newark',
    discount: 0.08, // 8% local discount
  },
  brooklyn: {
    name: 'Brooklyn Cruise Terminal (NYC)',
    distance: '25 miles from Newark',
    discount: 0.05, // 5% regional discount
  },
  manhattan: {
    name: 'Manhattan Cruise Terminal (NYC)',
    distance: '20 miles from Newark',
    discount: 0.05,
  },
  baltimore: {
    name: 'Port of Baltimore',
    distance: '3 hours drive',
    discount: 0,
  },
}

// Destinations with base pricing per night
const DESTINATIONS = {
  caribbean: {
    name: 'Caribbean',
    basePrice: 150,
    typical: '5-7 nights',
    season: { peak: 1.3, offPeak: 0.85 }, // Winter peak, Summer off-peak
  },
  bahamas: {
    name: 'Bahamas',
    basePrice: 140,
    typical: '3-5 nights',
    season: { peak: 1.25, offPeak: 0.9 },
  },
  bermuda: {
    name: 'Bermuda',
    basePrice: 180,
    typical: '7 nights',
    season: { peak: 1.4, offPeak: 0.85 },
  },
  alaska: {
    name: 'Alaska',
    basePrice: 220,
    typical: '7-10 nights',
    season: { peak: 1.5, offPeak: 1.0 }, // Summer peak only
  },
  europe: {
    name: 'Europe/Mediterranean',
    basePrice: 250,
    typical: '10-14 nights',
    season: { peak: 1.45, offPeak: 0.95 },
  },
  canada: {
    name: 'Canada/New England',
    basePrice: 160,
    typical: '7 nights',
    season: { peak: 1.35, offPeak: 1.0 }, // Fall foliage peak
  },
  mexico: {
    name: 'Mexican Riviera',
    basePrice: 155,
    typical: '7 nights',
    season: { peak: 1.25, offPeak: 0.9 },
  },
  transatlantic: {
    name: 'Transatlantic',
    basePrice: 130,
    typical: '12-15 nights',
    season: { peak: 1.0, offPeak: 0.75 }, // Repositioning cruises
  },
}

// Cabin types with pricing multipliers
const CABIN_TYPES = {
  interior: { name: 'Interior Cabin', multiplier: 1.0, icon: '🚪' },
  oceanview: { name: 'Ocean View', multiplier: 1.35, icon: '🪟' },
  balcony: { name: 'Balcony', multiplier: 1.65, icon: '🌊' },
  suite: { name: 'Suite', multiplier: 2.8, icon: '⭐' },
}

// Travel months for seasonal pricing
const TRAVEL_MONTHS = [
  { value: '2025-01', label: 'January 2025', isPeak: true },
  { value: '2025-02', label: 'February 2025', isPeak: true },
  { value: '2025-03', label: 'March 2025', isPeak: true },
  { value: '2025-04', label: 'April 2025', isPeak: false },
  { value: '2025-05', label: 'May 2025', isPeak: false },
  { value: '2025-06', label: 'June 2025', isPeak: false },
  { value: '2025-07', label: 'July 2025', isPeak: true },
  { value: '2025-08', label: 'August 2025', isPeak: false },
  { value: '2025-09', label: 'September 2025', isPeak: false },
  { value: '2025-10', label: 'October 2025', isPeak: false },
  { value: '2025-11', label: 'November 2025', isPeak: false },
  { value: '2025-12', label: 'December 2025', isPeak: true },
]

interface PriceBreakdown {
  baseFare: number
  seasonalAdjustment: number
  cabinUpgrade: number
  portDiscount: number
  groupDiscount: number
  essexDiscount: number
  subtotal: number
  taxes: number
  total: number
  perPerson: number
  savings: number
}

export default function CruisePriceCalculator() {
  // Form state
  const [departurePort, setDeparturePort] = useState<keyof typeof DEPARTURE_PORTS>('cape-liberty')
  const [destination, setDestination] = useState<keyof typeof DESTINATIONS>('caribbean')
  const [cruiseLength, setCruiseLength] = useState(7)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [cabinType, setCabinType] = useState<keyof typeof CABIN_TYPES>('balcony')
  const [travelMonth, setTravelMonth] = useState('2025-03')
  const [essexResident, setEssexResident] = useState(true)

  // Results state
  const [breakdown, setBreakdown] = useState<PriceBreakdown | null>(null)
  const [showResults, setShowResults] = useState(false)

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('cruisePriceCalculator')
        if (saved) {
          const prefs = JSON.parse(saved)
          setDeparturePort(prefs.departurePort || 'cape-liberty')
          setDestination(prefs.destination || 'caribbean')
          setCruiseLength(prefs.cruiseLength || 7)
          setAdults(prefs.adults || 2)
          setChildren(prefs.children || 0)
          setCabinType(prefs.cabinType || 'balcony')
          setTravelMonth(prefs.travelMonth || '2025-03')
          setEssexResident(prefs.essexResident !== false)
        }
      } catch (e) {
        console.error('Failed to load calculator preferences:', e)
      }
    }
  }, [])

  // Save preferences to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefs = {
        departurePort,
        destination,
        cruiseLength,
        adults,
        children,
        cabinType,
        travelMonth,
        essexResident,
      }
      localStorage.setItem('cruisePriceCalculator', JSON.stringify(prefs))
    }
  }, [
    departurePort,
    destination,
    cruiseLength,
    adults,
    children,
    cabinType,
    travelMonth,
    essexResident,
  ])

  // Calculate price whenever inputs change
  const calculatePrice = () => {
    const dest = DESTINATIONS[destination]
    const cabin = CABIN_TYPES[cabinType]
    const port = DEPARTURE_PORTS[departurePort]
    const totalPassengers = adults + children

    // Find if selected month is peak season
    const monthData = TRAVEL_MONTHS.find((m) => m.value === travelMonth)
    const isPeakSeason = monthData?.isPeak || false
    const seasonMultiplier = isPeakSeason ? dest.season.peak : dest.season.offPeak

    // Base fare calculation (per person per night)
    const basePerNight = dest.basePrice
    const baseFare = basePerNight * cruiseLength * totalPassengers

    // Seasonal adjustment
    const seasonalAdjustment = baseFare * (seasonMultiplier - 1)

    // Cabin type upgrade cost
    const cabinUpgrade = baseFare * (cabin.multiplier - 1)

    // Port discount (for Cape Liberty)
    const portDiscountAmount =
      port.discount > 0 ? (baseFare + seasonalAdjustment + cabinUpgrade) * port.discount : 0

    // Group discount (4+ passengers get 10% off)
    const groupDiscountAmount =
      totalPassengers >= 4
        ? (baseFare + seasonalAdjustment + cabinUpgrade - portDiscountAmount) * 0.1
        : 0

    // Essex County resident discount (5% additional)
    const subtotalBeforeEssex =
      baseFare + seasonalAdjustment + cabinUpgrade - portDiscountAmount - groupDiscountAmount
    const essexDiscountAmount = essexResident ? subtotalBeforeEssex * 0.05 : 0

    // Subtotal after all discounts
    const subtotal = subtotalBeforeEssex - essexDiscountAmount

    // Taxes and fees (approximately 18% of subtotal)
    const taxes = subtotal * 0.18

    // Final total
    const total = subtotal + taxes
    const perPerson = total / totalPassengers

    // Total savings
    const savings = portDiscountAmount + groupDiscountAmount + essexDiscountAmount

    setBreakdown({
      baseFare: baseFare + seasonalAdjustment + cabinUpgrade,
      seasonalAdjustment,
      cabinUpgrade,
      portDiscount: portDiscountAmount,
      groupDiscount: groupDiscountAmount,
      essexDiscount: essexDiscountAmount,
      subtotal,
      taxes,
      total,
      perPerson,
      savings,
    })
    setShowResults(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.max(0, amount))
  }

  const totalPassengers = adults + children

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <Ship className="w-8 h-8" />
          <h2 className="text-3xl md:text-4xl font-bold">Cruise Price Calculator</h2>
        </div>
        <p className="text-blue-100">
          Get instant cruise pricing estimates for Essex County residents
        </p>
      </div>

      {/* Form Section */}
      <div className="p-6 md:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            {/* Departure Port */}
            <div>
              <label
                htmlFor="departure-port"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
              >
                <MapPin className="w-4 h-4 text-blue-600" />
                Departure Port
              </label>
              <select
                id="departure-port"
                value={departurePort}
                onChange={(e) => setDeparturePort(e.target.value as keyof typeof DEPARTURE_PORTS)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                aria-describedby="port-info"
              >
                {Object.entries(DEPARTURE_PORTS).map(([key, port]) => (
                  <option key={key} value={key}>
                    {port.name} • {port.distance}
                  </option>
                ))}
              </select>
              {DEPARTURE_PORTS[departurePort].discount > 0 && (
                <p id="port-info" className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {Math.round(DEPARTURE_PORTS[departurePort].discount * 100)}% local port discount
                  applied!
                </p>
              )}
            </div>

            {/* Destination */}
            <div>
              <label
                htmlFor="destination"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
              >
                <Ship className="w-4 h-4 text-blue-600" />
                Destination
              </label>
              <select
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value as keyof typeof DESTINATIONS)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                aria-describedby="dest-info"
              >
                {Object.entries(DESTINATIONS).map(([key, dest]) => (
                  <option key={key} value={key}>
                    {dest.name} • {dest.typical}
                  </option>
                ))}
              </select>
              <p id="dest-info" className="text-xs text-gray-600 mt-1">
                Typical duration: {DESTINATIONS[destination].typical}
              </p>
            </div>

            {/* Cruise Length */}
            <div>
              <label
                htmlFor="cruise-length"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
              >
                <Calendar className="w-4 h-4 text-blue-600" />
                Cruise Length: <span className="text-blue-600">{cruiseLength} nights</span>
              </label>
              <input
                id="cruise-length"
                type="range"
                min="2"
                max="15"
                value={cruiseLength}
                onChange={(e) => setCruiseLength(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                aria-valuemin={2}
                aria-valuemax={15}
                aria-valuenow={cruiseLength}
                aria-label="Cruise length in nights"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>2 nights</span>
                <span>15+ nights</span>
              </div>
            </div>

            {/* Number of Passengers */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Users className="w-4 h-4 text-blue-600" />
                Number of Passengers
              </label>

              <div className="space-y-3">
                {/* Adults */}
                <div>
                  <label htmlFor="adults" className="block text-sm text-gray-600 mb-1">
                    Adults (12+)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => setAdults(num)}
                        className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all ${
                          adults === num
                            ? 'bg-blue-600 text-white shadow-md scale-105'
                            : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200'
                        }`}
                        aria-pressed={adults === num}
                        aria-label={`${num} adult${num > 1 ? 's' : ''}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Children */}
                <div>
                  <label htmlFor="children" className="block text-sm text-gray-600 mb-1">
                    Children (2-11)
                  </label>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => setChildren(num)}
                        className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all ${
                          children === num
                            ? 'bg-blue-600 text-white shadow-md scale-105'
                            : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200'
                        }`}
                        aria-pressed={children === num}
                        aria-label={`${num} ${num === 1 ? 'child' : 'children'}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {totalPassengers >= 4 && (
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  10% group discount applied for 4+ passengers!
                </p>
              )}
            </div>

            {/* Cabin Type */}
            <div>
              <label
                htmlFor="cabin-type"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
              >
                <Bed className="w-4 h-4 text-blue-600" />
                Cabin Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(CABIN_TYPES).map(([key, cabin]) => (
                  <button
                    key={key}
                    onClick={() => setCabinType(key as keyof typeof CABIN_TYPES)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      cabinType === key
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                    aria-pressed={cabinType === key}
                  >
                    <div className="text-2xl mb-1">{cabin.icon}</div>
                    <div className="font-semibold text-sm text-gray-900">{cabin.name}</div>
                    <div className="text-xs text-gray-600">
                      {cabin.multiplier === 1
                        ? 'Base price'
                        : `+${Math.round((cabin.multiplier - 1) * 100)}%`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Month */}
            <div>
              <label
                htmlFor="travel-month"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
              >
                <Calendar className="w-4 h-4 text-blue-600" />
                Travel Month
              </label>
              <select
                id="travel-month"
                value={travelMonth}
                onChange={(e) => setTravelMonth(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                aria-describedby="season-info"
              >
                {TRAVEL_MONTHS.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label} {month.isPeak ? '(Peak Season)' : '(Off-Peak)'}
                  </option>
                ))}
              </select>
              <p id="season-info" className="text-xs text-gray-600 mt-1">
                {TRAVEL_MONTHS.find((m) => m.value === travelMonth)?.isPeak
                  ? '⚠️ Peak season pricing applies'
                  : '✓ Off-peak savings available'}
              </p>
            </div>

            {/* Essex County Resident */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={essexResident}
                  onChange={(e) => setEssexResident(e.target.checked)}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500 mt-0.5"
                  aria-describedby="essex-discount-info"
                />
                <div>
                  <span className="block text-sm font-semibold text-gray-900">
                    I'm an Essex County, NJ resident
                  </span>
                  <span id="essex-discount-info" className="block text-xs text-gray-600 mt-1">
                    Get an additional 5% discount on your cruise booking!
                  </span>
                </div>
              </label>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculatePrice}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Calculate cruise price"
            >
              Calculate My Price
            </button>
          </div>

          {/* Right Column - Results */}
          <div className="lg:sticky lg:top-6 h-fit">
            {showResults && breakdown ? (
              <div className="bg-white rounded-xl shadow-xl p-6 space-y-4 animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  Your Price Estimate
                </h3>

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">
                      Base Fare ({cruiseLength} nights × {totalPassengers} passengers)
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(breakdown.baseFare)}
                    </span>
                  </div>

                  {breakdown.portDiscount > 0 && (
                    <div className="flex justify-between py-2 text-green-600">
                      <span>Local Port Discount</span>
                      <span className="font-semibold">
                        -{formatCurrency(breakdown.portDiscount)}
                      </span>
                    </div>
                  )}

                  {breakdown.groupDiscount > 0 && (
                    <div className="flex justify-between py-2 text-green-600">
                      <span>Group Discount (4+ passengers)</span>
                      <span className="font-semibold">
                        -{formatCurrency(breakdown.groupDiscount)}
                      </span>
                    </div>
                  )}

                  {breakdown.essexDiscount > 0 && (
                    <div className="flex justify-between py-2 text-green-600">
                      <span>Essex County Resident Discount</span>
                      <span className="font-semibold">
                        -{formatCurrency(breakdown.essexDiscount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Taxes & Port Fees</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(breakdown.taxes)}
                    </span>
                  </div>

                  {/* Total Savings Highlight */}
                  {breakdown.savings > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-3 my-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-green-800">Your Total Savings</span>
                        <span className="text-xl font-bold text-green-600">
                          {formatCurrency(breakdown.savings)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Estimated Total */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold">Estimated Total</span>
                      <span className="text-3xl font-bold">{formatCurrency(breakdown.total)}</span>
                    </div>
                    <div className="flex justify-between text-blue-100 text-sm">
                      <span>Per Person</span>
                      <span className="font-semibold">{formatCurrency(breakdown.perPerson)}</span>
                    </div>
                  </div>

                  {/* Price Comparison */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                    <p className="text-sm text-gray-700 flex items-start gap-2">
                      <Info className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Save {formatCurrency(breakdown.savings)}</strong> vs booking
                        elsewhere! Essex County residents get exclusive local discounts.
                      </span>
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-4">
                  <a
                    href="tel:833-874-1019"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                    aria-label="Call to get your exact quote"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now: 833-874-1019
                  </a>

                  <a
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Request Detailed Quote
                  </a>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-gray-500 text-center pt-4 border-t border-gray-200">
                  * Prices are estimates based on average 2025 rates. Final pricing depends on
                  specific sailing dates, cabin availability, and current promotions. Call for exact
                  pricing and to secure your booking.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-xl p-8 text-center">
                <Ship className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Calculate?</h3>
                <p className="text-gray-600">
                  Fill out the form and click "Calculate My Price" to see your personalized cruise
                  estimate with Essex County discounts!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Info className="w-4 h-4" />
            <span>All prices in USD. Taxes and fees included.</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Phone className="w-4 h-4" />
            <span>Questions? Call 833-874-1019</span>
          </div>
        </div>
      </div>
    </div>
  )
}
