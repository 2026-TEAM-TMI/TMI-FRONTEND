import type { ContactEntry, RepoFile } from "../../types/portfolio";
import { Textarea } from "../common/Input";
import { uploadFile } from "../../api/uploadApi";
import { useEffect, useRef, useState } from "react";

const labelCls = "block text-[13px] font-semibold text-on-surface-variant mb-1.5";
const inputCls =
  "w-full px-4 py-3 rounded-xl border-[1.5px] border-outline-variant bg-white text-[14px] text-on-surface focus:outline-none focus:border-primary-container transition-colors duration-150";
// 연락처 행처럼 폭을 flex로 직접 제어해야 하는 곳에서 사용. inputCls의 w-full과 겹치면 유틸리티 충돌로 레이아웃이 깨진다.
const flexInputCls = inputCls.replace("w-full ", "");
const errorTextCls = "text-[12px] text-red-500 mt-1";
const requiredMark = <span className="text-red-500 ml-0.5">*</span>;
const errorBorderStyle = { borderColor: "#f87171" };

const CONTACT_TYPE_OPTIONS = ["이메일", "휴대전화", "GitHub", "LinkedIn", "블로그", "기타"];

interface BasicInfoStepProps {
  portfolioTitle: string;
  onPortfolioTitleChange: (v: string) => void;
  portfolioDescription: string;
  onPortfolioDescriptionChange: (v: string) => void;
  name: string;
  onNameChange: (v: string) => void;
  contact: ContactEntry[];
  onAddContact: () => void;
  onRemoveContact: (id: number) => void;
  onChangeContact: (id: number, field: keyof Omit<ContactEntry, "id">, value: string) => void;
  address: string;
  onAddressChange: (v: string) => void;
  bio: string;
  onBioChange: (v: string) => void;
  portfolioImages: RepoFile[];
  onPortfolioImagesChange: (files: RepoFile[]) => void;
  showErrors?: boolean;
}

