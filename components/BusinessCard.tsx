import Link from 'next/link'
import { Business } from '@/lib/db'

interface BusinessCardProps {
  business: Business
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const formatRating = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))
  }

  // Generate a simple AI-style overview based on available data
  const generateOverview = () => {
    const categoryDescriptions: { [key: string]: string } = {
      'restaurants': 'dining experience',
      'pubs': 'pub atmosphere',
      'cafes': 'café ambiance',
      'plumbers': 'plumbing services',
      'electricians': 'electrical services',
      'health': 'healthcare services',
      'shopping': 'shopping experience',
      'beauty': 'beauty services',
      'automotive': 'automotive services'
    }

    const ratingText = business.rating >= 4.5 ? 'highly rated' : 
                       business.rating >= 4.0 ? 'well-rated' : 
                       business.rating >= 3.5 ? 'popular' : 'established'
    
    const categoryType = categoryDescriptions[business.category] || 'local business'
    const reviewCount = business.review_count || 0

    return `A ${ratingText} ${categoryType} in ${business.area}${reviewCount > 50 ? ' with a strong customer following' : ''}. ${business.description || 'Serving the local community with quality service.'}`
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Business Image */}
      {business.images && business.images.length > 0 && (
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={business.images[0]}
            alt={`${business.name} business image`}
            className="w-full h-full object-cover"
          />
          {/* Rating Badge Overlay */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="font-bold text-gray-900">{business.rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">({business.review_count})</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-5">
        {/* Business Name and Badge */}
        <div className="flex items-start justify-between mb-3">
          <Link 
            href={`/biz/${business.slug}`}
            className="group"
          >
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {business.name}
            </h3>
          </Link>
          {business.featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex-shrink-0 ml-2">
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Category and Location */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
            {business.category}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-600 capitalize">{business.area}</span>
        </div>

        {/* AI Overview */}
        <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 text-sm font-semibold flex-shrink-0 mt-0.5">✨ AI Overview</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mt-1.5">
            {generateOverview()}
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-2.5 mb-4">
          {business.phone && (
            <a 
              href={`tel:${business.phone}`}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group"
            >
              <span className="text-blue-500 group-hover:scale-110 transition-transform">📞</span>
              <span className="text-sm font-medium">{business.phone}</span>
            </a>
          )}
          {business.website && (
            <a 
              href={business.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group"
            >
              <span className="text-blue-500 group-hover:scale-110 transition-transform">🌐</span>
              <span className="text-sm font-medium truncate">Visit Website</span>
            </a>
          )}
          {business.address && (
            <div className="flex items-start gap-2 text-gray-600">
              <span className="text-gray-400 mt-0.5">📍</span>
              <span className="text-sm">{business.address}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link 
          href={`/biz/${business.slug}`}
          className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          View Full Details →
        </Link>
      </div>
    </div>
  )
}

