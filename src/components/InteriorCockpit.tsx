"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import { Sliders, HeartPulse, Crosshair, Sparkles, CheckCircle2 } from "lucide-react";
import { useVideoScrubber } from "@/hooks/useVideoScrubber";

export default function InteriorCockpit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeHotspot, setActiveHotspot] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { seekToProgress, isReady, duration, videoProgress } =
    useVideoScrubber(videoRef);

  const data = siteConfig.interior;

  const featureIcons = [
    <Sliders key="1" size={18} className="text-[#FF5A1F]" />,
    <Crosshair key="2" size={18} className="text-[#FF5A1F]" />,
    <HeartPulse key="3" size={18} className="text-[#FF5A1F]" />,
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !pinWrapperRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2600",
        pin: pinWrapperRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.2,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Full video progression:
          // Maps progress 0.0 -> 0.93 strictly to video 0.0 -> 1.0 (start to finish).
          // Between 0.93 -> 1.00, the final frame is held firmly so the push-in video finishes
          // completely BEFORE releasing down to the next section!
          const vProg = Math.min(1, Math.max(0, p / 0.93));
          seekToProgress(vProg);

          // Dynamic hotspot activation based on camera distance pushing into cockpit
          if (vProg >= 0.66) {
            setActiveHotspot(2);
          } else if (vProg >= 0.33) {
            setActiveHotspot(1);
          } else {
            setActiveHotspot(0);
          }
        },
      });
    }, containerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [seekToProgress]);

  const isComplete = videoProgress >= 0.99;

  return (
    <section
      id="interior"
      ref={containerRef}
      className="relative w-full bg-[#F7F7F5] border-t border-[#E2E3E0]"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinWrapperRef}
        className="w-full min-h-screen flex flex-col justify-center py-10 px-6 lg:px-12 relative overflow-hidden"
      >
        <div className="max-w-7xl w-full mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E3E0] text-[11px] font-mono tracking-[0.25em] text-[#17191C] uppercase mb-3 shadow-luxury-sm">
                <Sparkles size={12} className="text-[#FF5A1F]" />
                <span>{data.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-[#17191C] font-display tracking-tight leading-tight">
                TACTILE ERGONOMICS AT <br />
                <span className="text-[#17191C]">
                  350+ <span className="text-[#FF5A1F]">KM/H</span>.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-[#686B70] leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Cockpit Interactive Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Visual Cockpit Stage Scrubbed by Scroll */}
            <div className="lg:col-span-7 relative">
              <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-[#D8D9D5] bg-[#0c0d10] shadow-luxury-stage">
                {/* Scroll-Scrubbed Front Push-In Cockpit Video Clip */}
                <video
                  ref={videoRef}
                  src={siteConfig.media.pushInVideo}
                  playsInline
                  muted
                  preload="auto"
                  className="w-full h-full object-cover scale-100 transition-transform duration-500 ease-out"
                />

                {/* Vignette Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 border border-white/10 rounded-3xl" />

                {/* Interactive Hotspot 1: Yoke Wheel */}
                <button
                  onClick={() => setActiveHotspot(0)}
                  className="group absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center cursor-pointer"
                  aria-label="Hotspot 1"
                >
                  <span
                    className={`absolute inline-flex rounded-full bg-[#FF5A1F] transition-all duration-300 ${
                      activeHotspot === 0
                        ? "h-10 w-10 opacity-75 animate-ping"
                        : "h-6 w-6 opacity-30"
                    }`}
                  />
                  <span
                    className={`relative inline-flex items-center justify-center rounded-full font-bold text-xs shadow-md transition-all duration-300 ${
                      activeHotspot === 0
                        ? "h-7 w-7 bg-[#FF5A1F] text-white scale-110 ring-2 ring-white"
                        : "h-6 w-6 bg-[#17191C]/80 text-white/90 border border-white/20"
                    }`}
                  >
                    1
                  </span>
                </button>

                {/* Interactive Hotspot 2: Chassis Seating */}
                <button
                  onClick={() => setActiveHotspot(1)}
                  className="group absolute top-[62%] left-[28%] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center cursor-pointer"
                  aria-label="Hotspot 2"
                >
                  <span
                    className={`absolute inline-flex rounded-full bg-[#FF5A1F] transition-all duration-300 ${
                      activeHotspot === 1
                        ? "h-10 w-10 opacity-75 animate-ping"
                        : "h-6 w-6 opacity-30"
                    }`}
                  />
                  <span
                    className={`relative inline-flex items-center justify-center rounded-full font-bold text-xs shadow-md transition-all duration-300 ${
                      activeHotspot === 1
                        ? "h-7 w-7 bg-[#FF5A1F] text-white scale-110 ring-2 ring-white"
                        : "h-6 w-6 bg-[#17191C]/80 text-white/90 border border-white/20"
                    }`}
                  >
                    2
                  </span>
                </button>

                {/* Interactive Hotspot 3: HUD Telemetry */}
                <button
                  onClick={() => setActiveHotspot(2)}
                  className="group absolute top-[35%] left-[62%] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center cursor-pointer"
                  aria-label="Hotspot 3"
                >
                  <span
                    className={`absolute inline-flex rounded-full bg-[#FF5A1F] transition-all duration-300 ${
                      activeHotspot === 2
                        ? "h-10 w-10 opacity-75 animate-ping"
                        : "h-6 w-6 opacity-30"
                    }`}
                  />
                  <span
                    className={`relative inline-flex items-center justify-center rounded-full font-bold text-xs shadow-md transition-all duration-300 ${
                      activeHotspot === 2
                        ? "h-7 w-7 bg-[#FF5A1F] text-white scale-110 ring-2 ring-white"
                        : "h-6 w-6 bg-[#17191C]/80 text-white/90 border border-white/20"
                    }`}
                  >
                    3
                  </span>
                </button>

                {/* Status pill overlay */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#17191C]/85 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-white/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
                  <span>COCKPIT PUSH-IN CAMERA TRAJECTORY</span>
                </div>

                {/* Bottom Scrub Progress Telemetry */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/90 px-1">
                    <span className="flex items-center gap-1.5">
                      {isComplete ? (
                        <>
                          <CheckCircle2 size={12} className="text-[#FF5A1F]" />
                          <span className="text-[#FF5A1F] font-bold">
                            COCKPIT ENTRY COMPLETE • SCROLL TO ADVANCE
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F] animate-ping" />
                          <span>SCROLL TO ADVANCE COCKPIT VIEW</span>
                        </>
                      )}
                    </span>
                    <span className="font-bold text-[#FF5A1F]">
                      {Math.round(videoProgress * 100)}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                      className="h-full bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.8)] transition-all duration-75 ease-out"
                      style={{ width: `${videoProgress * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Feature Cards in Pure White (Sync with Video Scrub) */}
            <div className="lg:col-span-5 space-y-3">
              {data.features.map((feature, idx) => {
                const isActive = activeHotspot === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveHotspot(idx)}
                    className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                      isActive
                        ? "bg-white border-[#FF5A1F] shadow-luxury-md translate-x-1"
                        : "bg-white/70 border-[#E2E3E0] hover:border-[#D1D3CE] hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isActive
                            ? "bg-[#FF5A1F]/10 border-[#FF5A1F]/40"
                            : "bg-[#F7F7F5] border-[#E2E3E0]"
                        }`}
                      >
                        {featureIcons[idx]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4
                            className={`text-sm sm:text-base font-bold uppercase font-display transition-colors ${
                              isActive ? "text-[#FF5A1F]" : "text-[#17191C]"
                            }`}
                          >
                            {feature.title}
                          </h4>
                          <span className="text-[10px] font-mono text-[#FF5A1F] font-bold">
                            HOTSPOT 0{idx + 1}
                          </span>
                        </div>
                        <p className="text-xs text-[#686B70] leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
