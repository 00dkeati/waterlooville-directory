// app/waterlooville-[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Define all your SEO pages with their metadata
const seoPages: Record<string, {
  title: string
  description: string
  h1: string
  content: string
  keywords: string[]
}> = {
  'restaurants': {
    title: 'Waterlooville Restaurants - Best Dining Guide 2025',
    description: 'Discover the best restaurants in Waterlooville. Real reviews, ratings, and our featured restaurant of the week.',
    h1: '🍽️ Waterlooville Restaurants',
    keywords: ['waterlooville restaurants', 'dining waterlooville', 'food waterlooville', 'restaurants PO7', 'restaurants PO8'],
    content: `
      <section class="intro-section">
        <p>Welcome to the most comprehensive guide for restaurants in Waterlooville, Hampshire. Find the best dining experiences, read reviews, and discover new places to eat.</p>
      </section>
      <section>
        <h2>Top Rated Restaurants</h2>
        <p>Our carefully curated list of Waterlooville's finest dining establishments.</p>
      </section>
    `
  },
  'shops': {
    title: 'Waterlooville Shops - Complete Shopping Directory 2025',
    description: 'Find all shops in Waterlooville. From major retailers to local boutiques, discover shopping in PO7 and PO8.',
    h1: '🛍️ Waterlooville Shops',
    keywords: ['waterlooville shops', 'shopping waterlooville', 'retail waterlooville', 'shops PO7', 'shops PO8'],
    content: `
      <section class="intro-section">
        <p>Your complete guide to shopping in Waterlooville. From the Wellington Retail Park to local independent stores.</p>
      </section>
      <section>
        <h2>Popular Shopping Areas</h2>
        <p>Wellington Way, The Precinct, and more shopping destinations.</p>
      </section>
    `
  },
  'dentist': {
    title: 'Waterlooville Dentist - Find NHS & Private Dental Care',
    description: 'Looking for a dentist in Waterlooville? Compare NHS and private dental practices, read reviews, and book appointments.',
    h1: '🦷 Waterlooville Dentist',
    keywords: ['waterlooville dentist', 'dental care waterlooville', 'NHS dentist PO7', 'dentist PO8'],
    content: `
      <section class="intro-section">
        <p>Find trusted dental care in Waterlooville. Compare NHS and private dentists, read patient reviews, and find emergency dental services.</p>
      </section>
      <section>
        <h2>Dental Practices in Waterlooville</h2>
        <p>Comprehensive list of dental services available locally.</p>
      </section>
    `
  },
  'hairdressers': {
    title: 'Waterlooville Hairdressers - Salons & Barbers Guide',
    description: 'Find the best hairdressers in Waterlooville. Compare salons, read reviews, check prices and book appointments.',
    h1: '💇 Waterlooville Hairdressers',
    keywords: ['waterlooville hairdressers', 'hair salons waterlooville', 'barbers waterlooville'],
    content: `
      <section class="intro-section">
        <p>Discover top-rated hairdressers and barbers in Waterlooville. From trendy salons to traditional barber shops.</p>
      </section>
    `
  },
  'gym': {
    title: 'Waterlooville Gym - Fitness Centers & Health Clubs',
    description: 'Find gyms in Waterlooville. Compare membership prices, facilities, classes and opening hours.',
    h1: '💪 Waterlooville Gym',
    keywords: ['waterlooville gym', 'fitness waterlooville', 'health clubs PO7'],
    content: `
      <section class="intro-section">
        <p>Get fit in Waterlooville! Compare local gyms, fitness centers, and health clubs. Find the perfect place for your workout.</p>
      </section>
    `
  },
  'sainsburys': {
    title: 'Sainsburys Waterlooville - Store Info, Hours & Offers',
    description: 'Sainsburys Waterlooville store information. Opening hours, location, services, and current offers.',
    h1: '🛒 Sainsburys Waterlooville',
    keywords: ['sainsburys waterlooville', 'waterlooville sainsburys', 'sainsburys PO7'],
    content: `
      <section class="intro-section">
        <p>Find everything about Sainsburys in Waterlooville including opening times, services, and special offers.</p>
      </section>
    `
  },
  'asda': {
    title: 'ASDA Waterlooville - Superstore Info & Opening Hours',
    description: 'ASDA Waterlooville complete guide. Location, opening hours, services, pharmacy, and George clothing.',
    h1: '🛒 ASDA Waterlooville',
    keywords: ['asda waterlooville', 'waterlooville asda', 'asda PO7'],
    content: `
      <section class="intro-section">
        <p>Your complete guide to ASDA Waterlooville including all departments, services, and facilities.</p>
      </section>
    `
  }
  // Add more pages as needed
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = seoPages[params.slug]
  
  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    }
  }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords.join(', '),
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'website',
      locale: 'en_GB',
      siteName: 'Waterlooville Directory'
    },
    alternates: {
      canonical: `https://www.waterlooville.co/waterlooville-${params.slug}`
    }
  }
}

// The main page component
export default function WaterloovilleSEOPage({ params }: { params: { slug: string } }) {
  const page = seoPages[params.slug]
  
  if (!page) {
    notFound()
  }

  return (
    <div className="seo-page">
      <nav className="breadcrumb">
        <a href="/">Home</a> › <a href="/categories">Directory</a> › {page.h1.replace(/[🍽️🛍️🦷💇💪🛒]/g, '').trim()}
      </nav>
      
      <div className="hero">
        <h1>{page.h1}</h1>
        <p className="subtitle">Your Complete Local Guide - Updated October 2025</p>
      </div>
      
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
      
      <div className="info-grid">
        <div className="info-card">
          <h3>📍 Location</h3>
          <p>Waterlooville, Hampshire PO7/PO8</p>
        </div>
        <div className="info-card">
          <h3>🕐 Updated</h3>
          <p>October 2025</p>
        </div>
        <div className="info-card">
          <h3>📞 Support</h3>
          <p>Local business information</p>
        </div>
      </div>
      
      <section className="cta-section">
        <h2>Add Your Business</h2>
        <p>Are you a local business in Waterlooville? Get listed in our directory today!</p>
      </section>
    </div>
  )
}

// Generate static params for all SEO pages
export async function generateStaticParams() {
  return Object.keys(seoPages).map((slug) => ({
    slug: slug,
  }))
}
