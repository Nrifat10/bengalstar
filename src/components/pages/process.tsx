"use client";

import {
  CheckCircle2,
  Clock,
  Headphones,
  MessageSquare,
  Truck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/components/site/lang-provider";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBanner } from "@/components/site/cta-banner";
import { StatsBand } from "@/components/site/stats-band";
import { cn } from "@/lib/utils";

/** Icon for each step card (index-aligned with t.process.steps). */
const STEP_ICONS: LucideIcon[] = [MessageSquare, UserCheck, Truck, Headphones];

/** Dedicated Process page — step overview cards + alternating detail rows. */
export function ProcessPage() {
  const { t } = useLang();

  return (
    <>
      <PageHero route="process" title={t.process.title} sub={t.process.pageSub} />

      {/* ============ 1. Steps overview — four cards ============ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-3">
              {t.process.eyebrow}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? CheckCircle2;
              return (
                <Reveal key={step.title} delay={i * 0.08} className="h-full">
                  <article className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                    {/* Dashed connector to the next card (desktop only) */}
                    {i < t.process.steps.length - 1 && (
                      <span
                        className="absolute -end-6 top-12 hidden w-6 border-t-2 border-dashed border-gold/40 lg:block"
                        aria-hidden="true"
                      />
                    )}
                    {/* Oversized ghost step number */}
                    <span
                      className="absolute end-5 top-4 text-5xl font-bold text-gold/20"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-gold-2"
                      aria-hidden="true"
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-brand">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-gold-3">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {step.chip}
                    </span>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 2. Step details — alternating rows ============ */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.process.detailEyebrow}
            title={t.process.detailTitle}
          />

          <div className="mx-auto mt-12 max-w-5xl space-y-16 sm:space-y-24">
            {t.process.details.map((detail, i) => {
              const reversed = i % 2 === 1;
              return (
                <Reveal key={detail.title} y={28}>
                  <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Number lockup with vertical label */}
                    <div
                      className={cn(
                        "flex items-center gap-5",
                        reversed && "lg:order-2"
                      )}
                    >
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-navy-grad shadow-lg">
                        <span className="text-3xl font-bold text-gold-grad">
                          {i + 1}
                        </span>
                      </div>
                      <span
                        className="hidden h-14 w-px bg-gradient-to-b from-gold/60 via-gold/25 to-transparent sm:block"
                        aria-hidden="true"
                      />
                      <span
                        className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/70 [writing-mode:vertical-rl] sm:inline-block"
                        aria-hidden="true"
                      >
                        {t.process.eyebrow}
                      </span>
                    </div>

                    {/* Copy + bullets */}
                    <div>
                      <h3 className="text-xl font-semibold text-brand">
                        {detail.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground">
                        {detail.desc}
                      </p>
                      <ul className="mt-5 space-y-2.5">
                        {detail.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2.5 text-sm text-foreground/80"
                          >
                            <CheckCircle2
                              className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                              aria-hidden="true"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 3. Proof + closing CTA ============ */}
      <StatsBand />
      <CtaBanner />
    </>
  );
}
