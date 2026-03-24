"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Testimonial, SectionStyle } from "@/lib/wordpress";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  content?: Record<string, string | string[]>;
  sectionStyle?: SectionStyle;
}

export default function TestimonialSlider({ testimonials, content, sectionStyle }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const cardShadowClass = sectionStyle?.cardShadow
    ? { none: "shadow-none", sm: "shadow-sm", md: "shadow-md", lg: "shadow-lg", xl: "shadow-xl" }[sectionStyle.cardShadow] || "shadow-md"
    : "shadow-card";

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          subtitle={(content?.subtitle as string) || "T\u00e9moignages"}
          title={(content?.title as string) || "Ce que Disent Nos Clients"}
          description={(content?.description as string) || "La satisfaction de nos clients est notre plus belle r\u00e9compense. D\u00e9couvrez leurs avis."}
          titleColor={sectionStyle?.titleColor}
          titleWeight={sectionStyle?.titleWeight}
          subtitleColor={sectionStyle?.subtitleColor}
          descriptionColor={sectionStyle?.descriptionColor}
        />

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div
            className={`relative ${
              sectionStyle?.cardRadius ? "" : "rounded-2xl"
            } ${
              sectionStyle?.cardBg ? "" : "bg-white"
            } ${cardShadowClass} p-8 md:p-12 mb-8`}
            style={{
              ...(sectionStyle?.cardBg ? { backgroundColor: sectionStyle.cardBg } : {}),
              ...(sectionStyle?.cardRadius ? { borderRadius: sectionStyle.cardRadius } : {}),
            }}
          >
            {/* Quote icon */}
            <Quote
              size={48}
              className="absolute top-6 right-6 text-primary/10"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < testimonials[currentIndex].rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-body">
                  &ldquo;{testimonials[currentIndex].text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-heading font-bold text-lg">
                      {testimonials[currentIndex].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-dark">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation — keep as-is */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="Pr\u00e9c\u00e9dent"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentIndex
                      ? "w-8 h-3 bg-primary"
                      : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`T\u00e9moignage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
