# Waterlooville Directory

A comprehensive local business directory for Waterlooville and surrounding areas, built with Next.js, TypeScript, and Turso/SQLite.

## Features

- **Dynamic SEO-optimized pages** for categories, areas, and individual businesses
- **Comprehensive database schema** with businesses, categories, and areas
- **Schema.org structured data** for better search engine visibility
- **Responsive design** with Tailwind CSS
- **Automatic sitemap generation**
- **Business import system** from CSV files
- **FAQ sections** with AI-generated content placeholders
- **Related links and internal linking**

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Turso/SQLite
- **Deployment**: Vercel (ready)

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file with:
   ```
   TURSO_DATABASE_URL=file:local.db
   TURSO_AUTH_TOKEN=your_turso_token_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Set up the database**:
   ```bash
   # For local development
   npm run db:push
   
   # Seed with sample data
   npm run db:seed
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── [category]/         # Dynamic category pages
│   ├── [category]/[area]/  # Category + area pages
│   ├── biz/[slug]/         # Individual business pages
│   ├── area/[slug]/        # Area pages
│   ├── categories/         # Categories listing
│   ├── areas/              # Areas listing
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # Robots.txt
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
│   ├── BusinessCard.tsx    # Business listing cards
│   ├── Breadcrumbs.tsx     # Navigation breadcrumbs
│   ├── RelatedLinks.tsx    # Internal linking
│   └── FAQ.tsx             # FAQ accordion
├── lib/
│   └── db.ts              # Database connection and queries
├── scripts/
│   └── importBusinesses.ts # Data import script
├── data/
│   └── businesses.csv     # Sample business data
└── schema.sql             # Database schema
```

## Database Schema

The application uses three main tables:

- **businesses**: Core business information with ratings, contact details, and location
- **categories**: Business categories (plumbers, cafes, etc.)
- **areas**: Geographic areas (Waterlooville, Cowplain, etc.)

## SEO Features

- **Automatic metadata generation** for all pages
- **Schema.org structured data** (ItemList, LocalBusiness)
- **Dynamic sitemap.xml** including all pages
- **Robots.txt** with proper crawling rules
- **Internal linking** between related pages
- **Breadcrumb navigation**
- **FAQ sections** for additional content

## Adding Businesses

### Method 1: CSV Import
1. Create a CSV file in `/data/businesses.csv`
2. Include columns: name, category, area, postcode, address, lat, lng, phone, website, description, opening_hours, rating, review_count, featured
3. Run: `npm run db:seed`

### Method 2: Direct Database
Use the Turso CLI or database tools to insert directly into the businesses table.

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Environment Variables for Production
```
TURSO_DATABASE_URL=your_production_turso_url
TURSO_AUTH_TOKEN=your_production_turso_token
NEXT_PUBLIC_SITE_URL=https://waterloovilledirectory.co.uk
```

## Routes

The application generates thousands of SEO-optimized pages:

- `/` - Homepage
- `/[category]` - e.g., `/plumbers`
- `/[category]/[area]` - e.g., `/plumbers/waterlooville`
- `/biz/[slug]` - Individual business pages
- `/area/[slug]` - Area pages
- `/categories` - Categories listing
- `/areas` - Areas listing

## Customization

### Adding New Categories
Insert into the `categories` table:
```sql
INSERT INTO categories (id, name, slug, description) VALUES 
('cat-new', 'New Category', 'new-category', 'Description here');
```

### Adding New Areas
Insert into the `areas` table:
```sql
INSERT INTO areas (id, name, slug, description) VALUES 
('area-new', 'New Area', 'new-area', 'Description here');
```

## License

This project is created for Waterlooville Directory. All rights reserved.

