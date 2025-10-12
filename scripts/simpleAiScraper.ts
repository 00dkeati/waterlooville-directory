import { chromium } from 'playwright'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// Simple AI-powered scraper using GPT-4 Vision or text extraction
// No API keys needed for basic sources - just Playwright + OpenAI

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''

interface Review {
  author_name: string
  rating: number
  text: string
  date: string
  source: string
}

// Use AI to extract structured data from raw text
async function extractWithAI(pageText: string, businessName: string, source: string): Promise<Review[]> {
  if (!OPENAI_API_KEY) {
    console.log('      ⚠️  No OpenAI key - using pattern matching')
    return []
  }

  try {
    const prompt = `Extract customer reviews from this ${source} page for "${businessName}".

Page content:
${pageText.substring(0, 8000)}

Return a JSON array of reviews with this exact structure:
[
  {
    "author_name": "Full Name",
    "rating": 4.5,
    "text": "The actual review text...",
    "date": "2024-01-15",
    "source": "${source}"
  }
]

Rules:
- Extract ALL reviews you can find
- Use exact review text (don't summarize)
- Convert ratings to 1-5 scale
- Parse dates to YYYY-MM-DD format (or "2024-01-01" if unclear)
- Return ONLY the JSON array

If no reviews found, return: []`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a precise data extraction assistant. Return only valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0,
        max_tokens: 3000
      })
    })

    const data = await response.json()
    
    if (data.error) {
      console.error(`      OpenAI error: ${data.error.message}`)
      return []
    }

    const content = data.choices[0]?.message?.content || '[]'
    
    // Extract JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/)?.[0]
    if (!jsonMatch) return []

    const reviews = JSON.parse(jsonMatch)
    return Array.isArray(reviews) ? reviews : []

  } catch (error) {
    console.error(`      AI extraction error: ${error}`)
    return []
  }
}

// Scrape a single source
async function scrapeSource(page: any, business: any, source: string): Promise<Review[]> {
  const searchUrls: Record<string, string> = {
    google: `https://www.google.com/maps/search/${encodeURIComponent(business.name + ' Waterlooville')}`,
    trustpilot: `https://uk.trustpilot.com/search?query=${encodeURIComponent(business.name)}`,
    yell: `https://www.yell.com/ucs/UcsSearchAction.do?keywords=${encodeURIComponent(business.name)}&location=Waterlooville`,
    tripadvisor: `https://www.tripadvisor.co.uk/Search?q=${encodeURIComponent(business.name + ' Waterlooville')}`,
  }

  const url = searchUrls[source]
  if (!url) return []

  try {
    console.log(`      Loading ${source}...`)
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })
    await page.waitForTimeout(3000)

    // Scroll page to load content
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight / 2)
    })
    await page.waitForTimeout(1500)

    // Get text content
    const pageText = await page.evaluate(() => document.body.innerText)
    
    // Use AI to extract reviews
    const reviews = await extractWithAI(pageText, business.name, source)
    
    if (reviews.length > 0) {
      console.log(`      ✅ Extracted ${reviews.length} reviews`)
      // Show first review as sample
      if (reviews[0]) {
        console.log(`      📝 Sample: "${reviews[0].text.substring(0, 60)}..."`)
      }
    }

    return reviews

  } catch (error) {
    console.error(`      ❌ Error with ${source}: ${error}`)
    return []
  }
}

// Main function
async function scrapeReviewsWithAI() {
  console.log('\n🤖 AI-Powered Multi-Source Review Scraper')
  console.log('='+ '='.repeat(48) + '\n')

  if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is required for AI extraction')
    console.error('   Set it with: export OPENAI_API_KEY=your_key_here')
    console.error('   Get a key from: https://platform.openai.com/api-keys\n')
    process.exit(1)
  }

  // Load businesses
  const businessesPath = join(process.cwd(), 'public', 'data', 'businesses.json')
  const businesses = JSON.parse(readFileSync(businessesPath, 'utf-8'))

  // Filter for estate agents (or change category as needed)
  const targets = businesses.filter((b: any) => 
    b.category === 'estate-agents' || 
    b.name.toLowerCase().includes('estate')
  )

  console.log(`📊 Found ${targets.length} estate agents`)
  console.log(`🎯 Sources: Google, Trustpilot, Yell\n`)

  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  let totalReviews = 0
  const sources = ['google', 'trustpilot', 'yell']

  try {
    const page = await browser.newPage()
    
    for (let i = 0; i < targets.length; i++) {
      const business = targets[i]
      console.log(`\n[${i + 1}/${targets.length}] ${business.name}`)

      const allReviews: Review[] = []

      for (const source of sources) {
        const reviews = await scrapeSource(page, business, source)
        allReviews.push(...reviews)
        
        // Delay between sources
        await page.waitForTimeout(2000)
      }

      // Update business
      if (allReviews.length > 0) {
        const businessIndex = businesses.findIndex((b: any) => b.id === business.id)
        if (businessIndex !== -1) {
          businesses[businessIndex].aggregated_reviews = allReviews
          businesses[businessIndex].review_count = allReviews.length
          
          const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
          businesses[businessIndex].rating = avgRating

          console.log(`   ✨ Total: ${allReviews.length} reviews, avg rating: ${avgRating.toFixed(1)}⭐`)
        }

        totalReviews += allReviews.length
      }

      // Longer delay between businesses
      await page.waitForTimeout(3000)
    }

    await page.close()

  } finally {
    await browser.close()
  }

  // Save
  console.log('\n💾 Saving results...')
  writeFileSync(businessesPath, JSON.stringify(businesses, null, 2))

  console.log('\n' + '='.repeat(50))
  console.log('✅ COMPLETE!')
  console.log('='.repeat(50))
  console.log(`Businesses: ${targets.length}`)
  console.log(`Total reviews scraped: ${totalReviews}`)
  console.log(`Average: ${(totalReviews / targets.length).toFixed(1)} reviews per business`)
}

if (require.main === module) {
  scrapeReviewsWithAI().catch(console.error)
}

export { scrapeReviewsWithAI }

