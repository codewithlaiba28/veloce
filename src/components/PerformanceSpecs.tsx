"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import { Zap, Flame, Gauge, Timer } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function PerformanceSpecs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    hp: 0,
    accel: 0,
    vmax: 0,
    torque: 0,
  });

  const mouse = useMousePosition();
  const specs = siteConfig.specs;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=130%",
        pin: pinRef.current,
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;

          // Interpolate numbers smoothly to user specs
          setCounts({
            hp: Math.round(p * 1200),
            accel: parseFloat((p * 2.4).toFixed(1)),
            vmax: Math.round(p * 350),
            torque: Math.round(p * 1100),
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const icons = {
    hp: <Flame className="text-[#FF5A1F]" size={22} />,
    accel: <Timer className="text-[#FF5A1F]" size={22} />,
    vmax: <Gauge className="text-[#FF5A1F]" size={22} />,
    torque: <Zap className="text-[#FF5A1F]" size={22} />,
  };

  return (
    <section
      id="performance"
      ref={containerRef}
      className="relative w-full bg-[#ECEDEA] py-24 border-t border-[#E2E3E0]"
      style={{ minHeight: "220vh" }}
    >
      <div
        ref={pinRef}
        className="w-full min-h-screen flex flex-col justify-center px-6 lg:px-12 py-16 overflow-hidden relative"
      >
        {/* Soft warm light glow in background */}
        <div
          className="pointer-events-none absolute -top-32 right-12 w-[600px] h-[600px] rounded-full bg-[#FF5A1F]/[0.05] blur-[150px] will-change-transform"
          style={{
            transform: `translate3d(${mouse.normalizedX * -25}px, ${
              mouse.normalizedY * -25
            }px, 0)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E3E0] text-[11px] font-mono tracking-[0.25em] text-[#17191C] uppercase mb-4 shadow-luxury-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
                <span>DYNAMIC TELEMETRY MATRIX</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-[#17191C] font-display tracking-tight">
                PERFORMANCE <br />
                <span className="text-[#17191C]">
                  SPECIFICATIONS<span className="text-[#FF5A1F]">.</span>
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base text-[#686B70] leading-relaxed">
              Every parameter rigorously benchmarked. Pure mechanical symphony augmented by
              cutting-edge aerospace carbon architecture.
            </p>
          </div>

          {/* 3D Tilted Pure White Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
            {specs.map((spec) => {
              const currentVal =
                spec.decimals === 1
                  ? (counts[spec.id] ?? 0).toFixed(1)
                  : (counts[spec.id] ?? 0);

              return (
                <div
                  key={spec.id}
                  className="group relative p-8 rounded-2xl bg-white border border-[#E2E3E0] hover:border-[#FF5A1F]/60 transition-all duration-300 shadow-luxury-md hover:shadow-luxury-lg flex flex-col justify-between overflow-hidden preserve-3d cursor-default"
                  style={{
                    transform: `rotateX(${-mouse.normalizedY * 2.5}deg) rotateY(${
                      mouse.normalizedX * 3.5
                    }deg)`,
                  }}
                >
                  {/* Subtle top indicator bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5A1F]/30 to-transparent group-hover:via-[#FF5A1F] transition-all duration-300" />

                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 rounded-xl bg-[#F7F7F5] border border-[#E2E3E0] group-hover:border-[#FF5A1F]/30 transition-colors">
                      {icons[spec.id as keyof typeof icons]}
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-[#686B70] uppercase">
                      {spec.label}
                    </span>
                  </div>

                  {/* Big Number Count-Up */}
                  <div className="my-3">
                    <div className="flex items-baseline gap-1 font-display font-black text-[#17191C]">
                      <span className="text-5xl sm:text-6xl tracking-tight">
                        {currentVal}
                      </span>
                      <span className="text-lg sm:text-xl font-mono text-[#FF5A1F]">
                        {spec.suffix}
                      </span>
                    </div>
                    <p className="text-xs font-mono tracking-wider text-[#686B70] uppercase mt-2">
                      {spec.sublabel}
                    </p>
                  </div>

                  {/* Card Footer Detail */}
                  <div className="pt-6 border-t border-[#E2E3E0] mt-4">
                    <p className="text-xs text-[#686B70] leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
