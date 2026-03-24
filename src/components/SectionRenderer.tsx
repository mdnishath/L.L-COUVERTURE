import type {
  PageSection,
  SiteConfig,
  Service,
  Stat,
  Testimonial,
  Project,
  FormConfig,
  ResponsiveValue,
} from "@/lib/wordpress";
import SectionWrapper from "@/components/ui/SectionWrapper";
import HeroSection from "@/components/sections/HeroSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import StatsCounter from "@/components/sections/StatsCounter";
import AboutSection from "@/components/sections/AboutSection";
import BeforeAfterGallery from "@/components/sections/BeforeAfterGallery";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import ZoneIntervention from "@/components/sections/ZoneIntervention";
import CTABanner from "@/components/sections/CTABanner";
import PageHeader from "@/components/sections/PageHeader";
import ServicesListSection from "@/components/sections/ServicesListSection";
import ValuesGridSection from "@/components/sections/ValuesGridSection";
import TimelineSection from "@/components/sections/TimelineSection";
import ContactInfoSection from "@/components/sections/ContactInfoSection";
import ContactFormSection from "@/components/sections/ContactFormSection";
import DevisFormSection from "@/components/sections/DevisFormSection";
import MapSection from "@/components/sections/MapSection";

export interface SharedData {
  siteConfig: SiteConfig;
  services?: Service[];
  stats?: Stat[];
  testimonials?: Testimonial[];
  projects?: Project[];
  zones?: string[];
  contactFormConfig?: FormConfig | null;
  devisFormConfig?: FormConfig | null;
  heroQuoteFormConfig?: FormConfig | null;
}

// Default responsive font sizes
const defaultTitle: ResponsiveValue = { mobile: "28", tablet: "36", desktop: "42" };
const defaultSubtitle: ResponsiveValue = { mobile: "12", tablet: "13", desktop: "14" };
const defaultDesc: ResponsiveValue = { mobile: "15", tablet: "16", desktop: "18" };
const heroTitle: ResponsiveValue = { mobile: "34", tablet: "44", desktop: "52" };
const heroSubtitle: ResponsiveValue = { mobile: "20", tablet: "24", desktop: "28" };
const heroDesc: ResponsiveValue = { mobile: "16", tablet: "17", desktop: "18" };
const headerTitle: ResponsiveValue = { mobile: "32", tablet: "42", desktop: "52" };
const headerSubtitle: ResponsiveValue = { mobile: "12", tablet: "13", desktop: "14" };
const headerDesc: ResponsiveValue = { mobile: "15", tablet: "17", desktop: "18" };
const ctaTitle: ResponsiveValue = { mobile: "26", tablet: "32", desktop: "40" };
const ctaDesc: ResponsiveValue = { mobile: "15", tablet: "16", desktop: "18" };

// Default styling per section type (matches current Tailwind classes)
const sectionDefaults: Record<
  string,
  {
    bg?: string;
    padding?: string;
    className?: string;
    titleSize?: ResponsiveValue;
    subtitleSize?: ResponsiveValue;
    descSize?: ResponsiveValue;
  }
> = {
  hero: {
    bg: "", padding: "", className: "relative overflow-hidden",
    titleSize: heroTitle, subtitleSize: heroSubtitle, descSize: heroDesc,
  },
  page_header: {
    bg: "bg-dark", padding: "py-20 lg:py-28", className: "relative overflow-hidden",
    titleSize: headerTitle, subtitleSize: headerSubtitle, descSize: headerDesc,
  },
  services_grid: {
    bg: "bg-white", padding: "py-20 lg:py-28",
    titleSize: defaultTitle, subtitleSize: defaultSubtitle, descSize: defaultDesc,
  },
  stats_counter: {
    bg: "bg-primary", padding: "py-16 lg:py-20", className: "relative overflow-hidden",
  },
  about: {
    bg: "bg-gray-50", padding: "py-20 lg:py-28", className: "pattern-bg",
    titleSize: defaultTitle, subtitleSize: defaultSubtitle, descSize: defaultDesc,
  },
  before_after: {
    bg: "bg-gray-50", padding: "py-20 lg:py-28",
    titleSize: defaultTitle, subtitleSize: defaultSubtitle, descSize: defaultDesc,
  },
  testimonials: {
    bg: "bg-white", padding: "py-20 lg:py-28",
    titleSize: defaultTitle, subtitleSize: defaultSubtitle, descSize: defaultDesc,
  },
  zone_intervention: {
    bg: "bg-gray-50", padding: "py-20 lg:py-28",
    titleSize: defaultTitle, subtitleSize: defaultSubtitle, descSize: defaultDesc,
  },
  cta_banner: {
    bg: "", padding: "", className: "relative overflow-hidden",
    titleSize: ctaTitle, descSize: ctaDesc,
  },
  values_grid: {
    bg: "bg-gray-50", padding: "py-20 lg:py-28",
    titleSize: defaultTitle, subtitleSize: defaultSubtitle, descSize: defaultDesc,
  },
  timeline: {
    bg: "", padding: "py-20 lg:py-28",
    titleSize: defaultTitle, subtitleSize: defaultSubtitle,
  },
  contact_info: { bg: "", padding: "py-20 lg:py-28" },
  contact_form: {
    bg: "", padding: "pb-20 lg:pb-28",
    titleSize: defaultTitle, descSize: defaultDesc,
  },
  devis_form: {
    bg: "", padding: "py-20 lg:py-28",
    titleSize: defaultTitle, descSize: defaultDesc,
  },
  map: { bg: "", padding: "pb-20 lg:pb-28" },
  rich_text: {
    bg: "", padding: "py-20 lg:py-28",
    titleSize: defaultTitle,
  },
  services_list: {
    bg: "", padding: "py-20 lg:py-28",
    titleSize: defaultTitle, subtitleSize: defaultSubtitle, descSize: defaultDesc,
  },
};

