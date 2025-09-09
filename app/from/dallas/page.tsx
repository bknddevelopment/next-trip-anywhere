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

const dallasData = getLocationData('dallas')!
export const metadata: Metadata = generateLocationMetadata(dallasData)

// JSON-LD for Dallas location
const dallasJsonLd = generateLocationJsonLd(dallasData)

export default function DallasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dallasJsonLd),
        }}
      />

      <LocationHero location={dallasData} />
      <LocationAirports location={dallasData} />
      <LocationDeals location={dallasData} />
      <LocationSeasonalHighlights highlights={dallasData.seasonalHighlights} city={dallasData.city} />
      <LocationTestimonials testimonials={dallasData.testimonials} city={dallasData.city} />
      <LocationCTA city={dallasData.city} urgencyMessage="LIMITED TIME: Save up to $500 on Dallas Departures" />
      <LocationSEOContent location={dallasData} />
    </>
  )
}