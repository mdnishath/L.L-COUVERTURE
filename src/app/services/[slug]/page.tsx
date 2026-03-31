import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Home,
  Hammer,
  Droplets,
  Thermometer,
  Shield,
  Sparkles,
  ArrowLeft,
  Phone,
  CheckCircle2,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CTABanner from "@/components/sections/CTABanner";
import DevisForm from "@/components/forms/DevisForm";
import { getServices, getServiceBySlug, getSiteConfig } from "@/lib/wordpress";
import ServiceJsonLd from "@/components/seo/ServiceJsonLd";

const iconMap: Record<string, React.ElementType> = {
  roof: Home,
  frame: Hammer,
  droplets: Droplets,
  thermometer: Thermometer,
  shield: Shield,
  sparkles: Sparkles,
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) return { title: "Service non trouvé" };

  return {
    title: `${service.title} à Arpajon (91)`,
    description: `${service.description} Artisan couvreur à Arpajon (91). Devis gratuit ☎ 06 41 26 02 59`,
    alternates: { canonical: `https://llcouverture.com/services/${slug}` },
    openGraph: {
      title: `${service.title} | L.L COUVERTURE - Arpajon (91)`,
      description: service.description,
      type: "article",
      url: `https://llcouverture.com/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, services, siteConfig] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getSiteConfig(),
  ]);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon] || Home;
  const otherServices = services.filter((s) => s.slug !== slug);

  return (
    <>
      <ServiceJsonLd name={service.title} description={service.description} slug={slug} />
      {/* Page Header */}
      <section className="relative py-20 lg:py-28 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-heading font-medium">
                Tous les services
              </span>
            </Link>
            <div className="flex items-start gap-6">
              <div className="hidden sm:flex w-16 h-16 bg-primary/20 rounded-xl items-center justify-center shrink-0">
                <Icon size={32} className="text-primary" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                  {service.title}
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                {/* Service image */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl mb-10 aspect-video">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <h2 className="text-3xl font-heading font-bold text-dark mb-6">
                  {service.title} à Arpajon et dans l&apos;Essonne
                </h2>
                <p className="text-gray-500 leading-relaxed text-lg mb-8">
                  {service.description}
                </p>

                {/* Features */}
                <div className="bg-gray-50 rounded-2xl p-8 mb-10">
                  <h3 className="text-xl font-heading font-bold text-dark mb-6">
                    Nos Prestations
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg"
                      >
                        <CheckCircle2
                          size={20}
                          className="text-primary shrink-0"
                        />
                        <span className="text-gray-700 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why choose us */}
                <div className="mb-10">
                  <h3 className="text-xl font-heading font-bold text-dark mb-4">
                    Pourquoi Choisir L.L COUVERTURE ?
                  </h3>
                  <div className="space-y-4 text-gray-500 leading-relaxed">
                    <p>
                      Avec plus de 15 ans d&apos;expérience dans le domaine de la
                      couverture, notre équipe de professionnels qualifiés met
                      tout son savoir-faire à votre service pour des travaux de{" "}
                      {service.title.toLowerCase()} de qualité supérieure.
                    </p>
                    <p>
                      Nous utilisons exclusivement des matériaux de haute qualité
                      et nous garantissons tous nos travaux avec notre assurance
                      décennale. De l&apos;étude de votre projet à la livraison
                      finale, nous vous accompagnons à chaque étape.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Quick Contact */}
              <AnimatedSection delay={0.2}>
                <div className="bg-primary text-white rounded-2xl p-8 mb-8">
                  <h3 className="text-xl font-heading font-bold text-white mb-4">
                    Besoin d&apos;un Devis ?
                  </h3>
                  <p className="text-white/80 text-sm mb-6">
                    Contactez-nous pour un devis gratuit et sans engagement pour
                    vos travaux de {service.title.toLowerCase()}.
                  </p>
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="flex items-center gap-3 bg-white text-primary rounded-lg px-5 py-3 font-heading font-bold hover:bg-gray-100 transition-colors mb-3"
                  >
                    <Phone size={20} />
                    {siteConfig.phone}
                  </a>
                  <Link
                    href="/devis"
                    className="block text-center bg-white/20 text-white rounded-lg px-5 py-3 font-heading font-semibold hover:bg-white/30 transition-colors"
                  >
                    Devis en Ligne
                  </Link>
                </div>
              </AnimatedSection>

              {/* Other Services */}
              <AnimatedSection delay={0.3}>
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-lg font-heading font-bold text-dark mb-6">
                    Autres Services
                  </h3>
                  <div className="space-y-3">
                    {otherServices.map((s) => {
                      const SIcon = iconMap[s.icon] || Home;
                      return (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all group"
                        >
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                            <SIcon
                              size={20}
                              className="text-primary group-hover:text-white transition-colors"
                            />
                          </div>
                          <span className="font-heading font-medium text-sm text-secondary group-hover:text-primary transition-colors">
                            {s.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Devis Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block font-heading text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">
                Devis Gratuit
              </span>
              <h2 className="text-3xl font-heading font-bold text-dark mb-4">
                Demandez Votre Devis pour {service.title}
              </h2>
              <p className="text-gray-500">
                Remplissez le formulaire ci-dessous et recevez votre devis sous
                24h.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-card p-8 md:p-10">
              <DevisForm />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTABanner siteConfig={siteConfig} />
    </>
  );
}
