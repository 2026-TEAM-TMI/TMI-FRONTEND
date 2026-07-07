import { useAuthStore } from "../store/authStore";

const BASE = import.meta.env.VITE_API_BASE_URL ?? "";

interface ApiEnvelope<T> {
  status: number;
  message: string;
  data: T;
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// 빈 본문(204 등)이나 JSON이 아닌 본문(게이트웨이 에러 페이지 등)에도 안전하게 파싱
async function parseEnvelope<T>(res: Response): Promise<ApiEnvelope<T> | null> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as ApiEnvelope<T>;
  } catch {
    return null;
  }
}

// POST /api/v1/members/reissue — Cookie의 refreshToken으로 accessToken 재발급
export async function reissueAccessToken(): Promise<string> {
  const res = await fetch(`${BASE}/api/v1/members/reissue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const body = await parseEnvelope<{ accessToken: string }>(res);
  if (!res.ok || !body) {
    throw new ApiError(body?.status ?? res.status, body?.message ?? "토큰 재발급에 실패했습니다.");
  }
  useAuthStore.getState().setToken(body.data.accessToken);
  return body.data.accessToken;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  { retryOnAuthError = true }: { retryOnAuthError?: boolean } = {}
): Promise<T> {
  const token = useAuthStore.getState().token;

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  // 백엔드는 accessToken이 없거나 만료됐을 때 401이 아닌 403을 반환하므로(App.tsx 참고)
  // 401뿐 아니라 403에서도 refreshToken으로 재발급 후 1회 재시도한다
  if ((res.status === 401 || res.status === 403) && retryOnAuthError) {
    try {
      await reissueAccessToken();
    } catch {
      useAuthStore.getState().logout();
      throw new ApiError(401, "인증이 만료되었습니다. 다시 로그인해주세요.");
    }
    return apiFetch<T>(path, options, { retryOnAuthError: false });
  }

  const body = await parseEnvelope<T>(res);
  if (!res.ok) {
    throw new ApiError(
      body?.status ?? res.status,
      body?.message ?? `요청에 실패했습니다. (HTTP ${res.status})`
    );
  }
  return (body?.data ?? undefined) as T;
}
