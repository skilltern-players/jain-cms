"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { conference } from "@/data/conference";
import {
  ABSTRACT_SUBMISSION_URL,
  HERO_FRAME_CONFIG,
  frameUrl,
} from "@/lib/config";
import { gsap, useGSAP } from "@/lib/gsap";
import { scrollToSection } from "@/lib/scroll";
import { clamp, pad } from "@/lib/utils";
import FrameSequence from "@/components/motion/FrameSequence";
import ParticleLayer from "@/components/motion/ParticleLayer";
import SplitHeading from "@/components/motion/SplitHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import Countdown from "@/components/ui/Countdown";

/**
 * Text beats, expressed as scroll-progress windows into the 400vh hero.
 * 0-20% title, 20-45% statement one, 45-70% statement two, 70-100% details.
 */
const BEAT_WINDOWS: ReadonlyArray<readonly [number, number]> = [
  [0, 0.2],
  [0.2, 0.45],
  [0.45, 0.7],
  [0.7, 1.01],
];

const FADE = 0.05;

function FinalPanel() {
  return (
    <div className="glass-strong hud-frame max-w-[34rem] p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-lime-400 text-navy-900 rounded-full px-3 py-1 font-mono text-[9px] tracking-[0.14em] uppercase">
          24–25 June 2027
        </span>
        <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-[9px] tracking-[0.14em] text-white/75 uppercase">
          Seminar Hall 5
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-white/10 pb-3">
        <span className="font-display text-base font-semibold">
          JAIN<span className="text-lime-400">.</span>
        </span>
        <span className="text-white/25">×</span>
        <span className="font-mono text-[9px] tracking-[0.14em] text-white/70 uppercase">
          CMS Business School
        </span>
      </div>

      <p className="mt-3 font-mono text-[9px] leading-relaxed tracking-[0.12em] text-steel uppercase">
        In association with Brest Business School, France
        <br />
        Institutional membership: ASSOCHAM
      </p>

      <Countdown className="mt-4" />

      <div className="mt-5 flex flex-wrap gap-2.5">
        <MagneticButton href={ABSTRACT_SUBMISSION_URL} external>
          Submit Abstract
        </MagneticButton>
        <MagneticButton
          variant="outline"
          icon={false}
          onClick={() => scrollToSection("dates")}
        >
          View Important Dates
        </MagneticButton>
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  /**
   * Written straight to the DOM: at 60fps this must not re-render React.
   */
  const handleProgress = useCallback((progress: number) => {
    beatRefs.current.forEach((element, index) => {
      if (!element) return;
      const windowRange = BEAT_WINDOWS[index];
      if (!windowRange) return;

      const [from, to] = windowRange;
      let opacity = clamp((progress - from) / FADE);
      if (index < BEAT_WINDOWS.length - 1) {
        opacity = Math.min(opacity, clamp((to - progress) / FADE));
      }

      element.style.opacity = opacity.toFixed(3);
      element.style.visibility = opacity > 0.005 ? "visible" : "hidden";
      element.style.pointerEvents = opacity > 0.75 ? "auto" : "none";
      element.style.transform = `translate3d(0, ${((1 - opacity) * 26).toFixed(1)}px, 0)`;
      element.setAttribute("aria-hidden", opacity > 0.1 ? "false" : "true");
    });

    if (hintRef.current) {
      hintRef.current.style.opacity = String(1 - clamp(progress / 0.06));
    }

    if (readoutRef.current) {
      const frame = Math.round(progress * (HERO_FRAME_CONFIG.frameCount - 1)) + 1;
      readoutRef.current.textContent = pad(frame, 3);
    }
  }, []);

  useEffect(() => {
    handleProgress(0);
  }, [handleProgress]);

  useGSAP(
    () => {
      if (reduced) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const hud = hudRef.current;
      const content = contentRef.current;
      if (!hud || !content) return;

      const hudX = gsap.quickTo(hud, "x", { duration: 0.9, ease: "power3.out" });
      const hudY = gsap.quickTo(hud, "y", { duration: 0.9, ease: "power3.out" });
      const contentX = gsap.quickTo(content, "x", { duration: 1.1, ease: "power3.out" });
      const contentY = gsap.quickTo(content, "y", { duration: 1.1, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        hudX(nx * 12);
        hudY(ny * 8);
        contentX(nx * -6);
        contentY(ny * -4);
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMove);
        gsap.killTweensOf([hud, content]);
      };
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  // Static, pin-free fallback: final frame plus every text block visible.
  if (reduced) {
    const finalFrame = frameUrl(
      HERO_FRAME_CONFIG.sets.desktop,
      HERO_FRAME_CONFIG.sets.desktop.frameCount - 1,
    );

    return (
      <section
        id="hero"
        className="bg-navy-900 relative min-h-[100svh] overflow-hidden pt-28 pb-14"
      >
        <img
          src={finalFrame}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          aria-hidden
          className="from-navy-900/95 via-navy-900/80 to-navy-900/40 absolute inset-0 bg-gradient-to-t"
        />
        <div className="shell relative z-10">
          <p className="eyebrow">International Conference</p>
          <h1 className="mt-5 text-display-xl font-semibold">
            AIM-HUB{" "}
            <span className="font-serif text-lime-400 font-normal italic">2027</span>
          </h1>
          <p className="mt-6 max-w-3xl font-display text-xl leading-tight sm:text-2xl">
            AI-driven marketing. Human-centric experience.
          </p>
          <p className="mt-1 max-w-3xl font-display text-xl leading-tight sm:text-2xl">
            Responsible innovation. Sustainable transformation.
          </p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-steel">
            {conference.fullTitle}
          </p>
          <div className="mt-8">
            <FinalPanel />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="bg-navy-900 relative h-[100svh] overflow-hidden"
    >
      <FrameSequence triggerRef={sectionRef} onProgress={handleProgress} />

      {/* Legibility layers stay on top of the canvas, never baked into frames. */}
      <div
        aria-hidden
        className="from-navy-900/90 via-navy-900/45 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent"
      />
      <div
        aria-hidden
        className="from-navy-900/85 pointer-events-none absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_20%,transparent_35%,rgba(7,17,32,0.55)_100%)]"
      />

      <ParticleLayer className="opacity-80" />

      <div aria-hidden className="pointer-events-none absolute inset-4 hidden lg:block">
        {[
          "top-0 left-0 border-t border-l",
          "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r",
        ].map((position) => (
          <span
            key={position}
            className={`absolute h-6 w-6 border-lime-400/50 ${position}`}
          />
        ))}
      </div>

      <div ref={contentRef} className="relative z-10 flex h-full flex-col pt-24">
        <div
          ref={hudRef}
          className="shell flex items-start justify-between gap-6 font-mono text-[9px] tracking-[0.2em] text-steel uppercase"
        >
          <span className="flex items-center gap-3">
            <span className="bg-lime-400 h-1 w-1 rounded-full" />
            International Conference
          </span>
          <span className="flex items-center gap-2">
            <span className="text-white/35">Seq</span>
            <span ref={readoutRef} className="text-lime-400 tabular-nums">
              001
            </span>
            <span className="text-white/35">/ 119</span>
          </span>
        </div>

        <div className="relative min-h-0 flex-1">
          {/* 0-20% */}
          <div
            ref={(element) => {
              beatRefs.current[0] = element;
            }}
            className="absolute inset-x-0 bottom-0"
          >
            <div className="shell">
              <p className="eyebrow mb-4 flex items-center gap-3">
                <span aria-hidden className="bg-lime-400 h-px w-8" />
                International Conference
              </p>
              <SplitHeading
                as="h1"
                onMount
                delay={0.15}
                className="text-display-xl font-semibold text-white"
              >
                AIM-HUB{" "}
                <span className="font-serif text-lime-400 font-normal italic">2027</span>
              </SplitHeading>
              <p className="mt-4 max-w-xl text-xs leading-relaxed text-steel sm:text-sm">
                {conference.organiser}
                <br />
                In association with {conference.inAssociationWith}
              </p>
            </div>
          </div>

          {/* 20-45% */}
          <div
            ref={(element) => {
              beatRefs.current[1] = element;
            }}
            className="absolute inset-x-0 bottom-0"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <div className="shell">
              <p className="eyebrow mb-4">02 / The shift</p>
              <p className="text-display-lg max-w-4xl font-semibold text-white uppercase">
                AI-driven marketing.
                <br />
                <span className="font-serif text-lime-400 font-normal italic">
                  Human-centric
                </span>{" "}
                experience.
              </p>
            </div>
          </div>

          {/* 45-70% */}
          <div
            ref={(element) => {
              beatRefs.current[2] = element;
            }}
            className="absolute inset-x-0 bottom-0"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <div className="shell">
              <p className="eyebrow mb-4">03 / The responsibility</p>
              <p className="text-display-lg max-w-4xl font-semibold text-white uppercase">
                Responsible innovation.
                <br />
                <span className="font-serif text-lime-400 font-normal italic">
                  Sustainable
                </span>{" "}
                transformation.
              </p>
            </div>
          </div>

          {/* 70-100% */}
          <div
            ref={(element) => {
              beatRefs.current[3] = element;
            }}
            className="absolute inset-x-0 bottom-0"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <div className="shell">
              <FinalPanel />
            </div>
          </div>
        </div>

        <div className="shell flex items-end justify-between gap-6 pt-4 pb-6">
          <div ref={hintRef} className="flex items-center gap-3 text-steel">
            <span className="font-mono text-[9px] tracking-[0.24em] uppercase">Scroll</span>
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15">
              <ArrowDown size={13} className="animate-drift-y" />
            </span>
          </div>
          <p className="hidden font-mono text-[9px] tracking-[0.18em] text-white/35 uppercase sm:block">
            JAIN × CMS · Brest · ASSOCHAM
          </p>
        </div>
      </div>
    </section>
  );
}
