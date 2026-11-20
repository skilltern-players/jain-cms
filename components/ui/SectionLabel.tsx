import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionLabelProps = {
  index: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

/** Mono section marker: a lime dot, number, slash and label. */
export default function SectionLabel({
  index,
  children,
  tone = "dark",
  className,
}: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span aria-hidden className="bg-lime-400 h-1.5 w-1.5 shrink-0 rounded-full" />
      <span
        className={cn(
          "font-mono text-eyebrow uppercase",
          tone === "light" ? "text-navy-700/70" : "text-steel",
        )}
      >
        {index} / {children}
      </span>
    </div>
  );
}
