"use client";

import {
  BadgeDollarSign,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  HardHat,
  Headphones,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/components/site/lang-provider";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBanner } from "@/components/site/cta-banner";
import { GuaranteeBanner } from "@/components/site/guarantee-banner";
import { StatsBand } from "@/components/site/stats-band";
import { Testimonials } from "@/components/site/testimonials";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/** Icon for each reason card (index-aligned with t.why.items). */
const REASON_ICONS: LucideIcon[] = [
  GraduationCap,
  FileCheck2,
  Zap,
  BadgeDollarSign,
  Headphones,
  HardHat,
];

/** Dedicated Why Us page — reasons, comparison table, guarantee, proof. */
export function WhyUsPage() {
  const { t } = useLang();

  return (
    <>
      <PageHero route="why-us" title={t.why.title} sub={t.why.pageSub} />

      {/* ============ 1. Six reasons — card grid ============ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-3">
              {t.why.eyebrow}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t.why.sub}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.why.items.map((item, i) => {
              const Icon = REASON_ICONS[i] ?? CheckCircle2;
              return (
                <Reveal key={item.title} delay={i * 0.07} className="h-full">
                  <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-soft text-gold-3"
                      aria-hidden="true"
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-brand">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 2. Comparison — typical agency vs. Bengal Star ============ */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow={t.why.compareEyebrow}
            title={t.why.compareTitle}
          />

          <Reveal className="mt-12">
            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[32%] min-w-44 px-4 py-4 text-start" />
                    <TableHead className="px-4 py-4 text-start text-muted-foreground">
                      {t.why.compareTypical}
                    </TableHead>
                    <TableHead className="bg-gold-soft px-4 py-4 text-start font-bold text-gold-3">
                      {t.why.compareUs}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {t.why.compareRows.map((row) => (
                    <TableRow key={row.feature}>
                      <TableCell className="px-4 py-4 text-start font-medium text-brand">
                        {row.feature}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-start">
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <X
                            className="h-4 w-4 shrink-0 text-red-400"
                            aria-hidden="true"
                          />
                          <span>{row.typical}</span>
                        </span>
                      </TableCell>
                      <TableCell className="bg-gold-soft/50 px-4 py-4 text-start">
                        <span className="flex items-center gap-2 font-medium text-brand">
                          <CheckCircle2
                            className="h-4 w-4 shrink-0 text-gold-3"
                            aria-hidden="true"
                          />
                          <span>{row.us}</span>
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 3. Guarantee + stats + social proof ============ */}
      <GuaranteeBanner />
      <StatsBand />
      <Testimonials />

      <CtaBanner />
    </>
  );
}
