"use client";

import React, { useRef } from "react";
import { siteConfig, TrimModel } from "@/config/site";
import MagneticButton from "./MagneticButton";
import { Check, Zap, Sparkles } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface ModelsPricingProps {
  onSelectTrim?: (trim: TrimModel) => void;
}

export default function ModelsPricing({ onSelectTrim }: ModelsPricingProps) {
  const mouse = useMousePosition();
  const trims = siteConfig.models;

  return (
    <section
      id="models"
      className="relative w-full bg-[#F7F7F5] py-32 px-6 lg:px-12 border-t border-[#E2E3E0]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E3E0] text-[11px] font-mono tracking-[0.25em] text-[#17191C] uppercase mb-4 shadow-luxury-sm">
            <Zap size={12} className="text-[#FF5A1F]" />
            <span>COMMISSION TIERS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-[#17191C] font-display tracking-tight mb-6">
            BESPOKE EDITIONS & <br />
            <span className="text-[#17191C]">
              COMMISSIONS<span className="text-[#FF5A1F]">.</span>
            </span>
          </h2>

          <p className="text-base text-[#686B70] leading-relaxed">
            Each chassis is handcrafted to client specification at the Veloce Advanced Vehicle
            Operations facility. Allocations are strictly limited for worldwide delivery.
          </p>
        </div>

        {/* 3 Refined Pure White Model Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 perspective-1000 items-stretch">
          {trims.map((trim) => (
            <div
              key={trim.id}
              className={`group relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 bg-white preserve-3d ${
                trim.highlight
                  ? "border-2 border-[#FF5A1F] shadow-luxury-lg -translate-y-2 lg:-translate-y-4"
                  : "border border-[#E2E3E0] shadow-luxury-sm hover:border-[#D1D3CE] hover:shadow-luxury-md"
              }`}
            >
              {/* Highlight ribbon */}
              {trim.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FF5A1F] text-white font-display text-[10px] font-black uppercase tracking-[0.2em] shadow-md">
                  RECOMMENDED ALLOCATION
                </div>
              )}

              {/* Card Header */}
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF5A1F] uppercase block mb-2 font-bold">
                  {trim.badge}
                </span>

                <h3 className="text-2xl sm:text-3xl font-black font-display text-[#17191C] uppercase mb-4">
                  {trim.name}
                </h3>

                <div className="mb-6 pb-6 border-b border-[#E2E3E0]">
                  <span className="text-3xl sm:text-4xl font-black font-display text-[#17191C]">
                    {trim.price}
                  </span>
                  <span className="block text-xs font-mono text-[#686B70] mt-1">
                    {trim.production}
                  </span>
                </div>

                {/* Quick specs grid */}
                <div className="grid grid-cols-3 gap-2 mb-8 p-3 rounded-xl bg-[#F7F7F5] border border-[#E2E3E0] text-center">
                  <div>
                    <span className="block text-[9px] font-mono text-[#686B70] uppercase">POWER</span>
                    <span className="block text-xs sm:text-sm font-bold font-display text-[#17191C] mt-0.5">
                      {trim.power}
                    </span>
                  </div>
                  <div className="border-x border-[#E2E3E0]">
                    <span className="block text-[9px] font-mono text-[#686B70] uppercase">0-100</span>
                    <span className="block text-xs sm:text-sm font-bold font-display text-[#FF5A1F] mt-0.5">
                      {trim.acceleration.split(" ")[0]}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-[#686B70] uppercase">V-MAX</span>
                    <span className="block text-xs sm:text-sm font-bold font-display text-[#17191C] mt-0.5">
                      {trim.topSpeed.split(" ")[0]}
                    </span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  {trim.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FF5A1F]/10 text-[#FF5A1F]">
                        <Check size={11} />
                      </div>
                      <span className="text-xs text-[#686B70] leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <MagneticButton
                  variant={trim.highlight ? "primary" : "secondary"}
                  size="md"
                  onClick={() => onSelectTrim && onSelectTrim(trim)}
                  className="w-full"
                >
                  Reserve {trim.name.split(" ")[1]}
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
