// src/api/portfolioApi.ts
import { apiFetch } from "./httpClient";
import type {
  PortfolioCard,
  JobCategory,
  CreatePortfolioRequest,
  CreatePortfolioResponse,
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