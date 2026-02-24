"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projects";

const TAG_COLORS: Record<string, { text: string; bg: string }> = {
  Live:          { text: "#a8e6a3", bg: "rgba(168,230,163,0.08)" },
  "In progress": { text: "#f5d77a", bg: "rgba(245,215,122,0.08)" },
  Private:       { text: "#888888", bg: "rgba(136,136,136,0.08)" },
};

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isOpen = project !== null;

  useEffect(() => {
    if (!isOpen) return;
    const modal = modalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    first?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first?.focus();
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

  const tagStyle = project
    ? (TAG_COLORS[project.tag] ?? TAG_COLORS["Private"])
    : TAG_COLORS["Private"];

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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal — bottom sheet on mobile, centered on desktop */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Details for ${project.name}`}
            ref={modalRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 pointer-events-none
                       sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-6"
          >
            <div
              className="relative w-full pointer-events-auto overflow-hidden
                         rounded-t-2xl sm:rounded-none
                         max-h-[92dvh] sm:max-h-[88vh]
                         sm:max-w-lg
                         flex flex-col"
              style={{
                background: "#0a0a0a",
                border: "1px solid #1e1e1e",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.6), 0 32px 80px rgba(0,0,0,0.9)",
              }}
            >
              {/* Drag handle — mobile only */}
              <div className="flex justify-center pt-3 pb-1 sm:hidden" aria-hidden="true">
                <div className="w-9 h-1 rounded-full bg-[#2a2a2a]" />
              </div>

              {/* Logo hero */}
              <div
                className="relative flex items-center justify-center px-8 py-4 sm:py-5"
                style={{
                  background: "linear-gradient(160deg, #111 0%, #0a0a0a 100%)",
                  borderBottom: "1px solid #161616",
                }}
              >
                {/* Subtle accent glow behind logo */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 60% 70% at 50% 60%, ${project.accent}10 0%, transparent 70%)`,
                  }}
                  aria-hidden="true"
                />

                {project.logo ? (
                  <div className="relative w-[85%] h-32 sm:h-44">
                    <Image
                      src={project.logo}
                      alt={project.name ?? ""}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 85vw, 460px"
                      quality={100}
                      priority
                    />
                  </div>
                ) : (
                  <span
                    className="text-2xl font-semibold text-[#e8e8e8]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {project.name}
                  </span>
                )}

                {/* Close button — top right */}
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute top-4 right-4 p-2 text-[#444] hover:text-[#aaa] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#333] rounded-full hover:bg-[#151515]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>

                {/* Tag — bottom right of logo hero */}
                <span
                  className="absolute bottom-4 right-4 text-[9px] px-2.5 py-1 tracking-[0.15em] uppercase font-medium rounded-sm"
                  style={{ color: tagStyle.text, background: tagStyle.bg }}
                >
                  {project.tag}
                </span>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto flex-1 overscroll-contain">
                <div className="px-6 py-5 space-y-5">
                  {/* Description — label-above sections */}
                  {project.description.split("\n\n").map((para, i) => {
                    const colonIdx = para.indexOf(":");
                    const hasLabel = colonIdx > 0 && colonIdx < 16;
                    if (hasLabel) {
                      const label = para.slice(0, colonIdx).trim();
                      const body = para.slice(colonIdx + 1).trim();
                      return (
                        <div key={i} className="space-y-1.5">
                          <p className="text-[9px] tracking-[0.22em] uppercase text-[#444] font-medium">{label}</p>
                          <p className="text-[13px] text-[#909090] leading-[1.75]">{body}</p>
                        </div>
                      );
                    }
                    return (
                      <p key={i} className="text-[14px] text-[#c8c8c8] leading-[1.7] font-medium">
                        {para}
                      </p>
                    );
                  })}

                  {/* Role */}
                  {project.myRole.length > 0 && (
                    <div>
                      <h3 className="text-[9px] tracking-[0.22em] uppercase text-[#383838] font-medium mb-3">
                        My Role
                      </h3>
                      <ul className="space-y-2.5">
                        {project.myRole.map((r, i) => (
                          <li key={i} className="flex items-start gap-3 text-[12px] text-[#606060] leading-relaxed">
                            <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-[#2e2e2e]" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Highlights */}
                  {project.highlights.length > 0 && (
                    <div>
                      <h3 className="text-[9px] tracking-[0.22em] uppercase text-[#383838] font-medium mb-3">
                        Key Highlights
                      </h3>
                      <ul className="space-y-2.5">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-3 text-[12px] text-[#606060] leading-relaxed">
                            <span
                              className="mt-2 shrink-0 w-1 h-1 rounded-full"
                              style={{ background: project.accent + "99" }}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 px-6 py-4 border-t border-[#141414] bg-[#0a0a0a]">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-[11px] font-semibold tracking-[0.06em] uppercase text-[#050505] bg-white hover:bg-[#e0e0e0] active:scale-[0.98] transition-all outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Visit {project.name}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="flex items-center justify-center px-5 py-3 text-[11px] font-medium tracking-[0.06em] uppercase text-[#555] hover:text-[#888] border border-[#1e1e1e] hover:border-[#2a2a2a] active:scale-[0.98] transition-all outline-none focus-visible:ring-1 focus-visible:ring-[#333] rounded-sm"
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
