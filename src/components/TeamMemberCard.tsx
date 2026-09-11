import { asset } from "@/lib/site";
import type { TeamMember } from "@/content/types";

interface TeamMemberCardProps {
  member: TeamMember;
}

// Role-only cards: name and bio render only once the client supplies them —
// never as an empty element. photo falls back to the shared placeholder
// portrait until real portraits are supplied.
export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element -- next/image
          does not apply basePath to local src under images.unoptimized in a
          static export (verified against this build), so it would 404 on
          GitHub Pages; asset() + a plain <img> is the correct fix here. */}
      <img
        src={asset(member.photo ?? "/images/placeholder-portrait.svg")}
        alt="Placeholder portrait"
        width={200}
        height={200}
        className="aspect-square w-full max-w-[160px] rounded-full bg-cream object-cover"
      />
      <h2 className="mt-4 font-display text-lg text-gold-deep">{member.role}</h2>
      {member.name && <p className="text-ink">{member.name}</p>}
      <p className="mt-1 text-sm text-ink-muted">{member.bio ?? "Biography coming soon."}</p>
    </div>
  );
}
