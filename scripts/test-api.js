#!/usr/bin/env node

/**
 * Simple API test script
 * Tests the destinations API endpoints
 */

const BASE_URL = 'http://localhost:3000/api/destinations'

async function testEndpoint(name, path, expectedStatus = 200) {
  try {
    console.log(`\nTesting ${name}...`)
    const response = await fetch(BASE_URL + path)
    const data = await response.json()

    if (response.status !== expectedStatus) {
      console.error(`❌ ${name}: Expected status ${expectedStatus}, got ${response.status}`)
      return false
    }

    if (!data.success && expectedStatus === 200) {
      console.error(`❌ ${name}: Response not successful`, data.error)
      return false
    }

    console.log(`✅ ${name}: Success`)
    console.log(`   Data items: ${data.data?.length || 'N/A'}`)
    return true
  } catch (error) {
    console.error(`❌ ${name}: ${error.message}`)
    return false
  }
}

async function runTests() {
  console.log('🧪 Testing Destinations API Endpoints')
  console.log('=====================================')

  const tests = [
    ['List destinations', ''],
    ['List with pagination', '?page=2&limit=5'],
    ['Filter by region', '?region=europe'],
    ['Filter by category', '?category=beach'],
    ['Search destinations', '?search=paris'],
    ['Get single destination', '/paris-france'],
    ['Get regions', '/regions'],
    ['Get popular destinations', '/popular'],
    ['Popular by bookings', '/popular?basedOn=bookings'],
    ['Search endpoint', '/search?q=beach'],
    ['Search with fuzzy', '/search?q=bech&fuzzy=true'],
  ]

  let passed = 0
  let failed = 0

  for (const [name, path] of tests) {
    const result = await testEndpoint(name, path)
    if (result) passed++
    else failed++
  }

  console.log('\n=====================================')
  console.log(`Results: ${passed} passed, ${failed} failed`)

  if (failed === 0) {
    console.log('🎉 All tests passed!')
  } else {
    console.log('⚠️  Some tests failed. Check the output above.')
  }
}

// Check if server is running
fetch('http://localhost:3000')
  .then(() => {
    console.log('Server is running on http://localhost:3000')
    runTests()
  })
  .catch(() => {
    console.error('❌ Server is not running. Please start the development server with: npm run dev')
    process.exit(1)
  })