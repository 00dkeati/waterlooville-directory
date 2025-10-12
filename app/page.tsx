export const dynamic = 'force-dynamic'
import { getFeaturedBusinesses, getCategories, getAreas } from '@/lib/db'
import Link from 'next/link'
import BusinessCard from '@/components/BusinessCard'
import WaterloovilleNews from '@/components/WaterloovilleNews'

export default async function HomePage() {
  const [featuredBusinesses, categories, areas] = await Promise.all([
    getFeaturedBusinesses(1, 'waterlooville'), // Only show 1 Waterlooville business
    getCategories(),
    getAreas()
  ])

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Waterlooville Directory
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Discover the best local businesses in Waterlooville and surrounding areas
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/categories" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse Categories
          </Link>
          <Link 
            href="/areas" 
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Browse Areas
          </Link>
        </div>
      </section>

      {/* News and Featured Business Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Featured Business */}
        <div className="lg:col-span-2">
          {featuredBusinesses.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">⭐ Featured Waterlooville Business</h2>
              <div className="max-w-2xl">
                {featuredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* News Sidebar */}
        <div className="lg:col-span-1">
          <WaterloovilleNews />
        </div>
      </div>

      {/* Categories Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                in Waterlooville
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Areas Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Area</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {areas.map((area) => (
            <Link
              key={area.id}
              href={`/area/${area.slug}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {area.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Local Businesses
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Waterlooville Guides */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Waterlooville Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { slug: 'waterlooville-shops', title: 'Shopping Guide', icon: '🛍️', desc: 'Sainsburys, ASDA, Retail Park & more' },
            { slug: 'waterlooville-restaurants', title: 'Restaurants & Food', icon: '🍽️', desc: 'Dining, takeaways & cafes' },
            { slug: 'waterlooville-services', title: 'Local Services', icon: '⚙️', desc: 'Tradesmen & professionals' },
            { slug: 'waterlooville-healthcare', title: 'Healthcare', icon: '🏥', desc: 'Doctors, dentists & medical' },
            { slug: 'waterlooville-jobs', title: 'Jobs & Careers', icon: '💼', desc: 'Employment opportunities' },
            { slug: 'waterlooville-property', title: 'Property & Housing', icon: '🏠', desc: 'Houses for sale & estate agents' },
            { slug: 'waterlooville-leisure', title: 'Leisure & Sports', icon: '🎯', desc: 'Gyms, pools & clubs' },
            { slug: 'waterlooville-community', title: 'Community', icon: '👥', desc: 'Schools, churches & services' },
            { slug: 'waterlooville-information', title: 'Local Info', icon: '📍', desc: 'Weather, news & map' },
          ].map((guide) => (
            <Link
              key={guide.slug}
              href={`/w/${guide.slug}`}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className="text-4xl mb-3">{guide.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {guide.title}
              </h3>
              <p className="text-sm text-gray-600">
                {guide.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Local Insights */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Waterlooville</h2>
        <p className="text-gray-700 leading-relaxed">
          Waterlooville is a vibrant town in Hampshire, England, known for its strong community spirit and excellent local businesses. 
          Whether you're looking for professional services like plumbers and electricians, or want to enjoy great food and drink at local cafes and restaurants, 
          our directory helps you find exactly what you need. From the historic center to surrounding areas like Cowplain, Denmead, and Purbrook, 
          discover the best that Waterlooville has to offer.
        </p>
      </section>
    </div>
  )
}

