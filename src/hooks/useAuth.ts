import { useAuthStore } from "../store/authStore";
import type { User } from "../types/user";

export function useAuth() {
  const { navigate, setUser, setToken, logout: storeLogout, user, isLoggedIn, currentRoute } = useAuthStore();

  function login(_email: string, _password: string) {
    // TODO: wire to authApi.loginWithEmail once backend is ready
    const mockUser: User = {
      name: "Guest",
      role: "개발자",
      avatar: "G",
      color: "#6347d1",
    };
    setUser(mockUser);
    setToken("mock-token");
    navigate("dashboard");
  }

  function loginWithGithub() {
    // TODO: wire to authApi.loginWithGithub (OAuth) once backend is ready
    const mockUser: User = {
      name: "Elena Vane",
      role: "AI 엔지니어",
      avatar: "E",
      color: "#6347d1",
    };
    setUser(mockUser);
    setToken("mock-github-token");
    navigate("dashboard");
  }

  function logout() {
    storeLogout();
  }

  return { login, loginWithGithub, logout, user, isLoggedIn, currentRoute, navigate };
}
