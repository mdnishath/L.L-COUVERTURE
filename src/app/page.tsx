import SectionRenderer from "@/components/SectionRenderer";
import {
  getSiteConfig,
  getServices,
  getStats,
  getTestimonials,
  getProjects,
  getZones,
  getPageSections,
  getFormConfig,
} from "@/lib/wordpress";

export default async function HomePage() {
  const [siteConfig, services, stats, testimonials, projects, zones, sections, heroQuoteFormConfig] =
    await Promise.all([
      getSiteConfig(),
      getServices(),
      getStats(),
      getTestimonials(),
      getProjects(),
      getZones(),
      getPageSections("home"),
      getFormConfig("hero_quote"),
    ]);

  return (
    <SectionRenderer
      sections={sections}
      sharedData={{ siteConfig, services, stats, testimonials, projects, zones, heroQuoteFormConfig }}
    />
  );
}
