"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteSettings } from "@/content/types";
import { NAV_ITEMS, DONATE_HREF } from "@/lib/site";
import { Container } from "./Container";

interface SiteHeaderProps {
  settings: SiteSettings;
}

export function SiteHeader({ settings }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="border-b border-ink/10 bg-white">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="font-display text-lg text-ink" onClick={closeMenu}>
          {settings.orgName}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`border-b-2 pb-1 text-sm text-ink ${
                isActive(item.href) ? "border-gold-accent" : "border-transparent hover:border-gold-accent"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={DONATE_HREF}
            className="rounded-sm bg-gold-primary px-4 py-2 text-sm font-medium text-white hover:bg-gold-deep"
          >
            Donate
          </Link>
        </nav>

        <button
          type="button"
          className="text-sm text-ink underline underline-offset-2 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        className={`border-t border-ink/10 md:hidden ${menuOpen ? "block" : "hidden"}`}
      >
        <Container className="flex flex-col gap-1 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={closeMenu}
              className={`px-1 py-2 text-sm text-ink ${
                isActive(item.href) ? "border-l-2 border-gold-accent pl-3" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={DONATE_HREF}
            onClick={closeMenu}
            className="mt-2 inline-block rounded-sm bg-gold-primary px-4 py-2 text-center text-sm font-medium text-white"
          >
            Donate
          </Link>
        </Container>
      </nav>
    </header>
  );
}
