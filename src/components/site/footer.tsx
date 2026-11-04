"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { IMAGES, SITE } from "@/lib/i18n";
import { useLang } from "./lang-provider";
import { routeHref } from "./router";
import { WhatsAppIcon } from "./icons";

export function Footer() {
  const { t } = useLang();

  const quickLinks = [
    { href: routeHref("home"), label: t.nav.home },
    { href: routeHref("about"), label: t.nav.about },
    { href: routeHref("services"), label: t.nav.services },
    { href: routeHref("why-us"), label: t.nav.why },
    { href: routeHref("process"), label: t.nav.process },
    { href: routeHref("coverage"), label: t.nav.coverage },
    { href: routeHref("faq"), label: t.nav.faq },
    { href: routeHref("contact"), label: t.nav.contact },
  ];

  const workerLinks = t.services.items.map((item) => item.title);

  return (
    <footer className="relative mt-auto overflow-hidden bg-brand text-white">
      {/* top gold hairline */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 end-0 h-96 w-96 rounded-full bg-brand-3/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <img
              src={IMAGES.logoWide}
              alt="Bengal Star Limited Company logo"
              width={1048}
              height={238}
              className="h-10 w-auto brightness-0 invert"
              decoding="async"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
              {t.footer.tagline}
            </p>
            <a
              href={`${SITE.whatsapp}?text=${encodeURIComponent(t.contact.whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition-colors hover:border-gold/60 hover:text-gold-2"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t.contact.wa}
            </a>
          </div>

          {/* Quick links */}
          <nav aria-label={t.footer.quick}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-2">
              {t.footer.quick}
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-gold-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Workers */}
          <nav aria-label={t.footer.services}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-2">
              {t.footer.services}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {workerLinks.map((label) => (
                <li key={label}>
                  <a
                    href={routeHref("services")}
                    className="text-sm text-white/65 transition-colors hover:text-gold-2"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-2">
              {t.footer.contact}
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-white/65">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{t.contact.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={`tel:${SITE.phone}`}
                  dir="ltr"
                  className="transition-colors hover:text-gold-2"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-gold-2"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{t.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs text-white/50 sm:flex-row sm:text-start">
          <p>
            {t.footer.rights} {new Date().getFullYear()} {SITE.name}
            {t.footer.rights2}
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>
              {t.footer.crLabel} {SITE.cr}
            </span>
            <span aria-hidden="true">·</span>
            <span>{t.footer.made}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
