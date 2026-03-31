"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTitle from "@/components/ui/SectionTitle";
import type { SectionStyle } from "@/lib/wordpress";

interface TimelineSectionProps {
  content?: Record<string, string | string[]>;
  sectionStyle?: SectionStyle;
}

const timeline = [
  {
    year: "2009",
    title: "Création de l'Entreprise",
    text: "Fondation de L.L COUVERTURE à Arpajon avec une vision claire : offrir un service de couverture d'exception.",
  },
  {
    year: "2013",
    title: "Expansion dans l'Essonne",
    text: "Extension de notre zone d'intervention à l'ensemble du département de l'Essonne (91).",
  },
  {
    year: "2018",
    title: "Certification RGE",
    text: "Obtention de la certification RGE pour les travaux d'isolation et de rénovation énergétique.",
  },
  {
    year: "2024",
    title: "500+ Projets Réalisés",
    text: "Cap symbolique des 500 projets réalisés avec une satisfaction client de 100%.",
  },
];

export default function TimelineSection({ content, sectionStyle }: TimelineSectionProps) {
  const cardShadowClass = sectionStyle?.cardShadow
    ? { none: "shadow-none", sm: "shadow-sm", md: "shadow-md", lg: "shadow-lg", xl: "shadow-xl" }[sectionStyle.cardShadow] || "shadow-md"
    : "shadow-card";

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle
          subtitle={(content?.subtitle as string) || "Notre Parcours"}
          title={(content?.title as string) || "Les Étapes Clés de Notre Histoire"}
          titleColor={sectionStyle?.titleColor}
          titleWeight={sectionStyle?.titleWeight}
          subtitleColor={sectionStyle?.subtitleColor}
          descriptionColor={sectionStyle?.descriptionColor}
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <AnimatedSection
                key={item.year}
                delay={index * 0.15}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <div
                  className={`relative flex items-start gap-6 md:gap-12 ${
                    index % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse md:text-right"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 border-4 border-white shadow-md z-10" />

                  {/* Content */}
                  <div className="ml-16 md:ml-0 md:w-1/2">
                    <div
                      className={`${sectionStyle?.cardBg ? "" : "bg-white"} ${sectionStyle?.cardRadius ? "" : "rounded-xl"} p-6 ${cardShadowClass} ${
                        index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                      }`}
                      style={{
                        ...(sectionStyle?.cardBg ? { backgroundColor: sectionStyle.cardBg } : {}),
                        ...(sectionStyle?.cardRadius ? { borderRadius: sectionStyle.cardRadius } : {}),
                      }}
                    >
                      <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-heading font-bold rounded-full mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-heading font-bold text-dark mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
