import { asset } from "@/lib/site";
import type { TeamMember } from "@/content/types";

interface TeamMemberCardProps {
  member: TeamMember;
  selected: boolean;
  /** Omitted when the member has no bio, so no toggle is rendered. */
  onToggle?: () => void;
}

// Photo, name and role only — the biography lives in TeamDirectory's shared
// panel. The whole card is the click target via the stretched-button
// pattern: the <button> sits inside the <h2> (valid heading semantics) and
// its ::after covers the card. photo falls back to the shared placeholder
// portrait.
export function TeamMemberCard({ member, selected, onToggle }: TeamMemberCardProps) {
  const heading = member.name ?? member.role;

  return (
    <div className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element -- next/image
          does not apply basePath to local src under images.unoptimized in a
          static export (verified against this build), so it would 404 on
          GitHub Pages; asset() + a plain <img> is the correct fix here. */}
      <img
        src={asset(member.photo ?? "/images/placeholder-portrait.svg")}
        alt={member.name ? `Portrait of ${member.name}` : "Placeholder portrait"}
        width={400}
        height={500}
        className={`aspect-4/5 w-full rounded-sm bg-cream object-cover object-top outline-offset-4 ${
          selected ? "outline-2 outline-gold-accent" : ""
        }`}
      />

      <h2 className="mt-4 font-display text-2xl text-gold-deep">
        {onToggle ? (
          <button
            type="button"
            aria-expanded={selected}
            aria-controls={`bio-${member.id}`}
            onClick={onToggle}
            className="cursor-pointer text-left after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-gold-accent"
          >
            {heading}
          </button>
        ) : (
          heading
        )}
      </h2>
      {member.name && <p className="text-ink-muted">{member.role}</p>}

      {onToggle ? (
        <span
          aria-hidden="true"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold-primary"
        >
          {selected ? "Hide biography" : "Read biography"}
          <svg
            viewBox="0 0 16 16"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={selected ? "rotate-180" : ""}
          >
            <path d="M3 6l5 5 5-5" />
          </svg>
        </span>
      ) : (
        <p className="mt-1 text-sm text-ink-muted">Biography coming soon.</p>
      )}
    </div>
  );
}
