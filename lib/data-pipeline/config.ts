/**
 * Data Pipeline Configuration
 * Central configuration for cruise cabin data processing
 */

export const PIPELINE_CONFIG = {
  // Data source configurations
  sources: {
    cruiseLines: [
      { id: 'royal-caribbean', name: 'Royal Caribbean', apiEnabled: true },
      { id: 'carnival', name: 'Carnival', apiEnabled: false },
      { id: 'norwegian', name: 'Norwegian', apiEnabled: true },
      { id: 'princess', name: 'Princess', apiEnabled: false },
      { id: 'celebrity', name: 'Celebrity', apiEnabled: true },
      { id: 'msc', name: 'MSC', apiEnabled: false },
      { id: 'disney', name: 'Disney', apiEnabled: false },
      { id: 'holland-america', name: 'Holland America', apiEnabled: false },
      { id: 'viking', name: 'Viking', apiEnabled: false },
      { id: 'virgin', name: 'Virgin Voyages', apiEnabled: true },
    ],
    updateFrequency: {
      cabins: 'weekly', // Basic cabin info
      pricing: 'daily', // Price updates
      availability: 'hourly', // Real-time availability
      photos: 'monthly', // Image updates
    },
  },

  // Processing settings
  processing: {
    batchSize: 1000, // Records per batch
    parallelWorkers: 4, // Parallel processing threads
    memoryLimit: 512, // MB
    cacheEnabled: true,
    cacheTTL: 86400, // 24 hours in seconds
    imageOptimization: {
      formats: ['webp', 'jpg'],
      sizes: [400, 800, 1200],
      quality: 85,
    },
  },

  // Storage configuration
  storage: {
    dataDir: 'data/cabins',
    cacheDir: '.cache/cabin-data',
    buildDir: 'public/data/cabins',
    chunkSize: 100, // Cabins per file chunk
    compression: true,
    indices: ['ship', 'category', 'deck', 'location', 'priceRange'],
  },

  // Quality thresholds
  quality: {
    minCompleteness: 0.7, // 70% minimum data completeness
    requiredFields: ['cabinNumber', 'ship', 'category', 'deck', 'maxOccupancy'],
    optionalFields: [
      'photos',
      'virtualTour',
      'deckPlan',
      'amenities',
      'size',
      'balcony',
      'location',
    ],
  },

  // API rate limiting
  rateLimit: {
    requestsPerMinute: 60,
    retryAttempts: 3,
    backoffMultiplier: 2,
  },
}

export type PipelineConfig = typeof PIPELINE_CONFIG
