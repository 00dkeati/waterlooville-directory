import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://waterloovilledirectory.co.uk'),
  title: 'Waterlooville Directory - Find Local Businesses',
  description: 'Discover the best local businesses in Waterlooville and surrounding areas. From plumbers to cafes, find what you need with our comprehensive directory.',
  keywords: 'Waterlooville, local businesses, directory, Hampshire, Cowplain, Denmead',
  openGraph: {
    title: 'Waterlooville Directory',
    description: 'Find the best local businesses in Waterlooville and surrounding areas',
    url: 'https://waterloovilledirectory.co.uk',
    siteName: 'Waterlooville Directory',
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
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    <a href="/" className="hover:text-blue-600 transition-colors">
                      Waterlooville Directory
                    </a>
                  </h1>
                  <p className="text-sm text-gray-600">
                    Find the best local businesses in Waterlooville
                  </p>
                </div>
                <nav className="hidden md:flex space-x-6">
                  <a href="/search" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Search
                  </a>
                  <a href="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Categories
                  </a>
                  <a href="/areas" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Areas
                  </a>
                  <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                    About
                  </a>
                </nav>
              </div>
            </div>
          </header>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          
          <footer className="bg-gray-800 text-white py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Waterlooville Directory</h3>
                  <p className="text-gray-300">
                    Your trusted local business directory for Waterlooville and surrounding areas.
                  </p>
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><a href="/categories" className="hover:text-white transition-colors">Browse Categories</a></li>
                    <li><a href="/areas" className="hover:text-white transition-colors">Browse Areas</a></li>
                    <li><a href="/search" className="hover:text-white transition-colors">Search</a></li>
                    <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-4">Popular Categories</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><a href="/plumbers" className="hover:text-white transition-colors">Plumbers</a></li>
                    <li><a href="/cafes" className="hover:text-white transition-colors">Cafes</a></li>
                    <li><a href="/restaurants" className="hover:text-white transition-colors">Restaurants</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                <p>&copy; 2024 Waterlooville Directory. All rights reserved.</p>
                <p className="text-xs text-gray-500 mt-2">Version 2.0 - Updated Design</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

