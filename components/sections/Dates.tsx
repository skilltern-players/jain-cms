"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarPlus, Download } from "lucide-react";
import { conference, timeline, type TimelineEntry } from "@/data/conference";
import {
  daysLeftLabel,
  daysUntilConference,
  formatTimelineDate,
  resolveTimeline,
  type ResolvedTimelineEntry,
  type TimelineStatus,
} from "@/lib/dates";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import Counter from "@/components/ui/Counter";

const CHIP: Record<TimelineStatus, string> = {
  past: "border-navy-900/15 text-navy-900/40",
  next: "border-transparent bg-lime-400 text-navy-900",
  upcoming: "border-navy-900/20 text-navy-900/55",
};

const DOT: Record<TimelineStatus, string> = {
  past: "bg-navy-900/20",
  upcoming: "border border-navy-900/35 bg-white",
  next: "bg-lime-400 ring-4 ring-lime-400/25 animate-pulse-node",
};

/** "Closed", "10 days left", or "Open now" for a window already under way. */
function statusLabel(entry: ResolvedTimelineEntry) {
  if (entry.status === "past") return "Closed";
  if (entry.daysLeft < 0) return "Open now";
  return daysLeftLabel(entry.daysLeft);
}

/**
 * 06 — the ten milestones. A lime spine draws itself down the list as the
 * section scrolls, and the first open deadline carries the pulsing NEXT marker.
 * Statuses resolve on the client so the static export cannot go stale.
 */
