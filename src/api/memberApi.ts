import type { Member, DashboardStats } from "../types/member";
import type { User } from "../types/user";
import type { GithubRepository } from "../types/github";
import { apiFetch } from "./httpClient";

// GET /api/v1/members/me
export async function getMyInfo(): Promise<Member> {
  return apiFetch<Member>("/api/v1/members/me");
}

export function toUser(member: Member): User {
  return {
    id: String(member.id),
    name: member.name,
    role: member.role,
    avatar: member.name?.[0]?.toUpperCase() ?? "?",
    color: "#3b82f6",
    email: member.email,
    githubLogin: member.githubLogin,
    profileImage: member.profileImage,
  };
}

// GET /api/v1/members/me/dashboard
export async function getMyDashboard(): Promise<DashboardStats> {
  return apiFetch<DashboardStats>("/api/v1/members/me/dashboard");
}

// GET /api/v1/members/me/repositories
// 참고: write 이상 권한을 가진 레포지토리만 반환됨 (organization read 권한만 있는 레포는 제외, 최대 1000개)
export async function getMyRepositories(): Promise<GithubRepository[]> {
  return apiFetch<GithubRepository[]>("/api/v1/members/me/repositories");
}
