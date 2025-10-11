import { YellScraper } from '../lib/scrapers/yellScraper'

async function testScraper() {
  const scraper = new YellScraper()
  
  // Test with a specific business
  const businessName = process.argv[2] || 'Waterlooville Plumbing'
  const location = process.argv[3] || 'Waterlooville'

  console.log(`Testing scraper with: ${businessName}, ${location}`)
  
  const data = await scraper.findAndScrape(businessName, location)
  
  if (data) {
    console.log('\n✅ SUCCESS! Scraped data:')
    console.log(JSON.stringify(data, null, 2))
  } else {
    console.log('\n❌ No data found')
  }
}

testScraper().catch(console.error)
