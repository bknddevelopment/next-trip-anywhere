'use client'

import { useState, useEffect } from 'react'

interface LimitedTimeOfferProps {
  expirationDate: string
}

export default function LimitedTimeOffer({ expirationDate }: LimitedTimeOfferProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime()
      const expiration = new Date(expirationDate).getTime()
      const difference = expiration - now

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [expirationDate])

  return (
    <section className="py-12 bg-gradient-to-r from-red-600 to-orange-600 sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Urgency Message */}
          <div className="text-white text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              ⏰ Limited Time Offer - Don't Miss Out!
            </h3>
            <p className="text-white/90 text-lg">
              Book before the deal expires and lock in these incredible savings
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="flex gap-4">
            {[
              { label: 'Days', value: timeRemaining.days },
              { label: 'Hours', value: timeRemaining.hours },
              { label: 'Mins', value: timeRemaining.minutes },
              { label: 'Secs', value: timeRemaining.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="bg-white rounded-lg p-4 min-w-[80px] text-center shadow-xl"
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-gray-600 font-semibold mt-1">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#book-now"
            className="bg-white hover:bg-gray-100 text-red-600 font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl whitespace-nowrap"
          >
            BOOK NOW
          </a>
        </div>
      </div>
    </section>
  )
}
