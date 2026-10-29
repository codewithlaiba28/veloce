"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import MagneticButton from "./MagneticButton";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useVideoScrubber } from "@/hooks/useVideoScrubber";

interface FinalCTAProps {
  onOpenReserve?: () => void;
}

export default function FinalCTA({ onOpenReserve }: FinalCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mouse = useMousePosition();

  const [scrollProgress, setScrollProgress] = useState(0);

  const { seekToProgress, isReady, duration, videoProgress } =
    useVideoScrubber(videoRef);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !pinWrapperRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000",
        pin: pinWrapperRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.2,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Full video progression:
          // Maps progress 0.0 -> 0.92 strictly to video 0.0 -> 1.0 (start to finish).
          // Between 0.92 -> 1.00, the final frame is held firmly so the drive-away video finishes
          // completely BEFORE the section releases!
          const vProg = Math.min(1, Math.max(0, p / 0.92));
          seekToProgress(vProg);
        },
      });
    }, containerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [seekToProgress]);

  const isComplete = videoProgress >= 0.99;

  return (
    <section
      id="cta"
      ref={containerRef}
      className="relative w-full bg-[#F7F7F5] border-t border-[#E2E3E0]"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinWrapperRef}
        className="w-full min-h-screen flex flex-col justify-center items-center py-12 px-6 lg:px-12 relative overflow-hidden"
      >
        {/* Background ambient warm light glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#FF5A1F]/[0.08] blur-[160px] will-change-transform"
          style={{
            transform: `translate3d(calc(-50% + ${mouse.normalizedX * 25}px), calc(-50% + ${
              mouse.normalizedY * 25
            }px), 0)`,
          }}
        />

        <div className="relative z-10 max-w-5xl w-full mx-auto text-center flex flex-col items-center">
          {/* Telemetry pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E3E0] text-[11px] font-mono tracking-[0.25em] text-[#17191C] uppercase mb-6 shadow-luxury-sm">
            <Sparkles size={12} className="text-[#FF5A1F]" />
            <span>PRODUCTION COMMENCING 2026 // ALLOCATIONS OPEN</span>
          </div>

          {/* Large Headline: DRIVE THE FUTURE. */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#17191C] font-display leading-[0.95] mb-6">
            DRIVE THE <br />
            <span className="text-[#17191C]">
              FUTURE<span className="text-[#FF5A1F]">.</span>
            </span>
          </h2>

          <p className="max-w-xl text-xs sm:text-base text-[#686B70] leading-relaxed mb-8 font-normal">
            The window for chassis allocation is strictly by confidential consultation.
            Secure your priority manufacturing slot with an authorized factory representative.
          </p>

          {/* Scroll-Scrubbed Car Video Stage (Clip6 Top-down drive away) */}
          <div className="relative w-full max-w-lg sm:max-w-xl aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D8D9D5] shadow-luxury-stage bg-[#0c0d10] mb-8">
            <video
              ref={videoRef}
              src={siteConfig.media.driveAwayVideo}
              playsInline
              muted
              preload="auto"
              className="w-full h-full object-cover scale-100 transition-transform duration-500 ease-out"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

            <div className="absolute top-3 left-4 text-[10px] font-mono tracking-widest text-[#FF5A1F]">
              VELOCE 001 // DRIVE AWAY LAUNCH SEQUENCE
            </div>

            {/* Bottom Scrub Progress Telemetry */}
            <div className="absolute bottom-3 left-4 right-4 z-20 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-white/90 px-1">
                <span className="flex items-center gap-1.5">
                  {isComplete ? (
                    <>
                      <CheckCircle2 size={12} className="text-[#FF5A1F]" />
                      <span className="text-[#FF5A1F] font-bold">
                        LAUNCH COMPLETE • READY FOR ALLOCATION
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F] animate-ping" />
                      <span>SCROLL TO ADVANCE LAUNCH SEQUENCE</span>
                    </>
                  )}
                </span>
                <span className="font-bold text-[#FF5A1F]">
                  {Math.round(videoProgress * 100)}%
                </span>
              </div>

              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="h-full bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.8)] transition-all duration-75 ease-out"
                  style={{ width: `${videoProgress * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Prominent Orange Action Button */}
          <div>
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={onOpenReserve}
              className="text-xs sm:text-sm tracking-widest shadow-[0_12px_32px_-4px_rgba(255,90,31,0.45)] px-8 sm:px-10 py-4 sm:py-5"
            >
              <span>Reserve Your Allocation</span>
              <ArrowRight size={16} />
            </MagneticButton>
          </div>

          <p className="mt-4 text-[10px] sm:text-xs font-mono text-[#686B70] tracking-widest uppercase">
            Escrow verification required upon allocation confirmation.
          </p>
        </div>
      </div>
    </section>
  );
}
