import type { MetadataRoute } from "next";
import { getPrograms } from "@/content";
import { asset, SITE_URL } from "@/lib/site";

// sitemap.ts is a Route Handler under the hood; static export requires it be
// explicitly marked static.
export const dynamic = "force-static";

const STATIC_ROUTES = [
  "/",
  "/about/",
  "/who-we-are/",
  "/programs/",
  "/partner-with-us/",
  "/contact/",
  "/privacy/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const programs = await getPrograms();
  const programRoutes = programs.map((program) => `/programs/${program.slug}/`);

  return [...STATIC_ROUTES, ...programRoutes].map((path) => ({
    url: `${SITE_URL}${asset(path)}`,
  }));
}
