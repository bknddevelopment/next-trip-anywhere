'use client'

import { useState, useEffect } from 'react'

// Packing lists by destination
const DESTINATION_ITEMS = {
  caribbean: {
    name: 'Caribbean',
    essentials: [
      'Reef-safe sunscreen (SPF 50+)',
      'Multiple swimsuits',
      'Beach cover-ups',
      'Water shoes',
      'Snorkel gear (optional)',
      'Light cotton clothing',
      'Insect repellent',
      'Aloe vera gel',
    ],
    climate: 'tropical',
  },
  alaska: {
    name: 'Alaska',
    essentials: [
      'Waterproof jacket',
      'Layered clothing',
      'Warm sweater/fleece',
      'Waterproof boots',
      'Binoculars',
      'Gloves and hat',
      'Rain pants',
      'Camera with extra batteries',
    ],
    climate: 'cold',
  },
  mediterranean: {
    name: 'Mediterranean',
    essentials: [
      'Comfortable walking shoes',
      'Sun hat',
      'Light scarves for churches',
      'Modest clothing for religious sites',
      'Sunglasses',
      'Light jacket for evenings',
      'Day backpack',
      'Euros/local currency',
    ],
    climate: 'moderate',
  },
  bahamas: {
    name: 'Bahamas',
    essentials: [
      'Beach towels',
      'Waterproof phone case',
      'Cash for local vendors',
      'Light rain jacket',
      'Sandals and flip-flops',
      'Dry bag for excursions',
      'Underwater camera',
      'Beach bag',
    ],
    climate: 'tropical',
  },
  bermuda: {
    name: 'Bermuda',
    essentials: [
      'Smart casual evening wear',
      'Golf attire (if golfing)',
      'Light sweater',
      'Dress shoes',
      'Beach gear',
      'Moped helmet liner',
      'Portable umbrella',
      'Bermuda shorts',
    ],
    climate: 'subtropical',
  },
  transatlantic: {
    name: 'Transatlantic',
    essentials: [
      'Extra formal wear',
      'Books/e-reader',
      'Seasickness remedies',
      'Warm layers',
      'Entertainment items',
      'Extra medications',
      'Binoculars for whale watching',
      'Journal/notebook',
    ],
    climate: 'varied',
  },
}

// Base packing items for all cruises
const BASE_ITEMS = {
  documents: [
    'Passport (valid 6+ months)',
    "Driver's license",
    'Cruise documents',
    'Travel insurance info',
    'Credit cards (2+)',
    'Cash in small bills',
    'Emergency contact list',
    'Medication prescriptions',
  ],
  clothing: [
    'Underwear (1.5x days)',
    'Socks (1.5x days)',
    'Pajamas (2-3 sets)',
    'Casual daywear',
    'Shorts/pants',
    'T-shirts/tops',
    'Light jacket/cardigan',
    'Comfortable walking shoes',
  ],
  toiletries: [
    'Toothbrush & toothpaste',
    'Shampoo & conditioner',
    'Body wash/soap',
    'Deodorant',
    'Razor & shaving cream',
    'Medications',
    'First-aid kit',
    'Hand sanitizer',
    'Face wash',
    'Moisturizer',
  ],
  cabin: [
    'Magnetic hooks (8-10)',
    'Over-door shoe organizer',
    'Power strip (non-surge)',
    'Nightlight',
    'Packing cubes',
    'Laundry bag',
    'Air freshener',
    'Command strips',
    'Small fan (optional)',
    'Highlander/duct tape',
  ],
  electronics: [
    'Phone charger',
    'Camera & charger',
    'Portable battery pack',
    'Universal adapter',
    'Headphones/earbuds',
    'Tablet/e-reader',
    'Extension cord',
    'Waterproof phone case',
  ],
}

interface ChecklistItem {
  item: string
  checked: boolean
  category: string
}

