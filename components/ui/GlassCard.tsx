import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  hud?: boolean;
  strong?: boolean;
};

/** Glass panel used for hero overlays, stats and floating chips. */
export default function GlassCard({
  className,
  hud = false,
  strong = false,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass",
        hud && "hud-frame",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
