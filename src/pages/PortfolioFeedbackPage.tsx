// src/pages/PortfolioFeedbackPage.tsx
import { useAuthStore } from "../store/authStore";
import NavTabs from "../components/layout/NavTabs";

const feedbackTabs = ["Overview", "UX Depth", "Storytelling", "Technical"];

const feedbackItems = [
  {
    category: "UX Research Depth",
    score: 88,
    status: "Good",
    statusColor: "#4b2ab8",
    statusBg: "#e6eeff",
    desc: "Strong empathy-driven research methodology. User journey maps are well-documented with clear pain points and opportunity spaces.",
    suggestions: ["Add quantitative validation metrics", "Include A/B testing results"],
  },
  {
    category: "Visual Storytelling",
    score: 71,
    status: "Needs Work",
    statusColor: "#ba1a1a",
    statusBg: "#ffdad6",
    desc: "Portfolio relies heavily on static screens. FAANG-level positions expect immersive motion design that explains complex user flows.",
    suggestions: ["Add interaction prototypes", "Create animated case study walkthroughs"],
  },
  {
    category: "Technical Documentation",
    score: 74,
    status: "Needs Work",
    statusColor: "#ba1a1a",
    statusBg: "#ffdad6",
    desc: "Handoff specs are present but lack edge-case coverage and component state documentation expected at this level.",
    suggestions: ["Document component edge cases", "Add design token specifications"],
  },
  {
    category: "Business Impact",
    score: 91,
    status: "Excellent",
    statusColor: "#1a6e44",
    statusBg: "#c8f5d8",
    desc: "Exceptional at linking design decisions to measurable business outcomes. Metrics are well-presented and credible.",
    suggestions: [],
  },
];

export default function PortfolioFeedbackPage() {
  const navigate = useAuthStore((s) => s.navigate);

  return (
    <div style={{ minHeight: "100svh", background: "#f8f9ff", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <NavTabs />

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#121c2a", letterSpacing: "-0.02em", marginBottom: "8px" }}>
              Portfolio Feedback ✦
            </h1>
            <p style={{ fontSize: "15px", color: "#484554" }}>
              AI-crafted insights for Elena Vane's Senior Product Designer portfolio
            </p>
          </div>
          {/* Overall score */}
          <div
            style={{
              background: "linear-gradient(135deg, #4b2ab8, #6347d1)",
              borderRadius: "20px",
              padding: "20px 28px",
              textAlign: "center",
              color: "#fff",
              flexShrink: 0,
            }}
          >
            <p style={{ fontSize: "11px", opacity: 0.7, letterSpacing: "0.08em", fontFamily: "'Space Grotesk', system-ui, sans-serif", marginBottom: "6px" }}>
              OVERALL SCORE
            </p>
            <p style={{ fontSize: "36px", fontWeight: "800" }}>89%</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "28px", background: "#e6eeff", borderRadius: "12px", padding: "4px" }}>
          {feedbackTabs.map((tab, i) => (
            <button
              key={tab}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: i === 0 ? "#fff" : "transparent",
                color: i === 0 ? "#4b2ab8" : "#484554",
                fontSize: "14px",
                fontWeight: i === 0 ? "700" : "500",
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: i === 0 ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Feedback cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
          {feedbackItems.map((item) => (
            <div
              key={item.category}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid #e6eeff",
                boxShadow: "0 1px 8px rgba(99,71,209,0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#121c2a", marginBottom: "8px" }}>
                    {item.category}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ height: "8px", width: "120px", background: "#e6eeff", borderRadius: "999px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${item.score}%`,
                          background: "linear-gradient(90deg, #6347d1, #9c48ea)",
                          borderRadius: "999px",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: "15px", fontWeight: "800", color: "#4b2ab8" }}>{item.score}%</span>
                    <span
                      style={{
                        padding: "3px 10px",
                        background: item.statusBg,
                        color: item.statusColor,
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: "700",
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "14px", color: "#484554", lineHeight: "1.6", marginBottom: item.suggestions.length > 0 ? "16px" : "0" }}>
                {item.desc}
              </p>
              {item.suggestions.length > 0 && (
                <div
                  style={{
                    background: "#f8f9ff",
                    borderRadius: "12px",
                    padding: "14px 16px",
                    borderLeft: "3px solid #6347d1",
                  }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.08em",
                      color: "#6347d1",
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Suggestions
                  </p>
                  {item.suggestions.map((s) => (
                    <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ color: "#8127cf", marginTop: "1px" }}>→</span>
                      <p style={{ fontSize: "13px", color: "#484554" }}>{s}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigate("portfolio-analysis")}
            style={{
              padding: "14px 24px",
              background: "transparent",
              border: "1.5px solid #c9c4d6",
              borderRadius: "12px",
              color: "#484554",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ← Analysis
          </button>
          <button
            onClick={() => navigate("dashboard")}
            style={{
              padding: "14px 24px",
              background: "linear-gradient(135deg, #6347d1, #9c48ea)",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 4px 16px rgba(99,71,209,0.3)",
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}
