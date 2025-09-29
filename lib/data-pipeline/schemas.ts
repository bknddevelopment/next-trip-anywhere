/**
 * Data Schemas and Validation
 * Type-safe schemas for cruise cabin data
 */

import { z } from 'zod'

// Cabin location on ship
export const CabinLocationSchema = z.object({
  deck: z.number().min(1).max(20),
  position: z.enum(['forward', 'midship', 'aft']),
  side: z.enum(['port', 'starboard', 'center']),
  proximityToElevator: z.enum(['near', 'moderate', 'far']).optional(),
  proximityToStairs: z.enum(['near', 'moderate', 'far']).optional(),
  noiseLevel: z.enum(['quiet', 'moderate', 'potentially-noisy']).optional(),
})

// Cabin amenities
export const CabinAmenitiesSchema = z.object({
  balcony: z.boolean(),
  bathtub: z.boolean().optional(),
  minibar: z.boolean().optional(),
  safe: z.boolean().optional(),
  hairDryer: z.boolean().default(true),
  tv: z.boolean().default(true),
  phone: z.boolean().default(true),
  usb: z.boolean().optional(),
  powerOutlets: z.number().optional(),
  wifi: z.boolean().default(true),
  airConditioning: z.boolean().default(true),
  coffeemaker: z.boolean().optional(),
  refrigerator: z.boolean().optional(),
  bathrobes: z.boolean().optional(),
  binoculars: z.boolean().optional(),
})

// Cabin size information
export const CabinSizeSchema = z.object({
  interior: z.number().optional(), // Square feet
  balcony: z.number().optional(), // Square feet
  total: z.number(),
  metric: z
    .object({
      interior: z.number().optional(), // Square meters
      balcony: z.number().optional(),
      total: z.number(),
    })
    .optional(),
})

// Bed configuration
export const BedConfigSchema = z.object({
  type: z.enum(['king', 'queen', 'twin', 'pullman', 'sofa-bed', 'bunk']),
  count: z.number(),
  convertible: z.boolean().optional(),
})

// Main cabin schema
export const CabinSchema = z.object({
  // Required fields
  id: z.string(),
  cabinNumber: z.string(),
  ship: z.object({
    id: z.string(),
    name: z.string(),
    line: z.string(),
  }),
  category: z.object({
    code: z.string(),
    name: z.string(),
    type: z.enum(['interior', 'oceanview', 'balcony', 'suite', 'spa', 'haven', 'yacht-club']),
  }),
  deck: z.number(),
  maxOccupancy: z.number(),

  // Optional but important fields
  location: CabinLocationSchema.optional(),
  size: CabinSizeSchema.optional(),
  amenities: CabinAmenitiesSchema.optional(),
  beds: z.array(BedConfigSchema).optional(),

  // Media
  photos: z
    .array(
      z.object({
        url: z.string().url(),
        alt: z.string(),
        width: z.number(),
        height: z.number(),
        primary: z.boolean().optional(),
      })
    )
    .optional(),

  virtualTourUrl: z.string().url().optional(),
  deckPlanUrl: z.string().url().optional(),

  // Accessibility
  accessible: z.boolean().optional(),
  accessibilityFeatures: z.array(z.string()).optional(),

  // Connecting cabins
  connectingCabins: z.array(z.string()).optional(),

  // Pros and cons
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),

  // Metadata
  lastUpdated: z.string().datetime(),
  dataCompleteness: z.number().min(0).max(1),
  source: z.string(),
  verified: z.boolean().default(false),
})

export type Cabin = z.infer<typeof CabinSchema>
export type CabinLocation = z.infer<typeof CabinLocationSchema>
export type CabinAmenities = z.infer<typeof CabinAmenitiesSchema>
export type CabinSize = z.infer<typeof CabinSizeSchema>

// Batch processing schema
export const CabinBatchSchema = z.object({
  batchId: z.string(),
  timestamp: z.string().datetime(),
  source: z.string(),
  totalRecords: z.number(),
  processedRecords: z.number(),
  failedRecords: z.number(),
  cabins: z.array(CabinSchema),
  errors: z
    .array(
      z.object({
        cabinId: z.string(),
        error: z.string(),
        field: z.string().optional(),
      })
    )
    .optional(),
})

export type CabinBatch = z.infer<typeof CabinBatchSchema>

// Price data schema (separate from cabin for frequent updates)
export const CabinPriceSchema = z.object({
  cabinId: z.string(),
  sailingId: z.string(),
  price: z.object({
    base: z.number(),
    taxes: z.number(),
    total: z.number(),
    currency: z.string().default('USD'),
    perPerson: z.boolean().default(true),
  }),
  availability: z.enum(['available', 'limited', 'waitlist', 'sold-out']),
  lastUpdated: z.string().datetime(),
})

export type CabinPrice = z.infer<typeof CabinPriceSchema>
