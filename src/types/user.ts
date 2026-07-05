export interface User {
  id?: string;
  name: string;
  role: string;
  company?: string;
  bio?: string;
  avatar: string;
  color: string;
  matchScore?: number;
  followers?: string;
  projects?: string;
  hashtags?: string[];
  // GET /api/v1/members/me 응답 필드 (로그인한 본인 계정 정보)
  email?: string;
  githubLogin?: string | null;
  profileImage?: string | null;
}
