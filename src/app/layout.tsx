import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Marcellus, Mulish } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { BottomNav } from "@/components/BottomNav";
import { SiteHeader } from "@/components/SiteHeader";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const serif = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE.title,
  description: `${SITE.subtitle} — ${SITE.date} · ${SITE.venue}, ${SITE.city}. A premium Safari-themed baby shower celebrating Nokulunga.`,
  openGraph: {
    title: SITE.title,
    description: SITE.subtitle,
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#6b8757",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body className="grain min-h-screen bg-ivory-radial font-sans antialiased">
        <SiteHeader />
        <main className="relative z-[2] pb-28 pt-4">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
