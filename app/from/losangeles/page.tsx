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

const losAngelesData = getLocationData('losangeles')!
export const metadata: Metadata = generateLocationMetadata(losAngelesData)

// JSON-LD for Los Angeles location
const losAngelesJsonLd = generateLocationJsonLd(losAngelesData)

export default function LosAngelesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(losAngelesJsonLd),
        }}
      />

      <LocationHero location={losAngelesData} />
      <LocationAirports location={losAngelesData} />
      <LocationDeals location={losAngelesData} />
      <LocationSeasonalHighlights highlights={losAngelesData.seasonalHighlights} city={losAngelesData.city} />
      <LocationTestimonials testimonials={losAngelesData.testimonials} city={losAngelesData.city} />
      <LocationCTA city={losAngelesData.city} urgencyMessage="LIMITED TIME: Save up to $500 on Los Angeles Departures" />
      <LocationSEOContent location={losAngelesData} />
    </>
  )
}