"use client";

import { useState, useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Loader2,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/components/site/lang-provider";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { WhatsAppIcon } from "@/components/site/icons";
import { SITE } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  company: string;
  phone: string;
  city: string;
  workerType: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  company: "",
  phone: "",
  city: "",
  workerType: "",
  message: "",
};

export function ContactPage() {
  const { t, lang, isRTL } = useLang();
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [waLink, setWaLink] = useState<string | null>(null);
  /* Honeypot for bots (humans never see/fill this) + page-load timestamp
     to reject instant bot submissions. */
  const [honeypot, setHoneypot] = useState("");
  const t0Ref = useRef<number>(Date.now());

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: false }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, boolean>> = {};
    if (form.name.trim().length < 2) next.name = true;
    if (!/^[+]?[\d\s()-]{7,20}$/.test(form.phone.trim())) next.phone = true;
    if (!form.city) next.city = true;
    if (!form.workerType) next.workerType = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang, website: honeypot, t0: t0Ref.current }),
      });
      const data = (await res.json()) as { ok?: boolean; whatsapp?: string };
      if (!res.ok || !data.ok) throw new Error("request_failed");
      setSent(true);
      setForm(EMPTY_FORM);
      setHoneypot("");
      setWaLink(typeof data.whatsapp === "string" ? data.whatsapp : null);
      toast({
        title: t.contact.form.success,
        description: t.contact.form.note,
      });
    } catch {
      toast({
        variant: "destructive",
        title: t.contact.form.error,
      });
    } finally {
      setSending(false);
    }
  };

  const inputCls = (bad?: boolean) =>
    cn(
      "h-11 rounded-lg border-input bg-white text-sm",
      "focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:border-gold",
      bad && "border-red-400 focus-visible:border-red-400"
    );

  const infoItems = [
    {
      icon: MapPin,
      label: t.contact.addressLabel,
      value: t.contact.address,
      href: undefined as string | undefined,
    },
    {
      icon: Phone,
      label: t.contact.phoneLabel,
      value: SITE.phoneDisplay,
      href: `tel:${SITE.phone}`,
    },
    {
      icon: Mail,
      label: t.contact.emailLabel,
      value: SITE.email,
      href: `mailto:${SITE.email}`,
    },
    {
      icon: Clock,
      label: t.contact.hoursLabel,
      value: t.contact.hours,
      href: undefined,
    },
  ];

  return (
    <>
      <PageHero route="contact" title={t.contact.title} sub={t.contact.sub} />

      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-10">
            {/* ---------------- Form card ---------------- */}
            <Reveal>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
                {sent ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <div
                      className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold-soft"
                      aria-hidden="true"
                    >
                      <CheckCircle2 className="h-10 w-10 text-gold-3" strokeWidth={1.6} />
                    </div>
                    <h2 className="text-2xl font-bold text-brand">
                      {t.contact.form.success}
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {t.contact.form.note}
                    </p>
                    {waLink && (
                      <Button
                        asChild
                        className="mt-6 h-12 rounded-full bg-[#25D366] px-8 text-sm font-semibold text-white shadow-md shadow-[#25D366]/30 hover:bg-[#1fb859]"
                      >
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
                          {t.contact.wa}
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="mt-8 h-11 rounded-full border-gold/50 px-6 text-sm font-semibold text-gold-3 hover:bg-gold-soft"
                      onClick={() => {
                        setSent(false);
                        setWaLink(null);
                      }}
                    >
                      {t.contact.form.submit}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate>
                    {/* Honeypot anti-bot field — visually hidden, never
                        labelled for humans. Bots auto-fill "website"; if
                        filled, the API silently rejects the submission. */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: "-9999px",
                        top: "auto",
                        width: 1,
                        height: 1,
                        overflow: "hidden",
                      }}
                    >
                      <label htmlFor="rf-website">Website</label>
                      <Input
                        id="rf-website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="rf-name" className="text-sm font-medium text-brand">
                          {t.contact.form.name}{" "}
                          <span className="text-red-500" aria-hidden="true">*</span>
                        </Label>
                        <Input
                          id="rf-name"
                          value={form.name}
                          onChange={set("name")}
                          placeholder={t.contact.form.namePh}
                          autoComplete="name"
                          aria-invalid={!!errors.name}
                          className={inputCls(errors.name)}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500">{t.contact.form.required}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="rf-phone" className="text-sm font-medium text-brand">
                          {t.contact.form.phone}{" "}
                          <span className="text-red-500" aria-hidden="true">*</span>
                        </Label>
                        <Input
                          id="rf-phone"
                          value={form.phone}
                          onChange={set("phone")}
                          placeholder={t.contact.form.phonePh}
                          type="tel"
                          dir="ltr"
                          autoComplete="tel"
                          aria-invalid={!!errors.phone}
                          className={cn(inputCls(errors.phone), "text-start")}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500">
                            {t.contact.form.invalidPhone}
                          </p>
                        )}
                      </div>

                      {/* Company */}
                      <div className="space-y-2">
                        <Label htmlFor="rf-company" className="text-sm font-medium text-brand">
                          {t.contact.form.company}
                        </Label>
                        <Input
                          id="rf-company"
                          value={form.company}
                          onChange={set("company")}
                          placeholder={t.contact.form.companyPh}
                          autoComplete="organization"
                          className={inputCls()}
                        />
                      </div>

                      {/* City */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-brand">
                          {t.contact.form.city}{" "}
                          <span className="text-red-500" aria-hidden="true">*</span>
                        </Label>
                        <Select
                          value={form.city}
                          onValueChange={(v) => {
                            setForm((f) => ({ ...f, city: v }));
                            setErrors((er) => ({ ...er, city: false }));
                          }}
                        >
                          <SelectTrigger
                            aria-invalid={!!errors.city}
                            className={cn(
                              "h-11 w-full rounded-lg bg-white text-sm",
                              errors.city && "border-red-400"
                            )}
                          >
                            <SelectValue placeholder={t.contact.form.cityOpt} />
                          </SelectTrigger>
                          <SelectContent>
                            {t.contact.form.cities.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.city && (
                          <p className="text-xs text-red-500">{t.contact.form.required}</p>
                        )}
                      </div>

                      {/* Worker type */}
                      <div className="space-y-2 sm:col-span-2">
                        <Label className="text-sm font-medium text-brand">
                          {t.contact.form.type}{" "}
                          <span className="text-red-500" aria-hidden="true">*</span>
                        </Label>
                        <Select
                          value={form.workerType}
                          onValueChange={(v) => {
                            setForm((f) => ({ ...f, workerType: v }));
                            setErrors((er) => ({ ...er, workerType: false }));
                          }}
                        >
                          <SelectTrigger
                            aria-invalid={!!errors.workerType}
                            className={cn(
                              "h-11 w-full rounded-lg bg-white text-sm",
                              errors.workerType && "border-red-400"
                            )}
                          >
                            <SelectValue placeholder={t.contact.form.typeOpt} />
                          </SelectTrigger>
                          <SelectContent>
                            {t.contact.form.types.map((w) => (
                              <SelectItem key={w} value={w}>
                                {w}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.workerType && (
                          <p className="text-xs text-red-500">{t.contact.form.required}</p>
                        )}
                      </div>

                      {/* Message */}
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="rf-message" className="text-sm font-medium text-brand">
                          {t.contact.form.message}
                        </Label>
                        <Textarea
                          id="rf-message"
                          value={form.message}
                          onChange={set("message")}
                          placeholder={t.contact.form.messagePh}
                          rows={5}
                          className="resize-none rounded-lg bg-white text-sm focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:border-gold"
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                      <p className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ShieldCheck className="h-4 w-4 shrink-0 text-gold-3" aria-hidden="true" />
                        {t.contact.form.note}
                      </p>
                      <Button
                        type="submit"
                        disabled={sending}
                        className="btn-shine h-12 rounded-full bg-gradient-to-r from-gold-3 via-gold to-gold-2 px-8 text-sm font-semibold text-brand shadow-lg shadow-gold/25 hover:-translate-y-0.5 disabled:opacity-60"
                      >
                        {sending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            {t.contact.form.sending}
                          </>
                        ) : (
                          <>
                            {t.contact.form.submit}
                            <Send
                              className={cn("h-4 w-4", isRTL && "-scale-x-100")}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>

            {/* ---------------- Info sidebar ---------------- */}
            <Reveal delay={0.12} className="h-full">
              <div className="flex h-full flex-col gap-6">
                {/* Contact info card */}
                <div className="relative overflow-hidden rounded-3xl bg-navy-grad p-7 sm:p-8">
                  <div className="absolute inset-0 bg-gridlines" aria-hidden="true" />
                  <div className="relative">
                    <h2 className="text-lg font-bold text-white">
                      {t.contact.infoTitle}
                    </h2>
                    <ul className="mt-6 space-y-5">
                      {infoItems.map((item) => (
                        <li key={item.label} className="flex gap-3.5">
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10"
                            aria-hidden="true"
                          >
                            <item.icon className="h-4.5 w-4.5 h-5 w-5 text-gold-2" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                              {item.label}
                            </p>
                            {item.href ? (
                              <a
                                href={item.href}
                                dir={item.icon === Phone ? "ltr" : undefined}
                                className="mt-0.5 block text-sm font-medium text-white transition-colors hover:text-gold-2"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="mt-0.5 text-sm font-medium leading-relaxed text-white">
                                {item.value}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* WhatsApp card */}
                <div className="rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-8">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366]/15"
                    aria-hidden="true"
                  >
                    <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-brand">
                    {t.contact.wa}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {t.contact.fallback}
                  </p>
                  <Button
                    asChild
                    className="mt-5 h-11 w-full rounded-full bg-[#25D366] text-sm font-semibold text-white shadow-md shadow-[#25D366]/30 hover:bg-[#1fb859]"
                  >
                    <a
                      href={`${SITE.whatsapp}?text=${encodeURIComponent(t.contact.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {SITE.phoneDisplay}
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
