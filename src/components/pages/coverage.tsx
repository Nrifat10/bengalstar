"use client";

import { CheckCircle2, MapPin, Route } from "lucide-react";
import { IMAGES } from "@/lib/i18n";
import { useLang } from "@/components/site/lang-provider";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { CtaBanner } from "@/components/site/cta-banner";
import { StatsBand } from "@/components/site/stats-band";
import { cn } from "@/lib/utils";

/** Dedicated Coverage page — city grid, remote/highway split card, stats, CTA. */
export function CoveragePage() {
  const { t } = useLang();

  return (
    <>
      <PageHero route="coverage" title={t.coverage.title} sub={t.coverage.pageSub} />

      {/* City grid */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-3">
              {t.coverage.eyebrow}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t.coverage.sub}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.coverage.cities.map((city, i) => {
              const isHQ = i === 0;
              return (
                <Reveal key={city.name} delay={i * 0.06} className="h-full">
                  <article
                    className={cn(
                      "h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-gold/40",
                      isHQ && "border-gold/40"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg",
                          isHQ ? "bg-brand text-gold-2" : "bg-gold-soft text-gold-3"
                        )}
                      >
                        <MapPin className="h-5 w-5" aria-hidden="true" />
                      </span>
                      {isHQ && (
                        <span className="inline-flex items-center rounded-full bg-gold-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-3">
                          HQ
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-brand">{city.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{city.tag}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* Highway / remote note */}
          <Reveal className="mt-10">
            <p className="flex items-center justify-center gap-2 text-center text-sm italic text-muted-foreground">
              <Route className="h-4 w-4 shrink-0 text-gold-3" aria-hidden="true" />
              <span>{t.coverage.note}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Remote & highway sites */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-navy-grad">
              <div className="absolute inset-0 bg-gridlines" aria-hidden="true" />
              <div className="relative grid lg:grid-cols-2">
                {/* Content */}
                <div className="p-8 sm:p-12">
                  <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-2">
                    <span
                      className="inline-block h-px w-8 bg-gold-2/70"
                      aria-hidden="true"
                    />
                    {t.coverage.remoteEyebrow}
                  </p>
                  <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                    {t.coverage.remoteTitle}
                  </h2>
                  <p className="mt-4 leading-relaxed text-white/70">
                    {t.coverage.remoteDesc}
                  </p>
                  <ul className="mt-8 space-y-3.5">
                    {t.coverage.remotePoints.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-white/85">
                        <CheckCircle2
                          className="h-5 w-5 shrink-0 text-gold-2"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image panel — banner on mobile, side panel on large screens */}
                <div className="relative order-first h-56 overflow-hidden sm:h-72 lg:order-last lg:h-auto lg:min-h-[26rem]">
                  <img
                    src={IMAGES.aboutTeam}
                    alt={t.coverage.remoteTitle}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/40 to-transparent lg:bg-gradient-to-r"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <StatsBand />
      <CtaBanner />
    </>
  );
}
