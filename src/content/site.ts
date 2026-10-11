// DRAFT — content pending client approval.
//
// tagline and footerNote are not yet client-provided copy: tagline is a
// short compression of the approved mission language, and footerNote reuses
// the approved home mission pull quote verbatim. Flag both for review.
// ein is null until the client supplies a real EIN; the footer omits the
// 501(c)(3)/EIN line entirely while it is null, the same null-safe treatment
// as donationUrl.
import type { SiteSettings } from "./types";

export const siteSettings: SiteSettings = {
  orgName: "The Crockett Foundation",
  tagline: "Removing financial barriers to global education.", // draft — pending review
  contactEmail: "info@crockettfoundationdc.org",
  ein: null,
  socialLinks: [],
  donationUrl: null,
  footerNote:
    "To limit financial barriers to global education by providing financial and educational assistance to underserved high school and college students.", // draft — pending review; reused verbatim from the home mission pull quote
};
