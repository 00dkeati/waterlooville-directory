import { MetadataRoute } from 'next'
import { getCategories, getAreas, getBusinesses } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://waterloovilledirectory.co.uk'
  
  // Get all data from database
  const [categories, areas, allBusinesses] = await Promise.all([
    getCategories(),
    getAreas(),
    getBusinesses() // Get all businesses
  ])

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ]

  // Add category pages
  for (const category of categories) {
    sitemap.push({
      url: `${baseUrl}/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })

    // Add category + area pages
    for (const area of areas) {
      sitemap.push({
        url: `${baseUrl}/${category.slug}/${area.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  // Add area pages
  for (const area of areas) {
    sitemap.push({
      url: `${baseUrl}/area/${area.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }

  // Add individual business pages
  for (const business of allBusinesses) {
    sitemap.push({
      url: `${baseUrl}/biz/${business.slug}`,
      lastModified: new Date(business.updated_at),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return sitemap
}

