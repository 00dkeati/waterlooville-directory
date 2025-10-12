import { Metadata } from 'next'
import Link from 'next/link'
import { getBusinesses } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Best Coffee Shops in Waterlooville 2024 | Chains vs Independent Cafes',
  description: 'Compare the best coffee shops in Waterlooville. Read real customer reviews from Google, Trustpilot and more. Costa Coffee, independent cafes, and local favorites ranked.',
  keywords: 'waterlooville coffee shops, best cafe waterlooville, costa coffee waterlooville, independent cafe waterlooville, coffee near me',
}

export default async function CoffeeShopsPage() {
  // Get all cafes
  const allBusinesses = await getBusinesses()
  
  const coffeeShops = allBusinesses
    .filter(b => 
      b.category === 'cafes' || 
      b.category === 'coffee' ||
      b.name.toLowerCase().includes('coffee') ||
      b.name.toLowerCase().includes('cafe') ||
      b.name.toLowerCase().includes('café')
    )
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating
      return b.review_count - a.review_count
    })

  // Separate chains from independents
  const chainKeywords = ['costa', 'starbucks', 'nero', 'pret', 'greggs']
  const chains = coffeeShops.filter(c => 
    chainKeywords.some(keyword => c.name.toLowerCase().includes(keyword))
  )
  const independents = coffeeShops.filter(c => 
    !chainKeywords.some(keyword => c.name.toLowerCase().includes(keyword))
  )

  // Get reviews with positive and negative separation
  const getCafeReviews = (cafe: any): {
    positive: Array<{text: string, author: string, rating: number, source: string}>
    negative: Array<{text: string, author: string, rating: number, source: string}>
    overall_score: number
    total_reviews: number
  } => {
    const reviews = cafe.aggregated_reviews || []
    
    const positive = reviews
      .filter((r: any) => r.rating >= 4)
      .sort((a: any, b: any) => b.rating - a.rating)
      .slice(0, 3)
      .map((r: any) => ({
        text: r.text,
        author: r.author_name,
        rating: r.rating,
        source: r.source
      }))
    
    const negative = reviews
      .filter((r: any) => r.rating <= 3)
      .sort((a: any, b: any) => a.rating - b.rating)
      .slice(0, 3)
      .map((r: any) => ({
        text: r.text,
        author: r.author_name,
        rating: r.rating,
        source: r.source
      }))
    
    // Calculate overall score from all sources
    const totalReviews = reviews.length || cafe.review_count
    const overall_score = reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
      : cafe.rating

    return { positive, negative, overall_score, total_reviews: totalReviews }
  }

  // Stats
  const avgRating = coffeeShops.reduce((sum, c) => sum + c.rating, 0) / coffeeShops.length
  const totalReviews = coffeeShops.reduce((sum, c) => sum + c.review_count, 0)
  const topRated = coffeeShops.filter(c => c.rating >= 4.7)

  const getMedal = (position: number) => {
    switch(position) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `${position}`
    }
  }

  const isChain = (name: string) => {
    return chainKeywords.some(keyword => name.toLowerCase().includes(keyword))
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl p-8 md:p-12 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">☕</span>
          <h1 className="text-4xl md:text-5xl font-bold">
            Best Coffee Shops in Waterlooville
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-amber-100 mb-6">
          Chains vs Independent Cafes - Real Customer Reviews Compared
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold">{coffeeShops.length}</div>
            <div className="text-amber-100">Coffee Shops</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold">{chains.length}</div>
            <div className="text-amber-100">Chains</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold">{independents.length}</div>
            <div className="text-amber-100">Independents</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold">{avgRating.toFixed(1)}⭐</div>
            <div className="text-amber-100">Avg Rating</div>
          </div>
        </div>
      </header>

      {/* Overall League Table */}
      <section className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8 border-4 border-amber-200">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-5">
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <span className="text-4xl">🏆</span>
            COFFEE SHOP LEAGUE TABLE 2024
          </h2>
          <p className="text-amber-100 mt-2 text-sm font-medium">All reviews aggregated from Google, Trustpilot & more</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-white border-b-4 border-amber-400">
                <th className="px-4 py-4 text-center text-sm font-black uppercase w-20">POS</th>
                <th className="px-6 py-4 text-left text-sm font-black uppercase">COFFEE SHOP</th>
                <th className="px-4 py-4 text-center text-sm font-black uppercase w-32">OVERALL</th>
                <th className="px-4 py-4 text-center text-sm font-black uppercase w-28">REVIEWS</th>
                <th className="px-4 py-4 text-center text-sm font-black uppercase w-24">TYPE</th>
              </tr>
            </thead>
            <tbody>
              {coffeeShops.map((cafe, index) => {
                const position = index + 1
                const isTopThree = position <= 3
                const { positive, negative, overall_score, total_reviews } = getCafeReviews(cafe)
                const chain = isChain(cafe.name)
                
                return (
                  <tr 
                    key={cafe.id}
                    className={`
                      border-b-2 border-gray-200 transition-all
                      ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      ${isTopThree ? 'border-l-8' : 'border-l-4'}
                      ${position === 1 ? 'border-l-yellow-400 bg-yellow-50' : ''}
                      ${position === 2 ? 'border-l-gray-400 bg-gray-100' : ''}
                      ${position === 3 ? 'border-l-orange-400 bg-orange-50' : ''}
                      ${!isTopThree ? 'border-l-amber-200' : ''}
                      hover:bg-amber-50
                    `}
                  >
                    {/* Position */}
                    <td className="px-4 py-6 text-center">
                      <div className={`
                        inline-flex items-center justify-center w-12 h-12 rounded-full font-black text-2xl
                        ${position === 1 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 shadow-lg border-4 border-yellow-600' : ''}
                        ${position === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800 shadow-lg border-4 border-gray-500' : ''}
                        ${position === 3 ? 'bg-gradient-to-br from-orange-300 to-orange-500 text-orange-900 shadow-lg border-4 border-orange-600' : ''}
                        ${position > 3 ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md' : ''}
                      `}>
                        {position <= 3 ? getMedal(position) : position}
                      </div>
                    </td>

                    {/* Coffee Shop Name & Reviews */}
                    <td className="px-6 py-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-black text-gray-900">{cafe.name}</h3>
                          {chain && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">CHAIN</span>
                          )}
                          {!chain && position <= 5 && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">LOCAL</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mb-3">{cafe.address}</div>

                        {/* Positive Reviews */}
                        {positive.length > 0 && (
                          <div className="mt-4">
                            <div className="text-xs font-black text-green-700 mb-2 flex items-center gap-1">
                              👍 TOP 3 POSITIVE REVIEWS
                            </div>
                            <div className="space-y-2">
                              {positive.map((review, idx) => (
                                <div key={idx} className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-3">
                                  <div className="flex items-start justify-between mb-1">
                                    <span className="text-yellow-500 text-xs font-bold">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                                    <span className="text-xs font-bold text-green-700 uppercase">{review.source}</span>
                                  </div>
                                  <p className="text-sm text-gray-800 leading-relaxed mb-1">
                                    "{review.text.length > 120 ? review.text.substring(0, 120) + '...' : review.text}"
                                  </p>
                                  <div className="text-xs text-gray-600 font-semibold">— {review.author}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Negative Reviews */}
                        {negative.length > 0 && (
                          <div className="mt-4">
                            <div className="text-xs font-black text-orange-700 mb-2 flex items-center gap-1">
                              ⚠️ TOP 3 CONSTRUCTIVE REVIEWS
                            </div>
                            <div className="space-y-2">
                              {negative.map((review, idx) => (
                                <div key={idx} className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-lg p-3">
                                  <div className="flex items-start justify-between mb-1">
                                    <span className="text-yellow-500 text-xs font-bold">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                                    <span className="text-xs font-bold text-orange-700 uppercase">{review.source}</span>
                                  </div>
                                  <p className="text-sm text-gray-800 leading-relaxed mb-1">
                                    "{review.text.length > 120 ? review.text.substring(0, 120) + '...' : review.text}"
                                  </p>
                                  <div className="text-xs text-gray-600 font-semibold">— {review.author}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Placeholder if no reviews yet */}
                        {positive.length === 0 && negative.length === 0 && cafe.review_count > 0 && (
                          <div className="mt-3 bg-amber-50 border-2 border-amber-300 rounded-lg p-3">
                            <div className="text-xs font-bold text-amber-900">
                              📊 {cafe.review_count} reviews on Google
                            </div>
                            <div className="text-xs text-amber-700 mt-1">
                              Reviews will appear here after running AI scraper
                            </div>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Overall Score */}
                    <td className="px-4 py-6 text-center">
                      <div className={`
                        inline-flex flex-col items-center px-4 py-3 rounded-xl border-4 font-black shadow-lg
                        ${overall_score >= 4.8 ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-700 text-white' : ''}
                        ${overall_score >= 4.5 && overall_score < 4.8 ? 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-700 text-white' : ''}
                        ${overall_score >= 4.0 && overall_score < 4.5 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 border-yellow-600 text-yellow-900' : ''}
                        ${overall_score < 4.0 ? 'bg-gradient-to-br from-gray-300 to-gray-400 border-gray-500 text-gray-800' : ''}
                      `}>
                        <div className="flex items-center gap-1">
                          <span className="text-2xl">★</span>
                          <span className="text-3xl">{overall_score.toFixed(1)}</span>
                        </div>
                        <div className="text-xs mt-1 opacity-90 uppercase">
                          {overall_score >= 4.8 ? 'Outstanding' : overall_score >= 4.5 ? 'Excellent' : overall_score >= 4.0 ? 'Good' : 'Average'}
                        </div>
                        {total_reviews > cafe.review_count && (
                          <div className="text-xs mt-1 opacity-75">
                            Multi-source
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Reviews */}
                    <td className="px-4 py-6 text-center">
                      <div className="bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300 rounded-lg px-3 py-2">
                        <div className="text-3xl font-black text-amber-900">
                          {total_reviews}
                        </div>
                        <div className="text-xs font-bold text-amber-700 uppercase">
                          Reviews
                        </div>
                        {positive.length + negative.length > 0 && (
                          <div className="text-xs text-green-700 font-semibold mt-1">
                            {positive.length + negative.length} sources
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-6 text-center">
                      <div className={`
                        px-3 py-2 rounded-lg font-bold text-sm
                        ${chain ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                      `}>
                        {chain ? '🏢 Chain' : '🏪 Independent'}
                      </div>
                      <Link
                        href={`/biz/${cafe.slug}`}
                        className="inline-block mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-all"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 border-t-4 border-amber-400">
          <p className="text-gray-300 text-sm text-center font-medium">
            ⚡ Reviews aggregated from Google, Trustpilot, Yell & more • Updated: {new Date().toLocaleDateString('en-GB')}
          </p>
        </div>
      </section>

      {/* Chains vs Independents Comparison */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Chain Coffee Shops */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🏢</span>
            Chain Coffee Shops
          </h2>
          <div className="space-y-3">
            {chains.slice(0, 5).map(chain => (
              <div key={chain.id} className="bg-white rounded-lg p-4 border-2 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{chain.name}</div>
                    <div className="text-sm text-gray-600">{chain.address}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-700">{chain.rating}★</div>
                    <div className="text-xs text-gray-500">{chain.review_count} reviews</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <div className="font-bold text-blue-900 mb-2">Chains Pros:</div>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Consistent quality</li>
              <li>✓ Known menu items</li>
              <li>✓ Loyalty programs</li>
              <li>✓ WiFi & seating</li>
            </ul>
          </div>
        </section>

        {/* Independent Coffee Shops */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🏪</span>
            Independent Cafes
          </h2>
          <div className="space-y-3">
            {independents.slice(0, 5).map(indie => (
              <div key={indie.id} className="bg-white rounded-lg p-4 border-2 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{indie.name}</div>
                    <div className="text-sm text-gray-600">{indie.address}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-700">{indie.rating}★</div>
                    <div className="text-xs text-gray-500">{indie.review_count} reviews</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-green-100 rounded-lg">
            <div className="font-bold text-green-900 mb-2">Local Pros:</div>
            <ul className="text-sm text-green-800 space-y-1">
              <li>✓ Unique character</li>
              <li>✓ Local ownership</li>
              <li>✓ Personal service</li>
              <li>✓ Community hub</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Guide */}
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">☕ Coffee Shop Guide</h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            Waterlooville offers {coffeeShops.length} excellent coffee shops, from well-known chains like Costa Coffee 
            to independent local favorites. Whether you're after a quick espresso or a relaxing brunch spot, there's 
            something for everyone.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">What Makes a Great Coffee Shop?</h3>
              <ul className="text-gray-700 space-y-2">
                <li>✓ Quality coffee and fresh ingredients</li>
                <li>✓ Friendly, knowledgeable staff</li>
                <li>✓ Comfortable seating</li>
                <li>✓ Good WiFi (for remote workers)</li>
                <li>✓ Clean facilities</li>
                <li>✓ Reasonable prices</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Popular in Waterlooville:</h3>
              <ul className="text-gray-700 space-y-2">
                <li>☕ Flat whites & cappuccinos</li>
                <li>🥐 Fresh pastries & cakes</li>
                <li>🥪 Breakfast & lunch options</li>
                <li>🥤 Smoothies & cold brew</li>
                <li>🍰 Afternoon tea</li>
                <li>🌱 Vegan & plant-based options</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

