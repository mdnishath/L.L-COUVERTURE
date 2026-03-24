# L.L COUVERTURE — Frontend

Site vitrine pour **L.L COUVERTURE**, artisan couvreur à Pontoise (95).
Charpente, toiture, zinguerie, isolation et étanchéité.

## Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router)
- **UI** — [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com)
- **Animations** — [Framer Motion](https://www.framer.com/motion/)
- **Icons** — [Lucide React](https://lucide.dev)
- **Slider** — [Swiper](https://swiperjs.com)
- **SEO** — next-sitemap, JSON-LD structured data
- **CMS** — Headless WordPress (REST API)

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── a-propos/     # About page
│   ├── contact/      # Contact page
│   ├── devis/        # Quote request page
│   ├── realisations/ # Portfolio / before-after gallery
│   └── services/     # Services listing & [slug] detail
├── components/
│   ├── forms/        # ContactForm, DevisForm
│   ├── layout/       # Header, Footer
│   ├── sections/     # Hero, About, Services, CTA, etc.
│   ├── seo/          # JSON-LD components
│   └── ui/           # Reusable UI components
├── data/             # Static site data (siteData.ts)
└── lib/              # WordPress API helpers
```

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
```

## Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm run start
```

Sitemap is auto-generated after build via `next-sitemap`.

## License

Private — All rights reserved.
