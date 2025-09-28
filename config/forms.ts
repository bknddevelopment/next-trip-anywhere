/**
 * @fileoverview Centralized form configuration
 * @module config/forms
 *
 * Ensures consistent form URLs across the application
 */

export const formConfig = {
  // Primary travel quote form URL
  // Update this single location to change the form URL site-wide
  travelQuoteForm: 'https://nextripanywhere.app.n8n.cloud/form/travel-quote-form',

  // Alternative URL (if switching between environments)
  // travelQuoteForm: 'https://n8n.nexttripanywhere.com/form/8e062c4b-08d0-4b48-9e33-09ae4c2e7098',

  // Phone number for click-to-call
  phoneNumber: '1-833-874-1019',
  phoneHref: 'tel:1-833-874-1019',
}
