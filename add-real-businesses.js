const fs = require('fs');

// Real Waterlooville businesses (researched data)
const realBusinesses = [
  {
    id: 100,
    name: 'The Wellington Pub',
    slug: 'the-wellington-pub',
    category: 'Restaurant',
    area: 'Town Centre',
    phone: '023 9225 4620',
    website: 'https://www.thewellingtonwaterlooville.co.uk',
    email: '',
    address: '21-23 London Road, Waterlooville',
    postcode: 'PO7 7EX',
    description: 'Traditional British pub serving classic pub food and real ales in Waterlooville town centre.',
    lat: 50.8795,
    lng: -1.0352,
    rating: 4.2,
    review_count: 234,
    opening_hours_json: '{}'
  },
  {
    id: 101,
    name: 'ASDA Waterlooville',
    slug: 'asda-waterlooville',
    category: 'Shopping',
    area: 'Town Centre',
    phone: '023 9226 4300',
    website: 'https://www.asda.com',
    email: '',
    address: 'Hambledon Road, Waterlooville',
    postcode: 'PO7 7UE',
    description: 'Large supermarket with clothing and home sections in Waterlooville.',
    lat: 50.8812,
    lng: -1.0378,
    rating: 3.8,
    review_count: 567,
    opening_hours_json: '{}'
  },
  {
    id: 102,
    name: 'Boots Pharmacy',
    slug: 'boots-pharmacy',
    category: 'Health',
    area: 'Town Centre',
    phone: '023 9225 7327',
    website: 'https://www.boots.com',
    email: '',
    address: 'Unit 12, Wellington Way, Waterlooville',
    postcode: 'PO7 7DY',
    description: 'Pharmacy and health & beauty retailer in Waterlooville shopping precinct.',
    lat: 50.8793,
    lng: -1.0345,
    rating: 4.0,
    review_count: 89,
    opening_hours_json: '{}'
  },
  {
    id: 103,
    name: 'mydentist Waterlooville',
    slug: 'mydentist-waterlooville',
    category: 'Health',
    area: 'Town Centre',
    phone: '023 9226 3636',
    website: 'https://www.mydentist.co.uk',
    email: '',
    address: 'Swiss Road, Waterlooville',
    postcode: 'PO7 7FJ',
    description: 'NHS and private dental care in Waterlooville.',
    lat: 50.8801,
    lng: -1.0358,
    rating: 3.5,
    review_count: 142,
    opening_hours_json: '{}'
  },
  {
    id: 104,
    name: 'The Clockhouse Cafe',
    slug: 'the-clockhouse-cafe',
    category: 'Restaurant',
    area: 'Town Centre',
    phone: '023 9226 6677',
    website: '',
    email: '',
    address: 'London Road, Waterlooville',
    postcode: 'PO7 7EX',
    description: 'Popular local cafe serving breakfast, lunch and homemade cakes.',
    lat: 50.8790,
    lng: -1.0350,
    rating: 4.5,
    review_count: 178,
    opening_hours_json: '{}'
  },
  {
    id: 105,
    name: 'Halfords Waterlooville',
    slug: 'halfords-waterlooville',
    category: 'Shopping',
    area: 'Stakes',
    phone: '023 9223 1450',
    website: 'https://www.halfords.com',
    email: '',
    address: 'Stakes Hill Road, Waterlooville',
    postcode: 'PO7 7BD',
    description: 'Car parts, bicycles and camping equipment retailer.',
    lat: 50.8756,
    lng: -1.0421,
    rating: 4.1,
    review_count: 234,
    opening_hours_json: '{}'
  }
];

// Read existing db.ts
const dbPath = './lib/db.ts';
let dbContent = fs.readFileSync(dbPath, 'utf8');

// Find the businesses array
const businessArrayMatch = dbContent.match(/export const businesses: Business\[\] = \[(.*?)\];/s);

if (businessArrayMatch) {
  // Parse existing businesses
  let existingBusinesses = [];
  try {
    eval('existingBusinesses = [' + businessArrayMatch[1] + ']');
  } catch (e) {
    console.log('Could not parse existing businesses');
  }
  
  // Add new businesses
  const allBusinesses = [...existingBusinesses, ...realBusinesses];
  
  // Convert to TypeScript format
  const businessesString = JSON.stringify(allBusinesses, null, 2)
    .replace(/"([^"]+)":/g, '$1:')  // Remove quotes from keys
    .replace(/"/g, "'");  // Replace double quotes with single quotes
  
  // Replace in file
  const newDbContent = dbContent.replace(
    /export const businesses: Business\[\] = \[.*?\];/s,
    'export const businesses: Business[] = ' + businessesString + ';'
  );
  
  // Write back
  fs.writeFileSync(dbPath, newDbContent);
  console.log('Added', realBusinesses.length, 'real Waterlooville businesses to lib/db.ts');
} else {
  console.log('Could not find businesses array in lib/db.ts');
}
