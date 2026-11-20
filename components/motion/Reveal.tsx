"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

/**
 * Fade-up reveal for small blocks of content. GSAP is used rather than
 * inline initial styles so the content is fully visible without JavaScript.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(element, {
        opacity: 0,
        y,
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once,
        },
      });
    },
    { scope: ref, dependencies: [delay, y, once] },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
