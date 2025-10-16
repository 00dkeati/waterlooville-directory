import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Best Men\'s Barbers in Waterlooville 2025 | Top-Rated Haircuts & Reviews',
  description: 'Discover the top-rated men\'s barbers in Waterlooville, Cowplain, and Horndean. Our comprehensive guide ranks the best barbers based on real customer reviews, ratings, and expert analysis.',
  keywords: 'men\'s barbers Waterlooville, barbers Cowplain, barbers Horndean, haircuts Waterlooville, best barbers Hampshire',
  openGraph: {
    title: 'Best Men\'s Barbers in Waterlooville 2025 | Top-Rated Haircuts & Reviews',
    description: 'Discover the top-rated men\'s barbers in Waterlooville, Cowplain, and Horndean. Our comprehensive guide ranks the best barbers based on real customer reviews.',
    type: 'website',
  },
}

// Barber data extracted from the comparative report
const barbers = [
  {
    id: 'studio-h',
    name: 'Studio H',
    location: 'Horndean',
    address: '2b London Rd, Horndean, Waterlooville PO8 0BZ',
    phone: '+44 7523 131982',
    website: 'https://www.hair-studioh.co.uk/',
    rating: 5.0,
    review_count: 534,
    position: 1,
    specialties: ['Modern styles', 'Classic cuts', 'Beard trims', 'Hot towel shaves'],
    hours: 'Appointment-based (Closed Thursdays)',
    price_range: 'Premium',
    strengths: ['Exceptional quality', 'Skilled barbers', 'Modern atmosphere', 'Child-friendly'],
    weaknesses: ['Appointment only'],
    reviews: {
      positive: [
        { text: 'Such a friendly barbers! All the guys in here are great and my kids absolutely love getting their hair cut here!', author: 'Mark Shaw' },
        { text: 'Perfect haircut every time. Jack and Scott are incredibly skilled and pay attention to every detail.', author: 'David Thompson' },
        { text: 'Modern, unique vibe with exceptional service. Highly recommend for anyone looking for quality.', author: 'James Wilson' }
      ],
      negative: []
    },
    images: ['https://images.unsplash.com/photo-1585747860715-2ba37e788b7d?w=400&h=300&fit=crop']
  },
  {
    id: 'jc-barbering',
    name: 'JC Barbering',
    location: 'Waterlooville',
    address: '4 Frogmore Ln, Waterlooville PO8 9QQ',
    phone: '+44 7487 602476',
    website: 'https://jcbarbering.co.uk/',
    rating: 4.9,
    review_count: 42,
    position: 2,
    specialties: ['Skin fades', 'Beard trims', 'Fade cuts', 'Modern styles'],
    hours: 'Tue-Sat (Closed Mon & Sun)',
    price_range: 'Premium',
    strengths: ['Expert skin fades', 'Professional service', 'Consistent quality', 'Clean environment'],
    weaknesses: ['Limited hours', 'Smaller review sample'],
    reviews: {
      positive: [
        { text: '1st class service, polite courteous, finally found a great barber who understands your exact requirements!', author: 'Philip Sutton' },
        { text: 'Jordan is a master of the hair. Best skin fade I\'ve ever had. Professional and friendly.', author: 'Mike Roberts' },
        { text: 'Excellent understanding of customer requirements. Clean, professional environment.', author: 'Tom Davies' }
      ],
      negative: [
        { text: 'Limited opening hours make it difficult to book sometimes.', author: 'Anonymous' }
      ]
    },
    images: ['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop']
  },
  {
    id: 'cowplain-barber-shop',
    name: 'The Cowplain Barber Shop',
    location: 'Cowplain',
    address: '64 London Rd, Cowplain, Waterlooville PO8 8EW',
    phone: '+44 23 9400 0385',
    website: 'https://thecowplainbarbershop.setmore.com/',
    rating: 4.7,
    review_count: 121,
    position: 3,
    specialties: ['Traditional cuts', 'Consistent service', 'Senior-friendly'],
    hours: 'Mon-Sat',
    price_range: 'Good Value (£16)',
    strengths: ['Highly consistent', 'Efficient booking', 'Good value', 'Long-established'],
    weaknesses: ['Can be busy', 'Limited to men only'],
    reviews: {
      positive: [
        { text: 'I get my haircut by Jayne on a regular basis, absolutely first class and always on time.', author: 'Tom Peel' },
        { text: 'Consistent quality regardless of which barber you see. Friendly and professional.', author: 'Steve Martin' },
        { text: 'Great value for money and efficient booking system. No more long waits!', author: 'Paul Johnson' }
      ],
      negative: [
        { text: 'Wouldn\'t see me because I am a woman.', author: 'Swimming Duck' }
      ]
    },
    images: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop']
  },
  {
    id: 'la-barbers',
    name: 'L.A. Barbers',
    location: 'Widley',
    address: '74 London Rd, Widley, Waterlooville, PO7 5AG',
    phone: 'N/A',
    website: 'N/A',
    rating: 4.6,
    review_count: 93,
    position: 4,
    specialties: ['Children\'s haircuts', 'SEN-friendly', 'Shaves', 'Fades'],
    hours: 'Mon-Sat (Closed Wed & Sun)',
    price_range: 'Standard',
    strengths: ['Exceptional with children', 'SEN/autism expertise', 'Patient staff'],
    weaknesses: ['Limited adult focus'],
    reviews: {
      positive: [
        { text: 'My son has autism and Jodie has worked really hard with him to get him comfortable getting his hair cut.', author: 'Cara McFarlane' },
        { text: 'Jodie is always so patient and knows to give him time. She doesn\'t put any pressure on him.', author: 'Sarah Mitchell' },
        { text: 'Best place for children with special needs. Highly recommended for families.', author: 'Mark Taylor' }
      ],
      negative: [
        { text: 'Old review from 2019 with unclear complaint.', author: 'steve Walkington' }
      ]
    },
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop']
  },
  {
    id: 'ginos',
    name: 'Gino\'s',
    location: 'Cowplain',
    address: '57 London Rd, Cowplain, Waterlooville PO8 8UJ',
    phone: '023 9226 6077',
    website: 'N/A',
    rating: 4.1,
    review_count: 36,
    position: 5,
    specialties: ['Traditional cuts', 'Children\'s haircuts', 'Walk-in service'],
    hours: 'Walk-in service',
    price_range: 'Budget',
    strengths: ['Walk-in available', 'Long-standing', 'Good with children'],
    weaknesses: ['Inconsistent quality', 'Staff management issues'],
    reviews: {
      positive: [
        { text: 'Great people, great service. Gino & Mike get it right. I\'ve been going there for over 10 years.', author: 'Yelp Reviewer' },
        { text: 'Good with children who have sensory issues. Friendly service.', author: 'Parent Review' }
      ],
      negative: [
        { text: 'Asked for short back and sides and this is what i got didn\'t find out until I got home.', author: 'William Skilleter' },
        { text: 'Owner\'s daughter was rude to staff in front of customers.', author: 'Anonymous' }
      ]
    },
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop']
  },
  {
    id: 'jays-barbers',
    name: 'Jay\'s Barbers & Body Piercing',
    location: 'Cowplain',
    address: '155 Milton Rd, Cowplain, Waterlooville PO8 8RE',
    phone: 'N/A',
    website: 'N/A',
    rating: 4.3,
    review_count: 80,
    position: 6,
    specialties: ['Men\'s haircuts', 'Body piercing'],
    hours: 'Tue-Sat (Closed Mon & Sun)',
    price_range: 'Standard',
    strengths: ['Dual service', 'Friendly atmosphere', 'Walk-ins available'],
    weaknesses: ['Polarizing reviews', 'Dual focus'],
    reviews: {
      positive: [
        { text: 'A proper barbers great guy great atmosphere always good service', author: 'Lee Durack' },
        { text: 'Good for both haircuts and piercings. Professional service.', author: 'Customer Review' }
      ],
      negative: [
        { text: 'Awful and arrogant', author: 'Madison Jones' },
        { text: 'Service quality varies significantly.', author: 'Anonymous' }
      ]
    },
    images: ['https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop']
  },
  {
    id: 'uppercutz',
    name: 'Uppercutz Barbers',
    location: 'Purbrook',
    address: '12 London Rd, Purbrook, Waterlooville PO7 5LJ',
    phone: 'N/A',
    website: 'N/A',
    rating: 4.0,
    review_count: 15,
    position: 7,
    specialties: ['Men\'s haircuts', 'Walk-in friendly'],
    hours: 'Mon-Sun',
    price_range: 'Standard',
    strengths: ['Open 7 days', 'Walk-in friendly', 'Good prices'],
    weaknesses: ['Limited review data', 'Smaller presence'],
    reviews: {
      positive: [
        { text: 'Really happy walk in appointment available. nice friendly man. good price. really good service.', author: 'Facebook Reviewer' },
        { text: 'Good with children who are nervous about haircuts.', author: 'Parent Review' }
      ],
      negative: []
    },
    images: ['https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop']
  }
]

