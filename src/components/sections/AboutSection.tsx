"use client";

import Image from "next/image";
import { CheckCircle2, Users, Award, ShieldCheck } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import { images } from "@/data/images";
import type { SectionStyle } from "@/lib/wordpress";

interface AboutSectionProps {
  content?: Record<string, string | string[]>;
  sectionStyle?: SectionStyle;
}

const defaultHighlights = [
  "Plus de 15 ans d'exp\u00e9rience dans la couverture",
  "Artisans qualifi\u00e9s et certifi\u00e9s",
  "Mat\u00e9riaux de haute qualit\u00e9 s\u00e9lectionn\u00e9s",
  "Garantie d\u00e9cennale sur tous nos travaux",
  "Respect des d\u00e9lais et du budget",
  "Devis d\u00e9taill\u00e9 et transparent",
];

const values = [
  {
    icon: Users,
    title: "\u00c9quipe Qualifi\u00e9e",
    text: "Nos couvreurs sont form\u00e9s et certifi\u00e9s pour garantir un travail impeccable.",
  },
  {
    icon: Award,
    title: "Savoir-Faire",
    text: "15+ ann\u00e9es d'expertise dans tous types de toiture et charpente.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie D\u00e9cennale",
    text: "Tous nos travaux sont couverts par notre assurance d\u00e9cennale.",
  },
];

export default function AboutSection({
  content,
  sectionStyle,
}: AboutSectionProps) {
  const highlightItems = (content?.highlights as string[]) ?? defaultHighlights;
  const aboutImage = (content?.image as string) || images.about.team;

  const cardShadowClass = sectionStyle?.cardShadow
    ? {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      }[sectionStyle.cardShadow] || "shadow-md"
    : "shadow-card";

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Image Area */}
          <AnimatedSection direction="left">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-4/3 relative">
                  <Image
                    src={aboutImage}
                    alt="\u00c9quipe L.L COUVERTURE au travail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Floating experience badge — keep as-is */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-white rounded-2xl p-6 shadow-xl">
                <div className="text-center">
                  <span className="block text-4xl font-heading font-bold">
                    {(content?.badge_number as string) ?? "15+"}
                  </span>
                  <span className="text-sm font-medium opacity-90">
                    {(() => {
                      const badgeText =
                        (content?.badge_text as string) ??
                        "Ann\u00e9es\nd'Exp\u00e9rience";
                      const parts = badgeText.split("\n");
                      return parts.map((part, i) => (
                        <span key={i}>
                          {i > 0 && <br />}
                          {part}
                        </span>
                      ));
                    })()}
                  </span>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" />
            </div>
          </AnimatedSection>

          {/* Right — Content */}
          <AnimatedSection direction="right">
            <span
              className={`s-subtitle inline-block font-heading text-sm font-bold uppercase tracking-[0.2em] mb-3 ${
                sectionStyle?.subtitleColor ? "" : "text-primary"
              }`}
              style={{
                ...(sectionStyle?.subtitleColor
                  ? { color: sectionStyle.subtitleColor }
                  : {}),
                ...(sectionStyle?.subtitleWeight
                  ? { fontWeight: parseInt(sectionStyle.subtitleWeight) }
                  : {}),
              }}
            >
              {(content?.subtitle as string) ?? "\u00c0 Propos"}
            </span>
            <h2
              className={`s-title text-3xl md:text-4xl lg:text-5xl font-heading mb-6 ${
                sectionStyle?.titleWeight ? "" : "font-bold"
              } ${sectionStyle?.titleColor ? "" : "text-dark"}`}
              style={{
                fontSize:
                  "var(--s-title-size, clamp(1.75rem, 2vw + 1rem, 2.625rem))",
                ...(sectionStyle?.titleColor
                  ? { color: sectionStyle.titleColor }
                  : {}),
                ...(sectionStyle?.titleWeight
                  ? { fontWeight: parseInt(sectionStyle.titleWeight) }
                  : {}),
              }}
            >
              {(() => {
                const title =
                  (content?.title as string) ??
                  "L'Excellence au Service de Votre Toiture";
                const words = title.split(" ");
                const accent = words.slice(-2).join(" ");
                const prefix = words.slice(0, -2).join(" ");
                return (
                  <>
                    {prefix} <span className="text-primary">{accent}</span>
                  </>
                );
              })()}
            </h2>
            <p
              className={`s-description text-lg leading-relaxed mb-8 ${
                sectionStyle?.descriptionColor ? "" : "text-gray-500"
              }`}
              style={{
                fontSize:
                  "var(--s-desc-size, clamp(0.9375rem, 0.5vw + 0.8rem, 1.125rem))",
                ...(sectionStyle?.descriptionColor
                  ? { color: sectionStyle.descriptionColor }
                  : {}),
                ...(sectionStyle?.descriptionWeight
                  ? { fontWeight: parseInt(sectionStyle.descriptionWeight) }
                  : {}),
              }}
            >
              {(content?.description as string) ??
                "Depuis plus de 15 ans, L.L COUVERTURE accompagne les particuliers et professionnels de Pontoise dans tous leurs projets de couverture et charpente. Notre engagement : un travail soign\u00e9, des mat\u00e9riaux de qualit\u00e9 et le respect de vos exigences."}
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlightItems.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2
                    size={20}
                    className="text-primary shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>

            <Button
              href={(content?.button_link as string) || "/a-propos"}
              variant="primary"
              size="lg"
              style={{
                ...(sectionStyle?.buttonBg
                  ? { backgroundColor: sectionStyle.buttonBg }
                  : {}),
                ...(sectionStyle?.buttonColor
                  ? { color: sectionStyle.buttonColor }
                  : {}),
                ...(sectionStyle?.buttonRadius
                  ? { borderRadius: sectionStyle.buttonRadius }
                  : {}),
              }}
            >
              {(content?.button_text as string) ??
                "D\u00e9couvrir Notre Entreprise"}
            </Button>
          </AnimatedSection>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 0.15}>
              <div
                className={`text-center p-8 ${
                  sectionStyle?.cardRadius ? "" : "rounded-2xl"
                } ${sectionStyle?.cardBg ? "" : "bg-gray-50 hover:bg-white"} ${
                  sectionStyle?.cardShadow
                    ? cardShadowClass
                    : "hover:shadow-card"
                } transition-all duration-300`}
                style={{
                  ...(sectionStyle?.cardBg
                    ? { backgroundColor: sectionStyle.cardBg }
                    : {}),
                  ...(sectionStyle?.cardRadius
                    ? { borderRadius: sectionStyle.cardRadius }
                    : {}),
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
