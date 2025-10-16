
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Secondary Schools Waterlooville - Waterlooville Directory',
  description: 'Several secondary schools in the Waterlooville area have received 'Good' ratings from Ofsted, indicating a strong commitment to providing quality education. The...',
  keywords: 'secondary schools waterlooville, Waterlooville, Hampshire, local guide, secondary schools waterlooville in Waterlooville',
  openGraph: {
    title: 'Secondary Schools Waterlooville - Waterlooville Directory',
    description: 'Several secondary schools in the Waterlooville area have received 'Good' ratings from Ofsted, indicating a strong commitment to providing quality education. The...',
    type: 'article',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Secondary Schools Waterlooville - Waterlooville Directory',
    description: 'Several secondary schools in the Waterlooville area have received 'Good' ratings from Ofsted, indicating a strong commitment to providing quality education. The...',
  },
}

export default function SecondaryschoolswaterloovillePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Secondary Schools Waterlooville
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Several secondary schools in the Waterlooville area have received 'Good' ratings from Ofsted, indicating a strong commitment to providing quality education. The...
        </p>
        
        {/* Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop"
              alt="secondary schools waterlooville in Waterlooville"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop"
              alt="secondary schools waterlooville in Waterlooville"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: `<h1>Secondary Schools Waterlooville</h1></p><p><strong>Target Keyword:</strong> secondary schools waterlooville</p><h1>Secondary Schools in Waterlooville: A Comprehensive Guide</h1></p><p>Waterlooville, a vibrant town in Hampshire, offers a range of secondary education options for families. Choosing the right school is a crucial decision, and understanding the local landscape can help parents make informed choices. This guide provides an overview of some of the prominent secondary schools in and around Waterlooville, highlighting their Ofsted ratings and key characteristics.</p><h2>Top-Rated Secondary Schools</h2></p><p>Several secondary schools in the Waterlooville area have received 'Good' ratings from Ofsted, indicating a strong commitment to providing quality education. These institutions are known for fostering academic achievement and personal development.</p><p><strong>Crookhorn College:</strong> Located in Waterlooville, Crookhorn College is a coeducational foundation secondary school catering to students aged 11-16. It boasts a 'Good' Ofsted rating, reflecting its dedication to a dynamic and focused learning environment.</p><p><strong>Horndean Technology College:</strong> Situated in nearby Horndean, this secondary school also serves students aged 11-16 and holds a 'Good' Ofsted rating. It is recognized for its technological focus and comprehensive curriculum.</p><p><strong>Purbrook Park School:</strong> Another 'Good' rated secondary school for ages 11-16, Purbrook Park School is committed to providing an engaging and motivating learning environment where pupils can flourish both academically and personally.</p><p><strong>The Cowplain School:</strong> An academy for students aged 11-16, The Cowplain School challenges students to achieve highly, developing them into confident and respectful individuals within a warm and welcoming atmosphere. It also proudly holds a 'Good' Ofsted rating.</p><p><strong>Oaklands Catholic School:</strong> This academy caters to a slightly broader age range of 11-18, offering both secondary education and a sixth form college. With a 'Good' Ofsted rating, Oaklands Catholic School provides a faith-based education emphasizing academic excellence and holistic development.</p><p><strong>Park Community School:</strong> Located in Leigh Park, Havant, this secondary school for 11-16 year olds also has a 'Good' Ofsted rating, focusing on community engagement and student success.</p><h2>Schools Requiring Improvement or Inadequate</h2></p><p>It's also important for parents to be aware of schools that have received lower Ofsted ratings, as this can inform their decision-making process. These schools may be undergoing changes and improvements.</p><p><strong>Warblington School:</strong> This secondary school for 11-16 year olds has an Ofsted rating of 'Requires Improvement'.</p><p><strong>Havant Academy:</strong> Also serving students aged 11-16, Havant Academy currently holds an 'Inadequate' Ofsted rating.</p><h2>Making the Right Choice</h2></p><p>When selecting a secondary school in Waterlooville, it is highly recommended that parents visit prospective schools, attend open days, and speak with staff and students. Factors such as curriculum, extracurricular activities, pastoral care, and school culture should all be considered. Online resources like Locrating.com and the official Ofsted website can provide valuable insights into school performance and inspection reports. Ultimately, the best school is one that aligns with a child's individual needs and aspirations, providing a supportive and stimulating environment for their secondary education journey.` }} />
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
        <p className="font-bold">Looking for secondary schools waterlooville services?</p>
        <p>Browse our directory of local businesses offering secondary schools waterlooville in Waterlooville and surrounding areas.</p>
        <Link 
          href="/search?q=secondary%20schools%20waterlooville" 
          className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Find Local Businesses →
        </Link>
      </div>
    </div>
  )
}
