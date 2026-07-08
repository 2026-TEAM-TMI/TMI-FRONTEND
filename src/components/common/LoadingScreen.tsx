import characterMascot from "../../assets/images/character-mascot.png";

interface LoadingScreenProps {
  label?: string;
}

export default function LoadingScreen({ label = "불러오는 중..." }: LoadingScreenProps) {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center gap-4 bg-surface">
      <img
        src={characterMascot}
        alt=""
        className="w-40 animate-float-orb-slow"
        style={{ filter: "drop-shadow(0 8px 20px rgba(59,130,246,0.25))" }}
      />
      <p className="text-sm font-semibold text-outline animate-pulse">{label}</p>
    </div>
  );
}
