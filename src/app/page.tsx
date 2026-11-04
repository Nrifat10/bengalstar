"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LangProvider, useLang } from "@/components/site/lang-provider";
import { useHashRoute, type Route } from "@/components/site/router";
import { SITE } from "@/lib/i18n";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/whatsapp-fab";
import { HomePage } from "@/components/pages/home";
import { AboutPage } from "@/components/pages/about";
import { ServicesPage } from "@/components/pages/services";
import { WhyUsPage } from "@/components/pages/why-us";
import { ProcessPage } from "@/components/pages/process";
import { CoveragePage } from "@/components/pages/coverage";
import { FaqPage } from "@/components/pages/faq";
import { ContactPage } from "@/components/pages/contact";

function renderPage(route: Route) {
  switch (route) {
    case "about":
      return <AboutPage />;
    case "services":
      return <ServicesPage />;
    case "why-us":
      return <WhyUsPage />;
    case "process":
      return <ProcessPage />;
    case "coverage":
      return <CoveragePage />;
    case "faq":
      return <FaqPage />;
    case "contact":
      return <ContactPage />;
    default:
      return <HomePage />;
  }
}

const PAGE_TITLES: Record<Route, { en: string; ar: string }> = {
  home: { en: "", ar: "" },
  about: { en: "About Us", ar: "من نحن" },
  services: { en: "Our Services", ar: "خدماتنا" },
  "why-us": { en: "Why Choose Us", ar: "لماذا نحن" },
  process: { en: "How It Works", ar: "كيف نعمل" },
  coverage: { en: "Coverage", ar: "التغطية" },
  faq: { en: "FAQ", ar: "الأسئلة الشائعة" },
  contact: { en: "Contact", ar: "اتصل بنا" },
};

function SiteShell() {
  const { route } = useHashRoute();
  const { lang } = useLang();

  /* Scroll to top whenever the "page" changes */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [route]);

  /* Keep the document title in sync with the active page + language */
  useEffect(() => {
    const brandName = lang === "ar" ? SITE.nameAr : SITE.name;
    const pageTitle = PAGE_TITLES[route][lang];
    document.title = pageTitle
      ? `${pageTitle} | ${brandName}`
      : `${brandName} | Manpower Supply for Petrol Stations in Saudi Arabia`;
  }, [route, lang]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar route={route} />
      <main id="main" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={route}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderPage(route)}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <SiteShell />
    </LangProvider>
  );
}
