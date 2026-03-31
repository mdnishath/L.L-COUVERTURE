import type { Metadata } from "next";
import SectionRenderer from "@/components/SectionRenderer";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { getSiteConfig, getPageSections, getFormConfig } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Contact Couvreur Arpajon — Devis Gratuit",
  description:
    "Contactez votre couvreur à Arpajon (91). Devis gratuit sous 24h. ☎ 06 41 26 02 59. Intervention rapide dans l'Essonne.",
  alternates: { canonical: "https://llcouverture.com/contact" },
};

export default async function ContactPage() {
  const [siteConfig, sections, contactFormConfig] = await Promise.all([
    getSiteConfig(),
    getPageSections("contact"),
    getFormConfig("contact"),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://llcouverture.com" },
        { name: "Contact", url: "https://llcouverture.com/contact" },
      ]} />
      <SectionRenderer
        sections={sections}
        sharedData={{ siteConfig, contactFormConfig }}
      />
    </>
  );
}
