import fs from 'fs'
import path from 'path'

async function populateNewCategories() {
  try {
    console.log('🚀 Populating new categories with businesses...')
    
    // Read the businesses.json file
    const businessesPath = path.join(process.cwd(), 'public', 'data', 'businesses.json')
    const businessesData = JSON.parse(fs.readFileSync(businessesPath, 'utf8'))
    
    // Define businesses for each new category
    const newBusinesses = [
      // CARPENTERS & JOINERS
      {
        name: 'Waterlooville Carpentry Services',
        slug: 'waterlooville-carpentry-services',
        category: 'carpenters',
        area: 'waterlooville',
        postcode: 'PO7 6XX',
        address: 'Unit 15, Waterlooville Business Park, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1234',
        website: 'https://waterloovillecarpentry.co.uk',
        description: 'Professional carpentry and joinery services for home improvements, bespoke furniture, and construction projects. Over 15 years experience serving Waterlooville and surrounding areas.',
        rating: 4.8,
        review_count: 45,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: false
      },
      {
        name: 'Hampshire Joinery Solutions',
        slug: 'hampshire-joinery-solutions',
        category: 'carpenters',
        area: 'waterlooville',
        postcode: 'PO7 7XX',
        address: '12 Industrial Way, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1235',
        website: 'https://hampshirejoinery.co.uk',
        description: 'Expert joinery services including custom kitchens, wardrobes, and home improvements. Quality craftsmanship with competitive pricing.',
        rating: 4.7,
        review_count: 32,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: false
      },
      
      // ROOFERS
      {
        name: 'Waterlooville Roofing Specialists',
        slug: 'waterlooville-roofing-specialists',
        category: 'roofers',
        area: 'waterlooville',
        postcode: 'PO7 8XX',
        address: '8 Roofing Lane, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1236',
        website: 'https://waterloovilleroofing.co.uk',
        description: 'Professional roofing services including repairs, maintenance, and new installations. Fully insured and certified roofers serving Hampshire.',
        rating: 4.9,
        review_count: 67,
        images: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800'],
        featured: true
      },
      {
        name: 'South Coast Roofing',
        slug: 'south-coast-roofing',
        category: 'roofers',
        area: 'waterlooville',
        postcode: 'PO7 9XX',
        address: '25 Building Heights, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1237',
        website: 'https://southcoastroofing.co.uk',
        description: 'Expert roofing contractors specializing in tile, slate, and flat roof installations. Emergency repairs available.',
        rating: 4.6,
        review_count: 28,
        images: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800'],
        featured: false
      },
      
      // PAINTERS & DECORATORS
      {
        name: 'Waterlooville Paint & Decor',
        slug: 'waterlooville-paint-decor',
        category: 'painters',
        area: 'waterlooville',
        postcode: 'PO8 1XX',
        address: '15 Painters Row, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1238',
        website: 'https://waterloovillepaint.co.uk',
        description: 'Professional painting and decorating services for homes and businesses. Interior and exterior work with premium finishes.',
        rating: 4.8,
        review_count: 52,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: false
      },
      {
        name: 'Hampshire Decorators',
        slug: 'hampshire-decorators',
        category: 'painters',
        area: 'waterlooville',
        postcode: 'PO8 2XX',
        address: '22 Decorator Drive, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1239',
        website: 'https://hampshiredecorators.co.uk',
        description: 'Skilled decorators offering wallpapering, painting, and decorative finishes. Free quotes and competitive pricing.',
        rating: 4.7,
        review_count: 41,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: false
      },
      
      // HANDYMAN SERVICES
      {
        name: 'Waterlooville Handyman Services',
        slug: 'waterlooville-handyman-services',
        category: 'handyman',
        area: 'waterlooville',
        postcode: 'PO8 3XX',
        address: '7 Handyman Close, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1240',
        website: 'https://waterloovillehandyman.co.uk',
        description: 'General handyman services for home repairs, maintenance, and small projects. Reliable and professional service.',
        rating: 4.9,
        review_count: 89,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: true
      },
      {
        name: 'Fix-It Handyman',
        slug: 'fix-it-handyman',
        category: 'handyman',
        area: 'waterlooville',
        postcode: 'PO8 4XX',
        address: '18 Repair Road, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1241',
        website: 'https://fixithandyman.co.uk',
        description: 'Professional handyman covering all aspects of home maintenance and repairs. Same-day service available.',
        rating: 4.6,
        review_count: 34,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: false
      },
      
      // HEATING ENGINEERS
      {
        name: 'Waterlooville Heating Solutions',
        slug: 'waterlooville-heating-solutions',
        category: 'heating-engineers',
        area: 'waterlooville',
        postcode: 'PO8 5XX',
        address: '30 Heating Way, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1242',
        website: 'https://waterloovilleheating.co.uk',
        description: 'Expert heating engineers specializing in boiler installation, repair, and maintenance. Gas Safe registered.',
        rating: 4.8,
        review_count: 76,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: true
      },
      {
        name: 'Hampshire Boiler Services',
        slug: 'hampshire-boiler-services',
        category: 'heating-engineers',
        area: 'waterlooville',
        postcode: 'PO8 6XX',
        address: '14 Boiler Street, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1243',
        website: 'https://hampshireboilers.co.uk',
        description: 'Professional boiler installation and repair services. Emergency callouts available 24/7.',
        rating: 4.7,
        review_count: 58,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: false
      },
      
      // LANDSCAPERS & GARDENERS
      {
        name: 'Waterlooville Landscapes',
        slug: 'waterlooville-landscapes',
        category: 'landscapers',
        area: 'waterlooville',
        postcode: 'PO8 7XX',
        address: '25 Garden Lane, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1244',
        website: 'https://waterloovillelandscapes.co.uk',
        description: 'Professional landscaping and garden design services. Creating beautiful outdoor spaces for homes and businesses.',
        rating: 4.9,
        review_count: 63,
        images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'],
        featured: true
      },
      {
        name: 'Green Thumb Gardeners',
        slug: 'green-thumb-gardeners',
        category: 'landscapers',
        area: 'waterlooville',
        postcode: 'PO8 8XX',
        address: '12 Plantation Road, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1245',
        website: 'https://greenthumbgardeners.co.uk',
        description: 'Expert garden maintenance and landscaping services. Regular maintenance packages available.',
        rating: 4.6,
        review_count: 42,
        images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'],
        featured: false
      },
      
      // LOCKSMITHS
      {
        name: 'Waterlooville Locksmiths',
        slug: 'waterlooville-locksmiths',
        category: 'locksmiths',
        area: 'waterlooville',
        postcode: 'PO8 9XX',
        address: '8 Lock Street, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1246',
        website: 'https://waterloovillelocksmiths.co.uk',
        description: 'Emergency locksmith services available 24/7. Lock repairs, replacements, and security upgrades.',
        rating: 4.8,
        review_count: 87,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: true
      },
      {
        name: 'Secure Lock Services',
        slug: 'secure-lock-services',
        category: 'locksmiths',
        area: 'waterlooville',
        postcode: 'PO9 1XX',
        address: '20 Security Close, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1247',
        website: 'https://securelockservices.co.uk',
        description: 'Professional locksmith services for residential and commercial properties. Fast response times.',
        rating: 4.7,
        review_count: 55,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: false
      },
      
      // DOMESTIC CLEANERS
      {
        name: 'Waterlooville Clean Team',
        slug: 'waterlooville-clean-team',
        category: 'domestic-cleaners',
        area: 'waterlooville',
        postcode: 'PO9 2XX',
        address: '15 Clean Street, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1248',
        website: 'https://waterloovillecleanteam.co.uk',
        description: 'Professional domestic cleaning services for homes and offices. Regular cleaning packages available.',
        rating: 4.9,
        review_count: 94,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: true
      },
      {
        name: 'Sparkle Cleaning Services',
        slug: 'sparkle-cleaning-services',
        category: 'domestic-cleaners',
        area: 'waterlooville',
        postcode: 'PO9 3XX',
        address: '22 Sparkle Lane, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1249',
        website: 'https://sparklecleaning.co.uk',
        description: 'Reliable domestic cleaning services with eco-friendly products. Flexible scheduling to suit your needs.',
        rating: 4.7,
        review_count: 68,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: false
      },
      
      // CARPET CLEANING
      {
        name: 'Waterlooville Carpet Care',
        slug: 'waterlooville-carpet-care',
        category: 'carpet-cleaning',
        area: 'waterlooville',
        postcode: 'PO9 4XX',
        address: '18 Carpet Close, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1250',
        website: 'https://waterloovillecarpetcare.co.uk',
        description: 'Professional carpet and upholstery cleaning services. Deep cleaning and stain removal specialists.',
        rating: 4.8,
        review_count: 71,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: true
      },
      {
        name: 'Fresh Carpets',
        slug: 'fresh-carpets',
        category: 'carpet-cleaning',
        area: 'waterlooville',
        postcode: 'PO9 5XX',
        address: '25 Fresh Road, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1251',
        website: 'https://freshcarpets.co.uk',
        description: 'Expert carpet cleaning using advanced equipment and eco-friendly solutions. Same-day service available.',
        rating: 4.6,
        review_count: 46,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: false
      },
      
      // PEST CONTROL
      {
        name: 'Waterlooville Pest Control',
        slug: 'waterlooville-pest-control',
        category: 'pest-control',
        area: 'waterlooville',
        postcode: 'PO9 6XX',
        address: '12 Pest Lane, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1252',
        website: 'https://waterloovillepestcontrol.co.uk',
        description: 'Professional pest control services for residential and commercial properties. Safe and effective treatments.',
        rating: 4.9,
        review_count: 82,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: true
      },
      {
        name: 'Eco Pest Solutions',
        slug: 'eco-pest-solutions',
        category: 'pest-control',
        area: 'waterlooville',
        postcode: 'PO9 7XX',
        address: '30 Eco Street, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1253',
        website: 'https://ecopestsolutions.co.uk',
        description: 'Environmentally friendly pest control solutions. Licensed and insured pest management specialists.',
        rating: 4.7,
        review_count: 59,
        images: ['https://images.unsplash.com/photo-1581578731548-c6d0f3e0c4e8?w=800'],
        featured: false
      },
      
      // DOG WALKERS
      {
        name: 'Waterlooville Dog Walkers',
        slug: 'waterlooville-dog-walkers',
        category: 'dog-walkers',
        area: 'waterlooville',
        postcode: 'PO9 8XX',
        address: '15 Dog Lane, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1254',
        website: 'https://waterloovilledogwalkers.co.uk',
        description: 'Professional dog walking services with experienced and caring walkers. Group and solo walks available.',
        rating: 4.9,
        review_count: 96,
        images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800'],
        featured: true
      },
      {
        name: 'Paws & Stroll',
        slug: 'paws-stroll',
        category: 'dog-walkers',
        area: 'waterlooville',
        postcode: 'PO9 9XX',
        address: '8 Paws Close, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1255',
        website: 'https://pawsandstroll.co.uk',
        description: 'Reliable dog walking and pet care services. Flexible scheduling and personalized care for your pets.',
        rating: 4.8,
        review_count: 73,
        images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800'],
        featured: false
      },
      
      // DOG GROOMERS
      {
        name: 'Waterlooville Dog Grooming',
        slug: 'waterlooville-dog-grooming',
        category: 'dog-groomers',
        area: 'waterlooville',
        postcode: 'PO10 1XX',
        address: '22 Groom Street, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1256',
        website: 'https://waterloovilledoggrooming.co.uk',
        description: 'Professional dog grooming services with experienced groomers. Full grooming packages and nail trimming.',
        rating: 4.8,
        review_count: 85,
        images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800'],
        featured: true
      },
      {
        name: 'Pampered Paws',
        slug: 'pampered-paws',
        category: 'dog-groomers',
        area: 'waterlooville',
        postcode: 'PO10 2XX',
        address: '18 Pamper Lane, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1257',
        website: 'https://pamperedpaws.co.uk',
        description: 'Luxury dog grooming salon offering premium grooming services and spa treatments for dogs.',
        rating: 4.7,
        review_count: 62,
        images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800'],
        featured: false
      },
      
      // PET SHOPS
      {
        name: 'Waterlooville Pet Store',
        slug: 'waterlooville-pet-store',
        category: 'pet-shops',
        area: 'waterlooville',
        postcode: 'PO10 3XX',
        address: '25 Pet Parade, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1258',
        website: 'https://waterloovillepetstore.co.uk',
        description: 'Complete pet supplies store with food, toys, accessories, and expert advice for all pets.',
        rating: 4.6,
        review_count: 48,
        images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800'],
        featured: false
      },
      {
        name: 'Pet Paradise',
        slug: 'pet-paradise',
        category: 'pet-shops',
        area: 'waterlooville',
        postcode: 'PO10 4XX',
        address: '12 Paradise Road, Waterlooville',
        lat: 50.8847,
        lng: -1.0304,
        phone: '023 9200 1259',
        website: 'https://petparadise.co.uk',
        description: 'Family-run pet shop offering quality pet food, supplies, and accessories with friendly service.',
        rating: 4.8,
        review_count: 67,
        images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800'],
        featured: true
      }
    ]
    
    // Add timestamps to new businesses
    const timestampedBusinesses = newBusinesses.map(business => ({
      ...business,
      id: `new-${business.slug}-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))
    
    // Add new businesses to existing data
    const updatedBusinesses = [...businessesData, ...timestampedBusinesses]
    
    // Write updated data back
    fs.writeFileSync(businessesPath, JSON.stringify(updatedBusinesses, null, 2))
    
    console.log(`\n🎉 Successfully added ${timestampedBusinesses.length} businesses to new categories!`)
    console.log(`📊 Summary:`)
    console.log(`  - Businesses added: ${timestampedBusinesses.length}`)
    console.log(`  - Total businesses: ${businessesData.length} -> ${updatedBusinesses.length}`)
    console.log(`  - Categories populated: ${new Set(timestampedBusinesses.map(b => b.category)).size}`)
    console.log(`📁 Updated: ${businessesPath}`)
    
  } catch (error) {
    console.error('❌ Error adding businesses:', error)
  }
}

populateNewCategories()
