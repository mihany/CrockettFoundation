import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPrograms, getProgramBySlug } from "@/content";
import { Container } from "@/components/Container";
import { ContentImage } from "@/components/ContentImage";
import { Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { ProgramCard } from "@/components/ProgramCard";

interface ProgramDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((program) => ({ slug: program.slug }));
}

// Next 16: params is a Promise — not destructured in the signature, awaited
// inside instead.
export async function generateMetadata(props: ProgramDetailPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    return {};
  }

  return { title: program.title, description: program.summary };
}

export default async function ProgramDetailPage(props: ProgramDetailPageProps) {
  const { slug } = await props.params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const allPrograms = await getPrograms();
  const related = allPrograms.filter((p) => p.slug !== program.slug);

  return (
    <>
      <section className="bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-4xl text-gold-deep sm:text-5xl">{program.title}</h1>
            <StatusBadge status={program.status} />
          </div>
          <p className="mt-6 max-w-[72ch] text-lg text-ink">{program.summary}</p>
          <ContentImage image={program.image} className="mt-10 max-w-3xl" />
        </Container>
      </section>

      {program.pullQuote && (
        <Section tone="cream" rule>
          <blockquote className="max-w-[40ch] font-display text-2xl leading-snug text-gold-deep sm:text-3xl lg:text-4xl">
            &ldquo;{program.pullQuote}&rdquo;
          </blockquote>
        </Section>
      )}

      <Section rule>
        <h2 className="font-display text-xl text-gold-deep">What it covers</h2>
        <p className="mt-3 max-w-[72ch] text-ink">{program.coverage}</p>
      </Section>

      <Section tone="cream" rule>
        <h2 className="font-display text-xl text-gold-deep">Who it&rsquo;s for</h2>
        <p className="mt-3 max-w-[72ch] text-ink">{program.eligibility}</p>
        {program.note && <p className="mt-3 max-w-[72ch] text-ink-muted">{program.note}</p>}
      </Section>

      <Section rule>
        <h2 className="font-display text-xl text-gold-deep">Required materials</h2>
        {program.requirements.length > 0 ? (
          <ul className="mt-3 flex flex-col gap-2 text-ink">
            {program.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-ink-muted">Requirements will be announced closer to launch.</p>
        )}
      </Section>

      <Section tone="cream" rule>
        <h2 className="font-display text-xl text-gold-deep">Deadline</h2>
        {program.deadline ? (
          <>
            <p className="mt-3 text-ink">{program.deadline}</p>
            {program.status !== "coming-soon" &&
              (program.applyUrl ? (
                <Link
                  href={program.applyUrl}
                  className="mt-4 inline-block rounded-sm bg-gold-primary px-6 py-3 text-sm font-medium text-white hover:bg-gold-deep"
                >
                  Apply
                </Link>
              ) : (
                <p className="mt-4 text-ink-muted">Application details coming soon.</p>
              ))}
          </>
        ) : (
          <p className="mt-3 text-ink">Applications open soon.</p>
        )}
      </Section>

      {related.length > 0 && (
        <Section rule>
          <h2 className="font-display text-xl text-gold-deep">Related programs</h2>
          <div className="mt-6 grid gap-10 sm:grid-cols-2">
            {related.map((relatedProgram) => (
              <ProgramCard key={relatedProgram.slug} program={relatedProgram} headingLevel="h3" />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
