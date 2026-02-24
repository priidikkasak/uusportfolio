"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projects";

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
        style={{ background: "#050505", boxShadow: "inset 0 0 0 1px #161616" }}
        aria-label="Stealth project — coming soon"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-15" aria-hidden="true">
          <rect x="1" y="1" width="18" height="18" stroke="#888" strokeWidth="1" strokeDasharray="3 2" />
        </svg>
        <p className="text-[#252525] text-[9px] tracking-[0.25em] uppercase font-medium mt-3">Coming soon</p>
      </motion.div>
    );
  }

  return (
    <motion.div variants={cardVariants}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={`Open details for ${project.name}`}
        className="w-full aspect-[4/3] flex items-center justify-center p-10 outline-none cursor-pointer"
        style={{
          background: "#050505",
          boxShadow: hovered ? "inset 0 0 0 1px #484848" : "inset 0 0 0 1px #161616",
          transition: "box-shadow 0.25s ease",
        }}
      >
        {project.logo && (
          <div
            className="relative w-full h-full"
            style={{
              opacity: hovered ? 1 : 0.75,
              transition: "opacity 0.25s ease",
            }}
          >
            <Image
              src={project.logo}
              alt={project.name ?? "Project logo"}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={100}
            />
          </div>
        )}
      </button>
    </motion.div>
  );
}
