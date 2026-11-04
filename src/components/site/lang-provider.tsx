"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { DICT, type Dict, type Lang } from "@/lib/i18n";

type LangContextValue = {
  lang: Lang;
  isRTL: boolean;
  t: Dict;
  toggleLang: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

/* --------------------------------------------------------------------------
   Language lives in localStorage — synchronized through
   useSyncExternalStore (SSR-safe, no setState-in-effect).
-------------------------------------------------------------------------- */

let listeners: Array<() => void> = [];
const emit = () => listeners.forEach((l) => l());

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): Lang {
  try {
    const saved = window.localStorage.getItem("bs-lang");
    if (saved === "ar" || saved === "en") return saved;
  } catch {
    /* no-op */
  }
  return "en";
}

function getServerSnapshot(): Lang {
  return "en";
}

function writeLang(next: Lang) {
  try {
    window.localStorage.setItem("bs-lang", next);
  } catch {
    /* no-op */
  }
  emit();
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /* Reflect language on <html> (lang + dir) — DOM sync is an effect's job */
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const toggleLang = useCallback(() => {
    writeLang(getSnapshot() === "en" ? "ar" : "en");
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      isRTL: lang === "ar",
      t: DICT[lang] as Dict,
      toggleLang,
    }),
    [lang, toggleLang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within <LangProvider>");
  return ctx;
}
