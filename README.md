# 🏎️ VELOCE — Luxury Light-Theme Cinematic 3D Automotive Experience

An Apple / Porsche / Awwwards-caliber, 3D scroll-driven automotive website for the hypercar brand **VELOCE** (placeholder, fully configurable in one file).

Completely transformed into a **sophisticated luxury light theme** combining warm white studio aesthetics, deep graphite typography, energetic racing orange highlights, and authentic multi-angle hypercar video footage.

Engineered with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP (ScrollTrigger)**, and **Lenis** smooth scroll for silky 60fps cinematic interaction.

---

## 🎨 Luxury Light Theme Palette

- **Primary Background**: Warm White `#F7F7F5`
- **Secondary Background**: Soft Silver `#ECEDEA`
- **Cards & Surfaces**: Pure White `#FFFFFF`
- **Primary Text**: Deep Graphite `#17191C`
- **Secondary Text**: Sophisticated Slate `#686B70`
- **Accent**: Energetic Racing Orange `#FF5A1F`
- **Borders & Dividers**: Subtle Silver Grey `#E2E3E0`
- **Shadows**: Multi-tier luxury studio ambient drop shadows (`shadow-luxury-sm`, `shadow-luxury-md`, `shadow-luxury-lg`, `shadow-luxury-stage`)

---

## 📁 Real Media Assets Mapping (From `images/` Folder)

All clips from the `images/` folder have been preserved without overwriting or moving and are matched to their authentic context:

| Original File in `images/` | Public Location | Section Used | Purpose |
|----------------------------|-----------------|--------------|---------|
| `Clip1-360orbit.mp4` | `public/video/car.mp4` | **Hero & Pinned 3D Showcase** | 360° orbit converted into 240 WebP frames for 60fps canvas scroll scrubbing |
| `Clip2Side-tracking.mp4` | `public/video/Clip2Side-tracking.mp4` | **Section 4: Design & Craft** | Asymmetric two-column side profile and aerodynamic wind-tunnel simulation |
| `Clip3Front-push-in.mp4` | `public/video/Clip3Front-push-in.mp4` | **Section 6: Interior Cockpit** | Front canopy & cockpit ingress push-in with 3 interactive numbered hotspots |
| `Clip4Wheel+burnout.mp4` | `public/video/Clip4Wheel+burnout.mp4` | **Section 5: Wheels & Engine** | Full-width high-RPM tire burnout video breakdown and technical dyno matrix |
| `Clip5Rear-taillights.mp4` | `public/video/Clip5Rear-taillights.mp4` | **Section 7: Gallery** | Rear OLED horizon light blade and carbon diffuser details |
| `Clip6Top-down+drive away.mp4` | `public/video/Clip6Top-down+drive away.mp4` | **Section 9: Final CTA** | "DRIVE THE FUTURE" top-down track drive-away looping preview |
| `full-car.png` | `public/images/full-car.png` | **Global Assets** | Master high-res render and poster fallback |

---

## ⚙️ Single Configuration File (`src/config/site.ts`)

All brand copy, hex colors, typography, specifications, chapter texts, frame settings, and models are configured in **one centralized file**:

