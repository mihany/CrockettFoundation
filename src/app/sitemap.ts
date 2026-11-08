import type { MetadataRoute } from "next";
import { getEvents, getPrograms } from "@/content";
import { absoluteUrl } from "@/lib/seo";
import { isUpcoming } from "@/lib/events";

// sitemap.ts is a Route Handler under the hood; static export requires it be
// explicitly marked static.
export const dynamic = "force-static";

// Studio is deliberately absent: it is a CMS, not content.
const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/programs/", priority: 0.9 },
  { path: "/events/", priority: 0.9 },
  { path: "/about/", priority: 0.7 },
  { path: "/partner-with-us/", priority: 0.7 },
  { path: "/who-we-are/", priority: 0.6 },
  { path: "/contact/", priority: 0.5 },
  { path: "/privacy/", priority: 0.2 },
];

// Google ignores priority but Bing still reads it. lastModified comes from
// Sanity's _updatedAt, so it only changes when an editor actually edits —
// a lastmod that moves on every build teaches crawlers to ignore it.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programs, events] = await Promise.all([getPrograms(), getEvents()]);

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({ url: absoluteUrl(path), priority })),
    ...programs.map((program) => ({
      url: absoluteUrl(`/programs/${program.slug}/`),
      priority: 0.8,
      ...(program.updatedAt && { lastModified: program.updatedAt }),
    })),
    ...events.map((event) => ({
      url: absoluteUrl(`/events/${event.slug}/`),
      priority: isUpcoming(event) ? 0.8 : 0.4,
      ...(event.updatedAt && { lastModified: event.updatedAt }),
    })),
  ];
}
