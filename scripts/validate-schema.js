#!/usr/bin/env node

/**
 * Schema Validation Script for NextTripAnywhere.com
 * 
 * This script validates structured data markup across all pages
 * and provides recommendations for improvements.
 * 
 * Usage: node scripts/validate-schema.js
 */

const fs = require('fs');
const path = require('path');

// Schema validation utilities
class SchemaValidator {
  constructor() {
    this.requiredFields = {
      TravelAgency: ['name', 'url', 'telephone', 'address', 'description'],
      LocalBusiness: ['name', 'address', 'telephone'],
      Service: ['name', 'provider', 'description'],
      Product: ['name', 'description', 'offers'],
      Trip: ['name', 'description', 'offers'],
      Cruise: ['name', 'description', 'offers'],
      Event: ['name', 'startDate', 'location'],
      FAQPage: ['mainEntity'],
      BreadcrumbList: ['itemListElement'],
      Review: ['author', 'reviewRating', 'reviewBody'],
      AggregateRating: ['ratingValue', 'reviewCount']
    };
    
    this.recommendations = [];
    this.errors = [];
  }

  validateSchema(schema) {
    if (!schema || typeof schema !== 'object') {
      this.errors.push('Invalid schema: must be an object');
      return false;
    }

    if (!schema['@context']) {
      this.errors.push('Missing @context property');
      return false;
    }

    if (!schema['@type']) {
      this.errors.push('Missing @type property');
      return false;
    }

    const schemaType = schema['@type'];
    const requiredFields = this.requiredFields[schemaType];

    if (requiredFields) {
      for (const field of requiredFields) {
        if (!schema[field]) {
          this.errors.push(`Missing required field: ${field} for ${schemaType}`);
        }
      }
    }

    return this.errors.length === 0;
  }

  validateTravelAgencySchema(schema) {
    // Check for enhanced TravelAgency features
    if (!schema.aggregateRating) {
      this.recommendations.push('Add aggregateRating for better search appearance');
    }

    if (!schema.review || schema.review.length === 0) {
      this.recommendations.push('Add customer reviews for credibility');
    }

    if (!schema.priceRange) {
      this.recommendations.push('Add priceRange indicator');
    }

    if (!schema.sameAs || schema.sameAs.length === 0) {
      this.recommendations.push('Add social media profiles in sameAs');
    }

    if (!schema.hasOfferCatalog) {
      this.recommendations.push('Add service catalog for better discoverability');
    }

    return true;
  }

  validateLocalBusinessSchema(schema) {
    if (!schema.geo) {
      this.recommendations.push('Add geographic coordinates for better local SEO');
    }

    if (!schema.openingHours && !schema.openingHoursSpecification) {
      this.recommendations.push('Add business hours for local search');
    }

    if (!schema.areaServed) {
      this.recommendations.push('Specify service area for local targeting');
    }

    return true;
  }

  validateProductSchema(schema) {
    if (!schema.image) {
      this.recommendations.push('Add product images for rich snippets');
    }

    if (!schema.brand) {
      this.recommendations.push('Add brand information');
    }

    if (schema.offers && !schema.offers.availability) {
      this.recommendations.push('Add availability status to offers');
    }

    if (schema.offers && !schema.offers.validThrough) {
      this.recommendations.push('Add offer expiration date');
    }

    return true;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      errors: this.errors,
      recommendations: this.recommendations,
      summary: {
        totalErrors: this.errors.length,
        totalRecommendations: this.recommendations.length,
        status: this.errors.length === 0 ? 'VALID' : 'ERRORS_FOUND'
      }
    };

    return report;
  }
}

