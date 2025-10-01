/**
 * Critical CSS Provider
 *
 * Provides route-specific critical CSS for above-the-fold rendering
 * Reduces initial CSS load from 112KB to <10KB per page
 */

// Critical CSS for different page types
export const CRITICAL_CSS: Record<string, string> = {
  // Homepage critical CSS (hero, nav, above-fold)
  homepage: `
    *,::before,::after{box-sizing:border-box;border:0 solid #e5e7eb}
    html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:var(--font-inter),system-ui,sans-serif}
    body{margin:0;line-height:inherit;background-color:#faf9f7}
    .hero-section{min-height:100vh;position:relative;display:flex;align-items:center;justify-content:center}
    .container{width:100%;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}
    @media(min-width:640px){.container{max-width:640px}}
    @media(min-width:768px){.container{max-width:768px}}
    @media(min-width:1024px){.container{max-width:1024px}}
    @media(min-width:1280px){.container{max-width:1280px}}
    .animate-fade-in{animation:fadeIn 0.5s ease-in}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    .flex{display:flex}
    .items-center{align-items:center}
    .justify-center{justify-content:center}
    .bg-primary-500{background-color:#FF6D1A}
    .bg-secondary-500{background-color:#2B71C9}
    .text-white{color:#fff}
    h1,h2,h3{margin:0;font-weight:700;font-family:var(--font-montserrat),system-ui,sans-serif}
    h1{font-size:2.25rem;line-height:2.5rem}
    @media(min-width:768px){h1{font-size:3.75rem;line-height:1}}
    a{color:inherit;text-decoration:inherit}
  `,

  // Cruise pages critical CSS
  cruise: `
    *,::before,::after{box-sizing:border-box;border:0 solid #e5e7eb}
    html{line-height:1.5;font-family:var(--font-inter),system-ui,sans-serif}
    body{margin:0;line-height:inherit;background-color:#faf9f7}
    .container{width:100%;margin-left:auto;margin-right:auto;padding:1rem}
    @media(min-width:1024px){.container{max-width:1024px}}
    .grid{display:grid;gap:1.5rem}
    .grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
    @media(min-width:768px){.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(min-width:1024px){.lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}
    .rounded-lg{border-radius:0.5rem}
    .shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)}
    h1,h2,h3{margin:0;font-weight:700;font-family:var(--font-montserrat)}
    h1{font-size:2.25rem;line-height:2.5rem}
    h2{font-size:1.875rem;line-height:2.25rem}
  `,

  // Package pages critical CSS
  package: `
    *,::before,::after{box-sizing:border-box;border:0 solid #e5e7eb}
    html{line-height:1.5;font-family:var(--font-inter),system-ui,sans-serif}
    body{margin:0;line-height:inherit;background-color:#faf9f7}
    .container{width:100%;margin:0 auto;padding:1rem}
    @media(min-width:1024px){.container{max-width:1024px}}
    .flex{display:flex}
    .flex-col{flex-direction:column}
    .gap-6{gap:1.5rem}
    .rounded-xl{border-radius:0.75rem}
    .bg-white{background-color:#fff}
    .shadow-md{box-shadow:0 4px 6px -1px rgba(0,0,0,0.1)}
    h1,h2{margin:0;font-weight:700;font-family:var(--font-montserrat)}
    h1{font-size:2.25rem}
    h2{font-size:1.5rem}
  `,

  // Guide pages critical CSS
  guide: `
    *,::before,::after{box-sizing:border-box;border:0 solid #e5e7eb}
    html{line-height:1.5;font-family:var(--font-inter),system-ui,sans-serif}
    body{margin:0;line-height:inherit;background-color:#fff}
    .container{width:100%;max-width:48rem;margin:0 auto;padding:1rem}
    .prose{color:#374151;max-width:65ch}
    .prose h1{font-size:2.25rem;font-weight:800;margin-bottom:1rem}
    .prose h2{font-size:1.875rem;font-weight:700;margin-top:2rem;margin-bottom:1rem}
    .prose p{margin-top:1.25rem;margin-bottom:1.25rem;line-height:1.75}
    .prose ul{list-style-type:disc;margin-top:1.25rem;margin-bottom:1.25rem;padding-left:1.625rem}
    .prose a{color:#2B71C9;text-decoration:underline}
    .prose a:hover{color:#1E569B}
  `,

  // Location pages critical CSS
  location: `
    *,::before,::after{box-sizing:border-box;border:0 solid #e5e7eb}
    html{line-height:1.5;font-family:var(--font-inter),system-ui,sans-serif}
    body{margin:0;line-height:inherit;background-color:#faf9f7}
    .container{width:100%;margin:0 auto;padding:1rem}
    @media(min-width:1024px){.container{max-width:1024px}}
    h1{font-size:2.25rem;font-weight:700;margin-bottom:1rem;font-family:var(--font-montserrat)}
    .bg-primary-500{background-color:#FF6D1A}
    .text-white{color:#fff}
    .rounded-lg{border-radius:0.5rem}
    .px-6{padding-left:1.5rem;padding-right:1.5rem}
    .py-3{padding-top:0.75rem;padding-bottom:0.75rem}
    .mt-4{margin-top:1rem}
  `,

  // Default/fallback critical CSS
  default: `
    *,::before,::after{box-sizing:border-box;border:0 solid #e5e7eb}
    html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:var(--font-inter),system-ui,sans-serif}
    body{margin:0;line-height:inherit;background-color:#faf9f7}
    .container{width:100%;margin:0 auto;padding:1rem}
    @media(min-width:1024px){.container{max-width:1024px}}
    h1,h2,h3{margin:0;font-weight:700;font-family:var(--font-montserrat)}
    .animate-fade-in{animation:fadeIn 0.5s ease-in}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  `,
}

