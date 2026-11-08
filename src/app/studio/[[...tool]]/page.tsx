import type { Metadata } from "next";
import { metadata as studioMetadata } from "next-sanity/studio";
import Studio from "./Studio";

export { viewport } from "next-sanity/studio";

export const metadata: Metadata = { ...studioMetadata, title: "Studio" };

// Static export: /studio and its top-level tool routes are prerendered (the
// tool routes also keep `next dev` from erroring on a reload at
// /studio/structure/). Deeper URLs (/studio/structure/event;id) are handled
// client-side by the Studio's own router; in production a hard load of one
// falls back to the 404 redirect.
export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ tool: [] }, { tool: ["structure"] }, { tool: ["vision"] }];
}

export default function StudioPage() {
  return <Studio />;
}
