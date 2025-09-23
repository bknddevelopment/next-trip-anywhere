#!/usr/bin/env node

/**
 * Test script for ContactFormWithAnalytics n8n webhook integration
 *
 * Usage:
 *   node scripts/test-contact-form.js
 *
 * This script tests the contact form submission to the n8n webhook
 * with sample data to verify the integration is working correctly.
 */

const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://n8n.nexttripanywhere.com/webhook/contact-form'

// Sample form data matching the ContactFormData schema
const sampleFormData = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '+12015551234',
  tripType: 'package',
  destination: 'Bahamas',
  departureDate: '2025-03-15',
  travelers: '2',
  travelStyle: 'comfort',
  message: 'Looking for a 7-day all-inclusive resort package in the Bahamas for our anniversary.',
  contactPreference: 'email',
  newsletter: true,
  // Additional metadata
  submittedAt: new Date().toISOString(),
  sourceUrl: 'https://nexttripanywhere.com/test',
  userAgent: 'Test Script v1.0'
}

console.log('🧪 Testing Contact Form Webhook Integration')
console.log('===========================================')
console.log(`Webhook URL: ${webhookUrl}`)
console.log('')

async function testWebhook() {
  try {
    console.log('📤 Sending test submission...')
    console.log('Form Data:', JSON.stringify(sampleFormData, null, 2))
    console.log('')

    const startTime = Date.now()
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sampleFormData),
    })

    const responseTime = Date.now() - startTime

    console.log(`📨 Response received in ${responseTime}ms`)
    console.log(`Status: ${response.status} ${response.statusText}`)
    console.log(`Headers:`, Object.fromEntries(response.headers.entries()))

    let responseData = null
    const contentType = response.headers.get('content-type')

    if (contentType && contentType.includes('application/json')) {
      try {
        responseData = await response.json()
        console.log('Response Body (JSON):', JSON.stringify(responseData, null, 2))
      } catch (e) {
        console.log('Failed to parse JSON response:', e.message)
      }
    } else {
      const textResponse = await response.text()
      console.log('Response Body (Text):', textResponse || '(empty)')
    }

    console.log('')

    if (response.ok) {
      console.log('✅ Test PASSED - Webhook accepted the submission')
      console.log('')
      console.log('Integration appears to be working correctly!')
      console.log('The webhook URL can receive form submissions.')
    } else {
      console.log('❌ Test FAILED - Webhook rejected the submission')
      console.log('')
      console.log('Please check:')
      console.log('1. The webhook URL is correct')
      console.log('2. The n8n workflow is active and listening')
      console.log('3. CORS is properly configured on the n8n instance')
      process.exit(1)
    }

  } catch (error) {
    console.error('❌ Test FAILED - Network or connection error')
    console.error('Error:', error.message)
    console.log('')

    if (error.cause) {
      console.error('Cause:', error.cause)
    }

    console.log('Troubleshooting tips:')
    console.log('1. Check if the n8n instance is running and accessible')
    console.log('2. Verify the webhook URL is correct')
    console.log('3. Ensure there are no network/firewall issues')
    console.log('4. Check if HTTPS certificate is valid (for production)')
    console.log('')
    console.log('For local testing, you might need to:')
    console.log('- Use ngrok or similar to expose local n8n instance')
    console.log('- Configure CORS headers in n8n webhook node')

    process.exit(1)
  }
}

// Run the test
testWebhook().catch(console.error)