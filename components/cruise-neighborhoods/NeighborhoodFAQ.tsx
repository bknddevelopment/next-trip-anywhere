'use client'

import { useState } from 'react'

interface FAQ {
  question: string
  answer: string
}

interface NeighborhoodFAQProps {
  faqs: FAQ[]
}

export default function NeighborhoodFAQ({ faqs }: NeighborhoodFAQProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([0])

  const toggleItem = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const expandAll = () => {
    setExpandedItems(faqs.map((_, index) => index))
  }

  const collapseAll = () => {
    setExpandedItems([])
  }

  return (
    <div id="faqs" className="space-y-4">
      {/* Controls */}
      <div className="flex justify-end space-x-3 mb-4">
        <button
          onClick={expandAll}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          className="text-sm text-gray-600 hover:text-gray-800 font-medium transition"
        >
          Collapse All
        </button>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
              aria-expanded={expandedItems.includes(index)}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="flex items-start flex-1 pr-4">
                <span className="text-blue-600 font-semibold mr-3 flex-shrink-0">
                  Q{index + 1}.
                </span>
                <h3 className="font-medium text-gray-900">{faq.question}</h3>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 flex-shrink-0 transform transition-transform ${
                  expandedItems.includes(index) ? 'rotate-180' : ''
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

            {expandedItems.includes(index) && (
              <div id={`faq-answer-${index}`} className="px-6 pb-4 border-t border-gray-100">
                <div className="pt-3 text-gray-700 leading-relaxed">{faq.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Schema Markup Note */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Have more questions?</strong> Our Cape Liberty cruise experts are available 7 days
          a week to help you choose the perfect neighborhood and cabin for your cruise.
        </p>
      </div>
    </div>
  )
}
