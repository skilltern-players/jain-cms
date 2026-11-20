"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ScrubWordsProps = {
  text: string;
  className?: string;
  start?: string;
  end?: string;
};

/**
 * Word-by-word reveal scrubbed by scroll: every word moves from 20% to 100%
 * opacity as the paragraph travels through the viewport. Reduced-motion users
 * see the paragraph fully opaque.
 */
export default function ScrubWords({
  text,
  className,
  start = "top 85%",
  end = "bottom 55%",
}: ScrubWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const spans = element.querySelectorAll<HTMLElement>("[data-word]");
      if (!spans.length) return;

      gsap.fromTo(
        spans,
        { opacity: 0.2 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub: 0.6,
          },
        },
      );
    },
    { scope: ref, dependencies: [text, start, end] },
  );

  return (
    <p ref={ref} className={cn(className)}>
      {words.map((word, index) => (
        <span key={`${index}-${word}`} data-word>
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
