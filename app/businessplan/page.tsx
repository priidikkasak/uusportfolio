"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  {
    title: "Executive Overview",
    body: "We are building a private, invitation-only commodity trading infrastructure designed for serious buyers and suppliers who value trust, speed, and discretion. The platform is not a public marketplace. It is a controlled network where every participant and every opportunity is verified, and where access itself becomes a signal of credibility.\n\nMembership is strictly limited to ensure quality, protect trust, and maintain long-term strategic value for participants.",
  },
  {
    title: "Mission",
    body: "To create the most trusted private commodity trading network in the world - where verified counterparties can transact efficiently, securely, and without noise.\n\nWe eliminate friction, reduce counterparty risk, and protect our members' most valuable asset: their time.",
  },
  {
    title: "Vision",
    body: "To build a global, invitation-only trading circle limited to a maximum of 1,000 verified commodity traders - where membership represents credibility, and where serious transactions happen faster because trust is already established.\n\nOur long-term vision is to become the preferred private infrastructure layer for high-level commodity transactions.",
  },
  {
    title: "Core Values",
    values: [
      { name: "Trust", desc: "Every member is vetted. Every offer is reviewed. Every interaction happens inside a controlled environment." },
      { name: "Exclusivity", desc: "Membership is limited to a maximum of 1,000 traders globally. Access is earned, not granted." },
      { name: "Integrity", desc: "No recycled offers. No speculative listings. Every opportunity is manually reviewed." },
      { name: "Discretion", desc: "All member activity and discussions remain strictly confidential." },
      { name: "Execution Focus", desc: "We prioritize real transactions, not activity. Quality over volume." },
    ],
  },
  {
    title: "Membership Model and Access Control",
    body: "Access to the platform follows a strict multi-step approval process.",
    steps: [
      { step: "Step 1 - Referral or Direct Interest", desc: "We do not publicly advertise the platform. All new members enter through trusted referrals or direct private interest." },
      { step: "Step 2 - Background Questionnaire", desc: "Interested candidates complete a detailed questionnaire covering company structure, trading history, references, operational scope, and supporting documentation." },
      { step: "Step 3 - Verification and Due Diligence", desc: "Our internal team conducts a manual background review including company verification, activity validation, reference checks, and documentation review." },
      { step: "Step 4 - Interview", desc: "Qualified candidates proceed to a video or in-person meeting with our team." },
      { step: "Step 5 - Membership Agreement and Payment", desc: "Approved members sign a confidentiality and conduct agreement, pay an annual membership fee of €5,000, and receive full platform access." },
    ],
  },
  {
    title: "Network Size and Exclusivity",
    highlight: "Maximum: 1,000 traders globally",
    body: "Membership is strictly capped to ensure a high signal-to-noise ratio, strong trust between members, long-term value of membership, and protection against platform dilution.\n\nExclusivity is a core strategic pillar.",
  },
  {
    title: "Offer Verification and Quality Control",
    body: "Every listing submitted to the platform undergoes manual review by our internal team. We verify seller authenticity, offer credibility, documentation validity, and structural consistency.\n\nNo listing is published automatically. This ensures the platform never becomes diluted with non-serious or speculative offers.",
  },
  {
    title: "Platform Services",
    body: "Beyond deal discovery, we provide integrated execution support through trusted partners and internal oversight.",
    list: [
      "Logistics and shipping coordination",
      "Customs handling",
      "Product sourcing support",
      "Deal structuring support",
      "Neutral deal facilitation",
      "Escrow coordination",
      "Documentation guidance",
    ],
  },
  {
    title: "Governance and Enforcement",
    body: "We maintain full administrative oversight of the network. Our team can pause accounts under review, suspend members if necessary, investigate suspicious activity, and enforce network conduct standards.\n\nTrust and network integrity are actively maintained.",
  },
  {
    title: "Launch Strategy",
    highlight: "Phase 1: 10 Founding Members",
    body: "We will onboard an initial group of 10 founding members - carefully selected traders from our existing trusted network.\n\nBenefits include free access during the first year, direct feedback into product development, and early network formation and liquidity.\n\nThis controlled rollout ensures the platform evolves with real user input.",
  },
  {
    title: "Strategic Positioning",
    body: "This is not a mass marketplace. This is a private network.\n\nMembership signals credibility, access, trustworthiness, and serious intent.\n\nAs the network grows, access becomes increasingly valuable and selective.",
  },
  {
    title: "Long-Term Opportunity",
    body: "By combining strict access control, manual verification, limited membership supply, integrated execution support, and private network dynamics - we are building infrastructure that becomes more valuable as trust compounds.\n\nThe strongest networks are not the largest. They are the most trusted.",
  },
];

