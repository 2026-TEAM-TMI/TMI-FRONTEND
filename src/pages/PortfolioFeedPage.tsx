// src/pages/PortfolioFeedPage.tsx
import { useAuthStore } from "../store/authStore";
import NavTabs from "../components/layout/NavTabs";

const dummyPortfolios = [
  { id: 1, name: "Elena Vane", title: "Lumina: A Journey through Generative Dreamscapes" },
  { id: 2, name: "Julian Thorne", title: "Fluxengine: Real-time Particle Transmutation" },
  { id: 3, name: "Maya Sol", title: "Ethos: Transmuting Identity into Digital Aura" },
];

export default function PortfolioFeedPage() {
  const navigate = useAuthStore((s) => s.navigate);

  return (
    <div>
      <NavTabs />
      <div style={{ padding: 40 }}>
        <h1>Portfolio Feed</h1>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {dummyPortfolios.map((p) => (
            <div key={p.id} style={{ border: "1px solid #ccc", padding: 16, width: 200 }}>
              <p style={{ fontWeight: "bold" }}>{p.name}</p>
              <p style={{ fontSize: 14 }}>{p.title}</p>
              <button onClick={() => navigate("portfolio-detail")}>View</button>{" "}
              <button onClick={() => navigate("coffee-chat")}>Request Coffee Chat</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}