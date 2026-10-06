/**
 * The content accessor layer — the future CMS seam.
 *
 * Pages import only from `@/content`, never from the individual data files
 * below. Every accessor is `async`: programs and events are fetched from
 * Sanity, the rest still resolve local data and can move to Sanity the same
 * way, without touching any page component.
 */
import type {
  SiteSettings,
  HomeContent,
  AboutContent,
  TeamMember,
  Program,
  Event,
  PartnerContent,
  LegalPage,
  PageIntro,
  PageKey,
} from "./types";
import { siteSettings } from "./site";
import { homeContent } from "./home";
import { aboutContent } from "./about";
import { teamMembers } from "./team";
import { partnerContent } from "./partner";
import { legalPages } from "./legal";
import { pageIntros } from "./pages";
import { splitEvents } from "@/lib/events";
import {
  fetchEvents,
  fetchEventBySlug,
  fetchPrograms,
  fetchProgramBySlug,
} from "@/sanity/queries";

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

export async function getHomeContent(): Promise<HomeContent> {
  return homeContent;
}

export async function getAboutContent(): Promise<AboutContent> {
  return aboutContent;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return teamMembers;
}

// Programs and events come from Sanity. Everything else is still local data.
export async function getPrograms(): Promise<Program[]> {
  return fetchPrograms();
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  return fetchProgramBySlug(slug);
}

/**
 * One program picked at random, for the home page. This is a static export,
 * so the pick is made once per build and stays fixed until the next deploy.
 * GROQ has no random(), so the pick stays here rather than in the query.
 */
export async function getFeaturedProgram(): Promise<Program | null> {
  const all = await getPrograms();
  if (all.length === 0) return null;
  return all[Math.floor(Math.random() * all.length)];
}

export async function getEvents(): Promise<Event[]> {
  return fetchEvents();
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return fetchEventBySlug(slug);
}

/**
 * The soonest event that has not finished yet, or null when none is
 * scheduled. Filtering happens in JS (splitEvents) so the "upcoming" rule
 * lives in one place; the event list is small.
 */
export async function getNextUpcomingEvent(): Promise<Event | null> {
  const { upcoming } = splitEvents(await getEvents());
  return upcoming[0] ?? null;
}

export async function getPartnerContent(): Promise<PartnerContent> {
  return partnerContent;
}

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  return legalPages.find((page) => page.slug === slug) ?? null;
}

export async function getPageIntro(key: PageKey): Promise<PageIntro> {
  return pageIntros[key];
}
