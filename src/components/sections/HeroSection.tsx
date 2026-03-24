"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Shield, Clock, Award, Star, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import type { SiteConfig, FormConfig, SectionStyle } from "@/lib/wordpress";
import { images } from "@/data/images";

interface HeroSectionProps {
  siteConfig: SiteConfig;
  content?: Record<string, string | string[]>;
  formConfig?: FormConfig | null;
  sectionStyle?: SectionStyle;
}

export default function HeroSection({ siteConfig, content, formConfig, sectionStyle }: HeroSectionProps) {
  const badgeTexts = (content?.badges as string[]) ?? ["Garantie Décennale", "Intervention 24h", "15+ Ans d\u0027Expérience"];
  const heroImage = (content?.image as string) || siteConfig.heroImage || images.hero;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    honeypot: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleQuoteSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    if (formData.honeypot) {
      setTimeout(() => setFormStatus("success"), 500);
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { honeypot: _hp, ...submitData } = formData;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...submitData, formType: "hero_quote" }),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", service: "", message: "", honeypot: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const badgeIcons = [Shield, Clock, Award];

  return (
    <div className="relative">
      {/* ═══ HERO TOP — Full-width centered ═══ */}
      <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Couvreur professionnel - toiture Pontoise"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        {/* Decorative geometric shapes */}
        <div className="absolute top-1/4 left-0 w-px h-32 bg-linear-to-b from-transparent via-accent/40 to-transparent" />
        <div className="absolute top-1/3 right-0 w-px h-40 bg-linear-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent z-10" />

        {/* Content — Centered */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 md:px-6 py-20 text-center">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2.5 px-5 py-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full text-accent text-sm font-heading font-bold uppercase tracking-widest">
              <Star size={14} className="fill-accent" />
              {(content?.badge as string) ?? "Expert Couvreur \u00e0 Pontoise"}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-5xl sm:text-6xl lg:text-7xl font-heading font-black leading-[0.95] mb-6 tracking-tight ${sectionStyle?.titleColor ? "" : "text-white"}`}
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.4)",
              ...(sectionStyle?.titleColor && { color: sectionStyle.titleColor }),
            }}
          >
            {(() => {
              const heading = (content?.heading as string) ?? "Votre Toiture Entre de Bonnes Mains";
              const words = heading.split(" ");
              const accent = words.slice(-2).join(" ");
              const prefix = words.slice(0, -2).join(" ");
              return (
                <>
                  {prefix}{" "}
                  <span className="text-accent">{accent}</span>
                </>
              );
            })()}
          </motion.h1>

          {/* Subtitle bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="h-px w-12 bg-accent/60" />
            <span className="text-white/80 font-heading font-semibold text-sm uppercase tracking-[0.3em]">
              {(content?.subtitle as string) ?? "Charpente & Toiture"}
            </span>
            <span className="h-px w-12 bg-accent/60" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            {(content?.description as string) ?? "Couverture, charpente et toiture \u00e0 Pontoise (95). Travail soign\u00e9, mat\u00e9riaux de qualit\u00e9 et devis gratuit sous 24h."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button href="/devis" variant="primary" size="lg" icon={<ArrowRight size={20} />}>
              Devis Gratuit
            </Button>
            <Button href={`tel:${siteConfig.phoneRaw}`} variant="ghost" size="lg" icon={<Phone size={20} />}>
              {siteConfig.phone}
            </Button>
          </motion.div>

          {/* Trust badges — horizontal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {badgeTexts.map((text, i) => {
              const Icon = badgeIcons[i % badgeIcons.length];
              return (
                <div key={text} className="flex items-center gap-2 text-white/70">
                  <Icon size={16} className="text-accent" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ═══ QUICK QUOTE FORM — Below hero, overlapping ═══ */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 -mt-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Accent top bar */}
          <div className="h-1.5 bg-linear-to-r from-primary via-primary-light to-accent" />

          {formStatus === "success" ? (
            <div className="text-center py-12 px-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-heading font-bold text-dark mb-2">Demande Envoy\u00e9e !</h3>
              <p className="text-gray-500 text-sm mb-4">Merci ! Nous vous recontacterons dans les 24 heures.</p>
              <button onClick={() => setFormStatus("idle")} className="text-primary font-heading font-semibold text-sm hover:underline">
                Envoyer une autre demande
              </button>
            </div>
          ) : (
            <div className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-heading font-bold text-dark">
                  {(content?.form_title as string) ?? "Demandez Votre"}{" "}
                  <span className="text-primary">Devis Gratuit</span>
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {(content?.form_subtitle as string) ?? "R\u00e9ponse sous 24h — Sans engagement"}
                </p>
              </div>

              <form onSubmit={handleQuoteSubmit} className="relative">
                {formStatus === "error" && (
                  <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle size={16} className="text-red-500 shrink-0" />
                    <p className="text-xs text-red-600">Une erreur est survenue. Veuillez r\u00e9essayer.</p>
                  </div>
                )}

                {/* Honeypot */}
                <div className="absolute invisible opacity-0 h-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="website-hero">Website</label>
                  <input type="text" id="website-hero" name="website" value={formData.honeypot} onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })} tabIndex={-1} autoComplete="off" />
                </div>

                {/* Horizontal form layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={formConfig?.fields?.find(f => f.name === "name")?.placeholder ?? "Votre nom"} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-secondary placeholder:text-gray-400" />
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder={formConfig?.fields?.find(f => f.name === "phone")?.placeholder ?? "Votre t\u00e9l\u00e9phone"} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-secondary placeholder:text-gray-400" />
                  <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className={`w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${formData.service ? "text-secondary" : "text-gray-400"}`}>
                    <option value="" disabled>{formConfig?.fields?.find(f => f.name === "service")?.placeholder ?? "Type de prestation"}</option>
                    {(formConfig?.service_options ?? ["Zinguerie", "R\u00e9novation de Toiture", "R\u00e9paration de Fuite en Urgence", "Charpente & Toiture", "R\u00e9novation de Rives", "R\u00e9paration de Goutti\u00e8res", "Autre"]).map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={formStatus === "loading"}>
                    {formStatus === "loading" ? <><Loader2 size={18} className="animate-spin" /> Envoi...</> : "Envoyer"}
                  </Button>
                </div>
                <p className="text-xs text-gray-400 text-center">{formConfig?.privacy_text ?? "Vos donn\u00e9es sont prot\u00e9g\u00e9es et ne seront jamais partag\u00e9es."}</p>
              </form>
            </div>
          )}
        </motion.div>
      </div>

      {/* Spacer for overlapping form */}
      <div className="h-12" />
    </div>
  );
}
