"use client";

import { ArrowUpRight } from "lucide-react";
import { tracks } from "@/data/conference";
import { scrollToSection } from "@/lib/scroll";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import Reveal from "@/components/motion/Reveal";
import Accordion from "@/components/ui/Accordion";

function FrenchBadge() {
  return (
    <span
      className="flex items-center gap-2"
      title="French-language track"
      aria-label="French-language track"
    >
      <span
        aria-hidden
        className="ring-white/20 flex h-3 w-4 overflow-hidden rounded-[1px] ring-1"
      >
        <span className="bg-[#002395] w-1/3" />
        <span className="w-1/3 bg-white" />
        <span className="bg-[#ED2939] w-1/3" />
      </span>
      <span className="font-mono text-[9px] tracking-[0.14em] text-cyan-400 group-hover:text-navy-900">
        FR
      </span>
    </span>
  );
}

/** 05 — nine numbered tracks; lime hover fill on desktop, accordion on mobile. */
export default function Tracks() {
  const accordionItems = tracks.map((track) => ({
    id: `track-${track.n}`,
    meta: track.n,
    title: track.badge ? `${track.title} (FR)` : track.title,
    content: (
      <div className="space-y-3">
        <p>
          {track.language === "FR"
            ? "This track is conducted in French. Submit through the central call for papers."
            : "Submit through the central call for papers."}
        </p>
        <button
          type="button"
          onClick={() => scrollToSection("guidelines")}
          className="link-underline text-lime-400 inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.16em] uppercase"
        >
          View guidelines
          <ArrowUpRight aria-hidden size={12} />
        </button>
      </div>
    ),
  }));

  return (
    <section id="tracks" className="bg-navy-900 relative">
      <div className="shell py-section">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="05">Tracks</SectionLabel>
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase">
            Nine tracks · One platform
          </span>
        </div>

        <SplitHeading
          as="h2"
          className="mt-6 max-w-4xl text-display-lg font-semibold text-white"
        >
          Nine{" "}
          <span className="font-serif text-lime-400 font-normal italic">tracks</span>
        </SplitHeading>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-steel">
          From retail and analytics to AI ethics, sustainability and the creator
          economy — including two interdisciplinary open tracks.
        </p>

        {/* Desktop / tablet grid */}
        <div className="mt-12 hidden gap-px border border-white/10 bg-white/10 md:grid md:grid-cols-2 xl:grid-cols-3">
          {tracks.map((track) => (
            <Reveal key={`${track.n}-${track.language ?? "en"}`} className="h-full">
              <article
                data-cursor="hover"
                className="group hover:bg-lime-400 relative flex h-full min-h-[13rem] flex-col justify-between bg-navy-900 p-6 transition-colors duration-500 sm:min-h-[15rem] sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="group-hover:text-navy-900/60 font-mono text-[10px] tracking-[0.2em] text-lime-400">
                    {track.n}
                  </span>

                  <div className="flex items-center gap-4">
                    {track.badge ? <FrenchBadge /> : null}
                    <ArrowUpRight
                      aria-hidden
                      size={18}
                      className="text-navy-900 -translate-x-1 translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                    />
                  </div>
                </div>

                <h3 className="font-display group-hover:text-navy-900 mt-10 max-w-[24rem] text-lg leading-snug text-white transition-colors duration-500">
                  {track.title}
                </h3>

                <div className="mt-7 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="bg-white/15 group-hover:bg-navy-900/20 h-px flex-1 transition-colors duration-500"
                  />
                  <span className="group-hover:text-navy-900/50 font-mono text-[8px] tracking-[0.16em] text-white/30 uppercase">
                    Track
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="mt-10 md:hidden">
          <Accordion items={accordionItems} tone="dark" />
        </div>
      </div>
    </section>
  );
}
