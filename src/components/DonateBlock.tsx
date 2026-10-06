interface DonateBlockProps {
  donationUrl: string | null;
  contactEmail: string;
}

// donationUrl is the client's hosted PayPal donate link, null until they
// supply it. This is the only place that branches on it — flipping the
// content value to a real URL is a one-line content change, no component
// edit required. The site is a static export, so donations go through
// PayPal's hosted page rather than an embedded checkout.
export function DonateBlock({ donationUrl, contactEmail }: DonateBlockProps) {
  if (donationUrl) {
    return (
      <div>
        <a
          href={donationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-sm bg-gold-primary px-6 py-3 text-sm font-medium text-white hover:bg-gold-deep"
        >
          Donate with PayPal
        </a>
        <p className="mt-3 text-sm text-ink-muted">
          You’ll be taken to PayPal to complete your donation securely.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md rounded-sm border border-ink/15 px-6 py-5">
      <p className="text-ink">Online giving opens soon.</p>
      <p className="mt-2 text-sm text-ink-muted">{contactEmail}</p>
    </div>
  );
}
