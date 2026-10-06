/**
 * Sanity connection settings. The project ID and dataset are public
 * identifiers (they appear in every CDN image URL), so they live in
 * NEXT_PUBLIC_ env vars and in the deploy workflow as plain variables, not
 * secrets. Nothing here is a credential.
 */
export const apiVersion = "2026-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
