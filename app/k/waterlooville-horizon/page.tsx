import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'waterlooville horizon | Business Information & Contact Details',
  description: 'Find detailed information about waterlooville horizon. Contact details, services, reviews, and location information for this Waterlooville business.',
  keywords: 'waterlooville horizon, waterlooville, hampshire, local information, community',
  openGraph: {
    title: 'waterlooville horizon | Business Information & Contact Details',
    description: 'Find detailed information about waterlooville horizon. Contact details, services, reviews, and location information for this Waterlooville business.',
    url: 'https://waterlooville.co/k/waterlooville-horizon',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function WaterloovillehorizonPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose prose-lg max-w-none">
        
# waterlooville horizon - Business Information

Discover everything you need to know about waterlooville horizon, a valued business serving the Waterlooville community.

## About waterlooville horizon

waterlooville horizon is an established business in Waterlooville, providing quality services to local residents and visitors. With a commitment to customer satisfaction and community involvement, this business has become an integral part of the local area.

## Services Offered

waterlooville horizon offers a range of services designed to meet the needs of the Waterlooville community:

- Professional service delivery
- Local expertise and knowledge
- Customer-focused approach
- Community involvement

## Why Choose waterlooville horizon?

### Local Knowledge
- Deep understanding of Waterlooville area
- Established relationships with local customers
- Community-focused business practices

### Quality Service
- Professional standards maintained
- Customer satisfaction prioritised
- Reliable and trustworthy service

### Convenient Location
- Easily accessible in Waterlooville
- Good transport links
- Local parking available

## Customer Reviews

Customers consistently praise waterlooville horizon for:
- Professional service delivery
- Friendly and helpful staff
- Competitive pricing
- Reliable service

## Contact Information

For more information about waterlooville horizon:
- Visit their location in Waterlooville
- Check their website for latest updates
- Contact them directly for specific inquiries

## Supporting Local Business

Choosing waterlooville horizon means supporting the local Waterlooville economy. Local businesses like this one:
- Keep money in the local community
- Provide local employment opportunities
- Contribute to the area's character and identity
- Support other local businesses

## Find More Local Businesses

Discover other excellent businesses in Waterlooville by visiting [Waterlooville.co](https://waterlooville.co). Our comprehensive directory features verified local businesses with reviews, contact information, and detailed service descriptions.

Support your local community by choosing Waterlooville businesses for your needs.


## Local Businesses in Waterlooville

Waterlooville is home to many excellent local businesses:

- **Number 73 Bar and Kitchen** - restaurants (4.6/5 stars, 419 reviews)
- **The Bird in Hand** - pubs (4.3/5 stars, 1164 reviews)
- **The Exchange** - restaurants (4.4/5 stars, 127 reviews)

For a complete directory of local businesses, visit [Waterlooville.co](https://waterlooville.co).

      </div>
      
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">More Waterlooville Information</h2>
        <p className="text-gray-700 mb-4">
          Discover more about Waterlooville and connect with your local community.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link 
            href="/" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/categories" 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Business Directory
          </Link>
          <Link 
            href="/areas" 
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Local Areas
          </Link>
        </div>
      </div>
    </div>
  )
}
