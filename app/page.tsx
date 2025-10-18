export const dynamic = 'force-dynamic'
import TopNav from "./(site)/components/TopNav";
import { getFeatureArticle, getLatestArticles, getTopCategories } from "@/lib/data";
import Image from "next/image";

export default async function HomePage() {
  const [featureArticle, latestArticles, categories] = await Promise.all([
    getFeatureArticle(),
    getLatestArticles(6),
    getTopCategories(12),
  ]);

  return (
    <>
      <TopNav />
      
      <main className="container mx-auto max-w-6xl px-4 py-8">
        {/* Featured News Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Latest News</h1>
            
            {featureArticle && (
              <div className="mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="md:flex">
                    {/* Featured Article Image */}
                    {featureArticle.imageUrl && (
                      <div className="md:w-1/2 relative h-64 md:h-auto">
                        <Image
                          src={featureArticle.imageUrl}
                          alt={featureArticle.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {featureArticle.kicker || 'Featured'}
                          </span>
                        </div>
                        {/* Debug info */}
                        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white text-xs p-2 rounded">
                          Debug: {featureArticle.imageUrl}
                        </div>
                      </div>
                    )}
                    
                    {/* Featured Article Content */}
                    <div className={`p-6 ${featureArticle.imageUrl ? 'md:w-1/2' : 'w-full'} bg-gradient-to-r from-green-600 to-green-700 text-white`}>
                      {!featureArticle.imageUrl && (
                        <div className="flex items-center mb-3">
                          <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                            {featureArticle.kicker || 'Featured'}
                          </span>
                        </div>
                      )}
                      <h2 className="text-2xl font-bold mb-3">
                        <a href={`/editorial/${featureArticle.slug}`} className="hover:text-green-100 transition-colors">
                          {featureArticle.title}
                        </a>
                      </h2>
                      {featureArticle.excerpt && (
                        <p className="text-green-100 mb-4">{featureArticle.excerpt}</p>
                      )}
                      <a 
                        href={`/editorial/${featureArticle.slug}`}
                        className="inline-flex items-center bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                      >
                        Read more
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Latest Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.slice(0, 6).map((article) => (
                <article key={article.slug} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Article Image */}
                  {article.imageUrl && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          {article.kicker || 'News'}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Article Content */}
                  <div className="p-4">
                    {!article.imageUrl && (
                      <div className="flex items-center mb-2">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                          {article.kicker || 'News'}
                        </span>
                      </div>
                    )}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      <a href={`/editorial/${article.slug}`} className="hover:text-green-600 transition-colors">
                        {article.title}
                      </a>
                    </h3>
                    {article.excerpt && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-GB') : 'Recent'}</span>
                      <a href={`/editorial/${article.slug}`} className="text-green-600 hover:text-green-700 font-medium">
                        Read →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-6">
              <a 
                href="/editorial" 
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                View All News
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Directory Categories Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Business Directory</h2>
            <p className="text-gray-600 mb-8">Find trusted local businesses in Waterlooville and surrounding areas</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="group bg-gray-50 hover:bg-green-50 rounded-lg p-4 text-center transition-colors border border-gray-200 hover:border-green-300"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-700 text-sm">
                    {category.label}
                  </h3>
                </a>
              ))}
            </div>

            <div className="text-center mt-8">
              <a 
                href="/categories" 
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Browse All Categories
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="mb-6">Search our directory of 500+ local businesses</p>
            <div className="max-w-md mx-auto">
              <form action="/search" method="GET" className="flex gap-2">
                <input
                  type="text"
                  name="query"
                  placeholder="Search businesses..."
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}