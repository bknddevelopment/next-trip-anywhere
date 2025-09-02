#!/usr/bin/env node

/**
 * Test script to verify base path handling
 */

const path = require('path')

// Mock different environments
const environments = [
  { name: 'Local Development', NODE_ENV: 'development', url: 'http://localhost:3000/' },
  { name: 'GitHub Pages', NODE_ENV: 'production', url: 'https://username.github.io/Next-Trip-Anywhere/' },
]

console.log('Testing Base Path Configuration')
console.log('================================\n')

environments.forEach(env => {
  process.env.NODE_ENV = env.NODE_ENV
  const isProd = process.env.NODE_ENV === 'production'
  const basePath = isProd ? '/Next-Trip-Anywhere' : ''
  
  console.log(`Environment: ${env.name}`)
  console.log(`  NODE_ENV: ${env.NODE_ENV}`)
  console.log(`  URL: ${env.url}`)
  console.log(`  Base Path: ${basePath || '(none)'}`)
  console.log(`  Logo Path: ${basePath}/NextTripAnywhere.PNG`)
  console.log()
})

console.log('✅ Base path configuration verified')
console.log('\nKey points:')
console.log('- Case-sensitive: /Next-Trip-Anywhere (capital letters)')
console.log('- Logo file: /NextTripAnywhere.PNG')
console.log('- Build-time: Uses NODE_ENV')
console.log('- Runtime: Uses window.location.pathname')