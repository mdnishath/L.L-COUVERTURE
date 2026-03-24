import type { SectionStyle, ResponsiveValue } from "@/lib/wordpress";

interface SectionWrapperProps {
  sectionId: string;
  style?: SectionStyle;
  defaultBg?: string;
  defaultPadding?: string;
  defaultTitleSize?: ResponsiveValue;
  defaultSubtitleSize?: ResponsiveValue;
  defaultDescSize?: ResponsiveValue;
  className?: string;
  tag?: "section" | "div";
  children: React.ReactNode;
}

function hasResponsiveValue(val?: ResponsiveValue): boolean {
  return !!(val && (val.mobile || val.tablet || val.desktop));
}

function addResponsiveVar(
  rules: { mobile: string[]; tablet: string[]; desktop: string[] },
  varName: string,
  override?: ResponsiveValue,
  fallback?: ResponsiveValue
) {
  const v = hasResponsiveValue(override) ? override! : fallback;
  if (!v) return;
  if (v.mobile) rules.mobile.push(`${varName}: ${v.mobile}px`);
  if (v.tablet) rules.tablet.push(`${varName}: ${v.tablet}px`);
  if (v.desktop) rules.desktop.push(`${varName}: ${v.desktop}px`);
}

function generateResponsiveCSS(
  sectionId: string,
  style?: SectionStyle,
  defaultTitleSize?: ResponsiveValue,
  defaultSubtitleSize?: ResponsiveValue,
  defaultDescSize?: ResponsiveValue
): string {
  const rules: { mobile: string[]; tablet: string[]; desktop: string[] } = {
    mobile: [],
    tablet: [],
    desktop: [],
  };

  // Padding (only from style overrides)
  if (hasResponsiveValue(style?.paddingTop)) {
    const v = style!.paddingTop!;
    if (v.mobile) rules.mobile.push(`padding-top: ${v.mobile}px`);
    if (v.tablet) rules.tablet.push(`padding-top: ${v.tablet}px`);
    if (v.desktop) rules.desktop.push(`padding-top: ${v.desktop}px`);
  }
  if (hasResponsiveValue(style?.paddingBottom)) {
    const v = style!.paddingBottom!;
    if (v.mobile) rules.mobile.push(`padding-bottom: ${v.mobile}px`);
    if (v.tablet) rules.tablet.push(`padding-bottom: ${v.tablet}px`);
    if (v.desktop) rules.desktop.push(`padding-bottom: ${v.desktop}px`);
  }

  // Font size CSS variables — always injected (override or default)
  addResponsiveVar(rules, "--s-title-size", style?.titleSize, defaultTitleSize);
  addResponsiveVar(rules, "--s-subtitle-size", style?.subtitleSize, defaultSubtitleSize);
  addResponsiveVar(rules, "--s-desc-size", style?.descriptionSize, defaultDescSize);

  if (
    rules.mobile.length === 0 &&
    rules.tablet.length === 0 &&
    rules.desktop.length === 0
  ) {
    return "";
  }

  const id = `#${sectionId}`;
  let css = "";

  if (rules.mobile.length > 0) {
    css += `${id} { ${rules.mobile.join("; ")}; }\n`;
  }
  if (rules.tablet.length > 0) {
    css += `@media (min-width: 768px) { ${id} { ${rules.tablet.join("; ")}; } }\n`;
  }
  if (rules.desktop.length > 0) {
    css += `@media (min-width: 1024px) { ${id} { ${rules.desktop.join("; ")}; } }\n`;
  }

  return css;
}

export default function SectionWrapper({
  sectionId,
  style,
  defaultBg = "",
  defaultPadding = "py-20 lg:py-28",
  defaultTitleSize,
  defaultSubtitleSize,
  defaultDescSize,
  className = "",
  tag: Tag = "section",
  children,
}: SectionWrapperProps) {
  const hasCustomBg = !!style?.bgColor;
  const hasCustomPadding =
    hasResponsiveValue(style?.paddingTop) ||
    hasResponsiveValue(style?.paddingBottom);

  const bgClass = hasCustomBg ? "" : defaultBg;
  const paddingClass = hasCustomPadding ? "" : defaultPadding;

  const inlineStyles: React.CSSProperties = {};
  if (hasCustomBg) inlineStyles.backgroundColor = style!.bgColor;
  if (style?.bgImage) {
    inlineStyles.backgroundImage = `url(${style.bgImage})`;
    inlineStyles.backgroundSize = "cover";
    inlineStyles.backgroundPosition = "center";
  }
  if (style?.textAlign) {
    inlineStyles.textAlign = style.textAlign as React.CSSProperties["textAlign"];
  }

  const responsiveCSS = generateResponsiveCSS(
    sectionId, style, defaultTitleSize, defaultSubtitleSize, defaultDescSize
  );
  const customClass = style?.customClass || "";

  const allClasses = [bgClass, paddingClass, className, customClass]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {responsiveCSS && (
        <style dangerouslySetInnerHTML={{ __html: responsiveCSS }} />
      )}
      <Tag
        id={sectionId}
        className={allClasses || undefined}
        style={Object.keys(inlineStyles).length > 0 ? inlineStyles : undefined}
      >
        {style?.bgImage && style?.bgOverlayColor && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: style.bgOverlayColor,
              opacity: (style.bgOverlayOpacity ?? 50) / 100,
            }}
          />
        )}
        {children}
      </Tag>
    </>
  );
}
