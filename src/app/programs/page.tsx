import type { Metadata } from "next";
import Link from "next/link";
import { getPageIntro, getPrograms } from "@/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";

export async function generateMetadata(): Promise<Metadata> {
  const pageIntro = await getPageIntro("programs");
  return { title: pageIntro.heading, description: pageIntro.intro };
}

export default async function ProgramsPage() {
  const [pageIntro, programs] = await Promise.all([
    getPageIntro("programs"),
    getPrograms(),
  ]);
  const sorted = [...programs].sort((a, b) => a.order - b.order);

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
        <ul className="flex flex-col gap-10">
          {sorted.map((program) => (
            <li key={program.slug} className="border-t border-ink/10 pt-10 first:border-t-0 first:pt-0">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-xl text-gold-deep">{program.title}</h2>
                <StatusBadge status={program.status} />
              </div>
              <p className="mt-2 max-w-[72ch] text-ink">{program.summary}</p>
              <Link
                href={`/programs/${program.slug}/`}
                className="mt-2 inline-block text-sm text-gold-primary underline underline-offset-2"
              >
                Learn more
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
