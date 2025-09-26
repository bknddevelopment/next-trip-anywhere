'use client'

import { useState, useEffect } from 'react'
import { Map, Download, Mail, Plus, X, Clock, Anchor, MapPin, Calendar, Share2, Info } from 'lucide-react'

interface Port {
  id: string
  name: string
  country: string
  arrivalTime: string
  departureTime: string
  dayNumber: number
  description: string
  topAttractions: string[]
  excursions: Excursion[]
  coordinates?: { lat: number; lng: number }
}

interface Excursion {
  id: string
  name: string
  duration: string
  price: number
  description: string
  selected: boolean
}

interface Itinerary {
  cruiseLine: string
  shipName: string
  departurePort: string
  duration: number
  departureDate: string
  ports: Port[]
}

const sampleItineraries: Record<string, Partial<Itinerary>> = {
  'caribbean-7': {
    cruiseLine: 'Royal Caribbean',
    shipName: 'Symphony of the Seas',
    departurePort: 'Cape Liberty, Bayonne NJ',
    duration: 7,
    ports: [
      {
        id: '1',
        name: 'Cape Liberty',
        country: 'New Jersey',
        arrivalTime: 'Embarkation',
        departureTime: '4:00 PM',
        dayNumber: 1,
        description: 'Convenient departure from Bayonne, just 30 minutes from Newark',
        topAttractions: ['Statue of Liberty views', 'Manhattan skyline'],
        excursions: [],
        coordinates: { lat: 40.667, lng: -74.145 }
      },
      {
        id: '2',
        name: 'Perfect Day at CocoCay',
        country: 'Bahamas',
        arrivalTime: '8:00 AM',
        departureTime: '5:00 PM',
        dayNumber: 3,
        description: 'Royal Caribbean\'s private island paradise',
        topAttractions: ['Thrill Waterpark', 'Oasis Lagoon', 'Coco Beach Club'],
        excursions: [
          { id: 'e1', name: 'Beach Day Pass', duration: 'All Day', price: 0, description: 'Enjoy free beach access', selected: false },
          { id: 'e2', name: 'Thrill Waterpark', duration: 'All Day', price: 89, description: '13 waterslides and wave pool', selected: false }
        ],
        coordinates: { lat: 25.815, lng: -77.951 }
      },
      {
        id: '3',
        name: 'Nassau',
        country: 'Bahamas',
        arrivalTime: '8:00 AM',
        departureTime: '6:00 PM',
        dayNumber: 4,
        description: 'Capital of the Bahamas with colonial charm',
        topAttractions: ['Atlantis Resort', 'Queen\'s Staircase', 'Straw Market'],
        excursions: [
          { id: 'e3', name: 'Atlantis Beach Day', duration: '6 hours', price: 195, description: 'Access to beaches and aquarium', selected: false },
          { id: 'e4', name: 'Swimming with Pigs', duration: '5 hours', price: 265, description: 'Famous swimming pigs excursion', selected: false }
        ],
        coordinates: { lat: 25.047, lng: -77.355 }
      }
    ]
  },
  'alaska-7': {
    cruiseLine: 'Norwegian Cruise Line',
    shipName: 'Norwegian Bliss',
    departurePort: 'Seattle, WA',
    duration: 7,
    ports: [
      {
        id: '1',
        name: 'Seattle',
        country: 'USA',
        arrivalTime: 'Embarkation',
        departureTime: '4:00 PM',
        dayNumber: 1,
        description: 'Fly from Newark to Seattle (5.5 hour flight)',
        topAttractions: ['Pike Place Market', 'Space Needle'],
        excursions: [],
        coordinates: { lat: 47.606, lng: -122.332 }
      },
      {
        id: '2',
        name: 'Ketchikan',
        country: 'Alaska',
        arrivalTime: '7:00 AM',
        departureTime: '3:00 PM',
        dayNumber: 3,
        description: 'Salmon capital of the world',
        topAttractions: ['Creek Street', 'Totem Poles', 'Misty Fjords'],
        excursions: [
          { id: 'e5', name: 'Misty Fjords Seaplane', duration: '2 hours', price: 259, description: 'Scenic flightseeing tour', selected: false },
          { id: 'e6', name: 'Alaska Lumberjack Show', duration: '1.5 hours', price: 45, description: 'Entertaining competition show', selected: false }
        ],
        coordinates: { lat: 55.342, lng: -131.646 }
      }
    ]
  },
  'mediterranean-7': {
    cruiseLine: 'Celebrity Cruises',
    shipName: 'Celebrity Edge',
    departurePort: 'Barcelona, Spain',
    duration: 7,
    ports: [
      {
        id: '1',
        name: 'Barcelona',
        country: 'Spain',
        arrivalTime: 'Embarkation',
        departureTime: '5:00 PM',
        dayNumber: 1,
        description: 'Fly from Newark to Barcelona (8 hour flight)',
        topAttractions: ['Sagrada Familia', 'Park Güell', 'Las Ramblas'],
        excursions: [],
        coordinates: { lat: 41.385, lng: 2.173 }
      },
      {
        id: '2',
        name: 'Palma de Mallorca',
        country: 'Spain',
        arrivalTime: '8:00 AM',
        departureTime: '6:00 PM',
        dayNumber: 2,
        description: 'Beautiful Balearic island',
        topAttractions: ['Cathedral of Palma', 'Bellver Castle', 'Beaches'],
        excursions: [
          { id: 'e7', name: 'Caves of Drach', duration: '4 hours', price: 75, description: 'Underground lake and concert', selected: false },
          { id: 'e8', name: 'Palma City Tour', duration: '3 hours', price: 55, description: 'Guided walking tour', selected: false }
        ],
        coordinates: { lat: 39.570, lng: 2.650 }
      }
    ]
  }
}

