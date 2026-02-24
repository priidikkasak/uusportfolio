"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

export default function ProjectGrid() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="px-6 md:px-12 lg:px-20 pb-32">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-[11px] tracking-[0.25em] uppercase text-[#444444] font-medium mb-12"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Selected Projects
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#111111]"
        style={{ border: "1px solid #111111" }}
      >
        {projects.map((project, i) => (
          <div key={project.id} className="bg-[#050505]">
            <ProjectCard
              project={project}
              index={i}
              onClick={() => {
                if (project.name !== null) setSelected(project);
              }}
            />
          </div>
        ))}
      </motion.div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
