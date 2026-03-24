import type { SiteConfig } from "@/lib/wordpress";

interface MapSectionProps {
  content?: Record<string, string | string[]>;
  siteConfig: SiteConfig;
}

export default function MapSection({ content, siteConfig }: MapSectionProps) {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl overflow-hidden shadow-card h-100">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
              `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}, France`
            )}&zoom=15`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={(content?.title as string) || "Localisation L.L COUVERTURE"}
          />
        </div>
      </div>
    </div>
  );
}
