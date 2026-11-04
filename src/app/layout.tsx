import type { Metadata } from "next";
import { Sora, Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Bengal Star Limited Company | Manpower Supply for Petrol Stations in Saudi Arabia",
  description:
    "Bengal Star Limited Company supplies trained, fully-documented workers to petrol stations across Saudi Arabia — fuel attendants, car wash staff, bakala/store workers, cashiers, tire & oil change technicians, supervisors and cleaners. 72-hour replacement guarantee.",
  keywords: [
    "manpower supply Saudi Arabia",
    "petrol station workers",
    "fuel attendants KSA",
    "station staffing",
    "car wash staff",
    "bakala staff",
    "cashiers",
    "Riyadh",
    "Jeddah",
    "Dammam",
  ],
  authors: [{ name: "Bengal Star Limited Company" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Bengal Star Limited Company",
    description:
      "Trained, verified workers for every corner of your station — with a 72-hour replacement guarantee and 24/7 bilingual support.",
    siteName: "Bengal Star Limited Company",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${inter.variable} ${tajawal.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
