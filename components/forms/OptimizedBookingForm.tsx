'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  Calendar, 
  Users, 
  User, 
  Mail, 
  Phone, 
  ArrowRight,
  ArrowLeft,
  Check,
  Shield
} from 'lucide-react'
import ProgressIndicator, { Step } from '@/components/ui/ProgressIndicator'

interface BookingFormData {
  // Step 1: Trip Details
  from: string
  to: string
  departureDate: string
  returnDate: string
  tripType: string
  
  // Step 2: Travelers
  adults: number
  children: number
  infants: number
  travelClass: string
  specialRequests: string
  
  // Step 3: Contact
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredContact: string
  marketingConsent: boolean
}

interface BookingFormProps {
  bookingType?: 'flight' | 'cruise' | 'package'
  onSubmit?: (data: BookingFormData) => void
  className?: string
}

const steps: Step[] = [
  {
    id: 'details',
    title: 'Trip Details',
    description: 'Where and when do you want to go?'
  },
  {
    id: 'travelers',
    title: 'Traveler Info',
    description: 'Tell us about your group'
  },
  {
    id: 'contact',
    title: 'Contact & Submit',
    description: 'How can we reach you?'
  }
]

export default function OptimizedBookingForm({ 
  onSubmit,
  className = '' 
}: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Trip Details
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    tripType: 'roundtrip',
    
    // Step 2: Travelers
    adults: 1,
    children: 0,
    infants: 0,
    travelClass: 'economy',
    specialRequests: '',
    
    // Step 3: Contact
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    marketingConsent: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (field: keyof BookingFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.from) {
        newErrors.from = 'Please select departure city'
      }
      if (!formData.to) {
        newErrors.to = 'Please select destination'
      }
      if (!formData.departureDate) {
        newErrors.departureDate = 'Please select departure date'
      }
      if (formData.tripType === 'roundtrip' && !formData.returnDate) {
        newErrors.returnDate = 'Please select return date'
      }
    }

    if (step === 2) {
      if (formData.adults < 1) {
        newErrors.adults = 'At least 1 adult required'
      }
    }

    if (step === 3) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required'
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required'
      }
      if (!formData.email) {
        newErrors.email = 'Email is required'
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return
    }

    setIsSubmitting(true)
    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Default implementation: redirect to n8n form with data
        const queryParams = new URLSearchParams({
          from: formData.from,
          to: formData.to,
          departureDate: formData.departureDate,
          returnDate: formData.returnDate,
          adults: formData.adults.toString(),
          children: formData.children.toString(),
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
        })
        window.open(`https://nextripanywhere.app.n8n.cloud/form/travel-quote-form?${queryParams.toString()}`, '_blank')
      }
    } catch (error) {
      console.error('Booking submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Where would you like to go?
      </h3>

      {/* Trip Type */}
      <div className="flex space-x-4">
        {['roundtrip', 'oneway', 'multicity'].map((type) => (
          <label key={type} className="flex items-center cursor-pointer">
            <input
              type="radio"
              value={type}
              checked={formData.tripType === type}
              onChange={(e) => updateFormData('tripType', e.target.value)}
              className="mr-2 text-primary-600"
            />
            <span className="capitalize">{type === 'oneway' ? 'One Way' : type === 'multicity' ? 'Multi-City' : 'Round Trip'}</span>
          </label>
        ))}
      </div>

      {/* From/To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 mr-1 text-primary-500" />
            From
          </label>
          <input
            type="text"
            value={formData.from}
            onChange={(e) => updateFormData('from', e.target.value)}
            placeholder="City or Airport Code"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.from ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.from && <p className="text-red-500 text-xs mt-1">{errors.from}</p>}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 mr-1 text-primary-500" />
            To
          </label>
          <input
            type="text"
            value={formData.to}
            onChange={(e) => updateFormData('to', e.target.value)}
            placeholder="City or Airport Code"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.to ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.to && <p className="text-red-500 text-xs mt-1">{errors.to}</p>}
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 mr-1 text-primary-500" />
            Departure Date
          </label>
          <input
            type="date"
            value={formData.departureDate}
            onChange={(e) => updateFormData('departureDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.departureDate ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.departureDate && <p className="text-red-500 text-xs mt-1">{errors.departureDate}</p>}
        </div>

        {formData.tripType === 'roundtrip' && (
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-1 text-primary-500" />
              Return Date
            </label>
            <input
              type="date"
              value={formData.returnDate}
              onChange={(e) => updateFormData('returnDate', e.target.value)}
              min={formData.departureDate || new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.returnDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>}
          </div>
        )}
      </div>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Tell us about your group
      </h3>

      {/* Travelers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 mr-1 text-primary-500" />
            Adults (18+)
          </label>
          <select
            value={formData.adults}
            onChange={(e) => updateFormData('adults', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {[1,2,3,4,5,6,7,8].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          {errors.adults && <p className="text-red-500 text-xs mt-1">{errors.adults}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Children (2-17)
          </label>
          <select
            value={formData.children}
            onChange={(e) => updateFormData('children', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {[0,1,2,3,4,5,6].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Infants (Under 2)
          </label>
          <select
            value={formData.infants}
            onChange={(e) => updateFormData('infants', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {[0,1,2,3,4].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Travel Class */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Travel Class
        </label>
        <select
          value={formData.travelClass}
          onChange={(e) => updateFormData('travelClass', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="economy">Economy</option>
          <option value="premium-economy">Premium Economy</option>
          <option value="business">Business Class</option>
          <option value="first">First Class</option>
        </select>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Special Requests (Optional)
        </label>
        <textarea
          value={formData.specialRequests}
          onChange={(e) => updateFormData('specialRequests', e.target.value)}
          rows={3}
          placeholder="Dietary requirements, accessibility needs, celebrations, etc."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        How can we reach you?
      </h3>

      {/* Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 mr-1 text-primary-500" />
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.firstName ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData('lastName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.lastName ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 mr-1 text-primary-500" />
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 mr-1 text-primary-500" />
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.phone ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Preferred Contact */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Contact Method
        </label>
        <div className="flex space-x-4">
          {[
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone' },
            { value: 'either', label: 'Either' }
          ].map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                value={option.value}
                checked={formData.preferredContact === option.value}
                onChange={(e) => updateFormData('preferredContact', e.target.value)}
                className="mr-2 text-primary-600"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Marketing Consent */}
      <div className="bg-gray-50 rounded-lg p-4">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            checked={formData.marketingConsent}
            onChange={(e) => updateFormData('marketingConsent', e.target.checked)}
            className="mr-3 mt-1 text-primary-600"
          />
          <div className="text-sm">
            <span className="text-gray-700">
              I'd like to receive exclusive travel deals and updates from Next Trip Anywhere.
            </span>
            <p className="text-gray-500 text-xs mt-1">
              You can unsubscribe at any time. We never share your information.
            </p>
          </div>
        </label>
      </div>

      {/* Security Notice */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <Shield className="w-5 h-5 text-blue-500" />
        <span>Your information is secure and protected. We never share personal data.</span>
      </div>
    </motion.div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      default:
        return renderStep1()
    }
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Progress Indicator */}
      <ProgressIndicator steps={steps} currentStep={currentStep} className="mb-8" />

      {/* Form Content */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <AnimatePresence mode="wait">
          {renderCurrentStep()}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="text-sm text-gray-500">
            Need help? Call <a href="tel:1-833-874-1019" className="text-primary-600 hover:underline">1-833-874-1019</a>
          </div>

          {currentStep < steps.length ? (
            <motion.button
              onClick={nextStep}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.button
              onClick={handleSubmit}
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>Get My Quote</span>
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}