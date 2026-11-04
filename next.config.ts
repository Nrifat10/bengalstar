import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel-friendly: no standalone output (Vercel uses its own Next.js runtime) */
  typescript: {
    /* Type-checks are clean (tsc --noEmit passes). Fail the build on type
       errors so problems surface at build time, not in production. */
    ignoreBuildErrors: false,
  },
  reactStrictMode: false,
};

export default nextConfig;
