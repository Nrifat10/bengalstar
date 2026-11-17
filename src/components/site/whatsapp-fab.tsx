"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLang } from "./lang-provider";
import { WhatsAppIcon } from "./icons";
import { SITE } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Floating stack: WhatsApp chat button + back-to-top (appears after scroll). */
export function FloatingButtons({ hidden = false }: { hidden?: boolean }) {
  const { t } = useLang();
  const [showTop, setShowTop] = useState(false);
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 560);
      // WhatsApp FAB appears only after user scrolls past the hero's stats row,
      // so it never overlaps the hero's bottom stats card on short viewports.
      setShowFab(window.scrollY > 320);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={cn(
        "pointer-events-none fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] end-[max(1.25rem,env(safe-area-inset-right))] z-40 flex flex-col gap-3 transition-all duration-300 sm:bottom-6 sm:end-6",
        hidden
          ? "translate-y-4 opacity-0"
          : "translate-y-0 opacity-100"
      )}
    >
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
        tabIndex={hidden || !showFab ? -1 : 0}
        className={cn(
          "pointer-events-auto group flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-all duration-300",
          "hover:scale-105",
          showFab
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-75 opacity-0"
        )}
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>
    </div>
  );
}
