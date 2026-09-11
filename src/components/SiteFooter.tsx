import Link from "next/link";
import type { SiteSettings } from "@/content/types";
import { NAV_ITEMS } from "@/lib/site";
import { Container } from "./Container";

interface SiteFooterProps {
  settings: SiteSettings;
}

export function SiteFooter({ settings }: SiteFooterProps) {
  const { ein } = settings;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-cream">
      <Container className="flex flex-col gap-8 py-12">
        <p className="max-w-prose font-display text-lg text-ink">{settings.footerNote}</p>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink hover:text-gold-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm text-ink-muted">
          <a
            href={`mailto:${settings.contactEmail}`}
            className="text-gold-primary underline underline-offset-2"
          >
            {settings.contactEmail}
          </a>
          {/* Omitted entirely while ein is null, rather than printing placeholder text. */}
          {ein !== null && (
            <p>{settings.orgName} is a 501(c)(3) nonprofit organization. EIN: {ein}</p>
          )}
          <Link href="/privacy" className="text-gold-primary underline underline-offset-2">
            Privacy policy
          </Link>
          <p>
            © {year} {settings.orgName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
