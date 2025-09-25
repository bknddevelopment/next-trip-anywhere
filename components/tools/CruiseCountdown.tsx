'use client'

import { useState, useEffect } from 'react'

interface Milestone {
  daysOut: number
  title: string
  description: string
  completed: boolean
  icon: string
}

const CRUISE_MILESTONES: Milestone[] = [
  {
    daysOut: 120,
    title: 'Book Your Cruise',
    description: 'Best prices and cabin selection available',
    completed: false,
    icon: '🚢',
  },
  {
    daysOut: 90,
    title: 'Final Payment Due',
    description: 'Complete your cruise payment to secure booking',
    completed: false,
    icon: '💳',
  },
  {
    daysOut: 75,
    title: 'Book Shore Excursions',
    description: 'Popular excursions sell out - book early!',
    completed: false,
    icon: '🏝️',
  },
  {
    daysOut: 60,
    title: 'Travel Documents',
    description: 'Ensure passport is valid for 6+ months after travel',
    completed: false,
    icon: '📄',
  },
  {
    daysOut: 45,
    title: 'Online Check-In Opens',
    description: 'Complete online check-in for faster boarding',
    completed: false,
    icon: '✅',
  },
  {
    daysOut: 30,
    title: 'Pre-Cruise Purchases',
    description: 'Buy drink packages, dining, WiFi at discounted rates',
    completed: false,
    icon: '🍹',
  },
  {
    daysOut: 21,
    title: 'Travel Insurance Deadline',
    description: 'Last chance for comprehensive coverage',
    completed: false,
    icon: '🛡️',
  },
  {
    daysOut: 14,
    title: 'Start Packing',
    description: 'Begin gathering items for your cruise',
    completed: false,
    icon: '🧳',
  },
  {
    daysOut: 7,
    title: 'Final Preparations',
    description: 'Print documents, check weather, arrange transportation',
    completed: false,
    icon: '📋',
  },
  {
    daysOut: 3,
    title: 'Pre-Cruise Hotel',
    description: 'Check-in if staying near port before cruise',
    completed: false,
    icon: '🏨',
  },
  {
    daysOut: 1,
    title: 'Tomorrow!',
    description: 'Final packing, charge devices, get excited!',
    completed: false,
    icon: '🎉',
  },
  {
    daysOut: 0,
    title: 'Cruise Day!',
    description: 'Bon Voyage! Have an amazing cruise!',
    completed: false,
    icon: '🎊',
  },
]

