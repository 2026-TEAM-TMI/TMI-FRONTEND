import type { Member } from "../types/member";
import type { User } from "../types/user";
import { apiFetch } from "./httpClient";

// GET /api/v1/members/me
export async function getMyInfo(): Promise<Member> {
  return apiFetch<Member>("/api/v1/members/me");
}

export function toUser(member: Member): User {
  return {
    name: member.name,
    role: member.role,
    avatar: member.name?.[0]?.toUpperCase() ?? "?",
    color: "#6347d1",
    email: member.email,
    githubLogin: member.githubLogin,
    profileImage: member.profileImage,
  };
}

// GET /api/v1/members/me/repositories
// 참고: Notion 명세서상 응답 데이터 필드가 아직 확정되지 않음 (백엔드 진행상황: 작업 전)
export async function getMyRepositories(): Promise<unknown[]> {
  return apiFetch<unknown[]>("/api/v1/members/me/repositories");
}
