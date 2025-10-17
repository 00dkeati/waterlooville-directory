import TopNav from "./(site)/components/TopNav";
import HeroFeature from "./(site)/components/HeroFeature";
import HeroDirectory from "./(site)/components/HeroDirectory";
import TopicStrip from "./(site)/components/TopicStrip";
import Section from "./(site)/components/Section";
import GridTiles from "./(site)/components/GridTiles";
import GridBusinesses from "./(site)/components/GridBusinesses";
import GridNews from "./(site)/components/GridNews";
import MostRead from "./(site)/components/MostRead";
import FooterLinks from "./(site)/components/FooterLinks";
import { getFeatureArticle, getLatestArticles, getMostRead, getTopCategories, getAreas, getFeaturedBusinesses } from "@/lib/data";

export default async function HomePage() {
  const [feature, latest, mostRead, categories, areas, featuredBiz] = await Promise.all([
    getFeatureArticle(),
    getLatestArticles(9),
    getMostRead(8),
    getTopCategories(12),
    getAreas(8),
    getFeaturedBusinesses(8),
  ]);

  const topicTiles = categories.map(c => ({ 
    label: c.label, 
    href: `/${c.slug}`, 
    icon: c.icon,
    blurb: c.description 
  }));

  const areaTiles = areas.map(a => ({ 
    label: a.label, 
    href: `/area/${a.slug}`,
    blurb: a.blurb 
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Waterlooville.co — Local Directory & News",
    "description": "Find trusted local businesses, read the latest news, and discover what's happening in Waterlooville and surrounding areas.",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.waterlooville.co",
    "hasPart": [
      {
        "@type": "ItemList",
        "name": "Business Categories",
        "itemListElement": topicTiles.map((t, i) => ({
          "@type": "ListItem",
          "position": i+1,
          "name": t.label,
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.waterlooville.co"}${t.href}`
        }))
      },
      {
        "@type": "ItemList", 
        "name": "Local Areas",
        "itemListElement": areaTiles.map((a, i) => ({
          "@type": "ListItem",
          "position": i+1,
          "name": a.label,
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.waterlooville.co"}${a.href}`
        }))
      }
    ],
    "mainEntity": featuredBiz.map(business => ({
      "@type": "LocalBusiness",
      "name": business.name,
      "description": business.description,
      "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.waterlooville.co"}/biz/${business.slug}`,
      "telephone": business.phone,
      "address": business.address,
      "aggregateRating": business.rating ? {
        "@type": "AggregateRating",
        "ratingValue": business.rating,
        "reviewCount": business.reviewCount
      } : undefined
    }))
  };

  return (
    <>
      <TopNav />
      <main className="container mx-auto max-w-6xl px-4 py-6">
        {/* Hero Feature Story */}
        {feature && <HeroFeature article={feature} />}
        
        {/* Primary Directory Search */}
        <HeroDirectory />
        
        {/* Topic Strip */}
        <TopicStrip topics={categories} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
          <div className="space-y-12">
            {/* Top Business Categories */}
            <Section title="Top Business Categories" seeAllHref="/categories">
              <GridTiles tiles={topicTiles} />
            </Section>

            {/* Featured Businesses */}
            <Section title="Featured Businesses" seeAllHref="/featured">
              <GridBusinesses items={featuredBiz} />
            </Section>

            {/* Latest Local News */}
            <Section title="Latest Local News" seeAllHref="/editorial">
              <GridNews articles={latest} />
            </Section>

            {/* Browse by Area */}
            <Section title="Browse by Area" seeAllHref="/areas">
              <GridTiles tiles={areaTiles} />
            </Section>
          </div>

          {/* Sidebar */}
          <div className="lg:pl-8">
            <MostRead items={mostRead} />
          </div>
        </div>

        {/* Footer */}
        <FooterLinks />
      </main>

      {/* Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
      />
    </>
  );
}