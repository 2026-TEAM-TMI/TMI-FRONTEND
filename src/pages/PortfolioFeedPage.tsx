// src/pages/PortfolioFeedPage.tsx
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import NavTabs from "../components/layout/NavTabs";
import PortfolioFilterTabs from "../components/portfolio/PortfolioFilterTabs";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";
import PortfolioCard from "../components/portfolio/PortfolioCard";
import type { JobCategory, PortfolioCard as IPortfolioCard } from "../types/portfolio";

const portfolios: IPortfolioCard[] = [
  { id: 1, name: "Elena Vane", role: "AI 엔지니어", jobCategory: "AI", title: "Lumina: Generative Dreamscapes", desc: "생성형 AI 기반 감성 추천 엔진 설계 및 배포", tags: ["PyTorch", "LangChain", "FastAPI"], matchScore: 89, views: "4.2k", likes: "1.2k", avatar: "E", color: "#6347d1", gradient: "linear-gradient(135deg, #4b2ab822 0%, #9c48ea33 100%)" },
  { id: 2, name: "Julian Thorne", role: "프론트엔드 개발자", jobCategory: "프론트엔드", title: "Fluxengine: Real-time Particle Renderer", desc: "WebGL + Three.js 기반 실시간 파티클 시스템", tags: ["React", "Three.js", "WebGL"], matchScore: 76, views: "3.1k", likes: "874", avatar: "J", color: "#8127cf", gradient: "linear-gradient(135deg, #8127cf22 0%, #6347d133 100%)" },
  { id: 3, name: "Maya Sol", role: "AI 리서처", jobCategory: "AI", title: "Ethos: NLP 기반 감성 분석 파이프라인", desc: "멀티모달 감성 분류 모델 fine-tuning & 서빙", tags: ["Transformers", "ONNX", "Ray Serve"], matchScore: 82, views: "5.7k", likes: "2.1k", avatar: "M", color: "#4b2ab8", gradient: "linear-gradient(135deg, #4b2ab822 0%, #6347d133 100%)" },
  { id: 4, name: "Kai Nakamura", role: "백엔드 엔지니어", jobCategory: "백엔드", title: "Void: Distributed Job Scheduler", desc: "Kafka 기반 분산 스케줄러, 99p 지연 40ms→8ms", tags: ["Kotlin", "Kafka", "PostgreSQL"], matchScore: 91, views: "8.3k", likes: "3.4k", avatar: "K", color: "#0d6efd", gradient: "linear-gradient(135deg, #0d6efd22 0%, #4b2ab833 100%)" },
  { id: 5, name: "Selene Park", role: "백엔드 개발자", jobCategory: "백엔드", title: "Pulse: Health-Tech API Gateway", desc: "Spring Cloud Gateway 기반 마이크로서비스 인증/인가", tags: ["Java", "Spring", "Redis"], matchScore: 78, views: "2.9k", likes: "641", avatar: "S", color: "#198754", gradient: "linear-gradient(135deg, #19875422 0%, #0d6efd22 100%)" },
  { id: 6, name: "Rion Castillo", role: "프론트엔드 개발자", jobCategory: "프론트엔드", title: "Nebula OS: Spatial Computing UI", desc: "XR 환경을 위한 공간 컴퓨팅 인터페이스 시스템", tags: ["React", "TypeScript", "WebXR"], matchScore: 85, views: "6.1k", likes: "1.8k", avatar: "R", color: "#6347d1", gradient: "linear-gradient(135deg, #6347d122 0%, #9c48ea33 100%)" },
];

export default function PortfolioFeedPage() {
  const navigate = useAuthStore((s) => s.navigate);
  const [activeFilter, setActiveFilter] = useState<JobCategory>("ALL");

  const filtered = activeFilter === "ALL" ? portfolios : portfolios.filter((p) => p.jobCategory === activeFilter);

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />
      <main className="max-w-[1160px] mx-auto px-8 py-9">
        <div className="mb-6">
          <h1 className="text-[26px] font-extrabold text-on-surface tracking-tight mb-1">Portfolio Feed ✨</h1>
          <p className="text-sm text-outline">커뮤니티 포트폴리오를 탐색하고 커피챗을 신청하세요</p>
        </div>

        <PortfolioFilterTabs active={activeFilter} onChange={setActiveFilter} />

        <PortfolioGrid empty={filtered.length === 0}>
          {filtered.map((p) => (
            <PortfolioCard
              key={p.id}
              portfolio={p}
              onAuthorClick={() => navigate("portfolio-masterpieces")}
              onPortfolioClick={() => navigate("portfolio-preview")}
              onCoffeeChatClick={() => navigate("coffee-chat")}
            />
          ))}
        </PortfolioGrid>
      </main>
    </div>
  );
}
