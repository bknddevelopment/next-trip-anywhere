const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const errors = [];
  const warnings = [];

  // Listen for console messages
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error') {
      errors.push(text);
    } else if (type === 'warning') {
      warnings.push(text);
    }
  });

  // Listen for page errors
  page.on('pageerror', error => {
    errors.push(error.message);
  });

  // Test homepage
  console.log('Testing homepage...');
  await page.goto('http://localhost:3000/');
  await new Promise(r => setTimeout(r, 2000));

  // Test cruises page
  console.log('Testing cruises page...');
  await page.goto('http://localhost:3000/cruises/');
  await new Promise(r => setTimeout(r, 2000));

  // Test Essex County page
  console.log('Testing Essex County page...');
  await page.goto('http://localhost:3000/locations/essex-county/newark/airport-transfers/');
  await new Promise(r => setTimeout(r, 2000));

  await browser.close();

  console.log('\n=== RESULTS ===');
  if (errors.length > 0) {
    console.log('\n❌ ERRORS FOUND:');
    errors.forEach(err => console.log(`  - ${err}`));
  } else {
    console.log('\n✅ No errors found!');
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(warn => console.log(`  - ${warn}`));
  }

  process.exit(errors.length > 0 ? 1 : 0);
})();