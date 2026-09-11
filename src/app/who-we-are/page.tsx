import type { Metadata } from "next";
import { getPageIntro, getTeamMembers } from "@/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { TeamMemberCard } from "@/components/TeamMemberCard";

export async function generateMetadata(): Promise<Metadata> {
  const pageIntro = await getPageIntro("who-we-are");
  return { title: pageIntro.heading, description: pageIntro.intro };
}

export default async function WhoWeArePage() {
  const [pageIntro, team] = await Promise.all([
    getPageIntro("who-we-are"),
    getTeamMembers(),
  ]);
  const sorted = [...team].sort((a, b) => a.order - b.order);

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
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {sorted.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </Section>
    </>
  );
}
