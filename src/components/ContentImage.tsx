import { asset } from "@/lib/site";
import type { ContentImage as ContentImageData } from "@/content/types";

interface ContentImageProps {
  image: ContentImageData | null;
  className?: string;
}

const PLACEHOLDER_SRC = "/images/placeholder-banner.svg";

// Plain <img> + asset() rather than next/image, for the same basePath reason
// as TeamMemberCard. The fixed 2:1 box keeps list and detail layouts stable
// whatever dimensions an uploaded photo has. A missing image is decorative
// (empty alt) — the placeholder carries no information.
export function ContentImage({ image, className = "" }: ContentImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- see comment above
    <img
      src={asset(image?.src ?? PLACEHOLDER_SRC)}
      alt={image?.alt ?? ""}
      width={1200}
      height={600}
      className={`aspect-[2/1] w-full bg-cream object-cover ${className}`}
    />
  );
}
