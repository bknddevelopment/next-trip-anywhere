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

const chicagoData = getLocationData('chicago')!
export const metadata: Metadata = generateLocationMetadata(chicagoData)

// JSON-LD for Chicago location
const chicagoJsonLd = generateLocationJsonLd(chicagoData)

export default function ChicagoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(chicagoJsonLd),
        }}
      />

      <LocationHero location={chicagoData} />
      <LocationAirports location={chicagoData} />
      <LocationDeals location={chicagoData} />
      <LocationSeasonalHighlights highlights={chicagoData.seasonalHighlights} city={chicagoData.city} />
      <LocationTestimonials testimonials={chicagoData.testimonials} city={chicagoData.city} />
      <LocationCTA city={chicagoData.city} urgencyMessage="LIMITED TIME: Save up to $500 on Chicago Departures" />
      <LocationSEOContent location={chicagoData} />
    </>
  )
}