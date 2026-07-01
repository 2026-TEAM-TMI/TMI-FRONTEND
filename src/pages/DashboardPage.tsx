// src/pages/DashboardPage.tsx
import { useNavigate } from "react-router-dom";
import NavTabs from "../components/layout/NavTabs";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatCard from "../components/dashboard/StatCard";
import CreatePortfolioCard from "../components/dashboard/CreatePortfolioCard";
import PortfolioListItem from "../components/dashboard/PortfolioListItem";
import type { PortfolioListItem as IPortfolioListItem } from "../types/portfolio";

const stats = [
  { label: "Total Views", value: "12,482", change: "+12.5%", icon: "👁️" },
  { label: "Chat Requests", value: "18", change: "+3 this week", icon: "☕" },
  { label: "My Portfolios", value: "04", change: "Active", icon: "✨" },
];

const portfolios: IPortfolioListItem[] = [
  { id: 1, title: "Lumina: Generative Dreamscapes", tags: ["UX", "AI", "GENERATIVE"], updated: "Updated 2h ago", views: "4.2k", status: "published" },
  { id: 2, title: "Nebula OS: System Design", tags: ["SYSTEM", "VR/AR"], updated: "Updated 5d ago", views: "2.8k", status: "published" },
  { id: 3, title: "Soma Skincare Branding", tags: ["BRANDING", "E-COM"], updated: "Updated 1w ago", views: "3.1k", status: "draft" },
  { id: 4, title: "Pulse Dashboard: Health-Tech", tags: ["DASHBOARD", "DATA"], updated: "Updated 2w ago", views: "1.9k", status: "published" },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />
      <main className="max-w-300 mx-auto px-10 py-12">
        <WelcomeBanner />

        <div className="grid grid-cols-3 gap-5 mb-10">
          {stats.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        <CreatePortfolioCard count={portfolios.length} onCreate={() => navigate("/builder/step1")} />

        <div className="grid grid-cols-2 gap-5">
          {portfolios.map((p) => (
            <PortfolioListItem key={p.id} portfolio={p} onClick={() => navigate("/portfolio/preview")} />
          ))}
        </div>
      </main>
    </div>
  );
}
