"use client";

import type Lenis from "lenis";

/**
 * Module-level handle so any component can drive the smooth scroller without
 * threading a context through the tree. Lenis is created by <SmoothScroll />.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (instance) {
    instance.scrollTo(target, { offset: -1, duration: 1.4 });
    return;
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function lockScroll(locked: boolean) {
  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
}
