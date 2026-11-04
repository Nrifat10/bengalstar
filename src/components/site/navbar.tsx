"use client";

import { useEffect, useState } from "react";
import { Globe, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IMAGES } from "@/lib/i18n";
import { useLang } from "./lang-provider";
import { routeHref, type Route } from "./router";

const LINKS: { route: Route; key: "home" | "about" | "services" | "why" | "process" | "coverage" | "faq" | "contact" }[] = [
  { route: "home", key: "home" },
  { route: "about", key: "about" },
  { route: "services", key: "services" },
  { route: "why-us", key: "why" },
  { route: "process", key: "process" },
  { route: "coverage", key: "coverage" },
  { route: "faq", key: "faq" },
  { route: "contact", key: "contact" },
];

export function Navbar({ route }: { route: Route }) {
  const { t, lang, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-white/90 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-white/70 backdrop-blur-md"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href={routeHref("home")}
          aria-label="Bengal Star Limited Company — home"
          className="flex shrink-0 items-center"
        >
          <img
            src={IMAGES.logoWide}
            alt="Bengal Star Limited Company logo"
            width={1048}
            height={238}
            className="h-8 w-auto sm:h-9"
            decoding="async"
          />
        </a>

        {/* Desktop links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 xl:flex">
          {LINKS.map((link) => (
            <a
              key={link.route}
              href={routeHref(link.route)}
              aria-current={route === link.route ? "page" : undefined}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                route === link.route
                  ? "text-brand"
                  : "text-muted-foreground hover:text-brand"
              )}
            >
              {t.nav[link.key]}
              {route === link.route && (
                <span
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-gold-3 via-gold to-gold-2"
                  aria-hidden="true"
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.nav.toggleAria}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-white px-3 text-sm font-semibold text-brand transition-colors hover:border-gold/60 hover:text-gold-3 sm:px-4"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span>{lang === "en" ? "العربية" : "English"}</span>
          </button>

          {/* Desktop CTA */}
          <Button
            asChild
            className="btn-shine hidden h-10 rounded-full bg-gradient-to-r from-gold-3 via-gold to-gold-2 px-6 text-sm font-semibold text-brand shadow-md shadow-gold/25 hover:shadow-lg hover:shadow-gold/30 xl:inline-flex"
          >
            <a href={routeHref("contact")}>{t.nav.cta}</a>
          </Button>

          {/* Mobile menu */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={t.nav.openMenuAria}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-brand transition-colors hover:border-gold/60 xl:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent
              side={lang === "ar" ? "right" : "left"}
              className="flex w-[300px] flex-col gap-0 overflow-y-auto p-0"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <SheetTitle className="flex items-center">
                  <img
                    src={IMAGES.logoWide}
                    alt="Bengal Star logo"
                    width={1048}
                    height={238}
                    className="h-7 w-auto"
                  />
                </SheetTitle>
              </div>
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1 px-4 py-4"
              >
                {LINKS.map((link) => (
                  <a
                    key={link.route}
                    href={routeHref(link.route)}
                    onClick={() => setMenuOpen(false)}
                    aria-current={route === link.route ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                      route === link.route
                        ? "bg-gold-soft text-brand"
                        : "text-muted-foreground hover:bg-muted hover:text-brand"
                    )}
                  >
                    {t.nav[link.key]}
                  </a>
                ))}
              </nav>
              <div className="mt-auto border-t border-border p-4">
                <Button
                  asChild
                  className="btn-shine h-11 w-full rounded-full bg-gradient-to-r from-gold-3 via-gold to-gold-2 text-sm font-semibold text-brand"
                >
                  <a href={routeHref("contact")} onClick={() => setMenuOpen(false)}>
                    {t.nav.cta}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
