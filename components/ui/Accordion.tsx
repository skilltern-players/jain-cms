"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
  meta?: string;
};

type AccordionProps = {
  items: readonly AccordionItem[];
  defaultOpen?: readonly string[];
  allowMultiple?: boolean;
  tone?: "dark" | "light";
  className?: string;
};

/** Mobile track list and any collapsible supporting detail. */
export default function Accordion({
  items,
  defaultOpen = [],
  allowMultiple = false,
  tone = "dark",
  className,
}: AccordionProps) {
  const [open, setOpen] = useState<string[]>([...defaultOpen]);
  const reduce = useReducedMotion();

  const toggle = (id: string) => {
    setOpen((current) => {
      const isOpen = current.includes(id);
      if (isOpen) return current.filter((item) => item !== id);
      return allowMultiple ? [...current, id] : [id];
    });
  };

  return (
    <div className={cn("divide-y", tone === "light" ? "divide-navy-900/10" : "divide-white/10", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`panel-${item.id}`}
                id={`trigger-${item.id}`}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span className="flex items-baseline gap-4">
                  {item.meta ? (
                    <span
                      className={cn(
                        "font-mono text-[10px] tracking-[0.18em]",
                        tone === "light" ? "text-navy-700/50" : "text-steel/70",
                      )}
                    >
                      {item.meta}
                    </span>
                  ) : null}
                  <span
                    className={cn(
                      "font-display text-base leading-snug font-medium transition-colors duration-300 sm:text-lg",
                      tone === "light"
                        ? "text-navy-900"
                        : "text-white group-hover:text-lime-400",
                    )}
                  >
                    {item.title}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                    tone === "light" ? "border-navy-900/20" : "border-white/20",
                    isOpen && (tone === "light" ? "bg-navy-900 text-white" : "bg-lime-400 text-navy-900"),
                  )}
                >
                  {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={`panel-${item.id}`}
                  role="region"
                  aria-labelledby={`trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "max-w-2xl pb-6 text-sm leading-relaxed",
                      tone === "light" ? "text-navy-900/70" : "text-steel",
                    )}
                  >
                    {item.content}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
