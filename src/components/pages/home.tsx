"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  Calculator,
  Check,
  CheckCircle2,
  Clock,
  Droplets,
  FileCheck2,
  Fuel,
  GraduationCap,
  HardHat,
  Headphones,
  ShieldCheck,
  Store,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { IMAGES, SITE } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useLang } from "@/components/site/lang-provider";
import { routeHref } from "@/components/site/router";
import { Reveal } from "@/components/site/reveal";
import { Counter } from "@/components/site/counter";
import { SectionHeading } from "@/components/site/section-heading";
import { BrandMarquee } from "@/components/site/brand-marquee";
import { CtaBanner } from "@/components/site/cta-banner";
import { StatsBand } from "@/components/site/stats-band";
import { GuaranteeBanner } from "@/components/site/guarantee-banner";
import { Testimonials } from "@/components/site/testimonials";
import { StarIcon, WhatsAppIcon } from "@/components/site/icons";

/* ---------------------------------------------------------------------------
   Static content pairings — images & icons matched to dictionary order.
--------------------------------------------------------------------------- */

const HERO_SLIDES = [
  IMAGES.hero1,
  IMAGES.hero2,
  IMAGES.hero3,
  IMAGES.hero4,
  IMAGES.hero5,
];

const SERVICE_META: { src: string; Icon: LucideIcon }[] = [
  { src: IMAGES.serviceFuel, Icon: Fuel },
  { src: IMAGES.serviceCarwash, Icon: Droplets },
  { src: IMAGES.serviceStore, Icon: Store },
  { src: IMAGES.serviceCashier, Icon: Calculator },
  { src: IMAGES.serviceTire, Icon: Wrench },
  { src: IMAGES.serviceTeam, Icon: Users },
];

const WHY_ICONS: LucideIcon[] = [
  GraduationCap,
  FileCheck2,
  Zap,
  BadgeDollarSign,
  Headphones,
  HardHat,
];

const HERO_STATS = [
  { target: 500, suffix: "+" },
  { target: 120, suffix: "+" },
  { target: 98, suffix: "%" },
];

const SLIDE_INTERVAL_MS = 4500;

/* ---------------------------------------------------------------------------
   1. Hero — light premium split layout with auto-rotating visual slider
--------------------------------------------------------------------------- */

