
export async function getBusinesses(categoryOrLimit?: string | number, area?: string): Promise<Business[]> {
  await loadData()
  let businesses = businessesCache!
  
  // If first arg is a string, it's a category filter
  if (typeof categoryOrLimit === 'string') {
    businesses = businesses.filter(b => b.category === categoryOrLimit)
    
    // If area is provided, filter by area too
    if (area) {
      businesses = businesses.filter(b => b.area === area)
    }
  } 
  // If first arg is a number, it's a limit
  else if (typeof categoryOrLimit === 'number') {
    businesses = businesses.slice(0, categoryOrLimit)
  }
  
  return businesses
}
