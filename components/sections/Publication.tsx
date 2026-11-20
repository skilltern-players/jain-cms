import {
  BookMarked,
  LibraryBig,
  MessageSquareQuote,
  Presentation,
  type LucideIcon,
} from "lucide-react";
import { publication, type PublicationIcon } from "@/data/conference";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import Reveal from "@/components/motion/Reveal";

const ICONS: Record<PublicationIcon, LucideIcon> = {
  Presentation,
  MessageSquareQuote,
  BookMarked,
  LibraryBig,
};

/** 09 — what accepted authors can expect after review. */
export default function Publication() {
  return (
    <section
      id="publication"
      className="bg-navy-900 relative scroll-mt-24 text-white"
    >
      <div className="shell py-section">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="09">Publication</SectionLabel>
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase">
            Peer-reviewed
          </span>
        </div>

        <SplitHeading as="h2" className="mt-6 max-w-4xl text-display-lg font-semibold">
          Publication and{" "}
          <span className="font-serif text-lime-400 font-normal italic">
            outcomes
          </span>
        </SplitHeading>

        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {publication.items.map((item, index) => {
            const Icon = ICONS[item.icon];

            return (
              <Reveal key={item.title} delay={index * 0.04} className="h-full">
                <article className="group bg-navy-900 hover:bg-navy-800 flex h-full flex-col justify-between p-6 transition-colors duration-500 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-lime-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      aria-hidden
                      size={20}
                      strokeWidth={1.25}
                      className="text-white/40 transition-colors duration-500 group-hover:text-lime-400"
                    />
                  </div>

                  <div className="mt-12">
                    <h3 className="font-display text-lg leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-steel">
                      {item.detail}
                    </p>
                  </div>

                  <div className="mt-7 flex items-center gap-3">
                    <span
                      aria-hidden
                      className="h-px flex-1 bg-white/10 transition-colors duration-500 group-hover:bg-lime-400/40"
                    />
                    <span className="font-mono text-[8px] tracking-[0.16em] text-white/30 uppercase">
                      Outcome
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 font-mono text-[9px] leading-relaxed tracking-[0.16em] text-white/35 uppercase">
          Accepted abstracts are published with an ISBN · Selected papers may be
          considered for proceedings or journals
        </p>
      </div>
    </section>
  );
}
