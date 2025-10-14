export const dynamic = 'force-dynamic'
import { Metadata } from 'next'
import { getFeaturedBusinesses, getCategories, getAreas } from '@/lib/db'
import Link from 'next/link'
import BusinessCard from '@/components/BusinessCard'
import EditorialFeed from '@/components/EditorialFeed'
import WaterloovilleSchema from '@/components/WaterloovilleSchema'

export const metadata: Metadata = {
  title: 'Waterlooville - Local News, Business Directory & Community Guide',
  description: 'Your complete guide to Waterlooville, Hampshire. Local news, business directory, shops, restaurants, services, and community information for Waterlooville PO7 and PO8 areas.',
  keywords: 'Waterlooville, Waterlooville Hampshire, Waterlooville directory, Waterlooville news, Waterlooville businesses, Waterlooville shops, Waterlooville PO7, Waterlooville PO8, Waterlooville postcode, Waterlooville map, Waterlooville weather, Waterlooville guide',
  openGraph: {
    title: 'Waterlooville - Local News, Business Directory & Community Guide',
    description: 'Your complete guide to Waterlooville, Hampshire. Local news, business directory, and community information.',
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
  const [featuredBusinesses, categories, areas] = await Promise.all([
    getFeaturedBusinesses(1, 'waterlooville'), // Only show 1 Waterlooville business
    getCategories(),
    getAreas()
  ])

  return (
    <div>
      <WaterloovilleSchema />
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Waterlooville.co
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-red-100">
          Local News • Business Directory • Community Guide
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/editorial" 
            className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Read Latest News
          </Link>
          <Link 
            href="/categories" 
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
          >
            Browse Business Directory
          </Link>
        </div>
      </section>

      {/* News and Featured Business Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Featured Business */}
        <div className="lg:col-span-2">
          {featuredBusinesses.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">📰 Featured Business</h2>
              <div className="max-w-2xl">
                {featuredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Editorial Sidebar */}
        <div className="lg:col-span-1">
          <EditorialFeed />
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

      {/* About Waterlooville - Comprehensive Guide */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Waterlooville</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">About Waterlooville, Hampshire</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Waterlooville</strong> is a thriving market town located in Hampshire, England, approximately 8 miles north of Portsmouth. 
              With a population of over 60,000 residents, Waterlooville serves as a major commercial and residential hub for the surrounding areas 
              including Cowplain, Denmead, Purbrook, and Havant.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The town of Waterlooville is well-known for its strong community spirit, excellent local businesses, and convenient location. 
              Waterlooville's town centre (PO7 3DU) features a mix of independent shops, cafes, and major retailers including Sainsbury's, 
              Argos, and Marks & Spencer, while the Wellington Retail Park offers additional shopping opportunities with stores like ASDA, 
              Waitrose, and Matalan.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Waterlooville is served by the PO7 and PO8 postcode areas and benefits from excellent transport links via the A3(M) motorway, 
              making it easily accessible from Portsmouth, Southampton, and London. The area is also well-served by regular bus services 
              connecting Waterlooville to surrounding towns and cities.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What Makes Waterlooville Special</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span><strong>Excellent Shopping:</strong> Waterlooville offers diverse shopping from town centre boutiques to major retail parks</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span><strong>Dining Scene:</strong> Waterlooville boasts numerous restaurants, cafes, pubs, and takeaways serving diverse cuisines</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span><strong>Local Services:</strong> Comprehensive range of professional services from plumbers to estate agents in Waterlooville</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span><strong>Healthcare:</strong> Waterlooville has excellent healthcare facilities including doctors, dentists, and vets</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span><strong>Education:</strong> Waterlooville offers quality schools and nurseries for families</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span><strong>Community:</strong> Strong community with local events, groups, and facilities in Waterlooville</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Local Insights */}
      <section className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">About Waterlooville.co</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Discover Local Excellence</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Waterlooville.co is your comprehensive guide to everything Waterlooville has to offer. We provide local news, 
              a complete business directory, and community information to help you make the most of living in or visiting Waterlooville.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're looking for professional services like plumbers and electricians in Waterlooville, or want to enjoy 
              great food and drink at local cafes and restaurants, our directory helps you find exactly what you need with detailed 
              reviews, contact information, and location details for businesses throughout Waterlooville.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Covering All Areas</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              From the historic Waterlooville town centre (PO7 3DU) to surrounding areas like Cowplain, Denmead, and Purbrook, 
              our directory covers all the key locations where local businesses serve the Waterlooville community.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Each business listing includes verified contact details, customer reviews, ratings, and comprehensive information 
              to help you make informed decisions about local services and establishments in Waterlooville.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Waterlooville.co?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <h4 className="font-semibold text-gray-900 mb-2">Verified Reviews</h4>
              <p className="text-sm text-gray-600">Real customer feedback from multiple platforms including Google Reviews and Trustpilot</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📍</div>
              <h4 className="font-semibold text-gray-900 mb-2">Local Focus</h4>
              <p className="text-sm text-gray-600">Concentrated on Waterlooville and surrounding areas for the most relevant results</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔄</div>
              <h4 className="font-semibold text-gray-900 mb-2">Always Updated</h4>
              <p className="text-sm text-gray-600">Regular updates ensure you get the most current information about Waterlooville businesses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts About Waterlooville */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts About Waterlooville</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-red-600 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">📍 Location</h4>
            <p className="text-gray-700 text-sm">Waterlooville, Hampshire, England</p>
            <p className="text-gray-600 text-sm">8 miles north of Portsmouth</p>
          </div>
          <div className="border-l-4 border-red-600 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">📮 Postcodes</h4>
            <p className="text-gray-700 text-sm">PO7 (Waterlooville)</p>
            <p className="text-gray-700 text-sm">PO8 (Cowplain, Denmead)</p>
          </div>
          <div className="border-l-4 border-red-600 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">👥 Population</h4>
            <p className="text-gray-700 text-sm">Over 60,000 residents</p>
            <p className="text-gray-600 text-sm">Growing community</p>
          </div>
          <div className="border-l-4 border-red-600 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">🛍️ Shopping</h4>
            <p className="text-gray-700 text-sm">Town centre & retail park</p>
            <p className="text-gray-600 text-sm">Major retailers & independents</p>
          </div>
          <div className="border-l-4 border-red-600 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">🚗 Transport</h4>
            <p className="text-gray-700 text-sm">A3(M) motorway access</p>
            <p className="text-gray-600 text-sm">Regular bus services</p>
          </div>
          <div className="border-l-4 border-red-600 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">🏠 Property</h4>
            <p className="text-gray-700 text-sm">Mix of housing types</p>
            <p className="text-gray-600 text-sm">Family-friendly area</p>
          </div>
        </div>
      </section>
    </div>
  )
}

