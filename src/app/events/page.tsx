import type { Metadata } from "next";
import { getEvents, getPageIntro } from "@/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { EventCard } from "@/components/EventCard";
import { splitEvents } from "@/lib/events";

export async function generateMetadata(): Promise<Metadata> {
  const pageIntro = await getPageIntro("events");
  return { title: pageIntro.heading, description: pageIntro.intro };
}

export default async function EventsPage() {
  const [pageIntro, events] = await Promise.all([getPageIntro("events"), getEvents()]);
  const { upcoming, past } = splitEvents(events);

  return (
    <>
      <section className="bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <Container>
          <h1 className="font-display text-4xl text-gold-deep sm:text-5xl">
            {pageIntro.heading}
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg text-ink">{pageIntro.intro}</p>
        </Container>
      </section>

      <Section rule>
        <h2 className="font-display text-2xl text-gold-deep">Upcoming events</h2>
        {upcoming.length > 0 ? (
          <ul className="mt-8 flex flex-col gap-10">
            {upcoming.map((event) => (
              <li key={event.slug}>
                <EventCard event={event} headingLevel="h3" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-ink-muted">
            No events are scheduled right now. Check back soon.
          </p>
        )}
      </Section>

      {past.length > 0 && (
        <Section tone="cream" rule>
          <h2 className="font-display text-2xl text-gold-deep">Past events</h2>
          <ul className="mt-8 flex flex-col gap-10">
            {past.map((event) => (
              <li key={event.slug}>
                <EventCard event={event} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
