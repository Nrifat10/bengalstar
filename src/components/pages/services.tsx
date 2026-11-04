"use client";

import {
  ArrowRight,
  Calculator,
  Check,
  Droplets,
  FileCheck2,
  Fuel,
  Info,
  RefreshCw,
  ShieldCheck,
  Shirt,
  Store,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { IMAGES } from "@/lib/i18n";
import { useLang } from "@/components/site/lang-provider";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBanner } from "@/components/site/cta-banner";
import { routeHref } from "@/components/site/router";
import { cn } from "@/lib/utils";

/** Image + icon for each service card (index-aligned with t.services.items). */
const SERVICE_MEDIA: { image: string; icon: LucideIcon }[] = [
  { image: IMAGES.serviceFuel, icon: Fuel },
  { image: IMAGES.serviceCarwash, icon: Droplets },
  { image: IMAGES.serviceStore, icon: Store },
  { image: IMAGES.serviceCashier, icon: Calculator },
  { image: IMAGES.serviceTire, icon: Wrench },
  { image: IMAGES.serviceTeam, icon: Users },
];

/** Icon for each "always included" card (index-aligned with t.services.included). */
const INCLUDED_ICONS: LucideIcon[] = [FileCheck2, ShieldCheck, Shirt, RefreshCw];

/** Dedicated Services page — six core roles, standard inclusions, closing CTA. */
export function ServicesPage() {
  const { t, isRTL } = useLang();

  return (
    <>
      <PageHero route="services" title={t.services.title} sub={t.services.pageSub} />

      {/* Six core roles */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-3">
              {t.services.eyebrow}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t.services.sub}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.items.map((item, i) => {
              const media = SERVICE_MEDIA[i] ?? SERVICE_MEDIA[0];
              const Icon = media.icon;
              const bullets = [item.li1, item.li2, item.li3];

              return (
                <Reveal key={item.title} delay={i * 0.08} className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    {/* Image header with deployment chip */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={media.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-4 start-4 inline-flex items-center gap-1.5 rounded-full bg-brand/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        <Zap className="h-3 w-3" aria-hidden="true" />
                        {t.services.deployChip}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-6">
                      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-3 to-gold text-white shadow-md">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-lg font-semibold text-brand">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-center gap-2 text-sm text-foreground/80"
                          >
                            <Check
                              className="h-4 w-4 shrink-0 text-gold-3"
                              aria-hidden="true"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-5">
                        <a
                          href={routeHref("contact")}
                          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-gold/50 bg-gold-soft/60 px-5 text-sm font-semibold text-gold-3 transition-colors hover:bg-gold-soft sm:w-auto"
                        >
                          {t.services.request}
                          <ArrowRight
                            className={cn("h-4 w-4", isRTL && "rotate-180")}
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Always included with every worker */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.services.includedEyebrow}
            title={t.services.includedTitle}
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.included.map((included, i) => {
              const Icon = INCLUDED_ICONS[i] ?? FileCheck2;
              return (
                <Reveal key={included.title} delay={i * 0.08} className="h-full">
                  <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-soft text-gold-3">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-semibold text-brand">{included.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {included.desc}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* Custom-role note */}
          <Reveal className="mt-16 sm:mt-20">
            <div className="mx-auto max-w-2xl rounded-2xl border border-gold/30 bg-gold-soft px-6 py-5 text-center">
              <p className="flex items-center justify-center gap-2.5 text-sm font-medium text-brand/80">
                <Info className="h-4 w-4 shrink-0 text-gold-3" aria-hidden="true" />
                {t.services.note}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
