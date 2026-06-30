// src/pages/builder/PublishingProgressPage.tsx
import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";

export default function PublishingProgressPage() {
  const navigate = useAuthStore((s) => s.navigate);

  useEffect(() => {
    const timer = setTimeout(() => navigate("dashboard"), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ padding: 40 }}>
      <h1>Casting your portfolio spell...</h1>
      <p>2초 후 자동으로 Dashboard로 이동합니다.</p>
      <button onClick={() => navigate("dashboard")}>Skip →</button>
    </div>
  );
}