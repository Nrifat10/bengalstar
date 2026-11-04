"use client";

import { ArrowRight, Minus, Plus } from "lucide-react";
import { SITE } from "@/lib/i18n";
import { useLang } from "@/components/site/lang-provider";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { CtaBanner } from "@/components/site/cta-banner";
import { routeHref } from "@/components/site/router";
import { WhatsAppIcon } from "@/components/site/icons";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** Dedicated FAQ page — accordion, structured data, contact fallback, CTA. */
export function FaqPage() {
  const { t, isRTL } = useLang();

  const waHref = `${SITE.whatsapp}?text=${encodeURIComponent(t.contact.whatsappMsg)}`;

  /* FAQPage structured data for search engines (built from the active language). */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <PageHero route="faq" title={t.faq.title} sub={t.faq.pageSub} />

      {/* FAQ accordion */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-3">
              {t.faq.eyebrow}
            </p>
          </Reveal>

          <Reveal className="mx-auto mt-12 max-w-3xl">
            <div className="rounded-2xl border border-border bg-card px-6 shadow-sm">
              <Accordion type="single" collapsible>
                {t.faq.items.map((item, i) => (
                  <AccordionItem key={item.q} value={`faq-${i}`}>
                    <AccordionTrigger className="group items-center py-5 text-base font-semibold text-brand hover:no-underline hover:text-gold-3 [&>svg]:hidden">
                      <span className="flex-1 text-start">{item.q}</span>
                      <span
                        aria-hidden="true"
                        className="ms-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold-soft/60 text-gold-3"
                      >
                        <Plus className="h-4 w-4 group-data-[state=open]:hidden" />
                        <Minus className="hidden h-4 w-4 group-data-[state=open]:block" />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        </div>
      </section>

      {/* Still have questions */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
              <h3 className="text-xl font-bold text-brand sm:text-2xl">
                {t.faq.moreTitle}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {t.faq.moreDesc}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <a
                  href={routeHref("contact")}
                  className="btn-shine inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-3 via-gold to-gold-2 px-8 text-sm font-semibold text-brand shadow-lg shadow-gold/25 transition-transform hover:-translate-y-0.5"
                >
                  {t.cta.btn1}
                  <ArrowRight
                    className={cn("h-4 w-4", isRTL && "rotate-180")}
                    aria-hidden="true"
                  />
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-8 text-sm font-semibold text-brand transition-colors hover:border-gold/50"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {t.cta.btn2}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
