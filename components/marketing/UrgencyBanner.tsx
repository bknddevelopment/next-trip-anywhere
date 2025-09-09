'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Zap, Users, AlertTriangle, X } from 'lucide-react'

interface UrgencyBannerProps {
  type?: 'limited-time' | 'limited-seats' | 'price-drop' | 'booking-deadline'
  title?: string
  description?: string
  expiryTime?: Date
  currentBookings?: number
  maxBookings?: number
  discount?: number
  onClose?: () => void
  className?: string
}

export default function UrgencyBanner({
  type = 'limited-time',
  title,
  description,
  expiryTime,
  currentBookings = 8,
  maxBookings = 12,
  discount = 25,
  onClose,
  className = ''
}: UrgencyBannerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number
    minutes: number
    seconds: number
  }>({ hours: 0, minutes: 0, seconds: 0 })
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!expiryTime && type === 'limited-time') {
      // Default to 24 hours from now
      const defaultExpiry = new Date()
      defaultExpiry.setHours(defaultExpiry.getHours() + 24)
      expiryTime = defaultExpiry
    }

    if (expiryTime) {
      const updateTimer = () => {
        const now = new Date().getTime()
        const expiry = expiryTime!.getTime()
        const difference = expiry - now

        if (difference > 0) {
          setTimeLeft({
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          })
        } else {
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        }
      }

      updateTimer()
      const interval = setInterval(updateTimer, 1000)
      return () => clearInterval(interval)
    }
  }, [expiryTime, type])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  const getBannerConfig = () => {
    switch (type) {
      case 'limited-time':
        return {
          icon: Clock,
          bgColor: 'bg-gradient-to-r from-red-500 to-red-600',
          title: title || `${discount}% Off Limited Time Flash Sale!`,
          description: description || 'Book now to secure these exclusive savings before they expire.',
          showTimer: true
        }
      case 'limited-seats':
        return {
          icon: Users,
          bgColor: 'bg-gradient-to-r from-orange-500 to-orange-600',
          title: title || 'Only Limited Spots Remaining!',
          description: description || `${maxBookings - currentBookings} seats left at this special rate.`,
          showSeats: true
        }
      case 'price-drop':
        return {
          icon: Zap,
          bgColor: 'bg-gradient-to-r from-green-500 to-green-600',
          title: title || `Prices Just Dropped ${discount}%!`,
          description: description || 'We found better rates and passed the savings to you.',
          showTimer: false
        }
      case 'booking-deadline':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-gradient-to-r from-purple-500 to-purple-600',
          title: title || 'Booking Deadline Approaching!',
          description: description || 'Secure your preferred dates before availability closes.',
          showTimer: true
        }
      default:
        return {
          icon: Clock,
          bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
          title: title || 'Special Offer Available!',
          description: description || 'Limited time opportunity - book now!',
          showTimer: false
        }
    }
  }

  const config = getBannerConfig()
  const Icon = config.icon

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`relative ${config.bgColor} text-white py-3 px-4 ${className}`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: type === 'limited-time' ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="flex-shrink-0"
              >
                <Icon className="w-6 h-6" />
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{config.title}</h4>
                    <p className="text-sm opacity-90 hidden md:block">{config.description}</p>
                  </div>

                  {/* Timer */}
                  {config.showTimer && (timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0) && (
                    <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-1 mt-2 md:mt-0">
                      <Clock className="w-4 h-4" />
                      <div className="flex space-x-1 font-mono font-bold">
                        <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span>:</span>
                        <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span>:</span>
                        <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                      </div>
                    </div>
                  )}

                  {/* Seats Counter */}
                  {config.showSeats && (
                    <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-1 mt-2 md:mt-0">
                      <Users className="w-4 h-4" />
                      <span className="font-bold">
                        {maxBookings - currentBookings} left
                      </span>
                    </div>
                  )}

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-gray-900 font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mt-2 md:mt-0 whitespace-nowrap"
                  >
                    Book Now & Save
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="flex-shrink-0 ml-4 text-white/80 hover:text-white transition-colors"
              aria-label="Close banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-4 -left-4 w-8 h-8 bg-white/10 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, 20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 w-6 h-6 bg-white/10 rounded-full"
            animate={{
              x: [0, -80, 0],
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Pre-configured urgency banners for different scenarios
export const FlashSaleUrgency = () => (
  <UrgencyBanner
    type="limited-time"
    title="⚡ 48-Hour Flash Sale - Save 35%!"
    description="Exclusive rates on flights, cruises & vacation packages. Limited time offer!"
    discount={35}
  />
)

export const LimitedSeatsUrgency = () => (
  <UrgencyBanner
    type="limited-seats"
    title="🔥 High Demand Alert!"
    description="Only a few seats left at these special rates."
    currentBookings={9}
    maxBookings={12}
  />
)

export const PriceDropUrgency = () => (
  <UrgencyBanner
    type="price-drop"
    title="💰 Price Match Victory!"
    description="We found better rates and automatically applied your savings."
    discount={20}
  />
)

export const BookingDeadlineUrgency = () => (
  <UrgencyBanner
    type="booking-deadline"
    title="⏰ Booking Window Closing Soon!"
    description="Secure your preferred travel dates before they're gone."
  />
)