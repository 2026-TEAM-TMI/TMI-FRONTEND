// src/pages/builder/BuilderStep1Page.tsx
import { useAuthStore } from "../../store/authStore";

export default function BuilderStep1Page() {
  const navigate = useAuthStore((s) => s.navigate);

  return (
    <div style={{ padding: 40 }}>
      <h1>Builder - Step 1: Connect your GitHub</h1>
      <p>Step 1 / 2 / 3</p>
      <button onClick={() => navigate("dashboard")}>← Back</button>{" "}
      <button onClick={() => navigate("builder-step2")}>Continue Crafting →</button>
    </div>
  );
}