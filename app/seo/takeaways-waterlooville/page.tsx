
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Takeaways Waterlooville - Waterlooville Directory',
  description: 'Waterlooville, a vibrant town in Hampshire, offers a diverse and exciting array of takeaway options to satisfy every craving. Whether you're in the mood for a c...',
  keywords: 'takeaways waterlooville, Waterlooville, Hampshire, local guide, takeaways waterlooville in Waterlooville',
  openGraph: {
    title: 'Takeaways Waterlooville - Waterlooville Directory',
    description: 'Waterlooville, a vibrant town in Hampshire, offers a diverse and exciting array of takeaway options to satisfy every craving. Whether you're in the mood for a c...',
    type: 'article',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Takeaways Waterlooville - Waterlooville Directory',
    description: 'Waterlooville, a vibrant town in Hampshire, offers a diverse and exciting array of takeaway options to satisfy every craving. Whether you're in the mood for a c...',
  },
}

export default function TakeawayswaterloovillePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Takeaways Waterlooville
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Waterlooville, a vibrant town in Hampshire, offers a diverse and exciting array of takeaway options to satisfy every craving. Whether you're in the mood for a c...
        </p>
        
        {/* Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=400&fit=crop"
              alt="takeaways waterlooville in Waterlooville"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=400&fit=crop"
              alt="takeaways waterlooville in Waterlooville"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: `<h1>Takeaways Waterlooville</h1></p><p><strong>Target Keyword:</strong> takeaways waterlooville</p><h2>Discover the Culinary Delights of Takeaways in Waterlooville</h2></p><p>Waterlooville, a vibrant town in Hampshire, offers a diverse and exciting array of takeaway options to satisfy every craving. Whether you're in the mood for a classic British chippy, exotic Indian spices, authentic Chinese dishes, or a juicy burger, the local takeaway scene has something for everyone. The convenience of ordering from the comfort of your home has never been easier, with numerous establishments ready to deliver culinary delights right to your doorstep.</p><p>For those who appreciate the rich and aromatic flavors of Indian cuisine, establishments like Shalimar and Red Rose Lounge are highly regarded. These restaurants consistently receive positive reviews for their authentic curries, tandoori specialties, and excellent service, making them a top choice for many residents seeking quality <strong>takeaways Waterlooville</strong>. Similarly, Chinese food enthusiasts can explore options such as Singapore Island, known for its fresh ingredients and extensive menu that caters to various palates.</p><p>Beyond these popular choices, Waterlooville also boasts a variety of other takeaway styles. From traditional fish and chips – a quintessential British treat – to gourmet burgers and pizzas, the selection is vast. Platforms like Havant & Waterlooville Eats, Uber Eats, Just Eat, and Deliveroo facilitate easy ordering and delivery, connecting hungry customers with their favorite local eateries. This robust delivery infrastructure ensures that whether you're planning a quiet night in or feeding the whole family, your meal is just a few clicks away.</p><p>The competitive landscape among <strong>takeaways Waterlooville</strong> means that many establishments strive to offer not only delicious food but also great value and efficient service. Special offers and deals are common, providing an added incentive to explore new places or revisit old favorites. With such a broad spectrum of choices, Waterlooville truly stands out as a hub for convenient and delectable takeaway dining, promising a satisfying experience for all.` }} />
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
        <p className="font-bold">Looking for takeaways waterlooville services?</p>
        <p>Browse our directory of local businesses offering takeaways waterlooville in Waterlooville and surrounding areas.</p>
        <Link 
          href="/search?q=takeaways%20waterlooville" 
          className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Find Local Businesses →
        </Link>
      </div>
    </div>
  )
}
