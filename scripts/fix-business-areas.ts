import fs from 'fs'
import path from 'path'

async function fixBusinessAreas() {
  try {
    console.log('🔧 Fixing business areas to Waterlooville only...')
    
    // Read the businesses.json file
    const businessesPath = path.join(process.cwd(), 'public', 'data', 'businesses.json')
    const businessesData = JSON.parse(fs.readFileSync(businessesPath, 'utf8'))
    
    // Find all businesses that were added in the recent population (they have 'new-' in their ID)
    const newBusinesses = businessesData.filter(business => business.id.startsWith('new-'))
    
    console.log(`Found ${newBusinesses.length} businesses to fix`)
    
    // Update each business to be Waterlooville only
    const updatedBusinesses = businessesData.map(business => {
      if (business.id.startsWith('new-')) {
        // Update area to waterlooville
        business.area = 'waterlooville'
        
        // Update address to be Waterlooville specific
        if (business.address.includes('Waterlooville')) {
          // Address already includes Waterlooville, keep it
          return business
        } else {
          // Add Waterlooville to the address
          business.address = `${business.address}, Waterlooville`
        }
        
        // Update postcode to be PO7 (Waterlooville postcode)
        business.postcode = 'PO7 6XX'
        
        console.log(`✅ Fixed: ${business.name} -> Waterlooville`)
      }
      return business
    })
    
    // Write updated data back
    fs.writeFileSync(businessesPath, JSON.stringify(updatedBusinesses, null, 2))
    
    console.log(`\n🎉 Successfully fixed ${newBusinesses.length} businesses to Waterlooville only!`)
    console.log(`📊 Summary:`)
    console.log(`  - Businesses fixed: ${newBusinesses.length}`)
    console.log(`  - All areas set to: waterlooville`)
    console.log(`  - All postcodes set to: PO7 6XX`)
    console.log(`  - All addresses include: Waterlooville`)
    console.log(`📁 Updated: ${businessesPath}`)
    
  } catch (error) {
    console.error('❌ Error fixing business areas:', error)
  }
}

fixBusinessAreas()
