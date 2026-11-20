"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Variant = "lime" | "outline" | "outline-navy" | "ghost";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  external?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit";
};

const variants: Record<Variant, string> = {
  lime: "bg-lime-400 text-navy-900 hover:bg-lime-400/90",
  outline: "border border-white/25 text-white hover:border-lime-400 hover:text-lime-400",
  "outline-navy": "border border-navy-900/25 text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white",
  ghost: "text-white hover:text-lime-400",
};

/**
 * CTA that leans toward the pointer (desktop only), with a crisp mono label.
 * Falls back to a plain link/button for touch and reduced-motion users.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "lime",
  className,
  icon = true,
  external = false,
  ariaLabel,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    const element: HTMLElement | null = ref.current;
    if (!element) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(element, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(element, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      xTo(gsap.utils.clamp(-9, 9, relX * 0.28));
      yTo(gsap.utils.clamp(-7, 7, relY * 0.28));
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", onMove);
    element.addEventListener("mouseleave", onLeave);

    return () => {
      element.removeEventListener("mousemove", onMove);
      element.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(element);
    };
  }, []);

  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <ArrowUpRight
          aria-hidden
          size={14}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
