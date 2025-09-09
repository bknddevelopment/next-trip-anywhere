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

const atlantaData = getLocationData('atlanta')!
export const metadata: Metadata = generateLocationMetadata(atlantaData)

// JSON-LD for Atlanta location
const atlantaJsonLd = generateLocationJsonLd(atlantaData)

export default function AtlantaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(atlantaJsonLd),
        }}
      />

      <LocationHero location={atlantaData} />
      <LocationAirports location={atlantaData} />
      <LocationDeals location={atlantaData} />
      <LocationSeasonalHighlights highlights={atlantaData.seasonalHighlights} city={atlantaData.city} />
      <LocationTestimonials testimonials={atlantaData.testimonials} city={atlantaData.city} />
      <LocationCTA city={atlantaData.city} urgencyMessage="Contact us today for personalized travel planning from Atlanta" />
      <LocationSEOContent location={atlantaData} />
    </>
  )
}