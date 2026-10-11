# The Crockett Foundation — website

A static Next.js site for The Crockett Foundation, deployed to GitHub Pages. This is a **draft build for client review** — see the Handover checklist below for everything that still needs a real value before launch.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.local.example` to `.env.local` for local dev:

```
NEXT_PUBLIC_BASE_PATH=
```

- **`NEXT_PUBLIC_BASE_PATH`** — the subdirectory the site is served from. Empty for local dev. In CI it's left empty too, because the site is served from the root of its custom domain (`https://crockettfoundationdc.org/`). It would only be set to `/<repo-name>` if the site went back to being served from the GitHub Pages project URL (`https://<user>.github.io/<repo-name>/`). It's read directly in `next.config.ts` (for `basePath`/`assetPrefix`) and by the `asset()` helper in `src/lib/site.ts` (for any raw reference to a `public/` file that bypasses `next/link`/`next/image`).

## Production build

```bash
npm run build
```

This is a static export (`output: 'export'` in `next.config.ts`) — output goes to `out/` as plain HTML/CSS/JS, no server required. There's no API routes, server actions, middleware, or server-side image optimization anywhere in this project; all images are `unoptimized: true`.

## Deploying to GitHub Pages

The workflow at `.github/workflows/deploy.yml` builds and deploys `out/` using `actions/upload-pages-artifact` + `actions/deploy-pages`.

**It runs on manual trigger (`workflow_dispatch`) plus push to `main`** — while this is still a draft under review, you don't want every push redeploying the live preview link automatically without a chance to check it first. To trigger a deploy by hand: go to the repo's **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**.

### One-time setup to get the site live

1. Push this repository to GitHub (if it isn't already).
2. In the repo, go to **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions** (not "Deploy from a branch").
3. Go to the **Actions** tab → **Deploy to GitHub Pages** → **Run workflow** → confirm on `main`.
4. Once it finishes, the site is live at the custom domain set under **Settings → Pages → Custom domain**: `https://crockettfoundationdc.org/`. DNS for the domain is managed in Cloudflare and points at GitHub Pages.
5. The workflow does **not** set `NEXT_PUBLIC_BASE_PATH`, because the site is served from the domain root. If the custom domain is ever removed, add `NEXT_PUBLIC_BASE_PATH: /<repo-name>` to the workflow's Build step, or every asset and link will break under the `github.io/<repo-name>/` URL.

After the first deploy, every subsequent one is the same: **Actions → Deploy to GitHub Pages → Run workflow**.

## Where content lives, and how a CMS will replace it

All copy lives in typed TypeScript files under `src/content/` — nothing is hardcoded inside a page or component (a small number of fixed structural labels like "Mission" or nav labels are the deliberate exception; see the comment in `src/content/types.ts` above `PageIntro`).

- `types.ts` — every content shape.
- `site.ts`, `home.ts`, `about.ts`, `team.ts`, `programs.ts`, `events.ts` (placeholder events, all invented), `partner.ts`, `legal.ts`, `pages.ts` — the actual draft data, one file per concern.
- `index.ts` — the **only** thing pages import from. It exports `async` accessor functions (`getSiteSettings()`, `getHomeContent()`, etc.) that currently just return the local data above.

When a headless CMS is connected later, only the *bodies* of the functions in `index.ts` change — from returning local data to fetching from the CMS. No page or component needs to change, because they never imported the data files directly.

The home page's "Featured program" and "Next event" blocks follow the same rule: they use `getFeaturedProgram()` and `getNextUpcomingEvent()`. The program is picked at random and the event is the soonest unfinished one. Both are chosen when the site is built, so they only change on the next deploy. Each accessor has a comment describing its Sanity equivalent.

## Design tokens

Colors and fonts are defined as CSS custom properties in `src/app/globals.css` and mapped into Tailwind v4's CSS-first `@theme` block (there is no `tailwind.config.ts` — this project uses Tailwind v4).

## Handover checklist

**Every value below is a placeholder or `null` and must be filled in before the real launch.** Each one already has a defined fallback state in the UI (never a dead link or blank element), so the site works fine as a draft preview without them — but a real client launch needs all of these resolved.

| Value | Lives in | Current state |
| --- | --- | --- |
| PayPal donate link | `src/content/partner.ts` (`PartnerContent.donationUrl`) | `null` — Partner With Us shows a bordered "Online giving opens soon" placeholder instead of the "Donate with PayPal" button. Set it to the client's PayPal donate link (`https://www.paypal.com/donate/?hosted_button_id=…`); the site is a static export, so a hosted PayPal link is the supported approach. |
| Community Partnerships copy | `src/content/partner.ts` (`partnershipBody`) | Draft placeholder — the client's text arrived cut off ("Organizations …"). |
| Contact form URL | `src/lib/site.ts` (`CONTACT_FORM_URL`) | `null` — Contact page shows "Our contact form is coming soon" instead of a dead link. |
| Program deadlines and apply links | `src/content/programs.ts` (`Program.deadline` / `.applyUrl`, both programs) | All `null` — program pages show "Applications open soon" with no apply button. |
| EIN | `src/content/site.ts` (`SiteSettings.ein`) | `null` — the footer omits the entire 501(c)(3)/EIN line while it's null. |
| Social links | `src/content/site.ts` (`SiteSettings.socialLinks`) | Empty array — nothing rendered anywhere yet (no component currently reads this field). |
| Real contact email | **Three separate places**, not cross-linked: `src/content/site.ts` (`SiteSettings.contactEmail`), `src/content/partner.ts` (`PartnerContent.contactEmail`), and hardcoded inline in `src/content/legal.ts`'s privacy body text | All set to `info@crockettfoundationdc.org` (the address the client gave for internship applications) — update all three together, plus `internships.applyEmail` in `partner.ts`. |
| Privacy policy body | `src/content/legal.ts` (`LegalPage.body`) and `src/content/pages.ts` (`pageIntros.privacy`) | Placeholder text stating the policy is being drafted. |
| **`noindex, nofollow` robots tag** | `src/app/layout.tsx` (`generateMetadata`'s `robots` field) | Applied site-wide. **Must be removed before the real launch** — this draft preview should not be indexed, but the real site needs to be. |

A good amount of section copy throughout the site (home page CTAs aside, things like the tagline, the footer note, the "Get in touch" and "Support a student" blocks, and the Programs/Who We Are/Contact page intros) is also draft text I wrote to avoid blank sections — each is marked `// draft — pending review` at its source in `src/content/`. Search for that comment to find all of them.
