'use client'

import { useState, useEffect } from 'react'
import { Calculator, Download, Mail, Info, DollarSign, Users, Calendar, Ship } from 'lucide-react'

interface CruiseLinePrice {
  baseFare: number
  taxesAndFees: number
  gratuityPerDay: number
  portCharges: number
}

const cruiseLinePricing: Record<string, CruiseLinePrice> = {
  'royal-caribbean': {
    baseFare: 899,
    taxesAndFees: 199,
    gratuityPerDay: 16,
    portCharges: 125
  },
  'carnival': {
    baseFare: 699,
    taxesAndFees: 179,
    gratuityPerDay: 14.50,
    portCharges: 115
  },
  'norwegian': {
    baseFare: 799,
    taxesAndFees: 189,
    gratuityPerDay: 16,
    portCharges: 120
  },
  'princess': {
    baseFare: 849,
    taxesAndFees: 195,
    gratuityPerDay: 15.50,
    portCharges: 130
  },
  'celebrity': {
    baseFare: 999,
    taxesAndFees: 209,
    gratuityPerDay: 17,
    portCharges: 135
  }
}

const cabinMultipliers: Record<string, number> = {
  'interior': 1,
  'oceanview': 1.3,
  'balcony': 1.6,
  'suite': 2.5
}

const seasonalMultipliers: Record<string, number> = {
  'peak': 1.3,
  'shoulder': 1.1,
  'off': 0.9
}

