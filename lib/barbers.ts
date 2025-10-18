import { getBusinesses } from './db'
import { getPlacePrimaryPhotoRef, getPlacePhotoUrl } from './googlePhotos'

export interface Barber {
  id: string
  name: string
  slug?: string
  area?: string
  address?: string
  phone?: string
  website?: string
  rating?: number
  review_count?: number
  place_id?: string
  photo_reference?: string | null
  imageUrl?: string | null
  lat?: number
  lng?: number
  description?: string
  overallScore?: number
  rank?: number
}

// Barber-related keywords to filter businesses
const BARBER_KEYWORDS = [
  'barber',
  'barbershop', 
  'men\'s hair',
  'gents hair',
  'hair salon',
  'hairdresser',
  'hair care'
]

// Areas to include in the league table
const TARGET_AREAS = [
  'waterlooville',
  'horndean', 
  'cowplain',
  'purbrook',
  'clanfield',
  'denmead'
]

/**
 * Get all barber businesses for the Waterlooville area
 */
export async function getBarbersForWaterlooville(): Promise<Barber[]> {
  try {
    // Get all businesses
    const allBusinesses = await getBusinesses()
    
    // Filter for barber-related businesses in target areas
    const barberBusinesses = allBusinesses.filter(business => {
      const isBarberCategory = BARBER_KEYWORDS.some(keyword => 
        business.category?.toLowerCase().includes(keyword) ||
        business.name?.toLowerCase().includes(keyword) ||
        business.description?.toLowerCase().includes(keyword)
      )
      
      const isTargetArea = TARGET_AREAS.some(area => 
        business.area?.toLowerCase().includes(area) ||
        business.address?.toLowerCase().includes(area)
      )
      
      return isBarberCategory && isTargetArea
    })

    console.log(`[barbers] Found ${barberBusinesses.length} barber businesses`)

    // Process each business to get photos and calculate scores
    const processedBarbers: Barber[] = []
    
    for (const business of barberBusinesses) {
      try {
        const barber: Barber = {
          id: business.id,
          name: business.name,
          slug: business.slug,
          area: business.area,
          address: business.address,
          phone: business.phone,
          website: business.website,
          rating: business.rating,
          review_count: business.review_count,
          place_id: business.google_place_id,
          photo_reference: business.images?.[0] ? 'existing' : null,
          lat: business.lat,
          lng: business.lng,
          description: business.description,
          imageUrl: null
        }

        // Try to get a valid photo
        if (business.google_place_id) {
          try {
            // First try existing images
            if (business.images && business.images.length > 0) {
              // Use the first existing image if it's a valid Google photo URL
              const existingImage = business.images[0]
              if (existingImage && existingImage.includes('maps.googleapis.com')) {
                barber.imageUrl = existingImage
              }
            }
            
            // If no existing image or validation failed, try to get one from Place Details
            if (!barber.imageUrl) {
              const photoRef = await getPlacePrimaryPhotoRef(business.google_place_id)
              if (photoRef) {
                const photoUrl = await getPlacePhotoUrl(photoRef, { width: 800 })
                if (photoUrl) {
                  barber.imageUrl = photoUrl
                  barber.photo_reference = photoRef
                }
              }
            }
          } catch (error) {
            console.warn(`[barbers] Failed to get photo for ${business.name}:`, error)
          }
        }

        // Calculate overall score
        barber.overallScore = calculateOverallScore(barber.rating, barber.review_count)
        
        processedBarbers.push(barber)
      } catch (error) {
        console.error(`[barbers] Error processing ${business.name}:`, error)
      }
    }

    // Sort by overall score (descending) and assign ranks
    processedBarbers.sort((a, b) => (b.overallScore || 0) - (a.overallScore || 0))
    
    processedBarbers.forEach((barber, index) => {
      barber.rank = index + 1
    })

    console.log(`[barbers] Processed ${processedBarbers.length} barbers with photos: ${processedBarbers.filter(b => b.imageUrl).length}`)
    
    return processedBarbers
  } catch (error) {
    console.error('[barbers] Error getting barbers:', error)
    return []
  }
}

/**
 * Calculate overall score (0-100) based on rating and review count
 */
function calculateOverallScore(rating?: number, reviewCount?: number): number {
  if (!rating && !reviewCount) return 0
  
  // Normalize rating (0-5) to 0-100
  const normRating = rating ? (rating / 5) * 100 : 0
  
  // Normalize review count using log scale (0-1000 reviews = 0-100)
  const normReviews = reviewCount ? 
    Math.min((Math.log10(reviewCount + 1) / Math.log10(1000)) * 100, 100) : 0
  
  // Weighted combination: 70% rating, 30% review count
  let score = 0
  let totalWeight = 0
  
  if (rating) {
    score += normRating * 0.7
    totalWeight += 0.7
  }
  
  if (reviewCount) {
    score += normReviews * 0.3
    totalWeight += 0.3
  }
  
  // If we have partial data, scale proportionally
  if (totalWeight > 0) {
    score = score / totalWeight
  }
  
  return Math.round(score)
}

/**
 * Get barbers filtered by area
 */
export function filterBarbersByArea(barbers: Barber[], area: string): Barber[] {
  if (!area || area === 'all') return barbers
  
  return barbers.filter(barber => 
    barber.area?.toLowerCase().includes(area.toLowerCase()) ||
    barber.address?.toLowerCase().includes(area.toLowerCase())
  )
}

/**
 * Sort barbers by different criteria
 */
export function sortBarbers(barbers: Barber[], sortBy: string): Barber[] {
  const sorted = [...barbers]
  
  switch (sortBy) {
    case 'score':
      return sorted.sort((a, b) => (b.overallScore || 0) - (a.overallScore || 0))
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    case 'reviews':
      return sorted.sort((a, b) => (b.review_count || 0) - (a.review_count || 0))
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'area':
      return sorted.sort((a, b) => (a.area || '').localeCompare(b.area || ''))
    default:
      return sorted
  }
}
