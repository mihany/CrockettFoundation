import type { Metadata } from "next";
import { metadata as studioMetadata } from "next-sanity/studio";
import Studio from "./Studio";

export { viewport } from "next-sanity/studio";

export const metadata: Metadata = { ...studioMetadata, title: "Studio" };

// Static export: only /studio itself is prerendered. Every other Studio URL
// is handled client-side by the Studio's own router.
export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <Studio />;
}
