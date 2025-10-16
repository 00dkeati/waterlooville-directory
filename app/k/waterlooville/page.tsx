import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'waterlooville | Complete Guide to Waterlooville',
  description: 'Everything you need to know about waterlooville. Local information, services, and community updates for Waterlooville residents.',
  keywords: 'waterlooville, waterlooville, hampshire, local information, community',
  openGraph: {
    title: 'waterlooville | Complete Guide to Waterlooville',
    description: 'Everything you need to know about waterlooville. Local information, services, and community updates for Waterlooville residents.',
    url: 'https://waterlooville.co/k/waterlooville',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function WaterloovillePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose prose-lg max-w-none">
        
# waterlooville - Complete Guide

Welcome to our comprehensive guide about waterlooville. Whether you're a local resident or planning to visit Waterlooville, this page provides all the essential information you need.

## About waterlooville

waterlooville is an important part of the Waterlooville community. Located in Hampshire, England, Waterlooville offers a perfect blend of traditional charm and modern convenience.

## Local Information

### Getting Around
Waterlooville is well-connected with excellent transport links:
- **Bus Services**: Regular bus connections to Portsmouth, Havant, and surrounding areas
- **Road Access**: Easy access via A3(M) and local roads
- **Parking**: Multiple car parks available in the town centre

### Local Amenities
The area offers a wide range of facilities and services:
- Shopping centres and retail parks
- Healthcare facilities and medical centres
- Educational institutions and schools
- Recreational facilities and leisure centres

## Community Services

Waterlooville provides excellent community services including:
- Public library with modern facilities
- Community centres hosting various events
- Sports clubs and recreational activities
- Local businesses serving the community

## Find More Information

For the latest updates and comprehensive local information, visit [Waterlooville.co](https://waterlooville.co). Our directory features verified businesses, local news, and community information to help you make the most of living in or visiting Waterlooville.

Discover everything Waterlooville has to offer and connect with your local community today.


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
