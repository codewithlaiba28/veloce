"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const footer = siteConfig.footer;

  return (
    <footer className="relative w-full bg-[#ECEDEA] text-[#686B70] pt-24 pb-14 px-6 lg:px-12 border-t border-[#E2E3E0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E2E3E0]">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link
                href="#hero"
                className="group flex items-center gap-2.5 text-3xl font-black tracking-[0.25em] text-[#17191C] font-display hover:text-[#FF5A1F] transition-colors"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A1F] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5A1F]" />
                </span>
                <span>{siteConfig.brand.name}</span>
              </Link>

              <p className="max-w-sm text-xs sm:text-sm text-[#686B70] mt-4 leading-relaxed font-normal">
                {siteConfig.brand.subheadline}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-[#686B70]">
              <MapPin size={14} className="text-[#FF5A1F]" />
              <span>{footer.headquarters}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono tracking-[0.25em] text-[#17191C] uppercase mb-4 font-bold">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
              {siteConfig.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-[#17191C] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono tracking-[0.25em] text-[#17191C] uppercase mb-4 font-bold">
              FACTORY INTELLIGENCE
            </h4>
            <p className="text-xs text-[#686B70] mb-4 leading-relaxed">
              Subscribe for confidential build bulletins, private viewing invitations, and track testing reports.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-white border border-[#FF5A1F]/40 text-[#17191C] text-xs font-mono shadow-luxury-sm">
                <CheckCircle2 size={16} className="text-[#FF5A1F]" />
                <span>CONFIDENTIAL BULLETIN SUBSCRIPTION CONFIRMED.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter official email..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E3E0] text-xs text-[#17191C] placeholder-[#686B70]/60 focus:outline-none focus:border-[#FF5A1F] shadow-luxury-sm transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#FF5A1F] text-white font-bold text-xs hover:bg-[#ff6933] transition-colors flex items-center justify-center shadow-md cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-6">
              {footer.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-[#686B70] hover:text-[#17191C] transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#686B70] gap-4">
          <p>{footer.legal}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#17191C] cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-[#17191C] cursor-pointer">TERMS OF COMMISSION</span>
            <span className="hover:text-[#17191C] cursor-pointer">HOMOLOGATION DOCS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
