import { MetadataRoute } from 'next'
import { getCategories, getAreas, getBusinesses } from '@/lib/db'
import seoPages from '@/data/seo-pages.json'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://waterlooville.co'
  
  // Get all data from database
  const [categories, areas, allBusinesses] = await Promise.all([
    getCategories(),
    getAreas(),
    getBusinesses() // Get all businesses
  ])

  const sitemap: MetadataRoute.Sitemap = [
    // Main pages
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
      priority: 0.9,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/editorial`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
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

  // Add programmatic SEO pages
  for (const seoPage of seoPages) {
    sitemap.push({
      url: `${baseUrl}/w/${seoPage.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // High priority for SEO pages
    })
  }

  // Add editorial articles
  try {
    const editorialData = await import('@/data/editorial-articles.json')
    const editorialArticles = editorialData.default as Array<{ slug: string; publishedAt: string }>
    
    for (const article of editorialArticles) {
      sitemap.push({
        url: `${baseUrl}/editorial/${article.slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  } catch (error) {
    console.error('Error loading editorial articles for sitemap:', error)
  }

  // Add blog articles
  try {
    // For sitemap generation, we'll add a placeholder blog entry
    // Individual blog articles will be added dynamically when they exist
    sitemap.push({
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  } catch (error) {
    console.error('Error adding blog to sitemap:', error)
  }

  return sitemap
}

