interface ServiceJsonLdProps {
  name: string;
  description: string;
  slug: string;
}

export default function ServiceJsonLd({ name, description, slug }: ServiceJsonLdProps) {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name: name,
    description: description,
    url: `https://llcouverture.com/services/${slug}`,
    provider: {
      "@type": "RoofingContractor",
      name: "L.L COUVERTURE",
      telephone: "+33641260259",
      address: {
        "@type": "PostalAddress",
        streetAddress: "77 rue de l'Hermitage",
        addressLocality: "Arpajon",
        postalCode: "91290",
        addressRegion: "Île-de-France",
        addressCountry: "FR",
      },
    },
    areaServed: [
      { "@type": "City", name: "Arpajon" },
      { "@type": "City", name: "Brétigny-sur-Orge" },
      { "@type": "City", name: "Linas" },
      { "@type": "AdministrativeArea", name: "Essonne (91)" },
    ],
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://llcouverture.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://llcouverture.com/services" },
      { "@type": "ListItem", position: 3, name: name, item: `https://llcouverture.com/services/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
