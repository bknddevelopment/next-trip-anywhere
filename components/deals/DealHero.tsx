import Link from 'next/link'
import OptimizedImage from '@/components/ui/OptimizedImage'

interface DealHeroProps {
  headline: string
  subheadline: string
  imageUrl: string
  imageAlt: string
  expirationDate: string
}

export default function DealHero({
  headline,
  subheadline,
  imageUrl,
  imageAlt,
  expirationDate,
}: DealHeroProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl">
          {/* Limited Time Badge */}
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full mb-6 animate-pulse">
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-bold">LIMITED TIME OFFER - Expires {formatDate(expirationDate)}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            {subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#book-now"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
            >
              BOOK NOW & SAVE
            </Link>
            <a
              href="tel:8338741019"
              className="inline-block bg-white hover:bg-gray-100 text-gray-900 font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 shadow-lg text-center"
            >
              📞 Call 833-874-1019
            </a>
          </div>

          {/* Essex County Local Angle */}
          <p className="text-white/80 mt-6 text-sm">
            🚢 <strong>Essex County Residents:</strong> Easy access from Newark Airport to Cape Liberty Cruise Port
          </p>
        </div>
      </div>
    </section>
  )
}
