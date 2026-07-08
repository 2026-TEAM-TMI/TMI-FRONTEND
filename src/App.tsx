import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import LoadingScreen from "./components/common/LoadingScreen";
import { useAuthStore } from "./store/authStore";
import { getMyInfo, toUser } from "./api/memberApi";
import { reissueAccessToken } from "./api/authApi";

export default function App() {
  const [sessionChecked, setSessionChecked] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // 새로고침 직후엔 메모리에 accessToken이 없어 /me가 401이 아닌 403을 받고,
    // apiFetch의 재발급 재시도가 걸리지 않는다. refreshToken 쿠키로 먼저 재발급을 시도한다.
    reissueAccessToken()
      .then(() => getMyInfo())
      .then((info) => setUser(toUser(info)))
      .catch(() => {})
      .finally(() => setSessionChecked(true));
  }, [setUser]);

  if (!sessionChecked) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
