export default function WaterloovilleSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Waterlooville.co",
    "url": "https://waterlooville.co",
    "description": "Your complete guide to Waterlooville, Hampshire. Local news, business directory, shops, restaurants, services, and community information.",
    "publisher": {
      "@type": "Organization",
      "name": "Waterlooville.co",
      "url": "https://waterlooville.co",
      "logo": {
        "@type": "ImageObject",
        "url": "https://waterlooville.co/logo.png"
      },
      "sameAs": []
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://waterlooville.co/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Waterlooville Business Directory",
    "description": "Comprehensive business directory for Waterlooville, Hampshire",
    "url": "https://waterlooville.co",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Waterlooville",
      "addressRegion": "Hampshire",
      "postalCode": "PO7",
      "addressCountry": "GB"
    },
    "areaServed": {
      "@type": "City",
      "name": "Waterlooville",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Waterlooville",
        "addressRegion": "Hampshire",
        "postalCode": "PO7"
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://waterlooville.co"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}




