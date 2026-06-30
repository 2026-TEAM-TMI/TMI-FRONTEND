// src/pages/CoffeeChatPage.tsx
import { useAuthStore } from "../store/authStore";
import NavTabs from "../components/layout/NavTabs";

const rooms = ["Elena Vane", "Caleb Turner", "Maya Sterling"];

export default function CoffeeChatPage() {
  const navigate = useAuthStore((s) => s.navigate);

  return (
    <div>
      <NavTabs />
      <div style={{ display: "flex", padding: 40, gap: 40 }}>
        <div>
          <h3>Chat Rooms</h3>
          {rooms.map((r) => (
            <p key={r} style={{ cursor: "pointer" }}>{r}</p>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <h1>Coffee Chat Room</h1>
          <p>"How was your time at Polis? Would you be interested in joining us?"</p>
          <input placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </div>
      <div style={{ padding: 40 }}>
        <button onClick={() => navigate("dashboard")}>← Back to Dashboard</button>
      </div>
    </div>
  );
}