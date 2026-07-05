// src/pages/PortfolioAnalysisPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTabs from "../components/layout/NavTabs";
import { useAuthStore } from "../store/authStore";
import ScoreCircle from "../components/analysis/ScoreCircle";
import SkillAnalysisChart from "../components/analysis/SkillAnalysisChart";
import MatchingResultCard from "../components/analysis/MatchingResultCard";
import ImprovementInsightCard from "../components/analysis/ImprovementInsightCard";
import AnalysisInsight from "../components/analysis/AnalysisInsight";
import type { SkillComparison, MatchJob, InsightCard, PerformanceStat } from "../types/analysis";

const SKILLS: SkillComparison[] = [
  { label: "알고리즘",    mine: 72, avg: 58 },
  { label: "시스템 설계", mine: 88, avg: 65 },
  { label: "DB / SQL",   mine: 65, avg: 62 },
  { label: "API 설계",   mine: 91, avg: 70 },
  { label: "협업 / Git", mine: 82, avg: 75 },
  { label: "문서화",     mine: 60, avg: 64 },
];

const MATCHES: MatchJob[] = [
  {
    id: 1,
    company: "Kakao",
    role: "백엔드 엔지니어 (서버)",
    location: "판교, 경기도",
    score: 94,
    reasons: [
      "API 설계 역량(91점)이 직무 요구 수준을 크게 상회합니다.",
      "시스템 설계 프로젝트가 대용량 트래픽 처리 경험을 직접적으로 입증합니다.",
    ],
    gaps: ["Kotlin 실무 경험", "gRPC 프로토콜"],
  },
  {
    id: 2,
    company: "Naver Cloud",
    role: "클라우드 플랫폼 개발자",
    location: "분당, 경기도",
    score: 89,
    reasons: [
      "분산 시스템 설계와 Redis·Kafka 활용 경험이 클라우드 인프라 직무와 높은 연관성을 보입니다.",
    ],
    gaps: ["Terraform / IaC", "Go 언어 경험"],
  },
  {
    id: 3,
    company: "Toss (토스)",
    role: "Server-Side Engineer",
    location: "강남, 서울",
    score: 87,
    reasons: [
      "금융 도메인의 높은 가용성 요구와 맞닿는 시스템 설계 역량.",
      "PostgreSQL 최적화 경험도 강점입니다.",
    ],
    gaps: ["금융 도메인 지식", "Spring WebFlux"],
  },
  {
    id: 4,
    company: "Coupang",
    role: "Software Development Engineer",
    location: "삼성동, 서울",
    score: 83,
    reasons: [
      "대규모 분산 시스템 경험과 Java 생태계 역량이 이커머스 인프라 요구 사항과 부합합니다.",
    ],
    gaps: ["JVM 튜닝 심화", "MSA 실무 경험"],
  },
  {
    id: 5,
    company: "Line Plus",
    role: "Backend Engineer (메신저 플랫폼)",
    location: "분당, 경기도",
    score: 79,
    reasons: [
      "실시간 메시지 처리와 관련 있는 이벤트 드리븐 아키텍처 경험이 플랫폼 팀의 니즈와 일치합니다.",
    ],
    gaps: ["WebSocket / STOMP", "대규모 채팅 시스템"],
  },
];

