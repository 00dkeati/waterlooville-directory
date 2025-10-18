import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  try {
    // Using NewsAPI.org (you'll need to get a free API key from https://newsapi.org/)
    // For now, we'll return curated local news
    
    const localNews = [
      {
        title: "Best Carpenters & Joiners in Waterlooville - Expert Woodwork Services",
        description: "Discover Waterlooville's most skilled craftsmen with perfect ratings. From bespoke furniture to major extensions, featuring top-rated carpenters with decades of experience.",
        url: "/carpenters",
        publishedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        source: "Waterlooville Directory"
      },
      {
        title: "Waterlooville Shopping Guide - Find All Local Shops",
        description: "Discover all the shops in Waterlooville including Sainsburys, ASDA, Waitrose, M&S, Argos and more at the retail park and town centre.",
        url: "/w/waterlooville-shops",
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        source: "Waterlooville Directory"
      },
      {
        title: "Best Restaurants in Waterlooville - Complete Dining Guide",
        description: "Find the best restaurants, cafes, pubs and takeaways in Waterlooville. From Chinese and Indian to fish & chips and more.",
        url: "/w/waterlooville-restaurants",
        publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        source: "Waterlooville Directory"
      },
      {
        title: "Waterlooville Jobs & Vacancies - Employment Opportunities",
        description: "Browse current job vacancies and part-time positions available in Waterlooville. Find your next career opportunity locally.",
        url: "/w/waterlooville-jobs",
        publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        source: "Waterlooville Directory"
      },
      {
        title: "Waterlooville Healthcare Services - Doctors & Dentists",
        description: "Find doctors, dentists, orthodontists, opticians and vets in Waterlooville. Complete healthcare directory.",
        url: "/w/waterlooville-healthcare",
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        source: "Waterlooville Directory"
      },
      {
        title: "Local Services in Waterlooville - Tradesmen & Professionals",
        description: "Find hairdressers, barbers, garages, taxis and all local services in Waterlooville. Professional tradesmen directory.",
        url: "/w/waterlooville-services",
        publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
        source: "Waterlooville Directory"
      }
    ]

    // If you want to use real news API, uncomment this:
    /*
    const apiKey = process.env.NEWS_API_KEY
    if (apiKey) {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=Waterlooville OR Portsmouth OR Hampshire&language=en&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`,
        { next: { revalidate: 3600 } }
      )
      
      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({ articles: data.articles })
      }
    }
    */

    return NextResponse.json({ 
      articles: localNews,
      cached: true,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({ 
      articles: [],
      error: 'Failed to fetch news' 
    }, { status: 500 })
  }
}

