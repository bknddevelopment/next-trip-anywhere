// Type declarations for environment variables

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // n8n Webhook Configuration
      NEXT_PUBLIC_N8N_WEBHOOK_URL?: string

      // Other public environment variables
      NEXT_PUBLIC_APP_URL?: string
      NEXT_PUBLIC_API_URL?: string
      NEXT_PUBLIC_GA_MEASUREMENT_ID?: string
      NEXT_PUBLIC_GTM_ID?: string
      NEXT_PUBLIC_SENTRY_DSN?: string
      NEXT_PUBLIC_FORMSPREE_ID?: string

      // Node environment
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }

  // Window extensions (if needed for runtime environment)
  interface Window {
    ENV?: {
      NEXT_PUBLIC_N8N_WEBHOOK_URL?: string
    }
  }
}

export {}