export default function Dates() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [resolved, setResolved] = useState<ResolvedTimelineEntry[] | null>(null);
  const [daysToGo, setDaysToGo] = useState<number | null>(null);

  useEffect(() => {
    setResolved(resolveTimeline(timeline));
    setDaysToGo(daysUntilConference(conference.startDate));
  }, []);

  useGSAP(
    () => {
      const list = listRef.current;
      const path = pathRef.current;
      if (!list || !path) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        path,
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 80%",
            end: "bottom 72%",
            scrub: 0.5,
          },
        },
      );

      const nodes = gsap.utils.toArray<HTMLElement>("[data-node]", list);
      gsap.from(nodes, {
        scale: 0,
        opacity: 0,
        duration: 0.45,
        ease: "back.out(2)",
        stagger: 0.05,
        scrollTrigger: { trigger: list, start: "top 78%", once: true },
      });
    },
    { scope: sectionRef },
  );

  const next = resolved?.find((entry) => entry.status === "next") ?? null;

  /**
   * The calendar builder and the `ics` package load only on demand, keeping
   * them out of the initial route bundle.
   */
  const download = async (entry: TimelineEntry) => {
    const { downloadIcs } = await import("@/lib/ics");
    downloadIcs(entry);
  };

  return (
    <section
      id="dates"
      ref={sectionRef}
      className="bg-white text-navy-900 relative scroll-mt-24"
    >
      <div className="shell py-section">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="06" tone="light">
            Important Dates
          </SectionLabel>
          <span className="font-mono text-[9px] tracking-[0.2em] text-navy-900/40 uppercase">
            Ten milestones
          </span>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
          <div>
            <SplitHeading as="h2" className="text-display-lg font-semibold">
              The road to{" "}
              <span className="font-serif italic font-normal">June</span> 2027
            </SplitHeading>

            <p className="text-navy-900/60 mt-5 max-w-xl text-sm leading-relaxed">
              From the call for papers to the two conference days — every
              deadline in the AIM-HUB 2027 cycle, with a calendar file for each.
            </p>
          </div>

          {/* Next-deadline panel */}
          <aside className="hud-frame border-navy-900/15 h-fit border p-6 lg:sticky lg:top-28">
            <p className="font-mono text-[9px] tracking-[0.2em] text-navy-900/45 uppercase">
              Next deadline
            </p>

            {next ? (
              <>
                <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-navy-900/55 uppercase">
                  {formatTimelineDate(next)}
                </p>
                <h3 className="font-display mt-2 text-lg leading-snug">
                  {next.label}
                </h3>

                <div className="mt-6 flex items-end gap-2">
                  <span className="font-display text-6xl leading-none">
                    <Counter value={Math.max(next.daysLeft, 0)} duration={1.2} />
                  </span>
                  <span className="pb-2 font-mono text-[9px] tracking-[0.16em] text-navy-900/45 uppercase">
                    days to go
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => void download(next)}
                  className="group mt-6 flex w-full items-center justify-between gap-3 border border-navy-900/20 px-3 py-2.5 font-mono text-[9px] tracking-[0.16em] text-navy-900/70 uppercase transition-colors duration-300 hover:border-navy-900/60 hover:text-navy-900"
                >
                  <span>Add to calendar</span>
                  <CalendarPlus
                    aria-hidden
                    size={13}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                </button>
              </>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-navy-900/60">
                All deadlines for this edition have closed.
              </p>
            )}

            <div className="mt-6 border-t border-navy-900/10 pt-4">
              <p className="font-mono text-[9px] tracking-[0.2em] text-navy-900/45 uppercase">
                Conference
              </p>
              <p className="font-display mt-2 text-base">{conference.datesLabel}</p>
              <p className="mt-1 font-mono text-[10px] leading-relaxed text-navy-900/50">
                {conference.venue} · {conference.city}
              </p>
              {daysToGo !== null && daysToGo > 0 ? (
                <p className="mt-3 text-xs text-navy-900/55">
                  {daysToGo} days from today
                </p>
              ) : null}
            </div>
          </aside>
        </div>

        {/* Timeline */}
        <div className="relative mt-14">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
            <div>
              <ol ref={listRef} className="relative">
                <span
                  aria-hidden
                  className="bg-navy-900/15 absolute top-2 bottom-2 left-[4px] w-px"
                />
                <svg
                  aria-hidden
                  viewBox="0 0 1 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute top-2 bottom-2 left-[4px] w-px overflow-visible"
                >
                  <path
                    ref={pathRef}
                    d="M0.5 0 V100"
                    pathLength={100}
                    strokeDasharray="100 100"
                    strokeDashoffset={0}
                    strokeWidth={1.5}
                    stroke="currentColor"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    className="text-lime-400"
                  />
                </svg>

                {timeline.map((entry) => {
                  const state = resolved?.find((item) => item.id === entry.id);
                  const status = state?.status ?? "upcoming";

                  return (
                    <li key={entry.id} className="relative pl-8 sm:pl-10">
                      <span
                        data-node
                        aria-hidden
                        className={cn(
                          "absolute top-[1.95rem] left-0 h-2 w-2 rounded-full",
                          DOT[status],
                        )}
                      />

                      <div className="flex flex-col gap-4 border-t border-navy-900/10 py-6 sm:flex-row sm:items-start sm:gap-8">
                        <p className="shrink-0 font-mono text-[10px] tracking-[0.14em] text-navy-900/55 uppercase sm:w-40 sm:pt-1">
                          {formatTimelineDate(entry)}
                        </p>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                            <h3
                              className={cn(
                                "font-display text-lg leading-snug",
                                status === "past"
                                  ? "text-navy-900/45"
                                  : "text-navy-900",
                              )}
                            >
                              {entry.label}
                            </h3>

                            {state ? (
                              <span
                                className={cn(
                                  "rounded-full border px-2 py-0.5 font-mono text-[8px] tracking-[0.14em] uppercase",
                                  CHIP[state.status],
                                )}
                              >
                                {state.status === "next"
                                  ? `Next · ${statusLabel(state)}`
                                  : statusLabel(state)}
                              </span>
                            ) : null}
                          </div>

                          {entry.note ? (
                            <p className="mt-1.5 text-[13px] text-navy-900/50">
                              {entry.note}
                            </p>
                          ) : null}
                        </div>

                        <button
                          type="button"
                          onClick={() => void download(entry)}
                          aria-label={`Download ${entry.label} as a calendar file`}
                          className="group/ics inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-navy-900/15 px-3 py-1.5 font-mono text-[9px] tracking-[0.16em] text-navy-900/55 uppercase transition-colors duration-300 hover:border-navy-900/50 hover:text-navy-900"
                        >
                          <Download
                            aria-hidden
                            size={11}
                            className="transition-transform duration-300 group-hover/ics:translate-y-0.5"
                          />
                          <span className="hidden sm:inline">ICS</span>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <p className="mt-6 font-mono text-[9px] tracking-[0.16em] text-navy-900/35 uppercase">
                Calendar files use the printed dates · All times IST
              </p>
            </div>

            <div aria-hidden className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
