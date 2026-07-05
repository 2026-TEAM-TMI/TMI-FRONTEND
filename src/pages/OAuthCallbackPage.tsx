import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import OAuthCallbackStatus from "../components/auth/OAuthCallbackStatus";

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { completeSocialLogin } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const code = searchParams.get("code");
    if (!code) {
      setError("인가코드를 받아오지 못했습니다.");
      return;
    }

    completeSocialLogin(code, "GITHUB").catch((err: unknown) => {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <OAuthCallbackStatus error={error} onRetry={() => navigate("/login")} />;
}
