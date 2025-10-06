/**
 * Testimonials Section - Placeholder for Real Reviews
 *
 * Phase 6: Homepage Optimization
 *
 * IMPORTANT: Replace with actual customer testimonials
 * - Get written permission from customers
 * - Use real names with last initial only
 * - Include verified purchase details
 * - Add date of travel
 * - Consider using Google Reviews API when GBP is set up
 */

import { Star } from 'lucide-react'

export default function TestimonialsSection() {
  // TODO: Replace with real customer reviews
  // Collect from:
  // 1. Post-cruise surveys
  // 2. Email follow-ups
  // 3. Google Business Profile reviews (when set up)
  // 4. Facebook reviews
  // 5. Direct customer feedback

  const placeholderTestimonials = [
    {
      id: 1,
      // Real testimonial structure - populate when available
      quote: 'Excellent service from start to finish. Made booking our Caribbean cruise so easy!',
      author: 'Sarah M.',
      location: 'Newark, NJ',
      trip: 'Caribbean Cruise',
      date: '2024',
      verified: false, // Change to true when real
    },
    {
      id: 2,
      quote: 'Best prices we found anywhere. The team helped us save over $500 on our vacation.',
      author: 'John D.',
      location: 'Montclair, NJ',
      trip: 'All-Inclusive Resort',
      date: '2024',
      verified: false,
    },
    {
      id: 3,
      quote:
        '24/7 support was incredible when we had to change our travel dates. Highly recommend!',
      author: 'Maria L.',
      location: 'Bloomfield, NJ',
      trip: 'Flight + Hotel Package',
      date: '2024',
      verified: false,
    },
  ]

  // Don't show testimonials section until real reviews are collected
  const hasRealReviews = false // Change to true when you have verified testimonials

  if (!hasRealReviews) {
    return (
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 shadow-md">
            <p className="text-gray-700 mb-6">
              We're building our review collection. Recently helped a customer?
            </p>
            <div className="space-y-4 text-left">
              <p className="text-sm text-gray-600">✓ 15+ years serving Essex County travelers</p>
              <p className="text-sm text-gray-600">✓ Thousands of successful bookings</p>
              <p className="text-sm text-gray-600">✓ Direct cruise line and airline partnerships</p>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Be our first reviewer! Call 833-874-1019 to book and share your experience.
            </p>
          </div>
        </div>
      </section>
    )
  }

  // This will show when hasRealReviews = true
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {placeholderTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
                <p className="text-sm text-gray-500">
                  {testimonial.trip} • {testimonial.date}
                </p>
                {testimonial.verified && (
                  <p className="text-xs text-green-600 mt-2">✓ Verified Customer</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
