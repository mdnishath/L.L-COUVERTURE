import type { Metadata } from "next";
import SectionRenderer from "@/components/SectionRenderer";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import {
  getStats,
  getTestimonials,
  getSiteConfig,
  getPageSections,
} from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "À Propos | Couvreur à Pontoise depuis 15 Ans",
  description:
    "L.L COUVERTURE, artisan couvreur à Pontoise (95) depuis 15 ans. Garantie décennale, équipe qualifiée, matériaux de qualité (95).",
  alternates: { canonical: "https://llcouverture.com/a-propos" },
};

export default async function AProposPage() {
  const [stats, testimonials, siteConfig, sections] = await Promise.all([
    getStats(),
    getTestimonials(),
    getSiteConfig(),
    getPageSections("a-propos"),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://llcouverture.com" },
        { name: "À Propos", url: "https://llcouverture.com/a-propos" },
      ]} />
      <SectionRenderer
        sections={sections}
        sharedData={{ siteConfig, stats, testimonials }}
      />
    </>
  );
}
