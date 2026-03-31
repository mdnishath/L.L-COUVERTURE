import type { Metadata } from "next";
import SectionRenderer from "@/components/SectionRenderer";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import {
  getServices,
  getSiteConfig,
  getPageSections,
} from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Nos Services de Couverture & Toiture à Arpajon (91)",
  description:
    "Couverture, charpente, zinguerie, isolation et étanchéité à Arpajon (91). Artisan couvreur qualifié. Devis gratuit ☎ 06 41 26 02 59",
  alternates: { canonical: "https://llcouverture.com/services" },
};

export default async function ServicesPage() {
  const [services, siteConfig, sections] = await Promise.all([
    getServices(),
    getSiteConfig(),
    getPageSections("services"),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://llcouverture.com" },
        { name: "Services", url: "https://llcouverture.com/services" },
      ]} />
      <SectionRenderer
        sections={sections}
        sharedData={{ siteConfig, services }}
      />
    </>
  );
}
