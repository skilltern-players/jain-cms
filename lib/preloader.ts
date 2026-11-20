"use client";

import { clamp } from "@/lib/utils";

/**
 * Tiny progress store for the hero frame preload. The preloader subscribes to
 * real progress instead of running a fake animation, and the hero can report
 * progress before the preloader has even mounted (e.g. cached images).
 */
type Listener = (value: number) => void;

let progress = 0;
const listeners = new Set<Listener>();

export function setHeroPreloadProgress(value: number) {
  const next = clamp(value);
  if (next <= progress) return;
  progress = next;
  listeners.forEach((listener) => listener(progress));
}

export function getHeroPreloadProgress() {
  return progress;
}

export function subscribeHeroPreload(listener: Listener) {
  listeners.add(listener);
  listener(progress);
  return () => {
    listeners.delete(listener);
  };
}
