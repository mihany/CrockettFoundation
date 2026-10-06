// Internships and donate copy is client-provided. partnershipHeading and
// partnershipBody are still drafted placeholder copy — the client's
// Community Partnerships text arrived cut off ("Organizations …"), so it
// needs a follow-up before this section is final.
// donationUrl is null until the client supplies their PayPal donate link
// (https://www.paypal.com/donate/?hosted_button_id=…); the donate block
// renders a bordered "Online giving opens soon" placeholder until then,
// instead of a dead button.
import type { PartnerContent } from "./types";

export const partnerContent: PartnerContent = {
  internships: {
    heading: "Internships",
    intro:
      "Apply for a student internship to help advance the mission of The Crockett Foundation.",
    commitment:
      "Internships are completed on a semester (Fall/Spring) basis and require at least 4–6 hours a week.",
    rolesHeading: "Available internships",
    roles: ["Media Specialist – Interview Conductor", "Media Specialist – Social Media Manager"],
    applyHeading: "How to apply",
    applyIntro: "Email your application to the address below. Your email should contain:",
    requiredFields: ["Applicant’s first and last name", "Semester", "Major", "Resume"],
    applyEmail: "info@crockettfoundationdc.org",
  },
  donateHeading: "Donate",
  donateBody:
    "Make a contribution today to empower underserved youth to advance their global training and knowledge to thrive in today’s 21st century interconnected workforce.",
  donationUrl: null,
  partnershipHeading: "Community Partnerships", // draft — pending review
  partnershipBody:
    "We welcome partnerships with schools, employers, and community organizations that share our commitment to expanding access to global education.", // draft — pending review
  contactEmail: "info@crockettfoundationdc.org",
};
