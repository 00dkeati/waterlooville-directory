import { Metadata } from 'next'
import Link from 'next/link'
import { getBusinesses } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Waterlooville Estate Agents League Table 2024 | Compare Reviews & Ratings',
  description: 'Compare the best estate agents in Waterlooville based on Google reviews and ratings. League table ranking local property agents by customer satisfaction.',
  keywords: 'waterlooville estate agents, estate agents waterlooville, property agents waterlooville, best estate agents waterlooville, estate agent reviews',
}

export default async function EstateAgentsPage() {
  // Get all businesses and filter for estate agents
  const allBusinesses = await getBusinesses()
  
  const estateAgents = allBusinesses
    .filter(b => 
      b.category === 'estate-agents' || 
      b.category === 'property' ||
      b.name.toLowerCase().includes('estate')
    )
    .sort((a, b) => {
      // Sort by rating first, then by review count
      if (b.rating !== a.rating) {
        return b.rating - a.rating
      }
      return b.review_count - a.review_count
    })

  // Function to get reviews for an agent from their real Google reviews
  const getAgentReviews = (agent: any): Array<{text: string, author: string, rating: number}> => {
    if (agent.reviews && agent.reviews.length > 0) {
      // Return top 2 real Google reviews
      return agent.reviews.slice(0, 2).map((review: any) => ({
        text: review.text,
        author: review.author_name,
        rating: review.rating
      }))
    }
    
    // No reviews available yet
    return []
  }

  // Calculate statistics
  const avgRating = estateAgents.reduce((sum, agent) => sum + agent.rating, 0) / estateAgents.length
  const totalReviews = estateAgents.reduce((sum, agent) => sum + agent.review_count, 0)
  const topRated = estateAgents.filter(a => a.rating >= 4.8)

  // Function to get medal emoji
  const getMedal = (position: number) => {
    switch(position) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `${position}`
    }
  }

  // Function to get rating badge color
  const getRatingColor = (rating: number) => {
    if (rating >= 4.8) return 'bg-green-100 text-green-800 border-green-300'
    if (rating >= 4.5) return 'bg-blue-100 text-blue-800 border-blue-300'
    if (rating >= 4.0) return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    return 'bg-gray-100 text-gray-800 border-gray-300'
  }

  // Function to generate insights
  const getAgentInsights = (agent: any, position: number) => {
    const insights: string[] = []
    
    if (position === 1) insights.push('🏆 #1 Rated Estate Agent in Waterlooville')
    if (agent.rating >= 4.9) insights.push('⭐ Outstanding customer satisfaction')
    if (agent.review_count >= 100) insights.push('💯 Over 100 verified reviews')
    if (agent.review_count >= 50) insights.push('✓ Trusted by many local customers')
    
    return insights
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 md:p-12 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">🏡</span>
          <h1 className="text-4xl md:text-5xl font-bold">
            Waterlooville Estate Agents League Table
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-blue-100 mb-6">
          Compare the best estate agents in Waterlooville based on real Google reviews
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold">{estateAgents.length}</div>
            <div className="text-blue-100">Estate Agents</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold">{avgRating.toFixed(1)}⭐</div>
            <div className="text-blue-100">Average Rating</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold">{totalReviews.toLocaleString()}</div>
            <div className="text-blue-100">Total Reviews</div>
          </div>
        </div>
      </header>

      {/* League Table */}
      <section className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8 border-4 border-gray-200">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <span className="text-4xl">🏆</span>
            OFFICIAL LEAGUE TABLE 2024
          </h2>
          <p className="text-blue-100 mt-2 text-sm font-medium">Ranked by verified Google customer reviews</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Table Header Row */}
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-white border-b-4 border-yellow-400">
                <th className="px-4 py-4 text-center text-sm font-black uppercase tracking-wider w-20">POS</th>
                <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">ESTATE AGENT</th>
                <th className="px-4 py-4 text-center text-sm font-black uppercase tracking-wider w-32">RATING</th>
                <th className="px-4 py-4 text-center text-sm font-black uppercase tracking-wider w-28">REVIEWS</th>
                <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider w-56">LOCATION</th>
                <th className="px-4 py-4 text-center text-sm font-black uppercase tracking-wider w-36">DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {estateAgents.map((agent, index) => {
                const position = index + 1
                const insights = getAgentInsights(agent, position)
                const isTopThree = position <= 3
                const agentReviews = getAgentReviews(agent)
                
                return (
                  <tr 
                    key={agent.id}
                    className={`
                      border-b-2 border-gray-200 transition-all duration-200
                      ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      ${isTopThree ? 'border-l-8' : 'border-l-4'}
                      ${position === 1 ? 'border-l-yellow-400 bg-yellow-50' : ''}
                      ${position === 2 ? 'border-l-gray-400 bg-gray-100' : ''}
                      ${position === 3 ? 'border-l-orange-400 bg-orange-50' : ''}
                      ${!isTopThree ? 'border-l-blue-200' : ''}
                      hover:bg-blue-50 hover:border-l-blue-500
                    `}
                  >
                    {/* Position */}
                    <td className="px-4 py-5 text-center">
                      <div className={`
                        inline-flex items-center justify-center w-12 h-12 rounded-full font-black text-2xl
                        ${position === 1 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 shadow-lg border-4 border-yellow-600' : ''}
                        ${position === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800 shadow-lg border-4 border-gray-500' : ''}
                        ${position === 3 ? 'bg-gradient-to-br from-orange-300 to-orange-500 text-orange-900 shadow-lg border-4 border-orange-600' : ''}
                        ${position > 3 ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md' : ''}
                      `}>
                        {position <= 3 ? getMedal(position) : position}
                      </div>
                    </td>

                    {/* Estate Agent Name */}
                    <td className="px-6 py-5">
                      <div>
                        <div className="text-xl font-black text-gray-900 mb-1 leading-tight">
                          {agent.name.replace('Estate Agents', '').replace('Waterlooville', '').trim()}
                        </div>
                        {insights.length > 0 && (
                          <div className="space-y-0.5 mt-2">
                            {insights.map((insight, idx) => (
                              <div key={idx} className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                                {insight}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Google Reviews */}
                        {agentReviews.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {agentReviews.map((review, idx) => (
                              <div key={idx} className="bg-white border-2 border-blue-200 rounded-lg p-3 shadow-sm">
                                <div className="flex items-start gap-2 mb-1">
                                  <span className="text-yellow-500 text-sm flex-shrink-0 mt-0.5">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                                  <span className="text-xs font-bold text-gray-600">{review.author}</span>
                                </div>
                                <p className="text-sm text-gray-700 italic leading-relaxed">
                                  "{review.text.length > 120 ? review.text.substring(0, 120) + '...' : review.text}"
                                </p>
                                <div className="mt-1 text-xs text-blue-600 font-semibold">
                                  ✓ Verified Google Review
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {agentReviews.length === 0 && (
                          <div className="mt-3 text-xs text-gray-500 italic">
                            💬 Reviews loading... Run <code className="bg-gray-200 px-1 rounded">npm run enrich:estate-agents</code> to fetch Google reviews
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="px-4 py-5 text-center">
                      <div className={`
                        inline-flex flex-col items-center px-4 py-3 rounded-xl border-4 font-black shadow-lg
                        ${agent.rating >= 4.8 ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-700 text-white' : ''}
                        ${agent.rating >= 4.5 && agent.rating < 4.8 ? 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-700 text-white' : ''}
                        ${agent.rating >= 4.0 && agent.rating < 4.5 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 border-yellow-600 text-yellow-900' : ''}
                        ${agent.rating < 4.0 ? 'bg-gradient-to-br from-gray-300 to-gray-400 border-gray-500 text-gray-800' : ''}
                      `}>
                        <div className="flex items-center gap-1">
                          <span className="text-2xl">★</span>
                          <span className="text-3xl">{agent.rating.toFixed(1)}</span>
                        </div>
                        <div className="text-xs mt-1 opacity-90">
                          {agent.rating >= 4.8 ? 'OUTSTANDING' : agent.rating >= 4.5 ? 'EXCELLENT' : agent.rating >= 4.0 ? 'GOOD' : 'AVERAGE'}
                        </div>
                      </div>
                    </td>

                    {/* Reviews */}
                    <td className="px-4 py-5 text-center">
                      <div className="bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-indigo-300 rounded-lg px-3 py-2">
                        <div className="text-3xl font-black text-indigo-900">
                          {agent.review_count}
                        </div>
                        <div className="text-xs font-bold text-indigo-700 uppercase">
                          Reviews
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-5">
                      <div className="bg-gray-100 rounded-lg px-4 py-2 border-2 border-gray-300">
                        <div className="font-bold text-gray-900 text-sm">{agent.address}</div>
                        <div className="text-xs font-semibold text-gray-600 mt-1">{agent.postcode}</div>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-5 text-center">
                      <Link
                        href={`/biz/${agent.slug}`}
                        className="inline-block px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-black rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 uppercase"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 border-t-4 border-yellow-400">
          <p className="text-gray-300 text-sm text-center font-medium">
            ⚡ Updated with live Google review data • Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Top Performers Spotlight */}
      {topRated.length > 0 && (
        <section className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🌟</span>
            Top Performers (4.8+ Rating)
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {topRated.map(agent => (
              <div key={agent.id} className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{agent.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-xl">★</span>
                    <span className="font-bold text-lg">{agent.rating.toFixed(1)}</span>
                    <span className="text-gray-500 text-sm">({agent.review_count} reviews)</span>
                  </div>
                  <Link
                    href={`/biz/${agent.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Methodology */}
      <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 How We Rank Estate Agents</h2>
        <div className="prose max-w-none text-gray-700">
          <p className="mb-4">
            Our league table ranks Waterlooville estate agents based on authentic Google reviews from real customers. 
            We believe these ratings provide the most accurate reflection of customer satisfaction and service quality.
          </p>
          
          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">Ranking Criteria:</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">1.</span>
              <div>
                <strong>Google Rating</strong> - Primary ranking factor (out of 5 stars)
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">2.</span>
              <div>
                <strong>Number of Reviews</strong> - More reviews indicate established reputation
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">3.</span>
              <div>
                <strong>Verification</strong> - All reviews are verified Google customer feedback
              </div>
            </li>
          </ul>

          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">What Makes a Top-Rated Agent:</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="font-bold text-green-900 mb-2">⭐ 4.8+ Rating</div>
              <div className="text-sm text-green-800">Outstanding customer satisfaction</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="font-bold text-blue-900 mb-2">💯 100+ Reviews</div>
              <div className="text-sm text-blue-800">Proven track record</div>
            </div>
          </div>
        </div>
      </section>

      {/* Choosing an Estate Agent Guide */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 border-2 border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Tips for Choosing an Estate Agent</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-3">What to Look For:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>High Google ratings (4.5+)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Substantial number of reviews</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Local market knowledge</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Transparent fee structure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Professional marketing materials</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Questions to Ask:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">?</span>
                <span>What's your average time to sell?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">?</span>
                <span>What marketing strategy do you use?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">?</span>
                <span>What are your fees and terms?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">?</span>
                <span>How do you communicate with clients?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">?</span>
                <span>Can you provide recent references?</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

