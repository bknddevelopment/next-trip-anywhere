'use client'

interface DeckPlanProps {
  deckPlan: {
    description: string
    keyLocations: Array<{
      location: string
      deck: string
      significance: string
    }>
    navigationTips: string[]
  }
  deckNumbers: number[]
  shipName: string
}

export default function DeckPlanVisualization({ deckPlan, deckNumbers, shipName }: DeckPlanProps) {
  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-gray-700">{deckPlan.description}</p>
      </div>

      {/* Visual Deck Representation */}
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Neighborhood Deck Layout</h3>
        <div className="space-y-2">
          {deckNumbers.map((deck) => (
            <div key={deck} className="relative">
              <div className="bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-300 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-700 mr-4">Deck {deck}</span>
                  <div className="flex space-x-2">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-blue-200 border border-blue-400 rounded"
                        title={`Cabin example ${deck}${i}00`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">← Cabin locations →</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Forward</span>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">Aft</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Locations */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Key Locations</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {deckPlan.keyLocations.map((location, index) => (
            <div
              key={index}
              className="flex items-start bg-white p-4 rounded-lg border border-gray-200"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="ml-3">
                <div className="font-semibold text-gray-900">{location.location}</div>
                <div className="text-sm text-gray-600">{location.deck}</div>
                <div className="text-sm text-gray-500 mt-1">{location.significance}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-4">
          🧭 Navigation Tips for {shipName}
        </h3>
        <ul className="space-y-2">
          {deckPlan.navigationTips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
