'use client'

import { BookingTip } from '@/lib/data/cruise-neighborhoods'
import { useState } from 'react'

interface BookingTipsSectionProps {
  bookingTips: BookingTip[]
}

export default function BookingTipsSection({ bookingTips }: BookingTipsSectionProps) {
  const [expandedTip, setExpandedTip] = useState<number | null>(0)

  return (
    <div id="booking-tips" className="space-y-4">
      {bookingTips.map((tip, index) => (
        <div
          key={index}
          className={`border rounded-lg transition-all ${
            expandedTip === index
              ? 'border-blue-400 shadow-lg'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <button
            onClick={() => setExpandedTip(expandedTip === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
          >
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 transition ${
                  expandedTip === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {index + 1}
              </div>
              <h3 className="font-semibold text-lg">{tip.title}</h3>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transform transition-transform ${
                expandedTip === index ? 'rotate-180' : ''
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {expandedTip === index && (
            <div className="px-6 pb-4 border-t border-gray-100">
              <p className="text-gray-700 mt-3">{tip.description}</p>
              {tip.insiderNote && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <span className="text-yellow-600 mr-2">💡</span>
                    <div>
                      <span className="font-semibold text-yellow-800 text-sm">Insider Tip: </span>
                      <span className="text-gray-700 text-sm">{tip.insiderNote}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Booking CTA */}
      <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-2">Ready to Book Your Perfect Cabin?</h3>
        <p className="text-gray-700 mb-4">
          Our Cape Liberty cruise specialists know exactly which cabins offer the best value and
          experience in each neighborhood.
        </p>
        <a
          href="tel:833-874-1019"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Call 833-874-1019 for Expert Advice
        </a>
      </div>
    </div>
  )
}
