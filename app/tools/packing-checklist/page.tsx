'use client'

import { useState, useEffect } from 'react'
import { CheckSquare, Download, Mail, Printer, Plus, X, Info, Plane, Ship, Sun } from 'lucide-react'

interface ChecklistItem {
  id: string
  item: string
  checked: boolean
  category: string
  quantity?: number
}

const baseItems: Record<string, string[]> = {
  documents: [
    'Passport (valid for 6+ months)',
    "Driver's License",
    'Cruise Documents/Boarding Pass',
    'Travel Insurance Papers',
    'Credit Cards & Cash',
    'Emergency Contact List',
    'Prescription List',
    'Vaccination Card',
  ],
  clothing: [
    'Casual Daywear',
    'Evening/Formal Wear',
    'Swimwear',
    'Cover-ups',
    'Underwear & Socks',
    'Sleepwear',
    'Light Jacket/Sweater',
    'Comfortable Walking Shoes',
    'Dress Shoes',
    'Sandals/Flip Flops',
  ],
  toiletries: [
    'Toothbrush & Toothpaste',
    'Shampoo & Conditioner',
    'Body Wash/Soap',
    'Deodorant',
    'Razor & Shaving Cream',
    'Sunscreen (SPF 30+)',
    'After-Sun Lotion',
    'Moisturizer',
    'Medications',
    'First Aid Kit',
    'Hand Sanitizer',
    'Face Masks',
  ],
  electronics: [
    'Phone & Charger',
    'Camera & Memory Cards',
    'Power Bank',
    'Universal Adapter',
    'Headphones/Earbuds',
    'E-Reader/Tablet',
    'Extension Cord (non-surge)',
    'Waterproof Phone Case',
  ],
  accessories: [
    'Sunglasses',
    'Hat/Cap',
    'Day Backpack/Tote',
    'Reusable Water Bottle',
    'Lanyard for Key Card',
    'Luggage Tags',
    'Zip-Lock Bags',
    'Laundry Bag',
    'Travel Umbrella',
    'Binoculars',
  ],
}

const destinationSpecific: Record<string, string[]> = {
  caribbean: [
    'Reef-Safe Sunscreen',
    'Snorkel Gear (optional)',
    'Beach Towel',
    'Insect Repellent',
    'Light Rain Jacket',
    'Water Shoes',
  ],
  alaska: [
    'Warm Layers',
    'Rain Jacket & Pants',
    'Waterproof Boots',
    'Gloves & Warm Hat',
    'Binoculars for Wildlife',
    'Thermal Underwear',
  ],
  mediterranean: [
    'Modest Clothing for Churches',
    'Comfortable Walking Shoes',
    'Light Scarf/Shawl',
    'Euros/Local Currency',
    'Outlet Adapter (Type C/F)',
    'Phrasebook/Translation App',
  ],
  bahamas: [
    'Beach Games/Toys',
    'Underwater Camera',
    'Extra Swimsuits',
    'Aloe Vera Gel',
    'Beach Bag',
    'Snacks for Excursions',
  ],
  norway: [
    'Heavy Coat',
    'Wool Socks',
    'Fleece or Wool Layers',
    'Waterproof Gloves',
    'Neck Gaiter/Balaclava',
    'Hand Warmers',
  ],
}

const activitySpecific: Record<string, string[]> = {
  'formal-nights': [
    'Formal Dress/Suit',
    'Dress Shoes',
    'Evening Bag/Clutch',
    'Jewelry/Accessories',
    'Bow Tie/Necktie',
    'Dress Socks',
  ],
  'water-sports': [
    'Rash Guard',
    'Water Shoes',
    'Dry Bag',
    'GoPro/Action Camera',
    'Waterproof Watch',
    'Quick-Dry Towel',
  ],
  'shore-excursions': [
    'Comfortable Walking Shoes',
    'Small Backpack',
    'Portable Snacks',
    'Cash for Tips/Vendors',
    'Guidebook/Map',
    'Portable Phone Charger',
  ],
  'spa-wellness': [
    'Workout Clothes',
    'Athletic Shoes',
    'Yoga Mat (travel)',
    'Massage Oil',
    'Face Masks',
    'Nail Care Kit',
  ],
  photography: [
    'Extra Camera Batteries',
    'Lens Cleaning Kit',
    'Tripod',
    'Camera Bag',
    'SD Card Reader',
    'Backup Storage Device',
  ],
}

