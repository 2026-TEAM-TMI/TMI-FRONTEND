// src/pages/PortfolioFeedbackPage.tsx
import { useAuthStore } from "../store/authStore";
import NavTabs from "../components/layout/NavTabs";

export default function PortfolioFeedbackPage() {
  const navigate = useAuthStore((s) => s.navigate);

  return (
    <div>
      <NavTabs />
      <div style={{ padding: 40 }}>
        <h1>Simplified Portfolio Feedback</h1>
        <p>Overall Score: 89%</p>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div style={{ border: "1px solid #ccc", padding: 16 }}>UX Research Depth</div>
          <div style={{ border: "1px solid #ccc", padding: 16 }}>Technical Documentation</div>
          <div style={{ border: "1px solid #ccc", padding: 16 }}>Visual Storytelling Gap</div>
        </div>
        <br />
        <button onClick={() => navigate("portfolio-analysis")}>← Back</button>{" "}
        <button onClick={() => navigate("dashboard")}>Go to Dashboard</button>
      </div>
    </div>
  );
}