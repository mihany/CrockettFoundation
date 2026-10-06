import type { MetadataRoute } from "next";
import { getEvents, getPrograms } from "@/content";
import { asset, SITE_URL } from "@/lib/site";

// sitemap.ts is a Route Handler under the hood; static export requires it be
// explicitly marked static.
export const dynamic = "force-static";

const STATIC_ROUTES = [
  "/",
  "/about/",
  "/who-we-are/",
  "/programs/",
  "/events/",
  "/partner-with-us/",
  "/contact/",
  "/privacy/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programs, events] = await Promise.all([getPrograms(), getEvents()]);
  const programRoutes = programs.map((program) => `/programs/${program.slug}/`);
  const eventRoutes = events.map((event) => `/events/${event.slug}/`);

  return [...STATIC_ROUTES, ...programRoutes, ...eventRoutes].map((path) => ({
    url: `${SITE_URL}${asset(path)}`,
  }));
}
