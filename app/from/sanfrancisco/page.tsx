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

const sanFranciscoData = getLocationData('sanfrancisco')!
export const metadata: Metadata = generateLocationMetadata(sanFranciscoData)

// JSON-LD for San Francisco location
const sanFranciscoJsonLd = generateLocationJsonLd(sanFranciscoData)

export default function SanFranciscoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanFranciscoJsonLd),
        }}
      />

      <LocationHero location={sanFranciscoData} />
      <LocationAirports location={sanFranciscoData} />
      <LocationDeals location={sanFranciscoData} />
      <LocationSeasonalHighlights highlights={sanFranciscoData.seasonalHighlights} city={sanFranciscoData.city} />
      <LocationTestimonials testimonials={sanFranciscoData.testimonials} city={sanFranciscoData.city} />
      <LocationCTA city={sanFranciscoData.city} urgencyMessage="LIMITED TIME: Save up to $500 on San Francisco Departures" />
      <LocationSEOContent location={sanFranciscoData} />
    </>
  )
}