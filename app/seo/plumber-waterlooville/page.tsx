
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Plumber Waterlooville - Waterlooville Directory',
  description: 'Discover the best services and information in Waterlooville, Hampshire.',
  keywords: 'plumber waterlooville, Waterlooville, Hampshire, local guide, plumber waterlooville in Waterlooville',
  openGraph: {
    title: 'Plumber Waterlooville - Waterlooville Directory',
    description: 'Discover the best services and information in Waterlooville, Hampshire.',
    type: 'article',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plumber Waterlooville - Waterlooville Directory',
    description: 'Discover the best services and information in Waterlooville, Hampshire.',
  },
}

export default function PlumberwaterloovillePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Plumber Waterlooville
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Discover the best services and information in Waterlooville, Hampshire.
        </p>
        
        {/* Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=800&h=400&fit=crop"
              alt="plumber waterlooville in Waterlooville"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=400&fit=crop"
              alt="plumber waterlooville in Waterlooville"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: `<h1>Plumber Waterlooville</h1></p><p><strong>Target Keyword:</strong> plumber waterlooville</p><p>When a plumbing emergency strikes in Waterlooville, finding a reliable and efficient plumber is paramount. Whether it's a burst pipe, a stubborn blockage, a faulty boiler, or a complete bathroom renovation, residents of Waterlooville and the surrounding areas need a service they can trust.</p><p>Local plumbing companies in Waterlooville offer a comprehensive range of services designed to meet every need. From routine maintenance and installations to urgent repairs, experienced plumbers are equipped to handle all aspects of domestic and commercial plumbing. Many local providers boast over 30 years of experience, ensuring a professional and knowledgeable approach to every job.</p><p>Emergency plumbing services are a cornerstone of local offerings, with many companies providing 24/7 availability. This means that whether your heating system fails in the dead of night or a leak threatens to cause significant damage, help is just a phone call away. Services often include rapid response times for critical issues like burst pipes, overflowing tanks, and boiler breakdowns. Transparent pricing, including free quotes and no call-out charges, is a common feature among reputable Waterlooville plumbers, with hourly rates typically ranging from £40-£60, though emergency call-outs can be around £110 with higher hourly rates (e.g., £75-£150).</p><p>Beyond emergencies, Waterlooville plumbers are proficient in a wide array of planned services. This includes boiler servicing and installation, underfloor heating, and full refurbishments of bathrooms and kitchens. They can assist with everything from changing a small cloakroom into a shower room to installing efficient new heating systems. Companies like BW Plumbing & Heating Ltd and Linkhorn PHL highlight their expertise in both modern bathroom designs and efficient heating solutions.</p><p>Choosing a local plumber in Waterlooville means benefiting from a friendly, professional service that understands the specific needs of the community. Companies such as Horndean Plumbing & Heating Services extend their reach to Portsmouth and Havant, catering to both domestic and business customers. With a focus on quality workmanship and customer satisfaction, Waterlooville plumbers are dedicated to resolving your plumbing issues effectively and efficiently, ensuring peace of mind for homeowners and businesses alike.` }} />
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
        <p className="font-bold">Looking for plumber waterlooville services?</p>
        <p>Browse our directory of local businesses offering plumber waterlooville in Waterlooville and surrounding areas.</p>
        <Link 
          href="/search?q=plumber%20waterlooville" 
          className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Find Local Businesses →
        </Link>
      </div>
    </div>
  )
}
