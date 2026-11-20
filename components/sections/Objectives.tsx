"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpenCheck,
  Globe2,
  ScanSearch,
  ShieldCheck,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { objectives, type ObjectiveIcon } from "@/data/conference";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import Reveal from "@/components/motion/Reveal";

const ICONS: Record<ObjectiveIcon, LucideIcon> = {
  ScanSearch,
  Globe2,
  ShieldCheck,
  BookOpenCheck,
  Sprout,
};

/** 04 — objectives: pinned horizontal rail on desktop, stacked on mobile. */
export default function Objectives() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setHorizontal(desktop.matches && !reduced.matches);
    update();

    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useGSAP(
    () => {
      if (!horizontal) return;

      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() + 80}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [horizontal] },
  );

  return (
    <section
      id="objectives"
      ref={sectionRef}
      className={cn(
        "bg-white text-navy-900 relative",
        horizontal && "lg:h-[100svh] lg:overflow-hidden",
      )}
    >
      <div className={cn("shell flex flex-col pt-24 pb-16", horizontal && "lg:h-full lg:pb-8")}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionLabel index="04" tone="light">
            Objectives
          </SectionLabel>

          {horizontal ? (
            <div className="hidden items-center gap-4 lg:flex">
              <span className="font-mono text-[9px] tracking-[0.18em] text-navy-900/40 uppercase">
                Scroll horizontally
              </span>
              <div className="bg-navy-900/15 h-px w-32">
                <div
                  ref={progressRef}
                  className="bg-lime-400 h-full w-full origin-left scale-x-0"
                />
              </div>
            </div>
          ) : null}
        </div>

        <SplitHeading
          as="h2"
          className="mt-6 max-w-3xl text-display-lg font-semibold"
        >
          Five{" "}
          <span className="font-serif italic font-normal">objectives</span>
        </SplitHeading>

        <div className="mt-10 min-h-0 flex-1 lg:mt-12">
          <div
            ref={trackRef}
            className={cn(
              "flex flex-col gap-4",
              horizontal &&
                "lg:h-full lg:w-max lg:flex-row lg:items-stretch lg:gap-5 lg:pr-[8vw]",
            )}
          >
            {objectives.map((objective) => {
              const Icon = ICONS[objective.icon];

              return (
                <Reveal
                  key={objective.n}
                  delay={Number(objective.n) * 0.04}
                  className="h-full shrink-0 lg:w-[23rem] xl:w-[25rem]"
                >
                  <article className="group border-navy-900/15 hover:border-navy-900/40 flex h-full flex-col justify-between border bg-white p-6 transition-colors duration-500 sm:p-7">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[10px] tracking-[0.2em] text-navy-900/40">
                          {objective.n}
                        </span>
                        <Icon
                          aria-hidden
                          size={22}
                          strokeWidth={1.25}
                          className="text-navy-900/50 group-hover:text-navy-900 transition-colors duration-500"
                        />
                      </div>

                      <h3 className="font-display mt-10 text-xl leading-tight text-balance">
                        {objective.title}
                      </h3>
                      <p className="text-navy-900/65 mt-3 text-sm leading-relaxed">
                        {objective.body}
                      </p>
                    </div>

                    <div aria-hidden className="mt-7 flex gap-1">
                      {objectives.map((_, index) => (
                        <span
                          key={index}
                          className={cn(
                            "h-0.5 flex-1",
                            index < Number(objective.n)
                              ? "bg-lime-400"
                              : "bg-navy-900/15",
                          )}
                        />
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <span aria-hidden className="bg-navy-900/15 h-px flex-1" />
                      <span className="font-mono text-[9px] tracking-[0.16em] text-navy-900/40">
                        {objective.n} / 05
                      </span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
