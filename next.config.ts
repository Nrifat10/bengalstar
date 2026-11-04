import type { NextConfig } from "next";

const securityHeaders = [
  // Clickjacking — prevent the site from being framed/embedded.
  { key: "X-Frame-Options", value: "DENY" },
  // MIME sniffing — stop browsers from guessing content types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer — only send origin to cross-origin, full URL to same-origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Permissions — this site needs no device APIs.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // HSTS — force HTTPS for 2 years (Vercel serves over HTTPS).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // X-DNS-Prefetch-Control — avoid leaking the origin to DNS prefetch.
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig: NextConfig = {
  /* Vercel-friendly: no standalone output (Vercel uses its own Next.js runtime) */
  typescript: {
    /* Type-checks are clean (tsc --noEmit passes). Fail the build on type
       errors so problems surface at build time, not in production. */
    ignoreBuildErrors: false,
  },
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
