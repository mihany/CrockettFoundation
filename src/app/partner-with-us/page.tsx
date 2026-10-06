import type { Metadata } from "next";
import { getPartnerContent } from "@/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { DonateBlock } from "@/components/DonateBlock";

export async function generateMetadata(): Promise<Metadata> {
  const partner = await getPartnerContent();
  return { title: "Partner with us", description: partner.donateBody };
}

export default async function PartnerWithUsPage() {
  const partner = await getPartnerContent();
  const { internships } = partner;

  // Pre-fills the application email so applicants see exactly what to include.
  const applyHref = `mailto:${internships.applyEmail}?subject=${encodeURIComponent(
    "Internship application",
  )}&body=${encodeURIComponent(
    internships.requiredFields.map((field) => `${field}:`).join("\n\n"),
  )}`;

  return (
    <>
      <section className="bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <Container>
          <h1 className="font-display text-4xl text-gold-deep sm:text-5xl">Partner with us</h1>
        </Container>
      </section>

      <Section rule>
        <h2 className="font-display text-2xl text-gold-deep">{internships.heading}</h2>
        <p className="mt-4 max-w-[72ch] text-ink">{internships.intro}</p>
        <p className="mt-4 max-w-[72ch] text-ink">{internships.commitment}</p>

        <h3 className="mt-8 font-display text-xl text-gold-deep">{internships.rolesHeading}</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-ink marker:text-gold-accent">
          {internships.roles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>

        <h3 className="mt-8 font-display text-xl text-gold-deep">{internships.applyHeading}</h3>
        <p className="mt-3 max-w-[72ch] text-ink">{internships.applyIntro}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-ink marker:text-gold-accent">
          {internships.requiredFields.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>
        <div className="mt-6">
          <a
            href={applyHref}
            className="inline-block rounded-sm bg-gold-primary px-6 py-3 text-sm font-medium text-white hover:bg-gold-deep"
          >
            Apply by email
          </a>
          <p className="mt-3 text-sm text-ink-muted">{internships.applyEmail}</p>
        </div>
      </Section>

      <Section tone="cream" rule>
        <h2 className="font-display text-2xl text-gold-deep">{partner.partnershipHeading}</h2>
        <p className="mt-4 max-w-[72ch] text-ink">{partner.partnershipBody}</p>
      </Section>

      <Section rule>
        <h2 className="font-display text-2xl text-gold-deep">{partner.donateHeading}</h2>
        <p className="mt-4 max-w-[72ch] text-ink">{partner.donateBody}</p>
        <div className="mt-6">
          <DonateBlock donationUrl={partner.donationUrl} contactEmail={partner.contactEmail} />
        </div>
      </Section>

      <Section tone="cream" rule>
        <h2 className="font-display text-2xl text-gold-deep">Contact</h2>
        <a
          href={`mailto:${partner.contactEmail}`}
          className="mt-4 inline-block text-gold-primary underline underline-offset-2"
        >
          {partner.contactEmail}
        </a>
      </Section>
    </>
  );
}
