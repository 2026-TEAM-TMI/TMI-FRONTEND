import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { User } from "../types/user";

export function useAuth() {
  const { setUser, setToken, logout: storeLogout, user, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  function login(_email: string, _password: string) {
    const mockUser: User = { name: "Guest", role: "개발자", avatar: "G", color: "#6347d1" };
    setUser(mockUser);
    setToken("mock-token");
    navigate("/dashboard");
  }

  function loginWithGithub() {
    const mockUser: User = { name: "Elena Vane", role: "AI 엔지니어", avatar: "E", color: "#6347d1" };
    setUser(mockUser);
    setToken("mock-github-token");
    navigate("/dashboard");
  }

  function logout() {
    storeLogout();
    navigate("/login");
  }

  return { login, loginWithGithub, logout, user, isLoggedIn };
}
