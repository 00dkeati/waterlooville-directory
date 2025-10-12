import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBusinesses } from '@/lib/db'
import BusinessCard from '@/components/BusinessCard'
import MessageBoard from '@/components/MessageBoard'
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

          {/* Detailed Guide for Shops and Restaurants Pages */}
          {(page.slug === 'waterlooville-shops' || page.slug === 'waterlooville-restaurants') && page.content.detailedGuide && (
            <>
              {/* Shopping or Dining Areas */}
              {(page.content.detailedGuide.shoppingAreas || page.content.detailedGuide.diningAreas || []).map((area, index) => (
                <section key={index} className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <span className="text-2xl">{page.slug === 'waterlooville-restaurants' ? '🍽️' : '🏪'}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{area.name}</h2>
                      <p className="text-gray-600 mb-4">{area.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <span>📍</span>
                          <span className="text-gray-600">{area.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>🅿️</span>
                          <span className="text-gray-600">{area.parking}</span>
                        </div>
                        {area.busRoutes && (
                          <div className="flex items-center gap-1">
                            <span>🚌</span>
                            <span className="text-gray-600">{area.busRoutes}</span>
                          </div>
                        )}
                        {area.atmosphere && (
                          <div className="flex items-center gap-1">
                            <span>✨</span>
                            <span className="text-gray-600">{area.atmosphere}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Main Shops or Restaurants */}
                  {(area.mainShops || area.restaurants) && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {page.slug === 'waterlooville-restaurants' ? 'Featured Restaurants' : 'Main Shops'}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {(area.mainShops || area.restaurants || []).map((item, itemIndex) => (
                          <div key={itemIndex} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-bold text-gray-900">{item.name}</h4>
                              {item.priceRange && (
                                <span className="text-sm text-gray-600 font-semibold">{item.priceRange}</span>
                              )}
                            </div>
                            {item.type && item.cuisine && (
                              <p className="text-xs text-blue-600 font-medium mb-2">{item.type} • {item.cuisine}</p>
                            )}
                            {item.type && !item.cuisine && (
                              <p className="text-xs text-blue-600 font-medium mb-2">{item.type}</p>
                            )}
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                            {item.features && (
                              <div className="text-xs text-gray-500">
                                <strong>Features:</strong> {item.features}
                              </div>
                            )}
                            {item.specialties && item.specialties.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {item.specialties.map((specialty, idx) => (
                                  <span key={idx} className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs">
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            )}
                            {item.booking && (
                              <div className="mt-2 text-xs text-gray-600 italic">
                                📅 {item.booking}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Info */}
                  {area.independentShops && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Independent Shops</h3>
                      <div className="flex flex-wrap gap-2">
                        {area.independentShops.map((shop, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {shop}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {area.services && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Services Available</h3>
                      <div className="flex flex-wrap gap-2">
                        {area.services.map((service, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              ))}

              {/* Cuisine Types (for restaurants) */}
              {page.content.detailedGuide.cuisineTypes && (
                <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Cuisine Types Available</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {page.content.detailedGuide.cuisineTypes.map((cuisine, index) => (
                      <div key={index} className="p-5 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{cuisine.type}</h3>
                        <p className="text-sm text-gray-600 mb-3">{cuisine.description}</p>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-semibold text-gray-700">Popular Dishes:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {cuisine.popularDishes.map((dish, idx) => (
                                <span key={idx} className="inline-block px-2 py-0.5 bg-white text-gray-700 rounded text-xs">
                                  {dish}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-gray-600">
                            <strong>Price Range:</strong> {cuisine.priceRange}
                          </div>
                          <div className="text-xs text-green-700">
                            <strong>Dietary:</strong> {cuisine.dietaryOptions}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Shopping or Dining Tips */}
              {(page.content.detailedGuide.shoppingTips || page.content.detailedGuide.diningTips) && (
                <section className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>💡</span>
                    {page.slug === 'waterlooville-restaurants' ? 'Dining Tips' : 'Shopping Tips'}
                  </h2>
                  <ul className="space-y-2">
                    {(page.content.detailedGuide.shoppingTips || page.content.detailedGuide.diningTips || []).map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold mt-1">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              
              {/* Booking Information (for restaurants) */}
              {page.content.detailedGuide.bookingInfo && (
                <section className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📅</span>
                    Booking Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(page.content.detailedGuide.bookingInfo).map(([key, value]) => (
                      <div key={key} className="p-4 bg-white rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-sm text-gray-600">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Opening Hours */}
              {page.content.detailedGuide.openingHours && (
                <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Opening Hours</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(page.content.detailedGuide.openingHours).map(([location, hours]) => (
                      <div key={location} className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2 capitalize">
                          {location.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-gray-600">{hours}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* Regular Content Sections for other pages */}
          {page.content.sections && (
            <>
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
            </>
          )}

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

          {/* Community Reviews / Message Board */}
          <MessageBoard 
            pageSlug={page.slug}
            pageTitle={page.h1.replace(/[🍽️🛍️⚙️🏥💼🏠👥📰🌤️]/g, '').trim()}
          />

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

