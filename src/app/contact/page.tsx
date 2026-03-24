import type { Metadata } from "next";
import SectionRenderer from "@/components/SectionRenderer";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { getSiteConfig, getPageSections, getFormConfig } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Contact Couvreur Pontoise — Devis Gratuit",
  description:
    "Contactez votre couvreur à Pontoise (95). Devis gratuit sous 24h. ☎ 06 41 26 02 59. Intervention rapide (95).",
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
