"use client";

import React, { useState, useEffect } from "react";
import { siteConfig, TrimModel } from "@/config/site";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrim?: TrimModel | null;
}

export default function ReserveModal({
  isOpen,
  onClose,
  initialTrim,
}: ReserveModalProps) {
  const [selectedTrim, setSelectedTrim] = useState<string>("speciale");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [commissionId, setCommissionId] = useState("");

  useEffect(() => {
    if (initialTrim) {
      setSelectedTrim(initialTrim.id);
    }
  }, [initialTrim]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setCommissionId(`VELOCE-ALLOC-2026-${randomNum}`);
    setSubmitted(true);
  };

  const currentTrimObj =
    siteConfig.models.find((t) => t.id === selectedTrim) || siteConfig.models[1];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Soft Light Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#17191C]/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      {/* Pure White Modal Card */}
      <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-white border border-[#E2E3E0] p-6 sm:p-10 shadow-2xl overflow-hidden text-[#17191C]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#F7F7F5] border border-[#E2E3E0] text-[#686B70] hover:text-[#17191C] hover:border-[#FF5A1F] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF5A1F]/15 text-[#FF5A1F] mb-6 shadow-sm">
              <CheckCircle2 size={36} />
            </div>

            <span className="text-xs font-mono tracking-[0.25em] text-[#FF5A1F] uppercase mb-2 font-bold">
              COMMISSION INTAKE REGISTERED
            </span>

            <h3 className="text-2xl sm:text-3xl font-black font-display text-[#17191C] uppercase mb-4">
              ALLOCATION RESERVED
            </h3>

            <p className="max-w-md text-sm text-[#686B70] leading-relaxed mb-6 font-normal">
              Thank you, {formData.name || "Distinguished Client"}. Your priority allocation reservation for the{" "}
              <span className="text-[#17191C] font-bold">{currentTrimObj.name}</span> has been
              logged into the factory escrow allocation queue.
            </p>

            <div className="p-4 rounded-xl bg-[#F7F7F5] border border-[#E2E3E0] mb-8 w-full max-w-md">
              <span className="block text-[10px] font-mono tracking-widest text-[#686B70] uppercase">
                CONFIDENTIAL ALLOCATION CODE
              </span>
              <span className="text-lg font-mono font-bold text-[#FF5A1F] tracking-widest mt-1 block">
                {commissionId}
              </span>
            </div>

            <MagneticButton variant="primary" size="md" onClick={onClose}>
              Return to Showcase
            </MagneticButton>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF5A1F] uppercase font-bold block mb-1">
                OFFICIAL COMMISSION INTAKE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-[#17191C] uppercase">
                RESERVE YOUR VELOCE
              </h3>
              <p className="text-xs sm:text-sm text-[#686B70] mt-1 font-normal">
                Select your preferred build specification and provide confidential dispatch coordinates.
              </p>
            </div>

            {/* Trim Selection Tabs */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8">
              {siteConfig.models.map((trim) => {
                const isSelected = selectedTrim === trim.id;
                return (
                  <button
                    key={trim.id}
                    type="button"
                    onClick={() => setSelectedTrim(trim.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#FF5A1F]/10 border-[#FF5A1F] shadow-sm"
                        : "bg-[#F7F7F5] border-[#E2E3E0] hover:border-[#D1D3CE]"
                    }`}
                  >
                    <span className="block text-[9px] font-mono tracking-wider text-[#FF5A1F] uppercase font-bold">
                      {trim.name.split(" ")[1]}
                    </span>
                    <span className="block text-xs sm:text-sm font-bold font-display text-[#17191C] mt-0.5">
                      {trim.price}
                    </span>
                    <span className="block text-[10px] font-mono text-[#686B70] mt-0.5">
                      {trim.power}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Intake Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-[#686B70] mb-1.5 font-bold">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Julian Vance"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E2E3E0] text-xs text-[#17191C] placeholder-[#686B70]/60 focus:outline-none focus:border-[#FF5A1F] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-[#686B70] mb-1.5 font-bold">
                    Confidential Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@private.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E2E3E0] text-xs text-[#17191C] placeholder-[#686B70]/60 focus:outline-none focus:border-[#FF5A1F] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-[#686B70] mb-1.5 font-bold">
                    Phone / Signal
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E2E3E0] text-xs text-[#17191C] placeholder-[#686B70]/60 focus:outline-none focus:border-[#FF5A1F] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-[#686B70] mb-1.5 font-bold">
                    Country of Homologation
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Switzerland / USA"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E2E3E0] text-xs text-[#17191C] placeholder-[#686B70]/60 focus:outline-none focus:border-[#FF5A1F] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest uppercase text-[#686B70] mb-1.5 font-bold">
                  Bespoke Requests & Delivery Circuit
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Custom livery, VIP delivery circuit preference, bespoke telemetry requests..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E2E3E0] text-xs text-[#17191C] placeholder-[#686B70]/60 focus:outline-none focus:border-[#FF5A1F] transition-colors resize-none"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[10px] font-mono text-[#686B70]">
                  Requires refundable escrow confirmation upon review.
                </span>
                <MagneticButton variant="primary" size="md" type="submit">
                  <span>Submit Reservation</span>
                  <ArrowRight size={14} />
                </MagneticButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
