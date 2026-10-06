import Link from "next/link";
import { ContentImage } from "./ContentImage";
import type { Program } from "@/content/types";

interface ProgramCardProps {
  program: Program;
  /** Lets callers keep a correct heading outline wherever this is reused. */
  headingLevel?: "h2" | "h3";
}

// Deliberately plain: no border, no shadow, no rounded box — an image, a
// title and a summary, the whole block a single link.
export function ProgramCard({ program, headingLevel = "h2" }: ProgramCardProps) {
  const Heading = headingLevel;

  return (
    <Link href={`/programs/${program.slug}/`} className="group block">
      <ContentImage image={program.image} className="mb-4" />
      <Heading className="font-display text-xl text-gold-deep group-hover:underline group-hover:decoration-gold-accent group-hover:underline-offset-4">
        {program.title}
      </Heading>
      <p className="mt-2 max-w-[60ch] text-ink">{program.summary}</p>
    </Link>
  );
}
