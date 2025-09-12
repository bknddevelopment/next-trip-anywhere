'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, Send, Clock } from 'lucide-react'
import { useFormAnalytics, useInteractionAnalytics } from '@/hooks/useAnalytics'
import { trackConversion } from '@/lib/analytics'
import toast from 'react-hot-toast'

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number').optional(),
  tripType: z.enum(['flight', 'cruise', 'package', 'other'], {
    required_error: 'Please select a trip type',
  }),
  destination: z.string().min(2, 'Please enter a destination'),
  departureDate: z.string().min(1, 'Please select a departure date'),
  travelers: z.string().min(1, 'Please enter number of travelers'),
  budget: z.enum(['under-1000', '1000-3000', '3000-5000', '5000-10000', 'over-10000']).optional(),
  message: z.string().min(10, 'Please provide more details about your trip'),
  contactPreference: z.enum(['email', 'phone', 'either']).optional().default('either'),
  newsletter: z.boolean().default(false),
})

type ContactFormData = z.infer<typeof contactFormSchema>

/**
 * Contact form with comprehensive analytics tracking
 */
export default function ContactFormWithAnalytics() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  
  // Analytics hooks
  const {
    trackFormStart,
    trackFormProgress,
    trackFormSubmit,
    trackFormError,
    trackFormAbandon,
  } = useFormAnalytics('contact_form')
  
  const { trackPhoneCall, trackEmailClick } = useInteractionAnalytics()

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, dirtyFields },
    reset,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
    defaultValues: {
      contactPreference: 'either',
      newsletter: false,
    }
  })

  // Watch form values for progress tracking
  watch()
  const filledFieldsCount = Object.keys(dirtyFields).length

  // Track form start when user begins typing
  useEffect(() => {
    if (!hasStarted && filledFieldsCount > 0) {
      setHasStarted(true)
      trackFormStart()
    }
  }, [filledFieldsCount, hasStarted, trackFormStart])

  // Track form progress
  useEffect(() => {
    if (hasStarted && filledFieldsCount > 0) {
      trackFormProgress({
        fields_completed: filledFieldsCount,
        total_fields: 11,
        completion_percentage: Math.round((filledFieldsCount / 11) * 100),
        current_field_errors: Object.keys(errors).length,
      })
    }
  }, [filledFieldsCount, hasStarted, errors, trackFormProgress])

  // Track form abandonment on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (hasStarted && !isSubmitting && filledFieldsCount > 0 && filledFieldsCount < 8) {
        trackFormAbandon()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasStarted, isSubmitting, filledFieldsCount, trackFormAbandon])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      await response.json()

      // Track successful form submission
      trackFormSubmit({
        trip_type: data.tripType,
        destination: data.destination,
        travelers_count: parseInt(data.travelers),
        budget_range: data.budget || 'not_specified',
        contact_preference: data.contactPreference,
        newsletter_signup: data.newsletter,
        estimated_value: getBudgetValue(data.budget),
      })

      // Track as conversion
      trackConversion({
        type: 'form_submit',
        value: getBudgetValue(data.budget),
        form_data: {
          trip_type: data.tripType,
          destination: data.destination,
          budget_range: data.budget,
          travelers: data.travelers,
        }
      })

      toast.success('Thank you! We\'ll contact you soon with personalized travel options.')
      reset()
      setHasStarted(false)
      
    } catch (error) {
      console.error('Form submission error:', error)
      
      // Track form error
      trackFormError({
        error_type: 'submission_failed',
        error_message: error instanceof Error ? error.message : 'Unknown error',
        fields_completed: filledFieldsCount,
      })

      toast.error('Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhoneClick = () => {
    trackPhoneCall('+1-833-874-1019', 'contact_form')
  }

  const handleEmailClick = () => {
    trackEmailClick('info@nexttripanywhere.com', 'contact_form')
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Your Personalized Quote</h2>
        <p className="text-gray-600">Tell us about your dream trip and we'll create the perfect itinerary for you</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Phone and Trip Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="tripType" className="block text-sm font-medium text-gray-700 mb-2">
              Trip Type *
            </label>
            <select
              {...register('tripType')}
              id="tripType"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.tripType ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select trip type</option>
              <option value="flight">Flights Only</option>
              <option value="cruise">Cruise Package</option>
              <option value="package">Vacation Package</option>
              <option value="other">Other</option>
            </select>
            {errors.tripType && (
              <p className="text-red-500 text-sm mt-1">{errors.tripType.message}</p>
            )}
          </div>
        </div>

        {/* Destination and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
              Destination *
            </label>
            <input
              {...register('destination')}
              type="text"
              id="destination"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.destination ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Where would you like to go?"
            />
            {errors.destination && (
              <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">
              Departure Date *
            </label>
            <input
              {...register('departureDate')}
              type="date"
              id="departureDate"
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.departureDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.departureDate && (
              <p className="text-red-500 text-sm mt-1">{errors.departureDate.message}</p>
            )}
          </div>
        </div>

        {/* Travelers and Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Travelers *
            </label>
            <select
              {...register('travelers')}
              id="travelers"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.travelers ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select travelers</option>
              <option value="1">1 Traveler</option>
              <option value="2">2 Travelers</option>
              <option value="3">3 Travelers</option>
              <option value="4">4 Travelers</option>
              <option value="5+">5+ Travelers</option>
            </select>
            {errors.travelers && (
              <p className="text-red-500 text-sm mt-1">{errors.travelers.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range (per person)
            </label>
            <select
              {...register('budget')}
              id="budget"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">Select budget range</option>
              <option value="under-1000">Under $1,000</option>
              <option value="1000-3000">$1,000 - $3,000</option>
              <option value="3000-5000">$3,000 - $5,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="over-10000">Over $10,000</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Tell us about your ideal trip *
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
              errors.message ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Share your preferences, special occasions, activities you enjoy, or any other details that will help us plan your perfect trip..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Contact Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How would you prefer to be contacted?
          </label>
          <div className="flex flex-wrap gap-4">
            {[
              { value: 'email', label: 'Email', icon: Mail },
              { value: 'phone', label: 'Phone', icon: Phone },
              { value: 'either', label: 'Either is fine', icon: Clock },
            ].map(({ value, label, icon: Icon }) => (
              <label key={value} className="flex items-center cursor-pointer">
                <input
                  {...register('contactPreference')}
                  type="radio"
                  value={value}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <Icon className="h-4 w-4 ml-2 mr-1 text-gray-500" />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="flex items-center">
          <input
            {...register('newsletter')}
            type="checkbox"
            id="newsletter"
            className="text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
            I'd like to receive travel deals and inspiration emails
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Sending Request...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Get My Custom Quote
            </>
          )}
        </button>
      </form>

      {/* Alternative Contact Methods */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Prefer to talk? We're here to help!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handlePhoneClick}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="h-5 w-5" />
              Call (833) 874-1019
            </button>
            <button
              onClick={handleEmailClick}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Helper function to convert budget range to numeric value for analytics
 */
function getBudgetValue(budget?: string): number {
  const budgetMap: Record<string, number> = {
    'under-1000': 750,
    '1000-3000': 2000,
    '3000-5000': 4000,
    '5000-10000': 7500,
    'over-10000': 12000,
  }
  
  return budget ? budgetMap[budget] || 0 : 0
}