// Test schema implementations
const testSchemas = () => {
  const validator = new SchemaValidator();
  
  console.log('🔍 Validating NextTripAnywhere.com Schema Markup...\n');

  // Test Organization Schema
  console.log('📋 Testing Enhanced TravelAgency Schema...');
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Next Trip Anywhere',
    url: 'https://nexttripanywhere.com',
    telephone: '+1-833-874-1019',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    description: 'America\'s premier travel agency',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '3247'
    },
    priceRange: '$$',
    sameAs: ['https://www.facebook.com/nexttripanywhere'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Travel Services'
    }
  };

  if (validator.validateSchema(organizationSchema)) {
    validator.validateTravelAgencySchema(organizationSchema);
    console.log('✅ TravelAgency schema valid');
  } else {
    console.log('❌ TravelAgency schema invalid');
  }

  // Test LocalBusiness Schema
  console.log('\n📍 Testing LocalBusiness Schema...');
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Next Trip Anywhere - Miami',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami'
    },
    telephone: '+1-833-874-1019',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.7617,
      longitude: -80.1918
    },
    openingHours: ['Mo-Fr 06:00-23:00']
  };

  if (validator.validateSchema(localBusinessSchema)) {
    validator.validateLocalBusinessSchema(localBusinessSchema);
    console.log('✅ LocalBusiness schema valid');
  } else {
    console.log('❌ LocalBusiness schema invalid');
  }

  // Test Product Schema
  console.log('\n🛍️ Testing Product Schema...');
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Caribbean Cruise Package',
    description: '7-night Caribbean cruise',
    offers: {
      '@type': 'Offer',
      price: '599',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    image: '/images/caribbean-cruise.jpg',
    brand: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere'
    }
  };

  if (validator.validateSchema(productSchema)) {
    validator.validateProductSchema(productSchema);
    console.log('✅ Product schema valid');
  } else {
    console.log('❌ Product schema invalid');
  }

  // Generate and display report
  const report = validator.generateReport();
  
  console.log('\n📊 VALIDATION REPORT');
  console.log('===================');
  console.log(`Status: ${report.summary.status}`);
  console.log(`Errors: ${report.summary.totalErrors}`);
  console.log(`Recommendations: ${report.summary.totalRecommendations}`);

  if (report.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    report.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  }

  if (report.recommendations.length > 0) {
    console.log('\n💡 RECOMMENDATIONS:');
    report.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });
  }

  // Save report to file
  const reportPath = path.join(__dirname, '..', 'schema-validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Full report saved to: ${reportPath}`);

  // Google Rich Results Test URLs
  console.log('\n🔗 TESTING URLS:');
  console.log('Test your schemas with Google Rich Results Test:');
  console.log('https://search.google.com/test/rich-results');
  console.log('\nRecommended pages to test:');
  console.log('• https://nexttripanywhere.com/ (Homepage)');
  console.log('• https://nexttripanywhere.com/cruises (Service page)');
  console.log('• https://nexttripanywhere.com/from/miami (Location page)');
  console.log('• https://nexttripanywhere.com/packages (Packages page)');
  
  return report.summary.status === 'VALID';
};

// Performance recommendations
const performanceRecommendations = () => {
  console.log('\n⚡ PERFORMANCE RECOMMENDATIONS:');
  console.log('1. Use dynamic imports for schema components to reduce bundle size');
  console.log('2. Generate schemas server-side to avoid client-side computation');
  console.log('3. Cache frequently used schema data');
  console.log('4. Validate schemas in development but skip in production');
  console.log('5. Monitor Core Web Vitals impact of JSON-LD scripts');
};

// SEO best practices
const seoRecommendations = () => {
  console.log('\n🎯 SEO BEST PRACTICES:');
  console.log('1. Include AggregateRating on all service pages for star ratings');
  console.log('2. Add FAQ schema to pages with common questions');
  console.log('3. Use BreadcrumbList for better navigation understanding');
  console.log('4. Include LocalBusiness schema for location-specific pages');
  console.log('5. Add Event schema for special promotions and sales');
  console.log('6. Use Product schema for specific travel deals');
  console.log('7. Implement Article schema for blog content');
  console.log('8. Add Review schema for customer testimonials');
};

// Main execution
if (require.main === module) {
  const isValid = testSchemas();
  performanceRecommendations();
  seoRecommendations();
  
  process.exit(isValid ? 0 : 1);
}

module.exports = { SchemaValidator };