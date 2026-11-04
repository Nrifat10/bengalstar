"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  Calculator,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronDown,
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
   1. Hero — dark premium navy/gold split layout with auto-rotating slider,
      thumbnail rail, frosted-glass stats & floating badges, trust strip.
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
  const chips: { Icon: LucideIcon; label: string }[] = [
    { Icon: ShieldCheck, label: t.hero.chipLicensed },
    { Icon: Clock, label: t.hero.chipGuarantee },
    { Icon: CalendarCheck, label: t.hero.chipSince },
  ];

  const scrollToBrands = () => {
    document
      .getElementById("brands")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-navy-grad text-white">
      {/* Decorative layers */}
      <div className="absolute inset-0 bg-gridlines" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 end-[-12%] h-[30rem] w-[30rem] rounded-full bg-gold/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-25%] start-[-10%] h-[28rem] w-[28rem] rounded-full bg-brand-3/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy column */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold-2 backdrop-blur-sm">
              <StarIcon className="h-3.5 w-3.5" />
              {t.hero.badge}
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem]">
              <span className="block">{t.hero.titleA}</span>
              <span className="relative inline-block gold-shimmer">
                {t.hero.titleB}
                <svg
                  className="absolute -bottom-2.5 start-0 h-2.5 w-full text-gold/60"
                  viewBox="0 0 200 10"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 7c50-5 110-6 196-2"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>
              </span>
              <span className="block">{t.hero.titleC}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {t.hero.sub}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={routeHref("contact")}
                className="btn-shine inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-3 via-gold to-gold-2 px-8 text-sm font-semibold text-brand shadow-lg shadow-gold/30 transition-transform hover:-translate-y-0.5"
              >
                {t.hero.cta1}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </a>
              <a
                id="hero-whatsapp"
                href={`${SITE.whatsapp}?text=${encodeURIComponent(t.contact.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-white/15 hover:text-gold-2"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t.hero.cta2}
              </a>
            </div>

            {/* Stats — frosted glass cards with gold counters */}
            <dl className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
              {HERO_STATS.map((stat, i) => (
                <div
                  key={statLabels[i]}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm transition-colors hover:border-gold/30 hover:bg-white/10 sm:p-5"
                >
                  <dt className="order-2 mt-1 text-[11px] leading-snug text-white/60 sm:text-xs">
                    {statLabels[i]}
                  </dt>
                  <dd className="order-1 text-2xl font-bold text-gold-grad sm:text-3xl">
                    <Counter target={stat.target} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Visual column — auto-rotating slider + thumbnail rail */}
          <Reveal delay={0.15} className="relative">
            {/* Soft gold glow behind the card */}
            <div
              className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-gold/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative">
              {/* Gold corner accent (peeks out behind the card) */}
              <div
                className="pointer-events-none absolute -bottom-5 -end-5 h-24 w-24 rotate-12 rounded-3xl border-2 border-gold/40"
                aria-hidden="true"
              />

              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-2xl shadow-black/40 ring-1 ring-white/15 sm:aspect-[5/5]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <img
                      src={HERO_SLIDES[index]}
                      alt={slide.caption}
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Slide counter */}
                <div
                  className="absolute end-4 top-4 rounded-full border border-white/20 bg-brand/60 px-3 py-1 text-[11px] font-semibold tracking-widest text-white/90 backdrop-blur-md"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(HERO_SLIDES.length).padStart(2, "0")}
                </div>

                {/* Caption bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand/95 via-brand/55 to-transparent px-5 pb-4 pt-20">
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

              {/* Floating badge — 24/7 support (gentle float) */}
              <div className="animate-float absolute -top-4 end-5 flex items-center gap-2 rounded-full border border-white/20 bg-brand/70 px-4 py-2 shadow-lg shadow-black/30 backdrop-blur-md">
                <span
                  className="relative flex h-2.5 w-2.5 rounded-full bg-emerald-400 pulse-dot text-emerald-400"
                  aria-hidden="true"
                />
                <span className="text-xs font-semibold text-white">
                  {t.hero.badgeSupport}
                </span>
              </div>

              {/* Floating badge — verified (delayed float) */}
              <div className="animate-float-delay absolute bottom-24 start-5 flex items-center gap-2 rounded-2xl border border-white/20 bg-brand/70 px-4 py-2.5 shadow-lg shadow-black/30 backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-gold-2" aria-hidden="true" />
                <span className="text-xs font-semibold text-white">
                  {t.hero.badgeVerified}
                </span>
              </div>
            </div>

            {/* Thumbnail rail */}
            <div className="mt-4 flex items-center gap-2 sm:gap-2.5">
              {t.hero.slides.map((dot, i) => (
                <button
                  key={dot.caption}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={dot.caption}
                  aria-current={i === index ? "true" : undefined}
                  className="group relative overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold/70"
                >
                  <img
                    src={HERO_SLIDES[i]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "h-11 w-14 object-cover transition-all duration-300 sm:h-12 sm:w-[4.25rem]",
                      i === index
                        ? "opacity-100 ring-2 ring-gold"
                        : "opacity-45 ring-1 ring-white/25 group-hover:opacity-80"
                    )}
                  />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom trust strip */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-5 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {chips.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-gold-2" aria-hidden="true" />
                <span className="text-xs font-medium text-white/70">{label}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={scrollToBrands}
            className="hidden items-center gap-2 text-xs font-medium text-white/60 transition-colors hover:text-gold-2 sm:flex"
          >
            {t.hero.scroll}
            <ChevronDown
              className="animate-bounce-soft h-4 w-4 rtl:rotate-180"
              aria-hidden="true"
            />
          </button>
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
