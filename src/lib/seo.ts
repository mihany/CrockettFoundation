/**
 * Search and AI-discovery helpers: per-page metadata and schema.org
 * structured data (JSON-LD).
 *
 * Next.js overwrites nested metadata fields like `openGraph` per segment
 * rather than merging them, so every page builds its metadata through
 * `pageMetadata()` to get a complete, consistent set: canonical URL, Open
 * Graph, and Twitter card.
 */
import type { Metadata } from "next";
import type { Event, Program, SiteSettings } from "@/content/types";
import { asset, SITE_URL } from "./site";

/** The site-wide share image, rendered at build time by src/app/og-default.png/route.tsx. */
export const DEFAULT_OG_IMAGE = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "The Crockett Foundation — study abroad scholarships for underserved students",
};

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Absolute URL for a site path or public/ file. CMS URLs pass through unchanged. */
export function absoluteUrl(path: string): string {
  const resolved = asset(path);
  return /^https?:\/\//.test(resolved) ? resolved : `${SITE_URL}${resolved}`;
}

/**
 * Absolute URL for an image that will be shared or read by crawlers. Social
 * networks reject SVG and WebP is patchy, so Sanity images are requested as
 * JPEG. Local SVG placeholders carry no information and fall back to the
 * default share card.
 */
export function shareImageUrl(src: string | undefined): string {
  if (!src || (!src.startsWith("http") && src.endsWith(".svg"))) {
    return absoluteUrl(DEFAULT_OG_IMAGE.url);
  }
  if (src.startsWith("https://cdn.sanity.io/")) {
    const url = new URL(src);
    url.searchParams.delete("auto");
    url.searchParams.set("fm", "jpg");
    url.searchParams.set("q", "85");
    return url.toString();
  }
  return absoluteUrl(src);
}

interface PageMetadataInput {
  /** Fills the root layout's `%s | The Crockett Foundation` template. */
  title: string;
  description: string;
  /** Route path with trailing slash, matching `trailingSlash: true`. */
  path: string;
  image?: { src: string; alt: string } | null;
  type?: "website" | "article";
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: PageMetadataInput): Metadata {
  const shareUrl = shareImageUrl(image?.src);
  const images =
    image && shareUrl !== absoluteUrl(DEFAULT_OG_IMAGE.url)
      ? [{ url: shareUrl, width: 1200, height: 600, alt: image.alt }]
      : [DEFAULT_OG_IMAGE];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      siteName: "The Crockett Foundation",
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
}

// ---------------------------------------------------------------------------
// Structured data
// ---------------------------------------------------------------------------

type JsonLdObject = Record<string, unknown>;

/** The foundation itself — referenced by @id from every other entity. */
export function organizationJsonLd(settings: SiteSettings, description: string): JsonLdObject {
  return {
    "@type": ["NGO", "EducationalOrganization"],
    "@id": ORGANIZATION_ID,
    name: settings.orgName,
    alternateName: "Crockett Foundation",
    url: `${SITE_URL}/`,
    email: settings.contactEmail,
    description,
    slogan: settings.tagline,
    image: absoluteUrl(DEFAULT_OG_IMAGE.url),
    knowsAbout: [
      "Study abroad scholarships",
      "International education",
      "Global citizenship",
      "Educational equity",
      "Financial aid for underserved students",
    ],
    ...(settings.ein && { taxID: settings.ein, nonprofitStatus: "Nonprofit501c3" }),
    ...(settings.socialLinks.length > 0 && {
      sameAs: settings.socialLinks.map((link) => link.href),
    }),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "general inquiries",
      email: settings.contactEmail,
      url: absoluteUrl("/contact/"),
    },
  };
}

export function websiteJsonLd(settings: SiteSettings): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: settings.orgName,
    url: `${SITE_URL}/`,
    inLanguage: "en-US",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLdObject {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

const ATTENDANCE_MODE = {
  "in-person": "https://schema.org/OfflineEventAttendanceMode",
  online: "https://schema.org/OnlineEventAttendanceMode",
  hybrid: "https://schema.org/MixedEventAttendanceMode",
} as const;

export function eventJsonLd(event: Event): JsonLdObject {
  const url = absoluteUrl(`/events/${event.slug}/`);
  const physical = event.location
    ? { "@type": "Place", name: event.location, address: event.location }
    : null;
  const virtual = {
    "@type": "VirtualLocation",
    url: event.registrationUrl ?? url,
  };
  const location =
    event.attendanceMode === "online"
      ? virtual
      : event.attendanceMode === "hybrid"
        ? [physical, virtual].filter(Boolean)
        : physical;

  return {
    "@type": "EducationEvent",
    "@id": `${url}#event`,
    name: event.title,
    description: event.summary,
    url,
    startDate: event.startDate,
    endDate: event.endDate ?? event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: ATTENDANCE_MODE[event.attendanceMode],
    ...(location && { location }),
    image: [shareImageUrl(event.image?.src)],
    organizer: { "@id": ORGANIZATION_ID, "@type": "Organization", name: "The Crockett Foundation", url: `${SITE_URL}/` },
    inLanguage: "en-US",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "High school and college students, families, and supporters",
    },
    ...(event.registrationUrl && {
      offers: {
        "@type": "Offer",
        url: event.registrationUrl,
        availability: "https://schema.org/InStock",
      },
    }),
  };
}

export function programJsonLd(program: Program): JsonLdObject {
  const url = absoluteUrl(`/programs/${program.slug}/`);
  const provider = { "@id": ORGANIZATION_ID };

  // A scholarship is money awarded to students; a program is an educational
  // experience. schema.org models the two differently.
  if (program.category === "scholarship") {
    return {
      "@type": "MonetaryGrant",
      "@id": `${url}#scholarship`,
      name: program.title,
      description: program.summary,
      disambiguatingDescription: program.coverage,
      url,
      funder: provider,
      image: shareImageUrl(program.image?.src),
      ...(program.deadlineDate && { expires: program.deadlineDate }),
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        audienceType: program.eligibility,
      },
    };
  }

  return {
    "@type": "EducationalOccupationalProgram",
    "@id": `${url}#program`,
    name: program.title,
    description: program.summary,
    url,
    provider,
    image: shareImageUrl(program.image?.src),
    ...(program.deadlineDate && { applicationDeadline: program.deadlineDate }),
    programPrerequisites: program.eligibility,
    offers: {
      "@type": "Offer",
      category: "Financial assistance",
      description: program.coverage,
      ...(program.applyUrl && { url: program.applyUrl }),
    },
  };
}

export function itemListJsonLd(name: string, urls: string[]): JsonLdObject {
  return {
    "@type": "ItemList",
    name,
    itemListElement: urls.map((url, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(url),
    })),
  };
}
