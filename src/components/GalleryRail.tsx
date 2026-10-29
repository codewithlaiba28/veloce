"use client";

import React, { useRef } from "react";
import { siteConfig } from "@/config/site";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryRail() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const items = siteConfig.gallery;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -460 : 460;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="gallery"
      className="relative w-full bg-[#ECEDEA] py-32 px-6 lg:px-12 border-t border-[#E2E3E0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E3E0] text-[11px] font-mono tracking-[0.25em] text-[#17191C] uppercase mb-4 shadow-luxury-sm">
              <Sparkles size={12} className="text-[#FF5A1F]" />
              <span>THE VISUAL ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-[#17191C] font-display tracking-tight">
              AERODYNAMICS <br />
              <span className="text-[#17191C]">
                IN MOTION<span className="text-[#FF5A1F]">.</span>
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-[#E2E3E0] text-[#17191C] hover:border-[#FF5A1F] hover:text-[#FF5A1F] shadow-luxury-sm transition-all"
              aria-label="Scroll gallery left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-[#E2E3E0] text-[#17191C] hover:border-[#FF5A1F] hover:text-[#FF5A1F] shadow-luxury-sm transition-all"
              aria-label="Scroll gallery right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Rail of 3D Tilt Pure White Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-10 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="group relative flex-shrink-0 w-[320px] sm:w-[420px] h-[480px] rounded-3xl overflow-hidden border border-[#E2E3E0] hover:border-[#FF5A1F]/60 bg-white transition-all duration-500 shadow-luxury-md hover:shadow-luxury-lg snap-start cursor-pointer preserve-3d"
            >
              {/* Media Container */}
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0c0d10]">
                {item.videoSrc ? (
                  <video
                    src={item.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover scale-100 group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-[#17191C] flex items-center justify-center">
                    <span className="text-xs font-mono text-white/60">MEDIA ARCHIVE</span>
                  </div>
                )}

                {/* Gradients for typography legibility */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
              </div>

              {/* Card Overlays */}
              <div className="relative z-10 w-full h-full p-6 sm:p-7 flex flex-col justify-between text-white">
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono tracking-widest text-[#17191C] uppercase font-bold shadow-sm">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-white/80">
                    0{idx + 1} // 0{items.length}
                  </span>
                </div>

                {/* Bottom Content */}
                <div>
                  <h3 className="text-2xl font-bold font-display uppercase group-hover:text-[#FF5A1F] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#FF5A1F] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F] animate-ping" />
                    <span>CINEMATIC ARCHIVE // ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Subtle orange accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF5A1F] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
