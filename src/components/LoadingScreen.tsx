"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Activity } from "lucide-react";
import {
  subscribePreloadProgress,
  subscribePreloadReady,
  startFramePreloading,
} from "@/lib/framePreloader";

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export default function LoadingScreen({ onLoaded }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Start real preloading
    startFramePreloading();

    const unsubProgress = subscribePreloadProgress((pct) => {
      setProgress(pct);
    });

    const unsubReady = subscribePreloadReady(() => {
      // Small graceful delay to reveal transition
      setTimeout(() => {
        setIsDone(true);
        if (onLoaded) onLoaded();
      }, 400);
    });

    // Fallback safety timeout (maximum 3.5s)
    const safetyTimer = setTimeout(() => {
      setIsDone(true);
      if (onLoaded) onLoaded();
    }, 3500);

    return () => {
      unsubProgress();
      unsubReady();
      clearTimeout(safetyTimer);
    };
  }, [onLoaded]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#F7F7F5] flex flex-col items-center justify-center p-6 transition-opacity duration-600 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Soft warm light glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#FF5A1F]/[0.08] blur-[100px] animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Brand Name */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A1F] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5A1F]" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-[0.25em] font-display text-[#17191C]">
            {siteConfig.brand.name}
          </h1>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] bg-[#E2E3E0] rounded-full overflow-hidden mb-4 relative">
          <div
            className="h-full bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.5)] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Telemetry percentage readout */}
        <div className="flex items-center justify-between w-full text-[11px] font-mono text-[#686B70]">
          <span className="flex items-center gap-1.5 text-[#17191C]">
            <Activity size={12} className="text-[#FF5A1F] animate-pulse" />
            <span>BUFFERING KINEMATICS</span>
          </span>
          <span className="font-bold text-[#17191C]">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
