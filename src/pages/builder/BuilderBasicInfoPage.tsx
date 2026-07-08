import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTabs from "../../components/layout/NavTabs";
import BasicInfoStep from "../../components/builder/BasicInfoStep";
import Button from "../../components/common/Button";
import { useBuilderStore } from "../../store/builderStore";
import { isBasicInfoComplete } from "../../utils/builderValidation";

export default function BuilderBasicInfoPage() {
  const navigate = useNavigate();
  const {
    portfolioTitle, setPortfolioTitle,
    portfolioDescription, setPortfolioDescription,
    name, setName,
    contact, addContact, removeContact, updateContact,
    address, setAddress,
    bio, setBio,
    portfolioImages, setPortfolioImages,
  } = useBuilderStore();

  const [attemptedNext, setAttemptedNext] = useState(false);

  const handleContinue = () => {
    if (!isBasicInfoComplete({ portfolioTitle, portfolioDescription, name, bio })) {
      setAttemptedNext(true);
      return;
    }
    navigate("/builder/step1");
  };

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />
      <main className="max-w-190 mx-auto px-8 py-10">
        <div className="bg-white rounded-3xl p-10 border border-surface-container shadow-[0_1px_16px_rgba(59,130,246,0.08)]">
          <div className="mb-8">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-secondary mb-2 font-label">
              기본 정보
            </p>
            <h1 className="text-[26px] font-extrabold text-on-surface tracking-tight mb-2">자기소개</h1>
            <p className="text-[15px] text-on-surface-variant leading-relaxed">
              포트폴리오의 기본 정보를 입력하세요.
            </p>
          </div>

          <BasicInfoStep
            portfolioTitle={portfolioTitle}
            onPortfolioTitleChange={setPortfolioTitle}
            portfolioDescription={portfolioDescription}
            onPortfolioDescriptionChange={setPortfolioDescription}
            name={name}
            onNameChange={setName}
            contact={contact}
            onAddContact={addContact}
            onRemoveContact={removeContact}
            onChangeContact={updateContact}
            address={address}
            onAddressChange={setAddress}
            bio={bio}
            onBioChange={setBio}
            portfolioImages={portfolioImages}
            onPortfolioImagesChange={setPortfolioImages}
            showErrors={attemptedNext}
          />

          <div className="flex justify-between mt-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>← 취소</Button>
            <Button variant="primary" onClick={handleContinue}>계속 →</Button>
          </div>
        </div>
      </main>
    </div>
  );
}