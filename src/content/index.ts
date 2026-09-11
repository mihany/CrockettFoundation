/**
 * The content accessor layer — the future CMS seam.
 *
 * Pages import only from `@/content`, never from the individual data files
 * below. Every accessor is `async` even though it resolves local data
 * synchronously today: when a headless CMS is connected, only the body of
 * these functions changes (local data -> fetch), and no page component has
 * to be touched.
 */
import type {
  SiteSettings,
  HomeContent,
  AboutContent,
  TeamMember,
  Program,
  PartnerContent,
  LegalPage,
  PageIntro,
  PageKey,
} from "./types";
import { siteSettings } from "./site";
import { homeContent } from "./home";
import { aboutContent } from "./about";
import { teamMembers } from "./team";
import { programs } from "./programs";
import { partnerContent } from "./partner";
import { legalPages } from "./legal";
import { pageIntros } from "./pages";

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

export async function getPrograms(): Promise<Program[]> {
  return programs;
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  return programs.find((program) => program.slug === slug) ?? null;
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
