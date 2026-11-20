import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Preloader from "@/components/motion/Preloader";
import Navbar from "@/components/layout/Navbar";
import { SITE_URL } from "@/lib/config";
import { conference } from "@/data/conference";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description = `${conference.fullTitle}. ${conference.datesLabel}, ${conference.venue}, ${conference.city}. Organised by ${conference.organiser}, in association with ${conference.inAssociationWith}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${conference.name} — International Conference on AI-Driven Marketing`,
    template: `%s | ${conference.name}`,
  },
  description,
  keywords: [
    "AIM-HUB 2027",
    "AI-driven marketing conference",
    "human-centric consumer experience",
    "responsible innovation",
    "sustainable business transformation",
    "JAIN CMS Business School",
    "Brest Business School",
    "academic conference Bengaluru",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: conference.name,
    title: `${conference.name} — ${conference.datesLabel}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${conference.name} — ${conference.datesLabel}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#071120",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-navy-900 text-white">
        <a
          href="#main"
          className="focus:bg-lime-400 focus:text-navy-900 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:px-5 focus:py-3 focus:font-mono focus:text-xs"
        >
          Skip to content
        </a>

        <SmoothScroll />
        <Preloader />
        <Cursor />
        <ScrollProgress />

        {/* Global grain + 12-column guides. */}
        <div
          aria-hidden
          className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-soft-light"
        />
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[41] hidden xl:block">
          <div className="shell grid h-full grid-cols-12">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="border-l border-white/[0.045] last:border-r" />
            ))}
          </div>
        </div>

        <Navbar />
        {children}
      </body>
    </html>
  );
}