const INSIGHTS: InsightCard[] = [
  {
    id: 1,
    severity: "Critical",
    issue: "케이스 스터디가 문제 해결 과정을 잘 서술하지만, 성능 개선 수치(p99 지연 감소, TPS 향상 등) 같은 정량적 결과가 부족합니다.",
    suggestion: "Nebula OS 프로젝트에 트래픽 처리량, 응답 시간 개선율, 비용 절감액 등의 수치를 명시적으로 추가하세요.",
  },
  {
    id: 2,
    severity: "High",
    issue: "시스템 설계 다이어그램이 High-level에 머물러 있고 엣지 케이스나 장애 시나리오에 대한 설명이 없습니다.",
    suggestion: "분산 스케줄러 프로젝트에 시퀀스 다이어그램과 장애 복구 플로우를 추가해 기술적 깊이를 보완하세요.",
  },
  {
    id: 3,
    severity: "Medium",
    issue: "기술 선택(Kafka vs. RabbitMQ 등)에 대한 트레이드오프 분석이 없어 설계 역량이 표면적으로만 드러납니다.",
    suggestion: "각 핵심 기술 선택에 ADR(Architecture Decision Record) 형식의 짧은 설명을 포함하세요.",
  },
  {
    id: 4,
    severity: "Medium",
    issue: "Git 협업 경험이 언급되지만 코드 리뷰 문화 기여, PR 품질 등 협업 역량의 구체적 근거가 없습니다.",
    suggestion: "팀 내 기술 공유 활동(발표, 위키 기여, 온보딩 자료 제작 등)을 포트폴리오에 추가하세요.",
  },
];

const STATS: PerformanceStat[] = [
  { label: "매칭 확률",      value: "상위 15%",  sub: "동일 직군 지원자 대비" },
  { label: "강점 역량",      value: "API 설계",  sub: "92%의 지원자를 상회" },
  { label: "포트폴리오 점수", value: "79점",     sub: "FAANG 기준 최소 85점 권장" },
];

const RECOMMENDATION =
  "현재 포트폴리오는 API 설계와 시스템 설계 역량에서 강점을 보입니다. 정량적 성과 수치 보완과 기술 선택 근거 추가를 통해 FAANG 기준 합격선(85점)을 충분히 넘길 수 있습니다. 우선 '정량적 임팩트 부재' 항목부터 개선을 시작하세요.";

type Tab = "matching" | "feedback";

const TABS: { key: Tab; label: string }[] = [
  { key: "matching", label: "매칭 분석" },
  { key: "feedback", label: "포트폴리오 피드백" },
];