function HeroSection() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
      SLIDE_INTERVAL_MS
    );
    return () => window.clearInterval(id);
  }, []);

  const slide = t.hero.slides[index];
  const statLabels = [t.hero.stat1, t.hero.stat2, t.hero.stat3];

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Decorative layers */}
      <div className="absolute inset-0 bg-gridlines-light" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 end-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 start-0 h-[28rem] w-[28rem] rounded-full bg-brand/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy column */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft px-4 py-1.5 text-xs font-semibold text-gold-3">
              <StarIcon className="h-3.5 w-3.5" />
              {t.hero.badge}
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-[1.08] text-brand sm:text-5xl lg:text-[3.4rem]">
              <span className="block">{t.hero.titleA}</span>
              <span className="block text-gold-grad">{t.hero.titleB}</span>
              <span className="block">{t.hero.titleC}</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.hero.sub}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={routeHref("contact")}
                className="btn-shine inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-3 via-gold to-gold-2 px-8 text-sm font-semibold text-brand shadow-lg shadow-gold/25 transition-transform hover:-translate-y-0.5"
              >
                {t.hero.cta1}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </a>
              <a
                id="hero-whatsapp"
                href={`${SITE.whatsapp}?text=${encodeURIComponent(t.contact.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-8 text-sm font-semibold text-brand transition-colors hover:border-gold/50"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t.hero.cta2}
              </a>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
              {HERO_STATS.map((stat, i) => (
                <div key={statLabels[i]} className="flex flex-col">
                  <dt className="order-2 mt-1 text-xs text-muted-foreground sm:text-sm">
                    {statLabels[i]}
                  </dt>
                  <dd className="order-1 text-3xl font-bold text-brand">
                    <Counter target={stat.target} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Visual column — auto-rotating slider */}
          <Reveal delay={0.15} className="relative">
            {/* Gold corner accent (peeks out behind the card) */}
            <div
              className="pointer-events-none absolute -bottom-5 -end-5 h-28 w-28 rotate-12 rounded-3xl border-2 border-gold/50"
              aria-hidden="true"
            />

            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-brand/10 sm:aspect-[5/5]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <img
                    src={HERO_SLIDES[index]}
                    alt={slide.caption}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Caption bar */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand/85 to-transparent px-5 pb-4 pt-16">
                <p className="text-sm font-medium text-white">{slide.caption}</p>
                <div className="mt-3 flex items-center gap-2">
                  {t.hero.slides.map((dot, i) => (
                    <button
                      key={dot.caption}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={dot.caption}
                      className="rounded-full p-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                    >
                      <span
                        className={cn(
                          "block h-2 rounded-full transition-all duration-300",
                          i === index ? "w-6 bg-gold" : "w-2 bg-white/40"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge — 24/7 support */}
            <div className="absolute -top-3 end-4 hidden items-center gap-2 rounded-full border border-border bg-white px-4 py-2 shadow-lg shadow-brand/10 sm:flex">
              <span
                className="relative flex h-2.5 w-2.5 rounded-full bg-emerald-500 pulse-dot text-emerald-500"
                aria-hidden="true"
              />
              <span className="text-xs font-semibold text-brand">
                {t.hero.badgeSupport}
              </span>
            </div>

            {/* Floating badge — verified */}
            <div className="absolute bottom-24 start-4 hidden items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2.5 shadow-lg shadow-brand/10 sm:flex">
              <ShieldCheck
                className="h-4 w-4 text-gold-3"
                aria-hidden="true"
              />
              <span className="text-xs font-semibold text-brand">
                {t.hero.badgeVerified}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   3. About preview — image collage + checklist
--------------------------------------------------------------------------- */

function AboutPreview() {
  const { t } = useLang();
  const years = new Date().getFullYear() - SITE.founded;
  const points = [t.about.point1, t.about.point2, t.about.point3, t.about.point4];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image collage */}
          <Reveal className="relative">
            <div className="relative">
              <img
                src={IMAGES.aboutMain}
                alt={t.about.title}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg shadow-brand/10"
              />
              <img
                src={IMAGES.aboutTeam}
                alt={t.about.eyebrow}
                loading="lazy"
                decoding="async"
                className="absolute -bottom-8 -end-4 w-2/5 rounded-2xl border-4 border-white object-cover shadow-lg sm:-end-8"
              />
              {/* Years badge */}
              <div className="absolute -top-6 start-4 rounded-2xl border border-border bg-white px-5 py-3 text-center shadow-lg">
                <p className="text-3xl font-bold leading-none text-gold-grad">
                  {years}
                </p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  {t.about.years}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={0.1}>
            <SectionHeading
              align="start"
              eyebrow={t.about.eyebrow}
              title={t.about.title}
            />
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.about.p1}
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-3"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-foreground/90">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={routeHref("process")}
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-3 transition-colors hover:text-gold-2 hover:underline"
            >
              {t.about.cta}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   4. Services preview — 6 role cards with photos and icon chips
--------------------------------------------------------------------------- */

function ServicesPreview() {
  const { t } = useLang();

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          sub={t.services.sub}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, i) => {
            const { src, Icon } = SERVICE_META[i];
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.08} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative">
                    <img
                      src={src}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute -bottom-5 start-5 z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-3 to-gold text-white shadow-md"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-8">
                    <h3 className="text-lg font-semibold text-brand">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.desc}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {[service.li1, service.li2, service.li3].map((li) => (
                        <li
                          key={li}
                          className="flex items-center gap-2 text-sm text-foreground/80"
                        >
                          <Check
                            className="h-3.5 w-3.5 shrink-0 text-gold-3"
                            aria-hidden="true"
                          />
                          {li}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={routeHref("contact")}
                      className="mt-5 inline-flex items-center gap-1 self-start text-sm font-semibold text-gold-3 transition-colors hover:text-gold-2"
                    >
                      {t.services.request}
                      <ArrowRight
                        className="h-4 w-4 rtl:rotate-180"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   5. Why us — 6 differentiators
--------------------------------------------------------------------------- */

function WhyPreview() {
  const { t } = useLang();

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.why.eyebrow}
          title={t.why.title}
          sub={t.why.sub}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((item, i) => {
            const Icon = WHY_ICONS[i];
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-soft text-gold-3"
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-brand">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   6. Process — 4-step pipeline with dashed connectors
--------------------------------------------------------------------------- */

function ProcessPreview() {
  const { t } = useLang();

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, i) => (
            <li key={step.title} className="h-full">
              <Reveal delay={i * 0.08} className="h-full">
                <div className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  {i < t.process.steps.length - 1 && (
                    <div
                      className="absolute -end-6 top-[3.25rem] hidden w-6 border-t-2 border-dashed border-gold/40 lg:block"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-base font-bold text-white"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-brand">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-gold-3">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {step.chip}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-10 text-center">
          <a
            href={routeHref("process")}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-8 text-sm font-semibold text-brand transition-colors hover:border-gold/50"
          >
            {t.about.cta}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Home page — full composition
--------------------------------------------------------------------------- */

export function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandMarquee />
      <AboutPreview />
      <ServicesPreview />
      <WhyPreview />
      <GuaranteeBanner />
      <ProcessPreview />
      <StatsBand />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
