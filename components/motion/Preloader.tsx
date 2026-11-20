"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { subscribeHeroPreload } from "@/lib/preloader";
import { pad } from "@/lib/utils";

const WORD = "AIM-HUB 2027";
/** Never hold the page hostage if the frame set is slow or missing. */
const MAX_HOLD_MS = 2200;

/**
 * Loader: the wordmark assembles letter by letter while a lime line tracks the
 * real hero-frame progress, then the whole panel wipes upward.
 */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const exiting = useRef(false);

  useEffect(() => subscribeHeroPreload(setProgress), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
    }
  }, []);

  const finish = useCallback(() => {
    if (exiting.current) return;
    exiting.current = true;
    const root = rootRef.current;

    if (!root) {
      setDone(true);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    gsap
      .timeline({ onComplete: () => setDone(true) })
      .to(innerRef.current, { opacity: 0, y: -18, duration: 0.45, ease: "power2.in" })
      .to(root, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.2");
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const letters = gsap.utils.toArray<HTMLElement>(".preloader-letter");
      gsap.set(letters, { opacity: 0, yPercent: 60, rotateX: -40 });
      gsap.to(letters, {
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.035,
        delay: 0.15,
      });
      gsap.from(".preloader-meta", {
        opacity: 0,
        y: 12,
        duration: 0.7,
        delay: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      });
    },
    { scope: rootRef },
  );

  // Real progress drives the line; a timeout guarantees the loader always exits.
  useEffect(() => {
    const cap = window.setTimeout(finish, MAX_HOLD_MS);
    return () => window.clearTimeout(cap);
  }, [finish]);

  useEffect(() => {
    if (progress >= 1) finish();
  }, [progress, finish]);

  useEffect(() => {
    if (!done) return;
    const root = rootRef.current;
    if (root) root.style.display = "none";
    document.documentElement.classList.add("aim-ready");
    window.dispatchEvent(new Event("aimhub:ready"));
  }, [done]);

  if (done) return null;

  const percent = Math.round(progress * 100);

  return (
    <div
      ref={rootRef}
      className="bg-navy-900 fixed inset-0 z-[100] flex flex-col justify-between px-5 py-6 sm:px-8 lg:px-12"
      aria-live="polite"
      aria-label="Loading AIM-HUB 2027"
    >
      <div className="preloader-meta font-mono text-[10px] tracking-[0.28em] text-steel uppercase">
        AIM-HUB / 2027
      </div>

      <div ref={innerRef} className="mx-auto w-full max-w-4xl">
        <div
          className="font-display flex flex-wrap justify-center text-[clamp(2.5rem,8vw,6.5rem)] leading-none font-semibold tracking-[-0.03em]"
          aria-hidden
        >
          {WORD.split("").map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="preloader-letter inline-block"
              style={{ width: char === " " ? "0.28em" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
        <span className="sr-only">{WORD}</span>

        <div className="mt-10 flex items-center gap-5">
          <div className="relative h-px flex-1 bg-white/15">
            <div
              ref={lineRef}
              className="bg-lime-400 absolute inset-y-0 left-0 w-full origin-left"
              style={{ transform: `scaleX(${Math.max(progress, 0.02)})` }}
            />
          </div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-steel">
            {progress > 0 ? pad(percent, 2) : "--"}
            <span className="text-white/30"> / 100</span>
          </div>
        </div>

        <div className="preloader-meta mt-4 flex justify-between font-mono text-[10px] tracking-[0.24em] text-white/35 uppercase">
          <span>Preloading hero sequence</span>
          <span>JAIN · CMS Business School</span>
        </div>
      </div>

      <div className="preloader-meta font-mono text-[10px] tracking-[0.28em] text-white/35 uppercase">
        Bengaluru · 24–25 June 2027
      </div>
    </div>
  );
}
