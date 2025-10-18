import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search Local Businesses in Waterlooville | Business Directory',
  description: 'Search and find local businesses in Waterlooville, Hampshire. Browse restaurants, shops, services, and more with our comprehensive business directory.',
  keywords: [
    'waterlooville businesses',
    'local search',
    'business directory',
    'waterlooville directory',
    'find businesses waterlooville',
    'search businesses',
    'local services',
    'waterlooville search'
  ],
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
  openGraph: {
    title: 'Search Local Businesses in Waterlooville',
    description: 'Find the perfect local business for your needs in Waterlooville, Hampshire.',
    type: 'website',
    url: 'https://waterlooville.co/search',
    siteName: 'Waterlooville.co',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search Local Businesses in Waterlooville',
    description: 'Find the perfect local business for your needs in Waterlooville, Hampshire.',
  },
  alternates: {
    canonical: 'https://waterlooville.co/search',
  },
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
