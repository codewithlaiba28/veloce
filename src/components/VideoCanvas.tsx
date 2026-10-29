"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { siteConfig } from "@/config/site";
import {
  getCachedFrames,
  startFramePreloading,
  subscribePreloadProgress,
} from "@/lib/framePreloader";

export interface VideoCanvasHandle {
  drawFrame: (index: number) => void;
  getLoadedRatio: () => number;
}

interface VideoCanvasProps {
  progress?: number; // 0 to 1 scroll progress
  onLoadProgress?: (pct: number) => void;
  className?: string;
  isMobile?: boolean;
}

const VideoCanvas = forwardRef<VideoCanvasHandle, VideoCanvasProps>(
  ({ progress = 0, onLoadProgress, className, isMobile: isMobileProp }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoFallbackRef = useRef<HTMLVideoElement>(null);
    const [useVideoFallback, setUseVideoFallback] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const lastDrawnFrameRef = useRef<number>(-1);
    const totalFrames = siteConfig.media.totalFrames;

    // Detect mobile viewport
    useEffect(() => {
      if (typeof window !== "undefined") {
        const checkMobile = () => {
          const mobile = isMobileProp !== undefined ? isMobileProp : window.innerWidth < 768;
          setIsMobile(mobile);
          startFramePreloading(mobile);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
      }
    }, [isMobileProp]);

    // Subscribe to preloader progress
    useEffect(() => {
      const unsub = subscribePreloadProgress((pct) => {
        if (onLoadProgress) {
          onLoadProgress(pct);
        }
      });
      return unsub;
    }, [onLoadProgress]);

    // Direct image renderer
    const drawImageElement = useCallback(
      (img: HTMLImageElement, frameIdx: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !img || !img.complete || img.naturalWidth <= 0) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const { width, height } = canvas;
        if (width === 0 || height === 0) return;

        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;

        const hRatio = width / imgWidth;
        const vRatio = height / imgHeight;
        const ratio = Math.min(hRatio, vRatio);

        const centerShiftX = (width - imgWidth * ratio) / 2;
        const centerShiftY = (height - imgHeight * ratio) / 2;

        ctx.fillStyle = "#0c0d10";
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(
          img,
          0,
          0,
          imgWidth,
          imgHeight,
          centerShiftX,
          centerShiftY,
          imgWidth * ratio,
          imgHeight * ratio
        );

        lastDrawnFrameRef.current = frameIdx;
      },
      []
    );

    // Eagerly load frame 0 and redraw immediately when cached frames update
    useEffect(() => {
      const initialImg = new Image();
      initialImg.src = isMobile
        ? siteConfig.media.mobileFramePath(1)
        : siteConfig.media.desktopFramePath(1);
      initialImg.onload = () => {
        if (lastDrawnFrameRef.current <= 0) {
          drawImageElement(initialImg, 0);
        }
      };

      const unsub = subscribePreloadProgress(() => {
        if (lastDrawnFrameRef.current <= 0) {
          const frames = getCachedFrames(isMobile);
          if (frames[0] && frames[0]!.complete) {
            drawImageElement(frames[0]!, 0);
          }
        }
      });

      return () => unsub();
    }, [isMobile, drawImageElement]);

    // Draw a specific frame index directly onto the canvas
    const renderFrameIndex = useCallback(
      (frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const clampedIndex = Math.max(0, Math.min(totalFrames - 1, frameIndex));
        const frames = getCachedFrames(isMobile);

        // Find frame or nearest loaded frame
        let img = frames[clampedIndex];
        if (!img) {
          for (let i = clampedIndex; i >= 0; i--) {
            if (frames[i]) {
              img = frames[i];
              break;
            }
          }
          if (!img) {
            for (let i = clampedIndex; i < frames.length; i++) {
              if (frames[i]) {
                img = frames[i];
                break;
              }
            }
          }
        }

        if (img && img.complete && img.naturalWidth > 0) {
          drawImageElement(img, clampedIndex);
        }
      },
      [isMobile, totalFrames, drawImageElement]
    );

    // Expose imperative handle for zero-lag GSAP ScrollTrigger updates
    useImperativeHandle(
      ref,
      () => ({
        drawFrame: (index: number) => {
          renderFrameIndex(index);
        },
        getLoadedRatio: () => {
          const frames = getCachedFrames(isMobile);
          const loaded = frames.filter(Boolean).length;
          return loaded / totalFrames;
        },
      }),
      [renderFrameIndex, isMobile, totalFrames]
    );

    // Initial canvas sizing and resize listener
    useEffect(() => {
      const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        if (rect.width > 0 && rect.height > 0) {
          canvas.width = Math.floor(rect.width * dpr);
          canvas.height = Math.floor(rect.height * dpr);
          // Re-render current frame immediately after resize
          if (lastDrawnFrameRef.current >= 0) {
            renderFrameIndex(lastDrawnFrameRef.current);
          } else {
            renderFrameIndex(0);
          }
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [renderFrameIndex]);

    // Handle progress prop updates (e.g. from Hero or direct control)
    useEffect(() => {
      if (useVideoFallback) {
        const video = videoFallbackRef.current;
        if (video && video.duration && !isNaN(video.duration)) {
          const targetTime = Math.min(video.duration, Math.max(0, progress * video.duration));
          if (Math.abs(video.currentTime - targetTime) > 0.03) {
            video.currentTime = targetTime;
          }
        }
      } else {
        const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(progress * (totalFrames - 1))));
        renderFrameIndex(frameIndex);
      }
    }, [progress, totalFrames, useVideoFallback, renderFrameIndex]);

    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        {useVideoFallback ? (
          <video
            ref={videoFallbackRef}
            src={siteConfig.media.heroVideo}
            playsInline
            muted
            preload="auto"
            className="w-full h-full object-contain"
          />
        ) : (
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain block select-none pointer-events-none"
          />
        )}
      </div>
    );
  }
);

VideoCanvas.displayName = "VideoCanvas";

export default VideoCanvas;
