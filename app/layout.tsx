import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.waterlooville.co'),
  title: 'Waterlooville.co - Local News, Business Directory & Community Guide',
  description: 'Your local source for Waterlooville news, business reviews, and community information. Independent journalism for the Waterlooville area.',
  keywords: 'Waterlooville news, local news, Hampshire, business directory, community news, Waterlooville businesses',
  openGraph: {
    title: 'Waterlooville.co - Local News & Business Directory',
    description: 'Independent local news and business directory for Waterlooville, Hampshire',
    url: 'https://www.waterlooville.co',
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
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    <a href="/" className="hover:text-red-600 transition-colors">
                      Waterlooville.co
                    </a>
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">
                    Local News • Business Directory • Community Guide
                  </p>
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
                  <h4 className="text-md font-semibold mb-4">Popular Categories</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><a href="/plumbers" className="hover:text-white transition-colors">Plumbers</a></li>
                    <li><a href="/cafes" className="hover:text-white transition-colors">Cafes</a></li>
                    <li><a href="/restaurants" className="hover:text-white transition-colors">Restaurants</a></li>
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

