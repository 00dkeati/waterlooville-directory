import { notFound } from 'next/navigation'
import { getAreaBySlug, getBusinesses, getCategories, getAreas, getFeaturedBusinesses } from '@/lib/db'
import Breadcrumbs from '@/components/Breadcrumbs'
import BusinessCard from '@/components/BusinessCard'
import RelatedLinks from '@/components/RelatedLinks'
import FAQ from '@/components/FAQ'
import { Metadata } from 'next'

interface AreaPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const area = await getAreaBySlug(params.slug)
  
  if (!area) {
    return {
      title: 'Area Not Found'
    }
  }

  return {
    title: `Local Businesses in ${area.name} | Waterlooville Directory`,
    description: `Discover the best local businesses in ${area.name}. From restaurants to services, find everything you need in ${area.name}.`,
    openGraph: {
      title: `Local Businesses in ${area.name}`,
      description: `Discover the best local businesses in ${area.name}.`,
    },
  }
}

export default async function AreaPage({ params }: AreaPageProps) {
  const area = await getAreaBySlug(params.slug)
  
  if (!area) {
    notFound()
  }

  const [businesses, categories, allAreas, featuredBusinesses] = await Promise.all([
    getBusinesses(undefined, params.slug),
    getCategories(),
    getAreas(),
    getFeaturedBusinesses(3)
  ])

  // Group businesses by category
  const businessesByCategory = businesses.reduce((acc, business) => {
    if (!acc[business.category]) {
      acc[business.category] = []
    }
    acc[business.category].push(business)
    return acc
  }, {} as Record<string, typeof businesses>)

  // Generate FAQ content
  const faqs = [
    {
      question: `What businesses are available in ${area.name}?`,
      answer: `${area.name} has a diverse range of local businesses including restaurants, professional services, retail shops, and more. Our directory helps you find the best options for your needs.`
    },
    {
      question: `How do I find specific services in ${area.name}?`,
      answer: `Use our category filters to browse businesses by type, or search for specific services. Each business listing includes contact information, reviews, and detailed descriptions.`
    },
    {
      question: `Are these businesses verified and reliable?`,
      answer: `Yes, all businesses in our directory are verified local establishments with genuine customer reviews and ratings. We regularly monitor and update our listings to ensure quality.`
    }
  ]

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Local Businesses in ${area.name}`,
    "description": `A comprehensive directory of local businesses in ${area.name}`,
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
        { label: area.name, href: `/area/${area.slug}` }
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Local Businesses in {area.name}
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              {area.description || `Discover the best local businesses serving ${area.name} and surrounding areas. From professional services to dining and entertainment, find everything you need in our comprehensive directory.`}
            </p>
            <div className="mt-4 text-sm text-gray-600">
              {businesses.length} businesses found • Last updated: {new Date().toLocaleDateString('en-GB')}
            </div>
          </header>

          {businesses.length > 0 ? (
            <div className="space-y-8">
              {Object.entries(businessesByCategory).map(([categorySlug, categoryBusinesses]) => {
                const category = categories.find(c => c.slug === categorySlug)
                return (
                  <section key={categorySlug} className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        {category?.name || categorySlug}
                      </h2>
                      <a 
                        href={`/${categorySlug}/${params.slug}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View All ({categoryBusinesses.length}) →
                      </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {categoryBusinesses.slice(0, 4).map((business) => (
                        <BusinessCard key={business.id} business={business} />
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No businesses found in {area.name}
              </h2>
              <p className="text-gray-600">
                We're working on adding more businesses to this area. Check back soon!
              </p>
            </div>
          )}

          {/* Local Insights */}
          <section className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">About {area.name}</h3>
            <p className="text-gray-700 leading-relaxed">
              {area.description || `${area.name} is a vibrant community with a diverse range of local businesses serving residents and visitors. The area benefits from experienced professionals and established businesses that understand the local market and provide personalized service.`}
            </p>
          </section>

          <FAQ faqs={faqs} />
        </div>

        <div className="lg:col-span-1">
          <RelatedLinks
            currentArea={area.slug}
            categories={categories}
            areas={allAreas}
            featuredBusinesses={featuredBusinesses}
          />
        </div>
      </div>
    </>
  )
}

