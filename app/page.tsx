// Enable static generation for better performance
export const revalidate = 3600 // Revalidate every hour
import { Metadata } from 'next'
import { getFeaturedBusinesses, getCategories, getAreas } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import BusinessCard from '@/components/BusinessCard'
import EditorialFeed from '@/components/EditorialFeed'
import WaterloovilleSchema from '@/components/WaterloovilleSchema'

export const metadata: Metadata = {
  title: 'Waterlooville News & Community - Your Local Source for Hampshire',
  description: 'Stay informed with Waterlooville\'s leading news source. Local stories, business insights, community updates, and comprehensive business directory for Hampshire.',
  keywords: 'Waterlooville news, Waterlooville Hampshire, local news Waterlooville, Waterlooville community, Waterlooville businesses, Hampshire news',
  openGraph: {
    title: 'Waterlooville News & Community - Your Local Source for Hampshire',
    description: 'Stay informed with Waterlooville\'s leading news source. Local stories, business insights, and community updates.',
    url: 'https://waterlooville.co',
    siteName: 'Waterlooville.co',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: 'https://waterlooville.co',
  },
}

export default async function HomePage() {
  // Load only essential data for homepage
  const [featuredBusinesses, categories] = await Promise.all([
    getFeaturedBusinesses(3, 'waterlooville'), // Show 3 featured businesses
    getCategories()
  ])

  // Limit categories to top 6 for performance
  const topCategories = categories.slice(0, 6)

  return (
    <div>
      <WaterloovilleSchema />
      
      {/* Breaking News Banner */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-medium">
        🔴 BREAKING: New Business Directory Launch - Discover 500+ Local Services
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                Waterlooville.co
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Your Local News & Community Hub
              </p>
            </div>
            <div className="flex gap-4">
              <Link 
                href="/editorial" 
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Latest News
              </Link>
              <Link 
                href="/search" 
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Search Directory
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Story Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=400&fit=crop"
                      alt="Waterlooville Carpenter Guide"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        FEATURED STORY
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-3">Home & Garden</span>
                    <span>January 27, 2025</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    The Ultimate Waterlooville Carpenter Guide: Who to Trust With Your Home 2025
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    With home improvement projects on the rise and quality tradesmen in high demand, choosing the right carpenter can make or break your renovation. We dive deep into Waterlooville's top carpenters to find out who really delivers.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Sarah Mitchell</p>
                        <p className="text-xs text-gray-500">Local Reporter</p>
                      </div>
                    </div>
                    <Link 
                      href="/editorial/best-carpenters-joiners-waterlooville-2025"
                      className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Read Full Story →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
              <Link 
                href="/editorial" 
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                View All Stories →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* News Story 1 */}
              <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop"
                    alt="Men's Barbers Waterlooville"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-3">Lifestyle</span>
                    <span>January 26, 2025</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    Comparative Report on Men's Barbers in the Waterlooville Area
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Discover the top-rated barbershops in Waterlooville, from Studio H's modern approach to traditional cuts at The Cowplain Barber Shop.
                  </p>
                  <Link 
                    href="/mens-barbers"
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Read More →
                  </Link>
                </div>
              </article>

              {/* News Story 2 */}
              <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop"
                    alt="Dog Walks Waterlooville"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-3">Community</span>
                    <span>January 25, 2025</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    Best Dog Walking Routes Near Waterlooville
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Explore the top dog-friendly walking routes around Waterlooville, from Queen Elizabeth Country Park to local recreation grounds.
                  </p>
                  <Link 
                    href="/seo/dog-walks-near-waterlooville"
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Read More →
                  </Link>
                </div>
              </article>

              {/* News Story 3 */}
              <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
                    alt="Waterlooville Business Directory"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded mr-3">Business</span>
                    <span>January 24, 2025</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    Waterlooville Business Directory: Your Complete Local Guide
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Discover over 500 local businesses in Waterlooville, from restaurants and shops to professional services and tradesmen.
                  </p>
                  <Link 
                    href="/categories"
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Explore Directory →
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Trusted Source for Waterlooville News & Information
            </h2>
            <p className="text-xl text-red-100 mb-8 leading-relaxed">
              Waterlooville.co is Hampshire's leading local news and community platform. We deliver breaking news, 
              investigative reports, and comprehensive business insights to keep you informed about everything happening 
              in and around Waterlooville.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">📰</div>
                <h3 className="text-xl font-bold mb-2">Local News</h3>
                <p className="text-red-100">Breaking stories, community updates, and investigative journalism</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-xl font-bold mb-2">Business Directory</h3>
                <p className="text-red-100">500+ verified local businesses with reviews and ratings</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-bold mb-2">Community Hub</h3>
                <p className="text-red-100">Connect with your neighbors and local organizations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Directory Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Find Local Businesses
              </h2>
              <p className="text-xl text-gray-600">
                Discover trusted services and businesses in Waterlooville
              </p>
            </div>

            {/* Featured Businesses */}
            {featuredBusinesses.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Businesses</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </div>
            )}

            {/* Categories Grid */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {topCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/${category.slug}`}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
                  >
                    <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">
                      in Waterlooville
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Areas Grid */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Browse by Area</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { name: 'Waterlooville', slug: 'waterlooville' },
                  { name: 'Cowplain', slug: 'cowplain' },
                  { name: 'Denmead', slug: 'denmead' },
                  { name: 'Purbrook', slug: 'purbrook' },
                  { name: 'Horndean', slug: 'horndean' }
                ].map((area) => (
                  <Link
                    key={area.slug}
                    href={`/area/${area.slug}`}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
                  >
                    <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      {area.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Local Businesses
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { slug: 'waterlooville-shops', title: 'Shopping Guide', icon: '🛍️', desc: 'Sainsburys, ASDA, Retail Park' },
                { slug: 'waterlooville-restaurants', title: 'Restaurants & Food', icon: '🍽️', desc: 'Dining, takeaways & cafes' },
                { slug: 'waterlooville-services', title: 'Local Services', icon: '⚙️', desc: 'Tradesmen & professionals' },
                { slug: 'waterlooville-healthcare', title: 'Healthcare', icon: '🏥', desc: 'Doctors, dentists & medical' }
              ].map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/w/${guide.slug}`}
                  className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <div className="text-3xl mb-3">{guide.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {guide.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

