"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Project, SectionStyle } from "@/lib/wordpress";

interface BeforeAfterGalleryProps {
  projects: Project[];
  content?: Record<string, string | string[]>;
  sectionStyle?: SectionStyle;
}

const categories = [
  "Tous",
  "Zinguerie",
  "Couverture",
  "Urgence",
  "Charpente",
  "Rives",
  "Gouttières",
];

export default function BeforeAfterGallery({
  projects,
  content,
  sectionStyle,
}: BeforeAfterGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProjects =
    activeCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const cardShadowClass = sectionStyle?.cardShadow
    ? {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      }[sectionStyle.cardShadow] || "shadow-md"
    : "shadow-card";

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          subtitle={(content?.subtitle as string) || "Nos R\u00e9alisations"}
          title={
            (content?.title as string) ||
            "Avant / Après : La Preuve par l'Image"
          }
          description={
            (content?.description as string) ||
            "D\u00e9couvrez la qualit\u00e9 de notre travail \u00e0 travers nos r\u00e9alisations r\u00e9centes."
          }
          titleColor={sectionStyle?.titleColor}
          titleWeight={sectionStyle?.titleWeight}
          subtitleColor={sectionStyle?.subtitleColor}
          descriptionColor={sectionStyle?.descriptionColor}
        />

        {/* Category Filter — underline tabs */}
        <div className="flex flex-wrap justify-center gap-1 mb-12 border-b border-gray-200 pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-3 font-heading font-semibold text-sm transition-all duration-300 relative ${
                activeCategory === cat
                  ? "text-primary"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AnimatedSection delay={index * 0.1}>
                  <div
                    className={`group relative overflow-hidden ${
                      sectionStyle?.cardRadius ? "" : "rounded-2xl"
                    } ${sectionStyle?.cardBg ? "" : "bg-white"} ${
                      cardShadowClass
                    } hover:shadow-card-hover transition-all duration-300 cursor-pointer`}
                    style={{
                      ...(sectionStyle?.cardBg
                        ? { backgroundColor: sectionStyle.cardBg }
                        : {}),
                      ...(sectionStyle?.cardRadius
                        ? { borderRadius: sectionStyle.cardRadius }
                        : {}),
                    }}
                  >
                    {/* Image container */}
                    <div className="relative aspect-4/3 overflow-hidden">
                      {/* Before image */}
                      <Image
                        src={
                          project.beforeImage ||
                          "/images/placeholder-before.jpg"
                        }
                        alt={`${project.title} - Avant`}
                        fill
                        className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* After image (shown on hover) */}
                      <Image
                        src={
                          project.afterImage || "/images/placeholder-after.jpg"
                        }
                        alt={`${project.title} - Après`}
                        fill
                        className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Category badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-heading font-semibold rounded-full z-10">
                        {project.category}
                      </div>

                      {/* Before/After label */}
                      <div className="absolute bottom-3 right-3 flex gap-1 z-10">
                        <span className="px-2 py-1 bg-black/70 text-white text-xs rounded font-medium group-hover:opacity-0 transition-opacity">
                          Avant
                        </span>
                        <span className="px-2 py-1 bg-primary text-white text-xs rounded font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Après
                        </span>
                      </div>

                      {/* Hover overlay gradient */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-5" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-heading font-bold text-dark text-lg mb-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                        <MapPin size={14} className="text-primary" />
                        {project.location}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
