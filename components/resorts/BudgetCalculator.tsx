'use client'

import { useState } from 'react'

interface BudgetBreakdown {
  resortBase: number
  flights: number
  airportParking: number
  airportTransfers: number
  excursions: number
  spaServices: number
  souvenirs: number
  tipsGratuities: number
  travelInsurance: number
  passportFees: number
  total: number
}

export default function BudgetCalculator() {
  const [travelers, setTravelers] = useState(2)
  const [nights, setNights] = useState(7)
  const [resortTier, setResortTier] = useState<'budget' | 'moderate' | 'luxury'>('moderate')
  const [includeExtras, setIncludeExtras] = useState({
    excursions: true,
    spa: false,
    insurance: true,
    passportRenewal: false,
  })

  // Base prices per person per night
  const resortPrices = {
    budget: 200,
    moderate: 350,
    luxury: 600,
  }

  // Flight prices from Newark (average)
  const flightPrices = {
    budget: 450,
    moderate: 600,
    luxury: 900,
  }

  // Calculate budget breakdown
  const calculateBudget = (): BudgetBreakdown => {
    const resortBase = resortPrices[resortTier] * nights * travelers
    const flights = flightPrices[resortTier] * travelers

    // Newark Airport parking (daily rates)
    const parkingDaily = 39 // Economy parking at EWR
    const airportParking = parkingDaily * nights

    // Airport transfers (round trip per person)
    const transfersPerPerson = resortTier === 'luxury' ? 150 : resortTier === 'moderate' ? 90 : 60
    const airportTransfers = transfersPerPerson * travelers

    // Optional extras
    const excursions = includeExtras.excursions ? 150 * travelers : 0
    const spaServices = includeExtras.spa ? 200 * travelers : 0
    const travelInsurance = includeExtras.insurance ? resortBase * 0.07 : 0 // 7% of trip cost
    const passportFees = includeExtras.passportRenewal ? 130 * travelers : 0

    // Standard extras
    const souvenirs = 50 * travelers
    const tipsGratuities = resortBase * 0.05 // 5% for resort staff

    const total =
      resortBase +
      flights +
      airportParking +
      airportTransfers +
      excursions +
      spaServices +
      souvenirs +
      tipsGratuities +
      travelInsurance +
      passportFees

    return {
      resortBase,
      flights,
      airportParking,
      airportTransfers,
      excursions,
      spaServices,
      souvenirs,
      tipsGratuities,
      travelInsurance,
      passportFees,
      total,
    }
  }

  const budget = calculateBudget()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Vacation Budget Calculator</h2>
      <p className="text-gray-600 mb-6">
        Get a complete picture of your all-inclusive vacation costs from Newark, including
        often-forgotten expenses specific to New Jersey travelers.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Travelers
            </label>
            <select
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Traveler' : 'Travelers'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Nights
            </label>
            <select
              value={nights}
              onChange={(e) => setNights(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {[3, 4, 5, 6, 7, 8, 9, 10, 14].map((num) => (
                <option key={num} value={num}>
                  {num} Nights
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Resort Tier</label>
            <div className="grid grid-cols-3 gap-2">
              {(['budget', 'moderate', 'luxury'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setResortTier(tier)}
                  className={`px-4 py-2 rounded-lg border capitalize ${
                    resortTier === tier
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-600">
              {resortTier === 'budget' && 'Basic 3-4★ resorts ($150-250/night)'}
              {resortTier === 'moderate' && 'Quality 4-4.5★ resorts ($300-400/night)'}
              {resortTier === 'luxury' && 'Premium 5★ resorts ($500-800/night)'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Include Extras</label>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeExtras.excursions}
                  onChange={(e) =>
                    setIncludeExtras({ ...includeExtras, excursions: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Excursions & Tours ($150/person)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeExtras.spa}
                  onChange={(e) => setIncludeExtras({ ...includeExtras, spa: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Spa Services ($200/person)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeExtras.insurance}
                  onChange={(e) =>
                    setIncludeExtras({ ...includeExtras, insurance: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Travel Insurance (7% of trip)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeExtras.passportRenewal}
                  onChange={(e) =>
                    setIncludeExtras({ ...includeExtras, passportRenewal: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Passport Renewal ($130/person)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Total Budget</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Resort Package</span>
                <span className="text-sm font-semibold text-gray-900">
                  ${budget.resortBase.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Flights from Newark</span>
                <span className="text-sm font-semibold text-gray-900">
                  ${budget.flights.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">EWR Airport Parking</span>
                <span className="text-sm font-semibold text-gray-900">
                  ${budget.airportParking.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Airport Transfers</span>
                <span className="text-sm font-semibold text-gray-900">
                  ${budget.airportTransfers.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tips & Gratuities</span>
                <span className="text-sm font-semibold text-gray-900">
                  ${Math.round(budget.tipsGratuities).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Souvenirs & Misc</span>
                <span className="text-sm font-semibold text-gray-900">
                  ${budget.souvenirs.toLocaleString()}
                </span>
              </div>

              {budget.excursions > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Excursions</span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${budget.excursions.toLocaleString()}
                  </span>
                </div>
              )}
              {budget.spaServices > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Spa Services</span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${budget.spaServices.toLocaleString()}
                  </span>
                </div>
              )}
              {budget.travelInsurance > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Travel Insurance</span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${Math.round(budget.travelInsurance).toLocaleString()}
                  </span>
                </div>
              )}
              {budget.passportFees > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Passport Renewal</span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${budget.passportFees.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold text-gray-900">Total Vacation Cost</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${budget.total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Per Person</span>
                <span className="font-semibold text-gray-900">
                  ${Math.round(budget.total / travelers).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">💡 Newark Traveler Tips</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Book EWR parking in advance to save $10-15/day</li>
              <li>• Consider Newark Airport Hotel Park & Fly packages</li>
              <li>• NJ residents get deals at certain resort chains</li>
              <li>• Factor in NJ sales tax on travel insurance (7%)</li>
              <li>• Join TSA PreCheck at EWR ($78 for 5 years)</li>
            </ul>
          </div>

          <div className="mt-6">
            <a
              href="tel:833-874-1019"
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Call 833-874-1019 for Exact Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
