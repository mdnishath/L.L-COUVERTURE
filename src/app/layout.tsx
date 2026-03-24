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
      default: "L.L COUVERTURE | Charpente & Toiture à Pontoise (95)",
      template: "%s | L.L COUVERTURE",
    },
    description:
      "Expert en couverture, charpente et toiture à Pontoise (95). Devis gratuit, intervention rapide. Rénovation, réparation, isolation de toiture. ☎ 06 41 26 02 59",
    keywords: [
      "couverture Pontoise",
      "toiture Pontoise",
      "charpente Pontoise",
      "couvreur Pontoise 95",
      "rénovation toiture",
      "réparation toiture",
      "zinguerie",
      "démoussage toiture",
      "isolation toiture",
      "étanchéité toiture",
      "couvreur Cergy",
      "toiture Pontoise",
      "couvreur 95",
      "toiture Cergy",
      "charpentier Pontoise",
      "réparation toiture Pontoise",
      "couvreur professionnel Pontoise",
      "entreprise couverture 95",
      "devis toiture gratuit Pontoise",
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
      title: "L.L COUVERTURE | Charpente & Toiture à Pontoise (95)",
      description:
        "Expert en couverture, charpente et toiture à Pontoise. Devis gratuit ☎ 06 41 26 02 59",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "L.L COUVERTURE - Charpente & Toiture",
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
      title: "L.L COUVERTURE | Charpente & Toiture à Pontoise (95)",
      description:
        "Expert en couverture, charpente et toiture à Pontoise. Devis gratuit ☎ 06 41 26 02 59",
      images: ["/images/og-image.jpg"],
    },
    alternates: {
      canonical: "https://llcouverture.com",
    },
    other: {
      "geo.region": "FR-95",
      "geo.placename": "Pontoise",
      "geo.position": "49.0501;2.1007",
      ICBM: "49.0501, 2.1007",
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
