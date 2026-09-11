// DRAFT — content pending client approval.
//
// donateHeading, donateBody, partnershipHeading, and partnershipBody are not
// client-provided copy — drafted here as short, neutral section copy. Flag
// for review. donationUrl is null until a payment provider is chosen; the
// donate block renders a bordered "Online giving opens soon" placeholder
// with contactEmail instead of a dead button. contactEmail is a placeholder,
// unconfirmed.
import type { PartnerContent } from "./types";

export const partnerContent: PartnerContent = {
  donateHeading: "Support a student", // draft — pending review
  donateBody:
    "Your gift helps cover the cost of flights and program fees for students who could not otherwise afford to study abroad.", // draft — pending review
  donationUrl: null,
  partnershipHeading: "Community Partnerships", // draft — pending review
  partnershipBody:
    "We welcome partnerships with schools, employers, and community organizations that share our commitment to expanding access to global education.", // draft — pending review
  contactEmail: "info@thecrockettfo.org", // unconfirmed placeholder
};
