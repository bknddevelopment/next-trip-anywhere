'use client'

import { useState, useEffect } from 'react'
import { DollarSign, Download, Mail, PieChart, TrendingUp, AlertCircle, Info, Calculator, CreditCard } from 'lucide-react'

interface BudgetCategory {
  name: string
  planned: number
  actual: number
  percentage: number
  description: string
  tips: string[]
}

interface BudgetBreakdown {
  categories: BudgetCategory[]
  totalBudget: number
  totalPlanned: number
  totalActual: number
  dailyBudget: number
  emergencyFund: number
  remainingBudget: number
}

const defaultCategories = [
  {
    name: 'Cruise Fare',
    percentage: 40,
    description: 'Base cruise price including taxes and fees',
    tips: [
      'Book during Wave Season (Jan-Mar) for 20-30% savings',
      'Consider repositioning cruises for up to 50% off',
      'Check for Essex County resident discounts'
    ]
  },
  {
    name: 'Airfare',
    percentage: 15,
    description: 'Flights to/from cruise port',
    tips: [
      'Book flights 2-3 months in advance',
      'Use Newark Airport for best connections',
      'Consider cruise line air packages for protection'
    ]
  },
  {
    name: 'Shore Excursions',
    percentage: 15,
    description: 'Port activities and tours',
    tips: [
      'Book independently to save 30-50%',
      'Research free walking tours',
      'Prioritize must-see experiences'
    ]
  },
  {
    name: 'Onboard Spending',
    percentage: 10,
    description: 'Drinks, spa, casino, shopping',
    tips: [
      'Set daily limits for discretionary spending',
      'Buy drink packages if you consume 5+ drinks/day',
      'Take advantage of port day spa discounts'
    ]
  },
  {
    name: 'Dining & Specialty',
    percentage: 8,
    description: 'Specialty restaurants and room service',
    tips: [
      'Lunch at specialty restaurants costs less',
      'Look for dining package deals',
      'Main dining room is always free'
    ]
  },
  {
    name: 'Gratuities',
    percentage: 5,
    description: 'Mandatory service charges',
    tips: [
      'Budget $15-17 per person per day',
      'Pre-pay to avoid surprise charges',
      'Additional tips for exceptional service'
    ]
  },
  {
    name: 'Pre/Post Hotels',
    percentage: 5,
    description: 'Hotels before or after cruise',
    tips: [
      'Stay near Newark Airport for convenience',
      'Book cruise line hotels for guaranteed transfer',
      'Consider arriving a day early'
    ]
  },
  {
    name: 'Miscellaneous',
    percentage: 2,
    description: 'Parking, transfers, insurance',
    tips: [
      'Newark Airport parking: $18-39/day',
      'Travel insurance: 5-10% of trip cost',
      'Factor in pet sitting if needed'
    ]
  }
]

