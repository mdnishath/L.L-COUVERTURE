import AnimatedSection from "./AnimatedSection";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  titleColor?: string;
  titleWeight?: string;
  subtitleColor?: string;
  descriptionColor?: string;
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  centered = true,
  light = false,
  titleColor,
  titleWeight,
  subtitleColor,
  descriptionColor,
}: SectionTitleProps) {
  return (
    <AnimatedSection
      className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}
    >
      {subtitle && (
        <span
          className={`s-subtitle inline-block font-heading font-bold uppercase tracking-[0.2em] mb-3 ${
            subtitleColor ? "" : light ? "text-primary-light" : "text-primary"
          }`}
          style={{
            fontSize: "var(--s-subtitle-size, 0.8125rem)",
            ...(subtitleColor ? { color: subtitleColor } : {}),
          }}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={`s-title font-heading font-bold mb-4 ${
          titleColor ? "" : light ? "text-white" : "text-dark"
        }`}
        style={{
          fontSize: "var(--s-title-size, clamp(1.75rem, 2vw + 1rem, 2.625rem))",
          ...(titleColor ? { color: titleColor } : {}),
          ...(titleWeight ? { fontWeight: parseInt(titleWeight) } : {}),
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`s-description max-w-2xl leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${descriptionColor ? "" : light ? "text-gray-300" : "text-gray-500"}`}
          style={{
            fontSize: "var(--s-desc-size, clamp(0.9375rem, 0.5vw + 0.8rem, 1.125rem))",
            ...(descriptionColor ? { color: descriptionColor } : {}),
          }}
        >
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
