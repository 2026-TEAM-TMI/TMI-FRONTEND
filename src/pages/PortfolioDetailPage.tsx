// src/pages/PortfolioDetailPage.tsx
import { useNavigate } from "react-router-dom";
import NavTabs from "../components/layout/NavTabs";

const projects = [
  {
    id: 1,
    title: "GreenYield App",
    category: "Fintech UX Research",
    desc: "A data-driven platform helping sustainable investors track portfolio impact with real-time ESG metrics.",
    tags: ["UX", "FINTECH", "DATA"],
    year: "2024",
  },
  {
    id: 2,
    title: "Nebula OS",
    category: "System Design · VR/AR",
    desc: "Spatial computing interface designed for the next generation of mixed-reality workspaces.",
    tags: ["VR/AR", "SYSTEM", "SPATIAL"],
    year: "2023",
  },
  {
    id: 3,
    title: "Soma Skincare",
    category: "E-commerce Branding",
    desc: "End-to-end brand identity and digital commerce experience for a clean beauty startup.",
    tags: ["BRANDING", "E-COM"],
    year: "2023",
  },
  {
    id: 4,
    title: "Pulse Dashboard",
    category: "Health-Tech Dashboard Design",
    desc: "Real-time health metrics visualization for medical teams managing chronic condition patients.",
    tags: ["DASHBOARD", "HEALTH"],
    year: "2022",
  },
];

const skills = [
  { name: "UI Design", level: 92 },
  { name: "Research", level: 85 },
  { name: "Prototyping", level: 88 },
  { name: "Systems", level: 75 },
  { name: "Motion", level: 70 },
];

export default function PortfolioDetailPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />

      <main className="max-w-300 mx-auto px-8 py-10">
        <button
          onClick={() => navigate("/portfolio/feed")}
          className="flex items-center gap-1.5 bg-transparent border-0 text-on-surface-variant text-sm cursor-pointer font-[inherit] mb-6 hover:text-on-surface transition-colors duration-150"
        >
          ← Back to Feed
        </button>

        <div className="grid grid-cols-[1fr_320px] gap-6 items-start">
          {/* ── Main content ── */}
          <div>
            {/* Profile header */}
            <div className="bg-white rounded-[20px] p-8 mb-5 border border-surface-container shadow-[0_1px_8px_rgba(99,71,209,0.06)]">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-18 h-18 rounded-full bg-[linear-gradient(135deg,#6347d1,#9c48ea)] flex items-center justify-center text-[26px] font-extrabold text-white shrink-0 shadow-[0_4px_16px_rgba(99,71,209,0.3)]">
                  E
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-extrabold text-on-surface tracking-tight mb-1">Elena Vane</h1>
                  <p className="text-sm font-semibold text-primary-container mb-2">Senior Product Designer</p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Crafting digital alchemy through empathetic research and bold visual storytelling.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/coffee-chat")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer font-[inherit] border-0 text-white bg-[linear-gradient(135deg,#6347d1,#9c48ea)] shadow-[0_4px_16px_rgba(99,71,209,0.3)] hover:opacity-90 transition-opacity duration-150 whitespace-nowrap shrink-0"
                >
                  ☕ Coffee Chat
                </button>
              </div>

              {/* Skill bars */}
              <div>
                <p className="text-[11px] font-bold tracking-widest text-outline uppercase font-label mb-3">
                  Magic Arsenal
                </p>
                <div className="flex flex-col gap-2.5">
                  {skills.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[13px] font-semibold text-on-surface">{s.name}</span>
                        <span className="text-[12px] font-bold text-primary-container">{s.level}%</span>
                      </div>
                      <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[linear-gradient(90deg,#6347d1,#9c48ea)] rounded-full"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Case Studies */}
            <h2 className="text-[18px] font-bold text-on-surface mb-4 tracking-tight">Case Studies ✦</h2>
            <div className="flex flex-col gap-4">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-6 border border-surface-container shadow-[0_1px_8px_rgba(99,71,209,0.06)] cursor-pointer hover:border-primary-container hover:translate-x-1 transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-[11px] font-semibold tracking-[0.08em] text-secondary uppercase font-label mb-1.5">
                        {p.category}
                      </p>
                      <h3 className="text-[17px] font-bold text-on-surface mb-2">{p.title}</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{p.desc}</p>
                    </div>
                    <span className="text-[13px] text-outline font-label ml-4 shrink-0">{p.year}</span>
                  </div>
                  <div className="flex gap-1.5 mt-3">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-surface-low text-primary rounded-full text-[10px] font-semibold font-label tracking-[0.06em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="sticky top-20 flex flex-col gap-4">
            {/* Match Score */}
            <div className="rounded-[20px] p-7 text-white bg-[linear-gradient(135deg,#4b2ab8,#6347d1)] relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
              <p className="text-[11px] font-semibold tracking-widest text-white/60 uppercase font-label mb-3">
                Magic Match Score
              </p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-18 h-18 rounded-full border-4 border-white/40 flex items-center justify-center shrink-0">
                  <span className="text-[22px] font-extrabold">89%</span>
                </div>
                <p className="text-[13px] text-white/80 leading-relaxed">
                  Alignment with FAANG-level design leadership roles
                </p>
              </div>
              <button
                onClick={() => navigate("/portfolio/analysis")}
                className="w-full py-3 bg-white/15 border border-white/30 rounded-xl text-sm font-bold cursor-pointer font-[inherit] text-white hover:bg-white/25 transition-colors duration-150"
              >
                Full Analysis →
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-[20px] p-6 border border-surface-container shadow-[0_1px_8px_rgba(99,71,209,0.06)]">
              <p className="text-[11px] font-semibold tracking-widest text-outline uppercase font-label mb-4">
                Quick Actions
              </p>
              {[
                { label: "📥 Download Portfolio", action: "/dashboard" },
                { label: "🔗 Share Profile", action: "/dashboard" },
                { label: "📊 View Feedback", action: "/portfolio/feedback" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.action)}
                  className="block w-full text-left px-3.5 py-2.5 bg-transparent border-0 rounded-[10px] text-sm font-semibold text-on-surface cursor-pointer font-[inherit] mb-1 hover:bg-[#f0dbff] hover:text-secondary transition-colors duration-150"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
