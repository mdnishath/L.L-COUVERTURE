"use client";

import { Target, Heart, Wrench, Leaf } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTitle from "@/components/ui/SectionTitle";
import type { SectionStyle } from "@/lib/wordpress";

interface ValuesGridSectionProps {
  content?: Record<string, string | string[]>;
  sectionStyle?: SectionStyle;
}

const values = [
  {
    icon: Target,
    title: "Excellence",
    text: "Nous visons l'excellence dans chaque projet, du plus petit au plus grand.",
  },
  {
    icon: Heart,
    title: "Passion",
    text: "Notre passion pour le métier se reflète dans la qualité de notre travail.",
  },
  {
    icon: Wrench,
    title: "Expertise",
    text: "15+ années d'expérience et une formation continue de nos équipes.",
  },
  {
    icon: Leaf,
    title: "Durabilité",
    text: "Nous privilégions des matériaux durables et des solutions écologiques.",
  },
];

export default function ValuesGridSection({ content, sectionStyle }: ValuesGridSectionProps) {
  const cardShadowClass = sectionStyle?.cardShadow
    ? { none: "shadow-none", sm: "shadow-sm", md: "shadow-md", lg: "shadow-lg", xl: "shadow-xl" }[sectionStyle.cardShadow] || "shadow-md"
    : "shadow-card";

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          subtitle={(content?.subtitle as string) || "Nos Valeurs"}
          title={(content?.title as string) || "Ce Qui Nous Anime au Quotidien"}
          description={(content?.description as string) || "Nos valeurs fondamentales guident chacune de nos interventions."}
          titleColor={sectionStyle?.titleColor}
          titleWeight={sectionStyle?.titleWeight}
          subtitleColor={sectionStyle?.subtitleColor}
          descriptionColor={sectionStyle?.descriptionColor}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 0.1}>
              <div
                className={`${sectionStyle?.cardBg ? "" : "bg-white"} ${sectionStyle?.cardRadius ? "" : "rounded-2xl"} p-8 text-center ${cardShadowClass} hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full`}
                style={{
                  ...(sectionStyle?.cardBg ? { backgroundColor: sectionStyle.cardBg } : {}),
                  ...(sectionStyle?.cardRadius ? { borderRadius: sectionStyle.cardRadius } : {}),
                }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <value.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-heading font-bold text-dark mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.text}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
