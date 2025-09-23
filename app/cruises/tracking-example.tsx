/**
 * Example implementation of cruise tracking in a cruise page
 * This file demonstrates best practices for analytics integration
 */

'use client'

import { useEffect, useState } from 'react'
import {
  useCruiseTracking,
  useCruiseSearchTracking,
  useCruiseComparisonTracking,
} from '@/hooks/useCruiseTracking'
import { trackCruiseConversion } from '@/lib/analytics/cruise-tracking'
import CruiseAnalyticsDashboard from '@/components/analytics/CruiseAnalyticsDashboard'

export default function CruisePageExample() {
  // Initialize cruise tracking with page-specific data
  const tracking = useCruiseTracking({
    pageType: 'cruise-destination',
    cruiseData: {
      destination: 'Caribbean',
      cruiseLine: 'Royal Caribbean',
      departurePort: 'Newark/Cape Liberty',
      duration: 7,
      priceRange: '$800-$1500',
    },
    autoTrackPageView: true,
    autoTrackScroll: true,
  })

  // Search tracking for cruise search functionality
  const searchTracking = useCruiseSearchTracking()

  // Comparison tracking for cruise comparison feature
  const comparisonTracking = useCruiseComparisonTracking()

  // Example: Track hero CTA click
  const handleHeroBookNow = () => {
    tracking.trackCTA('book_consultation', 'hero_section', 1500)
    // ... rest of booking logic
  }

  // Example: Track quote form
  const handleQuoteFormStart = () => {
    tracking.trackFormStart('caribbean_cruise_quote')
  }

  const handleQuoteFormSubmit = (formData: any) => {
    tracking.trackFormSubmit('caribbean_cruise_quote', {
      cruise_line: formData.cruiseLine,
      cabin_type: formData.cabinType,
      guests: formData.guests,
      departure_date: formData.departureDate,
    })

    // Also track as conversion
    trackCruiseConversion('get_quote', 1500, {
      form_name: 'caribbean_cruise_quote',
      ...formData,
    })
  }

  // Example: Track search interaction
  const handleCruiseSearch = async (query: string, filters: any) => {
    searchTracking.startSearch()

    // Simulate search API call
    const results = await searchCruises(query, filters)

    searchTracking.trackSearchResults(query, results, filters)

    return results
  }

  // Example: Track video engagement
  const handleVideoPlay = (videoId: string) => {
    tracking.trackVideoPlay(videoId, 'Caribbean Cruise Overview')
  }

  // Example: Track itinerary interaction
  const handleItineraryExpand = (day: number, destination: string) => {
    tracking.trackItineraryExpand(day, destination)
  }

  // Example: Track price calculator
  const handlePriceCalculation = (cabinType: string, guests: number) => {
    const totalPrice = calculatePrice(cabinType, guests)
    tracking.trackPriceCalculator(cabinType, guests, totalPrice)
    return totalPrice
  }

  // Example: Track comparison feature
  const handleAddToComparison = (cruiseId: string, cruiseDetails: any) => {
    comparisonTracking.addToComparison(cruiseId, {
      cruise_line: cruiseDetails.line,
      ship: cruiseDetails.ship,
      price: cruiseDetails.price,
      departure: cruiseDetails.departure,
    })
  }

  // Example: Track phone call
  const handlePhoneClick = () => {
    tracking.trackCTA('call_expert', 'header_phone', 2000)
    trackCruiseConversion('call_expert')
    window.location.href = 'tel:+18338741019'
  }

  return (
    <div>
      {/* Hero Section with tracked CTA */}
      <section className="hero">
        <h1>Caribbean Cruises from Newark</h1>
        <button onClick={handleHeroBookNow} className="btn-primary">
          Book Your Dream Cruise
        </button>
      </section>

      {/* Search with tracking */}
      <section className="search">
        <input
          type="search"
          placeholder="Search cruises..."
          onChange={(e) => {
            if (e.target.value.length > 2) {
              handleCruiseSearch(e.target.value, {})
            }
          }}
        />
      </section>

      {/* Video with engagement tracking */}
      <section className="video">
        <video
          onPlay={() => handleVideoPlay('caribbean-overview')}
          src="/videos/caribbean-cruise.mp4"
        />
      </section>

      {/* Itinerary with interaction tracking */}
      <section className="itinerary">
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <div
            key={day}
            onClick={() => handleItineraryExpand(day, `Day ${day} Port`)}
            className="itinerary-day"
          >
            Day {day}
          </div>
        ))}
      </section>

      {/* Price Calculator with tracking */}
      <section className="calculator">
        <select onChange={(e) => handlePriceCalculation(e.target.value, 2)}>
          <option value="interior">Interior Cabin</option>
          <option value="oceanview">Ocean View</option>
          <option value="balcony">Balcony</option>
          <option value="suite">Suite</option>
        </select>
      </section>

      {/* Quote Form with comprehensive tracking */}
      <section className="quote-form">
        <form
          onFocus={handleQuoteFormStart}
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            handleQuoteFormSubmit(Object.fromEntries(formData))
          }}
        >
          <input
            name="name"
            placeholder="Your Name"
            onBlur={(e) =>
              tracking.trackFormField('caribbean_cruise_quote', 'name', e.target.value)
            }
          />
          <input
            name="email"
            placeholder="Email"
            onBlur={(e) =>
              tracking.trackFormField('caribbean_cruise_quote', 'email', e.target.value)
            }
          />
          <select
            name="cruiseLine"
            onBlur={(e) =>
              tracking.trackFormField('caribbean_cruise_quote', 'cruise_line', e.target.value)
            }
          >
            <option value="">Select Cruise Line</option>
            <option value="royal-caribbean">Royal Caribbean</option>
            <option value="carnival">Carnival</option>
            <option value="norwegian">Norwegian</option>
          </select>
          <button type="submit">Get Free Quote</button>
        </form>
      </section>

      {/* Comparison Feature */}
      <section className="comparison">
        <button
          onClick={() =>
            handleAddToComparison('cruise-123', {
              line: 'Royal Caribbean',
              ship: 'Anthem of the Seas',
              price: 1299,
              departure: '2025-03-15',
            })
          }
        >
          Add to Comparison
        </button>
        <button onClick={() => comparisonTracking.trackComparisonView()}>
          View Comparison ({comparisonTracking.comparisonCount})
        </button>
      </section>

      {/* Phone CTA with conversion tracking */}
      <section className="contact">
        <button onClick={handlePhoneClick}>📞 Call Now: 1-833-874-1019</button>
      </section>

      {/* Admin Dashboard (only visible to admins) */}
      {process.env.NODE_ENV === 'development' && (
        <section className="admin-only">
          <h2>Analytics Dashboard (Admin Only)</h2>
          <CruiseAnalyticsDashboard />
        </section>
      )}
    </div>
  )
}

// Helper functions (would be in separate files in production)
async function searchCruises(query: string, filters: any) {
  // Simulate API call
  return [
    { id: '1', name: 'Caribbean Paradise', price: 999 },
    { id: '2', name: 'Tropical Escape', price: 1299 },
    { id: '3', name: 'Island Adventure', price: 799 },
  ]
}

function calculatePrice(cabinType: string, guests: number) {
  const basePrices: Record<string, number> = {
    interior: 599,
    oceanview: 799,
    balcony: 999,
    suite: 1499,
  }
  return (basePrices[cabinType] || 599) * guests
}
