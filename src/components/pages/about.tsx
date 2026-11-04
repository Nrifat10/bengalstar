"use client";

import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  PhoneCall,
  Quote,
  RefreshCw,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { IMAGES } from "@/lib/i18n";
import { useLang } from "@/components/site/lang-provider";
import { routeHref } from "@/components/site/router";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBanner } from "@/components/site/cta-banner";

/** Icon for each value card (index-aligned with t.about.values). */
const VALUE_ICONS: LucideIcon[] = [Scale, GraduationCap, PhoneCall, RefreshCw];

/** Station gallery photos with bilingual captions from the hero slides. */
const GALLERY_PHOTOS = [
  { src: IMAGES.hero2, captionIndex: 1 },
  { src: IMAGES.hero3, captionIndex: 2 },
  { src: IMAGES.hero4, captionIndex: 3 },
  { src: IMAGES.hero5, captionIndex: 4 },
];

/** Dedicated About page — story, mission, values, timeline and gallery. */
export function AboutPage() {
  const { t } = useLang();
  const yearsOfExperience = new Date().getFullYear() - 2014;
  const storyPoints = [
    t.about.point1,
    t.about.point2,
    t.about.point3,
    t.about.point4,
  ];

  return (
    <>
      <PageHero route="about" title={t.about.title} sub={t.about.pageSub} />

      {/* ============ 1. Company story — split visual / copy ============ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Visual collage */}
            <Reveal className="relative">
              <div
                className="absolute -top-10 -end-10 h-40 w-40 rounded-full bg-gold/15 blur-2xl"
                aria-hidden="true"
              />
              <img
                src={IMAGES.aboutMain}
                alt={t.about.title}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-3xl border border-border object-cover shadow-lg"
              />
              <img
                src={IMAGES.aboutTeam}
                alt={t.about.galleryTitle}
                loading="lazy"
                decoding="async"
                className="absolute -bottom-8 end-6 aspect-square w-2/5 rounded-2xl border-4 border-white object-cover shadow-xl"
              />
              <div className="absolute -top-6 start-4 rounded-2xl bg-white px-5 py-4 text-center shadow-lg">
                <p className="text-3xl font-bold text-gold-grad">
                  {yearsOfExperience}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t.about.years}
                </p>
              </div>
            </Reveal>

            {/* Copy */}
            <Reveal delay={0.1}>
              <SectionHeading
                align="start"
                eyebrow={t.about.eyebrow}
                title={t.about.title}
                className="max-w-xl"
              />
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t.about.p1}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {t.about.p2}
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {storyPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm font-medium text-foreground/90"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href={routeHref("process")}
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-3 transition-colors hover:text-gold-2 hover:underline"
              >
                {t.about.cta}
                <ArrowRight
                  className="h-4 w-4 rtl:rotate-180"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 2. Mission — two-paragraph card ============ */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.about.missionEyebrow}
            title={t.about.missionTitle}
          />

          <Reveal className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
              <Quote
                className="absolute end-8 top-8 h-16 w-16 text-gold/15"
                strokeWidth={1.2}
                aria-hidden="true"
              />
              <div className="relative grid gap-8 md:grid-cols-2 md:gap-10">
                <p className="border-s-4 border-gold ps-6 text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {t.about.missionP1}
                </p>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {t.about.missionP2}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 3. Values — four cards ============ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.about.valuesEyebrow}
            title={t.about.valuesTitle}
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.values.map((value, i) => {
              const Icon = VALUE_ICONS[i] ?? Scale;
              return (
                <Reveal key={value.title} delay={i * 0.08} className="h-full">
                  <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-soft text-gold-3"
                      aria-hidden="true"
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-brand">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.desc}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 4. Timeline — vertical milestones ============ */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.about.timelineEyebrow}
            title={t.about.timelineTitle}
          />

          <div className="relative mx-auto mt-12 max-w-3xl">
            {/* Vertical gold rail */}
            <div
              className="absolute start-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-gold via-gold/40 to-transparent sm:start-[15px]"
              aria-hidden="true"
            />
            <ol className="space-y-10 sm:space-y-12">
              {t.about.timeline.map((milestone, i) => (
                <Reveal key={milestone.year} delay={i * 0.06} y={18}>
                  <li className="relative ps-8 sm:ps-10">
                    <span
                      className="absolute start-0 top-1.5 h-6 w-6 rounded-full border-4 border-background bg-gold shadow sm:start-1"
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="inline-flex rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                        {milestone.year}
                      </span>
                      <h3 className="text-base font-semibold text-brand">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {milestone.desc}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============ 5. Gallery — client stations ============ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.about.galleryEyebrow}
            title={t.about.galleryTitle}
          />

          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {GALLERY_PHOTOS.map((photo, i) => (
              <Reveal key={photo.src} delay={i * 0.08}>
                <figure className="aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                  <img
                    src={photo.src}
                    alt={t.hero.slides[photo.captionIndex].caption}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