/**
 * Get critical CSS based on page path
 */
export function getCriticalCSS(pathname?: string): string {
  if (!pathname) {
    return CRITICAL_CSS.default
  }

  // Homepage
  if (pathname === '/') {
    return CRITICAL_CSS.homepage
  }

  // Cruise pages
  if (pathname.startsWith('/cruises')) {
    return CRITICAL_CSS.cruise
  }

  // Package pages
  if (pathname.startsWith('/packages')) {
    return CRITICAL_CSS.package
  }

  // Guide pages
  if (pathname.startsWith('/guides')) {
    return CRITICAL_CSS.guide
  }

  // Location pages
  if (pathname.startsWith('/locations') || pathname.startsWith('/travel-from')) {
    return CRITICAL_CSS.location
  }

  // Default for other pages
  return CRITICAL_CSS.default
}

/**
 * Get non-critical CSS path for deferred loading
 */
export function getNonCriticalCSSPath(pathname?: string): string {
  if (!pathname) {
    return '/_next/static/css/main.css'
  }

  // Route-specific CSS bundles
  if (pathname.startsWith('/cruises')) {
    return '/css/cruises.css'
  }
  if (pathname.startsWith('/packages')) {
    return '/css/packages.css'
  }
  if (pathname.startsWith('/guides')) {
    return '/css/guides.css'
  }
  if (pathname.startsWith('/locations') || pathname.startsWith('/travel-from')) {
    return '/css/locations.css'
  }

  // Default CSS bundle
  return '/_next/static/css/main.css'
}

/**
 * Preload links for critical resources
 */
export function getCriticalPreloads(pathname?: string): Array<{ href: string; as: string }> {
  const preloads: Array<{ href: string; as: string }> = []

  // Always preload fonts
  preloads.push(
    { href: 'https://fonts.googleapis.com', as: 'preconnect' },
    { href: 'https://fonts.gstatic.com', as: 'preconnect' }
  )

  // Route-specific critical resources
  if (pathname?.startsWith('/cruises')) {
    preloads.push({ href: '/css/cruises.css', as: 'style' })
  } else if (pathname?.startsWith('/packages')) {
    preloads.push({ href: '/css/packages.css', as: 'style' })
  } else if (pathname?.startsWith('/guides')) {
    preloads.push({ href: '/css/guides.css', as: 'style' })
  }

  return preloads
}
