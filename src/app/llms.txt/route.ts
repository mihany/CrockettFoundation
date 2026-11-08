import { getAboutContent, getEvents, getPrograms, getSiteSettings } from "@/content";
import { formatEventDate, splitEvents } from "@/lib/events";
import { absoluteUrl } from "@/lib/seo";

// /llms.txt (https://llmstxt.org): a plain-Markdown briefing for AI answer
// engines — who the foundation is, what it offers, and what's coming up, with
// links to the canonical pages. Regenerated on every build, so it stays in
// step with Sanity like the rest of the site.
export const dynamic = "force-static";

export async function GET() {
  const [settings, about, programs, events] = await Promise.all([
    getSiteSettings(),
    getAboutContent(),
    getPrograms(),
    getEvents(),
  ]);
  const { upcoming, past } = splitEvents(events);

  const programLines = programs.map(
    (p) =>
      `- [${p.title}](${absoluteUrl(`/programs/${p.slug}/`)}): ${p.summary} Covers: ${p.coverage} Eligibility: ${p.eligibility}${p.deadline ? ` Deadline: ${p.deadline}.` : ""}`,
  );
  const eventLine = (e: (typeof events)[number]) =>
    `- [${e.title}](${absoluteUrl(`/events/${e.slug}/`)}) — ${formatEventDate(e)}${e.location ? `, ${e.location}` : ""}: ${e.summary}`;

  const body = [
    `# ${settings.orgName}`,
    "",
    `> ${about.intro}`,
    "",
    `Mission: ${about.mission}`,
    "",
    `Vision: ${about.vision}`,
    "",
    `The foundation awards support based on financial need, not merit. Contact: ${settings.contactEmail}.`,
    "",
    "## Programs and scholarships",
    "",
    ...(programLines.length ? programLines : ["- New programs will be announced soon."]),
    "",
    "## Upcoming events",
    "",
    ...(upcoming.length ? upcoming.map(eventLine) : ["- No events are scheduled right now."]),
    "",
    ...(past.length ? ["## Past events", "", ...past.slice(0, 10).map(eventLine), ""] : []),
    "## Key pages",
    "",
    `- [About](${absoluteUrl("/about/")}): mission, purpose, and vision`,
    `- [Programs](${absoluteUrl("/programs/")}): all scholarships and study abroad programs`,
    `- [Events](${absoluteUrl("/events/")}): information sessions and gatherings`,
    `- [Who we are](${absoluteUrl("/who-we-are/")}): board and leadership`,
    `- [Partner with us](${absoluteUrl("/partner-with-us/")}): internships, partnerships, and donations`,
    `- [Contact](${absoluteUrl("/contact/")})`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
