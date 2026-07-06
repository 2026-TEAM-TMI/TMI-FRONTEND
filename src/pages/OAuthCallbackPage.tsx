// src/pages/OAuthCallbackPage.tsx
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
      setError("인가코드를 받아오지 못했습니다. GitHub 로그인을 다시 시도해주세요.");
      return;
    }

    completeSocialLogin(code, "GITHUB").catch((err: unknown) => {
      let message = "로그인에 실패했습니다. 다시 시도해주세요.";

      if (err instanceof TypeError) {
        // fetch 자체가 실패한 경우 (네트워크 단절, 서버 다운 등)
        message = "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.";
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRetry = () => {
    // 만료된 authorizationCode는 재사용 불가하므로
    // 반드시 /login에서 GitHub OAuth 인가 요청을 처음부터 다시 시작해야 함
    navigate("/login", { replace: true });
  };

  return <OAuthCallbackStatus error={error} onRetry={handleRetry} />;
}
