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
  google_place_id?: string
  images?: string[]
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

// Cache for data
let businessesCache: Business[] | null = null
let categoriesCache: Category[] | null = null
let areasCache: Area[] | null = null

// Helper to load JSON data
async function loadData() {
  if (!businessesCache) {
    const businesses = await import('@/public/data/businesses.json')
    businessesCache = businesses.default
  }
  if (!categoriesCache) {
    const categories = await import('@/public/data/categories.json')
    categoriesCache = categories.default
  }
  if (!areasCache) {
    const areas = await import('@/public/data/areas.json')
    areasCache = areas.default
  }
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  await loadData()
  return businessesCache!.find(b => b.slug === slug) || null
}

export async function getBusinessesByCategory(category: string, limit?: number): Promise<Business[]> {
  await loadData()
  let filtered = businessesCache!.filter(b => b.category === category)
  
  if (limit) {
    filtered = filtered.slice(0, limit)
  }
  
  return filtered
}

export async function getBusinessesByCategoryAndArea(category: string, area: string, limit?: number): Promise<Business[]> {
  await loadData()
  let filtered = businessesCache!.filter(b => b.category === category && b.area === area)
  
  if (limit) {
    filtered = filtered.slice(0, limit)
  }
  
  return filtered
}

export async function getBusinessesByArea(area: string, limit?: number): Promise<Business[]> {
  await loadData()
  let filtered = businessesCache!.filter(b => b.area === area)
  
  if (limit) {
    filtered = filtered.slice(0, limit)
  }
  
  return filtered
}

export async function searchBusinesses(query: string): Promise<Business[]> {
  await loadData()
  const lowerQuery = query.toLowerCase()
  
  return businessesCache!.filter(b => 
    b.name.toLowerCase().includes(lowerQuery) ||
    b.description.toLowerCase().includes(lowerQuery) ||
    b.category.toLowerCase().includes(lowerQuery) ||
    b.area.toLowerCase().includes(lowerQuery)
  )
}

export async function getCategories(): Promise<Category[]> {
  await loadData()
  return categoriesCache!
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await loadData()
  return categoriesCache!.find(c => c.slug === slug) || null
}

export async function getAreas(): Promise<Area[]> {
  await loadData()
  return areasCache!
}

export async function getAreaBySlug(slug: string): Promise<Area | null> {
  await loadData()
  return areasCache!.find(a => a.slug === slug) || null
}

export async function getFeaturedBusinesses(limit: number = 6): Promise<Business[]> {
  await loadData()
  return businessesCache!
    .filter(b => b.featured)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

export async function getBusinesses(categoryOrLimit?: string | number, area?: string): Promise<Business[]> {
  await loadData()
  let businesses = businessesCache!
  
  // If first arg is a string, it's a category filter
  if (typeof categoryOrLimit === 'string') {
    businesses = businesses.filter(b => b.category === categoryOrLimit)
    
    // If area is provided, filter by area too
    if (area) {
      businesses = businesses.filter(b => b.area === area)
    }
  } 
  // If first arg is a number, it's a limit
  else if (typeof categoryOrLimit === 'number') {
    businesses = businesses.slice(0, categoryOrLimit)
  }
  
  return businesses
}
