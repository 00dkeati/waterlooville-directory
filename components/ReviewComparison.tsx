'use client'

import { ReviewSource } from '@/lib/reviewAggregator'

interface ReviewComparisonProps {
  sources: ReviewSource[]
}

export default function ReviewComparison({ sources }: ReviewComparisonProps) {
  const maxReviews = Math.max(...sources.map(s => s.reviewCount))

  return (
    <div className="bg-white rounded-xl p-6 mb-8">
      <h4 className="font-bold text-lg mb-4">Rating Comparison</h4>
      
      <div className="space-y-4">
        {sources.map((source, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium capitalize text-sm">{source.source}</span>
              <span className="text-sm font-bold">{source.rating.toFixed(1)} ★</span>
            </div>
            
            {/* Rating bar */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all"
                  style={{ width: `${(source.rating / 5) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 w-20 text-right">
                {source.reviewCount} reviews
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
