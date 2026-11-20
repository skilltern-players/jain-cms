import { differenceInCalendarDays, format, parseISO, startOfDay } from "date-fns";
import type { TimelineEntry } from "@/data/conference";

export type TimelineStatus = "past" | "next" | "upcoming";

export type ResolvedTimelineEntry = TimelineEntry & {
  status: TimelineStatus;
  daysLeft: number;
};

/**
 * Resolve each date against the real current date. The first entry (in
 * chronological order, as authored in the data file) that has not finished is
 * the "next" deadline and receives the pulsing lime marker.
 */
export function resolveTimeline(
  entries: readonly TimelineEntry[],
  now: Date = new Date(),
): ResolvedTimelineEntry[] {
  const today = startOfDay(now);
  let nextAssigned = false;

  return entries.map((entry) => {
    const start = startOfDay(parseISO(entry.date));
    const end = startOfDay(parseISO(entry.endDate ?? entry.date));
    const finished = end < today;
    const daysLeft = differenceInCalendarDays(start, today);

    const status: TimelineStatus = finished ? "past" : nextAssigned ? "upcoming" : "next";
    if (!finished) nextAssigned = true;

    return { ...entry, status, daysLeft };
  });
}

export function formatTimelineDate(entry: TimelineEntry, pattern = "d MMM yyyy") {
  const start = parseISO(entry.date);
  if (!entry.endDate) return format(start, pattern);

  const end = parseISO(entry.endDate);
  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();

  if (sameMonth && sameYear) {
    return `${format(start, "d")} – ${format(end, pattern)}`;
  }
  if (sameYear) {
    return `${format(start, "d MMM")} – ${format(end, pattern)}`;
  }
  return `${format(start, pattern)} – ${format(end, pattern)}`;
}

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

export function countdownTo(target: string, now: Date = new Date()): CountdownParts {
  const diff = Math.max(0, new Date(target).getTime() - now.getTime());
  const seconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(seconds / 86_400),
    hours: Math.floor((seconds % 86_400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    finished: diff === 0,
  };
}

/** Days between today and the first conference day. */
export function daysUntilConference(startDate: string, now: Date = new Date()) {
  return differenceInCalendarDays(startOfDay(parseISO(startDate)), startOfDay(now));
}

/** Human label used in the deadline badge: "Today", "10 days left". */
export function daysLeftLabel(daysLeft: number) {
  if (daysLeft < 0) return "Closed";
  if (daysLeft === 0) return "Today";
  if (daysLeft === 1) return "1 day left";
  return `${daysLeft} days left`;
}

