"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import { Compass, Wind, Layers, Sparkles, CheckCircle2, ChevronDown } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useVideoScrubber } from "@/hooks/useVideoScrubber";

export default function DesignCraft() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mouse = useMousePosition();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);

  const { seekToProgress, isReady, duration, videoProgress } =
    useVideoScrubber(videoRef);

  const story = siteConfig.designStory;

  const craftIcons = [
    <Layers key="1" size={18} className="text-[#FF5A1F]" />,
    <Wind key="2" size={18} className="text-[#FF5A1F]" />,
    <Compass key="3" size={18} className="text-[#FF5A1F]" />,
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !pinWrapperRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2200",
        pin: pinWrapperRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.2,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Full video progression:
          // Maps scroll progress 0.0 -> 0.93 strictly to video 0.0 -> 1.0 (start to finish).
          // Between 0.93 -> 1.00, the final frame is held firmly so the entire video finishes
          // completely BEFORE the pinned section releases to the next section!
          const vProg = Math.min(1, Math.max(0, p / 0.93));
          seekToProgress(vProg);

          // Highlight synchronization
          if (vProg >= 0.66) {
            setActiveHighlightIndex(2);
          } else if (vProg >= 0.33) {
            setActiveHighlightIndex(1);
          } else {
            setActiveHighlightIndex(0);
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
      id="design"
      ref={containerRef}
      className="relative w-full bg-[#F7F7F5] border-t border-[#E2E3E0]"
    >
      {/* Pinned Viewport Stage */}
      <div
        ref={pinWrapperRef}
        className="w-full min-h-screen flex items-center justify-center py-12 px-6 lg:px-12 relative overflow-hidden"
      >
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Asymmetric Editorial Storytelling & Line Reveals */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E3E0] text-[11px] font-mono tracking-[0.25em] text-[#17191C] uppercase mb-4 w-fit shadow-luxury-sm">
                <Sparkles size={12} className="text-[#FF5A1F]" />
                <span>{story.badge}</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#17191C] font-display tracking-tight mb-6 leading-[1.05]">
                FORM FOLLOWING PHYSICS, <br />
                <span className="text-[#17191C]">
                  CRAFTED IN <span className="text-[#FF5A1F]">CARBON</span>.
                </span>
              </h2>

              {/* Story Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-[#686B70] leading-relaxed mb-8">
                {story.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="border-l-2 border-[#E2E3E0] pl-4 hover:border-[#FF5A1F] transition-colors"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* 3 Craft Highlights Cards (Sync with Video Timeline) */}
              <div className="space-y-3">
                {story.highlights.map((item, idx) => {
                  const isActive = activeHighlightIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveHighlightIndex(idx)}
                      className={`group p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-white border-[#FF5A1F] shadow-luxury-md translate-x-1"
                          : "bg-white/60 border-[#E2E3E0] hover:bg-white hover:border-[#D1D3CE]"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-2 rounded-xl border transition-colors ${
                            isActive
                              ? "bg-[#FF5A1F]/10 border-[#FF5A1F]/40"
                              : "bg-[#F7F7F5] border-[#E2E3E0]"
                          }`}
                        >
                          {craftIcons[idx % craftIcons.length]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4
                              className={`text-xs sm:text-sm font-bold uppercase tracking-wider font-display transition-colors ${
                                isActive ? "text-[#FF5A1F]" : "text-[#17191C]"
                              }`}
                            >
                              {item.title}
                            </h4>
                            <span className="text-[10px] font-mono text-[#686B70]">
                              PHASE 0{idx + 1}
                            </span>
                          </div>
                          <p className="text-xs text-[#686B70] mt-1 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Parallax Pinned Video Window Scrubbed by Scroll */}
            <div className="lg:col-span-6 relative perspective-1000">
              {/* Floor shadow */}
              <div
                className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-14 rounded-[100%] studio-shadow blur-xl will-change-transform"
                style={{
                  transform: `translate3d(calc(-50% + ${mouse.normalizedX * 10}px), 0, 0)`,
                }}
              />

              <div
                className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[#D8D9D5] shadow-luxury-stage bg-[#0c0d10] transition-transform duration-300 ease-out will-change-transform"
                style={{
                  transform: `rotateX(${-mouse.normalizedY * 2.5}deg) rotateY(${
                    mouse.normalizedX * 3.5
                  }deg)`,
                }}
              >
                {/* Scroll-Scrubbed Side-Tracking Video */}
                <video
                  ref={videoRef}
                  src={siteConfig.media.trackingVideo}
                  playsInline
                  muted
                  preload="auto"
                  className="w-full h-full object-cover scale-100 transition-transform duration-500 ease-out"
                />

                {/* Minimal Studio HUD Overlays */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#17191C]/85 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-white/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
                  <span>SIDE-PROFILE TRACKING SIMULATION</span>
                </div>

                <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#17191C]/85 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-[#FF5A1F]">
                  <span>AERO DOWNFORCE: 850 KG</span>
                </div>

                {/* Bottom Scrub Progress Telemetry */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/90 px-1">
                    <span className="flex items-center gap-1.5">
                      {isComplete ? (
                        <>
                          <CheckCircle2 size={12} className="text-[#FF5A1F]" />
                          <span className="text-[#FF5A1F] font-bold">
                            SEQUENCE COMPLETE • SCROLL TO ADVANCE
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F] animate-ping" />
                          <span>SCROLL TO ADVANCE VIDEO SEQUENCE</span>
                        </>
                      )}
                    </span>
                    <span className="font-bold text-[#FF5A1F]">
                      {Math.round(videoProgress * 100)}%
                    </span>
                  </div>

                  {/* High precision orange scrub bar */}
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                      className="h-full bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.8)] transition-all duration-75 ease-out"
                      style={{ width: `${videoProgress * 100}%` }}
                    />
                  </div>
                </div>

                {/* Gradient Vignette for Depth */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 border border-white/10 rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
