import { Phone, Clock, Shield, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import DevisForm from "@/components/forms/DevisForm";
import type { SiteConfig, FormConfig, SectionStyle } from "@/lib/wordpress";

interface DevisFormSectionProps {
  content?: Record<string, string | string[]>;
  siteConfig: SiteConfig;
  sidebarContent?: Record<string, string | string[]>;
  formConfig?: FormConfig | null;
  sectionStyle?: SectionStyle;
}

const defaultAdvantages = [
  "Devis 100% gratuit et sans engagement",
  "Réponse garantie sous 24 heures",
  "Prix transparents, sans surprises",
  "Garantie décennale sur tous nos travaux",
  "Artisans qualifiés et certifiés",
  "Matériaux de haute qualité",
];

export default function DevisFormSection({ content, siteConfig, sidebarContent, formConfig, sectionStyle }: DevisFormSectionProps) {
  const title = (content?.title as string) || "Demande de Devis";
  const description = (content?.description as string) || "Décrivez votre projet et nous vous enverrons un devis détaillé.";
  const sidebarHeading = (sidebarContent?.heading as string) || "Pourquoi Nous Choisir ?";
  const quickTitle = (sidebarContent?.quick_title as string) || "Besoin d'une Réponse Rapide ?";
  const quickDesc = (sidebarContent?.quick_desc as string) || "Appelez-nous directement pour discuter de votre projet.";
  const trustTitle = (sidebarContent?.trust_title as string) || "Garantie Décennale";
  const trustDesc = (sidebarContent?.trust_desc as string) || "Tous nos travaux sont assurés";

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatedSection>
              <div className="bg-white rounded-2xl shadow-card p-8 md:p-10">
                <h2
                  className={`s-title text-2xl font-heading mb-2 ${
                    sectionStyle?.titleWeight ? "" : "font-bold"
                  } ${
                    sectionStyle?.titleColor ? "" : "text-dark"
                  }`}
                  style={{
                    fontSize: "var(--s-title-size, clamp(1.75rem, 2vw + 1rem, 2.625rem))",
                    ...(sectionStyle?.titleColor ? { color: sectionStyle.titleColor } : {}),
                    ...(sectionStyle?.titleWeight ? { fontWeight: parseInt(sectionStyle.titleWeight) } : {}),
                  }}
                >
                  {title}
                </h2>
                <p
                  className={`s-description mb-8 ${
                    sectionStyle?.descriptionColor ? "" : "text-gray-500"
                  }`}
                  style={{
                    ...(sectionStyle?.descriptionColor ? { color: sectionStyle.descriptionColor } : {}),
                    ...(sectionStyle?.descriptionWeight ? { fontWeight: parseInt(sectionStyle.descriptionWeight) } : {}),
                  }}
                >
                  {description}
                </p>
                <DevisForm config={formConfig} />
              </div>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Advantages */}
            <AnimatedSection delay={0.2}>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-lg font-heading font-bold text-dark mb-6">
                  {sidebarHeading}
                </h3>
                <ul className="space-y-4">
                  {defaultAdvantages.map((adv) => (
                    <li key={adv} className="flex items-start gap-3">
                      <CheckCircle2
                        size={20}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-gray-600 leading-relaxed">
                        {adv}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Quick Contact */}
            <AnimatedSection delay={0.3}>
              <div className="bg-primary text-white rounded-2xl p-8">
                <h3 className="text-xl font-heading font-bold text-white mb-4">
                  {quickTitle}
                </h3>
                <p className="text-white/80 text-sm mb-6">
                  {quickDesc}
                </p>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="flex items-center gap-3 bg-white text-primary rounded-lg px-5 py-3 font-heading font-bold hover:bg-gray-100 transition-colors mb-4"
                >
                  <Phone size={20} />
                  {siteConfig.phone}
                </a>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Clock size={16} />
                  <span>{siteConfig.businessHours.weekdays}</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Trust */}
            <AnimatedSection delay={0.4}>
              <div className="bg-white rounded-2xl shadow-card p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <Shield size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="font-heading font-bold text-dark text-sm">
                    {trustTitle}
                  </p>
                  <p className="text-xs text-gray-500">
                    {trustDesc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
