import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageIntro, getLegalPage } from "@/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const pageIntro = await getPageIntro("privacy");
  return {
    ...pageMetadata({ title: "Privacy Policy", description: pageIntro.intro, path: "/privacy/" }),
    // Placeholder text is thin content; keep it out of the index until the
    // real policy is written, then delete this line.
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage() {
  const [pageIntro, legalPage] = await Promise.all([
    getPageIntro("privacy"),
    getLegalPage("privacy"),
  ]);

  if (!legalPage) {
    notFound();
  }

  return (
    <>
      <section className="bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <Container>
          <h1 className="font-display text-4xl text-gold-deep sm:text-5xl">{pageIntro.heading}</h1>
          <p className="mt-6 max-w-[60ch] text-lg text-ink">{pageIntro.intro}</p>
        </Container>
      </section>

      <Section rule>
        <div className="flex max-w-[72ch] flex-col gap-4 text-ink">
          {legalPage.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
