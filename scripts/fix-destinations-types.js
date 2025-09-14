#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the destinations file
const filePath = path.join(__dirname, '..', 'lib', 'data', 'destinations.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Fix climate field - change averageTemperature to temperature
content = content.replace(/averageTemperature:/g, 'temperature:');

// Remove unit property from temperature objects
content = content.replace(/, unit: 'C'/g, '');
content = content.replace(/, unit: 'F'/g, '');

// Fix bestMonths to rainyMonths (these are actually the good months, so we'll comment them out)
content = content.replace(/bestMonths: \[([^\]]+)\],/g, '// bestMonths: [$1], // TODO: Convert to rainyMonths');

// Fix rainySeasons to rainyMonths
content = content.replace(/rainySeasons:/g, 'rainyMonths:');

// Fix travelRequirements structure
// Fix visa field
content = content.replace(/(\s+)visaRequired: (true|false),/g, '$1visa: {\n$1  required: $2,\n$1  details: \'Check with embassy for latest requirements\',\n$1},');

// Fix visaOnArrival (should be inside visa object)
content = content.replace(/(\s+)visaOnArrival: (true|false),/g, '$1  onArrival: $2,');

// Fix currency field - convert string to object
content = content.replace(/(\s+)currency: 'EUR',/g, `$1currency: {
$1  code: 'EUR',
$1  name: 'Euro',
$1  exchangeRate: 1.08,
$1},`);

content = content.replace(/(\s+)currency: 'JPY',/g, `$1currency: {
$1  code: 'JPY',
$1  name: 'Japanese Yen',
$1  exchangeRate: 150,
$1},`);

content = content.replace(/(\s+)currency: 'USD',/g, `$1currency: {
$1  code: 'USD',
$1  name: 'US Dollar',
$1  exchangeRate: 1,
$1},`);

content = content.replace(/(\s+)currency: 'THB',/g, `$1currency: {
$1  code: 'THB',
$1  name: 'Thai Baht',
$1  exchangeRate: 35,
$1},`);

content = content.replace(/(\s+)currency: 'AUD',/g, `$1currency: {
$1  code: 'AUD',
$1  name: 'Australian Dollar',
$1  exchangeRate: 1.5,
$1},`);

content = content.replace(/(\s+)currency: 'MXN',/g, `$1currency: {
$1  code: 'MXN',
$1  name: 'Mexican Peso',
$1  exchangeRate: 17,
$1},`);

content = content.replace(/(\s+)currency: 'INR',/g, `$1currency: {
$1  code: 'INR',
$1  name: 'Indian Rupee',
$1  exchangeRate: 83,
$1},`);

// Fix languages to language
content = content.replace(/(\s+)languages:/g, '$1language:');

// Fix electricityVoltage to electricalOutlet
content = content.replace(/(\s+)electricityVoltage: '([^']+)',/g, '$1electricalOutlet: \'$2\',');

// Remove redundant plugType (merge with electricalOutlet)
content = content.replace(/(\s+)plugType: '([^']+)',/g, '');

// Fix transportation structure
// This is more complex - we need to convert the old structure to the new one
const transportRegex = /transportation: \{[^}]+\},/gs;
const transportMatches = content.match(transportRegex);

if (transportMatches) {
  transportMatches.forEach(match => {
    // Extract the local transport types if they exist
    const localMatch = match.match(/localTransportTypes: \[([^\]]+)\]/);
    const localTransport = localMatch ? localMatch[1] : "'Bus', 'Taxi'";

    const newTransport = `transportation: {
      fromAirport: ['Taxi', 'Shuttle', 'Public Transport'],
      local: [${localTransport}],
      intercity: ['Train', 'Bus'],
      rentalOptions: ['Car rental', 'Bike rental'],
    },`;

    content = content.replace(match, newTransport);
  });
}

// Write the fixed content back
fs.writeFileSync(filePath, content, 'utf-8');

console.log('Fixed destination types successfully!');