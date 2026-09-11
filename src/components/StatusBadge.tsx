import type { ProgramStatus } from "@/content/types";

const STATUS_LABEL: Record<ProgramStatus, string> = {
  open: "Open",
  "coming-soon": "Coming soon",
  closed: "Closed",
};

// Differentiated by weight, not by introducing colors outside the palette:
// open is solid gold (live/actionable), coming-soon is outlined gold
// (pending), closed is muted ink (inactive).
const STATUS_STYLES: Record<ProgramStatus, string> = {
  open: "border-gold-primary bg-gold-primary text-white",
  "coming-soon": "border-gold-primary text-gold-primary",
  closed: "border-ink-muted text-ink-muted",
};

interface StatusBadgeProps {
  status: ProgramStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
