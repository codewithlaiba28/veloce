"use client";

import { useState, useEffect } from "react";

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState({ gamma: 0, beta: 0 });

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma is left-to-right tilt in degrees (-90 to 90)
        // beta is front-to-back tilt in degrees (-180 to 180)
        setOrientation({
          gamma: Math.max(-30, Math.min(30, e.gamma)),
          beta: Math.max(-30, Math.min(30, e.beta - 45)), // offset for typical handheld viewing angle
        });
      }
    };

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  return orientation;
}
