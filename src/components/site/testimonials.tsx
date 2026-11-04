"use client";

import { Quote, Star } from "lucide-react";
import { useLang } from "./lang-provider";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

/** Client testimonials — 3 cards with gold stars. */
export function Testimonials() {
  const { t } = useLang();

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.testi.eyebrow}
          title={t.testi.title}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.testi.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.1}>
              <figure className="relative flex h-full flex-col rounded-2xl border border-border bg-muted/40 p-7 transition-shadow duration-300 hover:shadow-lg hover:shadow-brand/5">
                <Quote
                  className="absolute end-6 top-6 h-8 w-8 text-gold/25"
                  aria-hidden="true"
                />
                <div
                  className="flex gap-1"
                  aria-label="5 out of 5 stars"
                  aria-hidden="true"
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/85">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-brand">{item.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
