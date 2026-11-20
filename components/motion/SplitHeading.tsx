"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SplitHeadingProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Word-level reveals read better at display sizes; lines suit long copy. */
  splitBy?: "words" | "lines" | "chars";
  /** Play immediately instead of waiting for the scroll trigger. */
  onMount?: boolean;
  delay?: number;
  stagger?: number;
  start?: string;
};

/**
 * GSAP SplitText reveal. Words rise from a masked line; the underlying text is
 * untouched for screen readers and remains fully readable if JS fails.
 */
export default function SplitHeading({
  children,
  as: Tag = "h2",
  className,
  splitBy = "words",
  onMount = false,
  delay = 0,
  stagger = 0.05,
  start = "top 85%",
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const split = SplitText.create(element, {
        type: splitBy,
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-word",
      });

      const targets =
        splitBy === "lines" ? split.lines : splitBy === "chars" ? split.chars : split.words;

      gsap.set(targets, { willChange: "transform, opacity" });

      // Hero headings must wait for the preloader to wipe away, otherwise the
      // reveal plays out unseen behind it.
      const ready = document.documentElement.classList.contains("aim-ready");
      const animation = gsap.from(targets, {
        yPercent: splitBy === "lines" ? 110 : 60,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
        stagger,
        delay,
        paused: onMount && !ready,
        ...(onMount
          ? {}
          : {
              scrollTrigger: {
                trigger: element,
                start,
                once: true,
              },
            }),
        onComplete: () => gsap.set(targets, { willChange: "auto" }),
      });

      const playWhenReady = () => animation.play();
      if (onMount && !ready) {
        window.addEventListener("aimhub:ready", playWhenReady, { once: true });
      }

      return () => {
        window.removeEventListener("aimhub:ready", playWhenReady);
        animation.scrollTrigger?.kill();
        animation.kill();
        split.revert();
      };
    },
    { scope: ref, dependencies: [splitBy, delay, stagger, onMount, start] },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
