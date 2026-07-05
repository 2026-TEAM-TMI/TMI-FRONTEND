import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTabs from "../components/layout/NavTabs";
import Button from "../components/common/Button";
import { useAuthStore } from "../store/authStore";

const TABS = ["Overview", "UX Depth", "Storytelling", "Technical"] as const;
type Tab = typeof TABS[number];

const feedbackItems = [
  {
    category: "UX Research Depth",
    score: 88,
    status: "Good" as const,
    desc: "Strong empathy-driven research methodology. User journey maps are well-documented with clear pain points and opportunity spaces.",
    suggestions: ["Add quantitative validation metrics", "Include A/B testing results"],
  },
  {
    category: "Visual Storytelling",
    score: 71,
    status: "Needs Work" as const,
    desc: "Portfolio relies heavily on static screens. FAANG-level positions expect immersive motion design that explains complex user flows.",
    suggestions: ["Add interaction prototypes", "Create animated case study walkthroughs"],
  },
  {
    category: "Technical Documentation",
    score: 74,
    status: "Needs Work" as const,
    desc: "Handoff specs are present but lack edge-case coverage and component state documentation expected at this level.",
    suggestions: ["Document component edge cases", "Add design token specifications"],
  },
  {
    category: "Business Impact",
    score: 91,
    status: "Excellent" as const,
    desc: "Exceptional at linking design decisions to measurable business outcomes. Metrics are well-presented and credible.",
    suggestions: [],
  },
];

const statusConfig = {
  Excellent:   { bg: "bg-[#c8f5d8]", text: "text-[#1a6e44]" },
  Good:        { bg: "bg-[#e6eeff]", text: "text-[#4b2ab8]" },
  "Needs Work":{ bg: "bg-[#ffdad6]", text: "text-[#ba1a1a]" },
};

export default function PortfolioFeedbackPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />

      <main className="max-w-250 mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-widest uppercase text-secondary mb-2 font-label">
              AI Analysis
            </p>
            <h1 className="text-[30px] font-extrabold text-on-surface tracking-tight mb-2">
              Portfolio Feedback ✦
            </h1>
            <p className="text-[15px] text-on-surface-variant leading-relaxed">
              {user?.name ?? "게스트"} · {user?.role ?? "직군 미설정"}
            </p>
          </div>

          {/* Overall score badge */}
          <div className="rounded-2xl px-8 py-5 text-center text-white shrink-0 bg-[linear-gradient(135deg,#4b2ab8,#9c48ea)] shadow-[0_8px_32px_rgba(99,71,209,0.3)] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_80px_at_80%_20%,rgba(255,255,255,0.12),transparent)]" />
            <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/70 font-label mb-1">
              Overall Score
            </p>
            <p className="text-[38px] font-extrabold leading-none tracking-tight">89%</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-7 bg-surface-container rounded-xl p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-bold transition-all duration-200 cursor-pointer border-0 font-[inherit] ${
                activeTab === tab
                  ? "bg-white text-primary shadow-[0_1px_6px_rgba(99,71,209,0.12)]"
                  : "bg-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Feedback cards */}
        <div className="flex flex-col gap-4 mb-8">
          {feedbackItems.map((item) => {
            const s = statusConfig[item.status];
            return (
              <div
                key={item.category}
                className="bg-white rounded-2xl p-7 border border-surface-container shadow-[0_1px_8px_rgba(99,71,209,0.06)] hover:shadow-[0_4px_20px_rgba(99,71,209,0.10)] transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-[17px] font-bold text-on-surface">{item.category}</h3>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold font-label ${s.bg} ${s.text}`}>
                    {item.status}
                  </span>
                </div>

                {/* Score bar */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#6347d1,#9c48ea)]"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="text-[15px] font-extrabold text-primary w-10 text-right">{item.score}%</span>
                </div>

                <p className="text-[14px] text-on-surface-variant leading-relaxed mb-4">{item.desc}</p>

                {item.suggestions.length > 0 && (
                  <div className="bg-surface-low rounded-xl p-4 border-l-[3px] border-primary-container">
                    <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-primary-container font-label mb-2">
                      Suggestions
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {item.suggestions.map((s) => (
                        <div key={s} className="flex items-start gap-2">
                          <span className="text-secondary mt-0.5 text-sm">→</span>
                          <p className="text-[13px] text-on-surface-variant">{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => navigate("/portfolio/analysis")}>← Analysis</Button>
          <Button variant="primary" onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
        </div>
      </main>
    </div>
  );
}
