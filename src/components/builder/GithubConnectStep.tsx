import { useState } from "react";
import type { RepoEntry } from "../../types/portfolio";
import { TextInput, Textarea } from "../common/Input";

const labelCls = "block text-[12px] font-semibold text-on-surface-variant mb-[5px]";

function RepoCard({
  repo,
  index,
  onRemove,
  onChange,
}: {
  repo: RepoEntry;
  index: number;
  onRemove: (id: number) => void;
  onChange: (id: number, field: keyof Omit<RepoEntry, "id" | "files">, value: string) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>(repo.files);

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const allowed = [
      "application/pdf", "image/png", "image/jpeg",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];
    const valid = Array.from(incoming).filter((f) => allowed.includes(f.type));
    setFiles((prev) => [...prev, ...valid]);
  };

  return (
    <div className="bg-surface rounded-2xl border border-surface-container p-5 relative">
      <div className="flex justify-between items-center mb-3.5">
        <span className="text-[11px] font-bold tracking-widest uppercase text-secondary font-label">
          Repository {index + 1}
        </span>
        <button
          onClick={() => onRemove(repo.id)}
          className="bg-transparent border-0 text-outline text-lg cursor-pointer leading-none px-1"
        >
          ×
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <label className={labelCls}>레포지토리 주소</label>
          <TextInput
            placeholder="https://github.com/username/repo"
            value={repo.url}
            onChange={(e) => onChange(repo.id, "url", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>레포지토리 설명</label>
          <Textarea
            placeholder="이 프로젝트에서 어떤 역할을 했는지, 어떤 기술을 사용했는지 설명해주세요."
            value={repo.description}
            onChange={(e) => onChange(repo.id, "description", e.target.value)}
            rows={3}
          />
        </div>
        <div>
          <label className={labelCls}>설명에 도움되는 파일 (PDF, PNG, PPT 등)</label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => document.getElementById(`file-input-${repo.id}`)?.click()}
            className={`rounded-xl p-4 text-center cursor-pointer transition-all duration-150 border-[1.5px] border-dashed ${
              dragOver ? "border-primary-container bg-surface-low" : "border-outline-variant bg-white"
            }`}
          >
            <input
              id={`file-input-${repo.id}`}
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.ppt,.pptx"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <p className="text-[13px] text-outline">
              드래그 앤 드롭 또는 <span className="text-primary-container font-semibold">클릭하여 업로드</span>
            </p>
            <p className="text-[11px] text-[#b0abc0] mt-1">PDF, PNG, JPG, PPT, PPTX 지원</p>
          </div>
          {files.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {files.map((f, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-surface-container text-primary font-label"
                >
                  {f.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

let _nextId = 1;

interface GithubConnectStepProps {
  githubId: string;
  onGithubIdChange: (v: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (c: string) => void;
  repos: RepoEntry[];
  onAddRepo: () => void;
  onRemoveRepo: (id: number) => void;
  onUpdateRepo: (id: number, field: keyof Omit<RepoEntry, "id" | "files">, value: string) => void;
}

const JOB_CATEGORIES = ["AI", "백엔드", "프론트엔드"];

export { _nextId as repoNextId };

export default function GithubConnectStep({
  githubId,
  onGithubIdChange,
  selectedCategory,
  onCategoryChange,
  repos,
  onAddRepo,
  onRemoveRepo,
  onUpdateRepo,
}: GithubConnectStepProps) {
  return (
    <>
      {/* GitHub ID */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-on-surface mb-2">GitHub 아이디</label>
        <TextInput
          placeholder="e.g. elena-vane"
          value={githubId}
          onChange={(e) => onGithubIdChange(e.target.value)}
          style={{ fontSize: "15px", padding: "13px 16px" }}
        />
      </div>

      {/* Job category */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-on-surface mb-3">원하는 직무 카테고리</label>
        <div className="flex gap-2.5 flex-wrap">
          {JOB_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer font-[inherit] transition-all duration-150 border-2 ${
                selectedCategory === cat
                  ? "bg-[linear-gradient(135deg,#6347d1,#9c48ea)] text-white border-primary-container shadow-[0_4px_12px_rgba(99,71,209,0.25)]"
                  : "bg-surface text-on-surface-variant border-surface-container hover:border-outline-variant"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Repository section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3.5">
          <div>
            <h3 className="text-[15px] font-bold text-on-surface">📁 레포지토리 정보</h3>
            <p className="text-[12px] text-outline mt-0.5">포트폴리오에 담을 프로젝트를 추가하세요</p>
          </div>
          <button
            onClick={onAddRepo}
            className="px-4 py-2 rounded-full text-[13px] font-bold text-white border-0 cursor-pointer font-[inherit] bg-[linear-gradient(135deg,#6347d1,#9c48ea)] shadow-[0_4px_12px_rgba(99,71,209,0.25)] hover:opacity-90 transition-opacity duration-150"
          >
            + 레포지토리 추가
          </button>
        </div>

        {repos.length === 0 ? (
          <div className="border-2 border-dashed border-outline-variant rounded-2xl p-8 text-center text-outline text-sm">
            <div className="text-3xl mb-2">📂</div>
            <p>아직 추가된 레포지토리가 없습니다.</p>
            <p className="text-[12px] mt-1 text-[#b0abc0]">위 버튼을 눌러 레포지토리를 추가하세요.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {repos.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} onRemove={onRemoveRepo} onChange={onUpdateRepo} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
