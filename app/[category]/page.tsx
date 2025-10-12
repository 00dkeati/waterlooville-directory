// Improved Restaurant Page with Waterlooville filtering, ranking, and featured restaurant
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import categories from '@/data/categories.json'
import areas from '@/data/areas.json'

// Featured Restaurant - Rotate weekly
const FEATURED_RESTAURANT = {
  place_id: "ChIJA5VAnXBcdEgRcGZMTBRgpzk",
  name: "The Red Lion",
  description: "Traditional British pub with excellent Sunday roasts. Family-friendly with beautiful beer garden.",
  featuredUntil: "2025-10-19"
}

interface Place {
  place_id: string
  name: string
  formatted_address?: string
  vicinity?: string
  rating?: number
  user_ratings_total?: number
  price_level?: number
  opening_hours?: { open_now?: boolean }
  photos?: Array<{ photo_reference: string }>
  geometry?: { location: { lat: number; lng: number } }
}

async function getPlaces(category: string): Promise<Place[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.waterlooville.co'
  try {
    const response = await fetch(`${baseUrl}/api/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        query: category,
        location: '50.8736,-1.0233',
        radius: 5000
      }),
      next: { revalidate: 3600 }
    })
    if (!response.ok) throw new Error('Failed to fetch')
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

function filterWaterloovillePlaces(places: Place[]): Place[] {
  const keywords = ['Waterlooville', 'PO7', 'PO8', 'Hambledon', 'Wellington Way', 'London Road']
  return places.filter(place => {
    const address = (place.formatted_address || place.vicinity || '').toLowerCase()
    return keywords.some(kw => address.includes(kw.toLowerCase()))
  })
}

function calculateRankingScore(place: Place): number {
  const rating = place.rating || 0
  const reviews = place.user_ratings_total || 0
  return (rating * 14) + Math.min(reviews / 10, 30)
}

function rankPlaces(places: Place[]): Place[] {
  return places.sort((a, b) => calculateRankingScore(b) - calculateRankingScore(a))
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const cat = categories.find(c => c.slug === params.category)
  if (!cat) return { title: 'Not Found' }
  return {
    title: `${cat.name} in Waterlooville - Local Directory`,
    description: `Find the best ${cat.name.toLowerCase()} in Waterlooville with reviews and ratings.`
  }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categoryData = categories.find(c => c.slug === params.category)
  if (!categoryData) notFound()
  
  const allPlaces = await getPlaces(categoryData.query || categoryData.name)
  const waterloovillePlaces = filterWaterloovillePlaces(allPlaces)
  const rankedPlaces = rankPlaces(waterloovillePlaces)
  
  const isRestaurants = params.category === 'restaurants'
  const featured = isRestaurants ? rankedPlaces.find(p => p.name.includes('Red Lion')) : null
  
  let displayPlaces = [...rankedPlaces]
  if (featured) {
    displayPlaces = displayPlaces.filter(p => p.place_id !== featured.place_id)
    displayPlaces.unshift(featured)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{categoryData.name} in Waterlooville</h1>
          <p className="text-xl">{displayPlaces.length} verified local businesses</p>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded">📍 Waterlooville Only</span>
            <span className="bg-white/20 px-3 py-1 rounded">⭐ Ranked by Reviews</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayPlaces.map((place, idx) => {
            const isFeatured = isRestaurants && idx === 0 && featured
            const score = calculateRankingScore(place)
            
            return (
              <div key={place.place_id} className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition ${isFeatured ? 'ring-4 ring-yellow-400 scale-105' : ''}`}>
                {isFeatured && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-center font-bold">
                    🌟 RESTAURANT OF THE WEEK 🌟
                  </div>
                )}
                
                <div className="relative h-48 bg-gray-200">
                  {place.photos?.[0] ? (
                    <Image src={`/api/photo?reference=${place.photos[0].photo_reference}`} alt={place.name} fill className="object-cover" />
                  ) : (
                    <div className="h-full flex items-center justify-center"><span className="text-4xl">🍴</span></div>
                  )}
                  {!isFeatured && idx < 3 && (
                    <div className={`absolute top-2 left-2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : 'bg-orange-600'}`}>
                      #{idx + 1}
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{place.name}</h3>
                  {isFeatured && <p className="text-sm text-gray-600 mb-2 italic">{FEATURED_RESTAURANT.description}</p>}
                  
                  <div className="flex items-center gap-3 mb-2">
                    {place.rating && (
                      <>
                        <span className="text-yellow-500">⭐ {place.rating.toFixed(1)}</span>
                        {place.user_ratings_total && <span className="text-gray-500 text-sm">({place.user_ratings_total})</span>}
                      </>
                    )}
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">Score: {score.toFixed(0)}</span>
                  </div>
                  
                  {place.price_level && (
                    <div className="mb-2">{'£'.repeat(place.price_level)}<span className="text-gray-300">{'£'.repeat(4 - place.price_level)}</span></div>
                  )}
                  
                  <p className="text-sm text-gray-600 mb-3">📍 {place.vicinity || place.formatted_address}</p>
                  
                  {place.opening_hours && (
                    <div className="mb-3">
                      {place.opening_hours.open_now ? 
                        <span className="text-green-600 text-sm font-semibold">✅ Open Now</span> : 
                        <span className="text-red-600 text-sm font-semibold">❌ Closed</span>
                      }
                    </div>
                  )}
                  
                  <Link href={`/biz/${place.place_id}`} className={`block text-center py-2 px-4 rounded ${isFeatured ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                    View Details
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
        
        {displayPlaces.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">📊 Statistics</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{displayPlaces.length}</div>
                <div className="text-gray-600">Total</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{displayPlaces.filter(p => p.rating && p.rating >= 4).length}</div>
                <div className="text-gray-600">4★+ Rated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">
                  {(displayPlaces.reduce((s, p) => s + (p.rating || 0), 0) / displayPlaces.length).toFixed(1)}★
                </div>
                <div className="text-gray-600">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {displayPlaces.reduce((s, p) => s + (p.user_ratings_total || 0), 0).toLocaleString()}
                </div>
                <div className="text-gray-600">Total Reviews</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
