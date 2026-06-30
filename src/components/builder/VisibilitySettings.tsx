type Visibility = "public" | "private";

interface VisibilitySettingsProps {
  value: Visibility;
  onChange: (v: Visibility) => void;
}

const OPTIONS: { value: Visibility; icon: string; label: string; desc: string }[] = [
  { value: "public", icon: "🌍", label: "Public", desc: "Visible to everyone in the Feed" },
  { value: "private", icon: "🔒", label: "Private", desc: "Only accessible via link" },
];

export default function VisibilitySettings({ value, onChange }: VisibilitySettingsProps) {
  return (
    <div className="mb-8">
      <h3 className="text-[15px] font-bold text-on-surface mb-3.5">🔒 Visibility</h3>
      <div className="flex gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="flex-1 p-4 rounded-2xl cursor-pointer font-[inherit] text-center"
            style={{
              border: `2px solid ${value === opt.value ? "#6347d1" : "#e6eeff"}`,
              background: value === opt.value ? "#f0f0ff" : "#f8f9ff",
            }}
          >
            <div className="text-2xl mb-1.5">{opt.icon}</div>
            <p className="font-bold text-sm text-on-surface capitalize">{opt.label}</p>
            <p className="text-[12px] text-on-surface-variant mt-0.5">{opt.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
