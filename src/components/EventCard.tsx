import Link from "next/link";
import type { Event } from "@/content/types";
import { ContentImage } from "./ContentImage";
import { formatEventDate } from "@/lib/events";

interface EventCardProps {
  event: Event;
  /** Lets callers keep a correct heading outline wherever this is reused. */
  headingLevel?: "h2" | "h3";
  /** Keeps the image above the text at every width, for narrow columns. */
  stacked?: boolean;
}

// Same treatment as ProgramCard: no box, the whole block a single link.
// Image stacks above the text on mobile and sits to its left from sm up,
// unless `stacked` is set.
export function EventCard({ event, headingLevel = "h2", stacked = false }: EventCardProps) {
  const Heading = headingLevel;

  return (
    <Link
      href={`/events/${event.slug}/`}
      className={`group flex flex-col gap-5 ${stacked ? "" : "sm:flex-row sm:items-start sm:gap-8"}`}
    >
      <ContentImage image={event.image} className={stacked ? "" : "sm:w-72 sm:shrink-0"} />
      <div>
        <p className="text-sm font-medium text-gold-primary">
          {formatEventDate(event)}
        </p>
        <Heading className="mt-1 font-display text-xl text-gold-deep group-hover:underline group-hover:decoration-gold-accent group-hover:underline-offset-4">
          {event.title}
        </Heading>
        <p className="mt-2 max-w-[60ch] text-ink">{event.summary}</p>
      </div>
    </Link>
  );
}
