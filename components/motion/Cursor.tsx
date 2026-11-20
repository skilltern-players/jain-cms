"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Signature cursor: a lime dot with a lagging ring that grows over
 * interactive elements. Rendered only for fine pointers; the native cursor is
 * hidden through `data-custom-cursor` on <html>.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.dataset.customCursor = "true";
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let shown = false;

    const onMove = (event: PointerEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);

      if (!shown) {
        shown = true;
        setVisible(true);
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      }
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const interactive = target?.closest(
        "a, button, [role='button'], [data-cursor='hover'], input, textarea, select, summary",
      );
      setActive(Boolean(interactive));
    };

    const onLeave = () => {
      shown = false;
      setVisible(false);
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      delete document.documentElement.dataset.customCursor;
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    gsap.to(ring, {
      scale: active ? 2.1 : 1,
      borderColor: active ? "rgba(184,230,46,0.9)" : "rgba(184,230,46,0.45)",
      duration: 0.35,
      ease: "power3.out",
    });
  }, [active]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95] hidden md:block">
      <div
        ref={dotRef}
        className="bg-lime-400 fixed top-0 left-0 h-1.5 w-1.5 rounded-full transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="border-lime-400/50 fixed top-0 left-0 h-9 w-9 rounded-full border transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}