export default function BudgetPlanner() {
  const [totalBudget, setTotalBudget] = useState(5000)
  const [travelers, setTravelers] = useState(2)
  const [duration, setDuration] = useState(7)
  const [budgetType, setBudgetType] = useState('moderate')
  const [categories, setCategories] = useState<BudgetCategory[]>([])
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [customCategory, setCustomCategory] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [email, setEmail] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const budgetMultipliers: Record<string, number> = {
    budget: 0.8,
    moderate: 1.0,
    luxury: 1.5
  }

  const calculateBudget = () => {
    const multiplier = budgetMultipliers[budgetType]
    const adjustedCategories = defaultCategories.map(cat => {
      const planned = Math.round((totalBudget * cat.percentage / 100) * multiplier)
      return {
        ...cat,
        planned,
        actual: 0,
        percentage: cat.percentage
      }
    })

    setCategories(adjustedCategories)
    setShowBreakdown(true)

    // Save to localStorage
    localStorage.setItem('cruiseBudget', JSON.stringify({
      totalBudget,
      travelers,
      duration,
      budgetType,
      categories: adjustedCategories,
      timestamp: new Date().toISOString()
    }))
  }

  const updateActual = (index: number, value: number) => {
    const updated = [...categories]
    updated[index].actual = value
    setCategories(updated)
  }

  const updatePlanned = (index: number, value: number) => {
    const updated = [...categories]
    updated[index].planned = value
    setCategories(updated)
  }

  const addCustomCategory = () => {
    if (!customCategory || !customAmount) return

    const newCategory: BudgetCategory = {
      name: customCategory,
      planned: Number(customAmount),
      actual: 0,
      percentage: 0,
      description: 'Custom expense category',
      tips: []
    }

    setCategories([...categories, newCategory])
    setCustomCategory('')
    setCustomAmount('')
  }

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index))
  }

  const getTotals = (): BudgetBreakdown => {
    const totalPlanned = categories.reduce((sum, cat) => sum + cat.planned, 0)
    const totalActual = categories.reduce((sum, cat) => sum + cat.actual, 0)
    const dailyBudget = Math.round(totalBudget / duration)
    const emergencyFund = Math.round(totalBudget * 0.1)
    const remainingBudget = totalBudget - totalActual

    return {
      categories,
      totalBudget,
      totalPlanned,
      totalActual,
      dailyBudget,
      emergencyFund,
      remainingBudget
    }
  }

  const exportPDF = () => {
    const totals = getTotals()
    const content = `CRUISE BUDGET PLANNER
Generated: ${new Date().toLocaleDateString()}

Trip Details:
- Total Budget: $${totalBudget.toLocaleString()}
- Travelers: ${travelers}
- Duration: ${duration} nights
- Budget Type: ${budgetType.charAt(0).toUpperCase() + budgetType.slice(1)}

Budget Breakdown:
${categories.map(cat => `
${cat.name}:
- Planned: $${cat.planned.toLocaleString()}
- Actual: $${cat.actual.toLocaleString()}
- ${cat.actual > cat.planned ? 'OVER' : 'Under'} Budget: $${Math.abs(cat.actual - cat.planned).toLocaleString()}
`).join('\n')}

Summary:
- Total Planned: $${totals.totalPlanned.toLocaleString()}
- Total Spent: $${totals.totalActual.toLocaleString()}
- Remaining Budget: $${totals.remainingBudget.toLocaleString()}
- Daily Budget: $${totals.dailyBudget.toLocaleString()}
- Emergency Fund: $${totals.emergencyFund.toLocaleString()}

Budget Tips:
- Set daily spending limits
- Track all expenses in real-time
- Keep emergency fund separate
- Review budget mid-cruise

Essex County Savings:
- 5% resident discount on cruise fare
- Free Newark Airport shuttle from some hotels
- Group booking discounts available

Contact Next Trip Anywhere:
Phone: 833-874-1019
Website: nexttripanywhere.com
`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cruise-budget-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const sendEmail = async () => {
    if (!email) return

    try {
      const budgetSummary = `Travel Budget Plan:

Total Budget: $${totalBudget}
Total Allocated: $${totalAllocated}
Remaining: $${remaining}

Categories:
${categories.map(cat => `- ${cat.name}: $${cat.amount} (${cat.percentage.toFixed(1)}%)`).join('\n')}

Budget Tips:
${tips.join('\n- ')}`

      const response = await fetch('https://nextripanywhere.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: 'budget-plan',
          source: 'budget-planner-tool',
          message: budgetSummary,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send budget plan')
      }

      alert(`Budget plan has been sent to ${email}! Check your inbox.`)
      setShowEmailForm(false)
      setEmail('')
    } catch (error) {
      alert('Failed to send budget plan. Please try again or call us at 833-874-1019.')
    }
  }

  // Load saved budget on mount
  useEffect(() => {
    const saved = localStorage.getItem('cruiseBudget')
    if (saved) {
      const data = JSON.parse(saved)
      const savedDate = new Date(data.timestamp)
      const daysSince = (Date.now() - savedDate.getTime()) / (1000 * 60 * 60 * 24)

      if (daysSince < 30) {
        setTotalBudget(data.totalBudget)
        setTravelers(data.travelers)
        setDuration(data.duration)
        setBudgetType(data.budgetType)
        setCategories(data.categories)
        setShowBreakdown(true)
      }
    }
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const totals = getTotals()
  const budgetUsedPercentage = totalBudget > 0 ? (totals.totalActual / totalBudget) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-600 p-4 rounded-full">
              <DollarSign className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cruise Budget Planner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plan and track your entire cruise budget. Set spending limits, monitor expenses,
            and avoid overspending on your vacation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Budget Setup */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-purple-600" />
                Budget Setup
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Total Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Budget
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      min="0"
                      step="100"
                    />
                  </div>
                </div>

                {/* Number of Travelers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value={1}>1 Person</option>
                    <option value={2}>2 People</option>
                    <option value={3}>3 People</option>
                    <option value={4}>4 People</option>
                    <option value={5}>5 People</option>
                    <option value={6}>6 People</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cruise Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value={3}>3 Nights</option>
                    <option value={4}>4 Nights</option>
                    <option value={5}>5 Nights</option>
                    <option value={7}>7 Nights</option>
                    <option value={10}>10 Nights</option>
                    <option value={14}>14 Nights</option>
                  </select>
                </div>

                {/* Budget Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Type
                  </label>
                  <select
                    value={budgetType}
                    onChange={(e) => setBudgetType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="budget">Budget Conscious</option>
                    <option value="moderate">Moderate Spending</option>
                    <option value="luxury">Luxury Experience</option>
                  </select>
                </div>
              </div>

              {/* Budget per person per day */}
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Budget per person per day:</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {formatCurrency(Math.round(totalBudget / travelers / duration))}
                  </span>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateBudget}
                className="w-full mt-8 bg-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <PieChart className="w-5 h-5" />
                Create Budget Plan
              </button>
            </div>

            {/* Budget Breakdown */}
            {showBreakdown && (
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Budget Breakdown</h2>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    {editMode ? 'Save Changes' : 'Edit Budget'}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Budget Used</span>
                    <span className="text-sm font-semibold">
                      {formatCurrency(totals.totalActual)} / {formatCurrency(totalBudget)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all duration-300 ${
                        budgetUsedPercentage > 100 ? 'bg-red-500' :
                        budgetUsedPercentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(budgetUsedPercentage, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {budgetUsedPercentage > 100 && (
                      <span className="text-red-600 font-semibold">
                        ⚠️ Over budget by {formatCurrency(totals.totalActual - totalBudget)}
                      </span>
                    )}
                  </p>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                  {categories.map((category, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                        {editMode && (
                          <button
                            onClick={() => removeCategory(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Planned Budget
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">$</span>
                            <input
                              type="number"
                              value={category.planned}
                              onChange={(e) => updatePlanned(index, Number(e.target.value))}
                              disabled={!editMode}
                              className={`w-full pl-8 pr-3 py-2 border rounded-lg ${
                                editMode
                                  ? 'border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                                  : 'border-gray-200 bg-gray-50'
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Actual Spending
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">$</span>
                            <input
                              type="number"
                              value={category.actual}
                              onChange={(e) => updateActual(index, Number(e.target.value))}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      {category.actual > 0 && (
                        <div className="mt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Status:</span>
                            <span className={`text-sm font-semibold ${
                              category.actual > category.planned ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {category.actual > category.planned
                                ? `Over by ${formatCurrency(category.actual - category.planned)}`
                                : `Under by ${formatCurrency(category.planned - category.actual)}`
                              }
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Tips */}
                      {category.tips.length > 0 && (
                        <details className="mt-3">
                          <summary className="cursor-pointer text-sm text-purple-600 hover:text-purple-700">
                            💡 Money-saving tips
                          </summary>
                          <ul className="mt-2 space-y-1">
                            {category.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-sm text-gray-600">
                                • {tip}
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Custom Category */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Add Custom Category</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Category name"
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Amount"
                      className="w-32 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={addCustomCategory}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-3">Budget Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Total Planned:</span>
                      <span className="font-semibold">{formatCurrency(totals.totalPlanned)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Total Spent:</span>
                      <span className="font-semibold">{formatCurrency(totals.totalActual)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-700 font-semibold">Remaining Budget:</span>
                      <span className={`text-xl font-bold ${
                        totals.remainingBudget < 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {formatCurrency(totals.remainingBudget)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Daily Allowance:</span>
                      <span className="font-semibold">{formatCurrency(totals.dailyBudget)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Emergency Fund (10%):</span>
                      <span className="font-semibold">{formatCurrency(totals.emergencyFund)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                    onClick={exportPDF}
                    className="flex-1 bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Export PDF
                  </button>
                  <button
                    onClick={() => setShowEmailForm(!showEmailForm)}
                    className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Email Budget
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
                      Send Budget Plan
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Budget Tips */}
            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Smart Budget Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Set aside 10% for emergencies</li>
                <li>• Track spending daily on cruise</li>
                <li>• Use ship's app to monitor charges</li>
                <li>• Set onboard spending alerts</li>
                <li>• Prepay gratuities to lock in costs</li>
                <li>• Book excursions early for discounts</li>
              </ul>
            </div>

            {/* Budget Warnings */}
            <div className="bg-yellow-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                Common Budget Pitfalls
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Forgetting gratuities (15-20% extra)</li>
                <li>• WiFi charges ($20-30/day)</li>
                <li>• Specialty dining adds up quickly</li>
                <li>• Casino and bar tabs</li>
                <li>• Professional photos ($200+)</li>
                <li>• Spa treatments at sea prices</li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Payment Planning
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Notify banks of travel dates</li>
                <li>• Bring 2-3 payment methods</li>
                <li>• Cash needed for port vendors</li>
                <li>• No foreign transaction fee cards</li>
                <li>• Set up onboard account carefully</li>
              </ul>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-3">Need Budget Help?</h3>
              <p className="text-gray-600 mb-4">
                Our Essex County travel experts can help you plan a cruise within any budget.
              </p>
              <a
                href="tel:833-874-1019"
                className="block w-full bg-purple-600 text-white text-center font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors mb-3"
              >
                Call 833-874-1019
              </a>
              <a
                href="/contact"
                className="block w-full bg-gray-100 text-gray-700 text-center font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Get Budget Advice
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}