'use client'

import React, { useState, useEffect } from 'react'
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Printer,
  RotateCcw,
  Check,
  X,
} from 'lucide-react'

/**
 * PackingChecklistGenerator Component
 *
 * Interactive packing checklist tool that generates customized packing lists
 * based on trip type, destination climate, duration, and special needs.
 *
 * Features:
 * - Dynamic checklist generation
 * - LocalStorage persistence
 * - Progress tracking
 * - Print-friendly view
 * - Accessible keyboard navigation
 * - Custom item management
 * - Category-based organization
 */

interface ChecklistItem {
  id: string
  name: string
  category: string
  checked: boolean
  custom?: boolean
  description?: string
}

interface TripConfig {
  tripType: string
  climate: string
  duration: string
  season: string
  travelers: number
  specialNeeds: string[]
}

interface Category {
  name: string
  items: ChecklistItem[]
  expanded: boolean
}

const STORAGE_KEY = 'nta-packing-checklist'

// Base items for all trips
const baseItems = {
  documents: [
    { name: 'Passport/ID', description: 'Valid for 6+ months after return' },
    { name: 'Travel insurance documents', description: 'Print and digital copies' },
    { name: 'Cruise tickets/boarding passes', description: 'Check-in confirmation' },
    { name: 'Hotel confirmations', description: 'Print backup copies' },
    { name: 'Emergency contacts list', description: 'Family, credit cards, embassy' },
    { name: 'Credit cards & cash', description: 'Notify banks of travel' },
    { name: 'Vaccination records', description: 'Required for some destinations' },
    { name: 'Travel itinerary', description: 'Share with someone at home' },
  ],
  clothing: [
    { name: 'Underwear', description: 'Pack extras' },
    { name: 'Socks', description: 'Regular and athletic' },
    { name: 'Sleepwear', description: 'Comfortable for climate' },
    { name: 'Shoes', description: 'Walking and dress shoes' },
    { name: 'Belt', description: 'If needed' },
    { name: 'Hat/Cap', description: 'Sun protection' },
    { name: 'Sunglasses', description: 'UV protection' },
  ],
  toiletries: [
    { name: 'Toothbrush & toothpaste', description: 'Travel size' },
    { name: 'Shampoo & conditioner', description: '3.4oz for carry-on' },
    { name: 'Body wash/soap', description: 'TSA compliant size' },
    { name: 'Deodorant', description: 'Solid or liquid' },
    { name: 'Razor & shaving cream', description: 'If needed' },
    { name: 'Hairbrush/comb', description: 'Personal preference' },
    { name: 'Sunscreen SPF 30+', description: 'Reef-safe for Caribbean' },
    { name: 'Lip balm with SPF', description: 'Prevents chapping' },
    { name: 'Moisturizer', description: 'Face and body' },
    { name: 'Medications', description: 'Prescription + over-the-counter' },
    { name: 'First aid kit', description: 'Band-aids, pain relief, etc.' },
    { name: 'Motion sickness remedy', description: 'For cruises' },
    { name: 'Hand sanitizer', description: 'Travel size' },
    { name: 'Tissues/wet wipes', description: 'Convenient for travel' },
  ],
  electronics: [
    { name: 'Phone & charger', description: 'Check voltage compatibility' },
    { name: 'Camera & charger', description: 'Extra memory cards' },
    { name: 'Power bank', description: 'For long days out' },
    { name: 'Universal adapter', description: 'For international travel' },
    { name: 'Headphones/earbuds', description: 'Wired for flights' },
    { name: 'E-reader/tablet', description: 'Loaded with content' },
  ],
  miscellaneous: [
    { name: 'Reusable water bottle', description: 'Stay hydrated' },
    { name: 'Day backpack', description: 'For excursions' },
    { name: 'Luggage locks', description: 'TSA-approved' },
    { name: 'Laundry bag', description: 'Keep dirty clothes separate' },
    { name: 'Zip-lock bags', description: 'Various sizes for organization' },
    { name: 'Travel pillow', description: 'For flights' },
    { name: 'Eye mask & earplugs', description: 'Sleep better' },
    { name: 'Book/magazine', description: 'Entertainment' },
    { name: 'Snacks', description: 'For travel day' },
    { name: 'Umbrella/rain jacket', description: 'Weather backup' },
  ],
}

