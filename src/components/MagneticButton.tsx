"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Subtle luxury magnetic dampening
    const deltaX = (clientX - centerX) * 0.22;
    const deltaY = (clientY - centerY) * 0.22;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      "bg-[#FF5A1F] text-white font-bold shadow-[0_8px_24px_-4px_rgba(255,90,31,0.38)] hover:shadow-[0_12px_32px_-4px_rgba(255,90,31,0.52)] hover:bg-[#ff6933] border border-[#FF5A1F]",
    secondary:
      "bg-white text-[#17191C] border border-[#E2E3E0] hover:border-[#FF5A1F] hover:text-[#FF5A1F] shadow-[0_2px_8px_-2px_rgba(23,25,28,0.06),0_0_0_1px_rgba(23,25,28,0.04)] hover:shadow-[0_8px_24px_-4px_rgba(23,25,28,0.08)]",
    ghost:
      "bg-transparent text-[#686B70] hover:text-[#17191C] border border-transparent hover:border-[#E2E3E0]",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs tracking-wider",
    md: "px-6 py-3 text-xs sm:text-sm tracking-widest",
    lg: "px-8 py-4 text-sm sm:text-base tracking-widest font-bold",
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? "transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1)" : "none",
      }}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full uppercase font-display transition-all will-change-transform cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {/* Light sheen reflection on hover */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