👉 [`src/config/site.ts`](file:///e:/car/src/config/site.ts)

### How to Customize:
```typescript
// src/config/site.ts

export const siteConfig = {
  brand: {
    name: "VELOCE", // Change to any brand name in one spot
    tagline: "ENGINEERED FOR SPEED",
    subheadline: "A harmonious convergence of lightweight carbon architecture...",
    year: "2026",
    reserveCta: "Reserve Allocation",
    exploreCta: "Explore Showcase",
  },
  theme: {
    colors: {
      background: "#F7F7F5",
      backgroundSecondary: "#ECEDEA",
      surface: "#FFFFFF",
      textPrimary: "#17191C",
      textSecondary: "#686B70",
      accent: "#FF5A1F",
      border: "#E2E3E0",
    },
    // ...
  },
  // Specifications, Chapters, Models, and Gallery are all configured here!
};
```

---

## 🎬 10 Cinematic Light-Themed Sections

### 1. HERO (`src/components/Hero.tsx`)
- Minimal transparent navigation with VELOCE logo and links: *Performance*, *Design*, *Engineering*, *Gallery*, *Models*, *Reserve*.
- Large editorial headline: **"ENGINEERED FOR SPEED."**
- Supporting narrative with elegant typography.
- Large, beautifully framed hypercar video stage occupying ~75–85% of available width with realistic studio floor contact shadow and subtle orange accent badge.
- **Immediate First-Paint Display**: An eager high-resolution poster frame (`/frames/desktop/frame-0001.webp`) renders inside the framed stage container so the hypercar is immediately visible with zero delay upon initial page load, while `VideoCanvas` draws the 360° orbit frame as soon as hydrated.
- 3D mouse parallax tilt.
- Small orange scroll indicator and refined CTA buttons.

### 2. 3D VIDEO SHOWCASE — Signature Feature, Pinned ~800vh (`src/components/VideoShowcase.tsx`)
- Pinned in center screen inside a 3D perspective container (`perspective: 1400px`).
- Canvas-rendered WebP frames scrubbed smoothly forward and backward with scroll (0 to 239 frames mapped strictly to progress `0.00` to `0.94`, held through `1.00`).
- Smooth stage scaling (`0.88` to `1.04`), subtle `rotateX` / `rotateY` camera tilt, and depth parallax (`translateZ`).
- Realistic soft studio floor shadow beneath the car stage.
- Restrained orange radial glow behind the stage.
- **4 Storytelling Chapters** (cards in pure white `#FFFFFF` strictly outside the car's visual area):
  - **01 — CARBON-FIBER MONOCOQUE**: Lightweight engineering. Precision in every layer.
  - **02 — 1,200 HP TWIN-TURBO V8**: Explosive power engineered for control.
  - **03 — ACTIVE AERODYNAMICS**: Intelligent airflow. Maximum stability.
  - **04 — BORN TO MOVE**: Sculpted design with uncompromising performance.
- Segmented chapter progress indicator (`01` / `02` / `03` / `04`) with energetic orange fill.
- Animated live speed counter (counting up from `0` to `350+ KM/H`) with live gear indicator (`N`, `1` to `7`).

### 3. PERFORMANCE SPECS (`src/components/PerformanceSpecs.tsx`)
- Soft silver background (`#ECEDEA`) with pure white 3D tilted stat cards (`#FFFFFF`).
- Large animated count-up numbers synced to scroll progress:
  - **1,200 HP** (Twin-Turbocharged V8 Output)
  - **2.4 s** (0–100 km/h Launch Acceleration)
  - **350+ KM/H** (V-Max Top Speed)
  - **1,100 NM** (Peak Torque Plateau)
- Subtle silver grey borders (`#E2E3E0`) and multi-tier drop shadows.

### 4. DESIGN & CRAFT — Pinned Scroll-Scrubbed Showcase (`src/components/DesignCraft.tsx`)
- Pinned in viewport with GSAP ScrollTrigger (`+=2200`).
- Left column: large typography in deep graphite `#17191C`, narrative text in `#686B70`, 3 craft highlight cards in pure white synced to video timeline phases.
- Right column: framed real footage (`Clip2Side-tracking.mp4`) in a luxury studio container.
- **Scroll-Controlled Playback**: As the user scrolls, the side-tracking video scrubs from frame 0 to the final frame. Holds final frame from `0.93` to `1.00`, ensuring the complete video sequence is experienced before releasing to the next section.
- Live progress indicator with status (`"SCROLL TO ADVANCE VIDEO SEQUENCE"` -> `"SEQUENCE COMPLETE • SCROLL TO ADVANCE"`).

### 5. WHEELS, ENGINE & DETAILS — Pinned Scroll-Scrubbed Burnout (`src/components/WheelsEngine.tsx`)
- Pinned in viewport with GSAP ScrollTrigger (`+=2600`).
- Tab switcher: *Twin-Turbo V8 Engine* (Bore x Stroke, Compression, Lubrication, Redline) vs *Forged Wheels & Brakes* (20"/21" center-lock wheels, Cup 2R tires, 410mm carbon-silicon rotors), auto-toggling as scroll progresses.
- **Scroll-Controlled Playback**: Pinned full-width video stage scrubbing `Clip4Wheel+burnout.mp4` from start to finish.
- Real-time burnout telemetry:
  - **RPM Counter**: 1,200 to 8,500 RPM
  - **Tire Temperature**: 28°C to 104°C
  - **Boost Pressure**: 0.20 to 1.85 BAR
- Holds final burnout smoke frame until 100% complete before unpinning to let the user proceed.

### 6. INTERIOR EXPERIENCE — Pinned Scroll-Scrubbed Cockpit Ingress (`src/components/InteriorCockpit.tsx`)
- Pinned in viewport with GSAP ScrollTrigger (`+=2600`).
- **Scroll-Controlled Playback**: As user scrolls, `Clip3Front-push-in.mp4` scrubs from front exterior through the windshield directly into the cockpit.
- **Dynamic Hotspot Sequence**: Hotspots activate in sequence as the camera pushes closer:
  1. *Motorsport Steering Yoke* (0%–33%)
  2. *Direct-to-Chassis Seating* (33%–66%)
  3. *Head-Up Telemetry Display* (66%–100%)
- Complete cockpit view is fully revealed before the section unpins and advances.

### 7. GALLERY — HORIZONTAL RAIL (`src/components/GalleryRail.tsx`)
- Smooth horizontal scroll rail with 3D tilt cards on soft silver `#ECEDEA`.
- Live video playback on hover featuring real hypercar motion clips.
- Category badges (`AERODYNAMICS`, `EXTERIOR PROFILE`, `COCKPIT & FASCIA`, `DYNAMICS & TORQUE`, `LIGHTING & DIFFUSER`, `TRACK DISPATCH`).
- Touch-based horizontal interaction on mobile.

### 8. MODELS & PRICING (`src/components/ModelsPricing.tsx`)
- 3 refined model cards on pure white with subtle shadows and elegant silver borders:
  - **VELOCE PURA**: $2,850,000 (1,050 HP, 2.6s 0-100, Road Homologation)
  - **VELOCE SPECIALE**: $3,450,000 (1,200 HP, 2.4s 0-100, The Definitive Apex — Highlighted with orange border)
  - **VELOCE CORSA**: $4,200,000 (1,350 HP, 2.1s 0-100, Circuit Prototype)
- Each card has a *Reserve* button that pre-selects that trim in the allocation modal.

### 9. FINAL CTA — Pinned Launch Sequence (`src/components/FinalCTA.tsx`)
- Pinned in viewport with GSAP ScrollTrigger (`+=2000`).
- Headline: **"DRIVE THE FUTURE."**
- **Scroll-Controlled Playback**: `Clip6Top-down+drive away.mp4` scrubs forward as the car launches and drives away into the distance.
- Once the drive-away finishes, the call to action and glowing orange *Reserve Your Allocation* magnetic button are fully illuminated.
- Status badge confirms: `"LAUNCH COMPLETE • READY FOR ALLOCATION"`.

### 10. FOOTER (`src/components/Footer.tsx`)
- Clean light-themed footer on soft silver `#ECEDEA`.
- Deep graphite logo, factory headquarters location (Modena / Stuttgart).
- Quick navigation links, social links.
- Interactive *Factory Intelligence* confidential newsletter subscription with instant confirmation.
- Legal homologation & copyright notice.

---

## 🕹️ Interactive Features & UX Polish

- **Native Cursor Restored**: Standard system arrow cursor by default; natural hand pointer (`cursor: pointer`) on all clickable buttons, links, cards, and interactive controls. Custom cursor overlays removed for responsive, native browser pointer feel.
- **Scroll-Controlled Video Sequence (Video Must Finish First)**:
  - **Showcase (Canvas Frames)**: Complete 240-frame sequence mapped from scroll progress `0.00` to `0.94`, with final frame held firmly through `1.00`.
  - **All Video Sections Pinned**: In `DesignCraft` (`Clip2Side-tracking`), `WheelsEngine` (`Clip4Wheel+burnout`), `InteriorCockpit` (`Clip3Front-push-in`), and `FinalCTA` (`Clip6Top-down+drive away`), each section is pinned in the viewport using GSAP ScrollTrigger.
  - **Glitch-Free Scrubbing (`src/hooks/useVideoScrubber.ts`)**: Fast-seeking queue prevents decoder saturation, smoothly mapping scroll progress `0.0 -> 0.93` strictly to `0.0 -> video.duration`. The final frame is held until `1.00`, ensuring the entire video is finished before the section releases and allows scrolling down to the next section. Reverses smoothly on upward scroll.
- **Hero Zero-Delay Image Display**: Static high-res poster frame rendered eagerly inside the hero stage container, guaranteeing that the car image appears instantly on first paint without waiting for canvas buffering.
- **Lenis Smooth Scroll** (`src/components/SmoothScroll.tsx`): Synced with GSAP `ScrollTrigger.update()` inside `gsap.ticker.add((time) => lenis.raf(time * 1000))` with automatic resize refresh.
- **Magnetic Buttons** (`src/components/MagneticButton.tsx`): Buttons pull subtly towards the cursor with light sheen transitions and native pointer cursor.
- **Sticky Transparent Navbar** (`src/components/Navbar.tsx`): Auto-hides on scroll down, reveals on scroll up, frosted white glass backdrop.
- **Side Scroll Progress Indicator**: Vertical bar on desktop showing live scroll percentage (0% to 100%).
- **Loading Screen** (`src/components/LoadingScreen.tsx`): Preloader bound to real frame buffering progress (`src/lib/framePreloader.ts`) ensuring 100% frame availability before scroll interaction begins.
- **Allocation Modal** (`src/components/ReserveModal.tsx`): Full reservation popup in pure white with trim selector, confidential intake form, and priority code generator (`VELOCE-ALLOC-2026-XXXX`).
- **3D Mouse Parallax & Gyro Tilt**: Desktop tracks mouse normalization (`useMousePosition.ts`), mobile uses DeviceOrientation gyro angles (`useDeviceOrientation.ts`).
- **`prefers-reduced-motion` Support**: Full accessibility rules in `globals.css` ensuring animations gracefully scale down when requested.

---

## 🛠️ Commands to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Re-Extract Video Frames (If you update the video)
```bash
# Cross-platform Node.js script (Windows / Mac / Linux)
npm run extract-frames

# Or Linux / macOS / Git Bash shell script
chmod +x scripts/extract-frames.sh
./scripts/extract-frames.sh
```

### 4. Build for Production
```bash
npm run build
npm run start
```
*(Verified: Compiles successfully with zero errors and zero warnings, 100% static prerendered).*

---

## 🏎️ Engineering Specs & 60fps Guarantee

- **Canvas DPR Clamping**: Clamped to `Math.min(window.devicePixelRatio || 1, 2)` to eliminate GPU memory saturation on high-density Retina screens.
- **Bi-directional Lerp**: Frame scrub index dampened with factor `0.18`, giving buttery responsiveness in both forward and reverse scroll directions.
- **Aspect Ratio Containment**: Canvas uses mathematical aspect ratio calculation so the car is never stretched, cropped, or clipped.
- **Resilient Fallback**: If frames are ever loading or unavailable, the player automatically scrubs the native video stream with zero broken states.
