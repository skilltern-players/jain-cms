"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  alpha: number;
  hue: "lime" | "cyan";
};

/**
 * Sparse floating particle field. Density is capped and the loop pauses when
 * the hero leaves the viewport or the user prefers reduced motion.
 */
export default function ParticleLayer({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let frame = 0;
    let visible = true;

    const seed = () => {
      const compact = window.innerWidth < 768;
      const count = compact ? 16 : 38;
      particles = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        radius: Math.random() * 1.6 + 0.5,
        speed: Math.random() * 0.012 + 0.004,
        drift: Math.random() * 0.01 - 0.005,
        alpha: Math.random() * 0.4 + 0.12,
        hue: Math.random() > 0.55 ? "cyan" : "lime",
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      frame = 0;
      context.clearRect(0, 0, width, height);

      // Different parallax speed to the hero frames.
      const scrollOffset = (window.scrollY * 0.035) % height;

      for (const particle of particles) {
        particle.y -= particle.speed * 0.01;
        particle.x += particle.drift * 0.01;
        if (particle.y < -0.05) particle.y = 1.05;
        if (particle.x < -0.05) particle.x = 1.05;
        if (particle.x > 1.05) particle.x = -0.05;

        const px = particle.x * width;
        const py = (particle.y * height + scrollOffset + height) % height;
        const twinkle = 0.75 + Math.sin(time * 0.001 + particle.x * 12) * 0.25;

        context.beginPath();
        context.arc(px, py, particle.radius, 0, Math.PI * 2);
        context.fillStyle =
          particle.hue === "lime"
            ? `rgba(184, 230, 46, ${particle.alpha * twinkle})`
            : `rgba(31, 163, 255, ${particle.alpha * twinkle})`;
        context.fill();
      }

      if (visible) frame = window.requestAnimationFrame(draw);
    };

    seed();
    resize();
    frame = window.requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener("resize", onResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible && !frame) frame = window.requestAnimationFrame(draw);
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
