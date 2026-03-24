"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Menu,
  X,
  Mail,
  Clock,
  MapPin,
  ChevronDown,
  Droplets,
  Home,
  Zap,
  Hammer,
  Sparkles,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteConfig, NavItem, AppearanceHeader } from "@/lib/wordpress";
import Button from "@/components/ui/Button";

const SERVICE_DROPDOWN = [
  {
    name: "Zinguerie",
    href: "/services/zinguerie",
    icon: Droplets,
    desc: "Gouttières, chéneaux et solins zinc",
  },
  {
    name: "Rénovation de Toiture",
    href: "/services/renovation-toiture",
    icon: Home,
    desc: "Tuiles, ardoises et isolation",
  },
  {
    name: "Réparation en Urgence",
    href: "/services/reparation-urgence",
    icon: Zap,
    desc: "Intervention 7j/7 sous 24h",
  },
  {
    name: "Charpente & Toiture",
    href: "/services/charpente-toiture",
    icon: Hammer,
    desc: "Structure bois et couverture",
  },
  {
    name: "Rénovation de Rives",
    href: "/services/renovation-rives",
    icon: Sparkles,
    desc: "Rives, bandeaux et finitions zinc",
  },
  {
    name: "Réparation de Gouttières",
    href: "/services/reparation-gouttieres",
    icon: Shield,
    desc: "Débouchage, joints et remplacement",
  },
];

interface HeaderProps {
  siteConfig: SiteConfig;
  navigation: NavItem[];
  logo?: string;
  headerSettings?: AppearanceHeader;
}

