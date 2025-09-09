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

const phoenixData = getLocationData('phoenix')!
export const metadata: Metadata = generateLocationMetadata(phoenixData)

// JSON-LD for Phoenix location
const phoenixJsonLd = generateLocationJsonLd(phoenixData)

export default function PhoenixPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(phoenixJsonLd),
        }}
      />

      <LocationHero location={phoenixData} />
      <LocationAirports location={phoenixData} />
      <LocationDeals location={phoenixData} />
      <LocationSeasonalHighlights highlights={phoenixData.seasonalHighlights} city={phoenixData.city} />
      <LocationTestimonials testimonials={phoenixData.testimonials} city={phoenixData.city} />
      <LocationCTA city={phoenixData.city} urgencyMessage="LIMITED TIME: Save up to $500 on Phoenix Departures" />
      <LocationSEOContent location={phoenixData} />
    </>
  )
}