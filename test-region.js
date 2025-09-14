import { GET } from './app/api/destinations/route.js'
import { NextRequest } from 'next/server'

async function test() {
  try {
    const request = new NextRequest('http://localhost:3000/api/destinations?region=Caribbean')
    const response = await GET(request)
    const data = await response.json()
    console.log('Status:', response.status)
    console.log('Data:', JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error:', error)
  }
}

test()
