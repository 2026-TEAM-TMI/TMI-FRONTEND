// src/api/portfolioApi.ts
import { apiFetch } from "./httpClient";
import type {
  JobCategory,
  CreatePortfolioRequest,
  CreatePortfolioResponse,
  MemberPortfolio,
  PortfolioFeedResponse,
} from "../types/portfolio";

// UI 표시용 한글 값 -> 서버 jobCategory ENUM 매핑
const JOB_CATEGORY_ENUM: Record<Exclude<JobCategory, "ALL">, string> = {
  AI: "AI",
  백엔드: "BACKEND",
  프론트엔드: "FRONTEND",
};

// GET /api/v1/portfolios — 모든 유저의 public 포트폴리오를 생성일 최신순으로 조회
export async function getPortfolioFeed({
  page = 0,
  size = 15,
  jobCategory,
}: {
  page?: number;
  size?: number;
  jobCategory?: JobCategory;
} = {}): Promise<PortfolioFeedResponse> {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  if (jobCategory && jobCategory !== "ALL") {
    params.set("jobCategory", JOB_CATEGORY_ENUM[jobCategory]);
  }
  return apiFetch<PortfolioFeedResponse>(`/api/v1/portfolios?${params}`, {
    method: "GET",
  });
}

export async function createPortfolio(
  data: CreatePortfolioRequest
): Promise<CreatePortfolioResponse> {
  return apiFetch<CreatePortfolioResponse>("/api/v1/portfolios", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deletePortfolio(id: number): Promise<void> {
  return apiFetch<void>(`/api/v1/portfolios/${id}`, {
    method: "DELETE",
  });
}

// GET /api/v1/portfolios/{memberId}
// 본인 memberId 조회 시 private+public 모두, 타인 memberId 조회 시 public만 반환됨
export async function getMemberPortfolios(
  memberId: number | string
): Promise<MemberPortfolio[]> {
  const { portfolios } = await apiFetch<{ portfolios: MemberPortfolio[] }>(
    `/api/v1/portfolios/${memberId}`,
    { method: "GET" }
  );
  return portfolios;
}