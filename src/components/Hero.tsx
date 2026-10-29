"use client";

import React, { useRef } from "react";
import { siteConfig } from "@/config/site";
import MagneticButton from "./MagneticButton";
import VideoCanvas from "./VideoCanvas";
import { ChevronDown, Activity, Sparkles, Gauge } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface HeroProps {
  onOpenReserve?: () => void;
  onExplore?: () => void;
}

export default function Hero({ onOpenReserve, onExplore }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();

  const handleExploreClick = () => {
    if (onExplore) {
      onExplore();
    } else {
      const showcase = document.getElementById("showcase");
      if (showcase) {
        showcase.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-16 px-6 lg:px-12 overflow-hidden bg-[#F7F7F5]"
    >
      {/* Soft warm ambient light glow behind stage */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] rounded-full bg-[#FF5A1F]/[0.08] blur-[150px] will-change-transform"
        style={{
          transform: `translate3d(calc(-50% + ${mouse.normalizedX * 25}px), calc(-50% + ${
            mouse.normalizedY * 25
          }px), 0)`,
        }}
      />

      {/* Top Hero Editorial Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Luxury Telemetry Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#E2E3E0] text-[11px] font-mono tracking-[0.25em] text-[#17191C] uppercase mb-8 shadow-luxury-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
          <span>AERODYNAMIC MONOCOQUE // SPEC {siteConfig.brand.year}</span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#17191C] font-display leading-[0.94] mb-6">
          ENGINEERED <br />
          <span className="text-[#17191C]">
            FOR <span className="text-[#FF5A1F]">SPEED</span>.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="max-w-2xl text-base sm:text-lg text-[#686B70] leading-relaxed mb-10 font-normal">
          {siteConfig.brand.subheadline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <MagneticButton
            variant="primary"
            size="lg"
            onClick={handleExploreClick}
            className="text-xs sm:text-sm tracking-widest shadow-[0_8px_24px_-4px_rgba(255,90,31,0.38)]"
          >
            <span>{siteConfig.brand.exploreCta}</span>
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            size="lg"
            onClick={onOpenReserve}
            className="text-xs sm:text-sm tracking-widest"
          >
            <span>{siteConfig.brand.reserveCta}</span>
          </MagneticButton>
        </div>
      </div>

      {/* Framed Hypercar Video Stage (75–85% width, luxury pedestal framing, realistic soft shadow) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-14 perspective-1000">
        {/* Realistic studio floor contact shadow beneath the stage */}
        <div
          className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-14 rounded-[100%] studio-shadow blur-xl will-change-transform"
          style={{
            transform: `translate3d(calc(-50% + ${mouse.normalizedX * 15}px), 0, 0)`,
          }}
        />

        <div
          className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D8D9D5] bg-[#0c0d10] shadow-luxury-stage transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `rotateX(${-mouse.normalizedY * 3.5}deg) rotateY(${
              mouse.normalizedX * 4.5
            }deg)`,
          }}
        >
          {/* Immediate High-Resolution Car Image (Guaranteed first paint visibility) */}
          <img
            src="/frames/desktop/frame-0001.webp"
            alt="VELOCE Hypercar 360 Orbit"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-0"
            loading="eager"
          />

          {/* Framed Canvas Rendering 360 Orbit Footage */}
          <VideoCanvas progress={0} className="w-full h-full relative z-10" />

          {/* Minimal Luxury Corner Overlays */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#17191C]/80 backdrop-blur-md border border-white/10 text-[10px] tracking-widest font-mono text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
            <span>360° DYNAMIC ORBIT</span>
          </div>

          <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#17191C]/80 backdrop-blur-md border border-white/10 text-[10px] tracking-widest font-mono text-white/90">
            <span>1,200 HP • 350+ KM/H</span>
          </div>

          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#17191C]/80 backdrop-blur-md border border-white/10 text-[10px] tracking-widest font-mono text-[#FF5A1F]">
            <Gauge size={12} />
            <span>STANDBY READY</span>
          </div>

          <div className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#17191C]/80 backdrop-blur-md border border-white/10 text-[10px] tracking-widest font-mono text-white/70">
            <span>SCROLL-DRIVEN 3D KINEMATICS</span>
          </div>

          {/* Subtle rim border */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/10" />
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 mt-12 flex flex-col items-center justify-center gap-2 text-center text-[#686B70]">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#686B70]">
          Scroll to Experience 3D Kinematics
        </span>
        <button
          onClick={handleExploreClick}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#E2E3E0] text-[#17191C] hover:border-[#FF5A1F] hover:text-[#FF5A1F] shadow-luxury-sm transition-all"
          aria-label="Scroll to showcase"
        >
          <ChevronDown size={16} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