function renderSection(
  section: PageSection,
  sharedData: SharedData,
  allSections: PageSection[]
) {
  const { content, style } = section;
  const { siteConfig } = sharedData;

  switch (section.type) {
    case "hero":
      return (
        <HeroSection
          content={content}
          siteConfig={siteConfig}
          formConfig={sharedData.heroQuoteFormConfig}
          sectionStyle={style}
        />
      );
    case "page_header":
      return <PageHeader content={content} sectionStyle={style} />;
    case "services_grid":
      return (
        <ServicesGrid
          content={content}
          services={sharedData.services || []}
          sectionStyle={style}
        />
      );
    case "stats_counter":
      return (
        <StatsCounter
          stats={sharedData.stats || []}
          sectionStyle={style}
        />
      );
    case "about":
      return <AboutSection content={content} sectionStyle={style} />;
    case "before_after":
      return (
        <BeforeAfterGallery
          content={content}
          projects={sharedData.projects || []}
          sectionStyle={style}
        />
      );
    case "testimonials":
      return (
        <TestimonialSlider
          content={content}
          testimonials={sharedData.testimonials || []}
          sectionStyle={style}
        />
      );
    case "zone_intervention":
      return (
        <ZoneIntervention
          content={content}
          zones={sharedData.zones || []}
          siteConfig={siteConfig}
          sectionStyle={style}
        />
      );
    case "cta_banner":
      return (
        <CTABanner
          content={content}
          siteConfig={siteConfig}
          sectionStyle={style}
        />
      );
    case "services_list":
      return (
        <ServicesListSection
          content={content}
          services={sharedData.services || []}
          siteConfig={siteConfig}
          sectionStyle={style}
        />
      );
    case "values_grid":
      return <ValuesGridSection content={content} sectionStyle={style} />;
    case "timeline":
      return <TimelineSection content={content} sectionStyle={style} />;
    case "contact_info":
      return (
        <ContactInfoSection
          siteConfig={siteConfig}
          sectionStyle={style}
        />
      );
    case "contact_form":
      return (
        <ContactFormSection
          content={content}
          siteConfig={siteConfig}
          formConfig={sharedData.contactFormConfig}
          sectionStyle={style}
        />
      );
    case "devis_form": {
      const sidebar = allSections.find((s) => s.type === "devis_sidebar");
      return (
        <DevisFormSection
          content={content}
          siteConfig={siteConfig}
          sidebarContent={sidebar?.content}
          formConfig={sharedData.devisFormConfig}
          sectionStyle={style}
        />
      );
    }
    case "devis_sidebar":
      return null;
    case "map":
      return (
        <MapSection
          content={content}
          siteConfig={siteConfig}
        />
      );
    default:
      return null;
  }
}

interface SectionRendererProps {
  sections: PageSection[];
  sharedData: SharedData;
}

export default function SectionRenderer({
  sections,
  sharedData,
}: SectionRendererProps) {
  return (
    <>
      {sections.map((section, index) => {
        const element = renderSection(section, sharedData, sections);
        if (!element) return null;

        const sectionId = `section-${section.type}-${index}`;
        const defaults = sectionDefaults[section.type] || {};

        return (
          <SectionWrapper
            key={sectionId}
            sectionId={sectionId}
            style={section.style}
            defaultBg={defaults.bg}
            defaultPadding={defaults.padding}
            defaultTitleSize={defaults.titleSize}
            defaultSubtitleSize={defaults.subtitleSize}
            defaultDescSize={defaults.descSize}
            className={defaults.className}
          >
            {element}
          </SectionWrapper>
        );
      })}
    </>
  );
}
