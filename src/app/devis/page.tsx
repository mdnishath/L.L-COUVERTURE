import type { Metadata } from "next";
import SectionRenderer from "@/components/SectionRenderer";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { getSiteConfig, getPageSections, getFormConfig } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Devis Gratuit Couverture & Toiture Arpajon (91)",
  description:
    "Demandez votre devis gratuit pour travaux de toiture à Arpajon (91). Réponse sous 24h, sans engagement. ☎ 06 41 26 02 59",
  alternates: { canonical: "https://llcouverture.com/devis" },
};

export default async function DevisPage() {
  const [siteConfig, sections, devisFormConfig] = await Promise.all([
    getSiteConfig(),
    getPageSections("devis"),
    getFormConfig("devis"),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://llcouverture.com" },
        { name: "Devis Gratuit", url: "https://llcouverture.com/devis" },
      ]} />
      <SectionRenderer
        sections={sections}
        sharedData={{ siteConfig, devisFormConfig }}
      />
    </>
  );
}
