export const dynamic = 'force-dynamic'
import { getAreas } from '@/lib/db'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Areas We Cover | Waterlooville Directory',
  description: 'Browse all areas covered by our directory, including Waterlooville, Cowplain, Denmead, and more.',
}

export default async function AreasPage() {
  const areas = await getAreas()

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Areas' }
      ]} />

      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Areas We Cover
          </h1>
          <p className="text-xl text-gray-700">
            Discover local businesses in Waterlooville and all surrounding areas
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => (
            <Link
              key={area.id}
              href={`/area/${area.slug}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {area.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {area.description || `Find local businesses serving ${area.name} and surrounding areas.`}
              </p>
              <div className="text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
                Browse {area.name} →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">About Our Coverage</h3>
          <p className="text-gray-700 leading-relaxed">
            Our directory covers Waterlooville and all surrounding areas in Hampshire. 
            Whether you're in the town center or in one of the nearby villages, 
            you'll find local businesses that serve your area with professional, 
            reliable service.
          </p>
        </div>
      </div>
    </>
  )
}

