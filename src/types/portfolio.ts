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
  status: "published" | "draft" | "generating";
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
  value: number; // 0–1
}

export interface RepoEntry {
  id: number;
  url: string;
  description: string;
  files: File[];
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
