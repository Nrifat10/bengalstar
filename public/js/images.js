/* ============================================================================
   Bengal Star Limited Company — Image manager
   ----------------------------------------------------------------------------
   ALL site images live in the single IMAGES array below so they are easy to
   replace. Each entry has:
     key  -> referenced from HTML via <img data-img="key">
     src  -> the image URL

   Hero slides + About images are the client's OWN station photos, uploaded
   2025-11-04 (Task 10-v1) and individually VLM-verified: Go station with
   curved canopy (portrait), LITER forecourt with uniformed attendants
   working the pumps, WEAL station with store, ENOC grand opening with
   staff, JIOIL station with price pylon, plus an ENOC forecourt used in
   the About media collage. One upload was rejected: a SASCO station photo
   carried a visible Shutterstock watermark (id 2273013883).

   Service-card images were re-sourced and self-hosted in Task 13 (2026-11-17):
  five of the seven z-cdn.chatglm.cn hot-links had begun returning 404, so
  all service/about images were downloaded into /images/ and re-verified
  with VLM to be watermark-free and subject-matched:
  fuel = smiling uniformed attendant at pump (Texaco/Chevron, Pexels),
  carwash = workers pressure-washing cars, store = clerk at grocery POS
  counter, cashier = original (re-hosted locally), tire = mechanic
  loosening wheel lug nuts, team = three hi-vis workers, about-main =
  petrol-station forecourt at sunset. No image on the site depends on an
  external CDN anymore.

   If any image fails to load, js/main.js automatically swaps in
   FALLBACK_IMAGE (a branded placeholder), so the layout never breaks.
   ========================================================================== */

const IMAGES = [
  /* ----- Hero image-card slides (5) — client's own Saudi stations ----- */
  {
    key: "hero-1",
    src: "/images/station-go.png"
  },
  {
    key: "hero-2",
    src: "/images/station-liter.png"
  },
  {
    key: "hero-3",
    src: "/images/station-weal.png"
  },
  {
    key: "hero-4",
    src: "/images/station-enoc.png"
  },
  {
    key: "hero-5",
    src: "/images/station-jioil.png"
  },

  /* ----- About ----- */
  {
    key: "about-main",
    src: "/images/about-main.jpg"
  },
  {
    key: "about-team",
    src: "/images/station-forecourt.png"
  },

  /* ----- Service cards (6) — self-hosted in /images/ (Task 13) ----- */
  {
    key: "service-fuel",
    src: "/images/service-fuel.jpg"
  },
  {
    key: "service-carwash",
    src: "/images/service-carwash.jpg"
  },
  {
    key: "service-store",
    src: "/images/service-store.jpg"
  },
  {
    key: "service-cashier",
    src: "/images/service-cashier.jpg"
  },
  {
    key: "service-tire",
    src: "/images/service-tire.jpg"
  },
  {
    key: "service-team",
    src: "/images/service-team.jpg"
  }
];

/* Lookup map: key -> src */
const IMAGE_MAP = {};
IMAGES.forEach(function (img) { IMAGE_MAP[img.key] = img.src; });

/* Branded placeholder (light theme) shown whenever a remote image fails */
const FALLBACK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">' +
  '  <defs>' +
  '    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">' +
  '      <stop offset="0" stop-color="#F6F8FC"/>' +
  '      <stop offset="1" stop-color="#E8EEF7"/>' +
  '    </linearGradient>' +
  '  </defs>' +
  '  <rect width="1600" height="900" fill="url(#bg)"/>' +
  '  <g>' +
  '    <path d="M800 300 L813 332.6 L848 333.4 L821 355.4 L830.5 389 L800 369.6 L769.5 389 L779 355.4 L752 333.4 L787 332.6 Z" fill="#D4A017"/>' +
  '  </g>' +
  '  <text x="800" y="480" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="bold" fill="#0E1F3D" text-anchor="middle">Bengal Star</text>' +
  '  <text x="800" y="532" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#5C6A85" text-anchor="middle">Manpower for Petrol Stations</text>' +
  '</svg>';

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(FALLBACK_SVG);

/* Expose globals for main.js */
window.IMAGES = IMAGES;
window.IMAGE_MAP = IMAGE_MAP;
window.FALLBACK_IMAGE = FALLBACK_IMAGE;
