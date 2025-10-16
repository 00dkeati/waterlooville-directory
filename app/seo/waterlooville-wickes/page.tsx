
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Waterlooville Wickes - Waterlooville Directory',
  description: 'Wickes is renowned for its comprehensive selection of trade-quality DIY and home improvement products. At the Waterlooville branch, you\'ll find everything from building materials to tools.',
  keywords: 'waterlooville wickes, Waterlooville, Hampshire, local guide, waterlooville wickes in Waterlooville',
  openGraph: {
    title: 'Waterlooville Wickes - Waterlooville Directory',
    description: 'Wickes is renowned for its comprehensive selection of trade-quality DIY and home improvement products. At the Waterlooville branch, you\'ll find everything from building materials to tools.',
    type: 'article',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waterlooville Wickes - Waterlooville Directory',
    description: 'Wickes is renowned for its comprehensive selection of trade-quality DIY and home improvement products. At the Waterlooville branch, you\'ll find everything from building materials to tools.',
  },
}

export default function WaterloovillewickesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Waterlooville Wickes
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Wickes is renowned for its comprehensive selection of trade-quality DIY and home improvement products. At the Waterlooville branch, you'll find everything from ...
        </p>
        
        {/* Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop"
              alt="waterlooville wickes in Waterlooville"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop"
              alt="waterlooville wickes in Waterlooville"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: `<h1>Waterlooville Wickes</h1></p><p><strong>Target Keyword:</strong> waterlooville wickes</p><h1>Discover Wickes Waterlooville: Your Local Home Improvement Hub</h1></p><p>For residents of Waterlooville and the surrounding Hampshire area, <strong>Wickes Waterlooville</strong> stands as a cornerstone for all home improvement and DIY needs. Conveniently located at Rockville Drive, PO7 7HR, this prominent retailer offers an extensive range of products and services designed to help you transform your living spaces, whether you're embarking on a major renovation or a small weekend project.</p><h2>A Comprehensive Range of Products</h2></p><p>Wickes is renowned for its comprehensive selection of trade-quality DIY and home improvement products. At the Waterlooville branch, you'll find everything from essential building materials like timber and insulation to decorative finishes such as paint, flooring, and tiling. Looking to upgrade your kitchen or bathroom? Wickes Waterlooville boasts a dedicated showroom where you can explore a variety of styles and budgets, supported by experienced kitchen design consultants ready to assist you in bringing your vision to life. The store also stocks a wide array of garden essentials, making it a valuable resource for both indoor and outdoor projects.</p><h2>Services Tailored to Your Needs</h2></p><p>Beyond its impressive product range, Wickes Waterlooville provides a suite of services aimed at simplifying your home improvement journey. These include expert advice from knowledgeable staff, who can guide you through product choices and project planning. For larger undertakings, their kitchen and bathroom design services offer personalized consultations and trusted installer recommendations. Many products are available for in-store collection or rapid home delivery, ensuring you get what you need, when you need it.</p><h2>Why Choose Wickes Waterlooville?</h2></p><p>Choosing Wickes Waterlooville means opting for quality, convenience, and expertise. As part of Wickes Group plc, the second-largest home improvement retailer in the UK, the Waterlooville store upholds a strong reputation for providing reliable products at competitive prices. Whether you are a seasoned trade professional or a first-time DIY enthusiast, the store is equipped to support your ambitions with its vast inventory and customer-focused approach. Its accessible location and commitment to customer satisfaction make it the go-to destination for enhancing your home in the Waterlooville area.</p><p>For more information, visit the official Wickes website or drop by the Rockville Drive store to speak with a member of their team. Your next home improvement project starts here!` }} />
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
        <p className="font-bold">Looking for waterlooville wickes services?</p>
        <p>Browse our directory of local businesses offering waterlooville wickes in Waterlooville and surrounding areas.</p>
        <Link 
          href="/search?q=waterlooville%20wickes" 
          className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Find Local Businesses →
        </Link>
      </div>
    </div>
  )
}
