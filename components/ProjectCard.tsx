"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projects";

const TAG_COLORS: Record<string, { text: string; border: string }> = {
  Live: { text: "#a8e6a3", border: "#2a4a27" },
  "In progress": { text: "#f5d77a", border: "#4a3a0f" },
  Private: { text: "#888888", border: "#2a2a2a" },
};

interface Props {
  project: Project;
  index: number;
  onClick: () => void;
}

function CornerAccents({ hovered }: { hovered: boolean }) {
  const color = hovered ? "#555555" : "#202020";
  const size = "14px";
  const border = `1px solid ${color}`;
  const t = "border-color 0.3s ease";
  return (
    <>
      <span className="absolute top-0 left-0 pointer-events-none" style={{ width: size, height: size, borderTop: border, borderLeft: border, transition: t }} />
      <span className="absolute top-0 right-0 pointer-events-none" style={{ width: size, height: size, borderTop: border, borderRight: border, transition: t }} />
      <span className="absolute bottom-0 left-0 pointer-events-none" style={{ width: size, height: size, borderBottom: border, borderLeft: border, transition: t }} />
      <span className="absolute bottom-0 right-0 pointer-events-none" style={{ width: size, height: size, borderBottom: border, borderRight: border, transition: t }} />
    </>
  );
}

export default function ProjectCard({ project, index, onClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const isStealthTile = project.logo === null && project.name === null;

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  if (isStealthTile) {
    return (
      <motion.div
        variants={cardVariants}
        className="relative aspect-[4/3] flex flex-col items-center justify-center p-8 cursor-default select-none"
        style={{ border: "1px dashed #1e1e1e", background: "#060606" }}
        aria-label="Stealth project — coming soon"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="mb-4 opacity-20" aria-hidden="true">
          <rect x="1" y="1" width="26" height="26" rx="2" stroke="#888" strokeWidth="1" />
          <circle cx="14" cy="14" r="4" stroke="#888" strokeWidth="1" />
        </svg>
        <p className="text-[#2e2e2e] text-[10px] tracking-[0.22em] uppercase font-medium">Stealth</p>
        <p className="text-[#252525] text-[10px] mt-1 tracking-widest">Coming soon</p>
      </motion.div>
    );
  }

  const tagStyle = TAG_COLORS[project.tag] ?? TAG_COLORS["Private"];

  return (
    <motion.div variants={cardVariants} className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={`Open details for ${project.name}`}
        className="relative w-full aspect-[4/3] flex flex-col p-7 text-left outline-none focus-visible:ring-1 focus-visible:ring-[#333] cursor-pointer"
        style={{
          background: hovered ? "#0c0c0c" : "#070707",
          border: `1px solid ${hovered ? "#2a2a2a" : "#151515"}`,
          boxShadow: hovered
            ? "0 0 48px rgba(255,255,255,0.015), 0 8px 40px rgba(0,0,0,0.6)"
            : "none",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <CornerAccents hovered={hovered} />

        {/* Logo area */}
        <div className="flex-1 flex items-start justify-start mb-5">
          {project.logo ? (
            <div className="relative h-9 w-full max-w-[160px]">
              <Image
                src={project.logo}
                alt={project.name ?? "Project logo"}
                fill
                className="object-contain object-left"
                sizes="160px"
              />
            </div>
          ) : (
            <div className="h-8 w-8 rounded" style={{ background: project.accent + "22" }} />
          )}
        </div>

        {/* Name + tag + one-liner */}
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <h3
              className="text-[13px] font-semibold text-[#d8d8d8] tracking-wide"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {project.name}
            </h3>
            <span
              className="text-[9px] px-2 py-0.5 border tracking-[0.15em] uppercase font-medium"
              style={{ color: tagStyle.text, borderColor: tagStyle.border }}
            >
              {project.tag}
            </span>
          </div>
          <p className="text-[11px] text-[#484848] leading-relaxed line-clamp-2">
            {project.oneLiner}
          </p>
        </div>
      </button>
    </motion.div>
  );
}
