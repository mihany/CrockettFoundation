// DRAFT — content pending client approval.
//
// connectHeading/connectBody are not client-provided copy — drafted here as
// short, neutral closing-block text. Flag for review.
import type { HomeContent } from "./types";

export const homeContent: HomeContent = {
  heroHeading: "Cost should never be the reason a student stays home.", // draft — replaces the flight quote, which moved to the Global Leadership Scholarship page
  heroSubheading:
    "The Crockett Foundation removes the financial barriers that keep underserved high school and college students from studying abroad.",
  primaryCta: {
    label: "Explore programs",
    href: "/programs",
  },
  secondaryCta: {
    label: "Donate",
    href: "/partner-with-us",
  },
  pillars: [
    {
      title: "Education",
      body: "We provide financial assistance for the parts of an international education that scholarships usually leave out.",
    },
    {
      title: "Global Citizenship",
      body: "Students return with intercultural skills and a working understanding of a region most of their peers have only read about.",
    },
    {
      title: "Equity and Access",
      body: "Study abroad has long tracked family income. We award on need so that it stops doing so.",
    },
  ],
  missionPullQuote:
    "To remove financial barriers to global education by providing financial and educational assistance to underserved high school and college students.",
  connectHeading: "Get in touch", // draft — pending review
  connectBody:
    "Questions about our programs, or interested in supporting a student? We'd like to hear from you.", // draft — pending review
};
