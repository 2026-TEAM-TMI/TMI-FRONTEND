import type { Award, Education } from "../../types/portfolio";
import AwardsSection from "./AwardsSection";
import EducationSection from "./EducationSection";

interface ExtraExperienceStepProps {
  awards: Award[];
  onAddAward: () => void;
  onRemoveAward: (id: number) => void;
  onChangeAward: (id: number, field: keyof Omit<Award, "id">, value: string) => void;
  educations: Education[];
  onAddEducation: () => void;
  onRemoveEducation: (id: number) => void;
  onChangeEducation: (id: number, field: keyof Omit<Education, "id">, value: string) => void;
}

export default function ExtraExperienceStep({
  awards,
  onAddAward,
  onRemoveAward,
  onChangeAward,
  educations,
  onAddEducation,
  onRemoveEducation,
  onChangeEducation,
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
        educations={educations}
        onAdd={onAddEducation}
        onRemove={onRemoveEducation}
        onChange={onChangeEducation}
      />
    </>
  );
}
