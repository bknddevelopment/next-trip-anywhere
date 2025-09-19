/**
 * Comprehensive Newark Airport Transfer Component
 * Displays detailed, authoritative content for airport transportation
 */

import React from 'react'
import Link from 'next/link'
import { getEnhancedAirportServiceContent } from '@/lib/seo/newark-airport-service'

interface NewarkAirportTransferProps {
  cityName: string
  citySlug: string
}

export default function NewarkAirportTransfer({ cityName, citySlug }: NewarkAirportTransferProps) {
  const content = getEnhancedAirportServiceContent('airport-transfers', cityName)

  if (!content) {
    return null
  }

  return (
    <div className="newark-airport-transfer">
      {/* Hero Section with Stats */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {content.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">{content.hero.subtitle}</p>
            <p className="text-lg mb-10 leading-relaxed">{content.hero.description}</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {content.hero.stats.map((stat, index) => (
                <div key={index} className="bg-blue-800/50 rounded-lg p-4 backdrop-blur">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${content.booking.phoneNumber.replace(/-/g, '')}`}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 text-center"
              >
                Call {content.booking.phoneNumber}
              </a>
              <Link
                href={content.booking.onlineBookingUrl}
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 text-center"
              >
                Book Online Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto prose prose-lg"
            dangerouslySetInnerHTML={{ __html: content.mainContent.introduction }}
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {content.mainContent.whyChooseUs.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {content.mainContent.whyChooseUs.points.map((point, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-900">{point.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transportation Options Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {content.mainContent.transportOptions.title}
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              {content.mainContent.transportOptions.introduction}
            </p>

            <div className="space-y-8">
              {content.mainContent.transportOptions.options.map((option, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-2 md:mb-0">
                      {option.method}
                    </h3>
                    <div className="flex gap-6">
                      <span className="text-lg font-medium text-green-600">{option.cost}</span>
                      <span className="text-lg text-gray-600">{option.time}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {option.pros.map((pro, idx) => (
                          <li key={idx}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2">Cons:</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {option.cons.map((con, idx) => (
                          <li key={idx}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <span className="text-sm font-medium text-gray-600">Best for: </span>
                    <span className="text-sm text-gray-800">{option.bestFor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Guide */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {content.terminalGuide.title}
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              {content.terminalGuide.introduction}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {content.terminalGuide.terminals.map((terminal, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">{terminal.name}</h3>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-2">Airlines:</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {terminal.airlines.join(', ')}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-2">Gates:</h4>
                    <p className="text-gray-600">{terminal.gates}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-2">Amenities:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {terminal.amenities.slice(0, 3).map((amenity, idx) => (
                        <li key={idx}>• {amenity}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-2">Parking:</h4>
                    {terminal.parking.map((parking, idx) => (
                      <div key={idx} className="text-sm text-gray-600 mb-1">
                        {parking.type}: <span className="font-medium">{parking.rate}</span>
                      </div>
                    ))}
                  </div>

                  {terminal.tips && terminal.tips.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2">Tips:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {terminal.tips.slice(0, 2).map((tip: string, idx: number) => (
                          <li key={idx}>💡 {tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local Area Information */}
      {content.localAreaInfo.pickupPoints.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {content.localAreaInfo.title}
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Popular Pickup Points */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">
                    Popular {cityName} Pickup Locations
                  </h3>
                  <ul className="space-y-2">
                    {content.localAreaInfo.pickupPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">📍</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Local Tips */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">Local Expert Tips</h3>
                  <ul className="space-y-2">
                    {content.localAreaInfo.localTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">💡</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Traffic Patterns */}
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Typical Traffic Patterns
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(content.localAreaInfo.trafficPatterns).map(([time, pattern]) => (
                    <div key={time}>
                      <h4 className="font-medium text-gray-700 capitalize mb-1">{time}:</h4>
                      <p className="text-sm text-gray-600">{pattern}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Vehicle Options */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Choose Your Perfect Airport Transfer Vehicle
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.vehicleOptions.map((vehicle, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">{vehicle.type}</h3>
                  <p className="text-sm text-gray-600 mb-3">{vehicle.capacity}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    <span className="font-medium">Examples:</span> {vehicle.examples}
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    <span className="font-medium">Best for:</span> {vehicle.bestFor}
                  </p>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600">Features: {vehicle.features.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {content.faqs.title}
            </h2>

            <div className="space-y-6">
              {content.faqs.questions.slice(0, 10).map((faq, index) => (
                <details
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 group"
                >
                  <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
                    <span>{faq.question}</span>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href={`/locations/essex-county/${citySlug}/airport-transfers/faqs`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All {content.faqs.questions.length} FAQs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {content.trustSignals.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {content.trustSignals.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-blue-800/50 rounded-lg p-6 backdrop-blur">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-blue-100 mb-3 italic">"{testimonial.text}"</p>
                  <p className="text-sm text-blue-200">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Book Your {cityName} to Newark Airport Transfer?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied {cityName} residents who trust Next Trip Anywhere for
            reliable, professional Newark Airport transportation.
          </p>

          <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <ul className="grid grid-cols-2 gap-3 text-left">
              {content.booking.benefits.map((benefit, index) => (
                <li key={index} className="text-white">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${content.booking.phoneNumber.replace(/-/g, '')}`}
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
            >
              Call Now: {content.booking.phoneNumber}
            </a>
            <Link
              href={content.booking.onlineBookingUrl}
              className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
            >
              Book Online & Save 10%
            </Link>
          </div>

          {content.booking.urgentMessage && (
            <p className="mt-6 text-yellow-200 font-medium">⚡ {content.booking.urgentMessage}</p>
          )}
        </div>
      </section>
    </div>
  )
}
