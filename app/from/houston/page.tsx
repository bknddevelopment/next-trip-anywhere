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

const houstonData = getLocationData('houston')!
export const metadata: Metadata = generateLocationMetadata(houstonData)

// JSON-LD for Houston location
const houstonJsonLd = generateLocationJsonLd(houstonData)

export default function HoustonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(houstonJsonLd),
        }}
      />

      <LocationHero location={houstonData} />
      <LocationAirports location={houstonData} />
      <LocationDeals location={houstonData} />
      <LocationSeasonalHighlights highlights={houstonData.seasonalHighlights} city={houstonData.city} />
      <LocationTestimonials testimonials={houstonData.testimonials} city={houstonData.city} />
      <LocationCTA city={houstonData.city} urgencyMessage="LIMITED TIME: Save up to $500 on Houston Departures" />
      <LocationSEOContent location={houstonData} />
    </>
  )
}