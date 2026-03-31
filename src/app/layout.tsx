import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import {
  getSiteConfig,
  getNavigation,
  getServices,
  getAppearance,
} from "@/lib/wordpress";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const appearance = await getAppearance();

  return {
    metadataBase: new URL("https://llcouverture.com"),
    title: {
      default: "Couverture & Charpente à Arpajon | L.L COUVERTURE — Devis Gratuit",
      template: "%s | L.L COUVERTURE",
    },
    description:
      "Expert couvreur à Arpajon. Toiture, charpente, zinguerie et rénovation dans l'Essonne (91). Intervention rapide 7j/7. Devis gratuit sous 24h. Garantie décennale.",
    keywords: [
      "couverture Arpajon",
      "toiture Arpajon",
      "charpente Arpajon",
      "couvreur Arpajon 91",
      "rénovation toiture",
      "réparation toiture",
      "zinguerie",
      "démoussage toiture",
      "isolation toiture",
      "étanchéité toiture",
      "couvreur Essonne",
      "toiture Essonne",
      "couvreur 91",
      "charpentier Arpajon",
      "réparation toiture Arpajon",
      "couvreur professionnel Arpajon",
      "entreprise couverture 91",
      "devis toiture gratuit Arpajon",
    ],
    authors: [{ name: "L.L COUVERTURE" }],
    icons: appearance.favicon
      ? { icon: appearance.favicon }
      : undefined,
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: "https://llcouverture.com",
      siteName: "L.L COUVERTURE",
      title: "Couverture & Charpente à Arpajon | L.L COUVERTURE — Devis Gratuit",
      description:
        "Expert couvreur à Arpajon. Toiture, charpente, zinguerie et rénovation dans l'Essonne (91). Devis gratuit sous 24h.",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "L.L COUVERTURE - Couverture & Charpente à Arpajon",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: "Couverture & Charpente à Arpajon | L.L COUVERTURE — Devis Gratuit",
      description:
        "Expert couvreur à Arpajon. Toiture, charpente, zinguerie et rénovation dans l'Essonne (91). Devis gratuit sous 24h.",
      images: ["/images/og-image.jpg"],
    },
    alternates: {
      canonical: "https://llcouverture.com",
    },
    other: {
      "geo.region": "FR-91",
      "geo.placename": "Arpajon",
      "geo.position": "48.5892;2.2478",
      ICBM: "48.5892, 2.2478",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteConfig, navigation, services, appearance] = await Promise.all([
    getSiteConfig(),
    getNavigation(),
    getServices(),
    getAppearance(),
  ]);

  const colorVars: Record<string, string> = {
    "--color-primary": appearance.colors.primary,
    "--color-primary-dark": appearance.colors.primaryDark,
    "--color-primary-light": appearance.colors.primaryLight,
    "--color-accent": appearance.colors.accent,
    "--color-accent-dark": appearance.colors.accentDark,
    "--color-dark": appearance.colors.dark,
    "--color-secondary": appearance.colors.secondary,
  };

  return (
    <html
      lang="fr"
      className="scroll-smooth"
      style={colorVars as React.CSSProperties}
      suppressHydrationWarning
    >
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
      >
        <JsonLd siteConfig={siteConfig} />
        <Header
          siteConfig={siteConfig}
          navigation={navigation}
          logo={appearance.logo}
          headerSettings={appearance.header}
        />
        <main>{children}</main>
        <Footer
          siteConfig={siteConfig}
          navigation={navigation}
          services={services}
          logo={appearance.logo}
          footerSettings={appearance.footer}
        />
      </body>
    </html>
  );
}
