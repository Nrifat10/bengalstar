"use client";

import type { CSSProperties } from "react";
import { useLang } from "./lang-provider";
import { BRANDS } from "@/lib/i18n";

/* ---------------------------------------------------------------------------
   Colorful brand marquee
   - Each brand logo is rendered in FULL COLOR inside a soft tinted tile.
   - On hover the tile lifts, a brand-colored gradient veil fades in, and a
     colored glow strip appears underneath.
   - Brand-tint backdrop + gradient veil + glow strip are driven by the
     per-brand `tint`, `from` and `to` colors stored in i18n.ts.
   - Marquee still auto-plays and pauses on hover (see .animate-marquee CSS).
--------------------------------------------------------------------------- */

type Brand = (typeof BRANDS)[number];

export function BrandMarquee() {
  const { t } = useLang();
  const doubled = [...BRANDS, ...BRANDS];

  return (
    <section
      aria-label={t.marquee.label}
      className="relative border-y border-border bg-gradient-to-b from-white via-gold-soft/30 to-white py-10"
    >
      {/* Decorative colored blobs to reinforce the "colorful" theme */}
      <div
        className="pointer-events-none absolute -top-8 start-1/4 h-24 w-72 rounded-full bg-gold/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-8 end-1/4 h-24 w-72 rounded-full bg-brand-3/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col items-center gap-2 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-3 shadow-sm">
            <span
              className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-pink-500 via-amber-500 to-emerald-500"
              aria-hidden="true"
            />
            {t.marquee.label}
          </span>
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-4 pe-4 sm:gap-5 sm:pe-5">
            {doubled.map((brand, i) => (
              <BrandTile key={`${brand.name}-${i}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandTile({ brand }: { brand: Brand }) {
  const style = {
    "--brand-from": brand.from,
    "--brand-to": brand.to,
    "--brand-tint": brand.tint,
  } as CSSProperties;

  return (
    <div
      style={style}
      className="brand-tile relative flex h-16 w-36 shrink-0 items-center justify-center rounded-xl px-4 sm:h-[72px] sm:w-44 sm:px-5"
    >
      <img
        src={brand.logo}
        alt={brand.name}
        width={140}
        height={56}
        loading="lazy"
        decoding="async"
        className="relative z-10 max-h-10 w-auto max-w-full object-contain drop-shadow-[0_1px_2px_rgba(14,31,61,0.18)] sm:max-h-11"
      />
      {/* Brand color chip — small accent dot in the corner */}
      <span
        className="absolute end-2.5 top-2.5 h-1.5 w-1.5 rounded-full"
        style={{ background: brand.from }}
        aria-hidden="true"
      />
    </div>
  );
}
