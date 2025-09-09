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

const seattleData = getLocationData('seattle')!
export const metadata: Metadata = generateLocationMetadata(seattleData)

// JSON-LD for Seattle location
const seattleJsonLd = generateLocationJsonLd(seattleData)

export default function SeattlePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seattleJsonLd),
        }}
      />

      <LocationHero location={seattleData} />
      <LocationAirports location={seattleData} />
      <LocationDeals location={seattleData} />
      <LocationSeasonalHighlights highlights={seattleData.seasonalHighlights} city={seattleData.city} />
      <LocationTestimonials testimonials={seattleData.testimonials} city={seattleData.city} />
      <LocationCTA city={seattleData.city} urgencyMessage="LIMITED TIME: Save up to $500 on Seattle Departures" />
      <LocationSEOContent location={seattleData} />
    </>
  )
}