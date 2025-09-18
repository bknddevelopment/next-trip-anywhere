/**
 * Resource hints component for optimizing resource loading
 * Implements preconnect, prefetch, and preload strategies
 */
export default function ResourceHints() {
  return (
    <>
      {/* DNS Prefetch for third-party domains */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://cdn.coverr.co" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Preconnect to critical third-party origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.coverr.co" crossOrigin="anonymous" />

      {/* Note: Fonts are loaded via Next.js Google Fonts integration, not local files */}

      {/* Prefetch next likely navigation */}
      <link rel="prefetch" href="/flights" />
      <link rel="prefetch" href="/cruises" />
      <link rel="prefetch" href="/packages" />

      {/* Module preload for critical JavaScript */}
      <link rel="modulepreload" href="/_next/static/chunks/main.js" />
      <link rel="modulepreload" href="/_next/static/chunks/framework.js" />

      {/* Prerender for instant navigation (Chrome only) */}
      <link rel="prerender" href="/contact" />
    </>
  )
}
