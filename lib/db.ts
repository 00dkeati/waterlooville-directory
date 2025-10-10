import fs from 'fs'
import path from 'path'

export interface Business {
  id: string
  name: string
  slug: string
  category: string
  area: string
  postcode: string
  address: string
  lat: number
  lng: number
  phone: string
  website: string
  description: string
  opening_hours_json: string
  rating: number
  review_count: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
}

export interface Area {
  id: string
  name: string
  slug: string
  description: string
}

// Helper function to read JSON files
function readJsonFile<T>(filename: string): T[] {
  const filePath = path.join(process.cwd(), 'public', 'data', filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  const businesses = readJsonFile<Business>('businesses.json')
  return businesses.find(b => b.slug === slug) || null
}

export async function getBusinessesByCategory(category: string, limit?: number): Promise<Business[]> {
  const businesses = readJsonFile<Business>('businesses.json')
  let filtered = businesses.filter(b => b.category === category)
  
  if (limit) {
    filtered = filtered.slice(0, limit)
  }
  
  return filtered
}

export async function getBusinessesByCategoryAndArea(category: string, area: string, limit?: number): Promise<Business[]> {
  const businesses = readJsonFile<Business>('businesses.json')
  let filtered = businesses.filter(b => b.category === category && b.area === area)
  
  if (limit) {
    filtered = filtered.slice(0, limit)
  }
  
  return filtered
}

export async function getBusinessesByArea(area: string, limit?: number): Promise<Business[]> {
  const businesses = readJsonFile<Business>('businesses.json')
  let filtered = businesses.filter(b => b.area === area)
  
  if (limit) {
    filtered = filtered.slice(0, limit)
  }
  
  return filtered
}

export async function searchBusinesses(query: string): Promise<Business[]> {
  const businesses = readJsonFile<Business>('businesses.json')
  const lowerQuery = query.toLowerCase()
  
  return businesses.filter(b => 
    b.name.toLowerCase().includes(lowerQuery) ||
    b.description.toLowerCase().includes(lowerQuery) ||
    b.category.toLowerCase().includes(lowerQuery) ||
    b.area.toLowerCase().includes(lowerQuery)
  )
}

export async function getCategories(): Promise<Category[]> {
  return readJsonFile<Category>('categories.json')
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = readJsonFile<Category>('categories.json')
  return categories.find(c => c.slug === slug) || null
}

export async function getAreas(): Promise<Area[]> {
  return readJsonFile<Area>('areas.json')
}

export async function getAreaBySlug(slug: string): Promise<Area | null> {
  const areas = readJsonFile<Area>('areas.json')
  return areas.find(a => a.slug === slug) || null
}

export async function getFeaturedBusinesses(limit: number = 6): Promise<Business[]> {
  const businesses = readJsonFile<Business>('businesses.json')
  return businesses
    .filter(b => b.featured)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

export async function getBusinesses(limit?: number): Promise<Business[]> {
  await loadData()
  let businesses = businessesCache!
  
  if (limit) {
    businesses = businesses.slice(0, limit)
  }
  
  return businesses
}
