import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

// This would integrate with actual review APIs in production
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const businessId = searchParams.get('businessId')
  
  if (!businessId) {
    return NextResponse.json({ error: 'Business ID required' }, { status: 400 })
  }

  // TODO: In production, fetch from:
  // - Google Places API
  // - Trustpilot API
  // - Facebook Graph API
  // - Yell API
  // - Checkatrade API
  
  // For now, return static data
  const reviewSources = await import('@/public/data/review-sources.json')
  const sources = (reviewSources.default as any)[businessId] || []
  
  return NextResponse.json({ sources })
}
