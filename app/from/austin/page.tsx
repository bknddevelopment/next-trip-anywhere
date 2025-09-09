import { Metadata } from 'next'
import LocationHero from '@/components/locations/LocationHero'
import LocationDeals from '@/components/locations/LocationDeals'
import LocationAirports from '@/components/locations/LocationAirports'
import LocationTestimonials from '@/components/locations/LocationTestimonials'
import LocationSeasonalHighlights from '@/components/locations/LocationSeasonalHighlights'
import LocationCTA from '@/components/locations/LocationCTA'
import LocationSEOContent from '@/components/locations/LocationSEOContent'
import { getLocationData } from '@/lib/location-data'
import { generateLocationMetadata, generateLocationJsonLd } from '@/lib/location-page-generator'

const austinData = getLocationData('austin')!
export const metadata: Metadata = generateLocationMetadata(austinData)

// JSON-LD for Austin location
const austinJsonLd = generateLocationJsonLd(austinData)

export default function AustinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(austinJsonLd),
        }}
      />

      <LocationHero location={austinData} />
      <LocationAirports location={austinData} />
      <LocationDeals location={austinData} />
      <LocationSeasonalHighlights highlights={austinData.seasonalHighlights} city={austinData.city} />
      <LocationTestimonials testimonials={austinData.testimonials} city={austinData.city} />
      <LocationCTA city={austinData.city} urgencyMessage="LIMITED TIME: Save up to $500 on Austin Departures" />
      <LocationSEOContent location={austinData} />
    </>
  )
}