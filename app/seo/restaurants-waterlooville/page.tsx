
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Best Restaurants in Waterlooville - Fine Dining & Casual Eateries',
  description: 'Discover top-rated restaurants in Waterlooville offering fine dining, casual meals, and family-friendly dining. From traditional British cuisine to international flavors.',
  keywords: 'restaurants waterlooville, fine dining waterlooville, casual dining waterlooville, family restaurants waterlooville, Waterlooville food',
  openGraph: {
    title: 'Best Restaurants in Waterlooville - Fine Dining & Casual Eateries',
    description: 'Discover top-rated restaurants in Waterlooville offering fine dining, casual meals, and family-friendly dining. From traditional British cuisine to international flavors.',
    type: 'article',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Restaurants in Waterlooville - Fine Dining & Casual Eateries',
    description: 'Discover top-rated restaurants in Waterlooville offering fine dining, casual meals, and family-friendly dining. From traditional British cuisine to international flavors.',
  },
}

export default function RestaurantswaterloovillePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Restaurants Waterlooville
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Discover the best services and information in Waterlooville, Hampshire.
        </p>
        
        {/* Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop"
              alt="restaurants waterlooville in Waterlooville"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop"
              alt="restaurants waterlooville in Waterlooville"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: `<h1>Restaurants Waterlooville</h1></p><p><strong>Target Keyword:</strong> restaurants waterlooville</p><p>Waterlooville, a charming town in Hampshire, offers a surprisingly diverse and vibrant culinary scene, catering to a wide range of tastes and preferences. Whether you're a local resident or just passing through, you'll find an array of delightful dining options, from traditional British pubs to exotic international eateries.</p><p>Among the top-rated establishments, <strong>Number 73 Bar And Kitchen</strong> stands out with its impressive 4.6-star rating on TripAdvisor. This popular spot is known for its British cuisine and lively bar atmosphere, making it ideal for a casual meal or a celebratory evening. Another local favorite is <strong>Bird in Hand</strong>, also serving British fare with a strong reputation for quality and service, boasting a 4.1-star rating. For those craving something a little different, <strong>Four London Road</strong> offers a blend of bar food and pizza, earning a 4.2-star rating, while <strong>The Bat & Ball</strong> provides an international menu with a 4.2-star rating, ensuring there's something for everyone.</p><p>The culinary landscape of Waterlooville isn't limited to British and international dishes. Indian and Asian cuisines are well-represented by restaurants such as <strong>Shalimar</strong>, <strong>Red Rose Lounge</strong>, <strong>Paprika</strong>, and <strong>Milton Tandoori</strong>, all of which are highly regarded for their authentic flavors and warm hospitality. Chinese and fast-food options are also available, with establishments like <strong>Noodle Bar</strong> and <strong>Lin's Wok</strong> offering quick and delicious meals.</p><p>Beyond these, Waterlooville features a selection of cozy cafes like <strong>The Exchange</strong> and <strong>Cowplain Cafe & Restaurant</strong>, perfect for a relaxed breakfast, brunch, or a coffee break. Many of the local pubs, including <strong>The Red Lion, Chalton</strong>, <strong>George Inn</strong>, and <strong>The Farmer Inn</strong>, also offer extensive menus with classic pub grub and hearty meals, often featuring locally sourced ingredients.</p><p>With such a rich variety of restaurants, Waterlooville truly has a dining experience to suit every occasion and palate. From sophisticated European dishes to comforting British classics and spicy Indian curries, the town's eateries promise memorable culinary adventures.` }} />
      </div>

      {/* Related Links */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore More in Waterlooville</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/categories" className="block bg-white hover:bg-gray-100 p-4 rounded-lg shadow transition-colors">
            <h3 className="text-xl font-bold text-blue-700">Browse Categories</h3>
            <p className="text-gray-600">Discover all business categories in Waterlooville</p>
          </Link>
          <Link href="/areas" className="block bg-white hover:bg-gray-100 p-4 rounded-lg shadow transition-colors">
            <h3 className="text-xl font-bold text-blue-700">Explore Areas</h3>
            <p className="text-gray-600">Find businesses in different areas of Waterlooville</p>
          </Link>
          <Link href="/search" className="block bg-white hover:bg-gray-100 p-4 rounded-lg shadow transition-colors">
            <h3 className="text-xl font-bold text-blue-700">Search Directory</h3>
            <p className="text-gray-600">Search for specific businesses and services</p>
          </Link>
        </div>
      </div>

      {/* Local Business CTA */}
      <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded">
        <p className="font-bold">Looking for restaurants waterlooville services?</p>
        <p>Browse our directory of local businesses offering restaurants waterlooville in Waterlooville and surrounding areas.</p>
        <Link 
          href="/search?q=restaurants%20waterlooville" 
          className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Find Local Businesses →
        </Link>
      </div>
    </div>
  )
}
