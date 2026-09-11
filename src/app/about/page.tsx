import type { Metadata } from "next";
import Link from "next/link";
import { getAboutContent } from "@/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutContent();
  return { title: "About", description: about.mission };
}

export default async function AboutPage() {
  const about = await getAboutContent();

  return (
    <>
      <section className="bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <Container>
          <h1 className="font-display text-4xl text-gold-deep sm:text-5xl">About</h1>
          <p className="mt-6 max-w-[60ch] text-lg text-ink">{about.intro}</p>
        </Container>
      </section>

      <Section rule>
        <h2 className="font-display text-2xl text-gold-deep">Mission</h2>
        <p className="mt-4 max-w-[72ch] text-ink">{about.mission}</p>
      </Section>

      <Section tone="cream" rule>
        <h2 className="font-display text-2xl text-gold-deep">Purpose</h2>
        <p className="mt-4 max-w-[72ch] text-ink">{about.purpose}</p>
      </Section>

      <Section rule>
        <h2 className="font-display text-2xl text-gold-deep">Vision</h2>
        <p className="mt-4 max-w-[72ch] text-ink">{about.vision}</p>
      </Section>

      <Section tone="cream" rule>
        <p className="max-w-[60ch] text-ink">
          <Link href="/programs" className="text-gold-primary underline underline-offset-2">
            Explore our programs
          </Link>
        </p>
      </Section>
    </>
  );
}
