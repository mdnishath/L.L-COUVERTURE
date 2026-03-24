"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { SiteConfig, SectionStyle } from "@/lib/wordpress";

interface ContactInfoSectionProps {
  siteConfig: SiteConfig;
  sectionStyle?: SectionStyle;
}

export default function ContactInfoSection({
  siteConfig,
  sectionStyle,
}: ContactInfoSectionProps) {
  const cardShadowClass = sectionStyle?.cardShadow
    ? {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      }[sectionStyle.cardShadow] || "shadow-md"
    : "shadow-card";

  const hoverShadowClass = sectionStyle?.cardShadow
    ? ""
    : "hover:shadow-card-hover";

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      lines: [siteConfig.phone],
      href: `tel:${siteConfig.phoneRaw}`,
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Mail,
      title: "Email",
      lines: [siteConfig.email],
      href: `mailto:${siteConfig.email}`,
      color: "bg-green-50 text-green-600",
    },
    {
      icon: MapPin,
      title: "Adresse",
      lines: [
        siteConfig.address.street,
        `${siteConfig.address.postalCode} ${siteConfig.address.city}`,
      ],
      href: `https://maps.google.com/?q=${encodeURIComponent(
        `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}`,
      )}`,
      color: "bg-red-50 text-red-600",
    },
    {
      icon: Clock,
      title: "Horaires",
      lines: [
        siteConfig.businessHours.weekdays,
        siteConfig.businessHours.saturday,
        siteConfig.businessHours.sunday,
      ],
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.1}>
              <div
                className={`${sectionStyle?.cardBg ? "" : "bg-white"} ${sectionStyle?.cardRadius ? "" : "rounded-2xl"} p-6 ${cardShadowClass} ${hoverShadowClass} transition-all duration-300 text-center h-full`}
                style={{
                  ...(sectionStyle?.cardBg
                    ? { backgroundColor: sectionStyle.cardBg }
                    : {}),
                  ...(sectionStyle?.cardRadius
                    ? { borderRadius: sectionStyle.cardRadius }
                    : {}),
                }}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${item.color}`}
                >
                  <item.icon size={24} />
                </div>
                <h3 className="font-heading font-bold text-dark text-lg mb-2">
                  {item.title}
                </h3>
                {item.lines.map((line) =>
                  item.href ? (
                    <a
                      key={line}
                      href={item.href}
                      className="block text-gray-500 text-sm hover:text-primary transition-colors"
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={line} className="text-gray-500 text-sm">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
