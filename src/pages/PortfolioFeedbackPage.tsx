import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTabs from "../components/layout/NavTabs";
import Button from "../components/common/Button";
import { useAuthStore } from "../store/authStore";

const TABS = ["개요", "UX 깊이", "스토리텔링", "기술력"] as const;
type Tab = typeof TABS[number];

const feedbackItems = [
  {
    category: "UX 리서치 깊이",
    score: 88,
    status: "Good" as const,
    desc: "공감 기반 리서치 방법론이 탄탄합니다. 사용자 여정 지도가 페인 포인트와 기회 요소를 명확하게 문서화하고 있습니다.",
    suggestions: ["정량적 검증 지표 추가하기", "A/B 테스트 결과 포함하기"],
  },
  {
    category: "비주얼 스토리텔링",
    score: 71,
    status: "Needs Work" as const,
    desc: "포트폴리오가 정적인 화면 위주로 구성되어 있습니다. FAANG 수준의 포지션에서는 복잡한 사용자 플로우를 설명하는 몰입감 있는 모션 디자인을 기대합니다.",
    suggestions: ["인터랙션 프로토타입 추가하기", "애니메이션 케이스 스터디 워크스루 제작하기"],
  },
  {
    category: "기술 문서화",
    score: 74,
    status: "Needs Work" as const,
    desc: "핸드오프 명세는 있지만, 이 수준에서 기대되는 엣지 케이스 커버리지와 컴포넌트 상태 문서화가 부족합니다.",
    suggestions: ["컴포넌트 엣지 케이스 문서화하기", "디자인 토큰 명세 추가하기"],
  },
  {
    category: "비즈니스 임팩트",
    score: 91,
    status: "Excellent" as const,
    desc: "디자인 결정을 측정 가능한 비즈니스 성과와 연결하는 능력이 탁월합니다. 지표가 설득력 있게 잘 제시되어 있습니다.",
    suggestions: [],
  },
];

const statusConfig = {
  Excellent:   { bg: "bg-[#c8f5d8]", text: "text-[#1a6e44]" },
  Good:        { bg: "bg-[#e6eeff]", text: "text-[#1d4ed8]" },
  "Needs Work":{ bg: "bg-[#ffdad6]", text: "text-[#ba1a1a]" },
};

const STATUS_LABEL: Record<keyof typeof statusConfig, string> = {
  Excellent: "우수",
  Good: "양호",
  "Needs Work": "보완 필요",
};

export default function PortfolioFeedbackPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<Tab>("개요");

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />

      <main className="max-w-250 mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-widest uppercase text-secondary mb-2 font-label">
              AI 분석
            </p>
            <h1 className="text-[30px] font-extrabold text-on-surface tracking-tight mb-2">
              포트폴리오 피드백
            </h1>
            <p className="text-[15px] text-on-surface-variant leading-relaxed">
              {user?.name ?? "게스트"} · {user?.role ?? "직군 미설정"}
            </p>
          </div>

          {/* Overall score badge */}
          <div className="rounded-2xl px-8 py-5 text-center text-white shrink-0 bg-[linear-gradient(135deg,#1d4ed8,#38bdf8)] shadow-[0_8px_32px_rgba(59,130,246,0.3)] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_80px_at_80%_20%,rgba(255,255,255,0.12),transparent)]" />
            <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/70 font-label mb-1">
              종합 점수
            </p>
            <p className="text-[38px] font-extrabold leading-none tracking-tight">89%</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-7 bg-surface-container rounded-xl p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-bold transition-all duration-200 cursor-pointer border-0 font-[inherit] ${
                activeTab === tab
                  ? "bg-white text-primary shadow-[0_1px_6px_rgba(59,130,246,0.12)]"
                  : "bg-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Feedback cards */}
        <div className="flex flex-col gap-4 mb-8">
          {feedbackItems.map((item) => {
            const s = statusConfig[item.status];
            return (
              <div
                key={item.category}
                className="bg-white rounded-2xl p-7 border border-surface-container shadow-[0_1px_8px_rgba(59,130,246,0.06)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.10)] transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-[17px] font-bold text-on-surface">{item.category}</h3>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold font-label ${s.bg} ${s.text}`}>
                    {STATUS_LABEL[item.status]}
                  </span>
                </div>

                {/* Score bar */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#3b82f6,#38bdf8)]"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="text-[15px] font-extrabold text-primary w-10 text-right">{item.score}%</span>
                </div>

                <p className="text-[14px] text-on-surface-variant leading-relaxed mb-4">{item.desc}</p>

                {item.suggestions.length > 0 && (
                  <div className="bg-surface-low rounded-xl p-4 border-l-[3px] border-primary-container">
                    <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-primary-container font-label mb-2">
                      제안
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {item.suggestions.map((s) => (
                        <div key={s} className="flex items-start gap-2">
                          <span className="text-secondary mt-0.5 text-sm">→</span>
                          <p className="text-[13px] text-on-surface-variant">{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => navigate("/portfolio/analysis")}>← 분석</Button>
          <Button variant="primary" onClick={() => navigate("/dashboard")}>대시보드로 이동</Button>
        </div>
      </main>
    </div>
  );
}
