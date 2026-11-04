"use client";

import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "./lang-provider";
import { routeHref, type Route } from "./router";

type PageHeroProps = {
  route: Route;
  title: string;
  sub?: string;
};

/** Inner-page banner: navy gradient, breadcrumb, title, subtext. */
export function PageHero({ route, title, sub }: PageHeroProps) {
  const { t, isRTL } = useLang();
  const Chevron = isRTL ? ChevronRight : ChevronRight;

  return (
    <section className="relative overflow-hidden bg-navy-grad">
      <div className="absolute inset-0 bg-gridlines" aria-hidden="true" />
      {/* gold accent line at the bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-gold/80 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            <li>
              <a
                href={routeHref("home")}
                className="transition-colors hover:text-gold-2"
              >
                {t.ui.breadcrumbHome}
              </a>
            </li>
            <li aria-hidden="true" className={cn(isRTL && "rotate-180")}>
              <Chevron className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-gold-2">
              {title}
            </li>
          </ol>
        </nav>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {sub && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}

export function BreadcrumbSeparator() {
  return <Fragment />;
}
