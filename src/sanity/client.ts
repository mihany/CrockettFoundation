import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// Read-only, unauthenticated client. The site is a static export, so every
// fetch runs once at build time — the live CDN adds nothing there and could
// serve slightly stale data right after a publish, so it is switched off.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
