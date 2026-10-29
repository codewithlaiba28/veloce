"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import MagneticButton from "./MagneticButton";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenReserve?: () => void;
}

export default function Navbar({ onOpenReserve }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Links explicitly matching requirements: Performance, Design, Gallery, Models, Reserve
  const navLinks = [
    { label: "Performance", href: "#performance" },
    { label: "Design", href: "#design" },
    { label: "Engineering", href: "#engineering" },
    { label: "Gallery", href: "#gallery" },
    { label: "Models", href: "#models" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-[#F7F7F5]/90 backdrop-blur-md border-b border-[#E2E3E0] shadow-[0_4px_24px_-4px_rgba(23,25,28,0.05)] py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Brand Logo */}
          <Link
            href="#hero"
            className="group flex items-center gap-2.5 text-2xl font-black tracking-[0.25em] text-[#17191C] font-display transition-colors hover:text-[#FF5A1F]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A1F] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5A1F]" />
            </span>
            <span className="tracking-widest">{siteConfig.brand.name}</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-xs font-semibold uppercase tracking-[0.2em] text-[#686B70] transition-colors hover:text-[#17191C]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Reserve CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <MagneticButton
              variant="secondary"
              size="sm"
              onClick={onOpenReserve}
              className="text-xs tracking-wider"
            >
              Reserve
            </MagneticButton>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-[#17191C] hover:text-[#FF5A1F] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#F7F7F5]/98 backdrop-blur-2xl transition-all duration-500 md:hidden flex flex-col justify-center px-8 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-6 text-center">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-bold uppercase tracking-[0.2em] text-[#17191C] hover:text-[#FF5A1F] transition-colors font-display"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-6">
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenReserve) onOpenReserve();
              }}
              className="w-full"
            >
              Reserve Allocation
            </MagneticButton>
          </div>
        </div>
      </div>
    </>
  );
}
