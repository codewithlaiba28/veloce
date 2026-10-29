export interface Chapter {
  id: number;
  chapterNumber: string;
  title: string;
  subtitle: string;
  lines: string[];
  side: "left" | "right";
  pointerPosition: { x: number; y: number }; // percentage coords relative to stage
  speedKmh: number;
  gear: number;
  frameStartRatio: number;
  frameEndRatio: number;
}

export interface SpecItem {
  id: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
  sublabel: string;
  description: string;
}

export interface TrimModel {
  id: string;
  name: string;
  badge: string;
  price: string;
  production: string;
  power: string;
  acceleration: string;
  topSpeed: string;
  weight: string;
  features: string[];
  highlight: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  aspect: string;
  videoSrc?: string;
  imageSrc?: string;
  description: string;
}

export const siteConfig = {
  brand: {
    name: "VELOCE",
    tagline: "ENGINEERED FOR SPEED",
    subheadline:
      "A harmonious convergence of lightweight carbon architecture, active aerodynamics, and 1,200 twin-turbocharged horsepower.",
    statement: "BEYOND VELOCITY. BEYOND COMPROMISE.",
    year: "2026",
    reserveCta: "Reserve Allocation",
    exploreCta: "Explore Showcase",
  },

  // 1. Luxury Light Theme Color Palette (Apple / Porsche / Awwwards aesthetic)
  theme: {
    colors: {
      background: "#F7F7F5", // Warm white primary
      backgroundSecondary: "#ECEDEA", // Soft silver secondary
      surface: "#FFFFFF", // Pure white cards
      surfaceElevated: "#FFFFFF",
      border: "#E2E3E0", // Subtle silver grey
      borderStrong: "#D1D3CE",
      textPrimary: "#17191C", // Deep graphite
      textSecondary: "#686B70", // Sophisticated secondary grey
      accent: "#FF5A1F", // Energetic racing orange
      accentSoft: "rgba(255, 90, 31, 0.10)",
      accentGlow: "rgba(255, 90, 31, 0.25)",
    },
    fonts: {
      display: "Orbitron",
      body: "Inter",
    },
  },

  navigation: [
    { label: "Overview", href: "#hero" },
    { label: "Showcase", href: "#showcase" },
    { label: "Performance", href: "#performance" },
    { label: "Design", href: "#design" },
    { label: "Engineering", href: "#engineering" },
    { label: "Interior", href: "#interior" },
    { label: "Gallery", href: "#gallery" },
    { label: "Models", href: "#models" },
  ],

  media: {
    heroVideo: "/video/car.mp4",
    orbitVideo: "/video/Clip1-360orbit.mp4",
    trackingVideo: "/video/Clip2Side-tracking.mp4",
    pushInVideo: "/video/Clip3Front-push-in.mp4",
    wheelBurnoutVideo: "/video/Clip4Wheel+burnout.mp4",
    taillightsVideo: "/video/Clip5Rear-taillights.mp4",
    driveAwayVideo: "/video/Clip6Top-down+drive away.mp4",
    fullCarImage: "/images/full-car.png",
    totalFrames: 240,
    fps: 24,
    desktopFramePath: (index: number) =>
      `/frames/desktop/frame-${String(index).padStart(4, "0")}.webp`,
    mobileFramePath: (index: number) =>
      `/frames/mobile/frame-${String(index).padStart(4, "0")}.webp`,
  },

  // 4. Main Feature — 4 Storytelling Chapters
  showcase: {
    pinDistance: "800vh",
    pinDistanceMobile: "450vh",
    title: "DYNAMIC KINEMATICS",
    chapters: [
      {
        id: 1,
        chapterNumber: "01",
        title: "Carbon-Fiber Monocoque",
        subtitle: "LIGHTWEIGHT ENGINEERING",
        lines: [
          "Lightweight engineering. Precision in every layer.",
          "Autoclaved T1000 carbon tub engineered for 52,000 Nm/deg torsional rigidity.",
        ],
        side: "left",
        pointerPosition: { x: 34, y: 56 },
        speedKmh: 85,
        gear: 2,
        frameStartRatio: 0.0,
        frameEndRatio: 0.25,
      },
      {
        id: 2,
        chapterNumber: "02",
        title: "1,200 HP Twin-Turbo V8",
        subtitle: "POWERTRAIN MASTERY",
        lines: [
          "Explosive power engineered for control.",
          "4.0L flat-plane crankshaft powerplant revving to a 9,200 RPM redline.",
        ],
        side: "right",
        pointerPosition: { x: 68, y: 44 },
        speedKmh: 195,
        gear: 4,
        frameStartRatio: 0.25,
        frameEndRatio: 0.5,
      },
      {
        id: 3,
        chapterNumber: "03",
        title: "Active Aerodynamics",
        subtitle: "INTELLIGENT AIRFLOW",
        lines: [
          "Intelligent airflow. Maximum stability.",
          "Dual-plane articulating DRS carbon wing generating 850 kg downforce at velocity.",
        ],
        side: "left",
        pointerPosition: { x: 28, y: 40 },
        speedKmh: 285,
        gear: 6,
        frameStartRatio: 0.5,
        frameEndRatio: 0.75,
      },
      {
        id: 4,
        chapterNumber: "04",
        title: "Born to Move",
        subtitle: "AERODYNAMIC DESIGN",
        lines: [
          "Sculpted design with uncompromising performance.",
          "Obsidian matte carbon architecture accentuated by energetic racing orange accents.",
        ],
        side: "right",
        pointerPosition: { x: 65, y: 52 },
        speedKmh: 350,
        gear: 7,
        frameStartRatio: 0.75,
        frameEndRatio: 1.0,
      },
    ] as Chapter[],
  },

  // 5. Performance — Interactive Specifications (Exact user requirements)
  specs: [
    {
      id: "hp",
      value: 1200,
      suffix: " HP",
      label: "HORSEPOWER",
      sublabel: "Twin-Turbocharged V8",
      description:
        "Bespoke 4.0L flat-plane combustion engine with twin low-inertia ball-bearing turbochargers.",
    },
    {
      id: "accel",
      value: 2.4,
      decimals: 1,
      suffix: " s",
      label: "0 — 100 KM/H",
      sublabel: "Launch Acceleration",
      description:
        "Instant torque-vectoring delivery across all four wheels with active launch slip regulation.",
    },
    {
      id: "vmax",
      value: 350,
      suffix: "+ KM/H",
      label: "TOP SPEED",
      sublabel: "Aerodynamic Limit",
      description:
        "Aerodynamically stabilized ground-effect envelope engineered for high-speed stability.",
    },
    {
      id: "torque",
      value: 1100,
      suffix: " NM",
      label: "TORQUE",
      sublabel: "Plateau 2,500 - 7,200 RPM",
      description:
        "Direct-response torque delivery channeled through an ultra-fast 8-speed dual-clutch transmission.",
    },
  ] as SpecItem[],

  // 6. Design & Craft Storytelling
  designStory: {
    badge: "AUTOMOTIVE DESIGN & CRAFT",
    headline: "Form Following Physics, Crafted in Carbon",
    paragraphs: [
      "Every contour, vortex generator, and NACA intake on the VELOCE is mathematically calibrated through thousands of hours of computational fluid dynamics and wind tunnel validation.",
      "Rather than adding disruptive oversized wings, the sculpted underbody channels high-velocity air through twin venturi tunnels to create true ground-effect suction.",
    ],
    highlights: [
      {
        title: "Continuous Weave Alignment",
        detail:
          "Symmetrical bookmatched carbon weaves across exterior splitters, doors, and side strakes.",
      },
      {
        title: "Thermal Management Louvers",
        detail:
          "Top-mounted chimneys venting 1,000°C exhaust heat safely away from downforce surfaces.",
      },
      {
        title: "Titanium Resonance Headers",
        detail:
          "Equal-length Inconel and titanium manifolds tuned for an unmistakable high-frequency acoustic pitch.",
      },
    ],
  },

  // 7. Wheels & Engine Breakdown (Authentic to Clip4)
  wheelsAndEngine: {
    badge: "UNSPRUNG MASS & COMBUSTION FURY",
    headline: "Forged Center-Lock Wheels & High-Revving V8",
    subheadline:
      "Captured during track tire stress testing: lightweight monolithic center-lock wheels, carbon-silicon ceramic rotors, and uncompromised combustion fury.",
    engineDetails: [
      { label: "Bore x Stroke", value: "86.0 x 86.0 mm" },
      { label: "Compression Ratio", value: "9.8:1 High-Boost" },
      { label: "Lubrication", value: "Dry Sump 5-Stage Scavenge" },
      { label: "Redline", value: "9,200 RPM" },
    ],
  },

  // 8. Interior Cockpit (Authentic to Clip3 Front Canopy Push-In)
  interior: {
    badge: "THE COCKPIT EXPERIENCE",
    headline: "Tactile Ergonomics Engineered for Control",
    description:
      "Stripped of needless distractions. An ultra-rigid monocoque-integrated seating position, lightweight steering yoke with integrated controls, and race-grade telemetry visualization.",
    features: [
      {
        title: "Direct-to-Chassis Seating",
        desc: "Zero-compliance structural mounts transmitting micro-vibrations from all four wheels directly to the driver.",
      },
      {
        title: "Motorsport Steering Yoke",
        desc: "Integrated shift indicators, rotary differential controls, and instant aerodynamic triggers at finger reach.",
      },
      {
        title: "Head-Up Telemetry Display",
        desc: "Real-time tire temperature distribution, G-meter tracking, and lap telemetry projected into line of sight.",
      },
    ],
  },

  // 9. Gallery Rail (Using all real clips)
  gallery: [
    {
      id: "gal-1",
      title: "360° Aerodynamic Orbit",
      category: "AERODYNAMICS",
      aspect: "landscape",
      videoSrc: "/video/Clip1-360orbit.mp4",
      description: "Low-drag silhouette optimized for high-speed stability and downforce balance.",
    },
    {
      id: "gal-2",
      title: "Side Tracking Profile",
      category: "EXTERIOR PROFILE",
      aspect: "landscape",
      videoSrc: "/video/Clip2Side-tracking.mp4",
      description: "Aggressive raked beltline flowing into functional active side intakes.",
    },
    {
      id: "gal-3",
      title: "Front Canopy Intrusion",
      category: "COCKPIT & FASCIA",
      aspect: "landscape",
      videoSrc: "/video/Clip3Front-push-in.mp4",
      description: "Sleek teardrop canopy tapering into forward aero channels.",
    },
    {
      id: "gal-4",
      title: "High-RPM Burnout",
      category: "DYNAMICS & TORQUE",
      aspect: "landscape",
      videoSrc: "/video/Clip4Wheel+burnout.mp4",
      description: "1,100 Nm overcoming friction in instant combustion release.",
    },
    {
      id: "gal-5",
      title: "Rear Horizon OLED Blade",
      category: "LIGHTING & DIFFUSER",
      aspect: "landscape",
      videoSrc: "/video/Clip5Rear-taillights.mp4",
      description: "Continuous light blade illuminating the sculpted carbon diffuser channels.",
    },
    {
      id: "gal-6",
      title: "Top-Down Dispatch",
      category: "TRACK DISPATCH",
      aspect: "landscape",
      videoSrc: "/video/Clip6Top-down+drive away.mp4",
      description: "Overhead view demonstrating continuous airflow convergence over the rear wing.",
    },
  ] as GalleryItem[],

  // 10. Models & Pricing (Refined luxury presentation)
  models: [
    {
      id: "pura",
      name: "VELOCE PURA",
      badge: "ROAD HOMOLOGATION",
      price: "$2,850,000",
      production: "Strictly limited to 49 units",
      power: "1,050 HP",
      acceleration: "2.6s (0-100 km/h)",
      topSpeed: "340 km/h",
      weight: "1,220 kg",
      features: [
        "Full exposed gloss carbon-fiber tub",
        "Adaptive magnetic damper suspension",
        "Fine Nappa leather & titanium cabin accents",
        "Carbon-ceramic 410mm brake system",
        "Bespoke Veloce custom luggage set",
      ],
      highlight: false,
    },
    {
      id: "speciale",
      name: "VELOCE SPECIALE",
      badge: "THE DEFINITIVE APEX",
      price: "$3,450,000",
      production: "Strictly limited to 25 units",
      power: "1,200 HP",
      acceleration: "2.4s (0-100 km/h)",
      topSpeed: "350+ km/h",
      weight: "1,180 kg",
      features: [
        "Twin-turbo high-flow hybrid spools",
        "Dual-plane active DRS carbon rear wing",
        "Racing orange livery accent details",
        "Lightweight forged center-lock wheels",
        "Titanium center-lock wheel nuts",
        "Factory trackside telemetry recording system",
      ],
      highlight: true,
    },
    {
      id: "corsa",
      name: "VELOCE CORSA",
      badge: "CIRCUIT PROTOTYPE",
      price: "$4,200,000",
      production: "Strictly limited to 10 units",
      power: "1,350 HP",
      acceleration: "2.1s (0-100 km/h)",
      topSpeed: "370+ km/h",
      weight: "1,040 kg",
      features: [
        "FIA homologated carbon safety cell",
        "Pneumatic air-jack lifting system",
        "Bespoke track-slick suspension geometry",
        "Lightweight unsuppressed Inconel exhaust",
        "Factory VIP circuit testing days included",
      ],
      highlight: false,
    },
  ] as TrimModel[],

  footer: {
    contactEmail: "allocations@veloce-hypercars.com",
    headquarters: "VELOCE ADVANCED VEHICLE OPERATIONS, MODENA / STUTTGART",
    socials: [
      { name: "Instagram", href: "https://instagram.com" },
      { name: "YouTube", href: "https://youtube.com" },
      { name: "X", href: "https://x.com" },
      { name: "LinkedIn", href: "https://linkedin.com" },
    ],
    legal: "© 2026 VELOCE AUTOMOBILI S.P.A. ALL RIGHTS RESERVED.",
  },
};
