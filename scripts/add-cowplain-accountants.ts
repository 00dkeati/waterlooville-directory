import fs from 'fs'
import path from 'path'

async function addCowplainAccountants() {
  try {
    console.log('🏢 Adding accountants to serve Cowplain area...')
    
    // Read the businesses.json file
    const businessesPath = path.join(process.cwd(), 'public', 'data', 'businesses.json')
    const businessesData = JSON.parse(fs.readFileSync(businessesPath, 'utf8'))
    
    // Find Waterlooville accountants that should also serve Cowplain
    const waterloovilleAccountants = businessesData.filter((business: any) => 
      business.category === 'accountants' && business.area === 'waterlooville'
    )
    
    console.log(`Found ${waterloovilleAccountants.length} Waterlooville accountants`)
    
    // Select top-rated accountants to also serve Cowplain
    const topAccountants = waterloovilleAccountants
      .sort((a: any, b: any) => b.rating - a.rating)
      .slice(0, 8) // Take top 8 accountants
    
    console.log(`\n📋 Adding top ${topAccountants.length} accountants to serve Cowplain:`)
    
    const newCowplainAccountants = topAccountants.map((accountant: any, index: number) => {
      const newId = `cowplain-${accountant.id}-${Date.now()}-${index}`
      const newSlug = `${accountant.slug}-cowplain`
      
      console.log(`  ✅ ${accountant.name} (${accountant.rating}⭐) -> Cowplain`)
      
      return {
        ...accountant,
        id: newId,
        slug: newSlug,
        area: 'cowplain',
        address: accountant.address.replace('Waterlooville', 'Cowplain, Waterlooville'),
        description: `${accountant.description} Serving Cowplain and surrounding areas.`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    })
    
    // Add the new Cowplain accountants to the businesses array
    const updatedBusinesses = [...businessesData, ...newCowplainAccountants]
    
    // Write updated data back
    fs.writeFileSync(businessesPath, JSON.stringify(updatedBusinesses, null, 2))
    
    console.log(`\n✅ Successfully added ${newCowplainAccountants.length} accountants to Cowplain!`)
    console.log(`📁 Updated: ${businessesPath}`)
    console.log(`📊 Total businesses: ${businessesData.length} -> ${updatedBusinesses.length}`)
    
  } catch (error) {
    console.error('❌ Error adding Cowplain accountants:', error)
  }
}

addCowplainAccountants()

