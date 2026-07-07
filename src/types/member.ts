export type SocialType = "GOOGLE" | "GITHUB";

// GET /api/v1/members/me 응답 data
export interface Member {
  id: number;
  githubLogin: string | null;
  name: string;
  profileImage: string | null;
  role: string;
  email: string;
}

// GET /api/v1/members/me/dashboard 응답 data
export interface DashboardStats {
  portfolioCount: number;
  totalViewsCount: number;
}
