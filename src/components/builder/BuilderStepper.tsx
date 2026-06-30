const STEPS = [
  { num: 1, label: "Connect" },
  { num: 2, label: "Experience" },
  { num: 3, label: "Finish" },
];

interface BuilderStepperProps {
  currentStep: 1 | 2 | 3;
}

export default function BuilderStepper({ currentStep }: BuilderStepperProps) {
  return (
    <div className="flex items-center justify-center mb-12">
      {STEPS.map((step, i) => {
        const done = i + 1 < currentStep;
        const active = i + 1 === currentStep;
        return (
          <div key={step.num} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm transition-all duration-200 ${
                  active
                    ? "bg-[linear-gradient(135deg,#6347d1,#9c48ea)] text-white shadow-[0_4px_12px_rgba(99,71,209,0.3)]"
                    : done
                    ? "bg-surface-container text-primary border-2 border-primary-container"
                    : "bg-surface-container text-outline"
                }`}
              >
                {done ? "✓" : step.num}
              </div>
              <span
                className={`text-[11px] font-semibold tracking-widest font-label ${
                  active ? "text-primary" : done ? "text-primary-container" : "text-outline"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-20 h-0.5 mx-2 mb-4.5 transition-colors duration-200 ${
                  done ? "bg-primary-container" : "bg-surface-container"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
