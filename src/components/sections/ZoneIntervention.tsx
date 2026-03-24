"use client";

import { MapPin } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTitle from "@/components/ui/SectionTitle";
import type { SiteConfig, SectionStyle } from "@/lib/wordpress";

interface ZoneInterventionProps {
  zones: string[];
  siteConfig: SiteConfig;
  content?: Record<string, string | string[]>;
  sectionStyle?: SectionStyle;
}

export default function ZoneIntervention({ zones, siteConfig, content, sectionStyle }: ZoneInterventionProps) {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          subtitle={(content?.subtitle as string) || "Zone d'Intervention"}
          title={(content?.title as string) || "Nous Intervenons dans Tout Pontoise"}
          description={(content?.description as string) || "Basés à Pontoise, nous couvrons l'ensemble du département de Pontoise et ses environs."}
          titleColor={sectionStyle?.titleColor}
          titleWeight={sectionStyle?.titleWeight}
          subtitleColor={sectionStyle?.subtitleColor}
          descriptionColor={sectionStyle?.descriptionColor}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <AnimatedSection direction="left">
            <div className="rounded-2xl overflow-hidden shadow-card h-100 bg-gray-100">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                  `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}, France`
                )}&zoom=11`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation L.L COUVERTURE"
              />
            </div>
          </AnimatedSection>

          {/* Zones List */}
          <AnimatedSection direction="right">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-heading font-bold text-dark mb-4">
                  {(content?.heading as string) || "Nos Zones de Couverture"}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-6">
                  {(content?.intro_text as string) || "Nous intervenons rapidement dans les communes suivantes et leurs alentours. N'hésitez pas à nous contacter pour vérifier si nous couvrons votre secteur."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {zones.map((zone, index) => (
                  <AnimatedSection
                    key={zone}
                    delay={index * 0.05}
                    direction="none"
                  >
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors">
                      <MapPin size={16} className="text-primary shrink-0" />
                      <span className="font-medium text-sm">{zone}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <p className="text-sm text-gray-600">
                  {(content?.footer_text as string) || "Votre ville n'est pas listée ? Contactez-nous ! Nous intervenons dans un rayon de 50 km autour de Pontoise."}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
