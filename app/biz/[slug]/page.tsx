import { notFound } from 'next/navigation'
import { getBusinessBySlug, getCategoryBySlug, getAreaBySlug, getFeaturedBusinesses } from '@/lib/db'
import Breadcrumbs from '@/components/Breadcrumbs'
import RelatedLinks from '@/components/RelatedLinks'
import FAQ from '@/components/FAQ'
import BusinessMap from '@/components/BusinessMap'
import BusinessGallery from '@/components/BusinessGallery'
import { Metadata } from 'next'

interface BusinessPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const business = await getBusinessBySlug(params.slug)
  
  if (!business) {
    return {
      title: 'Business Not Found'
    }
  }

  const [category, area] = await Promise.all([
    getCategoryBySlug(business.category),
    getAreaBySlug(business.area)
  ])

  const title = `${business.name} - ${category?.name || business.category} in ${area?.name || business.area}`
  const description = business.description || `${business.name} is a professional ${business.category} service in ${business.area}. Contact us for quality service and expert advice.`

  return {
    title: `${title} | Waterlooville Directory`,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const business = await getBusinessBySlug(params.slug)
  
  if (!business) {
    notFound()
  }

  const [category, area, featuredBusinesses] = await Promise.all([
    getCategoryBySlug(business.category),
    getAreaBySlug(business.area),
    getFeaturedBusinesses(3)
  ])

  const formatRating = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))
  }

  // Generate FAQ content
  const faqs = [
    {
      question: `What services does ${business.name} offer?`,
      answer: business.description || `${business.name} provides professional ${business.category} services in ${business.area}. Contact them directly for specific service details and pricing.`
    },
    {
      question: `How can I contact ${business.name}?`,
      answer: business.phone ? `You can reach ${business.name} by phone at ${business.phone}. ${business.website ? `You can also visit their website at ${business.website}.` : ''}` : `Contact information for ${business.name} is available in their listing.`
    },
    {
      question: `Where is ${business.name} located?`,
      answer: business.address ? `${business.name} is located at ${business.address}, ${business.area}.` : `${business.name} serves the ${business.area} area.`
    }
  ]

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "description": business.description,
    "url": `https://waterloovilledirectory.co.uk/biz/${business.slug}`,
    "telephone": business.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address,
      "addressLocality": business.area,
      "postalCode": business.postcode,
      "addressCountry": "GB"
    },
    "geo": business.lat && business.lng ? {
      "@type": "GeoCoordinates",
      "latitude": business.lat,
      "longitude": business.lng
    } : undefined,
    "aggregateRating": business.rating > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": business.rating,
      "reviewCount": business.review_count
    } : undefined,
    "openingHours": business.opening_hours_json ? JSON.parse(business.opening_hours_json) : undefined
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Breadcrumbs items={[
        { label: category?.name || business.category, href: `/${business.category}` },
        { label: area?.name || business.area, href: `/${business.category}/${business.area}` },
        { label: business.name }
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <header className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {business.name}
                </h1>
                <p className="text-xl text-gray-600">
                  {category?.name || business.category} in {area?.name || business.area}
                </p>
              </div>
              {business.featured && (
                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                  Featured Business
                </span>
              )}
            </div>

            <div className="flex items-center mb-4">
              <span className="text-yellow-400 text-lg mr-2">
                {formatRating(business.rating)}
              </span>
              <span className="text-gray-700">
                {business.rating.toFixed(1)} ({business.review_count} reviews)
              </span>
            </div>

            {business.description && (
              <p className="text-lg text-gray-700 leading-relaxed">
                {business.description}
              </p>
            )}
          </header>

          {/* Business Images */}
          {business.images && business.images.length > 0 && (
            <BusinessGallery 
              businessName={business.name}
              images={business.images}
            />
          )}

          {/* Contact Information */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {business.address && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-700">
                    {business.address}
                    {business.postcode && <><br />{business.postcode}</>}
                  </p>
                </div>
              )}
              
              {business.phone && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                  <a 
                    href={`tel:${business.phone}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {business.phone}
                  </a>
                </div>
              )}
              
              {business.website && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Website</h3>
                  <a 
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Visit Website →
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Map Section */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Location</h2>
            <BusinessMap 
              businesses={[business]} 
              center={business.lat && business.lng ? { lat: business.lat, lng: business.lng } : undefined}
              zoom={15}
            />
          </section>

          {/* Opening Hours */}
          {business.opening_hours_json && (
            <section className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Opening Hours</h2>
              <div className="text-gray-700">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(JSON.parse(business.opening_hours_json), null, 2)}
                </pre>
              </div>
            </section>
          )}

          <FAQ faqs={faqs} />
        </div>

        <div className="lg:col-span-1">
          <RelatedLinks
            currentCategory={business.category}
            currentArea={business.area}
            featuredBusinesses={featuredBusinesses}
          />
        </div>
      </div>
    </>
  )
}

