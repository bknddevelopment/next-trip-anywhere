import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import LocationHero from '@/components/locations/LocationHero'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Clock, Calendar, DollarSign, Users, Sun, Snowflake, Leaf, Flower } from 'lucide-react'
import Link from 'next/link'
import { seasonalDeals } from '@/lib/data/seasonal-deals'
import { generateSeasonalSchema } from '@/lib/utils/seasonalSchema'
import CTASection from '@/components/home/CTASection'
import FAQSection from '@/components/faq/FAQSection'

export async function generateStaticParams() {
  return seasonalDeals.map((deal) => ({
    slug: deal.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const deal = seasonalDeals.find((d) => d.slug === params.slug)

  if (!deal) {
    return {
      title: 'Seasonal Deal Not Found',
      description: 'The seasonal cruise deal you are looking for could not be found.',
    }
  }

  return {
    title: deal.metaTitle,
    description: deal.metaDescription,
    keywords: deal.keywords,
    openGraph: {
      title: deal.metaTitle,
      description: deal.metaDescription,
      type: 'website',
      locale: 'en_US',
      siteName: 'Next Trip Anywhere',
    },
    twitter: {
      card: 'summary_large_image',
      title: deal.metaTitle,
      description: deal.metaDescription,
    },
    alternates: {
      canonical: `https://nexttripanywhere.com/deals/seasonal/${deal.slug}`,
    },
  }
}

const getSeasonIcon = (season: string) => {
  switch(season) {
    case 'winter': return <Snowflake className="w-5 h-5" />
    case 'spring': return <Flower className="w-5 h-5" />
    case 'summer': return <Sun className="w-5 h-5" />
    case 'fall': return <Leaf className="w-5 h-5" />
    default: return <Sun className="w-5 h-5" />
  }
}

const getPriorityColor = (priority: string) => {
  switch(priority) {
    case 'HIGH': return 'destructive'
    case 'MEDIUM': return 'default'
    case 'LOW': return 'secondary'
    default: return 'secondary'
  }
}

export default function SeasonalDealPage({ params }: { params: { slug: string } }) {
  const deal = seasonalDeals.find((d) => d.slug === params.slug)

  if (!deal) {
    notFound()
  }

  const schemaData = generateSeasonalSchema(deal)

  return (
    <>
      <Script
        id="seasonal-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <LocationHero
        title={deal.content.hero.headline}
        subtitle={deal.content.hero.subheadline}
        backgroundImage="/images/hero/cruise-ship-ocean.jpg"
      />

      {/* Urgency Banner */}
      {deal.content.hero.urgencyMessage && (
        <div className="bg-red-600 text-white py-4">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg font-semibold flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 animate-pulse" />
              {deal.content.hero.urgencyMessage}
            </p>
            {deal.bookingDeadline && (
              <p className="text-sm mt-1">
                Book by {new Date(deal.bookingDeadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            )}
          </div>
        </div>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Season and Priority Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline" className="flex items-center gap-1">
              {getSeasonIcon(deal.season)}
              {deal.season.charAt(0).toUpperCase() + deal.season.slice(1)} Season
            </Badge>
            <Badge variant={getPriorityColor(deal.priority)}>
              {deal.priority} Priority Booking
            </Badge>
            {deal.holidayType && (
              <Badge variant="default">
                {deal.holidayType.split('-').map(word =>
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </Badge>
            )}
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Valid: {new Date(deal.validFrom).toLocaleDateString()} - {new Date(deal.validThrough).toLocaleDateString()}
            </Badge>
          </div>

          {/* Main Description */}
          <div className="prose prose-lg max-w-none mb-12">
            {deal.content.description.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {deal.content.highlights.map((highlight, idx) => (
              <Card key={idx} className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-4">
                  <p className="text-sm font-medium">{highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cruise Lines and Offers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Featured Cruise Lines & Offers</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {deal.content.cruiseLines.map((line, idx) => (
                <Card key={idx} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle>{line.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <span className="text-2xl font-bold text-primary">
                        From ${line.startingPrice}
                      </span>
                      <span className="text-sm">per person</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {line.offers.map((offer, offerIdx) => (
                        <li key={offerIdx} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span className="text-sm">{offer}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Departure Dates */}
          <div className="bg-gray-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">Available Departure Dates</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {deal.content.departureDates.map((date, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded border">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-medium">{date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Two Column Content Sections */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Weather & Packing */}
            <Card>
              <CardHeader>
                <CardTitle>Weather & What to Pack</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Weather Conditions</h4>
                  <p className="text-sm text-gray-600">{deal.content.weatherInfo}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Packing Essentials</h4>
                  <ul className="space-y-1">
                    {deal.content.packingTips.map((tip, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Booking Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Smart Booking Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {deal.content.bookingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">💡</span>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Tiers */}
          {deal.pricingTiers && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Cabin Categories & Pricing</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {deal.pricingTiers.map((tier, idx) => (
                  <Card key={idx} className="relative hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{tier.category}</CardTitle>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-primary">${tier.startingPrice}</span>
                        <span className="text-sm text-gray-600">per person</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tier.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="text-sm flex items-start gap-2">
                            <span className="text-green-600">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Special Events */}
          {deal.content.specialEvents && (
            <div className="bg-primary/5 p-8 rounded-lg mb-12">
              <h2 className="text-2xl font-bold mb-4">Special Events & Activities</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {deal.content.specialEvents.map((event, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded">
                    <span className="text-2xl">🎉</span>
                    <span className="font-medium">{event}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Family vs Adults Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {deal.content.familyOptions && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Family-Friendly Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {deal.content.familyOptions.map((option, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600">👨‍👩‍👧‍👦</span>
                        <span className="text-sm">{option}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {deal.content.adultsOnlyOptions && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Adults-Only Experiences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {deal.content.adultsOnlyOptions.map((option, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-600">🍷</span>
                        <span className="text-sm">{option}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Group Discounts */}
          {deal.content.groupDiscounts && (
            <div className="bg-green-50 p-8 rounded-lg mb-12">
              <h2 className="text-2xl font-bold mb-4">Group Booking Discounts</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {deal.content.groupDiscounts.map((group, idx) => (
                  <div key={idx} className="bg-white p-4 rounded border-2 border-green-200">
                    <div className="font-semibold text-green-700 mb-2">{group.size}</div>
                    <div className="text-sm">{group.discount}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Local Advantages */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Newark & Essex County Advantages</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deal.content.localAdvantages.map((advantage, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded">
                  <span className="text-blue-600 text-xl">📍</span>
                  <span className="text-sm">{advantage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Early Bird vs Last Minute */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {deal.content.earlyBirdBenefits && (
              <Card className="border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-700">🐦 Early Bird Benefits</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2">
                    {deal.content.earlyBirdBenefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-green-600 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {deal.content.lastMinuteDeals && (
              <Card className="border-orange-200">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="text-orange-700">⚡ Last-Minute Deals</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2">
                    {deal.content.lastMinuteDeals.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-orange-600 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={deal.faq} />

      {/* Related Links */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Related Pages</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {deal.internalLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link}
                className="px-6 py-3 bg-white rounded-lg border hover:border-primary transition-colors text-sm font-medium"
              >
                {link.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Book Your Seasonal Escape Today!"
        description={`Don't miss out on these limited-time ${deal.season} deals. Our travel experts are ready to help you plan the perfect getaway from Newark.`}
        primaryButtonText="Call Now: 833-874-1019"
        primaryButtonLink="tel:8338741019"
        secondaryButtonText="Get a Quote"
        secondaryButtonLink="/contact"
      />
    </>
  )
}