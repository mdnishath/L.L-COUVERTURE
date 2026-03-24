import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Facebook,
  Instagram,
} from "lucide-react";
import type {
  SiteConfig,
  NavItem,
  Service,
  AppearanceFooter,
} from "@/lib/wordpress";

interface FooterProps {
  siteConfig: SiteConfig;
  navigation: NavItem[];
  services: Service[];
  logo?: string;
  footerSettings?: AppearanceFooter;
}

export default function Footer({
  siteConfig,
  navigation,
  services,
  logo,
  footerSettings,
}: FooterProps) {
  // Footer logo: use dedicated footer logo, or fall back to main logo
  const footerLogo = footerSettings?.logo || logo || "";
  const footerLogoHeight = footerSettings?.logoHeight || 40;
  const footerBg = footerSettings?.bg || "";
  const textColor = footerSettings?.textColor || "#9CA3AF";
  const headingColor = footerSettings?.headingColor || "#FFFFFF";
  const linkColor = footerSettings?.linkColor || textColor;
  const footerDescription =
    footerSettings?.description ||
    "Expert en couverture, charpente et toiture à Pontoise. Qualité, fiabilité et savoir-faire au service de votre habitation.";
  const copyright =
    footerSettings?.copyright ||
    `© ${new Date().getFullYear()} L.L COUVERTURE. Tous droits réservés.`;
  const showSocial = footerSettings?.showSocial ?? true;
  const showServices = footerSettings?.showServices ?? true;
  const showLinks = footerSettings?.showLinks ?? true;
  const showContact = footerSettings?.showContact ?? true;
  const bottomBarBg = footerSettings?.bottomBar?.bg || "";
  const bottomBarText = footerSettings?.bottomBar?.text || textColor;

  // Count visible columns for responsive grid
  const visibleColumns = [true, showServices, showLinks, showContact].filter(
    Boolean,
  ).length;
  const gridCols =
    visibleColumns <= 2
      ? "lg:grid-cols-2"
      : visibleColumns === 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-4";

  return (
    <footer
      className="text-white"
      style={{ backgroundColor: footerBg || "var(--color-dark)" }}
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-10`}>
          {/* Company Info — always visible */}
          <div>
            <div className="mb-6">
              {footerLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={footerLogo}
                  alt={siteConfig.businessName}
                  className="w-auto object-contain"
                  style={{
                    height: `${footerLogoHeight}px`,
                    maxHeight: `${footerLogoHeight}px`,
                  }}
                />
              ) : (
                <h3
                  className="text-2xl font-heading font-bold"
                  style={{ color: headingColor }}
                >
                  <span className="text-accent">L.L</span>{" "}
                  COUVERTURE
                </h3>
              )}
              <p
                className="text-sm font-heading uppercase tracking-wider mt-1"
                style={{ color: textColor }}
              >
                {siteConfig.tagline}
              </p>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: textColor }}>
              {footerDescription}
            </p>
            {showSocial && (
              <div className="flex gap-3">
                <a
                  href={siteConfig.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            )}
          </div>

          {/* Services */}
          {showServices && (
            <div>
              <h4
                className="text-lg font-heading font-bold mb-6 relative"
                style={{ color: headingColor }}
              >
                Nos Services
                <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-primary -mb-2"></span>
              </h4>
              <ul className="space-y-3 mt-4">
                {services.slice(0, 6).map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="flex items-center gap-2 hover:text-primary transition-colors text-sm"
                      style={{ color: linkColor }}
                    >
                      <ChevronRight
                        size={14}
                        className="text-primary shrink-0"
                      />
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Links */}
          {showLinks && (
            <div>
              <h4
                className="text-lg font-heading font-bold mb-6 relative"
                style={{ color: headingColor }}
              >
                Liens Rapides
                <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-primary -mb-2"></span>
              </h4>
              <ul className="space-y-3 mt-4">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 hover:text-primary transition-colors text-sm"
                      style={{ color: linkColor }}
                    >
                      <ChevronRight
                        size={14}
                        className="text-primary shrink-0"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/devis"
                    className="flex items-center gap-2 hover:text-primary transition-colors text-sm"
                    style={{ color: linkColor }}
                  >
                    <ChevronRight size={14} className="text-primary shrink-0" />
                    Devis Gratuit
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentions-legales"
                    className="flex items-center gap-2 hover:text-primary transition-colors text-sm"
                    style={{ color: linkColor }}
                  >
                    <ChevronRight size={14} className="text-primary shrink-0" />
                    Mentions Légales
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Contact Info */}
          {showContact && (
            <div>
              <h4
                className="text-lg font-heading font-bold mb-6 relative"
                style={{ color: headingColor }}
              >
                Contact
                <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-primary -mb-2"></span>
              </h4>
              <ul className="space-y-4 mt-4">
                <li>
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="flex items-start gap-3 hover:text-primary transition-colors"
                    style={{ color: textColor }}
                  >
                    <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs opacity-70 mb-0.5">Téléphone</p>
                      <p
                        className="text-sm font-medium"
                        style={{ color: headingColor }}
                      >
                        {siteConfig.phone}
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-start gap-3 hover:text-primary transition-colors"
                    style={{ color: textColor }}
                  >
                    <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Mail size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs opacity-70 mb-0.5">Email</p>
                      <p
                        className="text-sm font-medium break-all"
                        style={{ color: headingColor }}
                      >
                        {siteConfig.email}
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <div
                    className="flex items-start gap-3"
                    style={{ color: textColor }}
                  >
                    <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs opacity-70 mb-0.5">Adresse</p>
                      <p className="text-sm" style={{ color: headingColor }}>
                        {siteConfig.address.street}
                        <br />
                        {siteConfig.address.postalCode}{" "}
                        {siteConfig.address.city}
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    className="flex items-start gap-3"
                    style={{ color: textColor }}
                  >
                    <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Clock size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs opacity-70 mb-0.5">Horaires</p>
                      <p className="text-sm" style={{ color: headingColor }}>
                        {siteConfig.businessHours.weekdays}
                        <br />
                        {siteConfig.businessHours.saturday}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t border-white/10"
        style={bottomBarBg ? { backgroundColor: bottomBarBg } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm" style={{ color: bottomBarText }}>
            {copyright}
          </p>
          <div
            className="flex items-center gap-6 text-sm"
            style={{ color: bottomBarText }}
          >
            <Link
              href="/mentions-legales"
              className="hover:text-primary transition-colors"
            >
              Mentions Légales
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <span className="text-white/30">|</span>
            <a
              href="https://wa.me/8801767591988"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Design by Nishath
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
