import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://waterlooville.co'),
  title: 'Waterlooville - Local News, Business Directory & Community Guide',
  description: 'Your complete guide to Waterlooville, Hampshire. Local news, business directory, shops, restaurants, services, and community information for Waterlooville PO7 and PO8.',
  keywords: 'Waterlooville, Waterlooville Hampshire, Waterlooville directory, Waterlooville news, Waterlooville businesses, Waterlooville shops, Waterlooville PO7, Waterlooville PO8, Waterlooville postcode, Waterlooville map, Waterlooville weather, Waterlooville guide, Waterlooville information',
  openGraph: {
    title: 'Waterlooville - Local News, Business Directory & Community Guide',
    description: 'Your complete guide to Waterlooville, Hampshire. Local news, business directory, and community information.',
    url: 'https://waterlooville.co',
    siteName: 'Waterlooville.co',
    locale: 'en_GB',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b-2 border-red-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <Link href="/" className="hover:opacity-80 transition-opacity">
                    <Image 
                      src="/logo.png" 
                      alt="Waterlooville.co - Local News, Business Directory & Community Guide" 
                      width={200}
                      height={60}
                      priority
                      className="h-auto"
                    />
                  </Link>
                </div>
                <nav className="hidden md:flex space-x-6">
                  <a href="/editorial" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                    News
                  </a>
                  <a href="/categories" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                    Directory
                  </a>
                  <a href="/areas" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                    Areas
                  </a>
                  <a href="/about" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                    About
                  </a>
                </nav>
              </div>
            </div>
          </header>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          
          <footer className="bg-gray-900 text-white py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Waterlooville.co</h3>
                  <p className="text-gray-300">
                    Independent local news and business directory for Waterlooville, Hampshire. Your trusted source for local information.
                  </p>
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><a href="/editorial" className="hover:text-white transition-colors">Latest News</a></li>
                    <li><a href="/categories" className="hover:text-white transition-colors">Business Directory</a></li>
                    <li><a href="/areas" className="hover:text-white transition-colors">Areas</a></li>
                    <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-4">Contact Us</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      <a href="mailto:dean@waterlooville.co" className="hover:text-white transition-colors flex items-center">
                        <span className="mr-2">📧</span>
                        dean@waterlooville.co
                      </a>
                    </li>
                    <li><a href="/contact" className="hover:text-white transition-colors">Contact Form</a></li>
                    <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                  </ul>
                </div>
              </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Waterlooville.co. All rights reserved.</p>
            <p className="text-xs text-gray-500 mt-2">Independent Local News • 270+ Verified Businesses • Serving Waterlooville & Surrounding Areas</p>
          </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

