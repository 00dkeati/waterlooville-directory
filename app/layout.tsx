import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.waterlooville.co'),
  title: {
    default: 'Waterlooville.co — Local Directory & News',
    template: '%s | Waterlooville.co'
  },
  description: 'Find trusted local businesses, read the latest news, and discover what\'s happening in Waterlooville and surrounding areas. Your complete local directory and community guide.',
  keywords: [
    'Waterlooville',
    'Waterlooville Hampshire', 
    'Waterlooville directory',
    'Waterlooville news',
    'Waterlooville businesses',
    'Waterlooville shops',
    'Waterlooville PO7',
    'Waterlooville PO8',
    'local directory',
    'local news',
    'Hampshire',
    'Cowplain',
    'Denmead',
    'Purbrook'
  ],
  authors: [{ name: 'Waterlooville.co Team' }],
  creator: 'Waterlooville.co',
  publisher: 'Waterlooville.co',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.waterlooville.co',
    siteName: 'Waterlooville.co',
    title: 'Waterlooville.co — Local Directory & News',
    description: 'Find trusted local businesses, read the latest news, and discover what\'s happening in Waterlooville and surrounding areas.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Waterlooville.co - Local Directory & News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waterlooville.co — Local Directory & News',
    description: 'Find trusted local businesses, read the latest news, and discover what\'s happening in Waterlooville and surrounding areas.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://www.waterlooville.co',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}

