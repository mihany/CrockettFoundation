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

  return (
    <>
      <section className="bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <Container>
          <h1 className="font-display text-4xl text-gold-deep sm:text-5xl">Partner with us</h1>
        </Container>
      </section>

      <Section rule>
        <h2 className="font-display text-2xl text-gold-deep">{partner.donateHeading}</h2>
        <p className="mt-4 max-w-[72ch] text-ink">{partner.donateBody}</p>
        <div className="mt-6">
          <DonateBlock donationUrl={partner.donationUrl} contactEmail={partner.contactEmail} />
        </div>
      </Section>

      <Section tone="cream" rule>
        <h2 className="font-display text-2xl text-gold-deep">{partner.partnershipHeading}</h2>
        <p className="mt-4 max-w-[72ch] text-ink">{partner.partnershipBody}</p>
      </Section>

      <Section rule>
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
