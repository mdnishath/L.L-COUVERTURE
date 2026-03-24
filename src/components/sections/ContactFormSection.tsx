import { Phone } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "@/components/forms/ContactForm";
import type { SiteConfig, FormConfig, SectionStyle } from "@/lib/wordpress";

interface ContactFormSectionProps {
  content?: Record<string, string | string[]>;
  siteConfig: SiteConfig;
  formConfig?: FormConfig | null;
  sectionStyle?: SectionStyle;
}

export default function ContactFormSection({
  content,
  siteConfig,
  formConfig,
  sectionStyle,
}: ContactFormSectionProps) {
  const title = (content?.title as string) || "Envoyez-nous un Message";
  const description =
    (content?.description as string) ||
    "Remplissez le formulaire et nous vous répondrons rapidement.";

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection direction="left">
            <div className="bg-white rounded-2xl shadow-card p-8 md:p-10">
              <h2
                className={`s-title text-2xl font-heading mb-2 ${
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
                {title}
              </h2>
              <p
                className={`s-description mb-8 ${
                  sectionStyle?.descriptionColor ? "" : "text-gray-500"
                }`}
                style={{
                  ...(sectionStyle?.descriptionColor
                    ? { color: sectionStyle.descriptionColor }
                    : {}),
                  ...(sectionStyle?.descriptionWeight
                    ? { fontWeight: parseInt(sectionStyle.descriptionWeight) }
                    : {}),
                }}
              >
                {description}
              </p>
              <ContactForm config={formConfig} />
            </div>
          </AnimatedSection>

          {/* Map */}
          <AnimatedSection direction="right">
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-card h-100">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                    `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}, France`,
                  )}&zoom=15`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation L.L COUVERTURE"
                />
              </div>

              {/* Quick info */}
              <div className="bg-primary text-white rounded-2xl p-8">
                <h3 className="text-xl font-heading font-bold text-white mb-4">
                  Intervention Rapide
                </h3>
                <p className="text-white/80 text-sm mb-6">
                  Pour les urgences (fuites, dégâts après tempête), nous
                  intervenons sous 24h dans tout le Pontoise.
                </p>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="flex items-center gap-3 bg-white text-primary rounded-lg px-5 py-3 font-heading font-bold hover:bg-gray-100 transition-colors"
                >
                  <Phone size={20} />
                  Appeler Maintenant
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
