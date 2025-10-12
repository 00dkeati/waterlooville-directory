import Link from 'next/link'
import { Business } from '@/lib/db'

interface BusinessCardProps {
  business: Business
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const formatRating = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))
  }

  // Debug logging
  if (typeof window !== 'undefined') {
    console.log(`BusinessCard: ${business.name}`, {
      hasImages: !!business.images,
      imageCount: business.images?.length || 0,
      firstImage: business.images?.[0]?.substring(0, 100)
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Business Image */}
      {business.images && business.images.length > 0 && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={business.images[0]}
            alt={`${business.name} business image`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            <Link 
              href={`/biz/${business.slug}`}
              className="hover:text-blue-600 transition-colors"
            >
              {business.name}
            </Link>
          </h3>
          {business.featured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>

      <div className="flex items-center mb-2">
        <span className="text-yellow-400 text-sm mr-2">
          {formatRating(business.rating)}
        </span>
        <span className="text-sm text-gray-600">
          {business.rating.toFixed(1)} ({business.review_count} reviews)
        </span>
      </div>

      {business.description && (
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {business.description}
        </p>
      )}

      <div className="space-y-1 text-sm text-gray-600">
        {business.address && (
          <p className="flex items-center">
            <span className="w-4 h-4 mr-2">📍</span>
            {business.address}
          </p>
        )}
        {business.phone && (
          <p className="flex items-center">
            <span className="w-4 h-4 mr-2">📞</span>
            {business.phone}
          </p>
        )}
        {business.website && (
          <p className="flex items-center">
            <span className="w-4 h-4 mr-2">🌐</span>
            <a 
              href={business.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors truncate"
            >
              Visit Website
            </a>
          </p>
        )}
      </div>

        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 capitalize">
              {business.category} in {business.area}
            </span>
            <Link 
              href={`/biz/${business.slug}`}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

