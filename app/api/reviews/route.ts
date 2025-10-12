import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export const dynamic = 'force-dynamic';

interface Review {
  id: string
  businessName: string
  businessSlug: string
  userName: string
  rating: number
  message: string
  createdAt: string
}

// Path to store reviews
const REVIEWS_FILE = join(process.cwd(), 'public', 'data', 'user-reviews.json')

// Get reviews
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const target = searchParams.get('target')
  
  try {
    // Read existing reviews
    let reviews: Review[] = []
    try {
      const data = await readFile(REVIEWS_FILE, 'utf-8')
      reviews = JSON.parse(data)
    } catch (error) {
      // File doesn't exist yet, return empty array
      reviews = []
    }

    // Filter by target if provided
    if (target) {
      reviews = reviews.filter(r => r.businessSlug === target)
    }

    // Sort by date (newest first)
    reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return NextResponse.json({ reviews })
  } catch (error) {
    console.error('Error reading reviews:', error)
    return NextResponse.json({ reviews: [] })
  }
}

// Post new review
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { businessName, businessSlug, userName, rating, message } = body

    // Validation
    if (!businessName || !businessSlug || !userName || !rating || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    if (message.length < 10 || message.length > 500) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 500 characters' },
        { status: 400 }
      )
    }

    // Read existing reviews
    let reviews: Review[] = []
    try {
      const data = await readFile(REVIEWS_FILE, 'utf-8')
      reviews = JSON.parse(data)
    } catch (error) {
      // File doesn't exist yet, create empty array
      reviews = []
    }

    // Create new review
    const newReview: Review = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      businessName,
      businessSlug,
      userName: userName.trim(),
      rating,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    }

    // Add to reviews
    reviews.push(newReview)

    // Write back to file
    await writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf-8')

    return NextResponse.json({ success: true, review: newReview })
  } catch (error) {
    console.error('Error saving review:', error)
    return NextResponse.json(
      { error: 'Failed to save review' },
      { status: 500 }
    )
  }
}
