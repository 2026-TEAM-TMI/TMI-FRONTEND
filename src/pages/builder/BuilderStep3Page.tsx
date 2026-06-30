// src/pages/builder/BuilderStep3Page.tsx
import { useAuthStore } from "../../store/authStore";

export default function BuilderStep3Page() {
  const navigate = useAuthStore((s) => s.navigate);

  return (
    <div style={{ padding: 40 }}>
      <h1>Builder - Step 3: Finish</h1>
      <p>Visibility Settings: Public / Private</p>
      <button onClick={() => navigate("builder-step2")}>← Back</button>{" "}
      <button onClick={() => navigate("publishing")}>Complete ✨</button>
    </div>
  );
}