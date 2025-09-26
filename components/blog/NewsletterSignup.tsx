'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('https://nextripanywhere.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'blog-newsletter',
          type: 'newsletter-signup',
          message: 'Newsletter signup from blog',
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      toast.success('Thank you for subscribing to our newsletter!')
      setEmail('')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white my-12">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">Get Travel Tips & Exclusive Deals</h2>
        <p className="text-lg mb-6 text-white/90">
          Join thousands of Essex County families who receive our weekly travel newsletter with
          insider tips, destination guides, and exclusive flight deals from Newark Airport.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        <p className="text-sm mt-4 text-white/75">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
