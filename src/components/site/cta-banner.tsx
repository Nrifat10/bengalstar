"use client";

import { ArrowRight } from "lucide-react";
import { useLang } from "./lang-provider";
import { routeHref } from "./router";
import { Reveal } from "./reveal";
import { WhatsAppIcon } from "./icons";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/i18n";

type CtaBannerProps = {
  variant?: "navy" | "gold";
  className?: string;
};

/** Full-width closing CTA used at the bottom of every page. */
export function CtaBanner({ variant = "navy", className }: CtaBannerProps) {
  const { t, isRTL } = useLang();
  const navy = variant === "navy";

  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "absolute inset-0",
          navy ? "bg-navy-grad" : "bg-gradient-to-br from-gold-3 via-gold to-gold-2"
        )}
        aria-hidden="true"
      />
      {navy && (
        <div className="absolute inset-0 bg-gridlines" aria-hidden="true" />
      )}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <h2
            className={cn(
              "mx-auto max-w-2xl text-3xl font-bold leading-tight sm:text-4xl",
              navy ? "text-white" : "text-brand"
            )}
          >
            {t.cta.title}
          </h2>
          <p
            className={cn(
              "mx-auto mt-4 max-w-xl text-base sm:text-lg",
              navy ? "text-white/75" : "text-brand/80"
            )}
          >
            {t.cta.sub}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={routeHref("contact")}
              className={cn(
                "btn-shine inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2",
                navy
                  ? "bg-gradient-to-r from-gold-3 via-gold to-gold-2 text-brand shadow-lg shadow-gold/25 focus-visible:outline-gold"
                  : "bg-brand text-white shadow-lg shadow-brand/30 focus-visible:outline-white"
              )}
            >
              {t.cta.btn1}
              <ArrowRight className={cn("h-4 w-4", isRTL && "rotate-180")} aria-hidden="true" />
            </a>
            <a
              href={`${SITE.whatsapp}?text=${encodeURIComponent(t.contact.whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-12 items-center justify-center gap-2 rounded-full border px-8 text-sm font-semibold transition-colors",
                navy
                  ? "border-white/25 text-white hover:bg-white/10"
                  : "border-brand/30 text-brand hover:bg-brand/5"
              )}
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t.cta.btn2}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
