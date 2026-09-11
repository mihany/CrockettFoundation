import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or may have moved.",
};

export default function NotFound() {
  return (
    <section className="bg-white py-24">
      <Container>
        <h1 className="font-display text-4xl text-gold-deep sm:text-5xl">Page not found</h1>
        <p className="mt-6 max-w-[60ch] text-lg text-ink">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-sm bg-gold-primary px-6 py-3 text-sm font-medium text-white hover:bg-gold-deep"
        >
          Return home
        </Link>
      </Container>
    </section>
  );
}