// Trip-specific additional items
const tripSpecificItems = {
  cruise: [
    { category: 'Cruise-Specific', name: 'Formal attire', description: 'For formal nights' },
    { category: 'Cruise-Specific', name: 'Cocktail dress/suit', description: '1-2 nice outfits' },
    { category: 'Cruise-Specific', name: 'Swimsuit (2+)', description: 'One to dry, one to wear' },
    { category: 'Cruise-Specific', name: 'Cover-up/robe', description: 'Pool to cabin walks' },
    { category: 'Cruise-Specific', name: 'Beach towel clips', description: 'Ship provides towels' },
    { category: 'Cruise-Specific', name: 'Magnetic hooks', description: 'Hang items in cabin' },
    { category: 'Cruise-Specific', name: 'Highlighter', description: 'Mark daily activities' },
    { category: 'Cruise-Specific', name: 'Lanyard', description: 'For room key card' },
    { category: 'Cruise-Specific', name: 'Small tote bag', description: 'Beach days at ports' },
    { category: 'Cruise-Specific', name: 'Binoculars', description: 'Wildlife and views' },
    {
      category: 'Cruise-Specific',
      name: 'Refillable mug',
      description: 'Many ships have drink packages',
    },
  ],
  resort: [
    { category: 'Resort Items', name: 'Swimsuits (2+)', description: 'Multiple for drying' },
    { category: 'Resort Items', name: 'Beach cover-up', description: 'Poolside style' },
    { category: 'Resort Items', name: 'Sandals/flip-flops', description: 'Pool and beach' },
    { category: 'Resort Items', name: 'Resort casual attire', description: 'Dinner dress code' },
    { category: 'Resort Items', name: 'Water shoes', description: 'Rocky beaches' },
    {
      category: 'Resort Items',
      name: 'Waterproof phone case',
      description: 'Pool and beach photos',
    },
  ],
  adventure: [
    { category: 'Adventure Gear', name: 'Hiking boots', description: 'Broken in' },
    { category: 'Adventure Gear', name: 'Quick-dry clothing', description: 'Moisture-wicking' },
    { category: 'Adventure Gear', name: 'Daypack', description: '20-30L for day trips' },
    { category: 'Adventure Gear', name: 'Trekking poles', description: 'If hiking' },
    { category: 'Adventure Gear', name: 'Headlamp/flashlight', description: 'Hands-free light' },
    { category: 'Adventure Gear', name: 'Multi-tool/knife', description: 'Check luggage only' },
    { category: 'Adventure Gear', name: 'Insect repellent', description: 'DEET or natural' },
    { category: 'Adventure Gear', name: 'Water purification', description: 'Tablets or filter' },
    {
      category: 'Adventure Gear',
      name: 'Dry bags',
      description: 'Keep gear dry in wet conditions',
    },
  ],
  beach: [
    { category: 'Beach Essentials', name: 'Swimsuits (2+)', description: 'Allow drying time' },
    { category: 'Beach Essentials', name: 'Beach towels', description: 'Quick-dry material' },
    { category: 'Beach Essentials', name: 'Snorkel gear', description: 'Own mask fits better' },
    { category: 'Beach Essentials', name: 'Rash guard', description: 'Sun protection' },
    { category: 'Beach Essentials', name: 'Waterproof bag', description: 'Protect valuables' },
    { category: 'Beach Essentials', name: 'Beach sandals', description: 'Water-friendly' },
    { category: 'Beach Essentials', name: 'Sunscreen (reef-safe)', description: 'SPF 50+' },
    { category: 'Beach Essentials', name: 'Beach hat', description: 'Wide brim for sun' },
    { category: 'Beach Essentials', name: 'Aloe vera gel', description: 'Sunburn relief' },
  ],
  city: [
    { category: 'City Travel', name: 'Comfortable walking shoes', description: 'Well broken in' },
    { category: 'City Travel', name: 'Crossbody bag', description: 'Theft-deterrent' },
    { category: 'City Travel', name: 'City guidebook/app', description: 'Navigation help' },
    { category: 'City Travel', name: 'Dressy casual outfits', description: 'Restaurants & shows' },
    { category: 'City Travel', name: 'Compact umbrella', description: 'Unexpected rain' },
    { category: 'City Travel', name: 'Transit passes', description: 'Research in advance' },
  ],
}

