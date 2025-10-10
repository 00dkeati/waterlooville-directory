import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Waterlooville Directory | Local Business Directory',
  description: 'Learn about Waterlooville Directory - your trusted local business directory for Waterlooville and surrounding areas in Hampshire.',
}

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[
        { label: 'About' }
      ]} />

      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Waterlooville Directory
          </h1>
          <p className="text-xl text-gray-700">
            Your trusted local business directory for Waterlooville and surrounding areas
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Waterlooville Directory is dedicated to connecting residents and visitors with the best local businesses 
              in Waterlooville and surrounding areas. We believe in supporting the local economy and helping 
              businesses thrive by making them easily discoverable to their community.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our comprehensive directory features businesses across all categories - from essential services like 
              plumbers and electricians to dining, entertainment, and professional services. Each business listing 
              includes detailed information, customer reviews, and contact details to help you make informed decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Comprehensive Listings</h3>
                <p className="text-gray-700">
                  Detailed business profiles with contact information, opening hours, customer reviews, and service descriptions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Local Focus</h3>
                <p className="text-gray-700">
                  We focus exclusively on businesses serving Waterlooville and surrounding areas to ensure local relevance.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Verified Reviews</h3>
                <p className="text-gray-700">
                  All customer reviews are verified to ensure authenticity and help you choose the best businesses.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Easy Navigation</h3>
                <p className="text-gray-700">
                  Browse by category, area, or search for specific services to find exactly what you need.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Coverage Areas</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our directory covers Waterlooville and all surrounding areas including:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {['Waterlooville', 'Cowplain', 'Denmead', 'Purbrook', 'Horndean', 'Clanfield'].map((area) => (
                <div key={area} className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="font-medium text-gray-900">{area}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-700 leading-relaxed">
              Whether you're a long-time resident or new to the area, our directory helps you discover 
              the best local businesses and services available in your neighborhood.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">For Businesses</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you're a local business owner and would like to be featured in our directory, we'd love to hear from you. 
              Our directory helps local businesses reach their community and attract new customers.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We verify all business listings to ensure accuracy and maintain the quality of our directory. 
              Contact us to learn more about listing your business.
            </p>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Have questions about our directory or need help finding a specific business? We're here to help!
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> info@waterloovilledirectory.co.uk</p>
              <p><strong>Website:</strong> waterloovilledirectory.co.uk</p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
