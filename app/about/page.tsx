import { Metadata } from 'next'
import Image from 'next/image'
import { Award, Users, Globe, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Next Trip Anywhere Travel Agency',
  description:
    'Learn about Next Trip Anywhere, your trusted East Coast travel agency since 2010. Over 50,000 happy travelers and 15+ years of experience.',
}

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-navy mb-6">
              About <span className="text-gradient">Next Trip Anywhere</span>
            </h1>
            <p className="text-xl text-gray-700">
              Your trusted travel partner since 2010, making dream vacations a reality for East
              Coast travelers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2010, Next Trip Anywhere began with a simple mission: to make exceptional
                travel experiences accessible to everyone. What started as a small family business
                in New York has grown into the East Coast&apos;s most trusted travel agency.
              </p>
              <p className="text-gray-700 mb-4">
                Over the past 15 years, we&apos;ve helped more than 50,000 travelers explore the
                world, create lasting memories, and discover new adventures. Our team of expert
                travel consultants brings decades of combined experience and a genuine passion for
                travel.
              </p>
              <p className="text-gray-700">
                We believe that travel should be stress-free and affordable. That&apos;s why we
                leverage our industry relationships to secure exclusive deals, provide 24/7 support,
                and handle every detail of your journey.
              </p>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
                alt="Our team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Why Choose Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Industry Certified</h3>
              <p className="text-gray-600">
                ASTA member and CLIA certified since 2010
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Expert Team</h3>
              <p className="text-gray-600">
                25+ travel consultants with specialized destination knowledge
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mb-4">
                <Globe className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Global Network</h3>
              <p className="text-gray-600">
                Partnerships with 200+ airlines, cruise lines, and hotels worldwide
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Personal Touch</h3>
              <p className="text-gray-600">Dedicated agent for your trip from planning to return</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Commitment to You</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-accent-400 mb-3">Best Prices</h3>
                <p className="text-gray-300">
                  We guarantee the best prices on all travel bookings with our price match promise
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-accent-400 mb-3">24/7 Support</h3>
                <p className="text-gray-300">
                  Travel with confidence knowing we&apos;re always here when you need us
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-accent-400 mb-3">Peace of Mind</h3>
                <p className="text-gray-300">
                  Full financial protection and comprehensive travel insurance options
                </p>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-lg mb-6">Ready to start planning your next adventure?</p>
              <a
                href="/contact"
                className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
