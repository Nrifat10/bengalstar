/* ============================================================================
   Bangla Star Co., Ltd — Image manager
   ----------------------------------------------------------------------------
   ALL site images live in the single IMAGES array below so they are easy to
   replace. Each entry has:
     key  -> referenced from HTML via <img data-img="key">
     src  -> the image URL

   Hero + about images are real / concept petrol stations from Saudi Arabia
   and the Gulf (Aldrees, WATAN, Petromin, Oxygen, Fuel Way), hosted on a fast
   external CDN. Service-card images (Task 2-v1, 2025-10-28) are subject-exact
   stock photos sourced via z-ai image-search and individually VLM-verified
   to match each service (fuel attendant with nozzle-in-hand, worker in a
   car-wash bay, store clerk inside a minimart, cashier at a POS terminal,
   mechanic with an impact wrench on a wheel, forecourt supervisor).
   All 6 service images return a YES verdict from glm-5v-turbo vision.

   If any image fails to load, js/main.js automatically swaps in
   FALLBACK_IMAGE (a branded placeholder), so the layout never breaks.
   ========================================================================== */

const IMAGES = [
  /* ----- Hero image-card slides (4) — Saudi stations ----- */
  {
    key: "hero-1",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8e7d7915dbb5.jpg"
  },
  {
    key: "hero-2",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f5e6ac590faf.jpg"
  },
  {
    key: "hero-3",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/dfd19ba8a000.jpg"
  },
  {
    key: "hero-4",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8337db80054a.jpeg"
  },

  /* ----- About ----- */
  {
    key: "about-main",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0615e75eef73.jpg"
  },
  {
    key: "about-team",
    src: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&q=70"
  },

  /* ----- Service cards (6) ----- */
  {
    key: "service-fuel",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e1e5f836f591.jpg"
  },
  {
    key: "service-carwash",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4f02f12ec86e.jpg"
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
  '  <text x="800" y="480" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="bold" fill="#0E1F3D" text-anchor="middle">Bangla Star</text>' +
  '  <text x="800" y="532" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#5C6A85" text-anchor="middle">Manpower for Petrol Stations</text>' +
  '</svg>';

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(FALLBACK_SVG);

/* Expose globals for main.js */
window.IMAGES = IMAGES;
window.IMAGE_MAP = IMAGE_MAP;
window.FALLBACK_IMAGE = FALLBACK_IMAGE;
