"use client";

import { useId, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TabItem = { id: string; label: string; hint?: string };

type TabsProps = {
  items: readonly TabItem[];
  value: string;
  onChange: (id: string) => void;
  tone?: "dark" | "light";
  className?: string;
  ariaLabel?: string;
};

/** Segmented control (registration region/season, committee groups). */
export default function Tabs({
  items,
  value,
  onChange,
  tone = "dark",
  className,
  ariaLabel = "Options",
}: TabsProps) {
  const layoutId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const index = items.findIndex((item) => item.id === value);
    let next = index;

    if (event.key === "ArrowLeft") next = index <= 0 ? items.length - 1 : index - 1;
    if (event.key === "ArrowRight") next = index >= items.length - 1 ? 0 : index + 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;

    const target = items[next];
    if (target) {
      onChange(target.id);
      const button = listRef.current?.querySelector<HTMLButtonElement>(`[data-tab="${target.id}"]`);
      button?.focus();
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn(
        "inline-flex flex-wrap gap-1 rounded-full border p-1",
        tone === "light" ? "border-navy-900/15 bg-navy-900/[0.04]" : "border-white/15 bg-white/[0.04]",
        className,
      )}
    >
      {items.map((item) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            data-tab={item.id}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            className={cn(
              "relative isolate rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-300 outline-none",
              selected
                ? tone === "light"
                  ? "text-white"
                  : "text-navy-900"
                : tone === "light"
                  ? "text-navy-900/60 hover:text-navy-900"
                  : "text-steel hover:text-white",
            )}
          >
            {selected ? (
              <motion.span
                layoutId={layoutId}
                className={cn(
                  "absolute inset-0 -z-10 rounded-full",
                  tone === "light" ? "bg-navy-900" : "bg-lime-400",
                )}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            {item.label}
            {item.hint ? (
              <span className="mt-0.5 block text-[8px] tracking-[0.12em] opacity-60 normal-case">
                {item.hint}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
