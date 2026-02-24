"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectGrid from "@/components/ProjectGrid";
import AboutModal from "@/components/AboutModal";
import { about } from "@/data/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505]">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Subtle dot-grid on the right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,0,0,0.5) 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,0,0,0.5) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Ambient glow */}
        <div
          className="absolute top-1/3 left-1/4 w-[600px] h-[400px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.012) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative w-full px-6 md:px-12 lg:px-20 py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Eyebrow */}
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-[10px] tracking-[0.3em] uppercase text-[#383838] mb-8 font-medium"
            >
              Portfolio
            </motion.p>

            {/* Headline */}
            <motion.h1
              custom={0.1}
              variants={fadeUp}
              className="text-[36px] sm:text-[48px] lg:text-[56px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#e8e8e8] mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Operator-grade
              <br />
              <span className="text-[#3a3a3a]">portfolio.</span>{" "}
              Built to scale.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              custom={0.2}
              variants={fadeUp}
              className="text-[14px] text-[#505050] leading-[1.8] max-w-md mb-12"
            >
              Ventures built for compounding returns — across iGaming,
              infrastructure, and high-margin digital products.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={0.3}
              variants={fadeUp}
              className="flex items-center gap-4 flex-wrap"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-[11px] font-semibold tracking-[0.08em] uppercase text-[#050505] bg-[#d8d8d8] hover:bg-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#555]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                View Projects
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M5 1v8M1 5l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <button
                onClick={() => setAboutOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-medium tracking-[0.08em] uppercase text-[#555] border border-[#1e1e1e] hover:border-[#2e2e2e] hover:text-[#888] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#333]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                About Me
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom separator */}
        <div className="absolute bottom-0 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 h-px bg-[#111]" aria-hidden="true" />
      </section>

      {/* ── Projects ── */}
      <ProjectGrid />

      {/* ── Footer ── */}
      <footer className="px-6 md:px-12 lg:px-20 py-12 border-t border-[#0e0e0e]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[10px] text-[#2a2a2a] tracking-widest uppercase">
            © {new Date().getFullYear()} {about.name}
          </p>
          <p className="text-[10px] text-[#2a2a2a] tracking-widest uppercase">
            Open to serious partnerships.
          </p>
        </div>
      </footer>

      {/* About Modal */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </main>
  );
}