export default function BusinessPlan() {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("bp_auth") === "1") setAuthed(true);
    setChecking(false);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (username.toLowerCase() === "business plan" && password === "2026") {
      sessionStorage.setItem("bp_auth", "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Invalid credentials.");
    }
  }

  if (checking) return null;

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-[#383838] mb-8 font-medium"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Private Access
          </p>
          <h1
            className="text-[28px] font-semibold text-[#e8e8e8] mb-8 leading-tight tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Business Plan
          </h1>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full bg-[#0e0e0e] border border-[#1e1e1e] text-[#e8e8e8] text-[13px] px-4 py-3 outline-none focus:border-[#444] transition-colors placeholder:text-[#333]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full bg-[#0e0e0e] border border-[#1e1e1e] text-[#e8e8e8] text-[13px] px-4 py-3 outline-none focus:border-[#444] transition-colors placeholder:text-[#333]"
            />
            {error && (
              <p className="text-[11px] text-[#e05555]">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 text-[11px] font-semibold tracking-[0.08em] uppercase text-[#050505] bg-[#d8d8d8] hover:bg-white transition-colors"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Access
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-5 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-[#383838] mb-4 font-medium"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Private — Confidential
          </p>
          <h1
            className="text-[36px] sm:text-[48px] font-semibold text-[#e8e8e8] leading-[1.08] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Business Plan
          </h1>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {SECTIONS.map((section, i) => (
            <div key={i} className="border-t border-[#141414] pt-10">
              <h2
                className="text-[11px] tracking-[0.25em] uppercase text-[#555] font-medium mb-6"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {section.title}
              </h2>

              {/* Highlight */}
              {"highlight" in section && section.highlight && (
                <p
                  className="text-[18px] sm:text-[22px] font-semibold text-[#e8e8e8] mb-6 tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {section.highlight}
                </p>
              )}

              {/* Body paragraphs */}
              {"body" in section && section.body && (
                <div className="space-y-4 mb-6">
                  {section.body.split("\n\n").map((p, j) => (
                    <p key={j} className="text-[14px] text-[#909090] leading-[1.8]">{p}</p>
                  ))}
                </div>
              )}

              {/* Values */}
              {"values" in section && section.values && (
                <div className="space-y-5">
                  {section.values.map((v, j) => (
                    <div key={j}>
                      <p
                        className="text-[12px] font-semibold text-[#c8c8c8] mb-1"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {v.name}
                      </p>
                      <p className="text-[13px] text-[#666] leading-[1.75]">{v.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Steps */}
              {"steps" in section && section.steps && (
                <div className="space-y-6">
                  {section.steps.map((s, j) => (
                    <div key={j} className="flex gap-5">
                      <span className="shrink-0 w-5 h-5 flex items-center justify-center text-[9px] font-semibold text-[#444] border border-[#222] rounded-full mt-0.5">
                        {j + 1}
                      </span>
                      <div>
                        <p
                          className="text-[12px] font-semibold text-[#c8c8c8] mb-1"
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {s.step}
                        </p>
                        <p className="text-[13px] text-[#666] leading-[1.75]">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* List */}
              {"list" in section && section.list && (
                <ul className="space-y-2 mt-2">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-[13px] text-[#909090] leading-relaxed">
                      <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-[#444]" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-[#141414]">
          <p className="text-[10px] text-[#2a2a2a] tracking-widest uppercase">
            Strictly confidential. For authorised recipients only.
          </p>
        </div>
      </div>
    </main>
  );
}
