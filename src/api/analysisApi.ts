import type { MatchJob, InsightCard } from "../types/analysis";

const BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export async function getMatchingJobs(
  _portfolioId: number
): Promise<MatchJob[]> {
  // TODO: GET ${BASE}/analysis/{portfolioId}/matching
  void BASE;
  throw new Error("Not implemented");
}

export async function getFeedback(
  _portfolioId: number
): Promise<InsightCard[]> {
  // TODO: GET ${BASE}/analysis/{portfolioId}/feedback
  void BASE;
  throw new Error("Not implemented");
}

export async function getAnalysis(
  _portfolioId: number
): Promise<{ score: number; insight: string }> {
  // TODO: GET ${BASE}/analysis/{portfolioId}
  void BASE;
  throw new Error("Not implemented");
}
