// src/pages/PortfolioDetailPage.tsx
import { useAuthStore } from "../store/authStore";
import NavTabs from "../components/layout/NavTabs";

export default function PortfolioDetailPage() {
  const navigate = useAuthStore((s) => s.navigate);

  return (
    <div>
      <NavTabs />
      <div style={{ padding: 40 }}>
        <h1>Portfolio Detail - Elena Vane</h1>
        <p>Senior Product Designer</p>
        <p>[ Skill Radar Chart 자리 ]</p>
        <button onClick={() => navigate("coffee-chat")}>Request Coffee Chat</button>
        <br />
        <br />
        <button onClick={() => navigate("portfolio-feed")}>← Back to Feed</button>{" "}
        <button onClick={() => navigate("portfolio-analysis")}>View Matching Analysis →</button>
      </div>
    </div>
  );
}