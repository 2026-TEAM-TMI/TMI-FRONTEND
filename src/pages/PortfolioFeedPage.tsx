import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTabs from "../components/layout/NavTabs";
import PortfolioFilterTabs from "../components/portfolio/PortfolioFilterTabs";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";
import PortfolioCard from "../components/portfolio/PortfolioCard";
import Pagination from "../components/common/Pagination";
import type { JobCategory, PortfolioFeedItem } from "../types/portfolio";
import { getPortfolioFeed } from "../api/portfolioApi";
import { extractMemberIdFromPortfolioUrl } from "../utils/portfolioUrl";

const PAGE_SIZE = 15;

export default function PortfolioFeedPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<JobCategory>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [portfolios, setPortfolios] = useState<PortfolioFeedItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPortfolioFeed({ page: currentPage - 1, size: PAGE_SIZE, jobCategory: activeFilter })
      .then((res) => {
        setPortfolios(res.portfolios);
        setTotalPages(Math.max(res.totalPages, 1));
      })
      .catch(() => {
        setPortfolios([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }, [activeFilter, currentPage]);

  const handleFilterChange = (f: JobCategory) => {
    setActiveFilter(f);
    setCurrentPage(1);
  };

  const handlePortfolioClick = (p: PortfolioFeedItem) => {
    navigate("/portfolio/preview", { state: { portfolioUrl: p.url } });
  };

  const handleAuthorClick = (p: PortfolioFeedItem) => {
    const memberId = extractMemberIdFromPortfolioUrl(p.url);
    if (memberId) navigate(`/portfolio/author/${memberId}`);
  };

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />
      <main className="max-w-290 mx-auto px-8 py-9">
        <div className="mb-7">
          <h1 className="text-[28px] font-extrabold text-on-surface tracking-tight mb-1.5">Portfolio Feed ✨</h1>
          <p className="text-sm text-outline">커뮤니티 포트폴리오를 탐색해보세요</p>
        </div>

        <PortfolioFilterTabs active={activeFilter} onChange={handleFilterChange} />

        <PortfolioGrid empty={!loading && portfolios.length === 0}>
          {portfolios.map((p, i) => (
            <PortfolioCard
              key={p.url ?? i}
              portfolio={p}
              onPortfolioClick={() => handlePortfolioClick(p)}
              onAuthorClick={extractMemberIdFromPortfolioUrl(p.url) ? () => handleAuthorClick(p) : undefined}
            />
          ))}
        </PortfolioGrid>

        <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
      </main>
    </div>
  );
}