export default function PackingChecklistGenerator() {
  const [destination, setDestination] = useState('caribbean')
  const [duration, setDuration] = useState(7)
  const [season, setSeason] = useState('summer')
  const [activities, setActivities] = useState<string[]>([])
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [customItem, setCustomItem] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('personal')
  const [showChecklist, setShowChecklist] = useState(false)
  const [email, setEmail] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const generateChecklist = () => {
    const items: ChecklistItem[] = []
    let id = 0

    // Add base items
    Object.entries(baseItems).forEach(([category, categoryItems]) => {
      categoryItems.forEach((item) => {
        items.push({
          id: (id++).toString(),
          item,
          checked: false,
          category,
          quantity:
            item.includes('Underwear') || item.includes('Socks')
              ? Math.ceil(duration * 1.5)
              : undefined,
        })
      })
    })

    // Add destination specific items
    if (destinationSpecific[destination]) {
      destinationSpecific[destination].forEach((item) => {
        items.push({
          id: (id++).toString(),
          item,
          checked: false,
          category: 'destination',
        })
      })
    }

    // Add activity specific items
    activities.forEach((activity) => {
      if (activitySpecific[activity]) {
        activitySpecific[activity].forEach((item) => {
          // Check if item already exists
          if (!items.find((i) => i.item === item)) {
            items.push({
              id: (id++).toString(),
              item,
              checked: false,
              category: 'activities',
            })
          }
        })
      }
    })

    // Add seasonal items
    if (season === 'winter') {
      const winterItems = ['Heavy Coat', 'Warm Gloves', 'Scarf', 'Warm Hat']
      winterItems.forEach((item) => {
        if (!items.find((i) => i.item === item)) {
          items.push({
            id: (id++).toString(),
            item,
            checked: false,
            category: 'seasonal',
          })
        }
      })
    }

    // Add duration-based quantities
    items.forEach((item) => {
      if (item.item.includes('Casual Daywear')) {
        item.quantity = Math.ceil(duration * 0.75)
      }
      if (item.item.includes('Evening/Formal Wear')) {
        item.quantity = duration >= 7 ? 2 : 1
      }
    })

    setChecklist(items)
    setShowChecklist(true)

    // Save to localStorage
    localStorage.setItem(
      'packingChecklist',
      JSON.stringify({
        items,
        destination,
        duration,
        season,
        activities,
        timestamp: new Date().toISOString(),
      })
    )
  }

  const toggleItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
  }

  const addCustomItem = () => {
    if (!customItem.trim()) {
      return
    }

    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      item: customItem,
      checked: false,
      category: selectedCategory,
    }

    setChecklist((prev) => [...prev, newItem])
    setCustomItem('')
  }

  const removeItem = (id: string) => {
    setChecklist((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleActivity = (activity: string) => {
    setActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]
    )
  }

  const printChecklist = () => {
    window.print()
  }

  const downloadChecklist = () => {
    const content = `CRUISE PACKING CHECKLIST
Generated: ${new Date().toLocaleDateString()}
Destination: ${destination.charAt(0).toUpperCase() + destination.slice(1)}
Duration: ${duration} nights
Season: ${season.charAt(0).toUpperCase() + season.slice(1)}

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
${category.toUpperCase()}:
${items
  .map(
    (item) =>
      `${item.checked ? '☑' : '☐'} ${item.item}${item.quantity ? ` (${item.quantity})` : ''}`
  )
  .join('\n')}
`
  )
  .join('\n')}

Newark Airport Tips:
- Arrive 3 hours early for international cruises
- Use Terminal C for most cruise line shuttles
- Pre-book parking at Newark Airport for savings
- TSA PreCheck saves 30+ minutes during peak travel

