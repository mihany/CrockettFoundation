interface DonateBlockProps {
  donationUrl: string | null;
  contactEmail: string;
}

// donationUrl is null until a payment provider is chosen. This is the only
// place that branches on it — flipping the content value to a real URL
// later is a one-line content change, no component edit required.
export function DonateBlock({ donationUrl, contactEmail }: DonateBlockProps) {
  if (donationUrl) {
    return (
      <a
        href={donationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-sm bg-gold-primary px-6 py-3 text-sm font-medium text-white hover:bg-gold-deep"
      >
        Donate
      </a>
    );
  }

  return (
    <div className="max-w-md rounded-sm border border-ink/15 px-6 py-5">
      <p className="text-ink">Online giving opens soon.</p>
      <p className="mt-2 text-sm text-ink-muted">{contactEmail}</p>
    </div>
  );
}
