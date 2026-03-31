import type { Metadata } from "next";
import SectionRenderer from "@/components/SectionRenderer";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import {
  getProjects,
  getStats,
  getSiteConfig,
  getPageSections,
} from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Réalisations Toiture Arpajon (91) — Avant / Après",
  description:
    "Découvrez nos réalisations de couverture, charpente et toiture à Arpajon (91). Photos avant/après de nos chantiers.",
  alternates: { canonical: "https://llcouverture.com/realisations" },
};

export default async function RealisationsPage() {
  const [projects, stats, siteConfig, sections] = await Promise.all([
    getProjects(),
    getStats(),
    getSiteConfig(),
    getPageSections("realisations"),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://llcouverture.com" },
        { name: "Réalisations", url: "https://llcouverture.com/realisations" },
      ]} />
      <SectionRenderer
        sections={sections}
        sharedData={{ siteConfig, projects, stats }}
      />
    </>
  );
}
