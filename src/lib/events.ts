import type { Event } from "@/content/types";

// Dates are plain calendar dates (YYYY-MM-DD). They are parsed and formatted
// in UTC so the displayed day never shifts with the build machine's or the
// reader's timezone.
const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const dayFormat = new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: "UTC" });
const monthDayFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function parse(date: string): Date {
  return new Date(`${date}T00:00:00Z`);
}

export function formatEventDate(event: Pick<Event, "startDate" | "endDate">): string {
  const start = parse(event.startDate);
  if (!event.endDate || event.endDate === event.startDate) {
    return dateFormat.format(start);
  }

  const end = parse(event.endDate);
  if (start.getUTCFullYear() !== end.getUTCFullYear()) {
    return `${dateFormat.format(start)} – ${dateFormat.format(end)}`;
  }
  if (start.getUTCMonth() !== end.getUTCMonth()) {
    return `${monthDayFormat.format(start)} – ${dateFormat.format(end)}`;
  }
  return `${monthDayFormat.format(start)}–${dayFormat.format(end)}, ${start.getUTCFullYear()}`;
}

/**
 * An event counts as upcoming until the end of its last day. Evaluated when
 * the site is built — this is a static export, so the split only refreshes on
 * the next deploy.
 */
export function isUpcoming(event: Pick<Event, "startDate" | "endDate">, now = new Date()): boolean {
  const lastDay = parse(event.endDate ?? event.startDate);
  return lastDay.getTime() + 24 * 60 * 60 * 1000 > now.getTime();
}

export function splitEvents(events: Event[], now = new Date()) {
  const upcoming = events
    .filter((event) => isUpcoming(event, now))
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const past = events
    .filter((event) => !isUpcoming(event, now))
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
  return { upcoming, past };
}
