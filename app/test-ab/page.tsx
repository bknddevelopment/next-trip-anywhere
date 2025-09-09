'use client'

import { useState, useEffect } from 'react'
import { abTesting } from '@/lib/ab-testing'

export default function ABTestingDemo() {
  const [activeTests, setActiveTests] = useState<Record<string, string>>({})
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    // Get active test assignments
    const tests = abTesting.getActiveTests()
    setActiveTests(tests)

    // Load events from localStorage
    if (typeof window !== 'undefined') {
      const savedEvents = JSON.parse(localStorage.getItem('ab_events') || '[]')
      setEvents(savedEvents.slice(-10)) // Show last 10 events
    }
  }, [])

  const handleResetTests = () => {
    abTesting.resetAssignments()
    window.location.reload()
  }

  const handleForceVariant = (testId: string, variantId: string) => {
    abTesting.forceVariant(testId, variantId)
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">A/B Testing Dashboard</h1>
        
        {/* Active Tests */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Active Test Assignments</h2>
          {Object.keys(activeTests).length === 0 ? (
            <p className="text-gray-500">No active tests assigned</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(activeTests).map(([testId, variantId]) => (
                <div key={testId} className="flex items-center justify-between bg-gray-50 p-4 rounded">
                  <div>
                    <strong>{testId}:</strong> {variantId}
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleForceVariant(testId, 'control')}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                    >
                      Force Control
                    </button>
                    <button
                      onClick={() => handleForceVariant(testId, 'urgent')}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Force Urgent
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-6">
            <button
              onClick={handleResetTests}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Reset All Assignments
            </button>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Events</h2>
          {events.length === 0 ? (
            <p className="text-gray-500">No events recorded</p>
          ) : (
            <div className="space-y-2">
              {events.map((event, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded text-sm">
                  <div className="font-medium">{event.event}</div>
                  <div className="text-gray-600">
                    Test: {event.testId} | Variant: {event.variantId} | Time: {new Date(event.timestamp).toLocaleTimeString()}
                  </div>
                  {event.metadata && (
                    <div className="text-gray-500 text-xs">
                      Metadata: {JSON.stringify(event.metadata)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">How to Test</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Visit the homepage to see A/B tested CTAs in action</li>
            <li>Click on CTAs to generate conversion events</li>
            <li>Use the force buttons above to test different variants</li>
            <li>Check browser console for detailed event logging</li>
            <li>Events are stored in localStorage for debugging</li>
          </ol>
        </div>
      </div>
    </div>
  )
}