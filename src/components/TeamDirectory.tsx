"use client";

import { useRef, useState } from "react";
import type { TeamMember } from "@/content/types";
import { TeamMemberCard } from "./TeamMemberCard";

interface TeamDirectoryProps {
  members: TeamMember[];
}

// One member's biography is shown at a time, in a full-width panel below the
// whole row of cards — clicking another member swaps it, clicking the open
// one closes it. Every bio stays in the server-rendered HTML (just `hidden`),
// so all of them remain crawlable.
export function TeamDirectory({ members }: TeamDirectoryProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function toggle(id: string) {
    const next = selectedId === id ? null : id;
    setSelectedId(next);

    // In a single-column layout the panel sits below every card, so it can
    // be off-screen after a click on the first card; bring it into view.
    if (next) {
      requestAnimationFrame(() => {
        const panel = panelRef.current;
        if (panel && panel.getBoundingClientRect().top > window.innerHeight - 120) {
          panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  }

  return (
    <>
      <div className="grid items-start gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => {
          const hasBio = member.bio !== null && member.bio.length > 0;
          return (
            <TeamMemberCard
              key={member.id}
              member={member}
              selected={selectedId === member.id}
              onToggle={hasBio ? () => toggle(member.id) : undefined}
            />
          );
        })}
      </div>

      <div
        ref={panelRef}
        className={`scroll-mt-24 bg-cream px-6 py-8 sm:px-10 sm:py-10 ${
          selectedId ? "mt-14" : "hidden"
        }`}
      >
        {members.map((member) => (
          <div
            key={member.id}
            id={`bio-${member.id}`}
            hidden={selectedId !== member.id}
            className="space-y-4 text-ink"
          >
            <h3 className="font-display text-2xl text-gold-deep">
              {member.name ?? member.role}
              {member.name && (
                <span className="text-ink-muted"> — {member.role}</span>
              )}
            </h3>
            {member.bio?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          </div>
        ))}
      </div>
    </>
  );
}
