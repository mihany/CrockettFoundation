import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvents, getEventBySlug } from "@/content";
import { Container } from "@/components/Container";
import { ContentImage } from "@/components/ContentImage";
import { Section } from "@/components/Section";
import { formatEventDate, isUpcoming } from "@/lib/events";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

// Next 16: params is a Promise — not destructured in the signature, awaited
// inside instead.
export async function generateMetadata(props: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {};
  }

  return { title: event.title, description: event.summary };
}

export default async function EventDetailPage(props: EventDetailPageProps) {
  const { slug } = await props.params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const upcoming = isUpcoming(event);

  return (
    <>
      <section className="bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <Container>
          <p className="text-sm font-medium text-gold-primary">
            {formatEventDate(event)}
            {!upcoming && " · Past event"}
          </p>
          <h1 className="mt-2 font-display text-4xl text-gold-deep sm:text-5xl">{event.title}</h1>
          <p className="mt-6 max-w-[72ch] text-lg text-ink">{event.summary}</p>
          <ContentImage image={event.image} className="mt-10 max-w-3xl" />
        </Container>
      </section>

      <Section rule>
        <h2 className="font-display text-xl text-gold-deep">About this event</h2>
        <div className="mt-3 flex max-w-[72ch] flex-col gap-4 text-ink">
          {event.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section tone="cream" rule>
        <h2 className="font-display text-xl text-gold-deep">When and where</h2>
        <p className="mt-3 text-ink">{formatEventDate(event)}</p>
        <p className="mt-1 text-ink">{event.location ?? "Location to be announced"}</p>
      </Section>

      {upcoming && (
        <Section rule>
          <h2 className="font-display text-xl text-gold-deep">Register</h2>
          {event.registrationUrl ? (
            <a
              href={event.registrationUrl}
              className="mt-4 inline-block rounded-sm bg-gold-primary px-6 py-3 text-sm font-medium text-white hover:bg-gold-deep"
            >
              Register
            </a>
          ) : (
            <p className="mt-3 text-ink-muted">Registration details coming soon.</p>
          )}
        </Section>
      )}

      <Section tone={upcoming ? "cream" : "white"} rule>
        <Link
          href="/events/"
          className="text-sm text-gold-primary underline underline-offset-2"
        >
          Back to all events
        </Link>
      </Section>
    </>
  );
}
