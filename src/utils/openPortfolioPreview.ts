import type { NavigateFunction } from "react-router-dom";
import { getMemberPortfolios } from "../api/portfolioApi";

// 카드 클릭 시 memberId로 실제 포트폴리오 url을 조회해 preview 페이지 내부에서 열어준다.
export async function openMemberPortfolioPreview(navigate: NavigateFunction, memberId: number) {
  try {
    const portfolios = await getMemberPortfolios(memberId);
    const url = portfolios[0]?.url;
    if (!url) {
      alert("공개된 포트폴리오가 없습니다.");
      return;
    }
    navigate("/portfolio/preview", { state: { portfolioUrl: url } });
  } catch {
    alert("포트폴리오를 불러오지 못했습니다.");
  }
}
