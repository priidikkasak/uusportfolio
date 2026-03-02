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
  ownership?: string | null;
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

export const projects: Project[] = [
  {
    id: "project-1",
    name: "NordExit",
    logo: "/logos/logo1.png",
    tag: "Live",
    oneLiner: "A discreet and structured exit solution for business owners.",
    description:
      "Mission: To provide a discreet and structured exit solution for business owners by completing the full transfer and closure of their companies.\n\nVision: To become Europe's most trusted partner for final and controlled corporate exits through cross-border restructuring.\n\nMy Role: To build and manage marketing, website infrastructure, and backend systems that support client acquisition, process automation, and operational efficiency.",
    myRole: [],
    highlights: [],
    link: "https://nordexit.eu",
    accent: "#ffffff",
    ownership: "50%",
  },
  {
    id: "project-2",
    name: "Websta",
    logo: "/logos/logo2.png",
    tag: "Live",
    oneLiner: "Launch a fully functional online business in seconds.",
    description:
      "Mission: Websta enables anyone with a skill to launch a fully functional online business in seconds by eliminating all technical, financial, and time barriers.\n\nVision: Websta becomes the global infrastructure where millions of service providers build, run, and scale their businesses without developers, agencies, or complexity.\n\nMy Role: I build and scale Websta's presence across Africa, making it the default platform for service providers to launch and monetize their businesses.",
    myRole: [],
    highlights: [],
    link: "https://websta.ai",
    accent: "#6ee7f7",
    ownership: "0.1%",
  },
  {
    id: "project-3",
    name: "Binderr",
    logo: "/logos/logo3.png",
    tag: "Live",
    oneLiner: "Global infrastructure for company formation and compliance.",
    description:
      "Mission: To build trusted global infrastructure that enables businesses to access company formation, banking, and compliance services quickly and transparently on one platform.\n\nVision: To become the global standard where businesses and service providers connect and operate through a single unified Marketplace.\n\nMy Role: As Head of Baltics, my role is to build Binderr's Marketplace presence in the Baltics by onboarding service providers and growing the regional partner network.",
    myRole: [],
    highlights: [],
    link: "https://binderr.com",
    accent: "#8b9cff",
    ownership: null,
  },
  {
    id: "project-4",
    name: "NoRisk Casino",
    logo: "/logos/logo4.png",
    tag: "Live",
    oneLiner: "The premium casino discovery platform players trust.",
    description:
      "Mission: To connect players with the best verified casino bonuses through a transparent, trusted, and high-performance platform.\n\nVision: To become the leading premium casino discovery platform where players rely on NoRisk to find the most valuable and exclusive offers.\n\nMy Role: To build and scale NoRisk by securing top partnerships, optimizing traffic, and delivering the highest-converting offers to our audience.",
    myRole: [],
    highlights: [],
    link: "https://norisk.casino",
    accent: "#f5a623",
    ownership: "25%",
  },
  {
    id: "project-5",
    name: "Legatron",
    logo: "/logos/logo5.png",
    tag: "In progress",
    oneLiner: "Making laws instantly understandable and actionable.",
    description:
      "Mission: Legatron's mission is to make laws instantly understandable and actionable for businesses and private individuals, removing friction between questions and answers.\n\nVision: Legatron's vision is to become the legal infrastructure layer every company and individual relies on to operate faster, safer, and with complete clarity across every country.\n\nMy Role: My role is to define the vision, secure capital and strategic partnerships, and lead Legatron's expansion from Estonia into a scalable international platform.",
    myRole: [],
    highlights: [],
    link: "https://legatron.ai",
    accent: "#d4a843",
    ownership: "30%",
  },
  {
    id: "project-6",
    name: null,
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

export const about: AboutData = {
  name: "Priidik Kasak",
  photo: "/me.png",
  tagline: "Founder. Operator. Builder.",
  bio: "Serial founder who builds, owns, and operates. I move fast, operate lean, and build businesses with real structural advantages.",
  strengths: [
    "Spotting high-margin opportunities before they become obvious",
    "Building revenue systems that scale without complexity",
    "Turning ideas into operating businesses - fast",
    "Proven ability to close deals and build lasting partnerships",
  ],
  building: [
    "Multiple businesses running in parallel - each with a clear path to scale",
    "Platforms built to dominate niche markets",
    "Cross-border revenue infrastructure with long-term moats",
  ],
  lookingFor: [
    "Strategic partners with skin in the game",
    "Capital aligned on long-term, high-conviction plays",
    "Operators ready to move fast in underserved markets",
  ],
  email: "priidik.kasak@gmail.com",
  linkedin: "https://linkedin.com/in/yourprofile",
};
