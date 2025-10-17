import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getBusinessBySlug } from '@/lib/db'
import BusinessCard from '@/components/BusinessCard'
import ChineseTakeawayLeagueTable from '@/components/ChineseTakeawayLeagueTable'
import SundayRoastLeagueTable from '@/components/SundayRoastLeagueTable'

interface ArticleContent {
  type: 'paragraph' | 'heading' | 'quote' | 'businessSpotlight' | 'list' | 'callout' | 'leagueTable'
  text?: string
  author?: string
  businessSlug?: string
  items?: string[]
  takeaways?: any[]
  venues?: any[]
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
  content: ArticleContent[]
  relatedBusinesses: string[]
  tags: string[]
  readTime: number
}

// Helper function to get business image for an article
async function getArticleBusinessImage(article: EditorialArticle): Promise<string> {
  try {
    // If article already has a heroImage, use it
    if (article.heroImage && article.heroImage !== 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop') {
      return article.heroImage;
    }

    // If article has relatedBusinesses, try to get image from first business
    if (article.relatedBusinesses && article.relatedBusinesses.length > 0) {
      const firstBusinessSlug = article.relatedBusinesses[0];
      const business = await getBusinessBySlug(firstBusinessSlug);
      
      if (business && business.images && business.images.length > 0) {
        return business.images[0];
      }
    }

    // Fallback to default image
    return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop';
  } catch (error) {
    console.error('Error getting business image for article:', error);
    return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop';
  }
}

async function getArticle(slug: string): Promise<EditorialArticle | null> {
  const articlesData = await import('@/data/editorial-articles.json')
  const articles: EditorialArticle[] = articlesData.default as EditorialArticle[]
  return articles.find(article => article.slug === slug) || null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${article.title} | Waterlooville Directory`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.heroImage],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    },
  }
}

export default async function EditorialArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)

  if (!article) {
    notFound()
  }

  // Get enhanced image for the article
  const enhancedImage = await getArticleBusinessImage(article)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/editorial" className="hover:text-blue-600">Editorial</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">{article.title}</span>
      </nav>

      {/* Article Header */}
      <article className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        {/* Hero Image */}
        <div className="relative h-96 w-full">
          <Image 
            src={enhancedImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-600 rounded mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {article.title}
            </h1>
            <p className="text-xl text-gray-200 mb-4">
              {article.subtitle}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-medium">By {article.author}</span>
              <span>•</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span>•</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            {article.content && article.content.length > 0 ? article.content.map((block, index) => {
              switch (block.type) {
                case 'paragraph':
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6">
                      {block.text}
                    </p>
                  )
                
                case 'heading':
                  return (
                    <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4">
                      {block.text}
                    </h2>
                  )
                
                case 'quote':
                  return (
                    <blockquote key={index} className="border-l-4 border-blue-600 pl-6 py-2 my-8 bg-blue-50 rounded-r-lg">
                      <p className="text-lg text-gray-700 italic mb-2">
                        "{block.text}"
                      </p>
                      {block.author && (
                        <cite className="text-sm text-gray-600 not-italic font-medium">
                          — {block.author}
                        </cite>
                      )}
                    </blockquote>
                  )
                
                case 'businessSpotlight':
                  return (
                    <BusinessSpotlight key={index} businessSlug={block.businessSlug!} />
                  )
                
                case 'list':
                  return (
                    <ul key={index} className="space-y-3 my-6">
                      {block.items?.map((item, i) => {
                        // Parse markdown-style bold
                        const parts = item.split(/(\*\*.*?\*\*)/)
                        return (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-600 mr-3 mt-1">•</span>
                            <span className="text-gray-700 flex-1">
                              {parts.map((part, j) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return <strong key={j}>{part.slice(2, -2)}</strong>
                                }
                                return <span key={j}>{part}</span>
                              })}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  )
                
                case 'callout':
                  return (
                    <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8 rounded-r-lg">
                      <p className="text-gray-800">
                        {block.text}
                      </p>
                    </div>
                  )
                
                case 'leagueTable':
                  return (
                    <div key={index} className="my-12">
                      {block.takeaways ? (
                        <ChineseTakeawayLeagueTable takeaways={block.takeaways} />
                      ) : block.venues ? (
                        <SundayRoastLeagueTable venues={block.venues} />
                      ) : null}
                    </div>
                  )
                
                default:
                  return null
              }
            }) : (
              <p className="text-gray-700 leading-relaxed mb-6">
                Content is being loaded...
              </p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="px-8 md:px-12 pb-8">
          <div className="flex flex-wrap gap-2">
            {article.tags && article.tags.length > 0 ? article.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            )) : null}
          </div>
        </div>

        {/* Author Info */}
        <div className="px-8 md:px-12 pb-8 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {article.author.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{article.author}</h3>
              <p className="text-sm text-gray-600">Editorial Writer at Waterlooville Directory</p>
            </div>
          </div>
        </div>
      </article>

      {/* Back to Editorial */}
      <div className="text-center mb-12">
        <Link 
          href="/editorial"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          ← Back to all articles
        </Link>
      </div>
    </div>
  )
}

// Business Spotlight Component
async function BusinessSpotlight({ businessSlug }: { businessSlug: string }) {
  const business = await getBusinessBySlug(businessSlug)
  
  if (!business) {
    return null
  }

  return (
    <div className="my-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <div className="mb-4">
        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
          Featured Business
        </span>
      </div>
      <BusinessCard business={business} />
    </div>
  )
}

export async function generateStaticParams() {
  const articlesData = await import('@/data/editorial-articles.json')
  const articles: EditorialArticle[] = articlesData.default as EditorialArticle[]
  
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