export default function Header({
  siteConfig,
  navigation,
  logo,
  headerSettings,
}: HeaderProps) {
  const sticky = headerSettings?.sticky ?? true;
  const logoHeight = headerSettings?.logoHeight || 50;
  const headerBg = headerSettings?.bg || "#FFFFFF";
  const headerBgScrolled = headerSettings?.bgScrolled || "";
  const navColor = headerSettings?.navColor || "#374151";
  const navActive = headerSettings?.navActive || "";
  const navHover = headerSettings?.navHover || "";
  const ctaText = headerSettings?.ctaText || "Devis Gratuit";
  const ctaLink = headerSettings?.ctaLink || "/devis";
  const showTopBar = headerSettings?.topBar?.show ?? true;
  const topBarBg = headerSettings?.topBar?.bg || "";
  const topBarText = headerSettings?.topBar?.text || "#FFFFFF";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const activeColor = navActive || "var(--color-primary)";
  const hoverColor = navHover || activeColor;

  // Compute scrolled background
  const scrolledBg = headerBgScrolled || `${headerBg}f2`;

  return (
    <>
      {/* Top Bar */}
      {showTopBar && (
        <div
          className="hidden lg:block text-sm"
          style={{
            backgroundColor: topBarBg || "var(--color-primary)",
            color: topBarText,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex justify-between items-center">
            <div className="flex items-center gap-8">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity"
              >
                <Phone size={14} />
                <span>{siteConfig.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Mail size={14} />
                <span>{siteConfig.email}</span>
              </a>
              <span className="flex items-center gap-2 opacity-80">
                <MapPin size={14} />
                <span>
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <Clock size={14} />
              <span>{siteConfig.businessHours.weekdays}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header
        className={`${sticky ? "sticky top-0" : ""} z-50 transition-all duration-300 border-b border-gray-100 ${
          isScrolled ? "backdrop-blur-md shadow-header" : ""
        }`}
        style={{
          backgroundColor: isScrolled ? scrolledBg : headerBg,
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo}
                  alt={siteConfig.businessName}
                  className="w-auto object-contain"
                  style={{
                    height: `${logoHeight}px`,
                    maxHeight: `${logoHeight}px`,
                  }}
                />
              ) : (
                <>
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-md">
                      <svg
                        viewBox="0 0 40 40"
                        fill="none"
                        className="w-8 h-8 text-white"
                      >
                        <path
                          d="M20 4L4 18h4v14h24V18h4L20 4z"
                          fill="currentColor"
                        />
                        <path d="M16 24h8v8h-8z" fill="#1A1A1A" />
                      </svg>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-xl font-heading font-extrabold leading-tight tracking-tight block">
                      <span className="text-primary">L.L</span>{" "}
                      <span className="text-gray-900">COUVERTURE</span>
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-4 h-0.5 bg-accent rounded-full" />
                      <p className="text-[10px] font-heading font-bold text-gray-400 uppercase tracking-[0.2em]">
                        {siteConfig.tagline}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/services" &&
                    pathname.startsWith("/services"));
                if (item.href === "/services") {
                  return (
                    <div
                      key={item.name}
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg font-heading font-semibold text-[15px] transition-all duration-200 ${
                          isActive ? "bg-primary/5" : "hover:bg-gray-50"
                        }`}
                        style={{ color: isActive ? activeColor : navColor }}
                      >
                        {item.name}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-1 w-130 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                          >
                            <div className="grid grid-cols-2">
                              {SERVICE_DROPDOWN.map((s) => (
                                <Link
                                  key={s.href}
                                  href={s.href}
                                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                >
                                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                    <s.icon
                                      size={18}
                                      className="text-primary"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-heading font-semibold text-sm text-gray-900">
                                      {s.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      {s.desc}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="border-t border-gray-100 mt-1 pt-1 px-4 pb-1">
                              <Link
                                href="/services"
                                className="text-xs font-heading font-semibold text-primary hover:underline"
                              >
                                Voir tous nos services →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg font-heading font-semibold text-[15px] transition-all duration-200 ${
                      isActive ? "bg-primary/5" : "hover:bg-gray-50"
                    }`}
                    style={{
                      color: isActive ? activeColor : navColor,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.target as HTMLElement).style.color = hoverColor;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (e.target as HTMLElement).style.color = navColor;
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <div className="hidden lg:block">
                <Button href={ctaLink} variant="primary" size="sm">
                  {ctaText}
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-gray-700" />
                ) : (
                  <Menu size={24} className="text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logo}
                      alt={siteConfig.businessName}
                      className="h-10 w-auto object-contain"
                      style={{ maxHeight: "40px" }}
                    />
                  ) : (
                    <div>
                      <span className="font-heading font-extrabold text-gray-900 text-lg block">
                        <span className="text-primary">L.L</span>{" "}
                        COUVERTURE
                      </span>
                      <p className="text-xs text-gray-400 font-heading uppercase tracking-wider">
                        {siteConfig.tagline}
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="p-6">
                <div className="space-y-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.href === "/services" ? (
                        <div>
                          <button
                            onClick={() =>
                              setMobileServicesOpen(!mobileServicesOpen)
                            }
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-heading font-medium transition-all ${
                              pathname.startsWith("/services")
                                ? "text-primary bg-primary/5"
                                : "text-gray-700 hover:text-primary hover:bg-gray-50"
                            }`}
                          >
                            {item.name}
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary/20 pl-3">
                                  {SERVICE_DROPDOWN.map((s) => (
                                    <Link
                                      key={s.href}
                                      href={s.href}
                                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-all"
                                    >
                                      <s.icon
                                        size={15}
                                        className="text-primary shrink-0"
                                      />
                                      {s.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`block px-4 py-3 rounded-lg font-heading font-medium transition-all ${
                            pathname === item.href
                              ? "text-primary bg-primary/5"
                              : "text-gray-700 hover:text-primary hover:bg-gray-50"
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                  <Button
                    href={ctaLink}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    {ctaText}
                  </Button>

                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Appelez-nous</p>
                      <p className="font-heading font-semibold">
                        {siteConfig.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Écrivez-nous</p>
                      <p className="font-heading font-semibold text-sm">
                        {siteConfig.email}
                      </p>
                    </div>
                  </a>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Call Button — fixed at bottom */}
      <div className="lg:hidden">
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full shadow-lg phone-pulse hover:bg-primary-dark transition-colors"
        >
          <Phone size={18} />
          <span className="font-heading font-semibold text-sm">Appeler</span>
        </a>
      </div>
    </>
  );
}
