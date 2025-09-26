import { Metadata } from 'next'
import LocationHero from '@/components/locations/LocationHero'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Calendar, Clock, TrendingUp, Snowflake, Sun, Leaf, Flower } from 'lucide-react'
import Link from 'next/link'
import { seasonalDeals } from '@/lib/data/seasonal-deals'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'Seasonal Cruise Deals 2025-2026 | Holiday & Special Offers from Newark',
  description:
    'Find the best seasonal cruise deals from Cape Liberty! Christmas, New Year, Spring Break, Summer & more. Limited-time offers on Caribbean cruises from Newark.',
  keywords: [
    'seasonal cruise deals',
    'holiday cruise specials',
    'christmas cruises from newark',
    'new years eve cruises',
    'spring break cruise deals',
    'summer cruise specials',
    'thanksgiving cruises',
    'black friday cruise deals',
    'labor day cruises',
    'seasonal travel deals',
  ],
  openGraph: {
    title: 'Seasonal Cruise Deals from Newark | Next Trip Anywhere',
    description:
      'Discover amazing seasonal cruise deals departing from Cape Liberty. Holiday cruises, spring break specials, summer deals and more!',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/deals/seasonal',
  },
}

const getSeasonIcon = (season: string) => {
  switch (season) {
    case 'winter':
      return <Snowflake className="w-5 h-5" />
    case 'spring':
      return <Flower className="w-5 h-5" />
    case 'summer':
      return <Sun className="w-5 h-5" />
    case 'fall':
      return <Leaf className="w-5 h-5" />
    default:
      return <Sun className="w-5 h-5" />
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'HIGH':
      return 'destructive'
    case 'MEDIUM':
      return 'default'
    case 'LOW':
      return 'secondary'
    default:
      return 'secondary'
  }
}

const getHolidayEmoji = (holidayType?: string) => {
  switch (holidayType) {
    case 'christmas':
      return '🎄'
    case 'new-year':
      return '🎊'
    case 'thanksgiving':
      return '🦃'
    case 'easter':
      return '🐰'
    case 'july-4th':
      return '🎆'
    case 'memorial-day':
      return '🇺🇸'
    case 'labor-day':
      return '⛱️'
    case 'spring-break':
      return '🌴'
    case 'halloween':
      return '🎃'
    case 'black-friday':
      return '🛍️'
    default:
      return '🚢'
  }
}

// Group deals by season
const dealsBySeason = {
  winter: seasonalDeals.filter((d) => d.season === 'winter'),
  spring: seasonalDeals.filter((d) => d.season === 'spring'),
  summer: seasonalDeals.filter((d) => d.season === 'summer'),
  fall: seasonalDeals.filter((d) => d.season === 'fall'),
}

