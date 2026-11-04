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

   Service-card images (Task 2-v1, 2025-10-28) are subject-exact stock
   photos sourced via z-ai image-search and individually VLM-verified
   to match each service (fuel attendant with nozzle-in-hand, worker in a
   car-wash bay, store clerk inside a minimart, cashier at a POS terminal,
   mechanic with an impact wrench on a wheel, forecourt supervisor).
   service-fuel was re-swapped in Task 6-v1 (2025-10-28) after the original
   Alamy preview turned out to carry a visible stock-photo watermark; the
   replacement is a watermark-free landscape photo of a gloved hand actively
   refueling a car with a Shell nozzle. service-carwash was also re-swapped
   in the same task for the same reason (DepositPhotos watermarks); replaced
   with a watermark-free Kärcher photo of a worker pressure-washing a car.
   The other 4 service images (store, cashier, tire, team) were VLM-spot-
   checked for watermarks and confirmed clean. The team image carries a
   small blog-title text overlay ("Gas Station Site Inspection Checklist")
   but has a perfect subject match and no better replacement was found.

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
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0615e75eef73.jpg"
  },
  {
    key: "about-team",
    src: "/images/station-forecourt.png"
  },

  /* ----- Service cards (6) ----- */
  /* service-fuel: swapped 2025-10-28 — old Alamy preview (e1e5f836f591.jpg)
     had a visible watermark; replaced with a watermark-free Carwow photo
     (1600x900, gloved hand holding Shell nozzle actively refueling a car),
     VLM-verified: no watermark + person visible + good Fuel Attendants match. */
  {
    key: "service-fuel",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/da06f87be78b.jpeg"
  },
  /* service-carwash: swapped 2025-10-28 (Task 6-v1) — old DepositPhotos
     preview (4f02f12ec86e.jpg) carried visible stock-photo watermarks;
     replaced with a watermark-free Kärcher photo (1504x627, worker in
     blue coveralls using a high-pressure washer to rinse soap suds off
     a silver Mercedes in a professional car wash bay), VLM-verified:
     no watermark + worker visible + good Car Wash & Detailing match. */
  {
    key: "service-carwash",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a32d25dd6111.jpg"
  },
  {
    key: "service-store",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/650986028231.jpg"
  },
  {
    key: "service-cashier",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f8c9bd26d4db.webp"
  },
  {
    key: "service-tire",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/753a24c834e4.png"
  },
  {
    key: "service-team",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/21aac739a55a.png"
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
