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

const philadelphiaData = getLocationData('philadelphia')!
export const metadata: Metadata = generateLocationMetadata(philadelphiaData)

// JSON-LD for Philadelphia location
const philadelphiaJsonLd = generateLocationJsonLd(philadelphiaData)

export default function PhiladelphiaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(philadelphiaJsonLd),
        }}
      />

      <LocationHero location={philadelphiaData} />
      <LocationAirports location={philadelphiaData} />
      <LocationDeals location={philadelphiaData} />
      <LocationSeasonalHighlights highlights={philadelphiaData.seasonalHighlights} city={philadelphiaData.city} />
      <LocationTestimonials testimonials={philadelphiaData.testimonials} city={philadelphiaData.city} />
      <LocationCTA city={philadelphiaData.city} urgencyMessage="LIMITED TIME: Save up to $500 on Philadelphia Departures" />
      <LocationSEOContent location={philadelphiaData} />
    </>
  )
}