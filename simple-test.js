const fs = require('fs');
const path = require('path');

// Read .env.local file
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

let apiKey = '';
for (const line of lines) {
  if (line.startsWith('GOOGLE_PLACES_API_KEY=')) {
    apiKey = line.replace('GOOGLE_PLACES_API_KEY=', '').trim();
    break;
  }
}

if (!apiKey) {
  console.log('No API key found');
  process.exit(1);
}

console.log('Testing Google Places API...');
console.log('API key starts with:', apiKey.substring(0, 10));

// Test with fetch
const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=50.8793,-1.0345&radius=3000&type=restaurant&key=' + apiKey;

fetch(url)
  .then(res => res.json())
  .then(data => {
    if (data.error_message) {
      console.log('API Error:', data.error_message);
    } else if (data.results) {
      console.log('SUCCESS! Found', data.results.length, 'places');
      for (let i = 0; i < Math.min(3, data.results.length); i++) {
        console.log((i+1) + '.', data.results[i].name);
      }
    }
  })
  .catch(err => console.log('Error:', err.message));
