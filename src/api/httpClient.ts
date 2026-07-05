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

// POST /api/v1/members/reissue — Cookie의 refreshToken으로 accessToken 재발급
export async function reissueAccessToken(): Promise<string> {
  const res = await fetch(`${BASE}/api/v1/members/reissue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const body = (await res.json()) as ApiEnvelope<{ accessToken: string }>;
  if (!res.ok) {
    throw new ApiError(body.status ?? res.status, body.message ?? "토큰 재발급에 실패했습니다.");
  }
  useAuthStore.getState().setToken(body.data.accessToken);
  return body.data.accessToken;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  { retryOn401 = true }: { retryOn401?: boolean } = {}
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

  if (res.status === 401 && retryOn401) {
    try {
      await reissueAccessToken();
    } catch {
      useAuthStore.getState().logout();
      throw new ApiError(401, "인증이 만료되었습니다. 다시 로그인해주세요.");
    }
    return apiFetch<T>(path, options, { retryOn401: false });
  }

  const body = (await res.json()) as ApiEnvelope<T>;
  if (!res.ok) {
    throw new ApiError(body.status ?? res.status, body.message ?? "요청에 실패했습니다.");
  }
  return body.data;
}
