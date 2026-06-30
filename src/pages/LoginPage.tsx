// src/pages/LoginPage.tsx
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const navigate = useAuthStore((s) => s.navigate);

  return (
    <div style={{ padding: 40 }}>
      <h1>Login Page</h1>
      <p>Welcome Back - Continue your journey of transmutation</p>
      <button onClick={() => navigate("dashboard")}>Enter the Atelier</button>
    </div>
  );
}