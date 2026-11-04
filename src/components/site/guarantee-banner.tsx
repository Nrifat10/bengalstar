"use client";

import { ShieldCheck } from "lucide-react";
import { useLang } from "./lang-provider";
import { routeHref } from "./router";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

/** The signature 72-hour replacement guarantee banner — navy with gold ring. */
export function GuaranteeBanner({ className }: { className?: string }) {
  const { t } = useLang();

  return (
    <section className={cn("bg-white py-14 sm:py-16", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy-grad px-6 py-12 text-center sm:px-12 sm:py-14">
            <div className="absolute inset-0 bg-gridlines" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -top-24 start-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl rtl:translate-x-1/2"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <div
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/50 bg-gold/10"
                aria-hidden="true"
              >
                <ShieldCheck className="h-10 w-10 text-gold-2" strokeWidth={1.6} />
              </div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                {t.why.banner.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/70 sm:text-lg">
                {t.why.banner.desc}
              </p>
              <a
                href={routeHref("contact")}
                className="btn-shine mt-7 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-gold-3 via-gold to-gold-2 px-8 text-sm font-semibold text-brand shadow-lg shadow-gold/25 transition-transform hover:-translate-y-0.5"
              >
                {t.why.banner.cta}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
