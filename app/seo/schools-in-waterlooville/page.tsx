
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Schools In Waterlooville - Waterlooville Directory',
  description: 'Waterlooville, a vibrant town in Hampshire, offers a diverse range of educational institutions catering to various age groups and learning needs. For parents an...',
  keywords: 'schools in waterlooville, Waterlooville, Hampshire, local guide, schools in waterlooville in Waterlooville',
  openGraph: {
    title: 'Schools In Waterlooville - Waterlooville Directory',
    description: 'Waterlooville, a vibrant town in Hampshire, offers a diverse range of educational institutions catering to various age groups and learning needs. For parents an...',
    type: 'article',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schools In Waterlooville - Waterlooville Directory',
    description: 'Waterlooville, a vibrant town in Hampshire, offers a diverse range of educational institutions catering to various age groups and learning needs. For parents an...',
  },
}

export default function SchoolsinwaterloovillePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Schools In Waterlooville
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Waterlooville, a vibrant town in Hampshire, offers a diverse range of educational institutions catering to various age groups and learning needs. For parents an...
        </p>
        
        {/* Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop"
              alt="schools in waterlooville in Waterlooville"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop"
              alt="schools in waterlooville in Waterlooville"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: `<h1>Schools In Waterlooville</h1></p><p><strong>Target Keyword:</strong> schools in waterlooville</p><h2>Discovering the Best Schools in Waterlooville: A Comprehensive Guide</h2></p><p>Waterlooville, a vibrant town in Hampshire, offers a diverse range of educational institutions catering to various age groups and learning needs. For parents and students seeking quality education, understanding the local school landscape is crucial. This guide provides an overview of some of the prominent schools in and around Waterlooville, highlighting their Ofsted ratings and educational focus.</p><h3>Outstanding Educational Opportunities</h3></p><p>Waterlooville and its surrounding areas boast several schools recognized for their exceptional standards. <strong>Cliffdale Primary Academy</strong>, located in Portsmouth, and <strong>Front Lawn Primary Academy</strong> in Havant, both serve primary-aged children and have achieved 'Outstanding' Ofsted ratings. For older students, <strong>Redwood Park Academy</strong> (special education for 11-16) and <strong>UTC Portsmouth</strong> (14-19 Academy) also stand out with 'Outstanding' ratings, offering specialized learning environments.</p><h3>A Strong Foundation: 'Good' Rated Schools</h3></p><p>The majority of schools in the Waterlooville area are rated 'Good' by Ofsted, indicating a high standard of education and student welfare. These include a mix of primary, secondary, and further education institutions:</p><li>  <strong>Primary Schools</strong>: Many primary schools in Waterlooville and nearby villages hold 'Good' ratings. Examples include <strong>Berewood Primary School</strong>, <strong>Mill Hill Primary School</strong>, <strong>Morelands Primary School</strong>, <strong>Queen’s Inclosure Primary School</strong>, <strong>Springwood Infant School</strong>, and <strong>Springwood Junior School</strong>. These schools provide a solid foundation for younger learners, often with strong community ties.</li></p><li>  <strong>Secondary Schools</strong>: For secondary education, <strong>Crookhorn College</strong>, <strong>Horndean Technology College</strong>, <strong>Oaklands Catholic School</strong>, <strong>Purbrook Park School</strong>, and <strong>The Cowplain School</strong> are all rated 'Good'. These institutions offer comprehensive curricula and prepare students for further education or vocational paths.</li></p><li>  <strong>Special and Independent Schools</strong>: <strong>Bere Clinic School</strong>, <strong>Jubilee School</strong>, <strong>Kingscourt School</strong>, <strong>Rachel Madocks School</strong>, <strong>Riverside Community Special School</strong>, and <strong>The Waterloo School</strong> are examples of 'Good' rated independent or special schools, providing tailored support for specific educational needs.</li></p><li>  <strong>Further Education</strong>: <strong>Havant and South Downs College</strong> (with campuses in Waterlooville and Havant) provides excellent opportunities for post-16 education, also holding a 'Good' rating.</li></p><h3>Schools Requiring Improvement</h3></p><p>While most schools perform well, some are identified as 'Requires Improvement' by Ofsted, such as <strong>Hart Plain Junior School</strong>, <strong>Releasing Potential School</strong>, <strong>Riders Infant School</strong>, <strong>Riders Junior School</strong>, <strong>The Harbour School</strong>, and <strong>Warblington School</strong>. These schools are actively working to enhance their educational provision and student outcomes.</p><h3>Choosing the Right School</h3></p><p>Selecting the right school involves considering various factors beyond Ofsted ratings, such as location, specific programs, extracurricular activities, and school culture. Waterlooville offers a broad spectrum of choices, ensuring that families can find an educational environment that best suits their children's needs and aspirations. Prospective parents are encouraged to visit schools, read detailed reports, and engage with staff to make an informed decision about their child's academic future in Waterlooville.` }} />
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
        <p className="font-bold">Looking for schools in waterlooville services?</p>
        <p>Browse our directory of local businesses offering schools in waterlooville in Waterlooville and surrounding areas.</p>
        <Link 
          href="/search?q=schools%20in%20waterlooville" 
          className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Find Local Businesses →
        </Link>
      </div>
    </div>
  )
}
