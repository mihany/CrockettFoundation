import Link from "next/link";
import {
  getFeaturedProgram,
  getHomeContent,
  getNextUpcomingEvent,
  getPrograms,
} from "@/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { ProgramCard } from "@/components/ProgramCard";
import { EventCard } from "@/components/EventCard";

export default async function HomePage() {
  const [home, programs, featuredProgram, nextEvent] = await Promise.all([
    getHomeContent(),
    getPrograms(),
    getFeaturedProgram(),
    getNextUpcomingEvent(),
  ]);

  return (
    <>
      {/* Hero — the one bold place in the design. Large display type, leading
          tightening as the type scales up (1.15 base / 1.1 sm / 1.05 lg), and
          the site's only entrance animation (motion-safe only). */}
      <section className="bg-white pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
        <Container>
          <h1 className="motion-safe:animate-[fade-up_0.7s_ease-out_both] max-w-[20ch] font-display text-4xl leading-[1.15] tracking-tight text-gold-deep sm:text-5xl sm:leading-[1.1] lg:text-7xl lg:leading-[1.05]">
            {home.heroHeading}
          </h1>
          <p className="motion-safe:animate-[fade-up_0.7s_ease-out_0.15s_both] mt-6 max-w-[42ch] text-lg text-ink sm:text-xl">
            {home.heroSubheading}
          </p>
          <div className="motion-safe:animate-[fade-up_0.7s_ease-out_0.3s_both] mt-8 flex flex-wrap gap-4">
            <Link
              href={home.primaryCta.href}
              className="rounded-sm bg-gold-primary px-6 py-3 text-sm font-medium text-white hover:bg-gold-deep"
            >
              {home.primaryCta.label}
            </Link>
            <Link
              href={home.secondaryCta.href}
              className="rounded-sm border border-gold-primary px-6 py-3 text-sm font-medium text-gold-primary hover:bg-cream"
            >
              {home.secondaryCta.label}
            </Link>
          </div>
        </Container>
      </section>

      {/* Pillars — prose columns only: a heading and a paragraph, no icons,
          no cards, no borders, no shadows, no equal-height boxes. */}
      <Section rule>
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {home.pillars.map((pillar) => (
            <div key={pillar.title}>
              <h2 className="font-display text-xl text-gold-deep">{pillar.title}</h2>
              <p className="mt-3 max-w-[38ch] text-ink">{pillar.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream" rule>
        <blockquote className="max-w-[60ch] font-display text-2xl leading-snug text-gold-deep sm:text-3xl lg:text-4xl">
          &ldquo;{home.missionPullQuote}&rdquo;
        </blockquote>
      </Section>

      <Section rule>
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </Section>

      {(featuredProgram || nextEvent) && (
        <Section tone="cream" rule>
          <div
            className={`grid gap-12 ${featuredProgram && nextEvent ? "lg:grid-cols-2 lg:gap-16" : ""}`}
          >
            {featuredProgram && (
              <div>
                <h2 className="font-display text-2xl text-gold-deep">Featured program</h2>
                <div className="mt-8">
                  <ProgramCard program={featuredProgram} headingLevel="h3" />
                </div>
              </div>
            )}
            {nextEvent && (
              <div>
                <h2 className="font-display text-2xl text-gold-deep">Next event</h2>
                <div className="mt-8">
                  <EventCard event={nextEvent} headingLevel="h3" stacked />
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section rule>
        <h2 className="font-display text-2xl text-gold-deep">{home.connectHeading}</h2>
        <p className="mt-4 max-w-[60ch] text-ink">{home.connectBody}</p>
      </Section>
    </>
  );
}
