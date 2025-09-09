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

const denverData = getLocationData('denver')!
export const metadata: Metadata = generateLocationMetadata(denverData)

// JSON-LD for Denver location
const denverJsonLd = generateLocationJsonLd(denverData)

export default function DenverPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(denverJsonLd),
        }}
      />

      <LocationHero location={denverData} />
      <LocationAirports location={denverData} />
      <LocationDeals location={denverData} />
      <LocationSeasonalHighlights highlights={denverData.seasonalHighlights} city={denverData.city} />
      <LocationTestimonials testimonials={denverData.testimonials} city={denverData.city} />
      <LocationCTA city={denverData.city} urgencyMessage="LIMITED TIME: Save up to $500 on Denver Departures" />
      <LocationSEOContent location={denverData} />
    </>
  )
}