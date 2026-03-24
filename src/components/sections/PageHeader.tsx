import AnimatedSection from "@/components/ui/AnimatedSection";
import type { SectionStyle } from "@/lib/wordpress";

interface PageHeaderProps {
  content: Record<string, string | string[]>;
  sectionStyle?: SectionStyle;
}

export default function PageHeader({ content, sectionStyle }: PageHeaderProps) {
  const subtitle = (content?.subtitle as string) || "";
  const title = (content?.title as string) || "";
  const titleAccent = (content?.title_accent as string) || "";
  const description = (content?.description as string) || "";

  return (
    <div className="relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <AnimatedSection>
          {subtitle && (
            <span
              className={`s-subtitle inline-block font-heading text-sm font-bold uppercase tracking-[0.2em] ${sectionStyle?.subtitleColor ? "" : "text-primary"} mb-4`}
              style={{
                fontSize: "var(--s-subtitle-size, 0.8125rem)",
                ...(sectionStyle?.subtitleColor && { color: sectionStyle.subtitleColor }),
              }}
            >
              {subtitle}
            </span>
          )}
          <h1
            className={`s-title text-4xl md:text-5xl lg:text-6xl font-heading font-bold ${sectionStyle?.titleColor ? "" : "text-white"} mb-6`}
            style={{
              fontSize: "var(--s-title-size, clamp(2rem, 3vw + 0.8rem, 3.25rem))",
              ...(sectionStyle?.titleColor && { color: sectionStyle.titleColor }),
              ...(sectionStyle?.titleWeight && { fontWeight: sectionStyle.titleWeight }),
            }}
          >
            {title}
            {titleAccent && (
              <>
                <br />
                <span className="text-primary">{titleAccent}</span>
              </>
            )}
          </h1>
          {description && (
            <p
              className={`s-description text-lg ${sectionStyle?.descriptionColor ? "" : "text-gray-400"} max-w-2xl mx-auto`}
              style={{
                fontSize: "var(--s-desc-size, clamp(0.9375rem, 0.5vw + 0.8rem, 1.125rem))",
                ...(sectionStyle?.descriptionColor && { color: sectionStyle.descriptionColor }),
              }}
            >
              {description}
            </p>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
}
