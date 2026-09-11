/**
 * Content type definitions.
 *
 * These are the shapes every accessor in `./index.ts` returns. A future
 * headless CMS integration changes the *body* of those accessor functions
 * (local data -> fetch) but should never need to change these shapes or the
 * pages that consume them.
 */

export interface SocialLink {
  label: string;
  href: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface SiteSettings {
  orgName: string;
  tagline: string;
  contactEmail: string;
  /** Null until the client supplies a real EIN; the footer omits the 501(c)(3)/EIN line entirely when null. */
  ein: string | null;
  socialLinks: SocialLink[];
  /** Third-party donation URL. Null until a payment provider is chosen. */
  donationUrl: string | null;
  footerNote: string;
}

export interface Pillar {
  title: string;
  body: string;
}

export interface HomeContent {
  heroHeading: string;
  heroSubheading: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  pillars: [Pillar, Pillar, Pillar];
  missionPullQuote: string;
  connectHeading: string;
  connectBody: string;
}

export interface AboutContent {
  intro: string;
  mission: string;
  purpose: string;
  vision: string;
}

export interface TeamMember {
  id: string;
  /** Null until the client confirms names for publication. */
  name: string | null;
  role: string;
  order: number;
  /** Null until real portraits are supplied; components fall back to a placeholder. */
  photo: string | null;
  /** Null until bios are written. */
  bio: string | null;
}

export type ProgramCategory = "scholarship" | "program";
export type ProgramStatus = "open" | "coming-soon" | "closed";

export interface Program {
  slug: string;
  title: string;
  category: ProgramCategory;
  status: ProgramStatus;
  summary: string;
  coverage: string;
  eligibility: string;
  requirements: string[];
  note?: string;
  /** Null until a deadline is set; components render "Applications open soon" instead. */
  deadline: string | null;
  /** Null until an application link exists; the apply CTA is hidden or disabled instead. */
  applyUrl: string | null;
  order: number;
}

export interface PartnerContent {
  donateHeading: string;
  donateBody: string;
  /** Third-party donation URL. Null until a payment provider is chosen. */
  donationUrl: string | null;
  partnershipHeading: string;
  partnershipBody: string;
  contactEmail: string;
}

export interface LegalPage {
  slug: string;
  title: string;
  body: string[];
}

// Editorial prose for a page's top-of-page heading + lede — the kind of
// copy a non-technical editor might reword. Fixed structural labels (like
// "Mission", "Purpose", "Vision", or nav labels) are not PageIntros; those
// stay hardcoded in their page files.
export interface PageIntro {
  heading: string;
  intro: string;
}

export type PageKey = "who-we-are" | "programs" | "contact" | "privacy";
