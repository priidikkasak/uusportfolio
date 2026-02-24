"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projects";

const TAG_COLORS: Record<string, { text: string; border: string }> = {
  Live: { text: "#a8e6a3", border: "#2a4a27" },
  "In progress": { text: "#f5d77a", border: "#4a3a0f" },
  Private: { text: "#888888", border: "#2a2a2a" },
};

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isOpen = project !== null;

  // Focus trap + ESC key + scroll lock
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

  const tagStyle = project ? (TAG_COLORS[project.tag] ?? TAG_COLORS["Private"]) : TAG_COLORS["Private"];

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Details for ${project.name}`}
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none"
          >
            <div
              className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto pointer-events-auto"
              style={{
                background: "#090909",
                border: "1px solid #1e1e1e",
                boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-8 pb-6">
                <div className="flex items-center gap-5 flex-1 min-w-0">
                  {project.logo && (
                    <div className="relative shrink-0 h-8 w-28">
                      <Image
                        src={project.logo}
                        alt={project.name ?? ""}
                        fill
                        className="object-contain object-left"
                        sizes="112px"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h2
                      className="text-[15px] font-semibold text-[#e8e8e8] truncate"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {project.name}
                    </h2>
                    <span
                      className="text-[9px] px-2 py-0.5 border tracking-[0.15em] uppercase font-medium mt-1.5 inline-block"
                      style={{ color: tagStyle.text, borderColor: tagStyle.border }}
                    >
                      {project.tag}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="shrink-0 ml-4 p-1.5 text-[#444] hover:text-[#888] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#333]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Divider */}
              <div className="h-px mx-8 bg-[#141414]" />

              {/* Body */}
              <div className="p-8 space-y-7">
                {/* Description */}
                <p className="text-[13px] text-[#888888] leading-[1.8]">
                  {project.description}
                </p>

                {/* Role */}
                {project.myRole.length > 0 && (
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#3a3a3a] font-medium mb-3">
                      My Role
                    </h3>
                    <ul className="space-y-2">
                      {project.myRole.map((r, i) => (
                        <li key={i} className="flex items-start gap-3 text-[12px] text-[#707070] leading-relaxed">
                          <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[#333333]" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Highlights */}
                {project.highlights.length > 0 && (
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#3a3a3a] font-medium mb-3">
                      Key Highlights
                    </h3>
                    <ul className="space-y-2">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-[12px] text-[#707070] leading-relaxed">
                          <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full" style={{ background: project.accent + "aa" }} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 px-8 py-6 border-t border-[#141414]">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 text-[11px] font-medium tracking-wide text-[#050505] bg-[#e0e0e0] hover:bg-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#666]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Visit Project
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-[11px] font-medium tracking-wide text-[#555] hover:text-[#888] border border-[#1e1e1e] hover:border-[#2a2a2a] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#333]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
