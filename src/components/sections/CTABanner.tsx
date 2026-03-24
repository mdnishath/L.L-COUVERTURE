"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import type { SiteConfig, SectionStyle } from "@/lib/wordpress";

interface CTABannerProps {
  siteConfig: SiteConfig;
  content?: Record<string, string | string[]>;
  sectionStyle?: SectionStyle;
}

export default function CTABanner({
  siteConfig,
  content,
  sectionStyle,
}: CTABannerProps) {
  const buttonStyle: React.CSSProperties = {
    ...(sectionStyle?.buttonBg
      ? { backgroundColor: sectionStyle.buttonBg }
      : {}),
    ...(sectionStyle?.buttonColor ? { color: sectionStyle.buttonColor } : {}),
    ...(sectionStyle?.buttonRadius
      ? { borderRadius: sectionStyle.buttonRadius }
      : {}),
  };

  return (
    <div className="relative">
      {/* Background */}
      {!sectionStyle?.bgColor && (
        <div className="absolute inset-0 bg-linear-to-r from-primary-dark via-primary to-primary-light" />
      )}

      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`s-title text-3xl md:text-4xl font-heading font-bold mb-6 ${
              sectionStyle?.titleColor ? "" : "text-white"
            }`}
            style={{
              fontSize:
                "var(--s-title-size, clamp(1.625rem, 2vw + 0.8rem, 2.5rem))",
              ...(sectionStyle?.titleColor
                ? { color: sectionStyle.titleColor }
                : {}),
              ...(sectionStyle?.titleWeight
                ? { fontWeight: parseInt(sectionStyle.titleWeight) }
                : {}),
            }}
          >
            {(content?.heading as string) ??
              "Besoin d'un Couvreur Professionnel ?"}
          </h2>
          <p
            className={`s-description text-xl max-w-2xl mx-auto mb-10 ${
              sectionStyle?.descriptionColor ? "" : "text-white/80"
            }`}
            style={{
              fontSize:
                "var(--s-desc-size, clamp(0.9375rem, 0.5vw + 0.8rem, 1.125rem))",
              ...(sectionStyle?.descriptionColor
                ? { color: sectionStyle.descriptionColor }
                : {}),
            }}
          >
            {(() => {
              const desc =
                (content?.description as string) ??
                "Demandez votre devis gratuit dès maintenant.\nRéponse garantie sous 24 heures, sans engagement.";
              const lines = desc.split("\n");
              return lines.map((line, i) => (
                <span key={i}>
                  {i > 0 && <br className="hidden sm:block" />}
                  {line}
                </span>
              ));
            })()}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={(content?.button_link as string) || "/devis"}
              variant="white"
              size="lg"
              icon={<ArrowRight size={20} />}
              style={
                Object.keys(buttonStyle).length > 0 ? buttonStyle : undefined
              }
            >
              {(content?.button_text as string) ?? "Demander un Devis Gratuit"}
            </Button>
            <Button
              href={`tel:${siteConfig.phoneRaw}`}
              variant="ghost"
              size="lg"
              icon={<Phone size={20} />}
            >
              {siteConfig.phone}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
