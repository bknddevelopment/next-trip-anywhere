'use client'

import Link from 'next/link'
import {
  Calculator,
  CheckSquare,
  DollarSign,
  Map,
  BarChart3,
  ArrowRight,
  Star,
  Users,
  Clock
} from 'lucide-react'

const tools = [
  {
    id: 'cruise-price-calculator',
    title: 'Cruise Price Calculator',
    description: 'Calculate total cruise costs including taxes, gratuities, and extras. Get instant quotes and compare prices across cruise lines.',
    icon: Calculator,
    benefits: [
      'Accurate total cost estimates',
      'Compare multiple cruise lines',
      'Essex County resident discounts',
      'Save and email quotes'
    ],
    stats: { users: '12,000+', rating: 4.8, time: '2 min' },
    color: 'bg-blue-500'
  },
  {
    id: 'packing-checklist',
    title: 'Packing Checklist Generator',
    description: 'Create a customized packing list based on your destination, cruise duration, and planned activities. Never forget essentials again!',
    icon: CheckSquare,
    benefits: [
      'Personalized for your trip',
      'TSA & cruise line requirements',
      'Print-friendly format',
      'Newark Airport specific tips'
    ],
    stats: { users: '8,500+', rating: 4.9, time: '1 min' },
    color: 'bg-green-500'
  },
  {
    id: 'budget-planner',
    title: 'Cruise Budget Planner',
    description: 'Plan your entire cruise budget from booking to return. Track expenses, set spending limits, and avoid overspending on vacation.',
    icon: DollarSign,
    benefits: [
      'Detailed expense breakdown',
      'Daily spending allowance',
      'Emergency fund calculator',
      'Export to PDF'
    ],
    stats: { users: '10,000+', rating: 4.7, time: '3 min' },
    color: 'bg-purple-500'
  },
  {
    id: 'itinerary-builder',
    title: 'Itinerary Builder',
    description: 'Build your perfect cruise itinerary with interactive maps, port information, and excursion planning. Visualize your entire journey.',
    icon: Map,
    benefits: [
      'Interactive route maps',
      'Port times & highlights',
      'Excursion recommendations',
      'Shareable itineraries'
    ],
    stats: { users: '15,000+', rating: 4.8, time: '5 min' },
    color: 'bg-orange-500'
  },
  {
    id: 'cruise-comparison',
    title: 'Cruise Comparison Tool',
    description: 'Compare up to 3 cruises side-by-side. Analyze prices, itineraries, amenities, and reviews to find your perfect voyage.',
    icon: BarChart3,
    benefits: [
      'Side-by-side comparison',
      'Pros & cons analysis',
      'Essex County recommendations',
      'Direct booking links'
    ],
    stats: { users: '9,000+', rating: 4.9, time: '3 min' },
    color: 'bg-teal-500'
  }
]

export default function ToolsHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Free Cruise Planning Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Plan your perfect cruise with our suite of interactive calculators and planners.
            Designed specifically for Essex County travelers departing from Newark.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">50,000+ Users</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">4.8 Average Rating</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Results in Minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <div key={tool.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className={`${tool.color} h-2`} />
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`${tool.color} bg-opacity-20 p-3 rounded-lg`}>
                        <Icon className={`w-8 h-8 ${tool.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{tool.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{tool.stats.users} users</span>
                          <span>•</span>
                          <span>⭐ {tool.stats.rating}</span>
                          <span>•</span>
                          <span>{tool.stats.time}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{tool.description}</p>

                    <ul className="space-y-2 mb-6">
                      {tool.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckSquare className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/tools/${tool.id}`}
                      className={`flex items-center justify-center gap-2 w-full ${tool.color} text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      Launch Tool
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Use Our Tools Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Essex County Travelers Choose Our Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
              <p className="text-gray-600">
                Specifically designed for New Jersey residents with Newark Airport departures
                and local cruise terminal information.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accurate Calculations</h3>
              <p className="text-gray-600">
                Real-time pricing data from major cruise lines ensures your estimates are
                always current and reliable.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted by Thousands</h3>
              <p className="text-gray-600">
                Over 50,000 Essex County residents have used our tools to plan their
                perfect cruise vacations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Plan Your Perfect Cruise?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start with our price calculator to get an instant quote for your dream voyage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/cruise-price-calculator"
              className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Start Price Calculator
            </Link>
            <Link
              href="/contact"
              className="bg-blue-700 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-800 transition-colors inline-flex items-center justify-center"
            >
              Talk to an Expert
            </Link>
          </div>
          <p className="text-blue-100 mt-8">
            Call us: <a href="tel:833-874-1019" className="font-bold text-white hover:underline">833-874-1019</a>
          </p>
        </div>
      </section>
    </div>
  )
}