export default function CruiseCountdown() {
  const [cruiseDate, setCruiseDate] = useState<string>('')
  const [cruiseName, setCruiseName] = useState<string>('')
  const [cruiseLine, setCruiseLine] = useState<string>('')
  const [destination, setDestination] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [emailReminder, setEmailReminder] = useState('')
  const [shareableLink, setShareableLink] = useState('')

  // Load saved countdown
  useEffect(() => {
    const saved = localStorage.getItem('cruiseCountdown')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setCruiseDate(data.cruiseDate || '')
        setCruiseName(data.cruiseName || '')
        setCruiseLine(data.cruiseLine || '')
        setDestination(data.destination || '')
      } catch (e) {
        // Ignore invalid data
      }
    }
  }, [])

  // Save countdown
  useEffect(() => {
    if (cruiseDate) {
      const data = {
        cruiseDate,
        cruiseName,
        cruiseLine,
        destination,
        savedAt: new Date().toISOString(),
      }
      localStorage.setItem('cruiseCountdown', JSON.stringify(data))
    }
  }, [cruiseDate, cruiseName, cruiseLine, destination])

  // Update countdown timer
  useEffect(() => {
    if (!cruiseDate) {
      return
    }

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(cruiseDate).getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [cruiseDate])

  // Update milestones based on days left
  useEffect(() => {
    if (!cruiseDate) {
      return
    }

    const now = new Date().getTime()
    const target = new Date(cruiseDate).getTime()
    const daysLeft = Math.floor((target - now) / (1000 * 60 * 60 * 24))

    const updatedMilestones = CRUISE_MILESTONES.map((milestone) => ({
      ...milestone,
      completed: daysLeft < milestone.daysOut,
    }))

    setMilestones(updatedMilestones)
  }, [cruiseDate, timeLeft.days])

  // Generate shareable link
  const generateShareableLink = () => {
    const params = new URLSearchParams({
      date: cruiseDate,
      name: cruiseName,
      line: cruiseLine,
      dest: destination,
    })
    const link = `${window.location.origin}/tools/countdown?${params.toString()}`
    setShareableLink(link)
    navigator.clipboard.writeText(link)
    alert('Countdown link copied to clipboard!')
  }

  // Set email reminder
  const setReminder = () => {
    if (!emailReminder || !cruiseDate) {
      return
    }

    // In production, this would send to an API
    alert(`Reminder set! We'll email ${emailReminder} with important cruise milestones.`)

    // Save email preference
    localStorage.setItem('cruiseReminderEmail', emailReminder)
  }

  const getMotivationalMessage = () => {
    const { days } = timeLeft
    if (days > 100) {
      return 'Your dream cruise awaits! Plenty of time to plan.'
    }
    if (days > 60) {
      return 'Getting closer! Time to start planning excursions.'
    }
    if (days > 30) {
      return 'One month to go! Have you completed online check-in?'
    }
    if (days > 14) {
      return 'Two weeks away! Time to start packing!'
    }
    if (days > 7) {
      return 'One week! The excitement is building!'
    }
    if (days > 1) {
      return 'Almost there! Final preparations time!'
    }
    if (days === 1) {
      return 'TOMORROW! Get some rest for your big day!'
    }
    if (days === 0 && timeLeft.hours > 0) {
      return 'TODAY IS THE DAY! Bon Voyage!'
    }
    return 'Have an amazing cruise!'
  }

  const upcomingMilestones = milestones.filter((m) => !m.completed).slice(0, 3)

  const completedMilestones = milestones.filter((m) => m.completed)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Cruise Countdown Timer</h2>

      {/* Cruise Details Form */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cruise Date</label>
          <input
            type="date"
            value={cruiseDate}
            onChange={(e) => setCruiseDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cruise Name (Optional)
          </label>
          <input
            type="text"
            value={cruiseName}
            onChange={(e) => setCruiseName(e.target.value)}
            placeholder="e.g., 7-Day Caribbean"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cruise Line (Optional)
          </label>
          <input
            type="text"
            value={cruiseLine}
            onChange={(e) => setCruiseLine(e.target.value)}
            placeholder="e.g., Royal Caribbean"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination (Optional)
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Eastern Caribbean"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {cruiseDate && (
        <>
          {/* Countdown Display */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-8 text-white text-center mb-8">
            {cruiseName && <h3 className="text-2xl font-bold mb-2">{cruiseName}</h3>}
            {(cruiseLine || destination) && (
              <p className="text-white opacity-90 mb-4">
                {cruiseLine && <span>{cruiseLine}</span>}
                {cruiseLine && destination && <span> • </span>}
                {destination && <span>{destination}</span>}
              </p>
            )}

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div>
                <div className="text-4xl md:text-5xl font-bold">{timeLeft.days}</div>
                <div className="text-sm text-white opacity-90">Days</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm text-white opacity-90">Hours</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm text-white opacity-90">Minutes</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm text-white opacity-90">Seconds</div>
              </div>
            </div>

            <p className="text-lg font-medium text-white">{getMotivationalMessage()}</p>
          </div>

          {/* Milestones */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Upcoming Milestones */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Upcoming Milestones</h3>
              <div className="space-y-3">
                {upcomingMilestones.length > 0 ? (
                  upcomingMilestones.map((milestone, index) => (
                    <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                      <span className="text-2xl mr-3">{milestone.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">
                          {milestone.title}
                          <span className="text-sm text-gray-600 ml-2">
                            ({milestone.daysOut} days before)
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">{milestone.description}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">All milestones completed!</p>
                )}
              </div>
            </div>

            {/* Completed Milestones */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Completed Milestones</h3>
              <div className="space-y-2">
                {completedMilestones.length > 0 ? (
                  completedMilestones.slice(0, 5).map((milestone, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {milestone.title}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No milestones completed yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Share and Remind */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <button
                onClick={generateShareableLink}
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Share Countdown Link
              </button>
              {shareableLink && (
                <p className="text-xs text-gray-600 mt-1">Link copied to clipboard!</p>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="email"
                value={emailReminder}
                onChange={(e) => setEmailReminder(e.target.value)}
                placeholder="Email for reminders"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={setReminder}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
              >
                Set
              </button>
            </div>
          </div>
        </>
      )}

      {/* CTA */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-sm text-gray-600 mb-3">
          Need help planning your cruise? Our Essex County experts are ready to assist!
        </p>
        <a
          href="tel:833-874-1019"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Call 833-874-1019
        </a>
      </div>
    </div>
  )
}
