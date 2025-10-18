import { NextResponse } from 'next/server'
import { getAreas } from '@/lib/db'

export async function GET() {
  try {
    const areas = await getAreas()
    return NextResponse.json(areas)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
