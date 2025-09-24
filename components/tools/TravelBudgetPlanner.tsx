'use client'

import { useState, useEffect } from 'react'

// Currency exchange rates (simplified - in production, use a real API)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  MXN: 17.05,
  JMD: 155.5,
  BSD: 1.0, // Bahamian Dollar
  BBD: 2.0, // Barbadian Dollar
  XCD: 2.7, // Eastern Caribbean Dollar
}

interface BudgetCategory {
  name: string
  items: BudgetItem[]
  total: number
}

interface BudgetItem {
  name: string
  amount: number
  quantity: number
  notes?: string
}

const DEFAULT_CATEGORIES: BudgetCategory[] = [
  {
    name: 'Pre-Trip Costs',
    total: 0,
    items: [
      { name: 'Flights/Transportation', amount: 0, quantity: 1 },
      { name: 'Hotels (pre/post cruise)', amount: 0, quantity: 1 },
      { name: 'Cruise Fare', amount: 0, quantity: 1 },
      { name: 'Travel Insurance', amount: 0, quantity: 1 },
      { name: 'Parking (Newark Airport)', amount: 0, quantity: 1 },
      { name: 'Pet Care', amount: 0, quantity: 1 },
    ],
  },
  {
    name: 'Onboard Expenses',
    total: 0,
    items: [
      { name: 'Drink Package', amount: 0, quantity: 1 },
      { name: 'Specialty Dining', amount: 0, quantity: 1 },
      { name: 'Spa Services', amount: 0, quantity: 1 },
      { name: 'Photos', amount: 0, quantity: 1 },
      { name: 'WiFi/Internet', amount: 0, quantity: 1 },
      { name: 'Casino Budget', amount: 0, quantity: 1 },
      { name: 'Gratuities', amount: 0, quantity: 1 },
      { name: 'Bingo/Activities', amount: 0, quantity: 1 },
    ],
  },
  {
    name: 'Shore Excursions',
    total: 0,
    items: [
      { name: 'Port 1 Excursion', amount: 0, quantity: 1 },
      { name: 'Port 2 Excursion', amount: 0, quantity: 1 },
      { name: 'Port 3 Excursion', amount: 0, quantity: 1 },
      { name: 'Port 4 Excursion', amount: 0, quantity: 1 },
      { name: 'Beach Day Expenses', amount: 0, quantity: 1 },
      { name: 'Local Transportation', amount: 0, quantity: 1 },
    ],
  },
  {
    name: 'Shopping & Souvenirs',
    total: 0,
    items: [
      { name: 'Souvenirs/Gifts', amount: 0, quantity: 1 },
      { name: 'Duty-Free Shopping', amount: 0, quantity: 1 },
      { name: 'Local Crafts/Art', amount: 0, quantity: 1 },
      { name: 'Clothing/Jewelry', amount: 0, quantity: 1 },
    ],
  },
  {
    name: 'Miscellaneous',
    total: 0,
    items: [
      { name: 'Port Day Meals', amount: 0, quantity: 1 },
      { name: 'Tips (tours, taxis)', amount: 0, quantity: 1 },
      { name: 'Emergency Fund', amount: 0, quantity: 1 },
      { name: 'Currency Exchange Fees', amount: 0, quantity: 1 },
    ],
  },
]

