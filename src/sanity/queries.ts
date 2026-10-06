import type { Event, Program, ProgramCategory, ProgramStatus } from "@/content/types";
import { client } from "./client";
import { toContentImage, type SanityImageField } from "./image";

// Dates are stored as plain calendar dates (YYYY-MM-DD). Programs show their
// deadline as display text, so it is formatted here — in UTC, for the same
// reason as src/lib/events.ts: the day must not shift with the build machine's
// timezone.
const deadlineFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const IMAGE = `image{ alt, asset, crop, hotspot }`;

const EVENT_PROJECTION = `{
  "slug": slug.current,
  title,
  summary,
  description,
  startDate,
  endDate,
  location,
  registrationUrl,
  ${IMAGE}
}`;

const PROGRAM_PROJECTION = `{
  "slug": slug.current,
  title,
  category,
  status,
  summary,
  coverage,
  eligibility,
  requirements,
  note,
  pullQuote,
  deadline,
  applyUrl,
  order,
  ${IMAGE}
}`;

interface EventResult {
  slug: string;
  title: string;
  summary: string;
  description: string;
  startDate: string;
  endDate: string | null;
  location: string | null;
  registrationUrl: string | null;
  image: SanityImageField | null;
}

interface ProgramResult {
  slug: string;
  title: string;
  category: ProgramCategory;
  status: ProgramStatus;
  summary: string;
  coverage: string;
  eligibility: string;
  requirements: string[] | null;
  note: string | null;
  pullQuote: string | null;
  deadline: string | null;
  applyUrl: string | null;
  order: number;
  image: SanityImageField | null;
}

function toEvent(result: EventResult): Event {
  return {
    slug: result.slug,
    title: result.title,
    summary: result.summary,
    // The Studio field is one multi-line text box; a blank line starts a new paragraph.
    description: result.description
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
    startDate: result.startDate,
    endDate: result.endDate,
    location: result.location,
    registrationUrl: result.registrationUrl,
    image: toContentImage(result.image),
  };
}

function toProgram(result: ProgramResult): Program {
  return {
    slug: result.slug,
    title: result.title,
    category: result.category,
    status: result.status,
    summary: result.summary,
    coverage: result.coverage,
    eligibility: result.eligibility,
    requirements: result.requirements ?? [],
    note: result.note ?? undefined,
    pullQuote: result.pullQuote ?? undefined,
    deadline: result.deadline ? deadlineFormat.format(new Date(`${result.deadline}T00:00:00Z`)) : null,
    applyUrl: result.applyUrl,
    image: toContentImage(result.image),
    order: result.order,
  };
}

export async function fetchEvents(): Promise<Event[]> {
  const results = await client.fetch<EventResult[]>(
    `*[_type == "event" && defined(slug.current)] | order(startDate asc) ${EVENT_PROJECTION}`,
  );
  return results.map(toEvent);
}

export async function fetchEventBySlug(slug: string): Promise<Event | null> {
  const result = await client.fetch<EventResult | null>(
    `*[_type == "event" && slug.current == $slug][0] ${EVENT_PROJECTION}`,
    { slug },
  );
  return result ? toEvent(result) : null;
}

export async function fetchPrograms(): Promise<Program[]> {
  const results = await client.fetch<ProgramResult[]>(
    `*[_type == "program" && defined(slug.current)] | order(order asc) ${PROGRAM_PROJECTION}`,
  );
  return results.map(toProgram);
}

export async function fetchProgramBySlug(slug: string): Promise<Program | null> {
  const result = await client.fetch<ProgramResult | null>(
    `*[_type == "program" && slug.current == $slug][0] ${PROGRAM_PROJECTION}`,
    { slug },
  );
  return result ? toProgram(result) : null;
}
