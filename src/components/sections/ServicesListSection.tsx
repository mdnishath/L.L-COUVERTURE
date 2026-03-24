"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Hammer,
  Droplets,
  Thermometer,
  Shield,
  Sparkles,
  Zap,
  ArrowRight,
  Phone,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Service, SiteConfig, SectionStyle } from "@/lib/wordpress";

interface ServicesListSectionProps {
  services: Service[];
  siteConfig: SiteConfig;
  content?: Record<string, string | string[]>;
  sectionStyle?: SectionStyle;
}

const iconMap: Record<string, React.ElementType> = {
  roof: Home,
  frame: Hammer,
  droplets: Droplets,
  thermometer: Thermometer,
  shield: Shield,
  sparkles: Sparkles,
  zap: Zap,
};

export default function ServicesListSection({ services, siteConfig, content, sectionStyle }: ServicesListSectionProps) {
  const buttonText = (content?.button_text as string) || "En savoir plus";
  const callText = (content?.call_text as string) || "Appeler";

  const shadowClass = sectionStyle?.cardShadow
    ? sectionStyle.cardShadow === 'none' ? 'shadow-none'
      : sectionStyle.cardShadow === 'sm' ? 'shadow-sm'
      : sectionStyle.cardShadow === 'lg' ? 'shadow-lg'
      : sectionStyle.cardShadow === 'xl' ? 'shadow-xl'
      : 'shadow-md'
    : 'shadow-xl';

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-20">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Home;
            const isReversed = index % 2 !== 0;

            return (
              <AnimatedSection key={service.id}>
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    isReversed ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`${isReversed ? "lg:order-2" : ""}`}>
                    <div
                      className={`relative ${sectionStyle?.cardRadius ? '' : 'rounded-2xl'} overflow-hidden ${shadowClass}`}
                      style={{
                        ...(sectionStyle?.cardRadius ? { borderRadius: sectionStyle.cardRadius } : {}),
                      }}
                    >
                      <div className="aspect-4/3 relative">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                      <div className="absolute top-4 left-4 px-4 py-2 bg-primary text-white text-sm font-heading font-bold rounded-lg">
                        {service.title}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${isReversed ? "lg:order-1" : ""}`}>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      <Icon size={28} className="text-primary" />
                    </div>
                    <h2
                      className={`s-title text-3xl font-heading ${sectionStyle?.titleWeight ? '' : 'font-bold'} ${sectionStyle?.titleColor ? '' : 'text-dark'} mb-4`}
                      style={{
                        fontSize: "var(--s-title-size, clamp(1.75rem, 2vw + 1rem, 2.625rem))",
                        ...(sectionStyle?.titleColor ? { color: sectionStyle.titleColor } : {}),
                        ...(sectionStyle?.titleWeight ? { fontWeight: parseInt(sectionStyle.titleWeight) } : {}),
                      }}
                    >
                      {service.title}
                    </h2>
                    <p
                      className={`s-description ${sectionStyle?.descriptionColor ? '' : 'text-gray-500'} leading-relaxed mb-6`}
                      style={{
                        ...(sectionStyle?.descriptionColor ? { color: sectionStyle.descriptionColor } : {}),
                      }}
                    >
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-gray-600"
                        >
                          <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className={`inline-flex items-center gap-2 px-6 py-3 ${sectionStyle?.buttonBg ? '' : 'bg-primary'} ${sectionStyle?.buttonColor ? '' : 'text-white'} font-heading font-semibold ${sectionStyle?.buttonRadius ? '' : 'rounded-lg'} hover:bg-primary-dark transition-colors`}
                        style={{
                          ...(sectionStyle?.buttonBg ? { backgroundColor: sectionStyle.buttonBg } : {}),
                          ...(sectionStyle?.buttonColor ? { color: sectionStyle.buttonColor } : {}),
                          ...(sectionStyle?.buttonRadius ? { borderRadius: sectionStyle.buttonRadius } : {}),
                        }}
                      >
                        {buttonText}
                        <ArrowRight size={18} />
                      </Link>
                      <a
                        href={`tel:${siteConfig.phoneRaw}`}
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-secondary font-heading font-semibold rounded-lg hover:border-primary hover:text-primary transition-colors"
                      >
                        <Phone size={18} />
                        {callText}
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}
