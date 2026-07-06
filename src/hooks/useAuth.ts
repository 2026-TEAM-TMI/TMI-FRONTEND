import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getGithubAuthorizeUrl, loginWithSocial } from "../api/authApi";
import { getMyInfo, toUser } from "../api/memberApi";
import type { SocialType } from "../types/member";

export function useAuth() {
  const { setUser, setToken, logout: storeLogout, user, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  function loginWithGithub() {
    window.location.href = getGithubAuthorizeUrl();
  }

  async function completeSocialLogin(authorizationCode: string, socialType: SocialType = "GITHUB") {
    const { accessToken } = await loginWithSocial(authorizationCode, socialType);
    setToken(accessToken);

    const info = await getMyInfo();
    setUser(toUser(info));
    navigate("/dashboard", { replace: true });
  }

  function logout() {
    storeLogout();
    navigate("/login", { replace: true });
  }

  return { loginWithGithub, completeSocialLogin, logout, user, isLoggedIn };
}
