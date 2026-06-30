// src/pages/DashboardPage.tsx
import { useAuthStore } from "../store/authStore";
import NavTabs from "../components/layout/NavTabs";

export default function DashboardPage() {
  const navigate = useAuthStore((s) => s.navigate);

  return (
    <div>
      <NavTabs />
      <div style={{ padding: 40 }}>
        <h1>Dashboard</h1>
        <p>Welcome back, Elena!</p>

        <div style={{ display: "flex", gap: 20, margin: "20px 0" }}>
          <div style={{ border: "1px solid #ccc", padding: 16 }}>Total Views: 12,482</div>
          <div style={{ border: "1px solid #ccc", padding: 16 }}>Chat Requests: 18</div>
          <div style={{ border: "1px solid #ccc", padding: 16 }}>My Portfolios: 04</div>
        </div>

        <button onClick={() => navigate("builder-step1")}>+ Create New Portfolio</button>
        <br />
        <br />
        <button onClick={() => navigate("portfolio-detail")}>View Portfolio Detail (Product Design 2024)</button>
      </div>
    </div>
  );
}