"use client";

import { useLang } from "./lang-provider";
import { BRANDS } from "@/lib/i18n";

/** Infinite marquee of client fuel-brand logos (pauses on hover). */
export function BrandMarquee() {
  const { t } = useLang();
  const doubled = [...BRANDS, ...BRANDS];

  return (
    <section
      aria-label={t.marquee.label}
      className="border-y border-border bg-white py-8"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {t.marquee.label}
        </p>
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-10 pe-10">
            {doubled.map((brand, i) => (
              <img
                key={`${brand.name}-${i}`}
                src={brand.logo}
                alt={brand.name}
                width={110}
                height={44}
                loading="lazy"
                decoding="async"
                className="h-9 w-auto shrink-0 object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
