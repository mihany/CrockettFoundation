"use client";

import { useEffect, useState } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { STUDIO_REDIRECT_KEY } from "./redirect";

// GitHub Pages only has /studio/index.html, so a hard load of a deep Studio
// URL (/studio/structure/event) lands on the site's 404 page, which stashes
// the URL and sends the browser here. Put the URL back before the Studio
// mounts, so its router opens the right tool and document.
function restoreStudioUrl() {
  try {
    const saved = sessionStorage.getItem(STUDIO_REDIRECT_KEY);
    if (saved) {
      sessionStorage.removeItem(STUDIO_REDIRECT_KEY);
      window.history.replaceState(null, "", saved);
    }
  } catch {
    // sessionStorage unavailable — the Studio simply opens at its home.
  }
}

export default function Studio() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    restoreStudioUrl();
    setReady(true);
  }, []);

  // The Studio is full-viewport and manages its own scrolling. It sits over
  // the site header and footer (root layout) rather than inside them.
  return (
    <div className="fixed inset-0 z-[1000] bg-white">
      {ready && <NextStudio config={config} />}
    </div>
  );
}
