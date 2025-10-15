/**
 * Verify Chinese Takeaways in Waterlooville, Horndean, and Clanfield
 * Uses AI-powered web scraping to get accurate business information
 */

import { chromium } from 'playwright'
import * as fs from 'fs'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

interface ChineseTakeaway {
  name: string
  address: string
  area: 'Waterlooville' | 'Horndean' | 'Clanfield'
  rating?: number
  reviewCount?: number
  phone?: string
  website?: string
  verified: boolean
}

async function searchGoogleMaps(query: string): Promise<string> {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  
  try {
    await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(query)}`, {
      waitUntil: 'networkidle',
      timeout: 30000
    })
    
    // Wait for results to load
    await page.waitForTimeout(3000)
    
    // Get page content
    const content = await page.content()
    
    await browser.close()
    return content
  } catch (error) {
    console.error(`Error searching for ${query}:`, error)
    await browser.close()
    return ''
  }
}

async function extractBusinessesWithAI(html: string, area: string): Promise<ChineseTakeaway[]> {
  if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY not set')
    return []
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert at extracting business information from Google Maps HTML. 
Extract ALL Chinese takeaways/takeaway restaurants from the HTML content.

Return ONLY a valid JSON array with this structure:
[
  {
    "name": "Business Name",
    "address": "Full street address",
    "area": "Waterlooville" or "Horndean" or "Clanfield",
    "rating": 4.5,
    "reviewCount": 127,
    "phone": "02392 123456",
    "website": "https://...",
    "verified": true
  }
]

Rules:
- Extract ALL Chinese takeaways/takeaway restaurants you find
- Include the full street address
- Determine the correct area (Waterlooville, Horndean, or Clanfield) based on the address
- Include ratings and review counts if available
- Include phone numbers and websites if available
- Set verified: true for businesses that clearly exist
- Return ONLY the JSON array, no explanations
- If no businesses found, return empty array []`
          },
          {
            role: 'user',
            content: `Extract Chinese takeaways from this Google Maps search results HTML for ${area}:\n\n${html.substring(0, 30000)}`
          }
        ],
        temperature: 0.1,
        max_tokens: 3000
      })
    })

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('No content returned from OpenAI')
    }

    // Parse JSON response
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      console.warn('⚠️  Could not parse AI response as JSON')
      return []
    }

    const businesses = JSON.parse(jsonMatch[0])
    return businesses

  } catch (error) {
    console.error('Error extracting businesses:', error)
    return []
  }
}

async function main() {
  console.log('🔍 Verifying Chinese Takeaways in Waterlooville, Horndean, and Clanfield\n')
  console.log('Using AI-powered web scraping to get accurate information...\n')

  const allBusinesses: ChineseTakeaway[] = []

  // Search for Chinese takeaways in each area
  const searches = [
    { query: 'Chinese takeaway Waterlooville', area: 'Waterlooville' },
    { query: 'Chinese takeaway Horndean', area: 'Horndean' },
    { query: 'Chinese takeaway Clanfield', area: 'Clanfield' }
  ]

  for (const search of searches) {
    console.log(`\n📍 Searching for Chinese takeaways in ${search.area}...`)
    console.log(`   Query: "${search.query}"`)
    
    const html = await searchGoogleMaps(search.query)
    
    if (html) {
      console.log(`   ✅ Got search results (${html.length} characters)`)
      
      const businesses = await extractBusinessesWithAI(html, search.area)
      
      console.log(`   ✅ Found ${businesses.length} Chinese takeaways in ${search.area}:`)
      businesses.forEach(biz => {
        console.log(`      - ${biz.name}`)
        console.log(`        Address: ${biz.address}`)
        if (biz.rating) {
          console.log(`        Rating: ${biz.rating} (${biz.reviewCount} reviews)`)
        }
        if (biz.phone) {
          console.log(`        Phone: ${biz.phone}`)
        }
        console.log('')
      })
      
      allBusinesses.push(...businesses)
    } else {
      console.log(`   ❌ Failed to get search results`)
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  // Save results
  const report = {
    generated_at: new Date().toISOString(),
    total_businesses: allBusinesses.length,
    areas: {
      Waterlooville: allBusinesses.filter(b => b.area === 'Waterlooville'),
      Horndean: allBusinesses.filter(b => b.area === 'Horndean'),
      Clanfield: allBusinesses.filter(b => b.area === 'Clanfield')
    },
    all_businesses: allBusinesses
  }

  fs.writeFileSync(
    'chinese-takeaways-verification.json',
    JSON.stringify(report, null, 2)
  )

  console.log('\n' + '='.repeat(80))
  console.log('📊 VERIFICATION COMPLETE')
  console.log('='.repeat(80))
  console.log(`\nTotal Chinese Takeaways Found: ${allBusinesses.length}`)
  console.log(`\nBreakdown by Area:`)
  console.log(`  Waterlooville: ${report.areas.Waterlooville.length} businesses`)
  console.log(`  Horndean: ${report.areas.Horndean.length} businesses`)
  console.log(`  Clanfield: ${report.areas.Clanfield.length} businesses`)
  
  console.log(`\n📄 Full report saved to: chinese-takeaways-verification.json`)
  console.log('\n' + '='.repeat(80))
  
  // Display detailed breakdown
  console.log('\n📋 DETAILED BREAKDOWN:\n')
  
  Object.entries(report.areas).forEach(([area, businesses]) => {
    console.log(`\n${area}:`)
    console.log('-'.repeat(40))
    if (businesses.length === 0) {
      console.log('  No Chinese takeaways found in this area')
    } else {
      businesses.forEach(biz => {
        console.log(`\n  ${biz.name}`)
        console.log(`  📍 ${biz.address}`)
        if (biz.rating) {
          console.log(`  ⭐ ${biz.rating} (${biz.reviewCount} reviews)`)
        }
        if (biz.phone) {
          console.log(`  📞 ${biz.phone}`)
        }
      })
    }
  })
  
  console.log('\n' + '='.repeat(80))
  console.log('✅ Verification complete! Check chinese-takeaways-verification.json for full details.')
  console.log('='.repeat(80) + '\n')
}

main().catch(console.error)




