/**
 * Essex County Layout with Performance Optimizations
 * Includes resource hints, critical CSS, and monitoring
 */

import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://nexttripanywhere.com'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function EssexCountyLayout({ children }: { children: React.ReactNode }) {
  // Critical CSS for above-the-fold content
  const criticalCSS = `
    /* Critical CSS for Essex County Pages */
    .container{width:100%;margin:0 auto;padding:0 1rem;max-width:1280px}
    .hero-section{background:linear-gradient(135deg,#1e40af 0%,#1e3a8a 100%);color:white;padding:5rem 0;min-height:400px}
    .hero-title{font-size:2.5rem;font-weight:bold;margin-bottom:1.5rem;line-height:1.2}
    @media(min-width:768px){.hero-title{font-size:3rem}}
    .btn-primary{display:inline-block;padding:1rem 2rem;background:#ea580c;color:white;text-decoration:none;border-radius:0.5rem;font-weight:600;font-size:1.125rem}
    .grid{display:grid;gap:1.5rem}
    @media(min-width:768px){.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}
    .card{background:white;border-radius:0.5rem;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.1)}
    .text-center{text-align:center}.font-bold{font-weight:700}.mb-4{margin-bottom:1rem}.mb-8{margin-bottom:2rem}
    .animate-pulse{animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
  `

  return (
    <>
      {/* Resource Hints for Critical Resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        as="style"
      />

      {/* Critical CSS inline */}
      <style
        dangerouslySetInnerHTML={{
          __html: criticalCSS,
        }}
      />

      {/* Performance Monitoring Script */}
      <Script
        id="performance-monitor"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Basic performance monitoring
            if (window.performance && window.performance.timing) {
              window.addEventListener('load', function() {
                setTimeout(function() {
                  const timing = window.performance.timing;
                  const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
                  const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
                  const ttfb = timing.responseStart - timing.navigationStart;

                  console.log('Page Load Time:', pageLoadTime, 'ms');
                  console.log('DOM Ready Time:', domReadyTime, 'ms');
                  console.log('Time to First Byte:', ttfb, 'ms');

                  // Send to analytics if available
                  if (window.gtag) {
                    window.gtag('event', 'page_timing', {
                      page_load_time: pageLoadTime,
                      dom_ready_time: domReadyTime,
                      time_to_first_byte: ttfb,
                      page_path: window.location.pathname
                    });
                  }
                }, 0);
              });
            }

            // Lazy load images observer
            if ('IntersectionObserver' in window) {
              const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                      img.src = img.dataset.src;
                      img.classList.add('loaded');
                      observer.unobserve(img);
                    }
                  }
                });
              }, {
                rootMargin: '50px'
              });

              document.addEventListener('DOMContentLoaded', () => {
                document.querySelectorAll('img[data-src]').forEach(img => {
                  imageObserver.observe(img);
                });
              });
            }
          `,
        }}
      />

      {/* Web Vitals Monitoring */}
      <Script
        id="web-vitals"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Core Web Vitals tracking
            function sendToAnalytics(metric) {
              const { name, delta, value, id } = metric;
              console.log(name + ':', value);

              // Send to your analytics
              if (window.gtag) {
                window.gtag('event', name, {
                  value: Math.round(name === 'CLS' ? delta * 1000 : delta),
                  metric_id: id,
                  metric_value: value,
                  metric_delta: delta,
                });
              }
            }

            // Load web-vitals library asynchronously
            if (typeof window !== 'undefined') {
              import('https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
                onCLS(sendToAnalytics);
                onFID(sendToAnalytics);
                onFCP(sendToAnalytics);
                onLCP(sendToAnalytics);
                onTTFB(sendToAnalytics);
                onINP(sendToAnalytics);
              }).catch(console.error);
            }
          `,
        }}
      />

      {/* Main content */}
      <div className="essex-county-layout">{children}</div>
    </>
  )
}
