import type { SiteConfig } from "@/lib/wordpress";

interface JsonLdProps {
  siteConfig: SiteConfig;
}

export default function JsonLd({ siteConfig }: JsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: siteConfig.businessName,
    description: siteConfig.description,
    url: "https://llcouverture.com",
    telephone: siteConfig.phoneRaw,
    email: siteConfig.email,
    image: "https://llcouverture.com/images/og-image.jpg",
    logo: "https://llcouverture.com/images/logo.png",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressRegion: siteConfig.address.region,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Pontoise" },
      { "@type": "City", name: "Cergy" },
      { "@type": "City", name: "Osny" },
      { "@type": "City", name: "Saint-Ouen-l'Aumône" },
      { "@type": "City", name: "Auvers-sur-Oise" },
      { "@type": "City", name: "Éragny" },
      { "@type": "City", name: "Herblay" },
      { "@type": "City", name: "Conflans-Sainte-Honorine" },
      { "@type": "City", name: "Taverny" },
      { "@type": "City", name: "Franconville" },
      { "@type": "City", name: "L'Isle-Adam" },
      { "@type": "City", name: "Beaumont-sur-Oise" },
    ],
    sameAs: [siteConfig.socialLinks.facebook, siteConfig.socialLinks.instagram].filter(url => url && url !== "#"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
      bestRating: "5",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de Couverture",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Zinguerie" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rénovation de Toiture" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Réparation de Fuite en Urgence" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Charpente & Toiture" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rénovation de Rives" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Réparation de Gouttières" } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
