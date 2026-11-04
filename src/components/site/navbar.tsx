"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  Globe,
  HelpCircle,
  Home,
  Info,
  MapPinned,
  Menu,
  Phone,
  Award,
  Fuel,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IMAGES } from "@/lib/i18n";
import { useLang } from "./lang-provider";
import { routeHref, type Route } from "./router";

/* ---------------------------------------------------------------------------
   Navigation structure
   - 3 direct links (Home / FAQ / Contact) + 2 grouped dropdowns
     (Company ▾ / Services & Process ▾) wrapping the remaining 5 routes.
   - Every route carries an icon + a short description pulled from t.nav.
--------------------------------------------------------------------------- */

type NavLeaf = { route: Route; labelKey: keyof NavDict; descKey: keyof NavDict; Icon: LucideIcon };
type NavGroup = { kind: "group"; labelKey: keyof NavDict; descKey: keyof NavDict; items: NavLeaf[] };
type NavLink = { kind: "link"; route: Route };
type NavEntry = NavLink | NavGroup;

type NavDict = {
  home: string; homeDesc: string;
  about: string; aboutDesc: string;
  services: string; servicesDesc: string;
  why: string; whyDesc: string;
  process: string; processDesc: string;
  coverage: string; coverageDesc: string;
  faq: string; faqDesc: string;
  contact: string; contactDesc: string;
  groupCompany: string; groupCompanyDesc: string;
  groupSolutions: string; groupSolutionsDesc: string;
};

const ROUTE_META: Record<Route, NavLeaf> = {
  home:      { route: "home",      labelKey: "home",      descKey: "homeDesc",      Icon: Home },
  about:     { route: "about",     labelKey: "about",     descKey: "aboutDesc",     Icon: Info },
  services:  { route: "services",  labelKey: "services",  descKey: "servicesDesc",  Icon: Fuel },
  "why-us":  { route: "why-us",    labelKey: "why",       descKey: "whyDesc",       Icon: Award },
  process:   { route: "process",   labelKey: "process",   descKey: "processDesc",   Icon: Workflow },
  coverage:  { route: "coverage",  labelKey: "coverage",  descKey: "coverageDesc",  Icon: MapPinned },
  faq:       { route: "faq",       labelKey: "faq",       descKey: "faqDesc",       Icon: HelpCircle },
  contact:   { route: "contact",   labelKey: "contact",   descKey: "contactDesc",   Icon: Phone },
};

const NAV_ENTRIES: NavEntry[] = [
  { kind: "link", route: "home" },
  {
    kind: "group",
    labelKey: "groupCompany",
    descKey: "groupCompanyDesc",
    items: [ROUTE_META.about, ROUTE_META["why-us"]],
  },
  {
    kind: "group",
    labelKey: "groupSolutions",
    descKey: "groupSolutionsDesc",
    items: [ROUTE_META.services, ROUTE_META.process, ROUTE_META.coverage],
  },
  { kind: "link", route: "faq" },
  { kind: "link", route: "contact" },
];

/* A route is "active" if either it is the current page OR (for group parents)
   the current page is one of the group's children. */
function entryMatches(entry: NavEntry, route: Route): boolean {
  if (entry.kind === "link") return entry.route === route;
  return entry.items.some((it) => it.route === route);
}

