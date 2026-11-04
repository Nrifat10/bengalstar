"use client";

import { useCallback, useSyncExternalStore } from "react";

/* ---------------------------------------------------------------------------
   Tiny hash-based router. The site is served from a single Next.js route "/"
   but behaves like a multi-page website:
     #/            -> Home
     #/about       -> About Us
     #/services    -> Services
     #/why-us      -> Why Us
     #/process     -> How It Works
     #/coverage    -> Coverage
     #/faq         -> FAQ
     #/contact     -> Contact
   Browser back/forward, deep links and bookmarks all work.
   Route state is synchronized through useSyncExternalStore (SSR-safe).
--------------------------------------------------------------------------- */

export const ROUTES = [
  "home",
  "about",
  "services",
  "why-us",
  "process",
  "coverage",
  "faq",
  "contact",
] as const;

export type Route = (typeof ROUTES)[number];

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#\/?/, "").replace(/\/+$/, "");
  const clean = raw.split("?")[0].toLowerCase();
  if ((ROUTES as readonly string[]).includes(clean)) {
    return clean as Route;
  }
  return "home";
}

function subscribeHash(listener: () => void) {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}

function getHashSnapshot(): Route {
  return parseHash();
}

function getServerSnapshot(): Route {
  return "home";
}

export function useHashRoute() {
  const route = useSyncExternalStore(subscribeHash, getHashSnapshot, getServerSnapshot);

  const navigate = useCallback((to: Route) => {
    const target = to === "home" ? "#/" : `#/${to}`;
    const current = window.location.hash || "#/";
    if (current === target || (to === "home" && current === "#/")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = target;
  }, []);

  return { route, navigate };
}

export const routeHref = (to: Route) => (to === "home" ? "#/" : `#/${to}`);
