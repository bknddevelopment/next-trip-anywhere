'use client'

import { useState, useEffect } from 'react'

// Pricing data for different cabin types
const CABIN_PRICES = {
  interior: { base: 599, perDay: 85 },
  oceanview: { base: 799, perDay: 115 },
  balcony: { base: 999, perDay: 145 },
  suite: { base: 1599, perDay: 225 },
}

// Add-on pricing
const ADDONS = {
  drinks: { name: 'Unlimited Drinks Package', perDay: 59 },
  wifi: { name: 'Premium WiFi', perDay: 19 },
  gratuities: { name: 'Prepaid Gratuities', perDay: 15 },
  specialty: { name: 'Specialty Dining Package', perDay: 35 },
  spa: { name: 'Spa Package', flat: 199 },
  photos: { name: 'Photo Package', flat: 149 },
}

// Cruise line multipliers
const CRUISE_LINES = {
  royal: { name: 'Royal Caribbean', multiplier: 1.0 },
  carnival: { name: 'Carnival', multiplier: 0.9 },
  norwegian: { name: 'Norwegian', multiplier: 1.05 },
  celebrity: { name: 'Celebrity', multiplier: 1.15 },
  princess: { name: 'Princess', multiplier: 1.1 },
  msc: { name: 'MSC', multiplier: 0.85 },
}

interface CalculationResult {
  baseFare: number
  taxes: number
  addOns: number
  total: number
  perPerson: number
  withDiscount: number
}

export default function CruisePriceCalculator() {
  const [cruiseLength, setCruiseLength] = useState(7)
  const [cabinType, setCabinType] = useState<keyof typeof CABIN_PRICES>('balcony')
  const [travelers, setTravelers] = useState(2)
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set())
  const [cruiseLine, setCruiseLine] = useState<keyof typeof CRUISE_LINES>('royal')
  const [essexDiscount, setEssexDiscount] = useState(true)
  const [result, setResult] = useState<CalculationResult | null>(null)

  // Load saved preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cruiseCalculatorPrefs')
    if (saved) {
      try {
        const prefs = JSON.parse(saved)
        setCruiseLength(prefs.cruiseLength || 7)
        setCabinType(prefs.cabinType || 'balcony')
        setTravelers(prefs.travelers || 2)
        setSelectedAddons(new Set(prefs.selectedAddons || []))
        setCruiseLine(prefs.cruiseLine || 'royal')
      } catch (e) {
        // Ignore invalid data
      }
    }
  }, [])

  // Save preferences to localStorage
  useEffect(() => {
    const prefs = {
      cruiseLength,
      cabinType,
      travelers,
      selectedAddons: Array.from(selectedAddons),
      cruiseLine,
    }
    localStorage.setItem('cruiseCalculatorPrefs', JSON.stringify(prefs))
  }, [cruiseLength, cabinType, travelers, selectedAddons, cruiseLine])

  // Calculate pricing
  useEffect(() => {
    const cabin = CABIN_PRICES[cabinType]
    const lineMultiplier = CRUISE_LINES[cruiseLine].multiplier

    // Base fare calculation
    const baseFare = (cabin.base + cabin.perDay * cruiseLength) * travelers * lineMultiplier

    // Taxes and fees (approximately 15-20% of base fare)
    const taxes = baseFare * 0.175

    // Add-ons calculation
    let addOnsTotal = 0
    selectedAddons.forEach((addon) => {
      const addonData = ADDONS[addon as keyof typeof ADDONS]
      if ('perDay' in addonData) {
        addOnsTotal += addonData.perDay * cruiseLength * travelers
      } else {
        addOnsTotal += addonData.flat
      }
    })

    const total = baseFare + taxes + addOnsTotal
    const perPerson = total / travelers
    const withDiscount = essexDiscount ? total * 0.95 : total // 5% Essex County discount

    setResult({
      baseFare,
      taxes,
      addOns: addOnsTotal,
      total,
      perPerson,
      withDiscount,
    })
  }, [cruiseLength, cabinType, travelers, selectedAddons, cruiseLine, essexDiscount])

  const toggleAddon = (addon: string) => {
    const newAddons = new Set(selectedAddons)
    if (newAddons.has(addon)) {
      newAddons.delete(addon)
    } else {
      newAddons.add(addon)
    }
    setSelectedAddons(newAddons)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Cruise Price Calculator</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Cruise Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cruise Length: {cruiseLength} days
            </label>
            <input
              type="range"
              min="3"
              max="14"
              value={cruiseLength}
              onChange={(e) => setCruiseLength(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>3 days</span>
              <span>14 days</span>
            </div>
          </div>

          {/* Cabin Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cabin Type</label>
            <select
              value={cabinType}
              onChange={(e) => setCabinType(e.target.value as keyof typeof CABIN_PRICES)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="interior">Interior Cabin</option>
              <option value="oceanview">Ocean View</option>
              <option value="balcony">Balcony</option>
              <option value="suite">Suite</option>
            </select>
          </div>

          {/* Number of Travelers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Travelers
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setTravelers(num)}
                  className={`flex-1 py-2 rounded-lg font-medium transition ${
                    travelers === num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Cruise Line */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cruise Line</label>
            <select
              value={cruiseLine}
              onChange={(e) => setCruiseLine(e.target.value as keyof typeof CRUISE_LINES)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(CRUISE_LINES).map(([key, line]) => (
                <option key={key} value={key}>
                  {line.name}
                </option>
              ))}
            </select>
          </div>

          {/* Add-ons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Add-on Packages</label>
            <div className="space-y-2">
              {Object.entries(ADDONS).map(([key, addon]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAddons.has(key)}
                    onChange={() => toggleAddon(key)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {addon.name}{' '}
                    <span className="text-gray-500">
                      {'perDay' in addon ? `($${addon.perDay}/day)` : `($${addon.flat} total)`}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Essex County Discount */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={essexDiscount}
                onChange={(e) => setEssexDiscount(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Essex County Resident Discount (5% off)
              </span>
            </label>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Price Breakdown</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Fare:</span>
                <span className="font-medium">{formatCurrency(result.baseFare)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & Fees:</span>
                <span className="font-medium">{formatCurrency(result.taxes)}</span>
              </div>

              {result.addOns > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Add-on Packages:</span>
                  <span className="font-medium">{formatCurrency(result.addOns)}</span>
                </div>
              )}

              <div className="border-t pt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="font-bold text-gray-900">{formatCurrency(result.total)}</span>
                </div>

                {essexDiscount && (
                  <div className="flex justify-between text-green-600 mt-2">
                    <span>With Essex Discount:</span>
                    <span className="font-bold">{formatCurrency(result.withDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Per Person:</span>
                  <span>
                    {formatCurrency(
                      essexDiscount ? result.withDiscount / travelers : result.perPerson
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 space-y-3">
              <a
                href="tel:833-874-1019"
                className="block w-full text-center px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
              >
                Get Exact Quote: 833-874-1019
              </a>

              <button
                onClick={() => {
                  const text = `Cruise Quote:\n${CRUISE_LINES[cruiseLine].name} - ${cruiseLength} days\n${travelers} travelers in ${cabinType} cabin\nEstimated Total: ${formatCurrency(essexDiscount ? result.withDiscount : result.total)}`
                  navigator.clipboard.writeText(text)
                  alert('Quote copied to clipboard!')
                }}
                className="block w-full text-center px-4 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
              >
                Copy Quote
              </button>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 mt-4">
              * Prices are estimates based on average rates. Actual prices may vary based on sailing
              date, availability, and promotions. Contact us for exact pricing.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
