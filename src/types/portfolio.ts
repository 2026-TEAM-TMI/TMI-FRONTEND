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
  status: "published" | "draft" | "generating";
  // GET /api/v1/members/{memberId}/portfolios 응답 필드 (실 데이터 병행 표시용, 없으면 undefined)
  description?: string;
  thumbnailImage?: string | null;
  jobCategory?: string;
  url?: string;
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

export interface Masterpiece {
  id: number;
  // GET /api/v1/portfolios/{memberId} 호출용. 실 데이터 연동 전까지는 목업 값
  memberId: number;
  title: string;
  desc: string;
  tags: string[];
  likes: string;
  comments: string;
  gradient: string;
  accent: string;
}

export interface SkillScore {
  label: string;
  value: number; // 0–1
}

export type UploadStatus = "uploading" | "done" | "error";

export interface RepoFile {
  file: File;
  status: UploadStatus;
  key?: string;
}

export interface RepoEntry {
  id: number;
  url: string;
  description: string;
  files: RepoFile[];
}

export interface Award {
  id: number;
  name: string;
  type: string;
  date: string;
  description: string;
}

export interface Education {
  id: number;
  program: string;
  startDate: string;
  endDate: string;
  description: string;
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