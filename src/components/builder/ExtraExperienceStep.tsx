import type { Award, Activity } from "../../types/portfolio";
import AwardsSection from "./AwardsSection";
import EducationSection from "./EducationSection";

interface ExtraExperienceStepProps {
  awards: Award[];
  onAddAward: () => void;
  onRemoveAward: (id: number) => void;
  onChangeAward: (id: number, field: keyof Omit<Award, "id">, value: string) => void;
  activities: Activity[];
  onAddActivity: () => void;
  onRemoveActivity: (id: number) => void;
  onChangeActivity: (id: number, field: keyof Omit<Activity, "id">, value: string) => void;
  showErrors?: boolean;
}

export default function ExtraExperienceStep({
  awards,
  onAddAward,
  onRemoveAward,
  onChangeAward,
  activities,
  onAddActivity,
  onRemoveActivity,
  onChangeActivity,
  showErrors = false,
}: ExtraExperienceStepProps) {
  return (
    <>
      <AwardsSection
        awards={awards}
        onAdd={onAddAward}
        onRemove={onRemoveAward}
        onChange={onChangeAward}
        showErrors={showErrors}
      />
      <EducationSection
        activities={activities}
        onAdd={onAddActivity}
        onRemove={onRemoveActivity}
        onChange={onChangeActivity}
        showErrors={showErrors}
      />
    </>
  );
}