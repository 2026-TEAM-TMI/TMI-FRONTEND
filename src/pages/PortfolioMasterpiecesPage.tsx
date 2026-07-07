// src/pages/PortfolioMasterpiecesPage.tsx
import { useNavigate } from "react-router-dom";
import NavTabs from "../components/layout/NavTabs";
import ProfileSummary from "../components/portfolio/ProfileSummary";
import MasterpieceCard from "../components/portfolio/MasterpieceCard";
import type { User } from "../types/user";
import type { Masterpiece } from "../types/portfolio";
import { openMemberPortfolioPreview } from "../utils/openPortfolioPreview";

const person: User = {
  name: "Elena Vane", role: "AI 엔지니어", company: "Cupoli Lab",
  bio: "복잡한 데이터를 사용자가 이해할 수 있는 AI 경험으로 transmute합니다. 생성형 AI 파이프라인 설계와 프로덕션 배포에 강점이 있습니다.",
  hashtags: ["#AIAlchemist", "#MLEngineer", "#GenAI"],
  avatar: "E", color: "#6347d1", matchScore: 89, followers: "1.2k", projects: "12",
};

// 아래 프로젝트는 모두 위 person(memberId: 1)의 포트폴리오에 속함
const masterpieces: Masterpiece[] = [
  { id: 1, memberId: 1, title: "Lumina: Generative Dreamscapes", desc: "생성형 AI 기반 감성 추천 엔진. 사용자 감정 임베딩을 실시간으로 분석하여 콘텐츠를 큐레이션합니다.", tags: ["PyTorch", "LangChain", "FastAPI", "Redis"], likes: "1.2k", comments: "284", gradient: "linear-gradient(135deg, #6347d122 0%, #9c48ea33 100%)", accent: "#6347d1" },
  { id: 2, memberId: 1, title: "Ethos: Multimodal Sentiment Pipeline", desc: "텍스트·이미지·오디오 멀티모달 감성 분류 모델. ONNX 변환 후 Ray Serve로 고가용성 서빙.", tags: ["Transformers", "ONNX", "Ray Serve", "Docker"], likes: "3.4k", comments: "1.1k", gradient: "linear-gradient(135deg, #4b2ab822 0%, #6347d133 100%)", accent: "#4b2ab8" },
  { id: 3, memberId: 1, title: "Astro Analytics: AI Performance Dashboard", desc: "모델 드리프트 자동 탐지 및 MLOps 대시보드. Prometheus + Grafana 연동으로 실시간 모니터링.", tags: ["MLflow", "Prometheus", "Grafana", "Python"], likes: "892", comments: "204", gradient: "linear-gradient(135deg, #8127cf22 0%, #4b2ab833 100%)", accent: "#8127cf" },
];

export default function PortfolioMasterpiecesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />
      <main className="max-w-250 mx-auto px-8 py-10">
        <button
          onClick={() => navigate("/portfolio/feed")}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-outline bg-transparent border-0 cursor-pointer font-[inherit] mb-7 p-0"
        >
          ← 피드로 돌아가기
        </button>

        <ProfileSummary person={person} onCoffeeChat={() => navigate("/coffee-chat")} />

        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-[18px] font-extrabold text-on-surface tracking-tight">Magical Masterpieces ✦</h2>
            <span className="text-[13px] text-outline">{masterpieces.length}개의 프로젝트</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {masterpieces.map((m) => (
              <MasterpieceCard key={m.id} item={m} onClick={() => openMemberPortfolioPreview(navigate, m.memberId)} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
