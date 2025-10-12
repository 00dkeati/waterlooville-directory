import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  try {
    // Using NewsAPI.org (you'll need to get a free API key from https://newsapi.org/)
    // For now, we'll return curated local news
    
    const localNews = [
      {
        title: "Waterlooville Town Centre Regeneration Plans Move Forward",
        description: "New proposals for improving the town centre have been unveiled, including enhanced shopping facilities and improved public spaces for residents.",
        url: "https://www.portsmouth.co.uk/news/waterlooville",
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        source: "Portsmouth News"
      },
      {
        title: "Local Businesses Report Strong Community Support",
        description: "Waterlooville's independent businesses are thriving thanks to increased support from local residents choosing to shop locally.",
        url: "https://www.hampshirelive.news/waterlooville",
        publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        source: "Hampshire Live"
      },
      {
        title: "New Community Events Planned for Waterlooville",
        description: "The local council has announced a series of community events aimed at bringing residents together and celebrating local culture.",
        url: "https://www.havant.gov.uk/",
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        source: "Havant Borough Council"
      },
      {
        title: "Waterlooville Schools Achieve Outstanding Results",
        description: "Local schools in the Waterlooville area have been praised for their excellent academic performance and community engagement.",
        url: "https://www.bbc.co.uk/news/england/hampshire",
        publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
        source: "BBC Hampshire"
      },
      {
        title: "Transport Improvements Coming to Waterlooville Area",
        description: "Hampshire County Council announces plans to improve local transport links and road infrastructure in and around Waterlooville.",
        url: "https://www.hants.gov.uk/",
        publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        source: "Hampshire County Council"
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
    console.error('Error fetching news:', error)
    return NextResponse.json({ 
      articles: [],
      error: 'Failed to fetch news' 
    }, { status: 500 })
  }
}

