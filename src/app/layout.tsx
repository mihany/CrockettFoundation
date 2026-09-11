import type { Metadata } from "next";
import { Newsreader, Karla } from "next/font/google";
import { getSiteSettings } from "@/content";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
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
// own title/description via the `%s` template below.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: settings.orgName,
      template: `%s | ${settings.orgName}`,
    },
    description: settings.tagline,
    openGraph: {
      title: settings.orgName,
      description: settings.tagline,
      siteName: settings.orgName,
      type: "website",
      locale: "en_US",
    },
    // DRAFT SITE — remove before the real launch. This is an unfinished
    // preview on a github.io URL and must not be indexed. See the README's
    // Handover checklist.
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader settings={settings} />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