export function Navbar({ route }: { route: Route }) {
  const { t, lang, toggleLang } = useLang();
  const nav = t.nav as unknown as NavDict;
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
          ? "nav-glass border-border shadow-sm"
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

        {/* Desktop nav — breakpoint lowered to lg */}
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          {NAV_ENTRIES.map((entry) =>
            entry.kind === "link" ? (
              <NavLeafLink
                key={entry.route}
                route={entry.route}
                active={route === entry.route}
                nav={nav}
              />
            ) : (
              <NavDropdown
                key={entry.labelKey}
                entry={entry}
                active={entryMatches(entry, route)}
                route={route}
                nav={nav}
              />
            )
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={nav.toggleAria}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-white px-3 text-sm font-semibold text-brand transition-colors hover:border-gold/60 hover:text-gold-3 sm:px-4"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span>{lang === "en" ? "العربية" : "English"}</span>
          </button>

          {/* Desktop CTA */}
          <Button
            asChild
            className="btn-shine hidden h-10 rounded-full bg-gradient-to-r from-gold-3 via-gold to-gold-2 px-6 text-sm font-semibold text-brand shadow-md shadow-gold/25 hover:shadow-lg hover:shadow-gold/30 lg:inline-flex"
          >
            <a href={routeHref("contact")}>{nav.cta}</a>
          </Button>

          {/* Mobile menu trigger */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={nav.openMenuAria}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-brand transition-colors hover:border-gold/60 lg:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent
              side={lang === "ar" ? "right" : "left"}
              className="flex w-[320px] flex-col gap-0 overflow-y-auto p-0"
            >
              <MobileMenu
                route={route}
                nav={nav}
                onNavigate={() => setMenuOpen(false)}
                cta={nav.cta}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------------------
   Desktop leaf link
--------------------------------------------------------------------------- */
function NavLeafLink({
  route,
  active,
  nav,
}: {
  route: Route;
  active: boolean;
  nav: NavDict;
}) {
  const meta = ROUTE_META[route];
  const Icon = meta.Icon;
  return (
    <a
      href={routeHref(route)}
      aria-current={active ? "page" : undefined}
      className={cn(
        "nav-item-hover relative inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "text-brand" : "text-muted-foreground hover:text-brand"
      )}
    >
      <Icon className="h-4 w-4 opacity-70" aria-hidden="true" />
      {nav[meta.labelKey]}
    </a>
  );
}

/* ---------------------------------------------------------------------------
   Desktop dropdown (mega menu style — icon + title + description per item)
--------------------------------------------------------------------------- */
function NavDropdown({
  entry,
  active,
  route,
  nav,
}: {
  entry: NavGroup;
  active: boolean;
  route: Route;
  nav: NavDict;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-current={active ? "page" : undefined}
          className={cn(
            "nav-item-hover group relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gold/40",
            active ? "text-brand" : "text-muted-foreground hover:text-brand"
          )}
        >
          {nav[entry.labelKey]}
          <ChevronDown
            className="nav-caret h-3.5 w-3.5 opacity-70"
            aria-hidden="true"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={10}
        className="nav-dropdown w-[380px] rounded-2xl border-border p-2"
      >
        <DropdownMenuLabel className="rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {nav[entry.descKey]}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 bg-border" />
        {entry.items.map((item) => {
          const Icon = item.Icon;
          const isActive = route === item.route;
          return (
            <DropdownMenuItem
              key={item.route}
              asChild
              className="group items-start gap-3 rounded-xl px-3 py-2.5 outline-none transition-colors focus:bg-gold-soft"
            >
              <a
                href={routeHref(item.route)}
                aria-current={isActive ? "page" : undefined}
                className="flex items-start gap-3"
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                    isActive
                      ? "bg-gradient-to-br from-gold-3 to-gold text-white"
                      : "bg-gold-soft text-gold-3 group-hover:bg-gold/20"
                  )}
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      isActive ? "text-brand" : "text-foreground"
                    )}
                  >
                    {nav[item.labelKey]}
                  </span>
                  <span className="mt-0.5 text-xs leading-snug text-muted-foreground">
                    {nav[item.descKey]}
                  </span>
                </span>
              </a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ---------------------------------------------------------------------------
   Mobile sheet — grouped list with section headers, icons, active state
--------------------------------------------------------------------------- */
function MobileMenu({
  route,
  nav,
  onNavigate,
  cta,
}: {
  route: Route;
  nav: NavDict;
  onNavigate: () => void;
  cta: string;
}) {
  return (
    <>
      {/* Header with logo + close affordance */}
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
        className="nice-scroll flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4"
      >
        {/* Home — standalone at top */}
        <MobileItem
          route="home"
          active={route === "home"}
          nav={nav}
          onClick={onNavigate}
        />

        {/* Company group */}
        <MobileSection
          title={nav.groupCompany}
          desc={nav.groupCompanyDesc}
        />
        <MobileItem
          route="about"
          active={route === "about"}
          nav={nav}
          onClick={onNavigate}
        />
        <MobileItem
          route="why-us"
          active={route === "why-us"}
          nav={nav}
          onClick={onNavigate}
        />

        {/* Services & Process group */}
        <MobileSection
          title={nav.groupSolutions}
          desc={nav.groupSolutionsDesc}
        />
        <MobileItem
          route="services"
          active={route === "services"}
          nav={nav}
          onClick={onNavigate}
        />
        <MobileItem
          route="process"
          active={route === "process"}
          nav={nav}
          onClick={onNavigate}
        />
        <MobileItem
          route="coverage"
          active={route === "coverage"}
          nav={nav}
          onClick={onNavigate}
        />

        {/* Resources group */}
        <MobileSection title="" desc="" />
        <MobileItem
          route="faq"
          active={route === "faq"}
          nav={nav}
          onClick={onNavigate}
        />
        <MobileItem
          route="contact"
          active={route === "contact"}
          nav={nav}
          onClick={onNavigate}
        />
      </nav>

      <div className="mt-auto border-t border-border p-4">
        <Button
          asChild
          className="btn-shine h-11 w-full rounded-full bg-gradient-to-r from-gold-3 via-gold to-gold-2 text-sm font-semibold text-brand"
        >
          <a href={routeHref("contact")} onClick={onNavigate}>
            {cta}
          </a>
        </Button>
      </div>
    </>
  );
}

function MobileSection({ title, desc }: { title: string; desc: string }) {
  if (!title) {
    return <div className="h-2" aria-hidden="true" />;
  }
  return (
    <div className="px-3 pb-1.5 pt-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-3">
        {title}
      </p>
      {desc && (
        <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
          {desc}
        </p>
      )}
    </div>
  );
}

function MobileItem({
  route,
  active,
  nav,
  onClick,
}: {
  route: Route;
  active: boolean;
  nav: NavDict;
  onClick: () => void;
}) {
  const meta = ROUTE_META[route];
  const Icon = meta.Icon;
  return (
    <a
      href={routeHref(route)}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
        active
          ? "bg-gold-soft text-brand"
          : "text-muted-foreground hover:bg-muted hover:text-brand"
      )}
    >
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
          active
            ? "bg-gradient-to-br from-gold-3 to-gold text-white"
            : "bg-muted text-muted-foreground group-hover:bg-gold/20 group-hover:text-gold-3"
        )}
        aria-hidden="true"
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-sm font-semibold leading-tight">
          {nav[meta.labelKey]}
        </span>
        <span className="mt-0.5 text-xs leading-snug text-muted-foreground">
          {nav[meta.descKey]}
        </span>
      </span>
    </a>
  );
}
