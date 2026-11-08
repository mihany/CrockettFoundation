import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/site";

// Static export requires route-like metadata files to be explicitly static.
export const dynamic = "force-static";

// The wildcard rule already covers AI crawlers (GPTBot, OAI-SearchBot,
// ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot).
// They are allowed on purpose: being crawlable by them is what gets the
// foundation's programs and events cited in AI answers. Only the CMS is
// kept out.
export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/studio/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
