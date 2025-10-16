
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Waterlooville Asda - Waterlooville Directory',
  description: 'The Asda Waterlooville Superstore's strategic location on Portland Road makes it easily accessible for shoppers from various parts of Waterlooville and the surr...',
  keywords: 'waterlooville asda, Waterlooville, Hampshire, local guide, waterlooville asda in Waterlooville',
  openGraph: {
    title: 'Waterlooville Asda - Waterlooville Directory',
    description: 'The Asda Waterlooville Superstore's strategic location on Portland Road makes it easily accessible for shoppers from various parts of Waterlooville and the surr...',
    type: 'article',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waterlooville Asda - Waterlooville Directory',
    description: 'The Asda Waterlooville Superstore's strategic location on Portland Road makes it easily accessible for shoppers from various parts of Waterlooville and the surr...',
  },
}

export default function WaterloovilleasdaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Waterlooville Asda
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The Asda Waterlooville Superstore's strategic location on Portland Road makes it easily accessible for shoppers from various parts of Waterlooville and the surr...
        </p>
        
        {/* Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop"
              alt="waterlooville asda in Waterlooville"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop"
              alt="waterlooville asda in Waterlooville"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: `<h1>Waterlooville Asda</h1></p><p><strong>Target Keyword:</strong> waterlooville asda</p><h1>Discover Asda Waterlooville: Your Local Shopping Destination</h1></p><p>For residents and visitors in Waterlooville, Asda stands as a prominent and convenient shopping hub. Located at <strong>Portland Road, Waterlooville, PO7 7XR</strong>, this superstore offers a comprehensive range of products and services designed to meet diverse household needs. Whether you're looking for your weekly groceries, essential household items, or specific departmental offerings, Asda Waterlooville aims to provide a fulfilling shopping experience.</p><h2>Convenient Location and Accessibility</h2></p><p>The Asda Waterlooville Superstore's strategic location on Portland Road makes it easily accessible for shoppers from various parts of Waterlooville and the surrounding areas. Its presence in a well-connected area ensures that customers can reach the store without significant hassle, whether by car or public transport. The store's address, PO7 7XR, is a key identifier for navigation and local searches.</p><h2>Extensive Opening Hours</h2></p><p>Understanding the varied schedules of its customers, Asda Waterlooville maintains extensive opening hours throughout the week. Typically, the store operates from <strong>07:00 to 23:00 on Monday through Friday</strong>, offering ample time for early morning or late evening shopping. On <strong>Saturdays, the hours are generally 07:00 to 22:00</strong>, while <strong>Sundays see operations from 10:00 to 16:00</strong>. It's always advisable to check the official Asda store locator for the most up-to-date opening times, especially during public holidays, to ensure a seamless visit.</p><h2>Departments and Services</h2></p><p>Beyond just groceries, Asda Waterlooville is home to several key departments and services that enhance its appeal as a one-stop shop:</p><li>  <strong>Asda Pharmacy:</strong> Providing essential health services, the in-store pharmacy offers prescription fulfillment, over-the-counter medications, and professional health advice. Services can include contraception services, healthy living advice, screening, and vaccination services. The pharmacy typically operates with slightly different hours than the main store, so it's recommended to verify their specific opening times.</li>
<li>  <strong>George:</strong> For fashion and home goods, the George department within Asda Waterlooville offers a wide selection of clothing for all ages, as well as homeware products. This allows shoppers to combine their grocery run with purchases of apparel or items for their living space.</li>
<li>  <strong>Click & Collect:</strong> For those who prefer the convenience of online shopping, Asda Waterlooville often provides a Click & Collect service, allowing customers to order groceries online and pick them up at a designated time.</li></p><h2>Fuel Station</h2></p><p>Additionally, some Asda locations, including potentially those in the Waterlooville area, may feature an Asda Express Petrol station. For instance, the ASDA Westons Express Petrol is located at 127-129 London Road, Waterlooville PO8 8XJ, offering 24-hour fuel services. While separate from the main superstore, it adds to the overall convenience for local residents.</p><p>In conclusion, Asda Waterlooville serves as a vital retail establishment, providing a broad spectrum of products and services in a convenient and accessible location. Its commitment to extensive opening hours and diverse offerings makes it a go-to destination for many in the community. It is recommended to check the official Asda website or contact the store directly for the most current information regarding specific services and opening hours before your visit.` }} />
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
        <p className="font-bold">Looking for waterlooville asda services?</p>
        <p>Browse our directory of local businesses offering waterlooville asda in Waterlooville and surrounding areas.</p>
        <Link 
          href="/search?q=waterlooville%20asda" 
          className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Find Local Businesses →
        </Link>
      </div>
    </div>
  )
}
