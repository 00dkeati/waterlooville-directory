import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBusinesses } from '@/lib/db'
import BusinessCard from '@/components/BusinessCard'
import seoPages from '@/data/seo-pages.json'

interface SEOPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return seoPages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: SEOPageProps): Promise<Metadata> {
  const page = seoPages.find(p => p.slug === params.slug)
  
  if (!page) {
    return {
      title: 'Page Not Found'
    }
  }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords.join(', '),
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'website',
    },
  }
}

export default async function SEOPage({ params }: SEOPageProps) {
  const page = seoPages.find(p => p.slug === params.slug)
  
  if (!page) {
    notFound()
  }

  // Get related businesses if category matches
  const businesses = page.category && ['restaurants', 'shopping', 'services', 'health'].includes(page.category)
    ? await getBusinesses(page.category, 'waterlooville')
    : []

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{page.h1}</span>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 md:p-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {page.h1}
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-6">
          {page.description}
        </p>
        
        {/* Keywords Pills */}
        <div className="flex flex-wrap gap-2">
          {page.keywords.slice(0, 8).map((keyword) => (
            <span key={keyword} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              {keyword}
            </span>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Introduction */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              {page.content.intro}
            </p>
          </section>

          {/* Content Sections */}
          {page.content.sections.map((section, index) => (
            <section key={index} className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {section.items.map((item) => (
                  <div 
                    key={item}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
                  >
                    <span className="text-blue-600 text-xl">✓</span>
                    <span className="font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Related Businesses */}
          {businesses.length > 0 && (
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Featured Waterlooville Businesses
              </h2>
              <div className="grid gap-6">
                {businesses.slice(0, 6).map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link 
                  href={`/${page.category}`}
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View All {page.category} in Waterlooville →
                </Link>
              </div>
            </section>
          )}

          {/* SEO Content Footer */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About {page.h1.replace(/[🍽️🛍️⚙️🏥💼🏠👥📰🌤️]/g, '').trim()}
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                {page.content.intro} Whether you're a long-time resident or new to the area, this comprehensive guide 
                helps you discover everything Waterlooville has to offer.
              </p>
              <p>
                Located in Hampshire with postcodes PO7 and PO8, Waterlooville serves a population of over 60,000 
                residents with excellent facilities, shops, services, and community amenities. The town centre (PO7 3DU) 
                and retail park provide convenient access to major retailers and local businesses.
              </p>
              <p>
                For more information about specific businesses and services, browse our complete directory or search 
                by category to find exactly what you need in Waterlooville.
              </p>
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* All SEO Pages */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Explore More</h3>
            <ul className="space-y-2">
              {seoPages
                .filter(p => p.slug !== params.slug)
                .map((p) => (
                  <li key={p.slug}>
                    <Link 
                      href={`/w/${p.slug}`}
                      className="block p-3 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium text-sm"
                    >
                      {p.h1.replace(/[🍽️🛍️⚙️🏥💼🏠👥📰🌤️✨]/g, '').trim()}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-blue-50">
              <li>
                <Link href="/" className="hover:text-white transition-colors font-medium">
                  → Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors font-medium">
                  → Browse Categories
                </Link>
              </li>
              <li>
                <Link href="/areas" className="hover:text-white transition-colors font-medium">
                  → Browse Areas
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors font-medium">
                  → Search Businesses
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-3">List Your Business</h3>
            <p className="text-green-50 mb-4 text-sm">
              Get your Waterlooville business featured in our directory
            </p>
            <Link 
              href="/contact"
              className="block w-full text-center bg-white text-green-600 py-2 px-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </div>

      {/* All Keywords Grid */}
      <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Waterlooville Keywords</h2>
        <div className="flex flex-wrap gap-2">
          {page.keywords.map((keyword) => (
            <span 
              key={keyword}
              className="inline-block px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors"
            >
              {keyword}
            </span>
          ))}
        </div>
      </section>

    </div>
  )
}

