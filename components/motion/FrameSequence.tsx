"use client";

import { useEffect, useRef, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import {
  HERO_FRAME_CONFIG,
  frameUrl,
  type FrameSet,
  type FrameSetName,
} from "@/lib/config";
import { setHeroPreloadProgress } from "@/lib/preloader";
import { cn } from "@/lib/utils";

type FrameSequenceProps = {
  /** The 100vh section that gets pinned for the scroll sequence. */
  triggerRef: RefObject<HTMLElement>;
  /** Smoothed sequence progress (0-1), called on scroll. */
  onProgress?: (progress: number) => void;
  className?: string;
};

type Cache = {
  name: FrameSetName;
  set: FrameSet;
  frames: (HTMLImageElement | null)[];
  count: number;
};

function pickSetName(): FrameSetName {
  const width = window.innerWidth;
  if (width < HERO_FRAME_CONFIG.breakpoints.tablet) return "mobile";
  if (width < HERO_FRAME_CONFIG.breakpoints.desktop) return "tablet";
  return "desktop";
}

function createCache(name: FrameSetName): Cache {
  const set = HERO_FRAME_CONFIG.sets[name];
  return {
    name,
    set,
    frames: Array.from({ length: set.frameCount }, () => null),
    count: set.frameCount,
  };
}

/** Closest already-decoded frame, so scrolling ahead never blanks the canvas. */
function nearestFrame(cache: Cache, index: number) {
  const direct = cache.frames[index];
  if (direct) return direct;

  for (let offset = 1; offset < cache.count; offset += 1) {
    const lower = cache.frames[index - offset];
    if (lower) return lower;
    const upper = cache.frames[index + offset];
    if (upper) return upper;
  }

  return null;
}

/**
 * FrameSequence pins the hero for ~400vh and draws the 119-frame sequence on a
 * full-viewport canvas. Frames are preloaded aggressively (first 20 first),
 * the canvas redraws only when the frame index changes, and scrolling ahead of
 * the loader falls back to the nearest decoded frame.
 */
export default function FrameSequence({
  triggerRef,
  onProgress,
  className,
}: FrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onProgressRef = useRef(onProgress);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = triggerRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cancelled = false;
    let activeName = pickSetName();
    let active = createCache(activeName);

    let target = 0;
    let current = 0;
    let raf = 0;
    let lastTime = 0;
    let lastFrameIndex = -1;
    let lastReport = -1;

    const draw = (force = false) => {
      const index = Math.round(current * (active.count - 1));
      const image = nearestFrame(active, index);
      if (!image) return;
      if (!force && index === lastFrameIndex) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;

      context.clearRect(0, 0, width, height);
      context.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );

      lastFrameIndex = index;
    };

    const loadFrame = (cache: Cache, index: number) =>
      new Promise<void>((resolve) => {
        if (cache.frames[index]) {
          resolve();
          return;
        }

        const image = new Image();
        image.decoding = "async";

        let settled = false;
        const complete = () => {
          if (settled) return;
          settled = true;

          if (!cancelled && cache === active) {
            cache.frames[index] = image;
            const critical = Math.min(HERO_FRAME_CONFIG.priorityFrames, cache.count);
            const loaded = cache.frames.filter(Boolean).length;
            setHeroPreloadProgress(loaded >= critical ? 1 : loaded / critical);

            if (index === 0 || lastFrameIndex < 0) draw(true);
          }
          resolve();
        };

        image.onload = () => {
          if (typeof image.decode === "function") {
            image.decode().then(complete).catch(complete);
          } else {
            complete();
          }
        };
        image.onerror = () => {
          settled = true;
          resolve();
        };
        image.src = frameUrl(cache.set, index);
      });

    const runPool = async (cache: Cache, indices: number[], concurrency: number) => {
      let cursor = 0;
      const workers = Array.from(
        { length: Math.max(1, Math.min(concurrency, indices.length)) },
        async () => {
          while (!cancelled && cursor < indices.length) {
            const index = indices[cursor];
            cursor += 1;
            if (index !== undefined) await loadFrame(cache, index);
          }
        },
      );
      await Promise.all(workers);
    };

    const boot = async (cache: Cache) => {
      if (reduce) {
        await loadFrame(cache, cache.count - 1);
        current = 1;
        target = 1;
        lastFrameIndex = -1;
        draw(true);
        onProgressRef.current?.(1);
        return;
      }

      const priority = Math.min(HERO_FRAME_CONFIG.priorityFrames, cache.count);
      const indices = Array.from({ length: cache.count }, (_, index) => index);

      await runPool(cache, indices.slice(0, priority), 5);
      if (cancelled) return;

      setHeroPreloadProgress(1);
      draw(true);
      void runPool(cache, indices.slice(priority), 4);
    };

    const tick = (time: number) => {
      raf = window.requestAnimationFrame(tick);

      const delta = lastTime ? Math.min(0.1, (time - lastTime) / 1000) : 0.016;
      lastTime = time;

      // Exponential catch-up approximates ScrollTrigger scrub: 0.5.
      const smoothing = 1 - Math.exp(-delta / Math.max(0.08, HERO_FRAME_CONFIG.scrub));
      current += (target - current) * smoothing;
      if (Math.abs(target - current) < 0.0004) current = target;

      draw();

      if (Math.abs(current - lastReport) > 0.0005) {
        lastReport = current;
        onProgressRef.current?.(current);
      }
    };

    let trigger: { kill: () => void } | null = null;

    if (!reduce) {
      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * (HERO_FRAME_CONFIG.scrollDistanceVh / 100)}`,
        pin: section,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          target = self.progress;
        },
      });

      raf = window.requestAnimationFrame(tick);
    }

    void boot(active);

    const onResize = () => {
      draw(true);
      const nextName = pickSetName();
      if (nextName === activeName) return;

      activeName = nextName;
      active = createCache(nextName);
      lastFrameIndex = -1;
      void boot(active);
    };

    window.addEventListener("resize", onResize);
    const observer = new ResizeObserver(() => draw(true));
    observer.observe(canvas);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      trigger?.kill();
    };
  }, [triggerRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}
