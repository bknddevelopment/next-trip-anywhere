/**
 * Lazy-loaded FAQ Section Component
 * Optimized for performance with minimal bundle impact
 */

import { type CruiseDestination } from '@/lib/data/cruises'

interface FAQSectionProps {
  cruise: CruiseDestination
}

export default function FAQSection({ cruise }: FAQSectionProps) {
  if (!cruise.faq || cruise.faq.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {cruise.faq.map((item, index) => (
              <details
                key={index}
                className="bg-white rounded-lg shadow-md p-6 group"
                // Use details/summary for better performance and accessibility
              >
                <summary className="text-xl font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {item.question}
                  <svg
                    className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="text-gray-800 leading-relaxed mt-3">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
