import { getCategories } from '@/lib/db'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Categories | Waterlooville Directory',
  description: 'Browse all business categories available in Waterlooville and surrounding areas. Find the services you need.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Categories' }
      ]} />

      <div className="max-w-4xl mx-auto">
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
      </div>
    </>
  )
}

