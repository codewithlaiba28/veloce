#!/usr/bin/env bash
# ==============================================================================
# VELOCE — Hypercar WebP Frame Extraction Script (FFmpeg)
# Extracts optimized 24fps WebP frames for desktop (1600px) & mobile (800px)
# for 60fps Scroll-Driven Canvas Scrubbing.
# ==============================================================================

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

INPUT_VIDEO="$ROOT_DIR/public/video/car.mp4"
FALLBACK_VIDEO="$ROOT_DIR/images/Clip1-360orbit.mp4"
DESKTOP_DIR="$ROOT_DIR/public/frames/desktop"
MOBILE_DIR="$ROOT_DIR/public/frames/mobile"

# Locate video input
if [ ! -f "$INPUT_VIDEO" ]; then
  if [ -f "$FALLBACK_VIDEO" ]; then
    echo "[INFO] Using source clip from images/Clip1-360orbit.mp4"
    mkdir -p "$ROOT_DIR/public/video"
    cp "$FALLBACK_VIDEO" "$INPUT_VIDEO"
  else
    echo "[ERROR] No input car video found at $INPUT_VIDEO or $FALLBACK_VIDEO!" >&2
    exit 1
  fi
fi

# Check for ffmpeg binary
if ! command -v ffmpeg &> /dev/null; then
  if [ -f "$ROOT_DIR/node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe" ]; then
    FFMPEG_BIN="$ROOT_DIR/node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe"
  else
    echo "[ERROR] ffmpeg command not found in PATH or node_modules!" >&2
    echo "[TIP] Run 'npm run extract-frames' which automatically bundles ffmpeg." >&2
    exit 1
  fi
else
  FFMPEG_BIN="ffmpeg"
fi

echo "=================================================="
echo "VELOCE — High Performance Frame Extraction Engine"
echo "Binary: $FFMPEG_BIN"
echo "Input:  $INPUT_VIDEO"
echo "=================================================="

mkdir -p "$DESKTOP_DIR"
mkdir -p "$MOBILE_DIR"

echo "[1/2] Extracting Desktop Frames (1600px, 24fps WebP)..."
"$FFMPEG_BIN" -y -i "$INPUT_VIDEO" \
  -vf "fps=24,scale=1600:-1:flags=bicubic" \
  -vcodec libwebp \
  -lossless 0 \
  -preset photo \
  -compression_level 1 \
  -q:v 75 \
  "$DESKTOP_DIR/frame-%04d.webp"

echo "[2/2] Extracting Mobile Frames (800px, 24fps WebP)..."
"$FFMPEG_BIN" -y -i "$INPUT_VIDEO" \
  -vf "fps=24,scale=800:-1:flags=bicubic" \
  -vcodec libwebp \
  -lossless 0 \
  -preset photo \
  -compression_level 1 \
  -q:v 70 \
  "$MOBILE_DIR/frame-%04d.webp"

DESKTOP_COUNT=$(find "$DESKTOP_DIR" -name "*.webp" 2>/dev/null | wc -l)
MOBILE_COUNT=$(find "$MOBILE_DIR" -name "*.webp" 2>/dev/null | wc -l)

echo "=================================================="
echo "Extraction Complete!"
echo "Desktop Frames: $DESKTOP_COUNT WebP in $DESKTOP_DIR"
echo "Mobile Frames:  $MOBILE_COUNT WebP in $MOBILE_DIR"
echo "=================================================="
