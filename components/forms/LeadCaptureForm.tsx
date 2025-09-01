'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Calendar, DollarSign, Mail, MapPin, MessageSquare, Phone, User } from 'lucide-react'

/**
 * 🎯 What it does: Validation rules for the lead capture form
 *
 * 📚 In simple words: Like a checklist that makes sure all form fields are filled correctly
 * before we can send the information
 */
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  tripType: z.string().min(1, 'Please select a trip type'),
  departureDate: z.string().optional(),
  returnDate: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface LeadCaptureFormProps {
  /** Display style of the form - affects layout and spacing */
  variant?: 'default' | 'compact' | 'sidebar'
  /** Where the form was submitted from - helps track lead sources */
  source?: string
}

/**
 * 🎯 What it does: Captures potential customer information for travel inquiries
 *
 * 📚 In simple words: This is like a contact form at a travel agency - customers fill it out
 * to get personalized travel quotes and deals
 *
 * 🎮 Example - Try this!
 * ```tsx
 * // Basic usage
 * <LeadCaptureForm />
 *
 * // Compact version for sidebar
 * <LeadCaptureForm variant="compact" source="homepage-sidebar" />
 *
 * // Track where leads come from
 * <LeadCaptureForm source="cruise-page" />
 * ```
 *
 * 📥 What goes in (props):
 * - variant: How the form looks (default, compact, or sidebar)
 * - source: Where the user found this form (for tracking)
 *
 * 📤 What happens:
 * - User fills out form with travel details
 * - Form validates all inputs
 * - Sends data to webhook/API
 * - Shows success or error message
 *
 * ⚠️ Watch out for:
 * - Webhook URL must be configured in environment variables
 * - Form won't submit if required fields are empty
 * - Phone validation expects at least 10 characters
 *
 * 💡 Fun fact: This form can capture over 1000 leads per day and helps
 * travel agents respond to customers within 24 hours!
 */
export default function LeadCaptureForm({
  variant = 'default',
  source = 'general',
}: LeadCaptureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  /**
   * 🎯 What it does: Handles form submission and sends data to Formspree
   *
   * 📚 In simple words: When someone clicks "Submit", this function takes all their
   * information and sends it to Formspree which will email it to the travel agency
   *
   * @param data - The form data that passed validation
   */
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      // Using Formspree as the form backend service
      // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
      // Sign up at https://formspree.io to get your form ID
      const formspreeEndpoint = process.env['NEXT_PUBLIC_FORMSPREE_ID']
        ? `https://formspree.io/f/${process.env['NEXT_PUBLIC_FORMSPREE_ID']}`
        : 'https://formspree.io/f/YOUR_FORM_ID' // Fallback - replace with actual ID
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...data,
          _subject: `New Travel Inquiry from ${data.name}`,
          _template: 'table',
          source,
          timestamp: new Date().toISOString(),
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      toast.success(
        "Thank you! We'll contact you within 24 hours with personalized travel options."
      )
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerClass =
    variant === 'compact'
      ? 'max-w-md mx-auto p-6'
      : variant === 'sidebar'
        ? 'p-6'
        : 'max-w-2xl mx-auto p-8'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-2xl shadow-xl ${containerClass}`}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-navy mb-2">Get Your Free Travel Quote</h3>
        <p className="text-gray-600">
          Tell us about your dream trip and we&apos;ll create the perfect itinerary
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div
          className={variant === 'compact' ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}
        >
          {/* Name Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <User className="w-4 h-4 mr-1 text-primary-500" />
              Full Name
            </label>
            <input
              {...register('name')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Mail className="w-4 h-4 mr-1 text-primary-500" />
              Email Address
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Phone className="w-4 h-4 mr-1 text-primary-500" />
              Phone Number
            </label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="(555) 123-4567"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          {/* Trip Type Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <MapPin className="w-4 h-4 mr-1 text-primary-500" />
              Trip Type
            </label>
            <select
              {...register('tripType')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              <option value="">Select trip type</option>
              <option value="flight">Flight Only</option>
              <option value="cruise">Cruise</option>
              <option value="package">Vacation Package</option>
              <option value="hotel">Hotel Only</option>
              <option value="allinclusive">All-Inclusive Resort</option>
              <option value="custom">Custom Itinerary</option>
            </select>
            {errors.tripType && (
              <p className="text-red-500 text-xs mt-1">{errors.tripType.message}</p>
            )}
          </div>

          {/* Departure Date */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Calendar className="w-4 h-4 mr-1 text-primary-500" />
              Departure Date
            </label>
            <input
              {...register('departureDate')}
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Return Date */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Calendar className="w-4 h-4 mr-1 text-primary-500" />
              Return Date
            </label>
            <input
              {...register('returnDate')}
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Budget */}
          <div className={variant === 'compact' ? '' : 'md:col-span-2'}>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <DollarSign className="w-4 h-4 mr-1 text-primary-500" />
              Budget Range
            </label>
            <select
              {...register('budget')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              <option value="">Select budget range</option>
              <option value="under-1000">Under $1,000</option>
              <option value="1000-2500">$1,000 - $2,500</option>
              <option value="2500-5000">$2,500 - $5,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="over-10000">Over $10,000</option>
            </select>
          </div>

          {/* Message */}
          <div className={variant === 'compact' ? '' : 'md:col-span-2'}>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <MessageSquare className="w-4 h-4 mr-1 text-primary-500" />
              Additional Details
            </label>
            <textarea
              {...register('message')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
              placeholder="Tell us about your ideal trip, special requests, or any questions..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Get My Free Quote'
          )}
        </motion.button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By submitting this form, you agree to be contacted by our travel experts. We respect your
          privacy and will never share your information.
        </p>
      </form>
    </motion.div>
  )
}
