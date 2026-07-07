// src/pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTabs from "../components/layout/NavTabs";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatCard from "../components/dashboard/StatCard";
import CreatePortfolioCard from "../components/dashboard/CreatePortfolioCard";
import PortfolioListItem from "../components/dashboard/PortfolioListItem";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { getMemberPortfolios } from "../api/portfolioApi";
import { getMyDashboard } from "../api/memberApi";
import type { PortfolioListItem as IPortfolioListItem } from "../types/portfolio";
import type { DashboardStats } from "../types/member";

const DEFAULT_STATS: DashboardStats = { portfolioCount: 0, totalViewsCount: 0 };

export default function DashboardPage() {
  const navigate = useNavigate();
  const portfolios = usePortfolioStore((s) => s.portfolios);
  const setFetchedPortfolios = usePortfolioStore((s) => s.setFetchedPortfolios);
  const memberId = useAuthStore((s) => s.user?.id);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>(DEFAULT_STATS);

  useEffect(() => {
    if (!memberId) return;

    getMemberPortfolios(memberId)
      .then((list) => {
        const items: IPortfolioListItem[] = list.map((p, i) => ({
          id: -(i + 1), // 신규 API 응답엔 고유 id가 없어 임시로 음수 인덱스 사용 (생성 중 카드의 id와 겹치지 않도록)
          title: p.portfolioTitle,
          description: p.portfolioDescription,
          thumbnailImage: p.thumbnailImage,
          jobCategory: p.jobCategory,
          url: p.url,
          tags: [],
          updated: "",
          views: String(p.viewsCount),
          status: "published",
        }));
        setFetchedPortfolios(items);
      })
      .catch(() => {
        // 목업 데이터를 유지한 채 조용히 실패 처리
      });

    getMyDashboard()
      .then(setDashboardStats)
      .catch(() => {
        // 기본값을 유지한 채 조용히 실패 처리
      });
  }, [memberId, setFetchedPortfolios]);

  const stats = [
    { label: "Total Views", value: dashboardStats.totalViewsCount.toLocaleString(), icon: "👁️" },
    { label: "Chat Requests", value: "18", change: "+3 this week", icon: "☕" },
    { label: "My Portfolios", value: String(dashboardStats.portfolioCount), change: "Active", icon: "✨" },
  ];

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
