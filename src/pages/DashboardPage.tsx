// src/pages/DashboardPage.tsx
import { useNavigate } from "react-router-dom";
import NavTabs from "../components/layout/NavTabs";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatCard from "../components/dashboard/StatCard";
import CreatePortfolioCard from "../components/dashboard/CreatePortfolioCard";
import PortfolioListItem from "../components/dashboard/PortfolioListItem";
import { usePortfolioStore } from "../store/portfolioStore";

const stats = [
  { label: "Total Views", value: "12,482", change: "+12.5%", icon: "👁️" },
  { label: "Chat Requests", value: "18", change: "+3 this week", icon: "☕" },
  { label: "My Portfolios", value: "04", change: "Active", icon: "✨" },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const portfolios = usePortfolioStore((s) => s.portfolios);

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />
      <main className="max-w-300 mx-auto px-10 py-12">
        <WelcomeBanner />

        <div className="grid grid-cols-3 gap-5 mb-10">
          {stats.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        <CreatePortfolioCard count={portfolios.length} onCreate={() => navigate("/builder/basic-info")} />

        <div className="grid grid-cols-2 gap-5">
          {portfolios.map((p) => (
            <PortfolioListItem key={p.id} portfolio={p} onClick={() => navigate("/portfolio/preview")} />
          ))}
        </div>
      </main>
    </div>
  );
}