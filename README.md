# AIM-HUB 2027 — International Conference Microsite

An interactive, high-performance e-brochure and conference portal for **AIM-HUB 2027** (*International Conference on AI-Driven Marketing, Human-Centric Consumer Experience, Responsible Innovation and Sustainable Business Transformation*).

- **Organised by:** CMS Business School, JAIN (Deemed-to-be University), Bengaluru, India
- **In Association with:** Brest Business School, France
- **Dates:** 24–25 June 2027
- **Venue:** Seminar Hall – 5, Bengaluru, India

---

## Overview

This repository contains the interactive conference microsite built with **Next.js 14 (App Router)** and exported as a fully static web application. It features a cinematic scroll-driven hero sequence, responsive design, smooth inertia scrolling, accessible components, and a single source of truth for all conference metadata.

---

## Key Features

- **Interactive Scroll-Driven Hero:** Canvas-based frame-scrubbing animation synchronized with viewport scroll using GSAP ScrollTrigger and Lenis smooth scrolling.
- **Responsive Multi-Tier Frame Sequence:** Dynamic device-aware image sets optimized for Desktop (1920px), Tablet (1280px), and Mobile (720px) in modern WebP format.
- **Comprehensive Conference Sections:**
  - **Hero & Countdown:** Real-time countdown timer to the conference opening and quick event stats.
  - **Theme & Rationale:** In-depth breakdown of AI-driven marketing and sustainable transformation.
  - **Objectives:** 5 core strategic pillars of the conference.
  - **Thematic Tracks:** Interactive track browser covering 6 research domains (including bilingual English/French submissions).
  - **Important Dates & Calendar Sync:** Chronological deadlines with one-click `.ics` calendar file export.
  - **Guidelines & Formatting:** Detailed paper submission standards and review criteria.
  - **Registration Fees:** Tiered pricing table toggleable between Indian (INR) and International (USD) delegates across Early Bird and Regular phases.
  - **Publication Opportunities:** Outlets including SCOPUS-indexed proceedings, UGC-CARE journals, and edited books.
  - **Institutions:** Profiles of CMS Business School, JAIN University, and Brest Business School.
  - **Committees:** Patronage, advisory board, and organizing committee directory.
  - **Contact & Venue:** Direct email, phone contacts, and location guide.
- **Modern Dark Aesthetic:** Refined dark palette (`#071120`), custom typography (*Bricolage Grotesque*, *Inter*, *JetBrains Mono*), noise textures, and custom magnetic cursor effects.

---

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (Static Export via App Router)
- **Language:** TypeScript 5
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/) with custom tokens and typography plugins
- **Animation & Scrolling:**
  - [GSAP 3](https://greensock.com/gsap/) with `ScrollTrigger`
  - [Lenis](https://lenis.darkroom.engineering/) smooth scroll
  - [Framer Motion 11](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Image Processing:** [Sharp](https://sharp.pixelplumbing.com/) (WebP responsive frames generator)
- **Calendar Export:** `ics` & `date-fns`

---

## Project Structure

```
microwebsiteJAIN/
├── app/
│   ├── globals.css              # Global styles, Tailwind directives, noise layers
│   ├── layout.tsx               # Root layout, Google fonts, metadata, providers
│   └── page.tsx                 # Single-page assembled conference view
├── components/
│   ├── layout/                  # Navbar, Footer, CircuitLine dividers
│   ├── motion/                  # FrameSequence canvas, Cursor, SmoothScroll, Preloader
│   ├── sections/                # Page sections (Hero, Theme, Tracks, Dates, Fees, etc.)
│   └── ui/                      # Reusable UI primitives (Countdown, Tabs, GlassCard, etc.)
├── data/
│   └── conference.ts            # Single source of truth for all conference content
├── lib/
│   ├── config.ts                # Site URLs, frame sequence configuration, contact constants
│   ├── dates.ts                 # Timeline date calculations and helpers
│   ├── gsap.ts                  # GSAP & ScrollTrigger initialization
│   └── ics.ts                   # Calendar (.ics) file generation logic
├── public/
│   └── frames/                  # Generated WebP frame sets (hero, hero-md, hero-mobile)
├── cropped_png/                 # Source PNG frames for the hero animation sequence
├── scripts/
│   └── build-frames.mjs         # Sharp script to generate responsive WebP sets
├── next.config.mjs              # Next.js configuration (static export configured)
├── tailwind.config.ts           # Custom Tailwind theme configuration
├── tsconfig.json                # TypeScript compiler settings
└── package.json                 # Project dependencies and npm scripts
```

---

## Getting Started

### Prerequisites

- **Node.js:** v18.18.0 or v20+ recommended
- **npm:** v9+

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the microsite.

### 3. Type Checking & Linting

```bash
npm run typecheck
npm run lint
```

---

## Building & Deployment

### Production Build

The project is configured for static site generation (`output: "export"` in `next.config.mjs`):

```bash
npm run build
```

This compiles and exports the entire site into the `out/` directory as static HTML, CSS, JS, and media assets.

### Local Static Preview

To preview the exported production build locally:

```bash
npx serve out
```

The resulting `out/` folder is ready to deploy directly to any static hosting provider (e.g., Vercel, Netlify, Cloudflare Pages, GitHub Pages, or AWS S3/CloudFront).

---

## Frame Sequence Generation

The hero section features a canvas-rendered robot animation scrubbed on scroll. If source frames in `cropped_png/` are modified or replaced, rebuild the optimized WebP sets by running:

```bash
npm run frames
```

This script (`scripts/build-frames.mjs`) reads the source PNG frames and generates three responsive tiers in `public/frames/`:

| Set Name | Width | Frame Step | Target Device | Output Path |
|----------|-------|------------|---------------|-------------|
| `hero` | 1920px | 1 (all frames) | Desktop | `public/frames/hero/` |
| `hero-md` | 1280px | 1 (all frames) | Tablet / Laptop | `public/frames/hero-md/` |
| `hero-mobile` | 720px | 2 (every 2nd frame) | Mobile Devices | `public/frames/hero-mobile/` |

---

## Configuration

- **Conference Data:** Edit `data/conference.ts` to update tracks, dates, fees, committee members, guidelines, or venue details.
- **Global Settings & URLs:** Edit `lib/config.ts` to update the abstract submission link, registration URL, countdown start date, or toggle bank details.

---

## License

Private / All rights reserved © CMS Business School, JAIN (Deemed-to-be University).