export default function TravelBudgetPlanner() {
  const [categories, setCategories] = useState<BudgetCategory[]>(DEFAULT_CATEGORIES)
  const [currency, setCurrency] = useState<string>('USD')
  const [travelers, setTravelers] = useState(2)
  const [showPerPerson, setShowPerPerson] = useState(false)
  const [customCategory, setCustomCategory] = useState('')
  const [customItem, setCustomItem] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(0)

  // Calculate totals
  const calculateTotals = () => {
    const updated = categories.map((category) => ({
      ...category,
      total: category.items.reduce((sum, item) => sum + item.amount * item.quantity, 0),
    }))
    setCategories(updated)
  }

  // Update item amount
  const updateItem = (
    categoryIndex: number,
    itemIndex: number,
    field: 'amount' | 'quantity',
    value: number
  ) => {
    const updated = [...categories]
    updated[categoryIndex].items[itemIndex][field] = value
    setCategories(updated)
    calculateTotals()
  }

  // Add custom item
  const addCustomItem = () => {
    if (customItem.trim() && selectedCategory >= 0) {
      const updated = [...categories]
      updated[selectedCategory].items.push({
        name: customItem.trim(),
        amount: 0,
        quantity: 1,
      })
      setCategories(updated)
      setCustomItem('')
    }
  }

  // Remove item
  const removeItem = (categoryIndex: number, itemIndex: number) => {
    const updated = [...categories]
    updated[categoryIndex].items.splice(itemIndex, 1)
    setCategories(updated)
    calculateTotals()
  }

  // Add custom category
  const addCustomCategory = () => {
    if (customCategory.trim()) {
      setCategories([
        ...categories,
        {
          name: customCategory.trim(),
          total: 0,
          items: [],
        },
      ])
      setCustomCategory('')
    }
  }

  // Load saved budget
  useEffect(() => {
    const saved = localStorage.getItem('travelBudget')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setCategories(data.categories || DEFAULT_CATEGORIES)
        setCurrency(data.currency || 'USD')
        setTravelers(data.travelers || 2)
      } catch (e) {
        // Ignore invalid data
      }
    }
  }, [])

  // Save budget
  const saveBudget = () => {
    const data = {
      categories,
      currency,
      travelers,
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem('travelBudget', JSON.stringify(data))
    alert('Budget saved successfully!')
  }

  // Export budget
  const exportBudget = () => {
    const total = categories.reduce((sum, cat) => sum + cat.total, 0)
    const perPerson = total / travelers

    let text = `Travel Budget Summary\n`
    text += `========================\n\n`
    text += `Date: ${new Date().toLocaleDateString()}\n`
    text += `Travelers: ${travelers}\n`
    text += `Currency: ${currency}\n\n`

    categories.forEach((category) => {
      if (category.total > 0) {
        text += `${category.name}\n`
        text += `-----------------------\n`
        category.items.forEach((item) => {
          if (item.amount > 0) {
            const itemTotal = item.amount * item.quantity
            text += `${item.name}: ${formatCurrency(itemTotal, currency)}`
            if (item.quantity > 1) {
              text += ` (${item.quantity} × ${formatCurrency(item.amount, currency)})`
            }
            text += '\n'
          }
        })
        text += `Subtotal: ${formatCurrency(category.total, currency)}\n\n`
      }
    })

    text += `========================\n`
    text += `GRAND TOTAL: ${formatCurrency(total, currency)}\n`
    text += `Per Person: ${formatCurrency(perPerson, currency)}\n`

    // Create download
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `travel-budget-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
  }

  const formatCurrency = (amount: number, curr: string = currency) => {
    const converted = amount * (EXCHANGE_RATES[curr] || 1)
    const symbol = curr === 'USD' ? '$' : curr === 'EUR' ? '€' : curr === 'GBP' ? '£' : curr
    return `${symbol}${converted.toFixed(2)}`
  }

  const grandTotal = categories.reduce((sum, cat) => sum + cat.total, 0)
  const perPersonTotal = grandTotal / travelers

  // Budget recommendations based on total
  const getBudgetAdvice = () => {
    const emergencyFund =
      categories
        .find((c) => c.name === 'Miscellaneous')
        ?.items.find((i) => i.name === 'Emergency Fund')?.amount || 0
    const emergencyPercent = (emergencyFund / grandTotal) * 100

    if (emergencyPercent < 5 && grandTotal > 0) {
      return 'Consider increasing your emergency fund to at least 5-10% of your total budget.'
    }
    if (grandTotal > 10000) {
      return 'For high-value trips, ensure you have adequate travel insurance coverage.'
    }
    if (grandTotal < 2000 && travelers === 2) {
      return 'Great budget planning! Remember to account for all onboard expenses and gratuities.'
    }
    return 'Looking good! Double-check that all categories are accounted for.'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Travel Budget Planner</h2>

      {/* Settings */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Travelers
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.keys(EXCHANGE_RATES).map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showPerPerson}
              onChange={(e) => setShowPerPerson(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show per person</span>
          </label>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="space-y-6">
        {categories.map((category, catIndex) => (
          <div key={catIndex} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <div className="text-lg font-bold text-blue-600">
                {formatCurrency(showPerPerson ? category.total / travelers : category.total)}
              </div>
            </div>

            <div className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        const updated = [...categories]
                        updated[catIndex].items[itemIndex].name = e.target.value
                        setCategories(updated)
                      }}
                      className="w-full px-2 py-1 text-sm border border-gray-200 rounded"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.amount}
                      onChange={(e) =>
                        updateItem(catIndex, itemIndex, 'amount', Number(e.target.value))
                      }
                      placeholder="Amount"
                      className="w-full px-2 py-1 text-sm border border-gray-200 rounded"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(catIndex, itemIndex, 'quantity', Number(e.target.value))
                      }
                      placeholder="Qty"
                      className="w-full px-2 py-1 text-sm border border-gray-200 rounded"
                    />
                  </div>
                  <div className="col-span-1 text-right text-sm font-medium">
                    {formatCurrency(item.amount * item.quantity)}
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={() => removeItem(catIndex, itemIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add item to category */}
            {catIndex === selectedCategory && (
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={customItem}
                  onChange={(e) => setCustomItem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                  placeholder="Add new item..."
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                />
                <button
                  onClick={addCustomItem}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            )}

            {catIndex !== selectedCategory && (
              <button
                onClick={() => setSelectedCategory(catIndex)}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700"
              >
                + Add item
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Category */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addCustomCategory()}
          placeholder="Add new category..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={addCustomCategory}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Add Category
        </button>
      </div>

      {/* Totals */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="space-y-2">
          <div className="flex justify-between text-lg">
            <span className="font-bold text-gray-900">Grand Total:</span>
            <span className="font-bold text-blue-600">{formatCurrency(grandTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Per Person:</span>
            <span className="font-medium">{formatCurrency(perPersonTotal)}</span>
          </div>
        </div>

        {/* Budget Advice */}
        <div className="mt-4 p-3 bg-white rounded border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>Budget Tip:</strong> {getBudgetAdvice()}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={saveBudget}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
        >
          Save Budget
        </button>
        <button
          onClick={exportBudget}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Export Budget
        </button>
        <button
          onClick={() => {
            if (window.confirm('Reset all values to zero?')) {
              setCategories(DEFAULT_CATEGORIES)
            }
          }}
          className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300"
        >
          Reset All
        </button>
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Need help planning your travel budget? Our experts can help!
        </p>
        <a
          href="tel:833-874-1019"
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Call 833-874-1019
        </a>
      </div>
    </div>
  )
}
