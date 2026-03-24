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
  ArrowUpRight,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Service, SectionStyle } from "@/lib/wordpress";

interface ServicesGridProps {
  services: Service[];
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

export default function ServicesGrid({ services, content, sectionStyle }: ServicesGridProps) {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          subtitle={(content?.subtitle as string) || "Nos Services"}
          title={(content?.title as string) || "Des Solutions Compl\u00e8tes pour Votre Toiture"}
          description={(content?.description as string) || "Du diagnostic \u00e0 la r\u00e9alisation, nous prenons en charge tous vos travaux de couverture avec expertise et professionnalisme."}
          titleColor={sectionStyle?.titleColor}
          titleWeight={sectionStyle?.titleWeight}
          subtitleColor={sectionStyle?.subtitleColor}
          descriptionColor={sectionStyle?.descriptionColor}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Home;
            const serviceImage = service.image || "/images/placeholder-service.jpg";
            return (
              <AnimatedSection key={service.id} delay={index * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                >
                  <div
                    className={`${sectionStyle?.cardBg ? '' : 'bg-white'} ${sectionStyle?.cardRadius ? '' : 'rounded-xl'} h-full border border-gray-100 hover:border-primary/30 transition-all duration-500 hover:shadow-xl relative overflow-hidden`}
                    style={{
                      ...(sectionStyle?.cardBg ? { backgroundColor: sectionStyle.cardBg } : {}),
                      ...(sectionStyle?.cardRadius ? { borderRadius: sectionStyle.cardRadius } : {}),
                    }}
                  >
                    {/* Left accent border */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors duration-300" />

                    {/* Service Image — smaller with overlay */}
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={serviceImage}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-primary/40 group-hover:from-primary/5 group-hover:to-primary/30 transition-all duration-500" />

                      {/* Icon — top right */}
                      <div className="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md group-hover:bg-primary group-hover:rotate-12 transition-all duration-300">
                        <Icon
                          size={20}
                          className="text-primary group-hover:text-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-heading font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed mb-4 text-sm line-clamp-2">
                        {service.shortDescription}
                      </p>

                      {/* Features — horizontal tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {service.features.slice(0, 3).map((feature) => (
                          <span
                            key={feature}
                            className="text-xs px-3 py-1 bg-gray-50 text-gray-600 rounded-full border border-gray-100 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Link */}
                      <div className="flex items-center gap-1.5 text-primary font-heading font-bold text-sm">
                        <span>{(content?.link_text as string) || "Découvrir"}</span>
                        <ArrowUpRight
                          size={16}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}
