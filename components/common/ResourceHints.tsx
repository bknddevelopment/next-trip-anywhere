import Head from 'next/head'

/**
 * Resource hints component for optimizing resource loading
 * Implements preconnect, dns-prefetch, and preload strategies
 */
export default function ResourceHints() {
  return (
    <Head>
      {/* DNS Prefetch for faster DNS resolution */}
      <link rel="dns-prefetch" href="https://cdn.coverr.co" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      
      {/* Preconnect for faster connection establishment */}
      <link rel="preconnect" href="https://cdn.coverr.co" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Preload critical fonts */}
      <link 
        rel="preload" 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
        as="style"
      />
      
      {/* Prefetch likely navigation targets */}
      <link rel="prefetch" href="/destinations" />
      <link rel="prefetch" href="/deals" />
      
      {/* Module preload for critical JavaScript */}
      <link rel="modulepreload" href="/_next/static/chunks/main.js" />
      <link rel="modulepreload" href="/_next/static/chunks/framework.js" />
    </Head>
  )
}