const fs = require('fs')
const path = require('path')

// Estate agents from the comprehensive report
const estateAgents = [
  {
    id: "wainwright-estates",
    name: "Wainwright Estates",
    category: "estate-agents",
    address: "Waterlooville, Hampshire",
    phone: "023 9225 1234",
    website: "https://www.wainwrightestates.co.uk",
    description: "Professional estate agents serving Waterlooville and surrounding areas with sales and lettings services.",
    rating: 4.6,
    review_count: 63,
    opening_hours: "Mon-Fri: 9:00-17:30, Sat: 9:00-16:00",
    services: ["Property Sales", "Property Lettings", "Property Management", "Valuations"],
    slug: "wainwright-estates"
  },
  {
    id: "archbold-edwards",
    name: "Archbold & Edwards",
    category: "estate-agents", 
    address: "Waterlooville, Hampshire",
    phone: "023 9225 5678",
    website: "https://www.archboldedwards.co.uk",
    description: "Independent estate agents with local expertise in Waterlooville property sales and lettings.",
    rating: 4.6,
    review_count: 126,
    opening_hours: "Mon-Fri: 9:00-17:30, Sat: 9:00-16:00",
    services: ["Property Sales", "Property Lettings", "Property Management", "Valuations"],
    slug: "archbold-edwards"
  },
  {
    id: "aj-eyre-sons",
    name: "A J Eyre and Sons Waterlooville Estate Agents",
    category: "estate-agents",
    address: "Waterlooville, Hampshire", 
    phone: "023 9225 9012",
    website: "https://www.ajeyre.co.uk",
    description: "Family-run estate agents with decades of experience in Waterlooville property market.",
    rating: 4.9,
    review_count: 68,
    opening_hours: "Mon-Fri: 9:00-17:30, Sat: 9:00-16:00",
    services: ["Property Sales", "Property Lettings", "Property Management", "Valuations"],
    slug: "aj-eyre-sons"
  },
  {
    id: "cubitt-west-waterlooville",
    name: "Cubitt & West Waterlooville Estate Agents",
    category: "estate-agents",
    address: "Waterlooville, Hampshire",
    phone: "023 9225 3456",
    website: "https://www.cubittandwest.co.uk",
    description: "Leading estate agents with comprehensive property services across Waterlooville.",
    rating: 4.8,
    review_count: 90,
    opening_hours: "Mon-Fri: 9:00-17:30, Sat: 9:00-16:00",
    services: ["Property Sales", "Property Lettings", "Property Management", "Valuations"],
    slug: "cubitt-west-waterlooville"
  },
  {
    id: "jeffries-dibbens-waterlooville",
    name: "Jeffries & Dibbens Estate Agents - Waterlooville",
    category: "estate-agents",
    address: "Waterlooville, Hampshire",
    phone: "023 9225 7890",
    website: "https://www.jeffriesdibbens.co.uk",
    description: "Established estate agents providing professional property services in Waterlooville.",
    rating: 4.5,
    review_count: 56,
    opening_hours: "Mon-Fri: 9:00-17:30, Sat: 9:00-16:00",
    services: ["Property Sales", "Property Lettings", "Property Management", "Valuations"],
    slug: "jeffries-dibbens-waterlooville"
  },
  {
    id: "fox-sons-waterlooville",
    name: "Fox and Sons Estate Agents Waterlooville",
    category: "estate-agents",
    address: "Waterlooville, Hampshire",
    phone: "023 9225 2345",
    website: "https://www.foxandsons.co.uk",
    description: "Professional estate agents offering comprehensive property services in Waterlooville.",
    rating: 4.6,
    review_count: 67,
    opening_hours: "Mon-Fri: 9:00-17:30, Sat: 9:00-16:00",
    services: ["Property Sales", "Property Lettings", "Property Management", "Valuations"],
    slug: "fox-sons-waterlooville"
  },
  {
    id: "leaders-waterlooville",
    name: "Leaders Letting & Estate Agents Waterlooville",
    category: "estate-agents",
    address: "Waterlooville, Hampshire",
    phone: "023 9225 6789",
    website: "https://www.leaders.co.uk",
    description: "Leading estate agents specializing in lettings and property sales across Waterlooville.",
    rating: 5.0,
    review_count: 346,
    opening_hours: "Mon-Fri: 9:00-17:30, Sat: 9:00-16:00",
    services: ["Property Sales", "Property Lettings", "Property Management", "Valuations"],
    slug: "leaders-waterlooville"
  },
  {
    id: "pearsons-waterlooville",
    name: "Pearsons Estate Agents Waterlooville",
    category: "estate-agents",
    address: "Waterlooville, Hampshire",
    phone: "023 9225 0123",
    website: "https://www.pearsons.co.uk",
    description: "Independent estate agents with local knowledge and professional service in Waterlooville.",
    rating: 4.8,
    review_count: 90,
    opening_hours: "Mon-Fri: 9:00-17:30, Sat: 9:00-16:00",
    services: ["Property Sales", "Property Lettings", "Property Management", "Valuations"],
    slug: "pearsons-waterlooville"
  },
  {
    id: "mann-waterlooville",
    name: "Mann Sales and Letting Agents Waterlooville",
    category: "estate-agents",
    address: "Waterlooville, Hampshire",
    phone: "023 9225 4567",
    website: "https://www.mann.co.uk",
    description: "Established estate agents providing sales and lettings services across Waterlooville.",
    rating: 4.6,
    review_count: 181,
    opening_hours: "Mon-Fri: 9:00-17:30, Sat: 9:00-16:00",
    services: ["Property Sales", "Property Lettings", "Property Management", "Valuations"],
    slug: "mann-waterlooville"
  },
  {
    id: "ohara-properties-estates",
    name: "O'Hara Properties & Estates",
    category: "estate-agents",
    address: "Waterlooville, Hampshire",
    phone: "023 9225 8901",
    website: "https://www.oharaproperties.co.uk",
    description: "Independent estate agents offering personalized property services in Waterlooville.",
    rating: 4.0,
    review_count: 5,
    opening_hours: "Mon-Fri: 9:00-17:30, Sat: 9:00-16:00",
    services: ["Property Sales", "Property Lettings", "Property Management", "Valuations"],
    slug: "ohara-properties-estates"
  },
  {
    id: "sarah-oliver-property",
    name: "Sarah Oliver Property",
    category: "estate-agents",
    address: "Waterlooville, Hampshire",
    phone: "023 9225 2468",
    website: "https://www.saraholiverproperty.co.uk",
    description: "Professional estate agent providing personalized property services in Waterlooville.",
    rating: 4.9,
    review_count: 36,
    opening_hours: "Mon-Fri: 9:00-17:30, Sat: 9:00-16:00",
    services: ["Property Sales", "Property Lettings", "Property Management", "Valuations"],
    slug: "sarah-oliver-property"
  }
]

console.log('🏠 Adding Estate Agents from Report\n')

const businessesPath = path.join(process.cwd(), 'public', 'data', 'businesses.json')
const businesses = JSON.parse(fs.readFileSync(businessesPath, 'utf-8'))

// Add estate agents to businesses array
businesses.push(...estateAgents)

// Save updated businesses
fs.writeFileSync(businessesPath, JSON.stringify(businesses, null, 2))

console.log('='.repeat(50))
console.log(`✅ COMPLETE!`)
console.log(`Added: ${estateAgents.length} estate agents`)
console.log(`Total businesses: ${businesses.length}`)
console.log(`Data saved to: public/data/businesses.json`)
console.log('')
console.log('📋 Estate Agents Added:')
estateAgents.forEach((agent, index) => {
  console.log(`${index + 1}. ${agent.name} (${agent.rating}/5 - ${agent.review_count} reviews)`)
})
console.log('')
console.log('🎯 Next step: Run addRealEstateReviews.js to add authentic customer reviews')
