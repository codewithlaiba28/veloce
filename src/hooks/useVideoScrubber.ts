"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useVideoScrubber(videoRef: React.RefObject<HTMLVideoElement>) {
  const [isReady, setIsReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);

  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const pendingProgressRef = useRef<number | null>(null);

  // Seek safely without overloading video decoder
  const performSeek = useCallback(
    (targetTime: number) => {
      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) {
        return;
      }

      const clamped = Math.min(video.duration, Math.max(0, targetTime));
      targetTimeRef.current = clamped;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        try {
          if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
            (video as any).fastSeek(clamped);
          } else {
            video.currentTime = clamped;
          }
        } catch {
          video.currentTime = clamped;
        }
      }
    },
    [videoRef]
  );

  // Public method called by GSAP ScrollTrigger onUpdate
  const seekToProgress = useCallback(
    (normalizedProgress: number) => {
      const clampedProgress = Math.min(1, Math.max(0, normalizedProgress));
      setVideoProgress(clampedProgress);

      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) {
        pendingProgressRef.current = clampedProgress;
        return;
      }

      const targetTime = clampedProgress * video.duration;
      performSeek(targetTime);
    },
    [videoRef, performSeek]
  );

  // Set up video metadata & seeking listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
        setIsReady(true);
        if (pendingProgressRef.current !== null) {
          performSeek(pendingProgressRef.current * video.duration);
          pendingProgressRef.current = null;
        }
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (!video || !video.duration || isNaN(video.duration)) return;

      // If scroll moved while seeking, catch up immediately to latest target
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.04) {
        isSeekingRef.current = true;
        try {
          video.currentTime = targetTimeRef.current;
        } catch {
          isSeekingRef.current = false;
        }
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleLoadedMetadata);
    video.addEventListener("seeked", handleSeeked);

    // Initial check in case video is already cached/ready
    if (video.readyState >= 1 && video.duration && !isNaN(video.duration)) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [videoRef, performSeek]);

  return {
    seekToProgress,
    isReady,
    duration,
    videoProgress,
  };
}
