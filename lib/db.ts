import { createClient } from '@libsql/client'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export interface Business {
  id: string
  name: string
  slug: string
  category: string
  area: string
  postcode?: string
  address?: string
  lat?: number
  lng?: number
  phone?: string
  website?: string
  description?: string
  opening_hours_json?: string
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
  description?: string
}

export interface Area {
  id: string
  name: string
  slug: string
  description?: string
}

export interface Event {
  id: string
  title: string
  date?: string
  venue?: string
  area?: string
  description?: string
  created_at: string
}

export async function getBusinesses(
  category?: string,
  area?: string,
  limit?: number,
  offset?: number
): Promise<Business[]> {
  let query = 'SELECT * FROM businesses WHERE 1=1'
  const params: any[] = []

  if (category) {
    query += ' AND category = ?'
    params.push(category)
  }

  if (area) {
    query += ' AND area = ?'
    params.push(area)
  }

  query += ' ORDER BY featured DESC, rating DESC, name ASC'

  if (limit) {
    query += ' LIMIT ?'
    params.push(limit)
  }

  if (offset) {
    query += ' OFFSET ?'
    params.push(offset)
  }

  const result = await client.execute({ sql: query, args: params })
  return result.rows.map(row => ({
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    category: row.category as string,
    area: row.area as string,
    postcode: row.postcode as string,
    address: row.address as string,
    lat: row.lat as number,
    lng: row.lng as number,
    phone: row.phone as string,
    website: row.website as string,
    description: row.description as string,
    opening_hours_json: row.opening_hours_json as string,
    rating: row.rating as number,
    review_count: row.review_count as number,
    featured: Boolean(row.featured),
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }))
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  const result = await client.execute({
    sql: 'SELECT * FROM businesses WHERE slug = ?',
    args: [slug],
  })

  if (result.rows.length === 0) return null

  const row = result.rows[0]
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    category: row.category as string,
    area: row.area as string,
    postcode: row.postcode as string,
    address: row.address as string,
    lat: row.lat as number,
    lng: row.lng as number,
    phone: row.phone as string,
    website: row.website as string,
    description: row.description as string,
    opening_hours_json: row.opening_hours_json as string,
    rating: row.rating as number,
    review_count: row.review_count as number,
    featured: Boolean(row.featured),
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }
}

export async function getCategories(): Promise<Category[]> {
  const result = await client.execute({
    sql: 'SELECT * FROM categories ORDER BY name ASC',
    args: [],
  })
  return result.rows.map(row => ({
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    description: row.description as string,
  }))
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const result = await client.execute({
    sql: 'SELECT * FROM categories WHERE slug = ?',
    args: [slug],
  })

  if (result.rows.length === 0) return null

  const row = result.rows[0]
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    description: row.description as string,
  }
}

export async function getAreas(): Promise<Area[]> {
  const result = await client.execute({
    sql: 'SELECT * FROM areas ORDER BY name ASC',
    args: [],
  })
  return result.rows.map(row => ({
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    description: row.description as string,
  }))
}

export async function getAreaBySlug(slug: string): Promise<Area | null> {
  const result = await client.execute({
    sql: 'SELECT * FROM areas WHERE slug = ?',
    args: [slug],
  })

  if (result.rows.length === 0) return null

  const row = result.rows[0]
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    description: row.description as string,
  }
}

export async function getFeaturedBusinesses(limit: number = 6): Promise<Business[]> {
  const result = await client.execute({
    sql: 'SELECT * FROM businesses WHERE featured = true ORDER BY rating DESC, name ASC LIMIT ?',
    args: [limit],
  })

  return result.rows.map(row => ({
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    category: row.category as string,
    area: row.area as string,
    postcode: row.postcode as string,
    address: row.address as string,
    lat: row.lat as number,
    lng: row.lng as number,
    phone: row.phone as string,
    website: row.website as string,
    description: row.description as string,
    opening_hours_json: row.opening_hours_json as string,
    rating: row.rating as number,
    review_count: row.review_count as number,
    featured: Boolean(row.featured),
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }))
}

export default client