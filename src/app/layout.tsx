import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bangla Star Co., Ltd | Manpower Supply for Petrol Stations in Saudi Arabia",
  description: "Trained, verified workers for petrol stations across Saudi Arabia — fuel attendants, car wash, bakala/store staff, cashiers, tire & oil change, supervisors and cleaners.",
  keywords: ["manpower supply", "petrol station workers", "Saudi Arabia", "fuel attendants", "KSA staffing"],
  authors: [{ name: "Bangla Star Co., Ltd" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Bangla Star Co., Ltd",
    description: "Manpower supply for petrol stations in Saudi Arabia",
    siteName: "Bangla Star Co., Ltd",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
