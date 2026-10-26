import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { SITE_URL } from "@/content";
import "./globals.css";

// Inter is the home page font; latin-ext covers the Romanian ă, ș, ț
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
// Geist is only used by the niche and welcome pages, so the home page doesn't preload it
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap", preload: false });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Glowlist — warm leads for B2B agencies",
  // The page still has placeholders: keep it out of search engines until launch
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
