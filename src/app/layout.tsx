import type { Metadata } from "next";
import { Newsreader, Karla } from "next/font/google";
import { getAboutContent, getSiteSettings } from "@/content";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/site";
import { DEFAULT_OG_IMAGE, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

// Display face: hero statement, page titles, section headings.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

// Body face: everything else.
const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

// Site-wide metadata defaults, read from content. Individual pages add their
// own title, description, canonical URL and share card via pageMetadata()
// (src/lib/seo.ts), which fills the `%s` template below.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  // draft — pending review: "Washington, DC" is inferred from the domain name;
  // confirm with the client. Location words help local and AI search.
  const description =
    "The Crockett Foundation is a Washington, DC nonprofit that removes the financial barriers keeping underserved high school and college students from studying abroad.";
  return {
    // Resolves every relative canonical, Open Graph and Twitter URL.
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${settings.orgName} | Study Abroad Scholarships for Underserved Students`,
      template: `%s | ${settings.orgName}`,
    },
    description,
    applicationName: settings.orgName,
    category: "education",
    openGraph: {
      title: settings.orgName,
      description,
      url: "/",
      siteName: settings.orgName,
      type: "website",
      locale: "en_US",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.orgName,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    // ALLOW_INDEXING in src/lib/site.ts is the single switch for search
    // visibility; robots.ts reads the same flag.
    robots: ALLOW_INDEXING
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: false },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, about] = await Promise.all([getSiteSettings(), getAboutContent()]);

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${karla.variable} h-full antialiased`}
    >
      {/* Browser extensions (Grammarly, password managers) add attributes to
          <body> before hydration; without this React logs a mismatch in dev. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <JsonLd data={[organizationJsonLd(settings, about.mission), websiteJsonLd(settings)]} />
        <SiteHeader settings={settings} />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
