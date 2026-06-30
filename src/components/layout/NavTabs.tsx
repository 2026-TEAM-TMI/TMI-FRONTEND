// src/components/layout/NavTabs.tsx
import { useAuthStore } from "../../store/authStore";
import type { AppRoute } from "../../store/authStore";

const tabs: { label: string; route: AppRoute }[] = [
  { label: "Dashboard", route: "dashboard" },
  { label: "Builder", route: "builder-step1" },
  { label: "Feed", route: "portfolio-feed" },
  { label: "Coffee Chat", route: "coffee-chat" },
];

export default function NavTabs() {
  const { currentRoute, navigate } = useAuthStore();

  return (
    <div style={{ display: "flex", gap: "12px", padding: "12px", borderBottom: "1px solid #ccc" }}>
      <span style={{ fontWeight: "bold", marginRight: "20px" }}>Cupoli</span>
      {tabs.map((tab) => (
        <button
          key={tab.route}
          onClick={() => navigate(tab.route)}
          style={{
            padding: "6px 12px",
            background: currentRoute === tab.route ? "#7c3aed" : "#eee",
            color: currentRoute === tab.route ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}