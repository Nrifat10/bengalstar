"use client";

import { Counter } from "./counter";
import { Reveal } from "./reveal";
import { useLang } from "./lang-provider";

/** Navy stats band with animated counters — reused across pages. */
export function StatsBand() {
  const { t } = useLang();

  const stats = [
    { value: 500, suffix: "+", label: t.stats.s1 },
    { value: 120, suffix: "+", label: t.stats.s2 },
    { value: new Date().getFullYear() - 2014, suffix: "", label: t.stats.s3 },
    { value: 98, suffix: "%", label: t.stats.s4 },
  ];

  return (
    <section className="relative overflow-hidden bg-navy-grad">
      <div className="absolute inset-0 bg-gridlines" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <Reveal className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-2">
            {t.stats.chip}
          </span>
        </Reveal>
        <dl className="grid grid-cols-2 gap-8 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="text-center">
              <dt className="order-2 mt-2 text-sm font-medium text-white/70">
                {stat.label}
              </dt>
              <dd className="order-1 text-4xl font-bold text-white sm:text-5xl">
                <Counter
                  target={stat.value}
                  suffix={stat.suffix}
                  className="text-gold-grad"
                />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
