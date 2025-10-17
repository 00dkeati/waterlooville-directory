import { Business, Article, Category, Area } from './types';
import { getCategories, getAreas as getAreasFromDb, getFeaturedBusinesses as getFeaturedBiz, getBusinessBySlug } from './db';

// Helper function to get business image for an article
async function getArticleBusinessImage(article: any): Promise<string | undefined> {
  try {
    // If article has related businesses, try to get image from first business
    if (article.relatedBusinesses && article.relatedBusinesses.length > 0) {
      const firstBusinessSlug = article.relatedBusinesses[0];
      const business = await getBusinessBySlug(firstBusinessSlug);
      
      if (business && business.images && business.images.length > 0) {
        return business.images[0];
      }
    }

    // If no business image found, use existing heroImage if it's not the generic fallback
    if (article.heroImage && article.heroImage !== 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop') {
      return article.heroImage;
    }

    // Fallback to default image
    return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop';
  } catch (error) {
    console.error('Error getting business image for article:', error);
    return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop';
  }
}

// Get featured article (most recent featured editorial article)
export async function getFeatureArticle(): Promise<Article | null> {
  try {
    const articlesData = await import('@/data/editorial-articles.json');
    const articles: any[] = articlesData.default;
    
    const featured = articles
      .filter(a => a.featured === true)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0];
    
    if (!featured) return null;
    
    // Get business image for the article
    const businessImage = await getArticleBusinessImage(featured);
    
    return {
      slug: featured.slug,
      title: featured.title,
      excerpt: featured.excerpt,
      imageUrl: businessImage,
      publishedAt: featured.publishedAt,
      kicker: featured.category || 'Local Guide',
      category: featured.category,
      author: featured.author,
      featured: featured.featured,
      readTime: featured.readTime
    };
  } catch (error) {
    console.error('Error fetching feature article:', error);
    return null;
  }
}

// Get latest articles
export async function getLatestArticles(n = 9): Promise<Article[]> {
  try {
    const articlesData = await import('@/data/editorial-articles.json');
    const articles: any[] = articlesData.default;
    
    const latestArticles = articles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, n);

    // Get business images for all articles
    const articlesWithImages = await Promise.all(
      latestArticles.map(async (article) => {
        const businessImage = await getArticleBusinessImage(article);
        return {
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          imageUrl: businessImage,
          publishedAt: article.publishedAt,
          kicker: article.category || 'Local News',
          category: article.category,
          author: article.author,
          featured: article.featured,
          readTime: article.readTime
        };
      })
    );
    
    return articlesWithImages;
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }
}

// Get most read articles (simulated by featured + recent)
export async function getMostRead(n = 8): Promise<Article[]> {
  try {
    const articlesData = await import('@/data/editorial-articles.json');
    const articles: any[] = articlesData.default;
    
    // Combine featured and recent articles, prioritize featured
    const featured = articles.filter(a => a.featured === true);
    const recent = articles
      .filter(a => a.featured !== true)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    const combined = [...featured, ...recent].slice(0, n);

    // Get business images for all articles
    const articlesWithImages = await Promise.all(
      combined.map(async (article) => {
        const businessImage = await getArticleBusinessImage(article);
        return {
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          imageUrl: businessImage,
          publishedAt: article.publishedAt,
          kicker: article.category || 'Local News',
          category: article.category,
          author: article.author,
          featured: article.featured,
          readTime: article.readTime
        };
      })
    );
    
    return articlesWithImages;
  } catch (error) {
    console.error('Error fetching most read articles:', error);
    return [];
  }
}

// Get top categories
export async function getTopCategories(n = 12): Promise<Category[]> {
  try {
    const categories = await getCategories();
    
    const categoryIcons: Record<string, string> = {
      'carpenters': '🔨',
      'coffee-shops': '☕',
      'estate-agents': '🏠',
      'web-designers': '💻',
      'restaurants': '🍽️',
      'takeaways': '🍕',
      'hairdressers': '✂️',
      'beauty-salons': '💄',
      'dentists': '🦷',
      'doctors': '👨‍⚕️',
      'vets': '🐕',
      'plumbers': '🔧',
      'electricians': '⚡',
      'handyman': '🛠️',
      'taxi-firms': '🚕',
      'pet-shops': '🐾'
    };
    
    return categories.slice(0, n).map(cat => ({
      slug: cat.slug,
      label: cat.name,
      icon: categoryIcons[cat.slug] || '📍',
      name: cat.name,
      description: cat.description
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Get areas
export async function getAreas(n = 8): Promise<Area[]> {
  try {
    const areas = await getAreasFromDb();
    
    return areas.slice(0, n).map(area => ({
      slug: area.slug,
      label: area.name,
      blurb: area.description,
      name: area.name
    }));
  } catch (error) {
    console.error('Error fetching areas:', error);
    return [];
  }
}

// Get featured businesses
export async function getFeaturedBusinesses(n = 8): Promise<Business[]> {
  try {
    const businesses = await getFeaturedBiz(n);
    
    return businesses.map(business => ({
      slug: business.slug,
      name: business.name,
      imageUrl: business.images?.[0],
      logoUrl: undefined, // Not available in current Business interface
      rating: business.rating,
      reviewCount: business.review_count,
      category: business.category,
      area: business.area,
      shortUSP: business.description?.substring(0, 100) + '...',
      description: business.description,
      phone: business.phone,
      website: business.website,
      address: business.address,
      featured: business.featured
    }));
  } catch (error) {
    console.error('Error fetching featured businesses:', error);
    return [];
  }
}