Contact Next Trip Anywhere:
Phone: 833-874-1019
Website: nexttripanywhere.com
`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `packing-checklist-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const sendEmail = async () => {
    if (!email) {
      return
    }

    try {
      const checkedCount = checklist.filter((item) => item.checked).length
      const checklistSummary = `Packing Checklist for ${destination}:

Destination: ${destination}
Trip Length: ${duration} days
Progress: ${checkedCount}/${checklist.length} items packed

Items:
${checklist.map((item) => `${item.checked ? '✓' : '○'} ${item.item}${item.quantity ? ` (${item.quantity})` : ''}`).join('\n')}`

      const response = await fetch('https://nextripanywhere.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: 'packing-checklist',
          source: 'packing-checklist-tool',
          message: checklistSummary,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send checklist')
      }

      alert(`Checklist has been sent to ${email}! Check your inbox.`)
      setShowEmailForm(false)
      setEmail('')
    } catch (error) {
      alert('Failed to send checklist. Please try again or call us at 833-874-1019.')
    }
  }

  // Load saved checklist on mount
  useEffect(() => {
    const saved = localStorage.getItem('packingChecklist')
    if (saved) {
      const data = JSON.parse(saved)
      const savedDate = new Date(data.timestamp)
      const hoursSince = (Date.now() - savedDate.getTime()) / (1000 * 60 * 60)

      if (hoursSince < 168) {
        // Within 7 days
        setChecklist(data.items)
        setDestination(data.destination)
        setDuration(data.duration)
        setSeason(data.season)
        setActivities(data.activities)
        setShowChecklist(true)
      }
    }
  }, [])

  // Filter checklist based on search
  const filteredChecklist = checklist.filter((item) =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Group checklist by category
  const groupedChecklist = filteredChecklist.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, ChecklistItem[]>
  )

  const categoryLabels: Record<string, string> = {
    documents: 'Travel Documents',
    clothing: 'Clothing & Apparel',
    toiletries: 'Toiletries & Personal Care',
    electronics: 'Electronics & Gadgets',
    accessories: 'Travel Accessories',
    destination: 'Destination Specific',
    activities: 'Activity Gear',
    seasonal: 'Seasonal Items',
    personal: 'Personal Items',
  }

  const progress =
    checklist.length > 0
      ? Math.round((checklist.filter((item) => item.checked).length / checklist.length) * 100)
      : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8 print:bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 print:hidden">
          <div className="flex justify-center mb-4">
            <div className="bg-green-600 p-4 rounded-full">
              <CheckSquare className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Packing Checklist Generator</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create a personalized packing list for your cruise. Never forget essential items again!
            Includes Newark Airport specific tips for Essex County travelers.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generator Form */}
          <div className="lg:col-span-2 print:hidden">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Ship className="w-6 h-6 text-green-600" />
                Trip Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Destination */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cruise Destination
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="caribbean">Caribbean</option>
                    <option value="bahamas">Bahamas</option>
                    <option value="alaska">Alaska</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="norway">Norwegian Fjords</option>
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value={3}>3 Nights</option>
                    <option value={4}>4 Nights</option>
                    <option value={5}>5 Nights</option>
                    <option value={7}>7 Nights</option>
                    <option value={10}>10 Nights</option>
                    <option value={14}>14 Nights</option>
                  </select>
                </div>

                {/* Season */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Season
                  </label>
                  <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="summer">Summer (Jun-Aug)</option>
                    <option value="fall">Fall (Sep-Nov)</option>
                    <option value="winter">Winter (Dec-Feb)</option>
                    <option value="spring">Spring (Mar-May)</option>
                  </select>
                </div>
              </div>

              {/* Activities */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Planned Activities (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.keys(activitySpecific).map((activity) => (
                    <label key={activity} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activities.includes(activity)}
                        onChange={() => toggleActivity(activity)}
                        className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                      />
                      <span className="text-gray-700 capitalize">{activity.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateChecklist}
                className="w-full mt-8 bg-green-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckSquare className="w-5 h-5" />
                Generate Checklist
              </button>
            </div>

            {/* Checklist Display */}
            {showChecklist && (
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6 print:shadow-none">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Your Packing Checklist</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Progress:</span>
                    <div className="w-32 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">{progress}%</span>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="mb-4 print:hidden">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search items..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Checklist Items */}
                <div className="space-y-6">
                  {Object.entries(groupedChecklist).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">
                        {categoryLabels[category] || category}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => toggleItem(item.id)}
                              className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500 print:accent-black"
                            />
                            <span
                              className={`flex-1 ${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}
                            >
                              {item.item}
                              {item.quantity && (
                                <span className="text-sm text-gray-500 ml-2">
                                  ({item.quantity})
                                </span>
                              )}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 print:hidden"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Custom Item */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg print:hidden">
                  <h3 className="font-semibold mb-3">Add Custom Item</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customItem}
                      onChange={(e) => setCustomItem(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                      placeholder="Enter item name"
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="personal">Personal</option>
                      <option value="documents">Documents</option>
                      <option value="clothing">Clothing</option>
                      <option value="toiletries">Toiletries</option>
                      <option value="electronics">Electronics</option>
                      <option value="accessories">Accessories</option>
                    </select>
                    <button
                      onClick={addCustomItem}
                      className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6 print:hidden">
                  <button
                    onClick={printChecklist}
                    className="flex-1 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Printer className="w-5 h-5" />
                    Print Checklist
                  </button>
                  <button
                    onClick={downloadChecklist}
                    className="flex-1 bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button
                    onClick={() => setShowEmailForm(!showEmailForm)}
                    className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </button>
                </div>

                {/* Email Form */}
                {showEmailForm && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg print:hidden">
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
                      Send Checklist
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 print:hidden">
            {/* Newark Airport Tips */}
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Plane className="w-5 h-5 text-blue-600" />
                Newark Airport Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Arrive 3 hours early for international</li>
                <li>• Terminal C for most cruise shuttles</li>
                <li>• Pre-book parking to save 40%</li>
                <li>• TSA PreCheck saves 30+ minutes</li>
                <li>• Download United app for Terminal C</li>
                <li>• Free WiFi: "EWR-FREE-WIFI"</li>
              </ul>
            </div>

            {/* TSA Requirements */}
            <div className="bg-yellow-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-yellow-600" />
                TSA Requirements
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Liquids: 3-1-1 rule (3.4oz containers)</li>
                <li>• Remove shoes, belts, electronics</li>
                <li>• No sharp objects in carry-on</li>
                <li>• Medications allowed in any quantity</li>
                <li>• Power banks in carry-on only</li>
                <li>• Check cruise line alcohol policies</li>
              </ul>
            </div>

            {/* Weather Info */}
            <div className="bg-orange-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Sun className="w-5 h-5 text-orange-600" />
                Weather Essentials
              </h3>
              <div className="text-sm text-gray-700">
                <div className="mb-3">
                  <p className="font-semibold">Caribbean (Year-round):</p>
                  <p>75-85°F, humid, occasional rain</p>
                </div>
                <div className="mb-3">
                  <p className="font-semibold">Alaska (May-Sep):</p>
                  <p>45-65°F, rainy, pack layers</p>
                </div>
                <div>
                  <p className="font-semibold">Mediterranean (Apr-Oct):</p>
                  <p>65-85°F, sunny, light jacket for evening</p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-3">Need Packing Advice?</h3>
              <p className="text-gray-600 mb-4">
                Our travel experts can help you prepare for any cruise destination.
              </p>
              <a
                href="tel:833-874-1019"
                className="block w-full bg-green-600 text-white text-center font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors mb-3"
              >
                Call 833-874-1019
              </a>
              <a
                href="/contact"
                className="block w-full bg-gray-100 text-gray-700 text-center font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Get Travel Tips
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          @page {
            margin: 1in;
          }

          .print\\:hidden {
            display: none !important;
          }

          .print\\:shadow-none {
            box-shadow: none !important;
          }

          .print\\:bg-white {
            background-color: white !important;
          }
        }
      `}</style>
    </div>
  )
}
