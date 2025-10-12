import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Waterlooville Web Designers & Digital Agencies 2024',
  description: 'Find the best web designers and digital agencies in Waterlooville. Website design, SEO, and digital marketing services.',
  keywords: 'waterlooville web designers, web design waterlooville, digital agency waterlooville',
}

export default function WebDesignersPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8 md:p-12 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">💻</span>
          <h1 className="text-4xl md:text-5xl font-bold">
            Waterlooville Web Designers
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-purple-100">
          Find the best web designers and digital agencies in Waterlooville
        </p>
      </header>

      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Web Design Services in Waterlooville</h2>
        <p className="text-gray-700 mb-4">
          Looking for professional web design, development, or digital marketing services in Waterlooville? 
          Our directory features local web designers and agencies offering a range of services from basic websites 
          to complex e-commerce solutions.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
            <h3 className="font-bold text-purple-900 mb-3">Services Available:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Website Design & Development</li>
              <li>✓ E-commerce Solutions</li>
              <li>✓ SEO & Digital Marketing</li>
              <li>✓ Logo & Branding</li>
              <li>✓ Website Maintenance</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3">Get in Touch:</h3>
            <p className="text-gray-700">
              Contact local web designers through our directory to discuss your project and get quotes.
            </p>
            <Link href="/contact" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

