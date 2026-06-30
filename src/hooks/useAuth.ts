import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const navigate = useAuthStore((s) => s.navigate);
  const currentRoute = useAuthStore((s) => s.currentRoute);
  return { navigate, currentRoute };
}
