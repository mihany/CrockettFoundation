// DRAFT — content pending client approval.
//
// Page intros: the heading + lede editorial prose a non-technical editor
// might reword. who-we-are and programs are moved here verbatim from where
// they were previously hardcoded in their page files. contact's intro folds
// in the brief's "response-time note" as one paragraph, since there is no
// dedicated ContactContent type for it — flagged for review, same as the
// rest of this file. privacy's intro is the first sentence moved out of
// legal.ts's body, to avoid repeating it there.
import type { PageIntro, PageKey } from "./types";

export const pageIntros: Record<PageKey, PageIntro> = {
  "who-we-are": {
    heading: "Who we are",
    intro: "Meet the board and leadership guiding The Crockett Foundation.",
  },
  programs: {
    heading: "Programs",
    intro:
      "Scholarships and study abroad programs that remove the financial barriers standing between students and an international education.",
  },
  events: {
    heading: "Events",
    intro:
      "Information sessions, workshops, and gatherings for students, families, and supporters of The Crockett Foundation.", // draft — pending review
  },
  contact: {
    heading: "Contact",
    intro:
      "Questions about our programs or how to get involved? Reach out using the form below, or email us directly — we typically respond within two to three business days.", // draft — pending review
  },
  privacy: {
    heading: "Privacy policy",
    intro: "This privacy policy is currently being drafted.",
  },
};
