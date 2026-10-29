import type { Metadata, Viewport } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import SmoothScroll from "@/components/SmoothScroll";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${siteConfig.brand.name} | ${siteConfig.brand.tagline}`,
  description: siteConfig.brand.subheadline,
  keywords: [
    "hypercar",
    "VELOCE",
    "luxury automotive",
    "carbon fiber monocoque",
    "twin-turbo V8",
    "active aerodynamics",
    "high performance",
  ],
  authors: [{ name: "VELOCE Automobili" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F7F7F5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable}`}>
      <body className="bg-[#F7F7F5] text-[#17191C] antialiased selection:bg-[#FF5A1F] selection:text-white">
        {/* Smooth scroll wrapper with Lenis + GSAP ScrollTrigger */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
