'use client'

import { Phone, Mail, ArrowRight } from 'lucide-react'
import { useInteractionAnalytics } from '@/hooks/useAnalytics'
import { trackConversion } from '@/lib/analytics'

interface BookingFormProps {
  bookingType?: 'flight' | 'cruise' | 'package'
  className?: string
  onSubmit?: (data: any) => void
}

/**
 * Booking CTA with redirect to Google Forms
 * Replaces the old multi-step form with a simple button redirect
 */
export default function OptimizedBookingForm({ className = '' }: BookingFormProps) {
  const { trackPhoneCall, trackEmailClick } = useInteractionAnalytics()

  const handleQuoteClick = () => {
    // Track conversion for analytics
    trackConversion({
      type: 'form_submit',
      value: 0,
      form_data: {
        action: 'google_forms_booking_form_redirect',
      },
    })

    // Redirect to Google Form
    window.location.href =
      'https://docs.google.com/forms/d/e/1FAIpQLSe5Wy5yxW42FXTyFDsBPK7A0eqqcP_XKYCf-PHhd9vmlfvVWQ/viewform'
  }

  const handlePhoneClick = () => {
    trackPhoneCall('+1-833-874-1019', 'booking_cta')
    window.location.href = 'tel:+18338741019'
  }

  const handleEmailClick = () => {
    trackEmailClick('info@nexttripanywhere.com', 'booking_cta')
    window.location.href = 'mailto:info@nexttripanywhere.com'
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}>
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Dream Vacation</h2>
        <p className="text-lg text-gray-600 mb-2">
          Let our expert travel agents plan your perfect getaway
        </p>
        <p className="text-sm text-gray-500">
          Takes only 2 minutes • No obligation • 100% free consultation
        </p>
      </div>

      {/* Main CTA Button */}
      <div className="mb-10">
        <button
          onClick={handleQuoteClick}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Start Planning Your Trip
          <ArrowRight className="h-6 w-6" />
        </button>
        <p className="text-center text-sm text-gray-500 mt-3">
          Click to fill out our quick travel booking form
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="text-center">
          <div className="text-blue-600 font-semibold mb-1">Expert Planning</div>
          <div className="text-sm text-gray-600">Professional agents with 20+ years experience</div>
        </div>
        <div className="text-center">
          <div className="text-blue-600 font-semibold mb-1">Best Prices</div>
          <div className="text-sm text-gray-600">Exclusive deals and group rates available</div>
        </div>
        <div className="text-center">
          <div className="text-blue-600 font-semibold mb-1">24/7 Support</div>
          <div className="text-sm text-gray-600">Always available during your trip</div>
        </div>
      </div>

      {/* Alternative Contact Methods */}
      <div className="pt-8 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-600 mb-4 font-medium">Prefer to talk? We're here to help!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handlePhoneClick}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition-colors"
            >
              <Phone className="h-5 w-5" />
              Call (833) 874-1019
            </button>
            <button
              onClick={handleEmailClick}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-semibold transition-colors"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Monday-Friday 9AM-6PM EST • Saturday 10AM-4PM EST
          </p>
        </div>
      </div>
    </div>
  )
}
