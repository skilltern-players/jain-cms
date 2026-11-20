"use client";

import { createEvent } from "ics";
import { differenceInCalendarDays, parseISO } from "date-fns";
import type { TimelineEntry } from "@/data/conference";
import { conference } from "@/data/conference";
import { SITE_URL } from "@/lib/config";

/**
 * Build a downloadable .ics for one timeline item. All conference milestones
 * are all-day events, so the calendar entry spans the whole date range.
 */
export function buildIcs(entry: TimelineEntry) {
  const start = parseISO(entry.date);
  const end = parseISO(entry.endDate ?? entry.date);
  const days = Math.max(1, differenceInCalendarDays(end, start) + 1);

  const title =
    entry.id === "conference-dates"
      ? `${conference.name} — ${conference.datesLabel}`
      : `${conference.name} — ${entry.label}`;

  const description =
    entry.id === "conference-dates"
      ? `${conference.fullTitle}. Venue: ${conference.venue}, ${conference.city}.`
      : `${entry.label} for ${conference.name}. ${entry.note ?? ""}`.trim();

  let result: string | null = null;

  createEvent(
    {
      start: [start.getFullYear(), start.getMonth() + 1, start.getDate()],
      duration: { days },
      title,
      description,
      location:
        entry.id === "conference-dates"
          ? `${conference.venue}, ${conference.organiser}`
          : "Online / Bengaluru, India",
      url: SITE_URL,
      status: "CONFIRMED",
      busyStatus: "BUSY",
      alarms: [
        {
          action: "display",
          description: `AIM-HUB 2027 reminder: ${entry.label}`,
          trigger: { hours: 24, before: true },
        },
      ],
    },
    (error, value) => {
      if (!error) result = value;
    },
  );

  return result;
}

/** Generate the file and hand it to the browser. */
export function downloadIcs(entry: TimelineEntry) {
  const content = buildIcs(entry);
  if (!content) return;

  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `aim-hub-2027-${entry.id}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
