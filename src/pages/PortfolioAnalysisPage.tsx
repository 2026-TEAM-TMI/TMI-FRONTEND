// src/pages/PortfolioAnalysisPage.tsx
import { useAuthStore } from "../store/authStore";
import NavTabs from "../components/layout/NavTabs";

const matches = [
  { company: "Nebula Systems", score: 94 },
  { company: "Vertex Games", score: 89 },
];

export default function PortfolioAnalysisPage() {
  const navigate = useAuthStore((s) => s.navigate);

  return (
    <div>
      <NavTabs />
      <div style={{ padding: 40 }}>
        <h1>Portfolio Analysis & Matching Results</h1>
        {matches.map((m) => (
          <div key={m.company} style={{ border: "1px solid #ccc", padding: 16, marginBottom: 10 }}>
            <p>{m.company} - {m.score}%</p>
            <button>View Posting</button>
          </div>
        ))}
        <button onClick={() => navigate("portfolio-feedback")}>View Feedback →</button>{" "}
        <button onClick={() => navigate("portfolio-detail")}>← Back</button>
      </div>
    </div>
  );
}