// Climate-specific items
const climateItems = {
  tropical: [
    { category: 'Clothing', name: 'Lightweight shirts (5-7)', description: 'Breathable fabric' },
    { category: 'Clothing', name: 'Shorts (3-5)', description: 'Quick-dry material' },
    { category: 'Clothing', name: 'Sundresses', description: 'Cool and comfortable' },
    { category: 'Clothing', name: 'Light cardigan', description: 'Air-conditioned spaces' },
    { category: 'Clothing', name: 'Swimwear', description: 'Multiple suits' },
  ],
  cold: [
    { category: 'Clothing', name: 'Warm jacket/parka', description: 'Insulated & waterproof' },
    { category: 'Clothing', name: 'Thermal underwear', description: 'Base layers' },
    { category: 'Clothing', name: 'Sweaters/fleece', description: 'Layering pieces' },
    { category: 'Clothing', name: 'Warm pants', description: 'Jeans or insulated' },
    { category: 'Clothing', name: 'Gloves & scarf', description: 'Winter accessories' },
    { category: 'Clothing', name: 'Winter hat', description: 'Covers ears' },
    { category: 'Clothing', name: 'Warm boots', description: 'Waterproof & insulated' },
    { category: 'Clothing', name: 'Hand/foot warmers', description: 'Disposable packets' },
  ],
  temperate: [
    { category: 'Clothing', name: 'T-shirts (4-6)', description: 'Mix of short and long sleeve' },
    { category: 'Clothing', name: 'Pants/jeans (2-3)', description: 'Versatile bottoms' },
    { category: 'Clothing', name: 'Light jacket', description: 'For cooler evenings' },
    { category: 'Clothing', name: 'Shorts (2)', description: 'Warmer days' },
    { category: 'Clothing', name: 'Layers', description: 'Adapt to temperature changes' },
  ],
}

// Special needs items
const specialNeedsItems = {
  kids: [
    { category: 'Kids Items', name: 'Diapers/wipes', description: 'More than you think' },
    { category: 'Kids Items', name: 'Baby formula/food', description: 'Airplane-safe amounts' },
    { category: 'Kids Items', name: 'Stroller', description: 'Check airline policy' },
    { category: 'Kids Items', name: 'Car seat', description: 'For taxis/rentals' },
    { category: 'Kids Items', name: 'Toys & books', description: 'Travel entertainment' },
    { category: 'Kids Items', name: 'Snacks', description: 'Familiar favorites' },
    { category: 'Kids Items', name: 'Child medications', description: 'Fever, allergy, etc.' },
    { category: 'Kids Items', name: 'Baby monitor', description: 'If needed' },
    { category: 'Kids Items', name: 'Sunscreen (kids)', description: 'Sensitive skin formula' },
    { category: 'Kids Items', name: 'Floaties/swim aids', description: 'Pool safety' },
  ],
  'formal-nights': [
    {
      category: 'Formal Attire',
      name: 'Formal dress/gown',
      description: '1-2 for cruise formal nights',
    },
    {
      category: 'Formal Attire',
      name: 'Suit/tuxedo',
      description: 'Or rent onboard if available',
    },
    { category: 'Formal Attire', name: 'Dress shoes', description: 'Polished and comfortable' },
    { category: 'Formal Attire', name: 'Tie/bow tie', description: 'Matches suit' },
    { category: 'Formal Attire', name: 'Dress accessories', description: 'Jewelry, cufflinks' },
    { category: 'Formal Attire', name: 'Evening clutch/bag', description: 'For formal dinners' },
  ],
  'water-activities': [
    {
      category: 'Water Activities',
      name: 'Snorkel mask & fins',
      description: 'Personal fit is best',
    },
    {
      category: 'Water Activities',
      name: 'Rash guard',
      description: 'UV protection while swimming',
    },
    { category: 'Water Activities', name: 'Water shoes', description: 'Rocky/coral areas' },
    {
      category: 'Water Activities',
      name: 'Waterproof camera',
      description: 'GoPro or underwater housing',
    },
    { category: 'Water Activities', name: 'Dry bag', description: 'Keep items dry' },
    { category: 'Water Activities', name: 'Swim goggles', description: 'For pool/ocean' },
  ],
  medical: [
    {
      category: 'Medical Needs',
      name: 'Prescription medications',
      description: 'Original bottles + extras',
    },
    { category: 'Medical Needs', name: 'Medical alert bracelet', description: 'If applicable' },
    { category: 'Medical Needs', name: "Doctor's note", description: 'For medications/devices' },
    { category: 'Medical Needs', name: 'Mobility aids', description: 'Cane, walker, etc.' },
    { category: 'Medical Needs', name: 'CPAP machine', description: 'With power adapter' },
    { category: 'Medical Needs', name: 'Blood glucose monitor', description: 'Extra supplies' },
    {
      category: 'Medical Needs',
      name: 'EpiPen',
      description: 'For severe allergies (tell cruise staff)',
    },
  ],
  fitness: [
    { category: 'Fitness Items', name: 'Workout clothes', description: 'Gym/running gear' },
    { category: 'Fitness Items', name: 'Athletic shoes', description: 'Running or training' },
    { category: 'Fitness Items', name: 'Resistance bands', description: 'Portable exercise' },
    { category: 'Fitness Items', name: 'Yoga mat', description: 'Travel-size if needed' },
    { category: 'Fitness Items', name: 'Swimming goggles', description: 'For lap swimming' },
    { category: 'Fitness Items', name: 'Fitness tracker', description: 'Track activity' },
  ],
}