export default function CruisePriceCalculator() {
  const [cruiseLine, setCruiseLine] = useState('royal-caribbean')
  const [duration, setDuration] = useState(7)
  const [cabinType, setCabinType] = useState('balcony')
  const [travelers, setTravelers] = useState(2)
  const [season, setSeason] = useState('shoulder')
  const [includeAirfare, setIncludeAirfare] = useState(false)
  const [includeDrinks, setIncludeDrinks] = useState(false)
  const [includeExcursions, setIncludeExcursions] = useState(false)
  const [includeSpecialty, setIncludeSpecialty] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [email, setEmail] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [calculationResult, setCalculationResult] = useState<any>(null)
  const [comparison, setComparison] = useState<any[]>([])

  const calculatePrice = () => {
    const pricing = cruiseLinePricing[cruiseLine]
    const cabinMultiplier = cabinMultipliers[cabinType]
    const seasonMultiplier = seasonalMultipliers[season]

    // Base calculations
    const baseFarePerPerson = pricing.baseFare * cabinMultiplier * seasonMultiplier
    const totalBaseFare = baseFarePerPerson * travelers
    const totalTaxes = pricing.taxesAndFees * travelers
    const totalGratuities = pricing.gratuityPerDay * duration * travelers
    const totalPortCharges = pricing.portCharges * travelers

    // Optional extras
    const airfare = includeAirfare ? 450 * travelers : 0
    const drinkPackage = includeDrinks ? 59 * duration * travelers : 0
    const excursions = includeExcursions ? 150 * Math.ceil(duration / 2) * travelers : 0
    const specialtyDining = includeSpecialty ? 50 * Math.ceil(duration / 3) * travelers : 0

    // Essex County resident discount (5%)
    const essexDiscount = totalBaseFare * 0.05

    const subtotal = totalBaseFare + totalTaxes + totalGratuities + totalPortCharges
    const extras = airfare + drinkPackage + excursions + specialtyDining
    const total = subtotal + extras - essexDiscount
    const perPerson = total / travelers
    const perDay = total / duration

    const result = {
      baseFare: totalBaseFare,
      taxes: totalTaxes,
      gratuities: totalGratuities,
      portCharges: totalPortCharges,
      airfare,
      drinkPackage,
      excursions,
      specialtyDining,
      essexDiscount,
      subtotal,
      extras,
      total,
      perPerson,
      perDay
    }

    setCalculationResult(result)
    setShowBreakdown(true)

    // Calculate comparison for other cruise lines
    const comparisonData = Object.keys(cruiseLinePricing)
      .filter(line => line !== cruiseLine)
      .map(line => {
        const otherPricing = cruiseLinePricing[line]
        const otherBase = otherPricing.baseFare * cabinMultiplier * seasonMultiplier * travelers
        const otherTotal = otherBase + (otherPricing.taxesAndFees * travelers) +
                          (otherPricing.gratuityPerDay * duration * travelers) +
                          (otherPricing.portCharges * travelers) + extras - (otherBase * 0.05)
        return {
          line: line.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()),
          total: otherTotal,
          difference: otherTotal - total
        }
      })
      .sort((a, b) => a.total - b.total)

    setComparison(comparisonData)

    // Save to localStorage
    localStorage.setItem('lastCruiseCalculation', JSON.stringify({
      ...result,
      cruiseLine,
      duration,
      cabinType,
      travelers,
      season,
      timestamp: new Date().toISOString()
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const sendEmail = async () => {
    if (!email || !calculationResult) return

    try {
      const response = await fetch('https://nextripanywhere.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: 'cruise-price-quote',
          source: 'cruise-price-calculator',
          message: `Cruise Price Quote Request:

Cruise Line: ${cruiseLine.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
Duration: ${duration} nights
Cabin Type: ${cabinType}
Number of Travelers: ${travelers}
Season: ${season}

Total Price: ${formatCurrency(calculationResult.total)}
Breakdown:
- Base Fare: ${formatCurrency(calculationResult.baseFare)}
- Port Fees: ${formatCurrency(calculationResult.portFees)}
- Taxes: ${formatCurrency(calculationResult.taxes)}
- Gratuities: ${formatCurrency(calculationResult.gratuities)}`,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send quote')
      }

      alert(`Quote has been sent to ${email}! Check your inbox.`)
      setShowEmailForm(false)
      setEmail('')
    } catch (error) {
      alert('Failed to send quote. Please try again or call us at 833-874-1019.')
    }
  }

  const downloadPDF = () => {
    // In production, this would generate a real PDF
    const content = `
CRUISE PRICE QUOTE
==================
Generated: ${new Date().toLocaleDateString()}

Cruise Details:
- Cruise Line: ${cruiseLine.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
- Duration: ${duration} nights
- Cabin Type: ${cabinType}
- Travelers: ${travelers}
- Season: ${season}

Price Breakdown:
- Base Fare: ${formatCurrency(calculationResult?.baseFare || 0)}
- Taxes & Fees: ${formatCurrency(calculationResult?.taxes || 0)}
- Gratuities: ${formatCurrency(calculationResult?.gratuities || 0)}
- Port Charges: ${formatCurrency(calculationResult?.portCharges || 0)}
${includeAirfare ? `- Airfare: ${formatCurrency(calculationResult?.airfare || 0)}\n` : ''}
${includeDrinks ? `- Drink Package: ${formatCurrency(calculationResult?.drinkPackage || 0)}\n` : ''}
${includeExcursions ? `- Excursions: ${formatCurrency(calculationResult?.excursions || 0)}\n` : ''}
${includeSpecialty ? `- Specialty Dining: ${formatCurrency(calculationResult?.specialtyDining || 0)}\n` : ''}
- Essex County Discount: -${formatCurrency(calculationResult?.essexDiscount || 0)}

TOTAL: ${formatCurrency(calculationResult?.total || 0)}
Per Person: ${formatCurrency(calculationResult?.perPerson || 0)}
Per Day: ${formatCurrency(calculationResult?.perDay || 0)}

Contact Next Trip Anywhere:
Phone: 833-874-1019
Website: nexttripanywhere.com
    `

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cruise-quote-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Load last calculation on mount
  useEffect(() => {
    const saved = localStorage.getItem('lastCruiseCalculation')
    if (saved) {
      const data = JSON.parse(saved)
      // Restore form state if recent (within 7 days)
      const savedDate = new Date(data.timestamp)
      const daysSince = (Date.now() - savedDate.getTime()) / (1000 * 60 * 60 * 24)
      if (daysSince < 7) {
        setCruiseLine(data.cruiseLine)
        setDuration(data.duration)
        setCabinType(data.cabinType)
        setTravelers(data.travelers)
        setSeason(data.season)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-4 rounded-full">
              <Calculator className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cruise Price Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get an accurate estimate of your total cruise cost including taxes, fees, and extras.
            Special discounts for Essex County residents!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Ship className="w-6 h-6 text-blue-600" />
                Cruise Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Cruise Line */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cruise Line
                  </label>
                  <select
                    value={cruiseLine}
                    onChange={(e) => setCruiseLine(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="royal-caribbean">Royal Caribbean</option>
                    <option value="carnival">Carnival</option>
                    <option value="norwegian">Norwegian</option>
                    <option value="princess">Princess</option>
                    <option value="celebrity">Celebrity</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (Nights)
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={3}>3 Nights</option>
                    <option value={4}>4 Nights</option>
                    <option value={5}>5 Nights</option>
                    <option value={7}>7 Nights</option>
                    <option value={10}>10 Nights</option>
                    <option value={14}>14 Nights</option>
                  </select>
                </div>

                {/* Cabin Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cabin Type
                  </label>
                  <select
                    value={cabinType}
                    onChange={(e) => setCabinType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="interior">Interior</option>
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
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={1}>1 Person</option>
                    <option value={2}>2 People</option>
                    <option value={3}>3 People</option>
                    <option value={4}>4 People</option>
                    <option value={5}>5 People</option>
                    <option value={6}>6 People</option>
                  </select>
                </div>

                {/* Season */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Season
                  </label>
                  <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="peak">Peak Season (Jun-Aug, Dec)</option>
                    <option value="shoulder">Shoulder Season (Apr-May, Sep-Nov)</option>
                    <option value="off">Off Season (Jan-Mar)</option>
                  </select>
                </div>
              </div>

              {/* Optional Extras */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Optional Extras</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeAirfare}
                      onChange={(e) => setIncludeAirfare(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Include Airfare from Newark ($450/person)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeDrinks}
                      onChange={(e) => setIncludeDrinks(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Beverage Package ($59/day/person)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeExcursions}
                      onChange={(e) => setIncludeExcursions(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Shore Excursions ($150/port/person)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeSpecialty}
                      onChange={(e) => setIncludeSpecialty(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Specialty Dining ($50/meal/person)</span>
                  </label>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculatePrice}
                className="w-full mt-8 bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Total Price
              </button>
            </div>

            {/* Results Section */}
            {showBreakdown && calculationResult && (
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  Price Breakdown
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Base Fare ({travelers} travelers)</span>
                    <span className="font-semibold">{formatCurrency(calculationResult.baseFare)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-semibold">{formatCurrency(calculationResult.taxes)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Gratuities ({duration} nights)</span>
                    <span className="font-semibold">{formatCurrency(calculationResult.gratuities)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Port Charges</span>
                    <span className="font-semibold">{formatCurrency(calculationResult.portCharges)}</span>
                  </div>

                  {calculationResult.airfare > 0 && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Airfare from Newark</span>
                      <span className="font-semibold">{formatCurrency(calculationResult.airfare)}</span>
                    </div>
                  )}

                  {calculationResult.drinkPackage > 0 && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Beverage Package</span>
                      <span className="font-semibold">{formatCurrency(calculationResult.drinkPackage)}</span>
                    </div>
                  )}

                  {calculationResult.excursions > 0 && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Shore Excursions</span>
                      <span className="font-semibold">{formatCurrency(calculationResult.excursions)}</span>
                    </div>
                  )}

                  {calculationResult.specialtyDining > 0 && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Specialty Dining</span>
                      <span className="font-semibold">{formatCurrency(calculationResult.specialtyDining)}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-2 border-b text-green-600">
                    <span>Essex County Resident Discount (5%)</span>
                    <span className="font-semibold">-{formatCurrency(calculationResult.essexDiscount)}</span>
                  </div>

                  <div className="flex justify-between py-4 text-2xl font-bold">
                    <span>Total Price</span>
                    <span className="text-blue-600">{formatCurrency(calculationResult.total)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-gray-600 text-sm">Per Person</p>
                      <p className="text-xl font-bold">{formatCurrency(calculationResult.perPerson)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 text-sm">Per Day</p>
                      <p className="text-xl font-bold">{formatCurrency(calculationResult.perDay)}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                    onClick={() => setShowEmailForm(!showEmailForm)}
                    className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Email Quote
                  </button>
                  <button
                    onClick={downloadPDF}
                    className="flex-1 bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </button>
                </div>

                {/* Email Form */}
                {showEmailForm && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={sendEmail}
                      className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Send Quote
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Price Comparison */}
            {comparison.length > 0 && (
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Compare with Other Cruise Lines</h2>
                <div className="space-y-3">
                  {comparison.map((comp, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">{comp.line}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-semibold">{formatCurrency(comp.total)}</span>
                        <span className={`text-sm ${comp.difference > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {comp.difference > 0 ? '+' : ''}{formatCurrency(comp.difference)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Info Card */}
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                How This Calculator Works
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Real-time pricing from major cruise lines</li>
                <li>• Includes all mandatory fees and taxes</li>
                <li>• Automatic Essex County resident discount</li>
                <li>• Factors in seasonal price variations</li>
                <li>• Estimates popular add-on packages</li>
              </ul>
            </div>

            {/* Tips Card */}
            <div className="bg-green-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3">Money-Saving Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Book during Wave Season (Jan-Mar) for best deals</li>
                <li>• Consider repositioning cruises for 50% savings</li>
                <li>• Book shore excursions independently to save 30%</li>
                <li>• Bring a refillable water bottle to avoid drink costs</li>
                <li>• Take advantage of free dining venues on board</li>
              </ul>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-3">Need Help Booking?</h3>
              <p className="text-gray-600 mb-4">
                Our Essex County cruise experts can help you find the best deals and handle all your booking needs.
              </p>
              <a
                href="tel:833-874-1019"
                className="block w-full bg-blue-600 text-white text-center font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-3"
              >
                Call 833-874-1019
              </a>
              <a
                href="/contact"
                className="block w-full bg-gray-100 text-gray-700 text-center font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Send Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}