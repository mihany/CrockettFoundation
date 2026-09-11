import type { Metadata } from "next";
import { getPageIntro, getSiteSettings } from "@/content";
import { CONTACT_FORM_URL } from "@/lib/site";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export async function generateMetadata(): Promise<Metadata> {
  const pageIntro = await getPageIntro("contact");
  return { title: pageIntro.heading, description: pageIntro.intro };
}

export default async function ContactPage() {
  const [pageIntro, settings] = await Promise.all([
    getPageIntro("contact"),
    getSiteSettings(),
  ]);

  return (
    <>
      <section className="bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <Container>
          <h1 className="font-display text-4xl text-gold-deep sm:text-5xl">{pageIntro.heading}</h1>
          <p className="mt-6 max-w-[60ch] text-lg text-ink">{pageIntro.intro}</p>
        </Container>
      </section>

      <Section rule>
        {CONTACT_FORM_URL ? (
          <a
            href={CONTACT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-sm bg-gold-primary px-6 py-3 text-sm font-medium text-white hover:bg-gold-deep"
          >
            Open contact form
          </a>
        ) : (
          <p className="max-w-[60ch] text-ink-muted">Our contact form is coming soon.</p>
        )}

        <p className="mt-6">
          <a
            href={`mailto:${settings.contactEmail}`}
            className="text-gold-primary underline underline-offset-2"
          >
            {settings.contactEmail}
          </a>
        </p>
      </Section>
    </>
  );
}
