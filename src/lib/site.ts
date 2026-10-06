/**
 * Site-structure helpers — navigation config and the base-path-aware asset
 * resolver. This is deliberately separate from `src/content`: nav labels and
 * routes are site structure, not CMS content, and won't move to a headless
 * CMS later.
 */

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Partner With Us", href: "/partner-with-us" },
];

// The header's Donate button and the footer's nav repeat both need a target
// distinct from the plain nav links above; there is no dedicated donate page.
export const DONATE_HREF = "/partner-with-us";

// The Contact page links out to a third-party form service — not yet
// chosen. Null renders a defined "coming soon" fallback instead of a dead
// link, the same treatment as PartnerContent.donationUrl.
export const CONTACT_FORM_URL: string | null = null;

// Placeholder — the real domain (GitHub Pages or a custom domain) is not
// known yet. Used only to build absolute URLs in sitemap.ts; nothing else on
// the site depends on it. Must be set correctly before launch — see the
// README's Handover checklist.
export const SITE_URL = "https://example.com";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Resolves a raw reference to a file in `public/` against the deployed base
 * path. `next/link` and `next/image` already apply basePath automatically —
 * this is only for cases that bypass them (a plain <img src>, a favicon
 * href, a manifest reference).
 */
export function asset(path: string): string {
  // Absolute URLs (CMS images on cdn.sanity.io) are already complete.
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
