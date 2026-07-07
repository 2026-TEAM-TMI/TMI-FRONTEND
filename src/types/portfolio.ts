// src/types/portfolio.ts
export type JobCategory = "ALL" | "AI" | "백엔드" | "프론트엔드";

// GET /api/v1/portfolios (전체 유저의 public 포트폴리오 피드) 응답 portfolios 배열 원소
export interface PortfolioFeedItem {
  portfolioTitle: string;
  portfolioDescription: string;
  thumbnailImage: string | null;
  jobCategory: string;
  viewsCount: number;
  url: string;
}

export interface PortfolioFeedResponse {
  portfolios: PortfolioFeedItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export interface PortfolioListItem {
  id: number;
  title: string;
  tags: string[];
  updated: string;
  views: string;

  // GET /api/v1/members/{memberId}/portfolios 응답 필드 (실 데이터 병행 표시용, 없으면 undefined)
  description?: string;
  thumbnailImage?: string | null;
  jobCategory?: string;
  url?: string;
  status: "published" | "draft" | "generating" | "error";
}

// GET /api/v1/members/{memberId}/portfolios 응답의 portfolios 배열 원소
export interface MemberPortfolio {
  portfolioTitle: string;
  portfolioDescription: string;
  thumbnailImage: string | null;
  jobCategory: string;
  viewsCount: number;
  url: string;
}

export interface SkillScore {
  label: string;
  value: number;
}

export interface RepoFile {
  file: File;
  status: "uploading" | "done" | "error";
  key?: string;
}

export interface RepoEntry {
  id: number;
  url: string;
  repositoryId: number | null;
  name: string;
  description: string;
  files: RepoFile[];
  images: RepoFile[];
}

export interface Award {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface Activity {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface ContactEntry {
  id: number;
  label: string;
  value: string;
}

// ===== 포트폴리오 생성 Request Body =====

export interface ProjectRequest {
  name: string;
  repositoryId: number;
  description?: string;
  fileKeys?: string[];
  imageKeys?: string[];
}

export interface AwardRequest {
  title: string;
  organization?: string;
  date?: string;
  description?: string;
}

export interface ActivityRequest {
  title: string;
  organization?: string;
  period?: string;
  description?: string;
}

export interface CreatePortfolioRequest {
  portfolioTitle: string;
  portfolioDescription: string;
  isPublic: boolean;
  name: string;
  contact?: Record<string, string>;
  address?: string;
  description: string;
  jobCategory: string;
  portfolioImageKeys?: string[];
  customPrompt?: string;
  projects: ProjectRequest[];
  awards?: AwardRequest[];
  activities?: ActivityRequest[];
}

export interface CreatePortfolioResponse {
  id: number;
}