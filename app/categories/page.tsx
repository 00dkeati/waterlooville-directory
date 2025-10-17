export const dynamic = 'force-dynamic'
import { getCategories } from '@/lib/db'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import TopNav from "@/app/(site)/components/TopNav"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Categories | Waterlooville Directory',
  description: 'Browse all business categories available in Waterlooville and surrounding areas. Find the services you need.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <>
      <TopNav />
      <Breadcrumbs items={[
        { label: 'Categories' }
      ]} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Business Categories
          </h1>
          <p className="text-xl text-gray-700">
            Explore all the different types of businesses available in Waterlooville and surrounding areas
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {category.description || `Find the best ${category.name.toLowerCase()} in Waterlooville and surrounding areas.`}
              </p>
              <div className="text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
                Browse {category.name} →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">About Our Business Categories</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our directory organizes local businesses into clear categories to make it easy for you to find exactly what you need. Each category includes carefully selected businesses that have been chosen for their quality, reliability, and commitment to excellent customer service.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            From essential services like plumbers and electricians to leisure activities like restaurants and gyms, we cover all the businesses that make Waterlooville and surrounding areas great places to live and work. Our categories are designed to match the way people actually search for local services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Each business listing includes detailed information including contact details, customer reviews, ratings, and service descriptions to help you make informed decisions about which businesses to choose.
          </p>
        </div>

        <div className="mt-8 bg-white border border-gray-200 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">How We Choose Our Businesses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Quality Standards</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                We only include businesses that meet high standards of service quality and customer satisfaction.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Customer Reviews</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Businesses must have positive customer reviews and ratings from multiple platforms to be included.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Local Presence</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                All businesses must have a genuine local presence and serve the Waterlooville area effectively.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Regular Updates</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                We regularly review and update our listings to ensure they remain current and accurate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

