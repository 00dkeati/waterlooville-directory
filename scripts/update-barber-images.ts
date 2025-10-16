import fs from 'fs'
import path from 'path'

// Barber data from the men's barbers page
const barbers = [
  {
    id: 'studio-h',
    name: 'Studio H',
    location: 'Horndean',
    address: '2b London Rd, Horndean, Waterlooville PO8 0BZ',
    phone: '+44 7523 131982',
    website: 'https://www.hair-studioh.co.uk/',
  },
  {
    id: 'jc-barbering',
    name: 'JC Barbering',
    location: 'Waterlooville',
    address: '4 Frogmore Ln, Waterlooville PO8 9QQ',
    phone: '+44 7487 602476',
    website: 'https://jcbarbering.co.uk/',
  },
  {
    id: 'cowplain-barber-shop',
    name: 'The Cowplain Barber Shop',
    location: 'Cowplain',
    address: 'Cowplain, Waterlooville',
    phone: '+44 2392 123456',
    website: 'https://thecowplainbarbershop.setmore.com/',
  },
  {
    id: 'uppercutz-barbers',
    name: 'Uppercutz Barbers',
    location: 'Waterlooville',
    address: 'Waterlooville',
    phone: '+44 2392 123456',
    website: '',
  },
  {
    id: 'waterlooville-barbers',
    name: 'Waterlooville Barbers',
    location: 'Waterlooville',
    address: '38 Barber Street, Waterlooville',
    phone: '+44 2392 123456',
    website: 'https://waterloovillebarbers.co.uk',
  },
  {
    id: 'premium-barber-shop',
    name: 'Premium Barber Shop',
    location: 'Waterlooville',
    address: 'Waterlooville',
    phone: '+44 2392 123456',
    website: '',
  },
  {
    id: 'classic-cuts-barber',
    name: 'Classic Cuts Barber',
    location: 'Waterlooville',
    address: 'Waterlooville',
    phone: '+44 2392 123456',
    website: '',
  }
]

async function findBarberImages() {
  try {
    // Read the businesses database
    const businessesPath = path.join(process.cwd(), 'public', 'data', 'businesses-lightweight.json')
    const businessesData = JSON.parse(fs.readFileSync(businessesPath, 'utf-8'))
    
    const updatedBarbers = barbers.map(barber => {
      // Try to find matching business in database
      const matchingBusiness = businessesData.find((business: any) => {
        const nameMatch = business.name.toLowerCase().includes(barber.name.toLowerCase()) ||
                         barber.name.toLowerCase().includes(business.name.toLowerCase())
        const addressMatch = business.address && business.address.toLowerCase().includes(barber.location.toLowerCase())
        return nameMatch || addressMatch
      })
      
      if (matchingBusiness && matchingBusiness.images && matchingBusiness.images.length > 0) {
        console.log(`✅ Found images for ${barber.name}:`, matchingBusiness.images[0])
        return {
          ...barber,
          images: matchingBusiness.images
        }
      } else {
        console.log(`❌ No images found for ${barber.name}`)
        // Use a more relevant placeholder image for barbers
        return {
          ...barber,
          images: [`https://images.unsplash.com/photo-1585747860715-2ba37e788b7d?w=400&h=300&fit=crop&q=80`]
        }
      }
    })
    
    return updatedBarbers
  } catch (error) {
    console.error('Error finding barber images:', error)
    return barbers
  }
}

async function updateBarbersPage() {
  console.log('🔍 Finding correct images for barbers...')
  
  const barbersWithImages = await findBarberImages()
  
  // Read the current men's barbers page
  const pagePath = path.join(process.cwd(), 'app', 'mens-barbers', 'page.tsx')
  let pageContent = fs.readFileSync(pagePath, 'utf-8')
  
  // Update each barber's images in the page content
  barbersWithImages.forEach(barber => {
    const oldImagePattern = new RegExp(`id: '${barber.id}'[\\s\\S]*?images: \\[.*?\\]`, 'g')
    const newImageLine = `images: [${barber.images.map(img => `'${img}'`).join(', ')}]`
    
    pageContent = pageContent.replace(oldImagePattern, (match) => {
      return match.replace(/images: \[.*?\]/s, newImageLine)
    })
  })
  
  // Write the updated page
  fs.writeFileSync(pagePath, pageContent)
  
  console.log('✅ Updated men\'s barbers page with correct images')
  console.log('\n📊 Summary:')
  barbersWithImages.forEach(barber => {
    console.log(`- ${barber.name}: ${barber.images.length} image(s)`)
  })
}

// Run the update
updateBarbersPage().catch(console.error)
