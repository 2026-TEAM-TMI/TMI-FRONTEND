// GET /api/v1/members/me/repositories 응답 data 배열의 원소 타입
export interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  default_branch: string;
  private: boolean;
}
