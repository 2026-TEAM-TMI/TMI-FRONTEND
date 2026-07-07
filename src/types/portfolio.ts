// src/types/portfolio.ts
export type JobCategory = "ALL" | "AI" | "백엔드" | "프론트엔드";

export interface PortfolioCard {
  id: number;
  name: string;
  role: string;
  jobCategory: Exclude<JobCategory, "ALL">;
  title: string;
  desc: string;
  tags: string[];
  matchScore: number;
  views: string;
  likes: string;
  avatar: string;
  color: string;
  gradient: string;
}

export interface PortfolioListItem {
  id: number;
  title: string;
  tags: string[];
  updated: string;
  views: string;
  status: "published" | "draft" | "generating" | "error";
}

export interface Masterpiece {
  id: number;
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