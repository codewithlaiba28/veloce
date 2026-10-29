"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import { Disc, Gauge, Flame, Cpu, Sparkles, CheckCircle2 } from "lucide-react";
import { useVideoScrubber } from "@/hooks/useVideoScrubber";

export default function WheelsEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeTab, setActiveTab] = useState<"engine" | "wheels">("engine");
  const [scrollProgress, setScrollProgress] = useState(0);

  const { seekToProgress, isReady, duration, videoProgress } =
    useVideoScrubber(videoRef);

  const data = siteConfig.wheelsAndEngine;

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
          // Between 0.93 -> 1.00, the final frame is held firmly so the full video finishes
          // completely BEFORE the pinned stage releases to the next section!
          const vProg = Math.min(1, Math.max(0, p / 0.93));
          seekToProgress(vProg);

          // Auto tab toggle based on scroll progress
          if (vProg >= 0.5) {
            setActiveTab("wheels");
          } else {
            setActiveTab("engine");
          }
        },
      });
    }, containerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [seekToProgress]);

  // Dynamic telemetry calculations linked to burnout scrub progress
  const currentRPM = Math.round(1200 + videoProgress * 7300); // 1,200 -> 8,500 RPM
  const tireTemp = Math.round(28 + videoProgress * 76); // 28°C -> 104°C
  const boostPressure = (0.2 + videoProgress * 1.65).toFixed(2); // 0.20 -> 1.85 BAR

  const isComplete = videoProgress >= 0.99;

  return (
    <section
      id="engineering"
      ref={containerRef}
      className="relative w-full bg-[#ECEDEA] border-t border-[#E2E3E0]"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinWrapperRef}
        className="w-full min-h-screen flex flex-col justify-center items-center py-10 px-6 lg:px-12 relative overflow-hidden"
      >
        <div className="max-w-7xl w-full mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E3E0] text-[11px] font-mono tracking-[0.25em] text-[#17191C] uppercase mb-3 shadow-luxury-sm">
              <Flame size={13} className="text-[#FF5A1F]" />
              <span>{data.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#17191C] font-display tracking-tight mb-4 leading-tight">
              POWERTRAIN MASTERY & <br />
              <span className="text-[#17191C]">
                UNSPRUNG <span className="text-[#FF5A1F]">MASS</span>.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#686B70] leading-relaxed max-w-2xl mx-auto">
              {data.subheadline}
            </p>

            {/* Luxury Light Tab Switcher */}
            <div className="mt-6 inline-flex p-1 rounded-full bg-white border border-[#E2E3E0] shadow-luxury-sm">
              <button
                onClick={() => setActiveTab("engine")}
                className={`px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeTab === "engine"
                    ? "bg-[#17191C] text-white font-bold shadow-md"
                    : "text-[#686B70] hover:text-[#17191C]"
                }`}
              >
                Twin-Turbo V8 Engine
              </button>
              <button
                onClick={() => setActiveTab("wheels")}
                className={`px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeTab === "wheels"
                    ? "bg-[#17191C] text-white font-bold shadow-md"
                    : "text-[#686B70] hover:text-[#17191C]"
                }`}
              >
                Forged Wheels & Brakes
              </button>
            </div>
          </div>

          {/* Full-Width Video Stage with Pedestal Shadow */}
          <div className="relative w-full aspect-[21/9] min-h-[360px] sm:min-h-[420px] rounded-3xl overflow-hidden border border-[#D8D9D5] bg-[#0c0d10] shadow-luxury-stage">
            {/* Scroll-Scrubbed Wheel Burnout Video Footage */}
            <video
              ref={videoRef}
              src={siteConfig.media.wheelBurnoutVideo}
              playsInline
              muted
              preload="auto"
              className="w-full h-full object-cover scale-100 transition-transform duration-500 ease-out"
            />

            {/* Vignette and Gradient Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

            {/* Overlay Content Based on Active Tab & Live Telemetry */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between z-10 text-white">
              {/* Top HUD Telemetry */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#17191C]/85 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-[#FF5A1F]">
                  <Cpu size={12} />
                  <span>
                    {activeTab === "engine"
                      ? "POWERTRAIN MATRIX // 4.0L TWIN-TURBO"
                      : "UNSPRUNG GEOMETRY // ROTATING MASS"}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-white/90">
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
                    RPM: <strong className="text-[#FF5A1F]">{currentRPM}</strong>
                  </span>
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
                    TIRE TEMP: <strong className="text-[#FF5A1F]">{tireTemp}°C</strong>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
                    BOOST: <strong className="text-[#FF5A1F]">{boostPressure} BAR</strong>
                  </span>
                </div>
              </div>

              {/* Bottom Technical Grid */}
              <div className="max-w-2xl">
                {activeTab === "engine" ? (
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black font-display uppercase mb-3 text-white">
                      4.0L Twin-Turbocharged Flat-Plane V8
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {data.engineDetails.map((detail, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10"
                        >
                          <span className="block text-[9px] font-mono tracking-wider text-white/60 uppercase">
                            {detail.label}
                          </span>
                          <span className="block text-xs sm:text-sm font-bold font-display text-[#FF5A1F] mt-0.5">
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black font-display uppercase mb-3 text-white">
                      Center-Lock Forged Monolithic Wheels
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                        <span className="block text-[9px] font-mono tracking-wider text-white/60 uppercase">
                          Front Wheels
                        </span>
                        <span className="block text-xs sm:text-sm font-bold font-display text-[#FF5A1F] mt-0.5">
                          20" x 10.5J
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                        <span className="block text-[9px] font-mono tracking-wider text-white/60 uppercase">
                          Rear Wheels
                        </span>
                        <span className="block text-xs sm:text-sm font-bold font-display text-[#FF5A1F] mt-0.5">
                          21" x 13.0J
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                        <span className="block text-[9px] font-mono tracking-wider text-white/60 uppercase">
                          Tire Spec
                        </span>
                        <span className="block text-xs sm:text-sm font-bold font-display text-[#FF5A1F] mt-0.5">
                          Cup 2R Custom
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                        <span className="block text-[9px] font-mono tracking-wider text-white/60 uppercase">
                          Calipers
                        </span>
                        <span className="block text-xs sm:text-sm font-bold font-display text-[#FF5A1F] mt-0.5">
                          6-Piston Ti
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Scrub Progress Telemetry */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-white/90">
                  <span className="flex items-center gap-1.5">
                    {isComplete ? (
                      <>
                        <CheckCircle2 size={12} className="text-[#FF5A1F]" />
                        <span className="text-[#FF5A1F] font-bold">
                          BURNOUT SEQUENCE COMPLETE • SCROLL TO ADVANCE
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F] animate-ping" />
                        <span>SCROLL TO ADVANCE BURNOUT TELEMETRY</span>
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
        </div>
      </div>
    </section>
  );
}
