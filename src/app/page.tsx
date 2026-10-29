"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoShowcase from "@/components/VideoShowcase";
import PerformanceSpecs from "@/components/PerformanceSpecs";
import DesignCraft from "@/components/DesignCraft";
import WheelsEngine from "@/components/WheelsEngine";
import InteriorCockpit from "@/components/InteriorCockpit";
import GalleryRail from "@/components/GalleryRail";
import ModelsPricing from "@/components/ModelsPricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ReserveModal from "@/components/ReserveModal";
import LoadingScreen from "@/components/LoadingScreen";
import { TrimModel } from "@/config/site";

export default function HomePage() {
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [selectedTrim, setSelectedTrim] = useState<TrimModel | null>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Global scroll progress listener for the side indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(
          100,
          Math.max(0, Math.round((window.scrollY / totalHeight) * 100))
        );
        setScrollPercentage(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenReserve = (trim?: TrimModel) => {
    if (trim) {
      setSelectedTrim(trim);
    }
    setIsReserveOpen(true);
  };

  const handleCloseReserve = () => {
    setIsReserveOpen(false);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#F7F7F5] text-[#17191C]">
      {/* Initial Luxury Loading Screen */}
      <LoadingScreen />

      {/* Global Sticky Transparent Navbar */}
      <Navbar onOpenReserve={() => handleOpenReserve()} />

      {/* Side Scroll Progress Indicator (Desktop) */}
      <aside
        aria-label="Scroll progress"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] font-mono tracking-widest text-[#686B70] writing-vertical transform -rotate-90 origin-center mb-4">
          PROGRESS
        </span>
        <div className="h-28 w-[2px] bg-[#E2E3E0] rounded-full overflow-hidden relative">
          <div
            className="w-full bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.5)] transition-all duration-150 ease-out"
            style={{ height: `${scrollPercentage}%` }}
          />
        </div>
        <span className="text-[9px] font-mono text-[#FF5A1F] mt-1 font-bold">
          {scrollPercentage}%
        </span>
      </aside>

      {/* 1. HERO SECTION */}
      <Hero
        onOpenReserve={() => handleOpenReserve()}
        onExplore={() => {
          const el = document.getElementById("showcase");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 2. 3D VIDEO SHOWCASE (PINNED ~800VH) */}
      <VideoShowcase />

      {/* 3. PERFORMANCE SPECS (PINNED WITH COUNT-UP NUMBERS) */}
      <PerformanceSpecs />

      {/* 4. DESIGN & CRAFT (TWO-COLUMN STORYTELLING) */}
      <DesignCraft />

      {/* 5. WHEELS & ENGINE (FULL WIDTH VIDEO BREAKDOWN) */}
      <WheelsEngine />

      {/* 6. INTERIOR (COCKPIT WIPE REVEAL & 3 FEATURES) */}
      <InteriorCockpit />

      {/* 7. GALLERY (HORIZONTAL SCROLL 3D TILT CARDS) */}
      <GalleryRail />

      {/* 8. MODELS / PRICING (3 BESPOKE TRIMS) */}
      <ModelsPricing onSelectTrim={(trim) => handleOpenReserve(trim)} />

      {/* 9. FINAL CTA (DRIVE THE FUTURE) */}
      <FinalCTA onOpenReserve={() => handleOpenReserve()} />

      {/* 10. GLOBAL FOOTER */}
      <Footer />

      {/* Luxury Reservation Modal */}
      <ReserveModal
        isOpen={isReserveOpen}
        onClose={handleCloseReserve}
        initialTrim={selectedTrim}
      />
    </main>
  );
}
