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

const nycData = getLocationData('nyc')!
export const metadata: Metadata = generateLocationMetadata(nycData)

// JSON-LD for NYC location
const nycJsonLd = generateLocationJsonLd(nycData)

export default function NYCPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(nycJsonLd),
        }}
      />

      <LocationHero location={nycData} />
      <LocationAirports location={nycData} />
      <LocationDeals location={nycData} />
      <LocationSeasonalHighlights highlights={nycData.seasonalHighlights} city={nycData.city} />
      <LocationTestimonials testimonials={nycData.testimonials} city={nycData.city} />
      <LocationCTA city={nycData.city} urgencyMessage="LIMITED TIME: Save up to $500 on NYC Departures" />
      <LocationSEOContent location={nycData} />
    </>
  )
}
