'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { isOpenNow } from '@/lib/timeHelpers'

interface Business {
  id: string
  name: string
  slug: string
  category: string
  area: string
  phone: string
  website: string
  address: string
  postcode: string
  description: string
  tagline?: string
  rating: number
  review_count: number
  opening_hours_json: string
  priceRange?: string
  services?: string[]
  features?: string[]
  certifications?: string[]
  emergencyService?: boolean
  responseTime?: string
  yearsInBusiness?: number
  images?: string[]
  distance?: number
}

interface EnhancedBusinessCardProps {
  business: Business
  showDistance?: boolean
}

export default function EnhancedBusinessCard({ business, showDistance }: EnhancedBusinessCardProps) {
  const [imageError, setImageError] = useState(false)
  const openNow = isOpenNow(business)
  
  const mainImage = business.images?.[0] || 
    `https://placehold.co/400x300/e2e8f0/64748b?text=${encodeURIComponent(business.name)}`

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        <Image
          src={imageError ? `https://placehold.co/400x300/e2e8f0/64748b?text=${encodeURIComponent(business.name)}` : mainImage}
          alt={business.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {business.emergencyService && (
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              🚨 24/7 Emergency
            </span>
          )}
          {business.certifications && business.certifications.length > 0 && (
            <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              ✓ Certified
            </span>
          )}
        </div>

        {/* Open/Closed Badge */}
        <div className="absolute top-3 right-3">
          {openNow ? (
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              OPEN NOW
            </span>
          ) : (
            <span className="bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              CLOSED
            </span>
          )}
        </div>

        {/* Price Range */}
        {business.priceRange && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              {business.priceRange}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-3">
          <Link href={`/biz/${business.slug}`} className="group-hover:text-blue-600 transition">
            <h3 className="text-xl font-bold mb-1 line-clamp-1">{business.name}</h3>
          </Link>
          
          {business.tagline && (
            <p className="text-sm text-gray-600 italic line-clamp-1 mb-2">
              "{business.tagline}"
            </p>
          )}

          {/* Rating & Reviews */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(business.rating) ? '' : 'opacity-30'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="font-bold text-gray-900">{business.rating}</span>
            </div>
            <span className="text-sm text-gray-500">
              ({business.review_count} reviews)
            </span>
          </div>

          {/* Category & Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
              {business.category}
            </span>
            <span>•</span>
            <span className="flex items-center">
              📍 {business.area}
              {showDistance && business.distance && (
                <span className="ml-1 text-gray-500">({business.distance.toFixed(1)} mi)</span>
              )}
            </span>
          </div>
        </div>

        {/* Key Features */}
        {business.services && business.services.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {business.services.slice(0, 3).map((service, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                >
                  ✓ {service}
                </span>
              ))}
              {business.services.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{business.services.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {business.description}
        </p>

        {/* Additional Info Icons */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
          {business.yearsInBusiness && (
            <div className="flex items-center" title="Years in business">
              <span className="mr-1">🏆</span>
              {business.yearsInBusiness}+ years
            </div>
          )}
          {business.responseTime && (
            <div className="flex items-center" title="Response time">
              <span className="mr-1">⚡</span>
              Quick response
            </div>
          )}
          {business.features?.includes('Free Parking') && (
            <div className="flex items-center" title="Free parking">
              <span className="mr-1">🅿️</span>
              Free parking
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-4"></div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href={`tel:${business.phone}`} className="hover:text-blue-600 font-medium">
              {business.phone}
            </a>
          </div>
          
          <div className="flex items-center text-sm text-gray-700">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{business.address}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          
            href={`tel:${business.phone}`}
            className="flex items-center justify-center bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now
          </a>
          
          <Link
            href={`/biz/${business.slug}`}
            className="flex items-center justify-center bg-gray-100 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition font-semibold text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View Details
          </Link>
        </div>

        {/* Quick actions row */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          {business.website && (
            
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-xs text-gray-600 hover:text-blue-600 py-2 border border-gray-200 rounded-lg hover:border-blue-300 transition"
            >
              🌐 Website
            </a>
          )}
          
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address + ', ' + business.postcode)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-xs text-gray-600 hover:text-blue-600 py-2 border border-gray-200 rounded-lg hover:border-blue-300 transition"
          >
            🗺️ Directions
          </a>
        </div>
      </div>
    </div>
  )
}
EOFcat > components/EnhancedBusinessCard.tsx << 'EOF'
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { isOpenNow } from '@/lib/timeHelpers'

interface Business {
  id: string
  name: string
  slug: string
  category: string
  area: string
  phone: string
  website: string
  address: string
  postcode: string
  description: string
  tagline?: string
  rating: number
  review_count: number
  opening_hours_json: string
  priceRange?: string
  services?: string[]
  features?: string[]
  certifications?: string[]
  emergencyService?: boolean
  responseTime?: string
  yearsInBusiness?: number
  images?: string[]
  distance?: number
}

interface EnhancedBusinessCardProps {
  business: Business
  showDistance?: boolean
}

export default function EnhancedBusinessCard({ business, showDistance }: EnhancedBusinessCardProps) {
  const [imageError, setImageError] = useState(false)
  const openNow = isOpenNow(business)
  
  const mainImage = business.images?.[0] || 
    `https://placehold.co/400x300/e2e8f0/64748b?text=${encodeURIComponent(business.name)}`

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        <Image
          src={imageError ? `https://placehold.co/400x300/e2e8f0/64748b?text=${encodeURIComponent(business.name)}` : mainImage}
          alt={business.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {business.emergencyService && (
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              🚨 24/7 Emergency
            </span>
          )}
          {business.certifications && business.certifications.length > 0 && (
            <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              ✓ Certified
            </span>
          )}
        </div>

        {/* Open/Closed Badge */}
        <div className="absolute top-3 right-3">
          {openNow ? (
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              OPEN NOW
            </span>
          ) : (
            <span className="bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              CLOSED
            </span>
          )}
        </div>

        {/* Price Range */}
        {business.priceRange && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              {business.priceRange}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-3">
          <Link href={`/biz/${business.slug}`} className="group-hover:text-blue-600 transition">
            <h3 className="text-xl font-bold mb-1 line-clamp-1">{business.name}</h3>
          </Link>
          
          {business.tagline && (
            <p className="text-sm text-gray-600 italic line-clamp-1 mb-2">
              "{business.tagline}"
            </p>
          )}

          {/* Rating & Reviews */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(business.rating) ? '' : 'opacity-30'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="font-bold text-gray-900">{business.rating}</span>
            </div>
            <span className="text-sm text-gray-500">
              ({business.review_count} reviews)
            </span>
          </div>

          {/* Category & Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
              {business.category}
            </span>
            <span>•</span>
            <span className="flex items-center">
              📍 {business.area}
              {showDistance && business.distance && (
                <span className="ml-1 text-gray-500">({business.distance.toFixed(1)} mi)</span>
              )}
            </span>
          </div>
        </div>

        {/* Key Features */}
        {business.services && business.services.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {business.services.slice(0, 3).map((service, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                >
                  ✓ {service}
                </span>
              ))}
              {business.services.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{business.services.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {business.description}
        </p>

        {/* Additional Info Icons */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
          {business.yearsInBusiness && (
            <div className="flex items-center" title="Years in business">
              <span className="mr-1">🏆</span>
              {business.yearsInBusiness}+ years
            </div>
          )}
          {business.responseTime && (
            <div className="flex items-center" title="Response time">
              <span className="mr-1">⚡</span>
              Quick response
            </div>
          )}
          {business.features?.includes('Free Parking') && (
            <div className="flex items-center" title="Free parking">
              <span className="mr-1">🅿️</span>
              Free parking
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-4"></div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href={`tel:${business.phone}`} className="hover:text-blue-600 font-medium">
              {business.phone}
            </a>
          </div>
          
          <div className="flex items-center text-sm text-gray-700">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{business.address}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          
            href={`tel:${business.phone}`}
            className="flex items-center justify-center bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now
          </a>
          
          <Link
            href={`/biz/${business.slug}`}
            className="flex items-center justify-center bg-gray-100 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition font-semibold text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View Details
          </Link>
        </div>

        {/* Quick actions row */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          {business.website && (
            
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-xs text-gray-600 hover:text-blue-600 py-2 border border-gray-200 rounded-lg hover:border-blue-300 transition"
            >
              🌐 Website
            </a>
          )}
          
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address + ', ' + business.postcode)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-xs text-gray-600 hover:text-blue-600 py-2 border border-gray-200 rounded-lg hover:border-blue-300 transition"
          >
            🗺️ Directions
          </a>
        </div>
      </div>
    </div>
  )
}
