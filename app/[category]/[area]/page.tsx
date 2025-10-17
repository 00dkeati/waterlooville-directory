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
    title: `Best ${category.name} in ${area.name} | ${area.name} ${category.name} Directory`,
    description: `Find the best ${category.name.toLowerCase()} in ${area.name}. Professional services, reviews, and contact information for local ${category.name.toLowerCase()} serving ${area.name} and surrounding areas.`,
    openGraph: {
      title: `Best ${category.name} in ${area.name} | ${area.name} Directory`,
      description: `Find the best ${category.name.toLowerCase()} in ${area.name}. Professional services and reviews.`,
    },
  }
}

export default async function CategoryAreaPage({ params }: CategoryAreaPageProps) {
  // Exclude 'seo' from being treated as a category to avoid routing conflicts
  if (params.category === 'seo') {
    notFound()
  }
  
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
      answer: `Our directory features top-rated ${category.name.toLowerCase()} specifically serving ${area.name} and surrounding areas. Each business has been carefully selected based on customer reviews, local reputation, and service quality. We regularly update our listings to ensure you have access to the most current and reliable information.`
    },
    {
      question: `How do I contact a ${category.name.toLowerCase()} in ${area.name}?`,
      answer: `Each business listing includes comprehensive contact information including phone numbers, websites, and addresses. You can click on any business card to view full details and contact information. Many businesses also offer online booking systems for your convenience.`
    },
    {
      question: `Are these ${category.name.toLowerCase()} reliable and trustworthy?`,
      answer: `Yes, all businesses in our directory are verified local establishments with genuine customer reviews and ratings from multiple platforms including Google Reviews and Trustpilot. We regularly monitor and update our listings to ensure quality and reliability.`
    },
    {
      question: `Do these ${category.name.toLowerCase()} serve the entire ${area.name} area?`,
      answer: `Most of the ${category.name.toLowerCase()} listed here serve ${area.name} and surrounding areas. Contact details are provided so you can confirm service coverage for your specific location before booking or making an appointment.`
    },
    {
      question: `What should I look for when choosing a ${category.name.toLowerCase()} in ${area.name}?`,
      answer: `Consider factors like customer reviews, years of experience, service range, pricing transparency, and availability. Our directory provides detailed information to help you make an informed decision. Reading recent customer reviews can give you valuable insights into the quality of service.`
    },
    {
      question: `How often is the ${category.name} directory for ${area.name} updated?`,
      answer: `We regularly update our directory to ensure accuracy and include new businesses. Customer reviews and ratings are refreshed frequently, and we remove businesses that no longer meet our quality standards.`
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About {category.name} in {area.name}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {area.description || `${area.name} is a vibrant area with a strong community of ${category.name.toLowerCase()}, serving local residents and businesses. The area benefits from experienced professionals who understand the local market and provide personalized service to their customers.`}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our directory features carefully selected {category.name.toLowerCase()} in {area.name} that have been chosen based on their reputation, customer reviews, and commitment to quality service. Each business listed here has demonstrated excellence in their field and maintains high standards of customer satisfaction.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Whether you're a resident of {area.name} looking for reliable local services, or someone visiting the area in need of professional assistance, our comprehensive listings provide all the information you need to make informed decisions about which {category.name.toLowerCase()} to choose.
                </p>
              </section>

              {/* Service Quality Section */}
              <section className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What Makes These {category.name} Special?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Local Expertise</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Each {category.name.toLowerCase()} in {area.name} has deep knowledge of the local area, understanding the specific needs and preferences of residents in this community.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Proven Track Record</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      All listed businesses have established reputations with positive customer reviews and ratings from multiple platforms, ensuring quality and reliability.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Community Focus</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      These {category.name.toLowerCase()} are committed to serving the {area.name} community with personalized attention and local understanding.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Easy Contact</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      All businesses provide clear contact information, making it easy to reach out for quotes, consultations, or to book services.
                    </p>
                  </div>
                </div>
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