export default function PackingChecklist() {
  const [destination, setDestination] = useState<keyof typeof DESTINATION_ITEMS>('caribbean')
  const [tripLength, setTripLength] = useState(7)
  const [season, setSeason] = useState<'summer' | 'winter' | 'spring' | 'fall'>('summer')
  const [formalNights, setFormalNights] = useState(2)
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [customItems, setCustomItems] = useState<string[]>([])
  const [newItem, setNewItem] = useState('')

  // Generate checklist based on selections
  useEffect(() => {
    const items: ChecklistItem[] = []

    // Add base items
    Object.entries(BASE_ITEMS).forEach(([category, categoryItems]) => {
      categoryItems.forEach((item) => {
        items.push({ item, checked: false, category })
      })
    })

    // Add destination-specific items
    const destItems = DESTINATION_ITEMS[destination]
    destItems.essentials.forEach((item) => {
      items.push({ item, checked: false, category: 'destination' })
    })

    // Add formal wear based on formal nights
    if (formalNights > 0) {
      items.push(
        { item: `Formal outfits (${formalNights} sets)`, checked: false, category: 'clothing' },
        { item: 'Dress shoes', checked: false, category: 'clothing' },
        { item: 'Evening bag/clutch', checked: false, category: 'clothing' },
        { item: 'Jewelry/accessories', checked: false, category: 'clothing' }
      )
    }

    // Add seasonal items
    if (season === 'winter' || (season === 'fall' && destItems.climate !== 'tropical')) {
      items.push(
        { item: 'Warm jacket', checked: false, category: 'clothing' },
        { item: 'Gloves', checked: false, category: 'clothing' },
        { item: 'Warm hat', checked: false, category: 'clothing' }
      )
    }

    if (season === 'summer' || destItems.climate === 'tropical') {
      items.push(
        { item: 'Swimsuit cover-up', checked: false, category: 'clothing' },
        { item: 'Sun hat', checked: false, category: 'clothing' },
        { item: 'Sandals', checked: false, category: 'clothing' }
      )
    }

    // Add length-specific items
    if (tripLength > 7) {
      items.push(
        { item: 'Laundry detergent pods', checked: false, category: 'cabin' },
        { item: 'Extra toiletries', checked: false, category: 'toiletries' },
        { item: 'Sewing kit', checked: false, category: 'cabin' }
      )
    }

    // Add custom items
    customItems.forEach((item) => {
      items.push({ item, checked: false, category: 'custom' })
    })

    setChecklist(items)
  }, [destination, tripLength, season, formalNights, customItems])

  // Load saved checklist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('packingChecklist')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setChecklist(data.checklist || [])
        setCustomItems(data.customItems || [])
        setDestination(data.destination || 'caribbean')
        setTripLength(data.tripLength || 7)
        setSeason(data.season || 'summer')
        setFormalNights(data.formalNights || 2)
      } catch (e) {
        // Ignore invalid data
      }
    }
  }, [])

  // Save checklist to localStorage
  const saveChecklist = () => {
    const data = {
      checklist,
      customItems,
      destination,
      tripLength,
      season,
      formalNights,
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem('packingChecklist', JSON.stringify(data))
  }

  const toggleItem = (index: number) => {
    const updated = [...checklist]
    updated[index].checked = !updated[index].checked
    setChecklist(updated)
  }

  const addCustomItem = () => {
    if (newItem.trim()) {
      setCustomItems([...customItems, newItem.trim()])
      setNewItem('')
    }
  }

  const removeCustomItem = (item: string) => {
    setCustomItems(customItems.filter((i) => i !== item))
  }

  const printChecklist = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      return
    }

    const html = `
      <html>
        <head>
          <title>Cruise Packing Checklist</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1e40af; }
            .category { margin: 20px 0; }
            .category-title { font-weight: bold; color: #374151; margin-bottom: 10px; }
            .item { margin: 5px 0; }
            .checked { text-decoration: line-through; color: #9ca3af; }
            .info { background: #f3f4f6; padding: 10px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>Cruise Packing Checklist</h1>
          <div class="info">
            <p><strong>Destination:</strong> ${DESTINATION_ITEMS[destination].name}</p>
            <p><strong>Trip Length:</strong> ${tripLength} days</p>
            <p><strong>Season:</strong> ${season}</p>
            <p><strong>Formal Nights:</strong> ${formalNights}</p>
          </div>
          ${Object.entries(
            checklist.reduce(
              (acc, item) => {
                if (!acc[item.category]) {
                  acc[item.category] = []
                }
                acc[item.category].push(item)
                return acc
              },
              {} as Record<string, ChecklistItem[]>
            )
          )
            .map(
              ([category, items]) => `
            <div class="category">
              <div class="category-title">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
              ${items
                .map(
                  (item) => `
                <div class="item ${item.checked ? 'checked' : ''}">
                  ☐ ${item.item}
                </div>
              `
                )
                .join('')}
            </div>
          `
            )
            .join('')}
        </body>
      </html>
    `

    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.print()
  }

  const progress =
    Math.round((checklist.filter((item) => item.checked).length / checklist.length) * 100) || 0

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Packing Checklist Generator</h2>

      {/* Settings */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value as keyof typeof DESTINATION_ITEMS)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(DESTINATION_ITEMS).map(([key, dest]) => (
              <option key={key} value={key}>
                {dest.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trip Length</label>
          <select
            value={tripLength}
            onChange={(e) => setTripLength(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[3, 4, 5, 7, 10, 14].map((days) => (
              <option key={days} value={days}>
                {days} days
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value as typeof season)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Formal Nights</label>
          <select
            value={formalNights}
            onChange={(e) => setFormalNights(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[0, 1, 2, 3, 4].map((nights) => (
              <option key={nights} value={nights}>
                {nights} {nights === 1 ? 'night' : 'nights'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Packing Progress</span>
          <span>{progress}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-6 mb-6">
        {Object.entries(
          checklist.reduce(
            (acc, item, index) => {
              if (!acc[item.category]) {
                acc[item.category] = []
              }
              acc[item.category].push({ ...item, index })
              return acc
            },
            {} as Record<string, (ChecklistItem & { index: number })[]>
          )
        ).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-semibold text-gray-900 mb-3 capitalize">
              {category === 'destination'
                ? `${DESTINATION_ITEMS[destination].name} Essentials`
                : category}
            </h3>
            <div className="grid md:grid-cols-2 gap-2">
              {items.map((item) => (
                <label key={item.index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(item.index)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span
                    className={`ml-2 text-sm ${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}
                  >
                    {item.item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Items */}
      <div className="border-t pt-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Add Custom Items</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
            placeholder="Add your own item..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCustomItem}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
        {customItems.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {customItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {item}
                <button
                  onClick={() => removeCustomItem(item)}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={saveChecklist}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
        >
          Save Checklist
        </button>
        <button
          onClick={printChecklist}
          className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition"
        >
          Print Checklist
        </button>
        <button
          onClick={() => setChecklist(checklist.map((item) => ({ ...item, checked: false })))}
          className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
        >
          Reset All
        </button>
      </div>

      {/* CTA */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900 mb-2">
          Need help planning your cruise? Our Essex County experts are here to help!
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
