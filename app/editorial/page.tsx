import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Editorial Articles | Waterlooville Directory',
  description: 'In-depth stories, guides, and features about Waterlooville businesses and local life.',
}

interface EditorialArticle {
  id: string
  slug: string
  title: string
  subtitle: string
  category: string
  author: string
  publishedAt: string
  featured: boolean
  heroImage: string
  excerpt: string
  readTime: number
  tags: string[]
}

async function getArticles(): Promise<EditorialArticle[]> {
  const articlesData = await import('@/data/editorial-articles.json')
  const articles: EditorialArticle[] = articlesData.default as EditorialArticle[]
  
  // Sort by publish date (newest first)
  return articles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export default async function EditorialPage() {
  const articles = await getArticles()
  const featuredArticles = articles.filter(a => a.featured)
  const regularArticles = articles.filter(a => !a.featured)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Editorial
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          In-depth stories, guides, and features about Waterlooville's best businesses and local life
        </p>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/editorial/${article.slug}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-64 w-full">
                  <Image 
                    src={article.heroImage}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{article.author}</span>
                      <span>•</span>
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                    <span>{article.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Articles */}
      {regularArticles.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <Link
                key={article.id}
                href={`/editorial/${article.slug}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative h-48 w-full">
                  <Image 
                    src={article.heroImage}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-medium">{article.author}</span>
                    <span>{article.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No articles available yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}

