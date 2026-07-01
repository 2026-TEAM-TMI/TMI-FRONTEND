// src/pages/PortfolioPreviewPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTabs from "../components/layout/NavTabs";
import SkillRadarChart from "../components/portfolio/SkillRadarChart";
import ProgressBar from "../components/common/ProgressBar";
import ScoreCircle from "../components/analysis/ScoreCircle";
import type { SkillScore } from "../types/portfolio";

const SKILLS: SkillScore[] = [
  { label: "알고리즘", value: 0.72 },
  { label: "시스템 설계", value: 0.85 },
  { label: "DB / SQL", value: 0.68 },
  { label: "API 설계", value: 0.9 },
  { label: "협업 / Git", value: 0.8 },
  { label: "문서화", value: 0.6 },
];

const MOCK_HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>Portfolio — Elena Vane</title>
  <style>
    body { margin: 0; font-family: 'Plus Jakarta Sans', sans-serif; background: #f8f9ff; color: #121c2a; }
    header { background: linear-gradient(135deg,#4b2ab8,#9c48ea); color:#fff; padding:48px; }
    header h1 { font-size:36px; margin:0 0 8px; }
    header p { opacity:.75; font-size:16px; margin:0; }
    main { max-width:860px; margin:0 auto; padding:40px 32px; }
    .section { background:#fff; border-radius:16px; padding:28px; margin-bottom:20px;
      border:1px solid #e6eeff; box-shadow:0 1px 8px rgba(99,71,209,.06); }
    h2 { font-size:18px; margin:0 0 16px; color:#4b2ab8; }
    .tag { display:inline-block; background:#e6eeff; color:#4b2ab8; border-radius:999px;
      padding:3px 12px; font-size:12px; font-weight:600; margin:3px; }
    .project { border-top:1px solid #e6eeff; padding-top:16px; margin-top:16px; }
    .project:first-of-type { border-top:none; padding-top:0; margin-top:0; }
    .project h3 { font-size:16px; margin:0 0 6px; }
    .project p { font-size:14px; color:#484554; line-height:1.6; margin:0; }
  </style>
</head>
<body>
  <header>
    <h1>Elena Vane</h1>
    <p>Backend Engineer · 시스템 설계 & 대용량 트래픽 처리 전문</p>
  </header>
  <main>
    <div class="section">
      <h2>Skills</h2>
      <span class="tag">Java / Spring</span><span class="tag">Kotlin</span>
      <span class="tag">PostgreSQL</span><span class="tag">Redis</span>
      <span class="tag">Kafka</span><span class="tag">Docker / K8s</span><span class="tag">AWS</span>
    </div>
    <div class="section">
      <h2>Projects</h2>
      <div class="project">
        <h3>Nebula OS — Distributed Job Scheduler</h3>
        <p>초당 10만 건 이상의 작업을 처리하는 분산 스케줄러 설계 및 구현. Kafka 기반 메시지 파이프라인으로 지연 99p 40ms → 8ms 개선.</p>
      </div>
      <div class="project">
        <h3>Lumina — Real-time Analytics Pipeline</h3>
        <p>Flink + ClickHouse 기반 실시간 집계 파이프라인. 일별 2억 이벤트 처리, 대시보드 응답 시간 3초 → 0.4초 단축.</p>
      </div>
    </div>
  </main>
</body>
</html>`;

const SIDEBAR_W = 300;

export default function PortfolioPreviewPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleDownload = () => {
    const blob = new Blob([MOCK_HTML], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-elena-vane.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-svh font-sans flex flex-col" style={{ background: "#f0f2f8" }}>
      <NavTabs />

      {/* Top bar */}
      <div
        className="bg-white border-b border-surface-container flex items-center gap-3 px-7 py-3 sticky top-16 z-10"
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 text-sm font-semibold text-outline bg-transparent border-0 cursor-pointer font-[inherit]"
        >
          ← 대시보드
        </button>
        <div className="w-px h-[18px] bg-surface-container" />
        <span
          className="text-[11px] font-bold tracking-widest uppercase text-secondary"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          Portfolio Preview
        </span>

        <div className="ml-auto flex gap-2.5 items-center">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 bg-surface-low border border-outline-variant rounded-xl text-[13px] font-bold text-primary cursor-pointer font-[inherit]"
          >
            ⬇ HTML 다운로드
          </button>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold cursor-pointer font-[inherit] transition-all duration-200 border"
            style={{
              background: sidebarOpen ? "linear-gradient(135deg,#6347d1,#9c48ea)" : "#f8f9ff",
              borderColor: sidebarOpen ? "transparent" : "#e6eeff",
              color: sidebarOpen ? "#fff" : "#484554",
            }}
          >
            {sidebarOpen ? "◀ 분석 닫기" : "▶ 분석 열기"}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Preview */}
        <div
          className="flex-1 p-7 overflow-auto transition-all duration-300"
          style={{ marginRight: sidebarOpen ? `${SIDEBAR_W}px` : "0" }}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden border border-surface-container"
            style={{ boxShadow: "0 4px 24px rgba(99,71,209,0.10)", minHeight: "600px" }}
          >
            <iframe
              srcDoc={MOCK_HTML}
              title="Portfolio Preview"
              className="w-full border-0 block"
              style={{ minHeight: "700px" }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div
          className="fixed top-16 right-0 bg-white border-l border-surface-container flex flex-col overflow-auto z-10 transition-transform duration-300"
          style={{
            width: SIDEBAR_W,
            height: "calc(100svh - 64px)",
            transform: sidebarOpen ? "translateX(0)" : `translateX(${SIDEBAR_W}px)`,
          }}
        >
          <div className="px-5 py-4 border-b border-surface-container" style={{ background: "linear-gradient(135deg,#faf9ff,#eff4ff)" }}>
            <p className="text-[10px] font-bold tracking-widest uppercase text-secondary mb-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
              직무 역량 분석
            </p>
            <p className="text-sm font-bold text-on-surface">백엔드 · 목표 직무 적합도</p>
          </div>

          <div className="px-3 pt-5 pb-2">
            <SkillRadarChart skills={SKILLS} size={260} color="#6347d1" />
          </div>

          <div className="px-5 pb-5 flex flex-col gap-2.5">
            {SKILLS.map((s) => (
              <ProgressBar key={s.label} label={s.label} value={s.value} accentColor="#6347d1" height={5} />
            ))}
          </div>

          <div className="mx-5 mb-5">
            <ScoreCircle score={79} sub="상위 28% 수준" />
          </div>

          <div className="h-px bg-surface-container mx-5 mb-5" />

          <div className="px-5 pb-7 flex flex-col gap-2.5">
            <button
              onClick={handleDownload}
              className="w-full py-3 bg-surface-low border border-outline-variant rounded-xl text-sm font-bold text-primary cursor-pointer font-[inherit] flex items-center justify-center gap-2"
            >
              ⬇ HTML 다운로드
            </button>
            <button
              onClick={() => navigate("/portfolio/analysis")}
              className="w-full py-3 rounded-xl text-sm font-bold text-white border-0 cursor-pointer font-[inherit] flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg,#6347d1,#9c48ea)", boxShadow: "0 4px 16px rgba(99,71,209,0.3)" }}
            >
              📊 상세 분석 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