export default function ItineraryBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState('caribbean-7')
  const [cruiseLine, setCruiseLine] = useState('')
  const [shipName, setShipName] = useState('')
  const [departurePort, setDeparturePort] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [duration, setDuration] = useState(7)
  const [ports, setPorts] = useState<Port[]>([])
  const [showItinerary, setShowItinerary] = useState(false)
  const [email, setEmail] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  const loadTemplate = () => {
    const template = sampleItineraries[selectedTemplate]
    if (template) {
      setCruiseLine(template.cruiseLine || '')
      setShipName(template.shipName || '')
      setDeparturePort(template.departurePort || '')
      setDuration(template.duration || 7)
      setPorts(template.ports || [])
      setShowItinerary(true)
    }
  }

  const addPort = () => {
    const newPort: Port = {
      id: Date.now().toString(),
      name: '',
      country: '',
      arrivalTime: '8:00 AM',
      departureTime: '5:00 PM',
      dayNumber: ports.length + 2,
      description: '',
      topAttractions: [],
      excursions: []
    }
    setPorts([...ports, newPort])
  }

  const updatePort = (index: number, field: keyof Port, value: any) => {
    const updated = [...ports]
    updated[index] = { ...updated[index], [field]: value }
    setPorts(updated)
  }

  const removePort = (index: number) => {
    setPorts(ports.filter((_, i) => i !== index))
  }

  const toggleExcursion = (portIndex: number, excursionId: string) => {
    const updated = [...ports]
    const port = updated[portIndex]
    const excursion = port.excursions.find(e => e.id === excursionId)
    if (excursion) {
      excursion.selected = !excursion.selected
    }
    setPorts(updated)
  }

  const calculateTotalExcursionCost = () => {
    return ports.reduce((total, port) => {
      const portTotal = port.excursions
        .filter(e => e.selected)
        .reduce((sum, e) => sum + e.price, 0)
      return total + portTotal
    }, 0)
  }

  const generateShareUrl = () => {
    // In production, this would create a shareable link
    const data = {
      cruiseLine,
      shipName,
      departurePort,
      departureDate,
      duration,
      ports
    }
    const encoded = btoa(JSON.stringify(data))
    const url = `${window.location.origin}/tools/itinerary-builder?data=${encoded.substring(0, 50)}...`
    setShareUrl(url)

    // Copy to clipboard
    navigator.clipboard.writeText(url)
    alert('Itinerary link copied to clipboard!')
  }

  const downloadItinerary = () => {
    const excursionCost = calculateTotalExcursionCost()
    const content = `CRUISE ITINERARY
Generated: ${new Date().toLocaleDateString()}

Cruise Details:
- Cruise Line: ${cruiseLine}
- Ship: ${shipName}
- Departure Port: ${departurePort}
- Departure Date: ${departureDate || 'TBD'}
- Duration: ${duration} nights

Ports of Call:
${ports.map((port, index) => `
Day ${port.dayNumber}: ${port.name}, ${port.country}
- Arrival: ${port.arrivalTime}
- Departure: ${port.departureTime}
- Description: ${port.description}
${port.topAttractions.length > 0 ? `- Top Attractions: ${port.topAttractions.join(', ')}` : ''}
${port.excursions.filter(e => e.selected).length > 0 ? `
Selected Excursions:
${port.excursions.filter(e => e.selected).map(e =>
  `  • ${e.name} - ${e.duration} - $${e.price}`
).join('\n')}` : ''}
`).join('\n')}

Total Excursion Cost: $${excursionCost}

Travel Tips from Newark:
- Cape Liberty, Bayonne: 30 minutes from Newark
- Brooklyn Cruise Terminal: 45 minutes from Newark
- Manhattan Cruise Terminal: 40 minutes from Newark
- Book cruise line transfers for guaranteed boarding

Contact Next Trip Anywhere:
Phone: 833-874-1019
Website: nexttripanywhere.com
`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cruise-itinerary-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const sendEmail = async () => {
    if (!email) return

    try {
      const itinerarySummary = `Cruise Itinerary:

Cruise Line: ${cruiseLine}
Ship: ${shipName}
Duration: ${duration} nights
Embarkation: ${embarkationPort}

Ports of Call:
${ports.map((port, idx) => `Day ${idx + 1}: ${port.name} (${port.arrivalTime} - ${port.departureTime})`).join('\n')}

Total Cost: $${totalCost}
Notes: ${notes || 'None'}`

      const response = await fetch('https://nextripanywhere.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: 'cruise-itinerary',
          source: 'itinerary-builder-tool',
          message: itinerarySummary,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send itinerary')
      }

      alert(`Itinerary has been sent to ${email}! Check your inbox.`)
      setShowEmailForm(false)
      setEmail('')
    } catch (error) {
      alert('Failed to send itinerary. Please try again or call us at 833-874-1019.')
    }
  }

  // Save itinerary to localStorage
  useEffect(() => {
    if (showItinerary && ports.length > 0) {
      const itineraryData = {
        cruiseLine,
        shipName,
        departurePort,
        departureDate,
        duration,
        ports,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem('cruiseItinerary', JSON.stringify(itineraryData))
    }
  }, [cruiseLine, shipName, departurePort, departureDate, duration, ports, showItinerary])

  // Load saved itinerary on mount
  useEffect(() => {
    const saved = localStorage.getItem('cruiseItinerary')
    if (saved) {
      const data = JSON.parse(saved)
      setCruiseLine(data.cruiseLine)
      setShipName(data.shipName)
      setDeparturePort(data.departurePort)
      setDepartureDate(data.departureDate || '')
      setDuration(data.duration)
      setPorts(data.ports)
      setShowItinerary(true)
    }
  }, [])

  const excursionTotal = calculateTotalExcursionCost()

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-600 p-4 rounded-full">
              <Map className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Itinerary Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build your perfect cruise itinerary with interactive maps and excursion planning.
            Visualize your journey and share with travel companions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Builder Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Anchor className="w-6 h-6 text-orange-600" />
                Build Your Itinerary
              </h2>

              {/* Template Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start with a Template (Optional)
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="caribbean-7">7-Night Caribbean from Cape Liberty</option>
                    <option value="alaska-7">7-Night Alaska from Seattle</option>
                    <option value="mediterranean-7">7-Night Mediterranean from Barcelona</option>
                  </select>
                  <button
                    onClick={loadTemplate}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Load Template
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Cruise Line */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cruise Line
                  </label>
                  <input
                    type="text"
                    value={cruiseLine}
                    onChange={(e) => setCruiseLine(e.target.value)}
                    placeholder="e.g., Royal Caribbean"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Ship Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ship Name
                  </label>
                  <input
                    type="text"
                    value={shipName}
                    onChange={(e) => setShipName(e.target.value)}
                    placeholder="e.g., Symphony of the Seas"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Departure Port */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Port
                  </label>
                  <select
                    value={departurePort}
                    onChange={(e) => setDeparturePort(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select a port</option>
                    <option value="Cape Liberty, Bayonne NJ">Cape Liberty, Bayonne NJ</option>
                    <option value="Brooklyn Cruise Terminal">Brooklyn Cruise Terminal</option>
                    <option value="Manhattan Cruise Terminal">Manhattan Cruise Terminal</option>
                    <option value="Baltimore, MD">Baltimore, MD</option>
                    <option value="Boston, MA">Boston, MA</option>
                    <option value="Fort Lauderdale, FL">Fort Lauderdale, FL (fly from Newark)</option>
                    <option value="Miami, FL">Miami, FL (fly from Newark)</option>
                  </select>
                </div>

                {/* Departure Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Duration */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cruise Duration (Nights)
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value={3}>3 Nights</option>
                    <option value={4}>4 Nights</option>
                    <option value={5}>5 Nights</option>
                    <option value={7}>7 Nights</option>
                    <option value={10}>10 Nights</option>
                    <option value={14}>14 Nights</option>
                  </select>
                </div>
              </div>

              {/* Build Button */}
              {!showItinerary && (
                <button
                  onClick={() => setShowItinerary(true)}
                  className="w-full mt-8 bg-orange-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Map className="w-5 h-5" />
                  Create Itinerary
                </button>
              )}
            </div>

            {/* Itinerary Display */}
            {showItinerary && (
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Your Itinerary</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={generateShareUrl}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 px-1 ${activeTab === 'overview' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-600'}`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('ports')}
                    className={`pb-2 px-1 ${activeTab === 'ports' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-600'}`}
                  >
                    Ports & Excursions
                  </button>
                  <button
                    onClick={() => setActiveTab('map')}
                    className={`pb-2 px-1 ${activeTab === 'map' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-600'}`}
                  >
                    Route Map
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Trip Summary</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Cruise Line:</span>
                          <span className="ml-2 font-medium">{cruiseLine || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Ship:</span>
                          <span className="ml-2 font-medium">{shipName || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Departure:</span>
                          <span className="ml-2 font-medium">{departurePort || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Date:</span>
                          <span className="ml-2 font-medium">{departureDate || 'TBD'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <span className="ml-2 font-medium">{duration} nights</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Ports:</span>
                          <span className="ml-2 font-medium">{ports.length} stops</span>
                        </div>
                      </div>
                    </div>

                    {/* Day by Day */}
                    <div>
                      <h3 className="font-semibold mb-3">Day-by-Day Schedule</h3>
                      <div className="space-y-2">
                        {ports.map((port, index) => (
                          <div key={port.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                              {port.dayNumber}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{port.name}, {port.country}</p>
                              <p className="text-sm text-gray-600">
                                {port.arrivalTime} - {port.departureTime}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ports' && (
                  <div className="space-y-6">
                    {ports.map((port, portIndex) => (
                      <div key={port.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">
                              Day {port.dayNumber}: {port.name || 'Port Name'}, {port.country || 'Country'}
                            </h3>
                            <p className="text-sm text-gray-600">
                              <Clock className="inline w-4 h-4 mr-1" />
                              {port.arrivalTime} - {port.departureTime}
                            </p>
                          </div>
                          <button
                            onClick={() => removePort(portIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {port.description && (
                          <p className="text-gray-700 mb-3">{port.description}</p>
                        )}

                        {port.topAttractions.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-semibold text-gray-700 mb-1">Top Attractions:</p>
                            <div className="flex flex-wrap gap-2">
                              {port.topAttractions.map((attraction, idx) => (
                                <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                  {attraction}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {port.excursions.length > 0 && (
                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-2">Available Excursions:</p>
                            <div className="space-y-2">
                              {port.excursions.map((excursion) => (
                                <label key={excursion.id} className="flex items-start gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded">
                                  <input
                                    type="checkbox"
                                    checked={excursion.selected}
                                    onChange={() => toggleExcursion(portIndex, excursion.id)}
                                    className="mt-1 w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium">{excursion.name}</p>
                                    <p className="text-sm text-gray-600">{excursion.description}</p>
                                    <p className="text-sm">
                                      <span className="text-gray-500">{excursion.duration}</span>
                                      <span className="ml-3 font-semibold text-green-600">${excursion.price}</span>
                                    </p>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <button
                      onClick={addPort}
                      className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Add Port
                    </button>

                    {excursionTotal > 0 && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total Excursion Cost:</span>
                          <span className="text-xl font-bold text-green-600">${excursionTotal}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'map' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800 mb-2">
                        <Info className="inline w-4 h-4 mr-1" />
                        Interactive map visualization would appear here showing your cruise route
                      </p>
                    </div>

                    {/* Simple Route Display */}
                    <div className="relative">
                      {ports.map((port, index) => (
                        <div key={port.id} className="flex items-center mb-4">
                          <div className="relative">
                            <MapPin className="w-8 h-8 text-orange-600" />
                            {index < ports.length - 1 && (
                              <div className="absolute top-8 left-4 w-0.5 h-16 bg-orange-300" />
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="font-semibold">{port.name || 'Port'}</p>
                            <p className="text-sm text-gray-600">{port.country || 'Country'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                    onClick={downloadItinerary}
                    className="flex-1 bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Itinerary
                  </button>
                  <button
                    onClick={() => setShowEmailForm(!showEmailForm)}
                    className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Email Itinerary
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
                      Send Itinerary
                    </button>
                  </div>
                )}

                {shareUrl && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 mb-2">Share this itinerary:</p>
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="w-full p-2 bg-white border border-blue-300 rounded text-sm"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Port Distance from Newark */}
            <div className="bg-orange-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                Departure Ports from Newark
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <span className="font-semibold">Cape Liberty, Bayonne:</span>
                  <br />30 min drive, Royal Caribbean hub
                </li>
                <li>
                  <span className="font-semibold">Brooklyn Terminal:</span>
                  <br />45 min drive, Princess & Cunard
                </li>
                <li>
                  <span className="font-semibold">Manhattan Terminal:</span>
                  <br />40 min drive, NCL & Carnival
                </li>
                <li>
                  <span className="font-semibold">Baltimore:</span>
                  <br />3 hour drive, year-round cruises
                </li>
                <li>
                  <span className="font-semibold">Boston:</span>
                  <br />4 hour drive, seasonal cruises
                </li>
              </ul>
            </div>

            {/* Planning Tips */}
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Itinerary Planning Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Book excursions early for best prices</li>
                <li>• Consider sea days for rest</li>
                <li>• Research visa requirements</li>
                <li>• Check tender port schedules</li>
                <li>• Plan formal nights in advance</li>
                <li>• Factor in time zone changes</li>
              </ul>
            </div>

            {/* Popular Routes */}
            <div className="bg-green-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3">Popular from Essex County</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold">Bermuda (Apr-Oct)</p>
                  <p>3-7 nights from Cape Liberty</p>
                </div>
                <div>
                  <p className="font-semibold">Caribbean (Year-round)</p>
                  <p>7-14 nights from Bayonne</p>
                </div>
                <div>
                  <p className="font-semibold">Canada/New England (Sep-Oct)</p>
                  <p>7-10 nights from Brooklyn</p>
                </div>
                <div>
                  <p className="font-semibold">Transatlantic (Apr & Oct)</p>
                  <p>14+ nights from Manhattan</p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-3">Need Planning Help?</h3>
              <p className="text-gray-600 mb-4">
                Our Essex County cruise experts can help you plan the perfect itinerary.
              </p>
              <a
                href="tel:833-874-1019"
                className="block w-full bg-orange-600 text-white text-center font-bold py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors mb-3"
              >
                Call 833-874-1019
              </a>
              <a
                href="/contact"
                className="block w-full bg-gray-100 text-gray-700 text-center font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Get Expert Advice
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}