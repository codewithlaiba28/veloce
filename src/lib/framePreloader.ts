"use client";

import { siteConfig } from "@/config/site";

// Global cache for loaded frames to prevent re-fetching across re-renders
const desktopFramesCache: (HTMLImageElement | null)[] = new Array(siteConfig.media.totalFrames).fill(null);
const mobileFramesCache: (HTMLImageElement | null)[] = new Array(siteConfig.media.totalFrames).fill(null);

let isPreloading = false;
let preloadFinished = false;
const progressListeners: Set<(progress: number) => void> = new Set();
const readyListeners: Set<() => void> = new Set();

export function getCachedFrames(isMobile: boolean): (HTMLImageElement | null)[] {
  return isMobile ? mobileFramesCache : desktopFramesCache;
}

export function subscribePreloadProgress(onProgress: (p: number) => void): () => void {
  progressListeners.add(onProgress);
  if (preloadFinished) {
    onProgress(100);
  }
  return () => progressListeners.delete(onProgress);
}

export function subscribePreloadReady(onReady: () => void): () => void {
  readyListeners.add(onReady);
  if (preloadFinished) {
    onReady();
  }
  return () => readyListeners.delete(onReady);
}

export function startFramePreloading(isMobileDevice?: boolean) {
  if (isPreloading || preloadFinished) return;
  isPreloading = true;

  const total = siteConfig.media.totalFrames;
  const isMobile =
    isMobileDevice !== undefined
      ? isMobileDevice
      : typeof window !== "undefined" && window.innerWidth < 768;

  const cache = isMobile ? mobileFramesCache : desktopFramesCache;
  let loadedCount = 0;

  // Concurrency controller: load 12 images in parallel
  const concurrency = 12;
  let currentIndex = 0;

  function notifyProgress() {
    const pct = Math.min(100, Math.round((loadedCount / total) * 100));
    progressListeners.forEach((fn) => fn(pct));
    if (loadedCount >= Math.min(60, total)) {
      readyListeners.forEach((fn) => fn());
    }
    if (loadedCount >= total) {
      preloadFinished = true;
      isPreloading = false;
      progressListeners.forEach((fn) => fn(100));
      readyListeners.forEach((fn) => fn());
    }
  }

  function loadNext() {
    if (currentIndex >= total) return;
    const index = currentIndex++;
    const frameNum = index + 1;
    const path = isMobile
      ? siteConfig.media.mobileFramePath(frameNum)
      : siteConfig.media.desktopFramePath(frameNum);

    const img = new Image();
    img.src = path;
    img.onload = () => {
      cache[index] = img;
      loadedCount++;
      notifyProgress();
      loadNext();
    };
    img.onerror = () => {
      // Fallback: mark as null, continue next
      loadedCount++;
      notifyProgress();
      loadNext();
    };
  }

  // Launch initial concurrent batch
  for (let i = 0; i < concurrency; i++) {
    loadNext();
  }
}
