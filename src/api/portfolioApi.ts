import type { PortfolioCard, JobCategory } from "../types/portfolio";

const BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export async function getPortfolioFeed(
  _category?: JobCategory
): Promise<PortfolioCard[]> {
  // TODO: GET ${BASE}/portfolios?category={category}
  void BASE;
  throw new Error("Not implemented");
}

export async function getPortfolioDetail(
  _id: number
): Promise<PortfolioCard> {
  // TODO: GET ${BASE}/portfolios/{id}
  void BASE;
  throw new Error("Not implemented");
}

export async function createPortfolio(
  _data: Record<string, unknown>
): Promise<{ id: number }> {
  // TODO: POST ${BASE}/portfolios
  void BASE;
  throw new Error("Not implemented");
}

export async function deletePortfolio(_id: number): Promise<void> {
  // TODO: DELETE ${BASE}/portfolios/{id}
  void BASE;
  throw new Error("Not implemented");
}
