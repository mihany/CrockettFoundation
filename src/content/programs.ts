// DRAFT — content pending client approval.
//
// coverage and eligibility split the client-provided summary sentence into
// the two program-detail sections without adding new facts. Global
// Leadership Scholarship's requirements and note are client-provided
// verbatim. Summer in Egypt's coverage/eligibility state plainly that those
// details are pending, per the brief — deadline, applyUrl, dates, and cost
// are all genuinely unresolved.
import type { Program } from "./types";

export const programs: Program[] = [
  {
    slug: "global-leadership-scholarship",
    title: "Global Leadership Scholarship",
    category: "scholarship",
    status: "open",
    summary:
      "Covers the cost of the flight for low-income college students studying abroad in Latin America, the Middle East and North Africa, Sub-Saharan Africa, or East and South Asia.",
    coverage: "The cost of the flight to study abroad.",
    eligibility:
      "Low-income college students studying abroad in Latin America, the Middle East and North Africa, Sub-Saharan Africa, or East and South Asia.",
    requirements: [
      "Scholarship application",
      "A 500-word essay on professional and academic goals",
      "Proof of need-based assistance",
    ],
    note: "Preference is given to students studying abroad for a semester or longer.",
    deadline: null,
    applyUrl: null,
    order: 1,
  },
  {
    slug: "summer-in-egypt",
    title: "Summer in Egypt",
    category: "program",
    status: "coming-soon",
    summary:
      "Four weeks of study in Cairo combining a service-learning course with a choice of Global Leadership Seminar or Qualitative Approaches to Middle East Studies.",
    coverage: "Program costs and coverage details are still being finalized.",
    eligibility: "Eligibility details are still being finalized.",
    requirements: [],
    deadline: null,
    applyUrl: null,
    order: 2,
  },
];
