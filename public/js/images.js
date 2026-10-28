/* ============================================================================
   Bangla Star Co., Ltd — Image manager
   ----------------------------------------------------------------------------
   ALL site images live in the single IMAGES array below so they are easy to
   replace. Each entry has:
     key  -> referenced from HTML via <img data-img="key">
     src  -> the image URL

   Hero & about images use Unsplash with the recommended params
   (?auto=format&fit=crop&w=1600&q=70). Service cards use a smaller width
   (w=800) for faster loading.

   NOTE: two hero images (petrol station at night, car wash) are hosted on a
   fast external CDN and were chosen for exact subject relevance — you can
   swap them for your own Unsplash URLs at any time by editing this file.

   If any image fails to load, js/main.js automatically swaps in
   FALLBACK_IMAGE (a branded placeholder), so the layout never breaks.
   ========================================================================== */

const IMAGES = [
  /* ----- Hero slides (5) ----- */
  {
    key: "hero-1",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a0ebd516ea97.jpeg"
  },
  {
    key: "hero-2",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2e4310b76464.jpeg"
  },
  {
    key: "hero-3",
    src: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1600&q=70"
  },
  {
    key: "hero-4",
    src: "https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1600&q=70"
  },
  {
    key: "hero-5",
    src: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1600&q=70"
  },

  /* ----- About ----- */
  {
    key: "about",
    src: "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=1600&q=70"
  },

  /* ----- Service cards (6) ----- */
  {
    key: "service-fuel",
    src: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=70"
  },
  {
    key: "service-carwash",
    src: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2e4310b76464.jpeg"
  },
  {
    key: "service-store",
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=70"
  },
  {
    key: "service-cashier",
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=70"
  },
  {
    key: "service-tire",
    src: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=70"
  },
  {
    key: "service-team",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=70"
  }
];

/* Lookup map: key -> src */
const IMAGE_MAP = {};
IMAGES.forEach(function (img) { IMAGE_MAP[img.key] = img.src; });

/* Branded placeholder shown whenever a remote image fails to load */
const FALLBACK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">' +
  '  <defs>' +
  '    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">' +
  '      <stop offset="0" stop-color="#123B77"/>' +
  '      <stop offset="1" stop-color="#061B40"/>' +
  '    </linearGradient>' +
  '  </defs>' +
  '  <rect width="1600" height="900" fill="url(#bg)"/>' +
  '  <g>' +
  '    <path d="M800 300 L813 332.6 L848 333.4 L821 355.4 L830.5 389 L800 369.6 L769.5 389 L779 355.4 L752 333.4 L787 332.6 Z" fill="#D4A017"/>' +
  '  </g>' +
  '  <text x="800" y="480" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="bold" fill="#D4A017" text-anchor="middle">Bangla Star</text>' +
  '  <text x="800" y="532" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#8FA6C9" text-anchor="middle">Manpower for Petrol Stations</text>' +
  '</svg>';

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(FALLBACK_SVG);

/* Expose globals for main.js */
window.IMAGES = IMAGES;
window.IMAGE_MAP = IMAGE_MAP;
window.FALLBACK_IMAGE = FALLBACK_IMAGE;
