"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projects";

const TAG_COLORS: Record<string, { text: string; border: string }> = {
  Live: { text: "#a8e6a3", border: "#2a4a27" },
  "In progress": { text: "#f5d77a", border: "#4a3a0f" },
  Private: { text: "#666666", border: "#222222" },
};

interface Props {
  project: Project;
  index: number;
  onClick: () => void;
}

export default function ProjectCard({ project, index, onClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const isStealthTile = project.logo === null && project.name === null;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  if (isStealthTile) {
    return (
      <motion.div
        variants={cardVariants}
        className="aspect-[4/3] flex flex-col items-center justify-center cursor-default select-none"
        style={{
          background: "#050505",
          boxShadow: "inset 0 0 0 1px #161616",
        }}
        aria-label="Stealth project — coming soon"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mb-3 opacity-15" aria-hidden="true">
          <rect x="1" y="1" width="18" height="18" stroke="#888" strokeWidth="1" strokeDasharray="3 2" />
        </svg>
        <p className="text-[#282828] text-[9px] tracking-[0.25em] uppercase font-medium">Stealth</p>
        <p className="text-[#1e1e1e] text-[9px] mt-0.5 tracking-widest">Coming soon</p>
      </motion.div>
    );
  }

  const tagStyle = TAG_COLORS[project.tag] ?? TAG_COLORS["Private"];

  return (
    <motion.div variants={cardVariants}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={`Open details for ${project.name}`}
        className="w-full aspect-[4/3] flex flex-col p-7 text-left outline-none cursor-pointer"
        style={{
          background: "#050505",
          // All 4 sides activate simultaneously via inset box-shadow
          boxShadow: hovered
            ? "inset 0 0 0 1px #484848"
            : "inset 0 0 0 1px #161616",
          transition: "box-shadow 0.25s ease",
        }}
      >
        {/* Logo area */}
        <div className="flex-1 flex items-start justify-start mb-6">
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
            <div className="h-8 w-8" style={{ background: project.accent + "22" }} />
          )}
        </div>

        {/* Name + tag + one-liner */}
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <h3
              className="text-[13px] font-semibold tracking-wide"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: hovered ? "#e8e8e8" : "#c8c8c8",
                transition: "color 0.25s ease",
              }}
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
          <p className="text-[11px] text-[#3e3e3e] leading-relaxed line-clamp-2">
            {project.oneLiner}
          </p>
        </div>
      </button>
    </motion.div>
  );
}
