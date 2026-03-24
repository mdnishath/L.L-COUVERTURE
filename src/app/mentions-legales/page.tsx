import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { siteConfig } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales du site L.L COUVERTURE.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
              Mentions <span className="text-primary">Légales</span>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <AnimatedSection>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-heading font-bold text-dark mb-4">
                1. Informations Légales
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-gray-600 space-y-2 text-sm">
                <p>
                  <strong>Raison Sociale :</strong> {siteConfig.businessName}
                </p>
                <p>
                  <strong>Activité :</strong> {siteConfig.tagline}
                </p>
                <p>
                  <strong>Adresse :</strong> {siteConfig.address.street},{" "}
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </p>
                <p>
                  <strong>Téléphone :</strong> {siteConfig.phone}
                </p>
                <p>
                  <strong>Email :</strong> {siteConfig.email}
                </p>
              </div>

              <h2 className="text-2xl font-heading font-bold text-dark mb-4">
                2. Hébergement
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133,
                Walnut, CA 91789, États-Unis. Site web : vercel.com
              </p>

              <h2 className="text-2xl font-heading font-bold text-dark mb-4">
                3. Propriété Intellectuelle
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                L&apos;ensemble de ce site relève de la législation française et
                internationale sur le droit d&apos;auteur et la propriété
                intellectuelle. Tous les droits de reproduction sont réservés, y
                compris pour les documents téléchargeables et les
                représentations iconographiques et photographiques.
              </p>

              <h2 className="text-2xl font-heading font-bold text-dark mb-4">
                4. Protection des Données Personnelles (RGPD)
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Conformément au Règlement Général sur la Protection des Données
                (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un
                droit d&apos;accès, de rectification, de suppression et
                d&apos;opposition aux données personnelles vous concernant.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Les informations recueillies via les formulaires de contact sont
                destinées exclusivement à L.L COUVERTURE pour le traitement
                de votre demande. Elles ne sont en aucun cas cédées à des
                tiers.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Pour exercer vos droits, contactez-nous par email à{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-primary hover:underline"
                >
                  {siteConfig.email}
                </a>
                .
              </p>

              <h2 className="text-2xl font-heading font-bold text-dark mb-4">
                5. Cookies
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Ce site utilise des cookies nécessaires à son bon
                fonctionnement. En naviguant sur ce site, vous acceptez
                l&apos;utilisation de ces cookies conformément à notre politique
                de confidentialité.
              </p>

              <h2 className="text-2xl font-heading font-bold text-dark mb-4">
                6. Responsabilité
              </h2>
              <p className="text-gray-600 leading-relaxed">
                L.L COUVERTURE s&apos;efforce d&apos;assurer au mieux
                l&apos;exactitude et la mise à jour des informations diffusées
                sur ce site. Toutefois, L.L COUVERTURE ne peut garantir
                l&apos;exactitude, la précision ou l&apos;exhaustivité des
                informations mises à disposition sur ce site.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
