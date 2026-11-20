"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  speed?: number;
  reverse?: boolean;
};

/**
 * Infinite ticker. Base speed is constant; scroll velocity briefly accelerates
 * it and the direction follows the scroll direction.
 */
export default function Marquee({
  items,
  className,
  itemClassName,
  speed = 48,
  reverse = false,
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Duration derives from content width so long and short lists feel equal.
      const halfWidth = track.scrollWidth / 2;
      const duration = Math.max(12, halfWidth / speed);
      const tween = gsap.to(track, {
        xPercent: reverse ? 50 : -50,
        duration,
        ease: "none",
        repeat: -1,
      });

      if (reverse) gsap.set(track, { xPercent: -50 });

      let reset: number | undefined;
      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const boost = Math.min(5, velocity / 700);
          const direction = self.direction === 1 ? 1 : -1;

          gsap.to(tween, {
            timeScale: Math.max(0.4, (reverse ? -1 : 1) * direction) * (1 + boost),
            duration: 0.3,
            overwrite: true,
          });

          window.clearTimeout(reset);
          reset = window.setTimeout(() => {
            gsap.to(tween, { timeScale: 1, duration: 0.8, overwrite: true });
          }, 220);
        },
      });

      return () => {
        window.clearTimeout(reset);
        trigger.kill();
        tween.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={cn("mask-fade-x overflow-hidden", className)}>
      <div ref={trackRef} className="flex w-max">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {items.map((item, index) => (
              <span
                key={`${copy}-${item}-${index}`}
                className={cn(
                  "flex shrink-0 items-center gap-8 pr-8 font-mono text-xs tracking-[0.18em] whitespace-nowrap uppercase",
                  itemClassName,
                )}
              >
                {item}
                <span aria-hidden className="bg-lime-400/60 h-1 w-1 rotate-45" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
