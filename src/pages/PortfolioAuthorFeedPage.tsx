import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavTabs from "../components/layout/NavTabs";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";
import PortfolioCard from "../components/portfolio/PortfolioCard";
import { getMemberPortfolios } from "../api/portfolioApi";
import type { MemberPortfolio } from "../types/portfolio";

// 피드 응답엔 작성자 식별 정보가 없어 url에서 memberId를 임시로 추출해 이 페이지로 진입한다.
// 이름/아바타 등 프로필 정보는 이 API로 조회할 수 없어 목록만 보여준다.
export default function PortfolioAuthorFeedPage() {
  const navigate = useNavigate();
  const { memberId } = useParams<{ memberId: string }>();
  const [portfolios, setPortfolios] = useState<MemberPortfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!memberId) return;
    setLoading(true);
    getMemberPortfolios(memberId)
      .then(setPortfolios)
      .catch(() => setPortfolios([]))
      .finally(() => setLoading(false));
  }, [memberId]);

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />
      <main className="max-w-290 mx-auto px-8 py-9">
        <button
          onClick={() => navigate("/portfolio/feed")}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-outline bg-transparent border-0 cursor-pointer font-[inherit] mb-7 p-0"
        >
          ← 피드로 돌아가기
        </button>

        <div className="mb-7">
          <h1 className="text-[22px] font-extrabold text-on-surface tracking-tight mb-1.5">작성자의 포트폴리오</h1>
          <p className="text-sm text-outline">이 작성자가 공개한 다른 포트폴리오예요</p>
        </div>

        <PortfolioGrid empty={!loading && portfolios.length === 0}>
          {portfolios.map((p, i) => (
            <PortfolioCard
              key={p.url ?? i}
              portfolio={p}
              onPortfolioClick={() => navigate("/portfolio/preview", { state: { portfolioUrl: p.url } })}
            />
          ))}
        </PortfolioGrid>
      </main>
    </div>
  );
}
