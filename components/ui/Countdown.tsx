"use client";

import { useEffect, useState } from "react";
import { countdownTo, type CountdownParts } from "@/lib/dates";
import { COUNTDOWN_TARGET } from "@/lib/config";
import { pad } from "@/lib/utils";
import { cn } from "@/lib/utils";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="min-w-[2.6rem]">
      <span className="font-mono text-xl leading-none tabular-nums sm:text-2xl">
        {pad(value, 2)}
      </span>
      <span className="mt-1 block font-mono text-[8px] tracking-[0.18em] text-steel uppercase">
        {label}
      </span>
    </div>
  );
}

/** Live countdown to 24 June 2027, 09:00 IST. */
export default function Countdown({ className }: { className?: string }) {
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const tick = () => setParts(countdownTo(COUNTDOWN_TARGET));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={cn("flex items-end gap-4", className)}>
      <span className="sr-only">
        {parts ? `Countdown: ${parts.days} days, ${parts.hours} hours until 24 June 2027` : "Countdown to 24 June 2027"}
      </span>
      <div aria-hidden className="flex items-end gap-4">
        <Unit value={parts?.days ?? 0} label="Days" />
        <Unit value={parts?.hours ?? 0} label="Hours" />
        <Unit value={parts?.minutes ?? 0} label="Minutes" />
        <Unit value={parts?.seconds ?? 0} label="Seconds" />
      </div>
    </div>
  );
}
