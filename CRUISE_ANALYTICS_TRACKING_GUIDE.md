# Cruise Analytics Tracking Implementation Guide

## Overview

This document provides comprehensive instructions for setting up, implementing, and monitoring analytics tracking for cruise pages on nexttripanywhere.com.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Google Analytics 4 Setup](#google-analytics-4-setup)
3. [Google Search Console Configuration](#google-search-console-configuration)
4. [Implementation Guide](#implementation-guide)
5. [Event Tracking Reference](#event-tracking-reference)
6. [KPI Definitions](#kpi-definitions)
7. [Reporting Structure](#reporting-structure)
8. [Troubleshooting](#troubleshooting)

## Quick Start

### Environment Variables Required

```bash
# Add to .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Your GA4 Measurement ID
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX              # Your Google Tag Manager ID
```

### Basic Implementation

```tsx
// In your cruise page component
import { useCruiseTracking } from '@/hooks/useCruiseTracking'

export default function CruisePage() {
  const tracking = useCruiseTracking({
    pageType: 'cruise-destination',
    cruiseData: {
      destination: 'Caribbean',
      cruiseLine: 'Royal Caribbean',
      departurePort: 'Newark',
    },
  })

  // Track CTA clicks
  const handleBookNow = () => {
    tracking.trackCTA('book_consultation', 'hero_section')
    // ... rest of your handler
  }

  return <button onClick={handleBookNow}>Book Now</button>
}
```

## Google Analytics 4 Setup

### 1. Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Create new property for nexttripanywhere.com
3. Configure data streams:
   - Web stream: https://nexttripanywhere.com
   - Enable Enhanced Measurement
   - Configure cross-domain tracking if needed

### 2. Configure Events

#### Required Events to Set Up:

| Event Name          | Type       | Description                |
| ------------------- | ---------- | -------------------------- |
| cruise_page_view    | Custom     | Tracks cruise page loads   |
| cruise_cta_click    | Custom     | Tracks CTA interactions    |
| cruise_form_submit  | Conversion | Tracks form submissions    |
| cruise_search       | Custom     | Tracks search usage        |
| cruise_scroll_depth | Engagement | Tracks content consumption |

#### Event Configuration:

```javascript
// GA4 Event Parameters to collect
{
  // Page View Events
  page_type: 'cruise-destination',
  cruise_line: 'Royal Caribbean',
  destination: 'Caribbean',
  departure_port: 'Newark',

  // CTA Events
  cta_type: 'book_consultation',
  cta_location: 'hero_section',

  // Form Events
  form_name: 'cruise_quote',
  form_action: 'submit',

  // Search Events
  search_query: 'Caribbean cruises',
  search_type: 'destination',
  results_count: 15
}
```

### 3. Set Up Conversions

Mark these events as conversions in GA4:

1. `cruise_form_submit` - Lead generation
2. `cruise_cta_click` (when cta_type = 'book_consultation')
3. `phone_call_click` - Phone conversions
4. `email_click` - Email conversions

### 4. Configure Audiences

Create audiences for remarketing:

- **Cruise Intenders**: Viewed 3+ cruise pages
- **High Intent**: Clicked CTA but didn't submit form
- **Caribbean Interested**: Viewed Caribbean cruise pages
- **Newark Departures**: Viewed Newark/Cape Liberty pages

## Google Search Console Configuration

### 1. Verify Property

1. Go to [Search Console](https://search.google.com/search-console)
2. Add property: nexttripanywhere.com
3. Verify using HTML tag or DNS verification

### 2. Submit Sitemaps

```
https://nexttripanywhere.com/sitemap.xml
https://nexttripanywhere.com/cruises-sitemap.xml
```

### 3. Request Indexing

For new cruise pages:

1. Use URL Inspection tool
2. Request indexing for each new page
3. Monitor coverage reports

### 4. Set Up Email Alerts

Configure alerts for:

- Coverage issues
- Manual actions
- Core Web Vitals issues

### 5. Monitor Performance

Track these cruise-specific URL patterns:

- `/cruises/*`
- `/cruises/from-*`
- `/cruises/deals`
- `/cruises/caribbean*`
- `/cruises/royal-caribbean*`

## Implementation Guide

### Page-Level Implementation

#### 1. Landing Pages

```tsx
// app/cruises/page.tsx
'use client'

import { useEffect } from 'react'
import { initializeCruiseTracking } from '@/lib/analytics/cruise-tracking'

export default function CruisesLandingPage() {
  useEffect(() => {
    initializeCruiseTracking('cruise-landing')
  }, [])

  // ... rest of component
}
```

#### 2. Destination Pages

```tsx
// app/cruises/caribbean/page.tsx
'use client'

import { useCruiseTracking } from '@/hooks/useCruiseTracking'

export default function CaribbeanCruises() {
  const tracking = useCruiseTracking({
    pageType: 'cruise-destination',
    cruiseData: {
      destination: 'Caribbean',
      priceRange: '$500-$2000',
    },
  })

  // ... rest of component
}
```

### Form Tracking Implementation

```tsx
// components/CruiseQuoteForm.tsx
import { useCruiseTracking } from '@/hooks/useCruiseTracking'

export default function CruiseQuoteForm() {
  const tracking = useCruiseTracking()
  const [formData, setFormData] = useState({})

  const handleFieldChange = (fieldName: string, value: any) => {
    tracking.trackFormField('quote_form', fieldName, value)
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      // Submit form
      await submitForm(formData)
      tracking.trackFormSubmit('quote_form', formData)
    } catch (error) {
      tracking.trackFormError('quote_form', error.message)
    }
  }

  useEffect(() => {
    tracking.trackFormStart('quote_form')
  }, [])

  // ... rest of component
}
```

### Search Tracking Implementation

```tsx
// components/CruiseSearch.tsx
import { useCruiseSearchTracking } from '@/hooks/useCruiseTracking'

export default function CruiseSearch() {
  const searchTracking = useCruiseSearchTracking()

  const handleSearch = async (query: string, filters: any) => {
    searchTracking.startSearch()

    const results = await searchCruises(query, filters)
    searchTracking.trackSearchResults(query, results, filters)

    return results
  }

  // ... rest of component
}
```

## Event Tracking Reference

### CTA Event Types

| Event Type          | Description           | When to Use         |
| ------------------- | --------------------- | ------------------- |
| `book_consultation` | Book consultation CTA | Main booking CTAs   |
| `get_quote`         | Quote request CTA     | Quote form triggers |
| `view_deals`        | View deals CTA        | Deal browsing       |
| `download_brochure` | Brochure download     | PDF downloads       |
| `call_expert`       | Phone call CTA        | Phone number clicks |
| `chat_start`        | Chat initiation       | Chat widget opens   |
| `email_inquiry`     | Email CTA             | Email links         |
| `save_cruise`       | Save for later        | Wishlist actions    |
| `share_cruise`      | Social share          | Share buttons       |

### Form Event Actions

| Action           | Description            | When Triggered           |
| ---------------- | ---------------------- | ------------------------ |
| `view`           | Form viewed            | Page load with form      |
| `start`          | Form interaction begun | First field focus        |
| `field_complete` | Field filled           | Field blur with value    |
| `submit`         | Form submitted         | Successful submission    |
| `error`          | Submission error       | Validation/API error     |
| `abandon`        | Form abandoned         | Page exit without submit |

### Engagement Events

| Event              | Description         | Tracking Data                 |
| ------------------ | ------------------- | ----------------------------- |
| `scroll_depth`     | Content scrolling   | 10%, 25%, 50%, 75%, 90%, 100% |
| `video_play`       | Video engagement    | Video ID, title, duration     |
| `image_gallery`    | Gallery interaction | Image index, total images     |
| `review_read`      | Review expansion    | Review ID, rating             |
| `itinerary_expand` | Itinerary viewing   | Day, destination              |
| `price_calculator` | Price tool usage    | Cabin type, guests, price     |

## KPI Definitions

### Primary KPIs

| KPI                      | Target   | Calculation                           | Priority |
| ------------------------ | -------- | ------------------------------------- | -------- |
| **Conversion Rate**      | 3-5%     | (Conversions / Sessions) × 100        | Critical |
| **Lead Generation**      | 50+/week | Form submissions + phone calls        | Critical |
| **CTR (Search)**         | 5%+      | (Clicks / Impressions) × 100          | High     |
| **Avg Position**         | <10      | Average search ranking                | High     |
| **Bounce Rate**          | <40%     | Single-page sessions / Total sessions | Medium   |
| **Avg Session Duration** | >2 min   | Total duration / Sessions             | Medium   |

### Secondary KPIs

| KPI                      | Target | Description           |
| ------------------------ | ------ | --------------------- |
| **Pages per Session**    | >3     | User engagement depth |
| **Scroll Depth**         | >60%   | Content consumption   |
| **CTA Click Rate**       | >10%   | CTA effectiveness     |
| **Form Completion Rate** | >70%   | Form UX quality       |
| **Return Visitor Rate**  | >20%   | User retention        |

## Reporting Structure

### Daily Reports

Monitor these metrics daily:

- Total sessions
- Conversion count
- Top landing pages
- Error alerts
- Position changes for top keywords

### Weekly Reports

**Format**: Email summary every Monday

**Contents**:

```
Week of [Date Range]

Performance Summary:
- Sessions: X,XXX (+/-X%)
- Conversions: XXX (+/-X%)
- Conversion Rate: X.X% (+/-X%)
- Top Traffic Source: [Source]

Search Performance:
- Impressions: XX,XXX
- Clicks: X,XXX
- CTR: X.X%
- Avg Position: X.X

Top Performing Pages:
1. [Page] - XXX sessions, XX conversions
2. [Page] - XXX sessions, XX conversions
3. [Page] - XXX sessions, XX conversions

Action Items:
- [Any issues requiring attention]
```

### Monthly Reports

**Comprehensive analysis including**:

- Month-over-month comparisons
- Keyword ranking changes
- Conversion funnel analysis
- User behavior flow
- Technical performance metrics
- Competitive analysis
- Recommendations for next month

### Baseline Metrics (Pre-Launch)

Capture these metrics before Phase 1 launch:

| Metric                      | Current Value | Date Captured |
| --------------------------- | ------------- | ------------- |
| Organic Traffic             | [Value]       | [Date]        |
| Cruise Page Views           | [Value]       | [Date]        |
| Conversion Rate             | [Value]       | [Date]        |
| Avg Position (cruise terms) | [Value]       | [Date]        |
| Domain Authority            | [Value]       | [Date]        |

## Dashboard Access

### Google Analytics Dashboard

1. **URL**: [GA4 Property URL]
2. **Custom Dashboard**: Cruise Performance
3. **Key Reports**:
   - Cruise Page Performance
   - Conversion Funnel
   - User Behavior Flow
   - Real-time Overview

### Search Console Dashboard

1. **URL**: https://search.console.google.com
2. **Saved Filters**:
   - Cruise Pages Only
   - Newark Keywords
   - Caribbean Keywords
   - Mobile Performance

### Internal Dashboard

Access the custom dashboard at:

```
/admin/analytics/cruise-dashboard
```

Features:

- Real-time metrics
- Alert management
- Custom date ranges
- Export capabilities

## Troubleshooting

### Common Issues and Solutions

#### Events Not Tracking

1. **Check GA4 Debug View**:
   - Enable debug mode
   - Verify events firing
   - Check parameter values

2. **Verify Implementation**:

```javascript
// Test in browser console
window.dataLayer
window.gtag
```

3. **Check Network Tab**:
   - Look for collect requests to Google Analytics
   - Verify 200 status codes

#### Search Console Issues

1. **Pages Not Indexed**:
   - Check robots.txt
   - Verify sitemap submission
   - Use URL Inspector tool

2. **No Search Data**:
   - Allow 2-3 days for data
   - Check date range
   - Verify property setup

#### Conversion Tracking Issues

1. **Missing Conversions**:
   - Verify event marked as conversion in GA4
   - Check event parameters
   - Test conversion path

2. **Duplicate Conversions**:
   - Check for multiple event triggers
   - Verify single page application handling

### Debug Mode

Enable debug mode for detailed logging:

```javascript
// In browser console
localStorage.setItem('cruise_tracking_debug', 'true')

// View logs
console.log('Tracking events:', window.cruiseTrackingLog)
```

## Contact & Support

### Team Contacts

- **Analytics Lead**: [Name] - [Email]
- **Development Team**: [Email]
- **SEO Team**: [Email]

### External Support

- **Google Analytics Support**: https://support.google.com/analytics
- **Search Console Help**: https://support.google.com/webmasters
- **GTM Community**: https://www.simoahava.com/

## Appendix

### A. Event Naming Convention

Format: `[category]_[action]_[label]`

Examples:

- `cruise_cta_click`
- `cruise_form_submit`
- `cruise_page_view`

### B. Custom Dimensions

Set up these custom dimensions in GA4:

1. `cruise_line` - Cruise line name
2. `departure_port` - Port of departure
3. `destination` - Cruise destination
4. `price_range` - Price category
5. `duration` - Trip duration

### C. Regular Expressions for URL Filtering

```regex
# All cruise pages
^/cruises/.*

# Destination pages
^/cruises/(caribbean|alaska|mediterranean).*

# From location pages
^/cruises/from-[^/]+$

# Cruise line pages
^/cruises/(royal-caribbean|carnival|norwegian).*
```

### D. GTM Container Export

Export/import GTM container configuration:

1. Go to GTM Admin
2. Export Container
3. Save as `gtm-cruise-tracking-config.json`
4. Version control this file

---

**Last Updated**: November 2024
**Version**: 1.0.0
**Next Review**: December 2024
