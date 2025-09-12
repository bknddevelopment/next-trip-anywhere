'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Clock, Phone } from 'lucide-react'

interface ExitIntentPopupProps {
  title?: string
  subtitle?: string
  offerText?: string
  ctaText?: string
  onClose?: () => void
  onSubmit?: (_email: string, _phone?: string) => void
}

export default function ExitIntentPopup({
  title = "Wait! Don't Miss Out on Exclusive Travel Deals!",
  subtitle = 'Get instant access to unpublished rates and save up to 40% on your next vacation',
  offerText = 'Limited Time: Free consultation + Best Price Guarantee',
  ctaText = 'Get My Exclusive Deals',
  onClose,
  onSubmit,
}: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [_isSubmitted, _setIsSubmitted] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    let exitTimer: NodeJS.Timeout

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered && !_isSubmitted) {
        setHasTriggered(true)
        exitTimer = setTimeout(() => {
          setIsVisible(true)
        }, 500)
      }
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasTriggered && !_isSubmitted) {
        setHasTriggered(true)
        setIsVisible(true)
        e.preventDefault()
        e.returnValue = ''
      }
    }

    // Also trigger after user spends time on site (fallback)
    const timeoutTimer = setTimeout(() => {
      if (!hasTriggered && !_isSubmitted) {
        setHasTriggered(true)
        setIsVisible(true)
      }
    }, 45000) // 45 seconds

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      clearTimeout(exitTimer)
      clearTimeout(timeoutTimer)
    }
  }, [hasTriggered, _isSubmitted])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to n8n form
    window.open('https://nextripanywhere.app.n8n.cloud/form/travel-quote-form', '_blank')
    handleClose()
  }

  const handleCallNow = () => {
    window.location.href = 'tel:1-833-874-1019'
    handleClose()
  }

  if (_isSubmitted) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">
                Your exclusive deals are on the way! Our travel experts will contact you within 24
                hours.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close popup"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
              <p className="text-gray-600">{subtitle}</p>
            </div>

            {/* Offer Badge */}
            <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg p-3 mb-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">{offerText}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="popup-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="popup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="popup-phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number (Optional)
                </label>
                <input
                  id="popup-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {ctaText}
                </button>

                <button
                  type="button"
                  onClick={handleCallNow}
                  className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Or Call Now: 1-833-874-1019</span>
                </button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-center items-center space-x-6 text-xs text-gray-500">
                <span>✓ No spam, ever</span>
                <span>✓ Unsubscribe anytime</span>
                <span>✓ Your data is secure</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
