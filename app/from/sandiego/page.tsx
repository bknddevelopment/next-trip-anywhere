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

const sanDiegoData = getLocationData('sandiego')!
export const metadata: Metadata = generateLocationMetadata(sanDiegoData)

// JSON-LD for San Diego location
const sanDiegoJsonLd = generateLocationJsonLd(sanDiegoData)

export default function SanDiegoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanDiegoJsonLd),
        }}
      />

      <LocationHero location={sanDiegoData} />
      <LocationAirports location={sanDiegoData} />
      <LocationDeals location={sanDiegoData} />
      <LocationSeasonalHighlights highlights={sanDiegoData.seasonalHighlights} city={sanDiegoData.city} />
      <LocationTestimonials testimonials={sanDiegoData.testimonials} city={sanDiegoData.city} />
      <LocationCTA city={sanDiegoData.city} urgencyMessage="LIMITED TIME: Save up to $500 on San Diego Departures" />
      <LocationSEOContent location={sanDiegoData} />
    </>
  )
}