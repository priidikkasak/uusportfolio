"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { about } from "@/data/projects";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="about-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="about-modal"
            role="dialog"
            aria-modal="true"
            aria-label="About me"
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none"
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              style={{
                background: "#090909",
                border: "1px solid #1e1e1e",
                boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
              }}
            >
              {/* Header with close */}
              <div className="flex justify-end px-5 py-4 border-b border-[#111]">
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="p-1.5 text-[#444] hover:text-[#888] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#333]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Content layout: photo + bio */}
              <div className="flex flex-col md:flex-row">
                {/* Photo column */}
                <div className="md:w-52 shrink-0 p-8 md:p-8 flex md:flex-col items-start gap-5">
                  <div className="relative shrink-0 w-20 h-20 md:w-36 md:h-36 rounded-full overflow-hidden ring-1 ring-[#444]">
                    <Image
                      src={about.photo}
                      alt={about.name}
                      fill
                      className="object-cover scale-110"
                      sizes="(max-width: 768px) 80px, 144px"
                      priority
                    />
                  </div>
                  <div className="md:mt-2">
                    <p
                      className="text-[13px] font-semibold text-[#d0d0d0]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {about.name}
                    </p>
                    <p className="text-[10px] text-[#444] tracking-widest mt-1 uppercase">
                      {about.tagline}
                    </p>
                  </div>
                </div>

                {/* Vertical divider (desktop) */}
                <div className="hidden md:block w-px bg-[#141414] self-stretch" />
                {/* Horizontal divider (mobile) */}
                <div className="md:hidden h-px mx-8 bg-[#141414]" />

                {/* Bio column */}
                <div className="flex-1 p-8 space-y-7 overflow-y-auto">
                  {/* Bio */}
                  <div>
                    <p className="text-[12px] text-[#777] leading-[1.9]">{about.bio}</p>
                  </div>

                  {/* Strengths */}
                  <div>
                    <h3 className="text-[9px] tracking-[0.22em] uppercase text-[#333] font-medium mb-3">
                      Strengths
                    </h3>
                    <ul className="space-y-1.5">
                      {about.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-3 text-[11px] text-[#606060] leading-relaxed">
                          <span className="mt-2 shrink-0 w-0.5 h-0.5 rounded-full bg-[#333]" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What I'm building */}
                  <div>
                    <h3 className="text-[9px] tracking-[0.22em] uppercase text-[#333] font-medium mb-3">
                      Currently Building
                    </h3>
                    <ul className="space-y-1.5">
                      {about.building.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-[11px] text-[#606060] leading-relaxed">
                          <span className="mt-2 shrink-0 w-0.5 h-0.5 rounded-full bg-[#333]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Looking for */}
                  <div>
                    <h3 className="text-[9px] tracking-[0.22em] uppercase text-[#333] font-medium mb-3">
                      Looking For
                    </h3>
                    <ul className="space-y-1.5">
                      {about.lookingFor.map((l, i) => (
                        <li key={i} className="flex items-start gap-3 text-[11px] text-[#606060] leading-relaxed">
                          <span className="mt-2 shrink-0 w-0.5 h-0.5 rounded-full bg-[#555]" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer: availability + contacts */}
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-8 py-5 border-t border-[#141414]"
              >
                <p className="text-[10px] text-[#3a3a3a] tracking-widest uppercase">
                  Open for partnerships and acquisitions.
                </p>
                <div className="flex items-center gap-5">
                  <a
                    href={`mailto:${about.email}`}
                    className="text-[11px] text-[#555] hover:text-[#888] transition-colors outline-none focus-visible:underline"
                  >
                    {about.email}
                  </a>
                  <a
                    href={about.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-[#555] hover:text-[#888] transition-colors outline-none focus-visible:underline"
                  >
                    LinkedIn
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
