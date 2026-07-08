const STEPS = [
  { num: 1, label: "기본 정보" },
  { num: 2, label: "연동" },
  { num: 3, label: "경력" },
  { num: 4, label: "완료" },
];

interface BuilderStepperProps {
  currentStep: 1 | 2 | 3 | 4;
}

export default function BuilderStepper({ currentStep }: BuilderStepperProps) {
  return (
    <div className="flex items-center justify-center mb-12">
      {STEPS.map((step, i) => {
        const done = i + 1 < currentStep;
        const active = i + 1 === currentStep;
        return (
          <div key={step.num} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-[15px] transition-all duration-300 ${
                  active
                    ? "bg-[linear-gradient(135deg,#3b82f6,#38bdf8)] text-white shadow-[0_6px_20px_rgba(59,130,246,0.4)] scale-110"
                    : done
                    ? "bg-primary-container/20 text-primary-container border-2 border-primary-container"
                    : "bg-surface-container text-outline border-2 border-outline-variant"
                }`}
              >
                {done ? "✓" : step.num}
              </div>
              <span
                className={`text-[11px] font-bold tracking-widest uppercase font-label transition-colors duration-300 ${
                  active ? "text-primary" : done ? "text-primary-container" : "text-outline"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="relative mx-3 mb-5 w-32 h-0.5">
                <div className="absolute inset-0 bg-surface-container rounded-full" />
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#3b82f6,#38bdf8)] transition-all duration-500"
                  style={{ width: done ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}