export default function PortfolioAnalysisPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<Tab>("matching");
  const [showMore, setShowMore] = useState(false);

  const visibleMatches = showMore ? MATCHES : MATCHES.slice(0, 3);

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />

      <main className="max-w-[900px] mx-auto px-8 py-9">

        {/* Profile banner */}
        <div
          className="rounded-2xl p-7 mb-7 flex items-center gap-5 relative overflow-hidden bg-[linear-gradient(135deg,#4b2ab8_0%,#6347d1_55%,#9c48ea_100%)]"
        >
          <div
            className="absolute -right-10 -top-10 w-44 h-44 rounded-full pointer-events-none bg-white/6"
          />
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-[22px] font-extrabold text-white shrink-0 bg-white/20 border-2 border-white/30"
          >
            {user?.avatar ?? "?"}
          </div>
          <div className="flex-1">
            <p
              className="text-[10px] font-bold tracking-widest uppercase mb-1 text-white/60 font-label"
            >
              My Portfolio Analysis
            </p>
            <h1 className="text-xl font-extrabold text-white tracking-tight">{user?.name ?? "게스트"}</h1>
            <p className="text-[13px] mt-0.5 text-white/75">
              {user?.role ?? "목표 직군 미설정"}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p
              className="text-[11px] mb-0.5 text-white/60 font-label"
            >
              종합 매칭 점수
            </p>
            <p className="text-[40px] font-extrabold text-white leading-none tracking-tight">
              79<span className="text-xl font-semibold opacity-70">점</span>
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-white border border-surface-container rounded-2xl p-1.5 mb-6 gap-1 w-fit">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-6 py-2.5 rounded-xl text-[13px] font-bold border-0 cursor-pointer font-[inherit] transition-all duration-150 ${activeTab === t.key ? "bg-[linear-gradient(135deg,#6347d1,#9c48ea)] text-white shadow-[0_4px_12px_rgba(99,71,209,0.25)]" : "bg-transparent text-outline"}`}
              
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB 1: 매칭 분석 ── */}
        {activeTab === "matching" && (
          <div className="flex flex-col gap-5">

            {/* Skill comparison */}
            <div className="bg-white rounded-2xl p-8 border border-surface-container shadow-[0_1px_8px_rgba(99,71,209,0.06)]">
              <h2 className="text-base font-extrabold text-on-surface mb-1">역량 비교 분석</h2>
              <p className="text-[13px] text-outline mb-6">동일 직군 지원자 평균 대비 내 점수</p>
              <SkillAnalysisChart skills={SKILLS} />

              <div
                className="mt-6 p-4 rounded-xl border border-[#dddaeb] flex items-center gap-3 bg-[linear-gradient(135deg,#eff4ff,#f5f0ff)]"
              >
                <span className="text-[22px]">✦</span>
                <div className="flex-1">
                  <p
                    className="text-[11px] font-bold text-primary font-label"
                  >
                    최강 역량
                  </p>
                  <p className="text-[13px] text-on-surface mt-0.5">
                    <strong>API 설계</strong> — 동일 직군 지원자의 <strong>92%</strong>를 상회합니다.
                  </p>
                </div>
                <button
                  className="px-4 py-2 rounded-full text-[11px] font-bold text-white border-0 cursor-pointer font-[inherit] shrink-0 bg-[linear-gradient(135deg,#6347d1,#9c48ea)]"
                >
                  역량 개선 →
                </button>
              </div>
            </div>

            {/* Magic Match */}
            <div className="bg-white rounded-2xl p-8 border border-surface-container shadow-[0_1px_8px_rgba(99,71,209,0.06)]">
              <div className="flex items-baseline gap-2 mb-5">
                <h2 className="text-base font-extrabold text-on-surface">Magic Match Top 5 ✦</h2>
                <span className="text-[12px] text-outline">내 포트폴리오 기반 추천 공고</span>
              </div>

              <div className="flex flex-col gap-3.5">
                {visibleMatches.map((job) => (
                  <MatchingResultCard key={job.id} job={job} />
                ))}
              </div>

              {!showMore && (
                <button
                  onClick={() => setShowMore(true)}
                  className="w-full mt-3.5 py-3 bg-transparent text-[13px] font-semibold text-outline cursor-pointer font-[inherit] rounded-xl border border-dashed border-[#c9c4d6]"
                >
                  + 추가 매칭 결과 보기 ({MATCHES.length - 3}개 더)
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 2: 포트폴리오 피드백 ── */}
        {activeTab === "feedback" && (
          <div className="flex flex-col gap-5">

            {/* Improvement insights */}
            <div className="bg-white rounded-2xl p-8 border border-surface-container shadow-[0_1px_8px_rgba(99,71,209,0.06)]">
              <div className="flex items-center gap-2.5 mb-1">
                <h2 className="text-base font-extrabold text-on-surface">Improvement Insights</h2>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold text-primary-container bg-surface-low font-label"
                >
                  Analysis v2.4
                </span>
              </div>
              <p className="text-[13px] text-outline mb-6">AI가 분석한 포트폴리오 개선 우선순위</p>

              <div className="flex flex-col gap-3.5">
                {INSIGHTS.map((insight) => (
                  <ImprovementInsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </div>

            {/* Performance + Score + AI recommendation */}
            <div className="bg-white rounded-2xl p-8 border border-surface-container shadow-[0_1px_8px_rgba(99,71,209,0.06)]">
              <h2 className="text-base font-extrabold text-on-surface mb-5">Performance Summary</h2>

              <AnalysisInsight
                stats={STATS}
                recommendation={RECOMMENDATION}
                onEdit={() => navigate("/builder/step1")}
              />
            </div>

            <ScoreCircle score={79} label="종합 포트폴리오 점수" sub="상위 28% 수준" />
          </div>
        )}
      </main>
    </div>
  );
}
