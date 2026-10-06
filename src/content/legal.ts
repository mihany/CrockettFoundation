// DRAFT — content pending client approval.
//
// Privacy page body is placeholder boilerplate per the brief ("a clearly
// marked placeholder page explaining that the policy is being drafted, with
// the contact email"). The page's own lede ("This privacy policy is
// currently being drafted.") now lives in pages.ts as its PageIntro — body
// continues from there rather than repeating it.
import type { LegalPage } from "./types";

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    body: [
      "In the meantime, if you have questions about how your information is collected or used, please contact us at info@crockettfoundationdc.org.",
    ],
  },
];