export default function PackingChecklistGenerator() {
  const [config, setConfig] = useState<TripConfig>({
    tripType: '',
    climate: '',
    duration: '',
    season: '',
    travelers: 1,
    specialNeeds: [],
  })

  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [customItem, setCustomItem] = useState('')
  const [customCategory, setCustomCategory] = useState('Miscellaneous')
  const [showConfig, setShowConfig] = useState(true)
  const [isPrintMode, setIsPrintMode] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setConfig(data.config || config)
        setChecklist(data.checklist || [])
      } catch (e) {
        console.error('Failed to load saved checklist')
      }
    }
  }, [])

  // Save to localStorage when checklist or config changes
  useEffect(() => {
    if (checklist.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ config, checklist }))
    }
  }, [checklist, config])

  // Update categories when checklist changes
  useEffect(() => {
    const categoryMap = new Map<string, ChecklistItem[]>()

    checklist.forEach((item) => {
      if (!categoryMap.has(item.category)) {
        categoryMap.set(item.category, [])
      }
      categoryMap.get(item.category)!.push(item)
    })

    const newCategories: Category[] = Array.from(categoryMap.entries()).map(([name, items]) => ({
      name,
      items,
      expanded: true,
    }))

    setCategories(newCategories)
  }, [checklist])

  const generateChecklist = () => {
    const items: ChecklistItem[] = []
    let idCounter = 0

    const addItems = (itemList: any[], category: string) => {
      itemList.forEach((item) => {
        items.push({
          id: `item-${idCounter++}`,
          name: item.name,
          category,
          checked: false,
          description: item.description,
        })
      })
    }

    // Add base items
    addItems(baseItems.documents, 'Travel Documents')
    addItems(baseItems.clothing, 'Clothing & Accessories')
    addItems(baseItems.toiletries, 'Toiletries & Medications')
    addItems(baseItems.electronics, 'Electronics & Chargers')
    addItems(baseItems.miscellaneous, 'Miscellaneous')

    // Add trip-specific items
    if (config.tripType) {
      const tripItems = tripSpecificItems[config.tripType as keyof typeof tripSpecificItems]
      if (tripItems) {
        tripItems.forEach((item) => {
          items.push({
            id: `item-${idCounter++}`,
            name: item.name,
            category: item.category,
            checked: false,
            description: item.description,
          })
        })
      }
    }

    // Add climate-specific items
    if (config.climate) {
      const climate = climateItems[config.climate as keyof typeof climateItems]
      if (climate) {
        addItems(climate, 'Clothing & Accessories')
      }
    }

    // Add special needs items
    config.specialNeeds.forEach((need) => {
      const needItems = specialNeedsItems[need as keyof typeof specialNeedsItems]
      if (needItems) {
        needItems.forEach((item) => {
          items.push({
            id: `item-${idCounter++}`,
            name: item.name,
            category: item.category,
            checked: false,
            description: item.description,
          })
        })
      }
    })

    setChecklist(items)
    setShowConfig(false)
  }

  const toggleItem = (id: string) => {
    setChecklist(
      checklist.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
  }

  const toggleCategory = (categoryName: string) => {
    setCategories(
      categories.map((cat) =>
        cat.name === categoryName ? { ...cat, expanded: !cat.expanded } : cat
      )
    )
  }

  const checkAllInCategory = (categoryName: string) => {
    setChecklist(
      checklist.map((item) => (item.category === categoryName ? { ...item, checked: true } : item))
    )
  }

  const uncheckAllInCategory = (categoryName: string) => {
    setChecklist(
      checklist.map((item) => (item.category === categoryName ? { ...item, checked: false } : item))
    )
  }

  const addCustomItem = () => {
    if (customItem.trim()) {
      const newItem: ChecklistItem = {
        id: `custom-${Date.now()}`,
        name: customItem,
        category: customCategory,
        checked: false,
        custom: true,
      }
      setChecklist([...checklist, newItem])
      setCustomItem('')
    }
  }

  const removeItem = (id: string) => {
    setChecklist(checklist.filter((item) => item.id !== id))
  }

  const resetChecklist = () => {
    if (confirm('Are you sure you want to reset your checklist? This cannot be undone.')) {
      setChecklist([])
      setConfig({
        tripType: '',
        climate: '',
        duration: '',
        season: '',
        travelers: 1,
        specialNeeds: [],
      })
      setShowConfig(true)
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const handlePrint = () => {
    setIsPrintMode(true)
    setTimeout(() => {
      window.print()
      setIsPrintMode(false)
    }, 100)
  }

  const totalItems = checklist.length
  const checkedItems = checklist.filter((item) => item.checked).length
  const progressPercentage = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0

  const handleSpecialNeedToggle = (need: string) => {
    setConfig({
      ...config,
      specialNeeds: config.specialNeeds.includes(need)
        ? config.specialNeeds.filter((n) => n !== need)
        : [...config.specialNeeds, need],
    })
  }

  return (
    <div className={`w-full ${isPrintMode ? 'print-mode' : ''}`}>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-mode {
            font-size: 11pt;
          }
          .print-mode h2 {
            font-size: 14pt;
            margin-top: 10pt;
          }
          .print-mode h3 {
            font-size: 12pt;
          }
          button {
            display: none !important;
          }
          .checkbox-print {
            width: 15px;
            height: 15px;
            border: 1px solid #000;
            display: inline-block;
            margin-right: 8px;
          }
        }
      `}</style>

      {/* Configuration Section */}
      {showConfig && (
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-8 rounded-lg mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Customize Your Packing Checklist
          </h2>

          <div className="space-y-6">
            {/* Trip Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Trip Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {['cruise', 'resort', 'adventure', 'beach', 'city'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setConfig({ ...config, tripType: type })}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                      config.tripType === type
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Climate */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Destination Climate <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['tropical', 'cold', 'temperate'].map((climate) => (
                  <button
                    key={climate}
                    onClick={() => setConfig({ ...config, climate })}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                      config.climate === climate
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                    }`}
                  >
                    {climate.charAt(0).toUpperCase() + climate.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Trip Duration <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['weekend', 'week', '2weeks'].map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setConfig({ ...config, duration })}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                      config.duration === duration
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                    }`}
                  >
                    {duration === 'weekend'
                      ? 'Weekend (2-3 days)'
                      : duration === 'week'
                        ? 'Week (4-7 days)'
                        : '2+ Weeks'}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Needs */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Special Needs (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {['kids', 'formal-nights', 'water-activities', 'medical', 'fitness'].map((need) => (
                  <label
                    key={need}
                    className="flex items-center space-x-2 cursor-pointer bg-white px-4 py-3 rounded-lg border border-gray-300 hover:bg-blue-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={config.specialNeeds.includes(need)}
                      onChange={() => handleSpecialNeedToggle(need)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {need === 'formal-nights'
                        ? 'Formal Nights'
                        : need === 'water-activities'
                          ? 'Water Activities'
                          : need.charAt(0).toUpperCase() + need.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={generateChecklist}
                disabled={!config.tripType || !config.climate || !config.duration}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                Generate My Checklist
              </button>
            </div>
          </div>

          {/* Essex County Tip */}
          <div className="mt-6 bg-blue-100 border-l-4 border-blue-600 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Newark Area Travelers:</strong> Flying from Newark Liberty (EWR)? Arrive 3
              hours early for international flights. Cape Liberty cruise port is just 20 minutes
              away. Need help? Call us at{' '}
              <a href="tel:833-874-1019" className="font-bold text-blue-600 hover:underline">
                833-874-1019
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Checklist Display */}
      {checklist.length > 0 && (
        <div>
          {/* Progress Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg mb-6 no-print">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Packing Checklist</h2>
                <p className="text-blue-100">
                  {checkedItems} of {totalItems} items packed ({progressPercentage}%)
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowConfig(!showConfig)}
                  className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors text-sm"
                >
                  {showConfig ? 'Hide' : 'Edit'} Configuration
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-blue-800 text-white font-medium rounded-lg hover:bg-blue-900 transition-colors text-sm flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print Checklist
                </button>
                <button
                  onClick={resetChecklist}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 bg-blue-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-green-400 h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Add Custom Item */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6 no-print">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Add Custom Item</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={customItem}
                onChange={(e) => setCustomItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                placeholder="Enter item name..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Custom item name"
              />
              <select
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Select category for custom item"
              >
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
              <button
                onClick={addCustomItem}
                disabled={!customItem.trim()}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {categories.map((category) => {
              const categoryChecked = category.items.filter((i) => i.checked).length
              const categoryTotal = category.items.length
              const categoryProgress =
                categoryTotal > 0 ? Math.round((categoryChecked / categoryTotal) * 100) : 0

              return (
                <div key={category.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Category Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => toggleCategory(category.name)}
                        className="flex items-center gap-3 flex-1 text-left no-print"
                        aria-expanded={category.expanded}
                        aria-controls={`category-${category.name}`}
                      >
                        {category.expanded ? (
                          <ChevronUp className="w-5 h-5 text-blue-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                        <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                        <span className="text-sm text-gray-600">
                          ({categoryChecked}/{categoryTotal})
                        </span>
                      </button>

                      <div className="flex gap-2 no-print">
                        <button
                          onClick={() => checkAllInCategory(category.name)}
                          className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded transition-colors flex items-center gap-1"
                          aria-label={`Check all items in ${category.name}`}
                        >
                          <Check className="w-4 h-4" />
                          All
                        </button>
                        <button
                          onClick={() => uncheckAllInCategory(category.name)}
                          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center gap-1"
                          aria-label={`Uncheck all items in ${category.name}`}
                        >
                          <X className="w-4 h-4" />
                          None
                        </button>
                      </div>
                    </div>

                    {/* Category Progress Bar */}
                    <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full transition-all duration-300"
                        style={{ width: `${categoryProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Category Items */}
                  {category.expanded && (
                    <div id={`category-${category.name}`} className="divide-y divide-gray-100">
                      {category.items.map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 hover:bg-gray-50 transition-colors ${
                            item.checked ? 'bg-green-50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleItem(item.id)}
                              className="flex-shrink-0 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded no-print"
                              aria-label={`${item.checked ? 'Uncheck' : 'Check'} ${item.name}`}
                            >
                              {item.checked ? (
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                              ) : (
                                <Circle className="w-6 h-6 text-gray-400 hover:text-blue-600" />
                              )}
                            </button>
                            <div className="checkbox-print" />
                            <div className="flex-1">
                              <div
                                className={`font-medium ${
                                  item.checked ? 'text-gray-500 line-through' : 'text-gray-900'
                                }`}
                              >
                                {item.name}
                                {item.custom && (
                                  <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                    Custom
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                              )}
                            </div>
                            {item.custom && (
                              <button
                                onClick={() => removeItem(item.id)}
                                className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors no-print"
                                aria-label={`Remove ${item.name}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Footer CTA */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-center no-print">
            <h3 className="text-white text-xl font-bold mb-3">
              Ready to Book Your Next Adventure?
            </h3>
            <p className="text-blue-100 mb-4">
              Let our Essex County travel experts help you plan the perfect getaway
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:833-874-1019"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call 833-874-1019
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900 transition-colors"
              >
                Request a Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
