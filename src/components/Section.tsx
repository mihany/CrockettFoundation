import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

interface SectionProps {
  children: ReactNode;
  tone?: "white" | "cream";
  /** Renders the recurring 2px gold-accent rule marking a section start. */
  rule?: boolean;
  as?: ElementType;
  className?: string;
}

// Section rhythm comes from vertical space and alternating white/cream
// backgrounds, not from boxes or cards — this is the one shared primitive
// every page section is built on.
export function Section({
  children,
  tone = "white",
  rule = false,
  as: Tag = "section",
  className = "",
}: SectionProps) {
  const toneClass = tone === "cream" ? "bg-cream" : "bg-white";

  return (
    <Tag className={`${toneClass} py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container>
        {rule && (
          <div aria-hidden="true" className="mb-8 h-0.5 w-16 bg-gold-accent sm:mb-10" />
        )}
        {children}
      </Container>
    </Tag>
  );
}
