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
}: ExtraExperienceStepProps) {
  return (
    <>
      <AwardsSection
        awards={awards}
        onAdd={onAddAward}
        onRemove={onRemoveAward}
        onChange={onChangeAward}
      />
      <EducationSection
        activities={activities}
        onAdd={onAddActivity}
        onRemove={onRemoveActivity}
        onChange={onChangeActivity}
      />
    </>
  );
}