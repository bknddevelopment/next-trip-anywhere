'use client'

import { useState } from 'react'

interface PromoCode {
  name: string
  code: string
}

interface DealTermsProps {
  restrictions: string[]
  promoCodes: PromoCode[]
  campaignCode: string
  depositInfo: string
  additionalInfo: string[]
}

export default function DealTerms({
  restrictions,
  promoCodes,
  campaignCode,
  depositInfo,
  additionalInfo,
}: DealTermsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Promo Codes Box */}
        <div className="bg-blue-900 text-white rounded-xl p-8 mb-8 shadow-xl">
          <h3 className="text-2xl font-bold mb-6 text-center">
            📋 Promotional Codes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {promoCodes.map((promo, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20"
              >
                <p className="text-sm text-white/80 mb-1">{promo.name}</p>
                <div className="flex items-center justify-between">
                  <code className="text-2xl font-bold text-yellow-400">
                    {promo.code}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(promo.code)
                      alert('Promo code copied to clipboard!')
                    }}
                    className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center border-t border-white/20 pt-4">
            <p className="text-sm text-white/80 mb-1">Campaign Code</p>
            <code className="text-xl font-bold text-yellow-400">{campaignCode}</code>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-8 py-6 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-2xl font-bold text-gray-900">
              Terms & Conditions
            </h3>
            <svg
              className={`w-6 h-6 text-gray-600 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExpanded && (
            <div className="px-8 py-6 space-y-6">
              {/* Restrictions */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">
                  Offer Restrictions:
                </h4>
                <ul className="space-y-2">
                  {restrictions.map((restriction, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-orange-500 flex-shrink-0 mt-1">•</span>
                      <span className="text-gray-700 text-sm">{restriction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deposit Info */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">
                  Deposit Information:
                </h4>
                <p className="text-gray-700 text-sm">{depositInfo}</p>
              </div>

              {/* Additional Info */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">
                  Additional Details:
                </h4>
                <ul className="space-y-2">
                  {additionalInfo.map((info, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                      <span className="text-gray-700 text-sm">{info}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-6 mt-6">
                <h4 className="font-bold text-gray-900 mb-3 text-lg text-center">
                  Questions About This Offer?
                </h4>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                  <a
                    href="tel:8338741019"
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call 833-874-1019
                  </a>
                  <a
                    href="mailto:info@nexttripanywhere.com"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
