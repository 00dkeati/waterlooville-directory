import { notFound } from 'next/navigation'
import { getCategoryBySlug, getAreaBySlug, getBusinesses, getCategories, getAreas, getFeaturedBusinesses } from '@/lib/db'
import Breadcrumbs from '@/components/Breadcrumbs'
import BusinessCard from '@/components/BusinessCard'
import RelatedLinks from '@/components/RelatedLinks'
import FAQ from '@/components/FAQ'
import { Metadata } from 'next'

interface CategoryAreaPageProps {
  params: {
    category: string
    area: string
  }
}

export async function generateMetadata({ params }: CategoryAreaPageProps): Promise<Metadata> {
  const [category, area] = await Promise.all([
    getCategoryBySlug(params.category),
    getAreaBySlug(params.area)
  ])
  
  if (!category || !area) {
    return {
      title: 'Page Not Found'
    }
  }

  return {
    title: `Best ${category.name} in ${area.name} | Waterlooville Directory`,
    description: `Find the best ${category.name.toLowerCase()} in ${area.name}. Professional services, reviews, and contact information for local ${category.name.toLowerCase()}.`,
    openGraph: {
      title: `Best ${category.name} in ${area.name}`,
      description: `Find the best ${category.name.toLowerCase()} in ${area.name}.`,
    },
  }
}

export default async function CategoryAreaPage({ params }: CategoryAreaPageProps) {
  const [category, area] = await Promise.all([
    getCategoryBySlug(params.category),
    getAreaBySlug(params.area)
  ])
  
  if (!category || !area) {
    notFound()
  }

  const [businesses, allCategories, allAreas, featuredBusinesses] = await Promise.all([
    getBusinesses(params.category, params.area),
    getCategories(),
    getAreas(),
    getFeaturedBusinesses(3)
  ])

  // Generate FAQ content
  const faqs = [
    {
      question: `What are the best ${category.name.toLowerCase()} in ${area.name}?`,
      answer: `Our directory features top-rated ${category.name.toLowerCase()} specifically serving ${area.name} and surrounding areas. Each business has been carefully selected based on customer reviews, local reputation, and service quality.`
    },
    {
      question: `How do I contact a ${category.name.toLowerCase()} in ${area.name}?`,
      answer: `Each business listing includes contact information including phone numbers, websites, and addresses. You can click on any business card to view full details and contact information.`
    },
    {
      question: `Are these ${category.name.toLowerCase()} reliable and trustworthy?`,
      answer: `Yes, all businesses in our directory are verified local establishments with genuine customer reviews and ratings. We regularly monitor and update our listings to ensure quality and reliability.`
    }
  ]

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Best ${category.name} in ${area.name}`,
    "description": `A curated list of the best ${category.name.toLowerCase()} in ${area.name}`,
    "numberOfItems": businesses.length,
    "itemListElement": businesses.map((business, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": business.name,
        "url": `https://waterloovilledirectory.co.uk/biz/${business.slug}`,
        "telephone": business.phone,
        "address": business.address,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": business.rating,
          "reviewCount": business.review_count
        }
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Breadcrumbs items={[
        { label: category.name, href: `/${category.slug}` },
        { label: area.name, href: `/${category.slug}/${area.slug}` }
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Best {category.name} in {area.name}
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              {category.description || `Discover the finest ${category.name.toLowerCase()} serving ${area.name} and surrounding areas. Our carefully curated directory features top-rated professionals who deliver exceptional service and quality results.`}
            </p>
            <div className="mt-4 text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-GB')}
            </div>
          </header>

          {businesses.length > 0 ? (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Top {businesses.length} {category.name} in {area.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {businesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </section>

              {/* Local Insights */}
              <section className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About {area.name}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {area.description || `${area.name} is a vibrant area with a strong community of ${category.name.toLowerCase()}, serving local residents and businesses. The area benefits from experienced professionals who understand the local market and provide personalized service to their customers.`}
                </p>
              </section>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No {category.name.toLowerCase()} found in {area.name}
              </h2>
              <p className="text-gray-600 mb-4">
                We're working on adding more businesses to this area. 
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Try browsing:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <a href={`/${category.slug}`} className="text-blue-600 hover:text-blue-800 text-sm">
                    All {category.name} in Waterlooville
                  </a>
                  <span className="text-gray-400">•</span>
                  <a href={`/area/${area.slug}`} className="text-blue-600 hover:text-blue-800 text-sm">
                    All businesses in {area.name}
                  </a>
                </div>
              </div>
            </div>
          )}

          <FAQ faqs={faqs} />
        </div>

        <div className="lg:col-span-1">
          <RelatedLinks
            currentCategory={category.slug}
            currentArea={area.slug}
            categories={allCategories}
            areas={allAreas}
            featuredBusinesses={featuredBusinesses}
          />
        </div>
      </div>
    </>
  )
}

