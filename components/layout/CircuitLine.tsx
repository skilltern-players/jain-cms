"use client";

import { useRef } from "react";
import { sections } from "@/data/conference";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis, scrollToSection } from "@/lib/scroll";

const SHORT: Record<string, string> = {
  hero: "AIM-HUB",
  marquee: "Ticker",
  theme: "Theme",
  objectives: "Objectives",
  tracks: "Tracks",
  dates: "Dates",
  guidelines: "Guidelines",
  fees: "Fees",
  publication: "Publication",
  institutions: "Institutions",
  committee: "Committee",
  contact: "Contact",
};

/**
 * The circuit line: one trace across the footer with a node for every section.
 * The lime portion draws itself in as the footer arrives.
 */
export default function CircuitLine() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        path,
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 96%",
            end: "top 55%",
            scrub: 0.5,
          },
        },
      );
    },
    { scope: rootRef },
  );

  const go = (id: string) => {
    if (id === "hero") {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0 });
      return;
    }
    scrollToSection(id);
  };

  return (
    <nav aria-label="Section index" className="border-t border-white/10">
      <div ref={rootRef} className="shell py-6">
        <h2 className="sr-only">Section index</h2>

        <ol className="relative grid grid-cols-2 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-12 lg:gap-y-0">
          <svg
            aria-hidden
            viewBox="0 0 1200 1"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-px w-full overflow-visible lg:block"
          >
            <path
              d="M0 0.5 H1200"
              strokeWidth={1}
              stroke="currentColor"
              fill="none"
              vectorEffect="non-scaling-stroke"
              className="text-white/10"
            />
            <path
              ref={pathRef}
              d="M0 0.5 H1200"
              pathLength={100}
              strokeDasharray="100 100"
              strokeDashoffset={0}
              strokeWidth={1}
              stroke="currentColor"
              fill="none"
              vectorEffect="non-scaling-stroke"
              className="text-lime-400/70"
            />
          </svg>

          {sections.map((section) => (
            <li key={section.id} className="relative">
              <a
                href={`#${section.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  go(section.id);
                }}
                className="group block lg:pt-4 lg:pr-3"
              >
                <span
                  aria-hidden
                  className="bg-navy-900 group-hover:bg-lime-400 absolute top-0 left-0 hidden h-[7px] w-[7px] -translate-y-[3px] rounded-full border border-white/25 transition-colors duration-300 lg:block"
                />
                <span className="font-mono text-[9px] tracking-[0.16em] text-white/30 transition-colors duration-300 group-hover:text-lime-400">
                  {section.index}
                </span>
                <span className="mt-1 block font-mono text-[9px] tracking-[0.12em] text-white/55 uppercase transition-colors duration-300 group-hover:text-white">
                  {SHORT[section.id] ?? section.label}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