export default function BasicInfoStep({
  portfolioTitle, onPortfolioTitleChange,
  portfolioDescription, onPortfolioDescriptionChange,
  name, onNameChange,
  contact, onAddContact, onRemoveContact, onChangeContact,
  address, onAddressChange,
  bio, onBioChange,
  portfolioImages, onPortfolioImagesChange,
  showErrors = false,
}: BasicInfoStepProps) {
  const [dragOver, setDragOver] = useState(false);
  const filesRef = useRef<RepoFile[]>(portfolioImages);
  useEffect(() => {
    filesRef.current = portfolioImages;
  }, [portfolioImages]);

  const setFiles = (updater: (prev: RepoFile[]) => RepoFile[]) => {
    const next = updater(filesRef.current);
    filesRef.current = next;
    onPortfolioImagesChange(next);
  };

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const allowed = ["image/png", "image/jpeg", "image/webp"];
    const valid = Array.from(incoming).filter((f) => allowed.includes(f.type));
    if (valid.length === 0) return;

    const pending: RepoFile[] = valid.map((file) => ({ file, status: "uploading" }));
    setFiles((prev) => [...prev, ...pending]);

    pending.forEach((entry) => {
      uploadFile(entry.file, "PORTFOLIO_IMAGE")
        .then((key) => {
          setFiles((prev) => prev.map((f) => (f.file === entry.file ? { ...f, status: "done", key } : f)));
        })
        .catch(() => {
          setFiles((prev) => prev.map((f) => (f.file === entry.file ? { ...f, status: "error" } : f)));
        });
    });
  };

  const removeFile = (target: File) => {
    setFiles((prev) => prev.filter((f) => f.file !== target));
  };

  return (
    <>
      <div className="mb-6">
        <label className={labelCls}>포트폴리오 제목{requiredMark}</label>
        <input
          className={inputCls}
          style={showErrors && !portfolioTitle.trim() ? errorBorderStyle : undefined}
          value={portfolioTitle}
          onChange={(e) => onPortfolioTitleChange(e.target.value)}
          placeholder="예) 사용자 중심의 프론트엔드 개발자, 우콩입니다"
        />
        {showErrors && !portfolioTitle.trim() && <p className={errorTextCls}>필수 입력 항목입니다.</p>}
      </div>

      <div className="mb-6">
        <label className={labelCls}>포트폴리오 한 줄 설명{requiredMark}</label>
        <input
          className={inputCls}
          style={showErrors && !portfolioDescription.trim() ? errorBorderStyle : undefined}
          value={portfolioDescription}
          onChange={(e) => onPortfolioDescriptionChange(e.target.value)}
          placeholder="예) 성장 지향적인 프론트엔드 개발자입니다"
        />
        {showErrors && !portfolioDescription.trim() && <p className={errorTextCls}>필수 입력 항목입니다.</p>}
      </div>

      <div className="mb-6">
        <label className={labelCls}>이름{requiredMark}</label>
        <input
          className={inputCls}
          style={showErrors && !name.trim() ? errorBorderStyle : undefined}
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="이름을 입력하세요"
        />
        {showErrors && !name.trim() && <p className={errorTextCls}>필수 입력 항목입니다.</p>}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-1.5">
          <label className={labelCls + " mb-0"}>연락처</label>
          <button
            onClick={onAddContact}
            className="text-[12px] font-bold text-primary-container hover:opacity-80"
          >
            + 항목 추가
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {contact.map((c) => {
            // 같은 종류(예: 이메일)는 다른 행에서 이미 선택했으면 이 행의 드랍다운에서 비활성화. "기타"는 여러 번 추가 가능하므로 제외.
            const usedTypes = contact
              .filter((o) => o.id !== c.id && o.type && o.type !== "기타")
              .map((o) => o.type);

            return (
              <div key={c.id} className="flex gap-2">
                <div className="relative w-32 shrink-0">
                  <select
                    className={flexInputCls + " w-full appearance-none pr-8 cursor-pointer"}
                    value={c.type}
                    onChange={(e) => onChangeContact(c.id, "type", e.target.value)}
                  >
                    <option value="">선택하세요</option>
                    {CONTACT_TYPE_OPTIONS.map((opt) => {
                      const disabled = opt !== "기타" && usedTypes.includes(opt);
                      return (
                        <option key={opt} value={opt} disabled={disabled}>
                          {opt}{disabled ? " (선택됨)" : ""}
                        </option>
                      );
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
                    <svg className="w-3.5 h-3.5 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {c.type === "기타" && (
                  <input
                    className={flexInputCls + " w-28 shrink-0"}
                    value={c.customLabel}
                    onChange={(e) => onChangeContact(c.id, "customLabel", e.target.value)}
                    placeholder="라벨 이름"
                  />
                )}
                <input
                  className={flexInputCls + " flex-1"}
                  value={c.value}
                  onChange={(e) => onChangeContact(c.id, "value", e.target.value)}
                  placeholder="값을 입력하세요"
                />
                <button
                  onClick={() => onRemoveContact(c.id)}
                  className="px-3 text-outline hover:text-on-surface"
                  aria-label="연락처 삭제"
                >
                  ×
                </button>
              </div>
            );
          })}
          {contact.length === 0 && (
            <p className="text-[12px] text-outline">이메일, 휴대전화, GitHub 등 원하는 항목을 자유롭게 추가하세요.</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className={labelCls}>주소</label>
        <input
          className={inputCls}
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="예) 서울특별시 강남구"
        />
      </div>

      <div className="mb-6">
        <label className={labelCls}>자기소개{requiredMark}</label>
        <Textarea
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          rows={5}
          placeholder="자신을 소개하는 글을 작성해주세요."
          error={showErrors && !bio.trim()}
        />
        {showErrors && !bio.trim() && <p className={errorTextCls}>필수 입력 항목입니다.</p>}
      </div>

      <div className="mb-2">
        <label className={labelCls}>프로필 / 대표 이미지</label>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => document.getElementById("portfolio-image-input")?.click()}
          className={`rounded-xl p-4 text-center cursor-pointer transition-all duration-150 border-[1.5px] border-dashed ${
            dragOver ? "border-primary-container bg-surface-low" : "border-outline-variant bg-white"
          }`}
        >
          <input
            id="portfolio-image-input"
            type="file"
            multiple
            accept=".png,.jpg,.jpeg,.webp"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <p className="text-[13px] text-outline">
            드래그 앤 드롭 또는 <span className="text-primary-container font-semibold">클릭하여 업로드</span>
          </p>
          <p className="text-[11px] text-[#b0abc0] mt-1">PNG, JPG, WEBP 지원</p>
        </div>
        {portfolioImages.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {portfolioImages.map((f, i) => (
              <span
                key={i}
                className={`group relative inline-flex items-center pl-2.5 pr-1.5 py-0.5 rounded-full text-[11px] font-semibold font-label ${
                  f.status === "error"
                    ? "bg-red-100 text-red-500"
                    : f.status === "uploading"
                      ? "bg-surface-container text-outline"
                      : "bg-surface-container text-primary"
                }`}
              >
                <span className="max-w-40 truncate">
                  {f.file.name}
                  {f.status === "uploading" && " · 업로드 중"}
                  {f.status === "error" && " · 업로드 실패"}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(f.file)}
                  className="ml-1 w-4 h-4 rounded-full flex items-center justify-center leading-none opacity-0 group-hover:opacity-100 hover:bg-black/10 transition-opacity duration-150 cursor-pointer"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}