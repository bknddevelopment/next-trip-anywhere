/**
 * Environment configuration utility
 * Provides type-safe access to environment variables for the static site
 */

interface EnvConfig {
  // Public runtime variables (available in browser)
  public: {
    appUrl: string
    basePath: string
    formspreeId?: string
    googleMapsApiKey?: string
    gaMeasurementId?: string
    hotjarId?: string
    hotjarSv?: string
    sentryDsn?: string
    enableAnalytics: boolean
    enableErrorTracking: boolean
    enableMaintenanceMode: boolean
  }
}

class EnvironmentConfig {
  private static instance: EnvironmentConfig
  private config: EnvConfig

  private constructor() {
    this.config = this.loadConfig()
  }

  public static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig()
    }
    return EnvironmentConfig.instance
  }

  private loadConfig(): EnvConfig {
    // Helper to safely parse boolean values
    const parseBoolean = (value: string | undefined, defaultValue = false): boolean => {
      if (!value) {
        return defaultValue
      }
      return value.toLowerCase() === 'true'
    }

    return {
      public: {
        appUrl: process.env['NEXT_PUBLIC_APP_URL'] || 'https://nexttripanywhere.com',
        basePath: process.env['NEXT_PUBLIC_BASE_PATH'] || '',
        ...(process.env['NEXT_PUBLIC_FORMSPREE_ID'] && {
          formspreeId: process.env['NEXT_PUBLIC_FORMSPREE_ID'],
        }),
        ...(process.env['NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'] && {
          googleMapsApiKey: process.env['NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'],
        }),
        ...(process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID'] && {
          gaMeasurementId: process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID'],
        }),
        ...(process.env['NEXT_PUBLIC_HOTJAR_ID'] && {
          hotjarId: process.env['NEXT_PUBLIC_HOTJAR_ID'],
        }),
        ...(process.env['NEXT_PUBLIC_HOTJAR_SV'] && {
          hotjarSv: process.env['NEXT_PUBLIC_HOTJAR_SV'],
        }),
        ...(process.env['NEXT_PUBLIC_SENTRY_DSN'] && {
          sentryDsn: process.env['NEXT_PUBLIC_SENTRY_DSN'],
        }),
        enableAnalytics: parseBoolean(process.env['NEXT_PUBLIC_ENABLE_ANALYTICS']),
        enableErrorTracking: parseBoolean(process.env['NEXT_PUBLIC_ENABLE_ERROR_TRACKING']),
        enableMaintenanceMode: parseBoolean(process.env['NEXT_PUBLIC_ENABLE_MAINTENANCE_MODE']),
      },
    }
  }

  public get publicConfig(): EnvConfig['public'] {
    return this.config.public
  }

  public get isDevelopment(): boolean {
    return process.env['NODE_ENV'] === 'development'
  }

  public get isProduction(): boolean {
    return process.env['NODE_ENV'] === 'production'
  }

  public get isTest(): boolean {
    return process.env['NODE_ENV'] === 'test'
  }

  /**
   * Validates required environment variables
   * Call this during app initialization
   */
  public validate(): void {
    const required: Array<keyof EnvConfig['public']> = []

    // Add required variables based on environment
    if (this.isProduction) {
      // In production, formspree ID is recommended for form handling
      console.warn('Consider setting NEXT_PUBLIC_FORMSPREE_ID for form submissions')
    }

    const missing: string[] = []

    for (const key of required) {
      if (!this.config.public[key as keyof EnvConfig['public']]) {
        missing.push(`NEXT_PUBLIC_${key.toUpperCase()}`)
      }
    }

    if (missing.length > 0) {
      console.error(`Missing required environment variables: ${missing.join(', ')}`)
      if (this.isProduction) {
        throw new Error('Missing required environment variables')
      }
    }
  }
}

// Export singleton instance
export const env = EnvironmentConfig.getInstance()

// Export convenience accessors
export const publicEnv = env.publicConfig

// Export helper functions
export const isDevelopment = env.isDevelopment
export const isProduction = env.isProduction
export const isTest = env.isTest
