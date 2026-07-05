export type SocialType = "GOOGLE" | "GITHUB";

// GET /api/v1/members/me 응답 data
export interface Member {
  githubLogin: string | null;
  name: string;
  profileImage: string | null;
  role: string;
  email: string;
}
