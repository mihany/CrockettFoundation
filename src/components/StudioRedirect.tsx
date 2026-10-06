"use client";

import { useEffect } from "react";
import { STUDIO_REDIRECT_KEY } from "@/app/studio/[[...tool]]/redirect";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Rendered by the 404 page. GitHub Pages serves that page for any URL it has
// no file for — including deep Studio URLs like /studio/structure/event. If
// the URL is under /studio, remember it and hand over to the Studio page,
// which restores it. Anything else is a genuine 404 and is left alone.
export function StudioRedirect() {
  useEffect(() => {
    const { pathname, search, hash } = window.location;
    if (!pathname.startsWith(`${basePath}/studio/`)) return;
    try {
      sessionStorage.setItem(STUDIO_REDIRECT_KEY, pathname + search + hash);
    } catch {
      return;
    }
    window.location.replace(`${basePath}/studio/`);
  }, []);

  return null;
}
