import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names with Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-pad a number for HUD readouts: 47 -> "047". */
export function pad(value: number, length = 3) {
  return String(Math.max(0, Math.floor(value))).padStart(length, "0");
}

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

/** Map a value from one range to another, clamped. */
export function mapRange(value: number, inMin: number, inMax: number, outMin = 0, outMax = 1) {
  if (inMax === inMin) return outMin;
  return outMin + clamp((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}
