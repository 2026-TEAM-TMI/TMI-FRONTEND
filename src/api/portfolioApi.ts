// src/api/portfolioApi.ts
import { apiFetch } from "./httpClient";
import type {
  PortfolioCard,
  JobCategory,
  CreatePortfolioRequest,
  CreatePortfolioResponse,
  MemberPortfolio,
} from "../types/portfolio";

export async function getPortfolioFeed(
  category?: JobCategory
): Promise<PortfolioCard[]> {
  const query =
    category && category !== "ALL"
      ? `?category=${encodeURIComponent(category)}`
      : "";
  return apiFetch<PortfolioCard[]>(`/api/v1/portfolios${query}`, {
    method: "GET",
  });
}

export async function getPortfolioDetail(id: number): Promise<PortfolioCard> {
  return apiFetch<PortfolioCard>(`/api/v1/portfolios/${id}`, {
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