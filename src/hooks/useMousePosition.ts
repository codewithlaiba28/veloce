"use client";

import { useState, useEffect } from "react";

export function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      const normalizedY = (clientY / innerHeight) * 2 - 1;
      setMouse({ x: clientX, y: clientY, normalizedX, normalizedY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mouse;
}
