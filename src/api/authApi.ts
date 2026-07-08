import type { SocialType } from "../types/member";
import { apiFetch, reissueAccessToken } from "./httpClient";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID ?? "";
const GITHUB_REDIRECT_URI =
  import.meta.env.VITE_GITHUB_REDIRECT_URI ?? `${window.location.origin}/oauth/github/callback`;

export interface SocialLoginResult {
  accessToken: string;
  refreshToken: string;
  role: string;
}

export function getGithubAuthorizeUrl(): string {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_REDIRECT_URI,
    scope: "read:user user:email read:org",
  });
  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

// POST /api/v1/members/login?authorizationCode={authorizationCode}
export async function loginWithSocial(
  authorizationCode: string,
  socialType: SocialType
): Promise<SocialLoginResult> {
  return apiFetch<SocialLoginResult>(
    `/api/v1/members/login?authorizationCode=${encodeURIComponent(authorizationCode)}`,
    {
      method: "POST",
      body: JSON.stringify({ socialType }),
    },
    { retryOnAuthError: false }
  );
}

export { reissueAccessToken };