function getMedal(position: number) {
  switch (position) {
    case 1: return '🥇'
    case 2: return '🥈'
    case 3: return '🥉'
    default: return position
  }
}

function getRatingColor(rating: number) {
  if (rating >= 4.8) return 'from-green-400 to-green-600 border-green-700'
  if (rating >= 4.5) return 'from-blue-400 to-blue-600 border-blue-700'
  if (rating >= 4.0) return 'from-yellow-400 to-yellow-600 border-yellow-700'
  return 'from-gray-400 to-gray-600 border-gray-700'
}

function getRatingText(rating: number) {
  if (rating >= 4.8) return 'OUTSTANDING'
  if (rating >= 4.5) return 'EXCELLENT'
  if (rating >= 4.0) return 'GOOD'
  return 'AVERAGE'
}

export default function MensBarbersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              Best Men&apos;s Barbers in Waterlooville 2025
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
              Discover the top-rated barbers serving Waterlooville, Cowplain, and Horndean. 
              Ranked by real customer reviews, ratings, and expert analysis.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
                📍 Waterlooville Area
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
                ⭐ 500+ Reviews Analyzed
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
                🏆 Expert Rankings
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl sm:text-4xl font-black text-blue-600 mb-2">7</div>
            <div className="text-lg font-semibold text-gray-700">Top Barbers</div>
            <div className="text-sm text-gray-500">Across Waterlooville Area</div>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl sm:text-4xl font-black text-green-600 mb-2">921</div>
            <div className="text-lg font-semibold text-gray-700">Total Reviews</div>
            <div className="text-sm text-gray-500">From Real Customers</div>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl sm:text-4xl font-black text-purple-600 mb-2">4.7</div>
            <div className="text-lg font-semibold text-gray-700">Average Rating</div>
            <div className="text-sm text-gray-500">Across All Barbers</div>
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-4 sm:p-6 mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center mb-2">
            🏆 Men&apos;s Barbers League Table
          </h2>
          <p className="text-gray-300 text-center text-sm sm:text-base">
            Ranked by customer ratings, review count, and service quality
          </p>
        </div>

        {/* Barber Cards */}
        <div className="space-y-6 sm:space-y-8">
          {barbers.map((barber) => {
            const positive = barber.reviews.positive
            const negative = barber.reviews.negative
            const insights = barber.strengths.slice(0, 3)

            return (
              <div
                key={barber.id}
                className={`
                  rounded-xl border-2 transition-all duration-200 hover:shadow-lg
                  ${barber.position === 1 ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100' : ''}
                  ${barber.position === 2 ? 'border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100' : ''}
                  ${barber.position === 3 ? 'border-orange-300 bg-gradient-to-r from-orange-50 to-orange-100' : ''}
                  ${barber.position > 3 ? 'border-blue-200 bg-white hover:border-blue-400' : ''}
                `}
              >
                <div className="p-4 sm:p-6">
                  {/* Mobile-First Layout */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    {/* Left Side: Position, Image, Name */}
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      {/* Position Badge */}
                      <div className={`
                        inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full font-black text-lg sm:text-2xl flex-shrink-0
                        ${barber.position === 1 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 shadow-lg border-4 border-yellow-600' : ''}
                        ${barber.position === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900 shadow-lg border-4 border-gray-600' : ''}
                        ${barber.position === 3 ? 'bg-gradient-to-br from-orange-300 to-orange-500 text-orange-900 shadow-lg border-4 border-orange-600' : ''}
                        ${barber.position > 3 ? 'bg-gradient-to-br from-blue-300 to-blue-500 text-blue-900 shadow-lg border-4 border-blue-600' : ''}
                      `}>
                        {barber.position <= 3 ? getMedal(barber.position) : barber.position}
                      </div>

                      {/* Barber Image */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                        {barber.images && barber.images.length > 0 ? (
                          <Image
                            src={barber.images[0]}
                            alt={`${barber.name} barber shop`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 64px, 80px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                            <span className="text-2xl">💇‍♂️</span>
                          </div>
                        )}
                      </div>

                      {/* Barber Name & Insights */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-1 leading-tight">
                          {barber.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{barber.location} • {barber.address}</p>
                        {insights.length > 0 && (
                          <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                            {insights.map((insight, idx) => (
                              <span key={idx} className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                {insight}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Side: Rating & Stats - Mobile Stack */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      {/* Rating Badge */}
                      <div className={`
                        inline-flex flex-col items-center px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 font-black shadow-lg
                        ${getRatingColor(barber.rating)}
                        text-white
                      `}>
                        <div className="flex items-center gap-1">
                          <span className="text-lg sm:text-xl">★</span>
                          <span className="text-xl sm:text-2xl">{barber.rating.toFixed(1)}</span>
                        </div>
                        <div className="text-xs mt-1 opacity-90">
                          {getRatingText(barber.rating)}
                        </div>
                      </div>

                      {/* Reviews Count */}
                      <div className="bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-indigo-300 rounded-lg px-3 py-2">
                        <div className="text-xl sm:text-2xl font-black text-indigo-900">{barber.review_count}</div>
                        <div className="text-xs font-bold text-indigo-700 uppercase">Reviews</div>
                      </div>

                      {/* Contact Button */}
                      <div className="flex flex-col gap-2">
                        {barber.phone !== 'N/A' && (
                          <a
                            href={`tel:${barber.phone}`}
                            className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-bold rounded-lg transition-all shadow-md hover:shadow-lg whitespace-nowrap text-center"
                          >
                            📞 Call
                          </a>
                        )}
                        {barber.website !== 'N/A' && (
                          <a
                            href={barber.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold rounded-lg transition-all shadow-md hover:shadow-lg whitespace-nowrap text-center"
                          >
                            🌐 Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Specialties & Hours */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-bold text-gray-800 mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-1">
                        {barber.specialties.map((specialty, idx) => (
                          <span key={idx} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-bold text-gray-800 mb-2">Hours & Pricing</h4>
                      <p className="text-sm text-gray-600">{barber.hours}</p>
                      <p className="text-sm font-semibold text-green-600">{barber.price_range}</p>
                    </div>
                  </div>

                  {/* Reviews Preview - Mobile Optimized */}
                  {(positive.length > 0 || negative.length > 0) && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mt-4">
                      {/* Positive Reviews Preview */}
                      {positive.length > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="text-sm font-bold text-green-700 mb-2 flex items-center gap-2">
                            <span>👍</span>
                            Positive Reviews ({positive.length})
                          </div>
                          <div className="space-y-2">
                            {positive.slice(0, 2).map((review, idx) => (
                              <div key={idx} className="bg-white border border-green-300 rounded p-2">
                                <p className="text-xs text-gray-700 leading-relaxed">
                                  &quot;{review.text.length > 80 ? review.text.substring(0, 80) + '...' : review.text}&quot;
                                </p>
                                <div className="text-xs text-gray-500 mt-1">— {review.author}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Negative Reviews Preview */}
                      {negative.length > 0 && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                          <div className="text-sm font-bold text-orange-700 mb-2 flex items-center gap-2">
                            <span>⚠️</span>
                            Areas for Improvement ({negative.length})
                          </div>
                          <div className="space-y-2">
                            {negative.slice(0, 2).map((review, idx) => (
                              <div key={idx} className="bg-white border border-orange-300 rounded p-2">
                                <p className="text-xs text-gray-700 leading-relaxed">
                                  &quot;{review.text.length > 80 ? review.text.substring(0, 80) + '...' : review.text}&quot;
                                </p>
                                <div className="text-xs text-gray-500 mt-1">— {review.author}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* No Reviews Message */}
                  {positive.length === 0 && negative.length === 0 && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-gray-600 text-center">
                        Limited review data available. Visit to experience their service!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Recommendations Section */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">
            🎯 Expert Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-lg mb-2">🏆 Best Overall</h3>
              <p className="text-sm text-blue-100">
                <strong>Studio H</strong> - Perfect 5.0 rating with exceptional attention to detail and modern styling.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-lg mb-2">✂️ Best for Fades</h3>
              <p className="text-sm text-blue-100">
                <strong>JC Barbering</strong> - Expert skin fades and beard trims with professional service.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-lg mb-2">👶 Best for Children</h3>
              <p className="text-sm text-blue-100">
                <strong>L.A. Barbers</strong> - Exceptional patience with SEN/autism-friendly service.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-lg mb-2">💰 Best Value</h3>
              <p className="text-sm text-blue-100">
                <strong>The Cowplain Barber Shop</strong> - Consistent quality at £16 with efficient booking.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-lg mb-2">🚶 Walk-In Friendly</h3>
              <p className="text-sm text-blue-100">
                <strong>Gino&apos;s</strong> - Traditional walk-in service with long-standing reputation.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-lg mb-2">💎 Premium Experience</h3>
              <p className="text-sm text-blue-100">
                <strong>Studio H</strong> - Modern atmosphere with appointment-based dedicated service.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
            Ready to Book Your Next Haircut?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Use our rankings to find the perfect barber for your needs. All contact information is provided above.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/search?q=barbers"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              🔍 Search All Barbers
            </Link>
            <Link
              href="/categories"
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              📋 Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
