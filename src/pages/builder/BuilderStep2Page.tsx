// src/pages/builder/BuilderStep2Page.tsx
import { useAuthStore } from "../../store/authStore";

export default function BuilderStep2Page() {
  const navigate = useAuthStore((s) => s.navigate);

  return (
    <div style={{ padding: 40 }}>
      <h1>Builder - Step 2: Extra Experience</h1>
      <p>Awards & Honors / External Education</p>
      <button onClick={() => navigate("builder-step1")}>← Back</button>{" "}
      <button onClick={() => navigate("builder-step3")}>Next: Finish →</button>
    </div>
  );
}