interface JsonLdProps {
  /** One or more schema.org entities; several are wrapped in a single @graph. */
  data: Record<string, unknown> | Record<string, unknown>[];
}

// Structured data for search engines and AI answer engines. A plain <script>,
// not next/script — it is data, not code. `<` is escaped so CMS text can never
// close the tag early (the XSS guard the Next.js JSON-LD guide recommends).
export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, "\\u003c") }}
    />
  );
}
