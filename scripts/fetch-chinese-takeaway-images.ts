import fs from 'fs'
import path from 'path'

// Chinese takeaways data with their exact addresses for Google Places API lookup
const takeaways = [
  {
    name: "New Golden Leaf",
    address: "7 The Kestrels, Eagle Ave, Waterlooville PO8 9GX, UK",
    placeId: null // Will be filled by API
  },
  {
    name: "Noodle Bar Chinese Takeaway", 
    address: "115 London Rd, Waterlooville PO7 7DZ, UK",
    placeId: null
  },
  {
    name: "The Light Chinese Takeaway",
    address: "61 London Rd, Waterlooville PO7 7EX, UK", 
    placeId: null
  },
  {
    name: "Jade Garden",
    address: "5 Queens Parade, London Rd, Waterlooville PO7 7EB, UK",
    placeId: null
  },
  {
    name: "Kim & Laurie",
    address: "3 Lavender Rd, Waterlooville PO7 8NS, UK",
    placeId: null
  },
  {
    name: "New Purbrook Garden",
    address: "8 London Rd, Purbrook PO7 5LJ, UK",
    placeId: null
  },
  {
    name: "Lucky House",
    address: "2A London Rd, Horndean PO8 0BZ, UK",
    placeId: null
  },
  {
    name: "Hakka Kitchen",
    address: "75B London Rd, Waterlooville PO7 7EL, UK",
    placeId: null
  }
]

async function findPlacesAndGetPhotos() {
  const results = []
  
  for (const takeaway of takeaways) {
    try {
      console.log(`Searching for: ${takeaway.name}`)
      
      // Step 1: Find the place using Text Search
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(takeaway.name + ' ' + takeaway.address)}&key=${process.env.GOOGLE_PLACES_API_KEY}`
      
      const searchResponse = await fetch(searchUrl)
      const searchData = await searchResponse.json()
      
      if (searchData.results && searchData.results.length > 0) {
        const place = searchData.results[0]
        console.log(`Found: ${place.name} (${place.place_id})`)
        
        // Step 2: Get place details including photos
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,photos&key=${process.env.GOOGLE_PLACES_API_KEY}`
        
        const detailsResponse = await fetch(detailsUrl)
        const detailsData = await detailsResponse.json()
        
        if (detailsData.result && detailsData.result.photos && detailsData.result.photos.length > 0) {
          const photo = detailsData.result.photos[0]
          const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.GOOGLE_PLACES_API_KEY}`
          
          results.push({
            name: takeaway.name,
            placeId: place.place_id,
            photoReference: photo.photo_reference,
            photoUrl: photoUrl,
            found: true
          })
          
          console.log(`✅ Photo found for ${takeaway.name}`)
        } else {
          console.log(`❌ No photos found for ${takeaway.name}`)
          results.push({
            name: takeaway.name,
            found: false,
            reason: 'No photos available'
          })
        }
      } else {
        console.log(`❌ Place not found: ${takeaway.name}`)
        results.push({
          name: takeaway.name,
          found: false,
          reason: 'Place not found'
        })
      }
      
      // Rate limiting - wait 100ms between requests
      await new Promise(resolve => setTimeout(resolve, 100))
      
    } catch (error) {
      console.error(`Error processing ${takeaway.name}:`, error)
      results.push({
        name: takeaway.name,
        found: false,
        reason: `Error: ${error.message}`
      })
    }
  }
  
  return results
}

async function updateEditorialArticles(photoResults: any[]) {
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
        leagueTableBlock.takeaways.forEach((takeaway: any) => {
          const photoResult = photoResults.find(result => 
            result.name.toLowerCase().includes(takeaway.name.toLowerCase()) ||
            takeaway.name.toLowerCase().includes(result.name.toLowerCase())
          )
          
          if (photoResult && photoResult.found) {
            takeaway.image = photoResult.photoUrl
            console.log(`Updated image for ${takeaway.name}`)
          }
        })
      }
    }
    
    // Write back to file
    fs.writeFileSync(editorialPath, JSON.stringify(editorialData, null, 2))
    console.log('✅ Editorial articles updated with Google Photos')
    
  } catch (error) {
    console.error('Error updating editorial articles:', error)
  }
}

async function main() {
  console.log('🍜 Fetching Google Photos for Chinese Takeaways...')
  
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    console.error('❌ GOOGLE_PLACES_API_KEY environment variable not set')
    console.log('Please set your Google Places API key in .env.local')
    return
  }
  
  const photoResults = await findPlacesAndGetPhotos()
  
  console.log('\n📊 Results Summary:')
  photoResults.forEach(result => {
    if (result.found) {
      console.log(`✅ ${result.name}: Photo found`)
    } else {
      console.log(`❌ ${result.name}: ${result.reason}`)
    }
  })
  
  // Update the editorial articles with the new photo URLs
  await updateEditorialArticles(photoResults)
  
  console.log('\n🎉 Process complete!')
}

main().catch(console.error)
