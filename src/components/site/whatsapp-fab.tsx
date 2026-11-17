"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLang } from "./lang-provider";
import { WhatsAppIcon } from "./icons";
import { SITE } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Floating stack: WhatsApp chat button + back-to-top (appears after scroll). */
export function FloatingButtons() {
  const { t } = useLang();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 z-40 flex flex-col gap-3 end-5 sm:bottom-6 sm:end-6">
      {showTop && (
        <button
          type="button"
          aria-label={t.ui.toTopAria}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-brand shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
      <a
        href={`${SITE.whatsapp}?text=${encodeURIComponent(t.contact.whatsappMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.ui.waAria}
        className={cn(
          "pointer-events-auto group flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40",
          "transition-transform hover:scale-105"
        )}
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>
    </div>
  );
}
