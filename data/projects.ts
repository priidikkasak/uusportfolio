export type ProjectTag = "Live" | "In progress" | "Private";

export interface Project {
  id: string;
  name: string | null;
  logo: string | null;
  tag: ProjectTag;
  oneLiner: string;
  description: string;
  myRole: string[];
  highlights: string[];
  link: string;
  accent: string;
}

export interface AboutData {
  name: string;
  photo: string;
  tagline: string;
  bio: string;
  strengths: string[];
  building: string[];
  lookingFor: string[];
  email: string;
  linkedin: string;
}

// -----------------------------------------------------------------
// Replace logo paths with actual filenames in /public/logos/
// Replace placeholder text with your real project info
// -----------------------------------------------------------------
export const projects: Project[] = [
  {
    id: "project-1",
    name: "[Project Name]",           // ← replace
    logo: "/logos/logo1.png",         // ← file in /public/logos/
    tag: "Live",
    oneLiner: "Replace with your one-liner.",
    description:
      "Replace with a concise, confident description of this venture. What problem does it solve? What makes it defensible?",
    myRole: [
      "Co-founder & operator",
      "Led product strategy and go-to-market",
      "Built and managed the core team",
    ],
    highlights: [
      "Key metric or achievement goes here",
      "Another significant highlight",
    ],
    link: "https://example.com",      // ← replace
    accent: "#ffffff",
  },
  {
    id: "project-2",
    name: "Algatas",
    logo: "/logos/logo2.png",
    tag: "Live",
    oneLiner: "High-velocity digital infrastructure for serious operators.",
    description:
      "A performance-first platform engineered for operators who move fast. Built on a foundation of reliability, precision tooling, and compounding distribution advantages.",
    myRole: [
      "Co-founder & product lead",
      "Architected core product roadmap from zero to scale",
      "Drove commercial partnerships and distribution strategy",
    ],
    highlights: [
      "Reached operational scale within the first quarter",
      "Built proprietary tooling that reduced operational overhead by 40%",
    ],
    link: "https://example.com",      // ← replace
    accent: "#ff6b35",
  },
  {
    id: "project-3",
    name: "Binckert",
    logo: "/logos/logo3.png",
    tag: "Live",
    oneLiner: "Precision-built systems for institutional-grade outcomes.",
    description:
      "An enterprise-tier platform designed around operator requirements. Binckert delivers structured workflows and data pipelines that eliminate friction at scale.",
    myRole: [
      "Strategic partner & product advisor",
      "Defined core product positioning and market entry thesis",
      "Led enterprise go-to-market strategy",
    ],
    highlights: [
      "Secured first institutional clients within 6 months of launch",
      "Platform processes high-volume structured data pipelines daily",
    ],
    link: "https://example.com",      // ← replace
    accent: "#8b9cff",
  },
  {
    id: "project-4",
    name: "NoRisk Casino",
    logo: "/logos/logo4.png",
    tag: "Live",
    oneLiner: "Performance-oriented iGaming built for informed players.",
    description:
      "A regulated, performance-first iGaming platform built around responsible play, strong unit economics, and an acquisition engine that consistently outperforms market benchmarks.",
    myRole: [
      "Founder & operational lead",
      "Built acquisition and retention systems from the ground up",
      "Managed licensing, compliance, and all vendor relationships",
    ],
    highlights: [
      "Achieved profitability within first operating year",
      "Fully automated player lifecycle management system",
    ],
    link: "https://example.com",      // ← replace
    accent: "#f5a623",
  },
  {
    id: "project-5",
    name: "Legatron",
    logo: "/logos/logo5.png",
    tag: "In progress",
    oneLiner: "Infrastructure layer for next-generation legal operations.",
    description:
      "Legatron is a compound platform for legal-adjacent workflows. Structured data, intelligent automation, and precision tooling for a sector that remains fundamentally underdigitized.",
    myRole: [
      "Founder & product architect",
      "Directing technical development and system design",
      "Defining market entry strategy and vertical focus",
    ],
    highlights: [
      "Proprietary data model with no direct structural competitor",
      "Initial pilots underway with target enterprise segment",
    ],
    link: "https://example.com",      // ← replace
    accent: "#d4a843",
  },
  {
    id: "project-6",
    name: null,   // stealth tile — intentionally empty
    logo: null,
    tag: "Private",
    oneLiner: "Stealth. Active development.",
    description: "",
    myRole: [],
    highlights: [],
    link: "",
    accent: "#444444",
  },
];

// -----------------------------------------------------------------
// Replace all placeholder text with your real bio and contact info
// Drop your photo at /public/me.jpg
// -----------------------------------------------------------------
export const about: AboutData = {
  name: "[Your Name]",                // ← replace
  photo: "/me.jpg",                   // ← drop photo at /public/me.jpg
  tagline: "Founder. Operator. Builder.",
  bio: "I build companies across iGaming, infrastructure, and emerging verticals. My work is defined by a bias toward execution, strong commercial instincts, and a preference for building businesses with structural advantages. I operate across the full stack — from product conception to market entry to scale.",
  strengths: [
    "Commercial architecture and go-to-market design",
    "Building operational systems that compound over time",
    "Identifying underserved verticals before they become obvious",
    "Cross-functional leadership at early and growth stages",
  ],
  building: [
    "Scalable platforms with defensible data and distribution moats",
    "Ventures positioned at the intersection of regulation and technology",
    "Companies engineered to survive and thrive without external capital dependency",
  ],
  lookingFor: [
    "Strategic co-investors aligned on long-term compounding",
    "Operators with deep domain expertise in legal-tech or fintech",
    "Acquirers serious about premium, revenue-generating digital assets",
  ],
  email: "your@email.com",            // ← replace
  linkedin: "https://linkedin.com/in/yourprofile", // ← replace
};