export default function SeasonalDealsPage() {
  // Get current date to highlight active deals
  const now = new Date()

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-900 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Seasonal Cruise Deals & Holiday Specials
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Limited-Time Offers on Caribbean Cruises from Cape Liberty
          </p>
        </div>
      </section>

      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 animate-pulse" />
              <div>
                <p className="text-xl font-bold">Limited Time Seasonal Offers!</p>
                <p className="text-sm">Book early for best selection and prices</p>
              </div>
            </div>
            <Button size="lg" variant="secondary">
              <a href="tel:8338741019">Call Now: 833-874-1019</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Catch the Best Seasonal Cruise Deals from Newark
            </h2>
            <p className="text-lg text-gray-600">
              From holiday celebrations at sea to summer adventures and seasonal escapes, our
              time-sensitive cruise deals from Cape Liberty offer incredible value for Essex County
              residents. Each season brings unique opportunities to save on your next Caribbean
              getaway, with special pricing, exclusive perks, and limited-time promotions.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">Up to 70%</div>
                <div className="text-sm text-gray-600">Off Regular Prices</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">20+</div>
                <div className="text-sm text-gray-600">Seasonal Departures</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">Limited</div>
                <div className="text-sm text-gray-600">Time Offers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <span className="text-3xl mb-2">🎁</span>
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm text-gray-600">Upgrades & Perks</div>
              </CardContent>
            </Card>
          </div>

          {/* Winter/Holiday Deals */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Snowflake className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold">Winter & Holiday Cruises</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dealsBySeason.winter.map((deal) => {
                const isActive =
                  new Date(deal.validFrom) <= now && new Date(deal.validThrough) >= now
                return (
                  <Card
                    key={deal.slug}
                    className={`hover:shadow-xl transition-all ${isActive ? 'border-2 border-green-500' : ''}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-3xl">{getHolidayEmoji(deal.holidayType)}</span>
                        <div className="flex gap-2">
                          {isActive && (
                            <Badge variant="default" className="bg-green-600">
                              Active Now
                            </Badge>
                          )}
                          <Badge variant={getPriorityColor(deal.priority)}>{deal.priority}</Badge>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{deal.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {deal.metaDescription.substring(0, 100)}...
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Valid:{' '}
                            {new Date(deal.validFrom).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}{' '}
                            -{' '}
                            {new Date(deal.validThrough).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        {deal.bookingDeadline && (
                          <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
                            <Clock className="w-4 h-4" />
                            <span>
                              Book by{' '}
                              {new Date(deal.bookingDeadline).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        )}
                        <div className="text-2xl font-bold text-primary">
                          From ${Math.min(...deal.content.cruiseLines.map((l) => l.startingPrice))}
                          <span className="text-sm font-normal text-gray-600"> per person</span>
                        </div>
                      </div>
                      <Link href={`/deals/seasonal/${deal.slug}`}>
                        <Button className="w-full mt-4">View Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Spring Deals */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Flower className="w-8 h-8 text-pink-600" />
              <h2 className="text-3xl font-bold">Spring Break & Easter Cruises</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dealsBySeason.spring.map((deal) => {
                const isActive =
                  new Date(deal.validFrom) <= now && new Date(deal.validThrough) >= now
                return (
                  <Card
                    key={deal.slug}
                    className={`hover:shadow-xl transition-all ${isActive ? 'border-2 border-green-500' : ''}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-3xl">{getHolidayEmoji(deal.holidayType)}</span>
                        <div className="flex gap-2">
                          {isActive && (
                            <Badge variant="default" className="bg-green-600">
                              Active Now
                            </Badge>
                          )}
                          <Badge variant={getPriorityColor(deal.priority)}>{deal.priority}</Badge>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{deal.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {deal.metaDescription.substring(0, 100)}...
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Valid:{' '}
                            {new Date(deal.validFrom).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}{' '}
                            -{' '}
                            {new Date(deal.validThrough).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        {deal.bookingDeadline && (
                          <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
                            <Clock className="w-4 h-4" />
                            <span>
                              Book by{' '}
                              {new Date(deal.bookingDeadline).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        )}
                        <div className="text-2xl font-bold text-primary">
                          From ${Math.min(...deal.content.cruiseLines.map((l) => l.startingPrice))}
                          <span className="text-sm font-normal text-gray-600"> per person</span>
                        </div>
                      </div>
                      <Link href={`/deals/seasonal/${deal.slug}`}>
                        <Button className="w-full mt-4">View Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Summer Deals */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Sun className="w-8 h-8 text-yellow-600" />
              <h2 className="text-3xl font-bold">Summer Vacation Cruises</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dealsBySeason.summer.map((deal) => {
                const isActive =
                  new Date(deal.validFrom) <= now && new Date(deal.validThrough) >= now
                return (
                  <Card
                    key={deal.slug}
                    className={`hover:shadow-xl transition-all ${isActive ? 'border-2 border-green-500' : ''}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-3xl">{getHolidayEmoji(deal.holidayType)}</span>
                        <div className="flex gap-2">
                          {isActive && (
                            <Badge variant="default" className="bg-green-600">
                              Active Now
                            </Badge>
                          )}
                          <Badge variant={getPriorityColor(deal.priority)}>{deal.priority}</Badge>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{deal.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {deal.metaDescription.substring(0, 100)}...
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Valid:{' '}
                            {new Date(deal.validFrom).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}{' '}
                            -{' '}
                            {new Date(deal.validThrough).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        {deal.bookingDeadline && (
                          <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
                            <Clock className="w-4 h-4" />
                            <span>
                              Book by{' '}
                              {new Date(deal.bookingDeadline).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        )}
                        <div className="text-2xl font-bold text-primary">
                          From ${Math.min(...deal.content.cruiseLines.map((l) => l.startingPrice))}
                          <span className="text-sm font-normal text-gray-600"> per person</span>
                        </div>
                      </div>
                      <Link href={`/deals/seasonal/${deal.slug}`}>
                        <Button className="w-full mt-4">View Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Fall Deals */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-8 h-8 text-orange-600" />
              <h2 className="text-3xl font-bold">Fall & Holiday Shopping Cruises</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dealsBySeason.fall.map((deal) => {
                const isActive =
                  new Date(deal.validFrom) <= now && new Date(deal.validThrough) >= now
                return (
                  <Card
                    key={deal.slug}
                    className={`hover:shadow-xl transition-all ${isActive ? 'border-2 border-green-500' : ''}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-3xl">{getHolidayEmoji(deal.holidayType)}</span>
                        <div className="flex gap-2">
                          {isActive && (
                            <Badge variant="default" className="bg-green-600">
                              Active Now
                            </Badge>
                          )}
                          <Badge variant={getPriorityColor(deal.priority)}>{deal.priority}</Badge>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{deal.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {deal.metaDescription.substring(0, 100)}...
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Valid:{' '}
                            {new Date(deal.validFrom).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}{' '}
                            -{' '}
                            {new Date(deal.validThrough).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        {deal.bookingDeadline && (
                          <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
                            <Clock className="w-4 h-4" />
                            <span>
                              Book by{' '}
                              {new Date(deal.bookingDeadline).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        )}
                        <div className="text-2xl font-bold text-primary">
                          From ${Math.min(...deal.content.cruiseLines.map((l) => l.startingPrice))}
                          <span className="text-sm font-normal text-gray-600"> per person</span>
                        </div>
                      </div>
                      <Link href={`/deals/seasonal/${deal.slug}`}>
                        <Button className="w-full mt-4">View Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Booking Tips */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Seasonal Booking Tips</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <span className="text-4xl mb-3 block">📅</span>
                <h3 className="font-semibold mb-2">Book Early</h3>
                <p className="text-sm text-gray-600">
                  Holiday and seasonal cruises sell out months in advance. Book 3-6 months ahead for
                  best selection.
                </p>
              </div>
              <div className="text-center">
                <span className="text-4xl mb-3 block">💰</span>
                <h3 className="font-semibold mb-2">Watch for Flash Sales</h3>
                <p className="text-sm text-gray-600">
                  Black Friday, Wave Season, and last-minute deals offer the biggest savings of the
                  year.
                </p>
              </div>
              <div className="text-center">
                <span className="text-4xl mb-3 block">👥</span>
                <h3 className="font-semibold mb-2">Group Bookings Save</h3>
                <p className="text-sm text-gray-600">
                  Booking with family or friends? Groups of 5+ cabins receive special perks and
                  discounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
