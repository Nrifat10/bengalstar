/* ============================================================================
   Bangla Star Co., Ltd — Main script
   ----------------------------------------------------------------------------
   Handles: images + fallbacks, EN/AR i18n with RTL, sticky navbar, mobile
   menu, hero image-card & testimonial sliders (autoplay, dots, swipe, pause),
   FAQ accordion, scroll-reveal, animated counters, scrollspy, back-to-top,
   worker-type preselect, Formspree contact form with WhatsApp fallback.
   ========================================================================== */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     0. Site configuration — REPLACE THESE PLACEHOLDERS BEFORE GOING LIVE
     ------------------------------------------------------------------------ */
  var SITE_CONFIG = {
    /* Formspree form ID (create a free form at https://formspree.io) */
    formspreeId: "YOUR_FORM_ID",

    /* WhatsApp number in international format, digits only (e.g. 9665XXXXXXXX) */
    whatsappNumber: "9665XXXXXXXX",

    /* Phone / email used for tel: and mailto: links */
    phoneHref: "+9665XXXXXXXXXX",
    email: "info@banglastar.com"
  };

  /* --------------------------------------------------------------------------
     1. Tiny helpers
     ------------------------------------------------------------------------ */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  function getKey(obj, path) {
    return String(path)
      .split(".")
      .reduce(function (o, k) { return (o == null ? undefined : o[k]); }, obj);
  }

  var currentLang = "en";

  /* Translated lookup with English fallback */
  function t(path) {
    var val = getKey(TRANSLATIONS[currentLang], path);
    if (val == null) { val = getKey(TRANSLATIONS.en, path); }
    return val == null ? "" : val;
  }

  /* --------------------------------------------------------------------------
     2. Images — assign src from images.js, attach branded fallback
     ------------------------------------------------------------------------ */
  function initImages() {
    if (typeof IMAGE_MAP === "undefined") { return; }

    $$("[data-img]").forEach(function (img) {
      var src = IMAGE_MAP[img.dataset.img];
      if (src) { img.src = src; }

      img.addEventListener("error", function () {
        if (img.dataset.errored) { return; }
        img.dataset.errored = "1";
        img.src = FALLBACK_IMAGE;
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. Language system
     ------------------------------------------------------------------------ */
  function applyLanguage(lang, save) {
    currentLang = (lang === "ar") ? "ar" : "en";

    var html = document.documentElement;
    html.lang = currentLang;
    html.dir = (currentLang === "ar") ? "rtl" : "ltr";
    html.classList.toggle("lang-ar", currentLang === "ar");

    /* Text content */
    $$("[data-i18n]").forEach(function (el) {
      var val = t(el.dataset.i18n);
      if (val != null && val !== "") { el.textContent = val; }
    });

    /* Placeholders */
    $$("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
    });

    /* aria-labels */
    $$("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });

    /* title attributes (e.g. map iframe) */
    $$("[data-i18n-title]").forEach(function (el) {
      el.setAttribute("title", t(el.dataset.i18nTitle));
    });

    /* image alt text */
    $$("[data-i18n-img]").forEach(function (el) {
      el.setAttribute("alt", t(el.dataset.i18nImg));
    });

    /* Document metadata */
    document.title = t("meta.title");
    var metaDesc = $('meta[name="description"]');
    if (metaDesc) { metaDesc.setAttribute("content", t("meta.description")); }

    /* Toggle button shows the *other* language */
    var toggleText = $("#langToggleText");
    if (toggleText) { toggleText.textContent = (currentLang === "ar") ? "EN" : "العربية"; }

    /* Hamburger label depends on open state */
    updateHamburgerAria();

    /* Dynamic links + labels that depend on language */
    updateContactLinks();

    if (save) {
      try { localStorage.setItem("bs-lang", currentLang); } catch (e) { /* no-op */ }
    }

    /* Let sliders re-label their dots */
    document.dispatchEvent(new CustomEvent("langchange"));
  }

  function updateContactLinks() {
    var num = String(SITE_CONFIG.whatsappNumber).replace(/[^\d]/g, "");
    var msg = t("contact.whatsappMsg");
    var waHref = "https://wa.me/" + num + "?text=" + encodeURIComponent(msg);

    $$("[data-whatsapp]").forEach(function (a) { a.href = waHref; });
    $$("[data-tel]").forEach(function (a) { a.href = "tel:" + SITE_CONFIG.phoneHref; });
    $$("[data-mail]").forEach(function (a) { a.href = "mailto:" + SITE_CONFIG.email; });
  }

  function detectInitialLanguage() {
    var lang = "en";
    try {
      var q = new URLSearchParams(window.location.search).get("lang");
      if (q === "ar" || q === "en") {
        lang = q;
        localStorage.setItem("bs-lang", lang);
      } else {
        var saved = localStorage.getItem("bs-lang");
        if (saved === "ar" || saved === "en") {
          lang = saved;
        } else if ((navigator.language || "").toLowerCase().indexOf("ar") === 0) {
          lang = "ar";
        }
      }
    } catch (e) { /* no-op */ }
    return lang;
  }

  /* --------------------------------------------------------------------------
     4. Navbar — scrolled state, mobile menu, scrollspy
     ------------------------------------------------------------------------ */
  var navbar = $("#navbar");
  var hamburger = $("#hamburger");
  var navMenu = $("#navMenu");
  var backdrop = $("#menuBackdrop");
  var menuOpen = false;

  function updateHamburgerAria() {
    if (!hamburger) { return; }
    hamburger.setAttribute("aria-expanded", String(menuOpen));
    hamburger.setAttribute("aria-label", t(menuOpen ? "nav.closeMenuAria" : "nav.openMenuAria"));
  }

  function setMenu(open) {
    menuOpen = open;
    if (navMenu) { navMenu.classList.toggle("open", open); }
    if (backdrop) { backdrop.classList.toggle("visible", open); }
    if (hamburger) {
      hamburger.classList.toggle("open", open);
      navbar.classList.toggle("menu-open", open);
      updateHamburgerAria();
    }
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  function initNavbar() {
    if (hamburger) {
      hamburger.addEventListener("click", function () { setMenu(!menuOpen); });
    }
    if (backdrop) { backdrop.addEventListener("click", function () { setMenu(false); }); }

    /* Close menu when a link inside is clicked */
    if (navMenu) {
      $$("a", navMenu).forEach(function (a) {
        a.addEventListener("click", function () { setMenu(false); });
      });
    }

    /* Escape closes the menu */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuOpen) {
        setMenu(false);
        if (hamburger) { hamburger.focus(); }
      }
    });

    /* Sticky style + back-to-top visibility (passive scroll) */
    var toTop = $("#toTop");
    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      if (navbar) { navbar.classList.toggle("scrolled", y > 24); }
      if (toTop) { toTop.classList.toggle("visible", y > 600); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toTop) {
      toTop.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: prefersReduced.matches ? "auto" : "smooth"
        });
      });
    }

    /* Close the slide-in menu if the viewport grows to desktop width */
    window.addEventListener("resize", function () {
      if (menuOpen && window.innerWidth >= 960) { setMenu(false); }
    });
  }

  /* Scrollspy — highlight the section link currently in view */
  function initScrollspy() {
    var links = $$('.nav-link[href^="#"]');
    var targets = links
      .map(function (l) { return $(l.getAttribute("href")); })
      .filter(Boolean);

    if (!targets.length || !("IntersectionObserver" in window)) { return; }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        var id = "#" + entry.target.id;
        links.forEach(function (l) {
          l.classList.toggle("active", l.getAttribute("href") === id);
        });
      });
    }, { rootMargin: "-42% 0px -52% 0px", threshold: 0 });

    targets.forEach(function (s) { observer.observe(s); });
  }

  /* --------------------------------------------------------------------------
     5. Fade slider (hero image card + testimonials)
     Closure-based factory: no "this", fully encapsulated state.
     ------------------------------------------------------------------------ */
  function createSlider(root, opts) {
    if (!root) { return null; }

    var slides = $$(".slide", root);
    var dots = [];
    var interval = (opts && opts.interval) || 6000;
    var timer = null;
    var autoplayEnabled = !prefersReduced.matches;
    var index = 0;

    function go(i) {
      if (!slides.length) { return; }
      index = (i + slides.length) % slides.length;

      slides.forEach(function (slide, idx) {
        var active = idx === index;
        slide.classList.toggle("active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });

      dots.forEach(function (dot, idx) {
        dot.classList.toggle("active", idx === index);
        if (idx === index) { dot.setAttribute("aria-current", "true"); }
        else { dot.removeAttribute("aria-current"); }
      });
    }

    function next() { go(index + 1); }
    function prev() { go(index - 1); }

    function start() {
      if (!autoplayEnabled || timer) { return; }
      timer = setInterval(next, interval);
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    function restart() {
      stop();
      start();
    }

    function setAutoplayEnabled(enabled) {
      autoplayEnabled = enabled;
      if (!enabled) { stop(); } else { start(); }
    }

    /* Build dots */
    var dotsWrap = (opts && opts.dotsWrap) || null;
    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "dot";
        dot.setAttribute("aria-label", t("ui.slide") + " " + (i + 1));
        dot.addEventListener("click", function () {
          go(i);
          restart();
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    /* Arrows */
    if (opts && opts.prevBtn) {
      opts.prevBtn.addEventListener("click", function () { prev(); restart(); });
    }
    if (opts && opts.nextBtn) {
      opts.nextBtn.addEventListener("click", function () { next(); restart(); });
    }

    /* Keyboard arrows while focus is inside the slider */
    root.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") { return; }
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) { return; }
      e.preventDefault();
      var rtl = document.documentElement.dir === "rtl";
      var forward = rtl ? e.key === "ArrowLeft" : e.key === "ArrowRight";
      if (forward) { next(); } else { prev(); }
      restart();
    });

    /* Touch swipe (direction-aware for RTL) */
    var touchX = null;
    root.addEventListener("touchstart", function (e) {
      touchX = e.changedTouches[0].clientX;
    }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (touchX === null) { return; }
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) < 45) { return; }
      var rtl = document.documentElement.dir === "rtl";
      var goNext = rtl ? dx > 0 : dx < 0;
      if (goNext) { next(); } else { prev(); }
      restart();
    }, { passive: true });

    /* Pause on hover / focus */
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    /* Pause when the tab is hidden */
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { stop(); } else { start(); }
    });

    /* Re-label dots when the language changes */
    document.addEventListener("langchange", function () {
      dots.forEach(function (dot, i) {
        dot.setAttribute("aria-label", t("ui.slide") + " " + (i + 1));
      });
    });

    go(0);
    start();

    /* Public API */
    return {
      go: go,
      next: next,
      prev: prev,
      start: start,
      stop: stop,
      restart: restart,
      setAutoplayEnabled: setAutoplayEnabled
    };
  }

  /* --------------------------------------------------------------------------
     6. FAQ accordion — only one item open at a time
     ------------------------------------------------------------------------ */
  function initFaq() {
    var items = $$(".faq-item");
    if (items.length < 2) { return; }

    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) { return; }
        items.forEach(function (other) {
          if (other !== item && other.open) { other.open = false; }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. Scroll reveal
     ------------------------------------------------------------------------ */
  function initReveal() {
    var els = $$(".reveal");
    if (!els.length) { return; }

    /* Stagger siblings inside reveal-groups */
    $$(".reveal-group").forEach(function (group) {
      $$(".reveal", group).forEach(function (el, i) {
        el.style.setProperty("--reveal-delay", Math.min(i * 90, 360) + "ms");
      });
    });

    if (prefersReduced.matches || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        var el = entry.target;
        el.classList.add("in");
        /* Clear stagger delay after the entrance so hover stays snappy */
        window.setTimeout(function () { el.style.setProperty("--reveal-delay", "0ms"); }, 900);
        observer.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -30px 0px" });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* --------------------------------------------------------------------------
     8. Animated stat counters
     ------------------------------------------------------------------------ */
  function initCounters() {
    var counters = $$(".counter");
    if (!counters.length) { return; }

    function renderFinal(el) {
      el.textContent = el.dataset.count;
    }

    function animate(el) {
      var target = parseInt(el.dataset.count, 10) || 0;
      var duration = 1400;
      var start = null;

      function step(ts) {
        if (!start) { start = ts; }
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3); /* ease-out cubic */
        el.textContent = Math.round(target * eased);
        if (p < 1) { window.requestAnimationFrame(step); }
      }
      window.requestAnimationFrame(step);
    }

    if (prefersReduced.matches || !("IntersectionObserver" in window)) {
      counters.forEach(renderFinal);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* --------------------------------------------------------------------------
     9. Contact form — Formspree via fetch, WhatsApp fallback
     ------------------------------------------------------------------------ */
  function initContactForm() {
    var form = $("#contactForm");
    if (!form) { return; }

    var successEl = $("#formSuccess");
    var errorEl = $("#formError");
    var submitBtn = $("#submitBtn");
    var submitLabel = $("#submitLabel");

    function showAlert(type, message) {
      if (successEl) {
        successEl.textContent = type === "success" ? message : "";
        successEl.hidden = type !== "success";
      }
      if (errorEl) {
        errorEl.textContent = type === "error" ? message : "";
        errorEl.hidden = type !== "error";
      }
    }

    function hideAlerts() {
      if (successEl) { successEl.hidden = true; }
      if (errorEl) { errorEl.hidden = true; }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hideAlerts();

      /* Native validation first (localized browser messages) */
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      /* Skip honeypot submissions */
      var gotcha = form.querySelector('[name="_gotcha"]');
      if (gotcha && gotcha.value) { return; }

      var data = {
        name: form.name.value.trim(),
        company: form.company.value.trim(),
        phone: form.phone.value.trim(),
        city: form.city.value,
        workerType: form.workerType.value,
        message: form.message.value.trim(),
        _language: currentLang,
        _subject: "New worker request — banglastar.com"
      };

      /* Endpoint from the configured Formspree ID */
      var endpoint = null;
      if (SITE_CONFIG.formspreeId &&
          SITE_CONFIG.formspreeId !== "YOUR_FORM_ID") {
        endpoint = "https://formspree.io/f/" + SITE_CONFIG.formspreeId;
      }

      /* Not configured yet → guide the visitor to WhatsApp */
      if (!endpoint) {
        showAlert("error", t("contact.form.notConfigured"));
        return;
      }

      /* Sending state */
      if (submitBtn) { submitBtn.disabled = true; }
      if (submitLabel) { submitLabel.textContent = t("contact.form.sending"); }

      fetch(endpoint, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) { throw new Error("Formspree error " + res.status); }
          return res.json();
        })
        .then(function () {
          showAlert("success", t("contact.form.success"));
          form.reset();
        })
        .catch(function () {
          showAlert("error", t("contact.form.error"));
        })
        .then(function () {
          if (submitBtn) { submitBtn.disabled = false; }
          if (submitLabel) { submitLabel.textContent = t("contact.form.submit"); }
        });
    });
  }

  /* --------------------------------------------------------------------------
     10. Service cards / footer links preselect the worker type in the form
     ------------------------------------------------------------------------ */
  function initWorkerPreselect() {
    var select = $("#cf-type");
    if (!select) { return; }

    $$("[data-worker]").forEach(function (el) {
      el.addEventListener("click", function () {
        var value = el.dataset.worker;
        if (Array.prototype.some.call(select.options, function (o) { return o.value === value; })) {
          select.value = value;
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     11. Language toggle + footer year + boot
     ------------------------------------------------------------------------ */
  function initLanguageToggle() {
    var toggle = $("#langToggle");
    if (!toggle) { return; }
    toggle.addEventListener("click", function () {
      applyLanguage(currentLang === "en" ? "ar" : "en", true);
    });
  }

  function initFooterYear() {
    var yearEl = $("#footerYear");
    if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }
  }

  function init() {
    initImages();
    applyLanguage(detectInitialLanguage(), false);
    initLanguageToggle();
    initNavbar();
    initScrollspy();
    initFaq();
    initReveal();
    initCounters();
    initContactForm();
    initWorkerPreselect();
    initFooterYear();

    /* Sliders */
    var hero = createSlider($("#heroSlider"), {
      interval: 5000,
      dotsWrap: $("#heroDots")
    });

    var testi = createSlider($("#testimonialSlider"), {
      interval: 8000,
      dotsWrap: $("#tDots"),
      prevBtn: $("#tPrev"),
      nextBtn: $("#tNext")
    });

    /* Honour reduced-motion changes at runtime */
    if (prefersReduced.addEventListener) {
      prefersReduced.addEventListener("change", function (e) {
        [hero, testi].forEach(function (s) {
          if (!s) { return; }
          s.setAutoplayEnabled(!e.matches);
        });
      });
    }
  }

  /* Scripts are deferred — DOM is ready when this runs */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
