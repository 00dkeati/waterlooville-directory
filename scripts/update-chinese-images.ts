import fs from 'fs'
import path from 'path'

// Chinese takeaways with their exact names and locations
const takeaways = [
  {
    name: "New Golden Leaf",
    location: "Waterlooville",
    address: "7 The Kestrels, Eagle Ave, PO8 9GX"
  },
  {
    name: "Noodle Bar Chinese Takeaway", 
    location: "Waterlooville",
    address: "115 London Rd, PO7 7DZ"
  },
  {
    name: "The Light Chinese Takeaway",
    location: "Waterlooville", 
    address: "61 London Rd, PO7 7EX"
  },
  {
    name: "Jade Garden",
    location: "Waterlooville",
    address: "5 Queens Parade, London Rd, PO7 7EB"
  },
  {
    name: "Kim & Laurie",
    location: "Waterlooville",
    address: "3 Lavender Rd, PO7 8NS"
  },
  {
    name: "New Purbrook Garden",
    location: "Purbrook",
    address: "8 London Rd, PO7 5LJ"
  },
  {
    name: "Lucky House",
    location: "Horndean",
    address: "2A London Rd, PO8 0BZ"
  },
  {
    name: "Hakka Kitchen",
    location: "Waterlooville",
    address: "75B London Rd, PO7 7EL"
  }
]

// For now, let's use high-quality Chinese food images from Unsplash
// Each takeaway gets a different but relevant image
const imageUrls = [
  "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop", // General Chinese food
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop", // Chinese takeaway box
  "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop", // Chinese noodles
  "https://images.unsplash.com/photo-1563379091339-03246963d4d0?w=400&h=300&fit=crop", // Chinese dumplings
  "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop", // Chinese stir fry
  "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop", // General Chinese food
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop", // Chinese takeaway box
  "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop"  // Chinese noodles
]

async function updateEditorialArticles() {
  try {
    // Read current editorial articles
    const editorialPath = path.join(process.cwd(), 'data', 'editorial-articles.json')
    const editorialData = JSON.parse(fs.readFileSync(editorialPath, 'utf8'))
    
    // Find the Chinese takeaways article
    const chineseArticle = editorialData.find((article: any) => 
      article.slug === 'best-chinese-takeaways-waterlooville-horndean-purbrook-2025'
    )
    
    if (!chineseArticle) {
      throw new Error('Chinese takeaways article not found')
    }
    
    // Update images in the league table
    if (chineseArticle.content && chineseArticle.content.blocks) {
      const leagueTableBlock = chineseArticle.content.blocks.find((block: any) => 
        block.type === 'leagueTable'
      )
      
      if (leagueTableBlock && leagueTableBlock.takeaways) {
        leagueTableBlock.takeaways.forEach((takeaway: any, index: number) => {
          // Assign different images to each takeaway
          takeaway.image = imageUrls[index] || imageUrls[0]
          console.log(`Updated image for ${takeaway.name}: ${takeaway.image}`)
        })
      }
    }
    
    // Write back to file
    fs.writeFileSync(editorialPath, JSON.stringify(editorialData, null, 2))
    console.log('✅ Editorial articles updated with diverse Chinese food images')
    
  } catch (error) {
    console.error('Error updating editorial articles:', error)
  }
}

async function main() {
  console.log('🍜 Updating Chinese Takeaways with diverse food images...')
  
  await updateEditorialArticles()
  
  console.log('\n📊 Image Assignment:')
  takeaways.forEach((takeaway, index) => {
    console.log(`${index + 1}. ${takeaway.name}: ${imageUrls[index]}`)
  })
  
  console.log('\n🎉 Process complete!')
  console.log('\n💡 To get actual restaurant photos from Google Maps:')
  console.log('1. Get a Google Places API key from: https://console.cloud.google.com/')
  console.log('2. Add GOOGLE_PLACES_API_KEY to your .env.local file')
  console.log('3. Run: npm run fetch-chinese-images')
}

main().catch(console.error)
