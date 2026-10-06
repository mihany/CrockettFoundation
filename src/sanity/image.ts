import { createImageUrlBuilder } from "@sanity/image-url";
import type { ContentImage } from "@/content/types";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

export interface SanityImageField {
  alt?: string | null;
  asset?: { _ref: string } | null;
  crop?: unknown;
  hotspot?: unknown;
}

/**
 * Maps a Sanity image field onto the site's `{ src, alt }` shape. The
 * 1200x600 crop matches the 2:1 box ContentImage renders and honours the
 * editor's crop and hotspot. Returns null when no image was uploaded.
 */
export function toContentImage(image: SanityImageField | null | undefined): ContentImage | null {
  if (!image?.asset) return null;
  return {
    src: builder
      .image(image as Parameters<typeof builder.image>[0])
      .width(1200)
      .height(600)
      .fit("crop")
      .auto("format")
      .url(),
    alt: image.alt ?? "",
  };
}
