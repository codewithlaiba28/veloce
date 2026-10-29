"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import VideoCanvas, { VideoCanvasHandle } from "./VideoCanvas";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";
import { Activity, ShieldCheck, Flame, Wind, Zap } from "lucide-react";

export default function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const stageBoxRef = useRef<HTMLDivElement>(null);
  const canvasHandleRef = useRef<VideoCanvasHandle>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [currentGear, setCurrentGear] = useState("N");
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const mouse = useMousePosition();
  const orientation = useDeviceOrientation();

  const chapters = siteConfig.showcase.chapters;
  const totalFrames = siteConfig.media.totalFrames;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !pinWrapperRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinWrapperRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.2, // Instantaneous, tight synchronization without lag
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Full frame progression:
          // Maps progress 0.0 -> 0.94 strictly to frames 0 -> 239.
          // Between 0.94 -> 1.00, the final frame is held firmly so the full video finishes
          // completely BEFORE the pinned stage releases to the next section!
          const frameProgress = Math.min(1, Math.max(0, p / 0.94));
          const frameIndex = Math.min(
            totalFrames - 1,
            Math.max(0, Math.floor(frameProgress * (totalFrames - 1)))
          );

          // Draw directly to canvas for zero-lag frame advancement
          if (canvasHandleRef.current) {
            canvasHandleRef.current.drawFrame(frameIndex);
          }

          // Live Speed (0 to 350+ km/h)
          const speed = Math.round(frameProgress * 350);
          setCurrentSpeed(speed);

          // Dynamic Gear Telemetry
          let gear = "N";
          if (speed > 300) gear = "7";
          else if (speed > 240) gear = "6";
          else if (speed > 180) gear = "5";
          else if (speed > 120) gear = "4";
          else if (speed > 65) gear = "3";
          else if (speed > 20) gear = "2";
          else if (speed > 0) gear = "1";
          setCurrentGear(gear);

          // 4 Discrete Chapters
          let chapIndex = 0;
          if (frameProgress >= 0.75) chapIndex = 3;
          else if (frameProgress >= 0.5) chapIndex = 2;
          else if (frameProgress >= 0.25) chapIndex = 1;
          else chapIndex = 0;

          setActiveChapterIndex(chapIndex);
        },
      });
    }, containerRef);

    // Refresh ScrollTrigger after DOM renders
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [totalFrames]);

  // Compute 3D stage rotation and scale based on scroll and mouse/gyro
  const stageScale = 0.88 + scrollProgress * 0.16; // 0.88 to 1.04
  const stageRotateX =
    Math.sin(scrollProgress * Math.PI * 2) * 3.5 +
    -mouse.normalizedY * 4.5 +
    orientation.beta * 0.12;
  const stageRotateY =
    Math.cos(scrollProgress * Math.PI * 2) * 5.5 +
    mouse.normalizedX * 6.0 +
    orientation.gamma * 0.12;
  const stageTranslateZ = Math.sin(scrollProgress * Math.PI) * 35;

  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  const chapterIcons = [
    <ShieldCheck key="1" size={16} className="text-[#FF5A1F]" />,
    <Flame key="2" size={16} className="text-[#FF5A1F]" />,
    <Wind key="3" size={16} className="text-[#FF5A1F]" />,
    <Zap key="4" size={16} className="text-[#FF5A1F]" />,
  ];

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative w-full bg-[#F7F7F5]"
      style={{ height: siteConfig.showcase.pinDistance }}
    >
      {/* Pinned Viewport Container (NO CSS STICKY to avoid GSAP pin-spacer conflict) */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between p-4 sm:p-8 lg:p-12 z-20"
      >
        {/* Restrained Orange Radial Glow behind stage */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5A1F] filter blur-[120px] transition-all duration-300 will-change-transform"
          style={{
            width: `${280 + scrollProgress * 420}px`,
            height: `${280 + scrollProgress * 420}px`,
            opacity: 0.08 + scrollProgress * 0.16,
          }}
        />

        {/* Top Telemetry Floating Island Bar */}
        <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#E2E3E0] shadow-luxury-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#FF5A1F] animate-ping" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#17191C] uppercase">
              SHOWCASE // 3D KINEMATICS
            </span>
          </div>

          {/* Chapter Progress Indicators (01 / 02 / 03 / 04) */}
          <div className="flex items-center gap-2 sm:gap-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#E2E3E0] shadow-luxury-sm">
            {chapters.map((chap, idx) => {
              const isActive = idx === activeChapterIndex;
              const isPast = idx < activeChapterIndex;
              return (
                <div key={chap.id} className="flex flex-col items-center gap-1">
                  <span
                    className={`text-[10px] font-mono tracking-widest transition-colors ${
                      isActive
                        ? "text-[#FF5A1F] font-bold"
                        : isPast
                        ? "text-[#17191C]"
                        : "text-[#686B70]/60"
                    }`}
                  >
                    {chap.chapterNumber}
                  </span>
                  <div
                    className={`h-[3px] w-8 sm:w-12 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.5)]"
                        : isPast
                        ? "bg-[#17191C]"
                        : "bg-[#E2E3E0]"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Live Speed & Gear Telemetry */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#E2E3E0] shadow-luxury-sm">
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black font-display text-[#17191C]">
                {currentSpeed}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#686B70]">
                KM/H
              </span>
            </div>
            <div className="hidden sm:flex items-center justify-center px-2 py-0.5 rounded-full bg-[#ECEDEA] text-xs font-mono font-bold text-[#FF5A1F]">
              GEAR {currentGear}
            </div>
          </div>
        </div>

        {/* Central 3D Perspective Stage & Chapter Callout Cards */}
        <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto flex items-center justify-center perspective-1400 my-auto">
          {/* Realistic Studio Floor Contact Shadow beneath the car */}
          <div
            className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-[75%] h-20 rounded-[100%] studio-shadow blur-2xl will-change-transform"
            style={{
              transform: `scale3d(${stageScale}, 1, 1)`,
              opacity: 0.6 + scrollProgress * 0.3,
            }}
          />

          {/* Framed Car Stage */}
          <div
            ref={stageBoxRef}
            className="relative w-[88%] sm:w-[78%] lg:w-[70%] aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D8D9D5] bg-[#0c0d10] shadow-luxury-stage transition-transform duration-100 ease-out preserve-3d will-change-transform"
            style={{
              transform: `scale3d(${stageScale}, ${stageScale}, 1) rotateX(${stageRotateX}deg) rotateY(${stageRotateY}deg) translateZ(${stageTranslateZ}px)`,
            }}
          >
            {/* Canvas Rendering Frames with imperative ref */}
            <VideoCanvas ref={canvasHandleRef} className="w-full h-full" />

            {/* In-stage glass HUD overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="pointer-events-none absolute inset-0 border border-white/10 rounded-2xl sm:rounded-3xl" />

            {/* Internal stage corner telemetry */}
            <div className="absolute top-4 left-4 z-20 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#17191C]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/90">
              <Activity size={12} className="text-[#FF5A1F]" />
              <span>360° ORBIT // KINEMATIC SCRUB</span>
            </div>

            <div className="absolute bottom-4 right-4 z-20 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#17191C]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#FF5A1F]">
              <span>ACTIVE DOWNFORCE ENVELOPE</span>
            </div>
          </div>

          {/* Chapter 1 & 3 Callouts (Left Side - strictly outside central car area) */}
          <div
            className={`absolute left-0 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 max-w-[280px] sm:max-w-[320px] z-30 transition-all duration-500 pointer-events-none ${
              currentChapter.side === "left"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2E3E0] shadow-luxury-lg">
              <div className="flex items-center gap-2 mb-2">
                {chapterIcons[activeChapterIndex]}
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF5A1F] uppercase font-bold">
                  {currentChapter.subtitle}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase text-[#17191C] font-display mb-3 tracking-tight">
                {currentChapter.title}
              </h3>

              <div className="space-y-2 border-l-2 border-[#FF5A1F] pl-3">
                {currentChapter.lines.map((line, lIdx) => (
                  <p
                    key={lIdx}
                    className="text-xs sm:text-sm text-[#686B70] leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Animated connector pointer tag */}
              <div className="hidden lg:flex items-center gap-2 mt-4 text-[10px] font-mono text-[#FF5A1F]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F] animate-ping" />
                <span>CHASSIS FOCAL POINT // ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Chapter 2 & 4 Callouts (Right Side - strictly outside central car area) */}
          <div
            className={`absolute right-0 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 max-w-[280px] sm:max-w-[320px] z-30 transition-all duration-500 pointer-events-none ${
              currentChapter.side === "right"
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2E3E0] shadow-luxury-lg">
              <div className="flex items-center gap-2 mb-2">
                {chapterIcons[activeChapterIndex]}
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF5A1F] uppercase font-bold">
                  {currentChapter.subtitle}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase text-[#17191C] font-display mb-3 tracking-tight">
                {currentChapter.title}
              </h3>

              <div className="space-y-2 border-l-2 border-[#FF5A1F] pl-3">
                {currentChapter.lines.map((line, lIdx) => (
                  <p
                    key={lIdx}
                    className="text-xs sm:text-sm text-[#686B70] leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Animated connector pointer tag */}
              <div className="hidden lg:flex items-center gap-2 mt-4 text-[10px] font-mono text-[#FF5A1F]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F] animate-ping" />
                <span>POWERTRAIN VECTOR // ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pinned Minimal Bar */}
        <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono text-[#686B70] px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#E2E3E0] shadow-luxury-sm">
          <div className="flex items-center gap-3">
            <span className="text-[#FF5A1F] font-bold">
              FRAME: {Math.min(totalFrames, Math.round(Math.min(1, scrollProgress / 0.94) * (totalFrames - 1)) + 1)} / {totalFrames}
            </span>
            <span className="hidden sm:inline text-[#E2E3E0]">|</span>
            <span className="hidden sm:inline">
              ROTATION: {Math.round(Math.min(1, scrollProgress / 0.94) * 360)}°
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
            <span className="uppercase text-[#17191C] font-semibold">
              CHAPTER {currentChapter.chapterNumber} : {currentChapter.title}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span>SEQUENCE COMPLETION: {Math.round(Math.min(1, scrollProgress / 0.94) * 100)}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
