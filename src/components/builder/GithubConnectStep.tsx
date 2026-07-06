import { useEffect, useRef, useState } from "react";
import type { RepoEntry, RepoFile } from "../../types/portfolio";
import type { GithubRepository } from "../../types/github";
import { getMyRepositories } from "../../api/memberApi";
import { uploadFile } from "../../api/uploadApi";
import { useAuthStore } from "../../store/authStore";
import { Textarea } from "../common/Input";

const REPO_VISIBILITY_HELP =
  "owner, collaborator, organization repository 중 권한이 write 이상인 레포지토리만 조회됩니다. (organization read 권한만 있는 레포는 조회되지 않아요)";

function HelpTooltip({ text }: { text: string }) {
  return (
    <span className="relative inline-flex group align-middle ml-1">
      <button
        type="button"
        aria-label="도움말"
        className="w-4 h-4 rounded-full bg-surface-container text-outline text-[10px] font-bold flex items-center justify-center cursor-help hover:bg-outline-variant transition-colors"
      >
        ?
      </button>
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+6px)] w-64 rounded-lg bg-on-surface text-white text-[11px] leading-relaxed p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 z-10">
        {text}
      </span>
    </span>
  );
}

const GitHubIcon = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const labelCls = "block text-[12px] font-semibold text-on-surface-variant mb-[5px]";

function RepoCard({
  repo,
  index,
  availableRepos,
  onRemove,
  onChange,
  onFilesChange,
}: {
  repo: RepoEntry;
  index: number;
  availableRepos: GithubRepository[];
  onRemove: (id: number) => void;
  onChange: (id: number, field: keyof Omit<RepoEntry, "id" | "files">, value: string) => void;
  onFilesChange: (id: number, files: RepoFile[]) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const files = repo.files;

  // 업로드는 비동기로 겹쳐서 완료되므로, 매 갱신 시점의 최신 목록을 ref로 들고 있다가 순차 반영한다.
  const filesRef = useRef<RepoFile[]>(files);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const setFiles = (updater: (prev: RepoFile[]) => RepoFile[]) => {
    const next = updater(filesRef.current);
    filesRef.current = next;
    onFilesChange(repo.id, next);
  };

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const allowed = [
      "application/pdf", "image/png", "image/jpeg",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];
    const valid = Array.from(incoming).filter((f) => allowed.includes(f.type));
    if (valid.length === 0) return;

    const pending: RepoFile[] = valid.map((file) => ({ file, status: "uploading" }));
    setFiles((prev) => [...prev, ...pending]);

    pending.forEach((entry) => {
      uploadFile(entry.file, "PROJECT_FILE")
        .then((key) => {
          setFiles((prev) =>
            prev.map((f) => (f.file === entry.file ? { ...f, status: "done", key } : f))
          );
        })
        .catch(() => {
          setFiles((prev) =>
            prev.map((f) => (f.file === entry.file ? { ...f, status: "error" } : f))
          );
        });
    });
  };

  const removeFile = (target: File) => {
    setFiles((prev) => prev.filter((f) => f.file !== target));
  };

  const selectedRepo = availableRepos.find((r) => r.html_url === repo.url);

  return (
    <div className="bg-surface rounded-2xl border border-surface-container p-5 relative">
      <div className="flex justify-between items-center mb-3.5">
        <span className="text-[11px] font-bold tracking-widest uppercase text-secondary font-label">
          Repository {index + 1}
        </span>
        <button
          onClick={() => onRemove(repo.id)}
          className="bg-transparent border-0 text-outline text-lg cursor-pointer leading-none px-1 hover:text-on-surface transition-colors"
        >
          ×
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {/* Repo dropdown */}
        <div>
          <label className={labelCls}>레포지토리 선택</label>
          <div className="relative">
            <select
              value={repo.url}
              onChange={(e) => onChange(repo.id, "url", e.target.value)}
              className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border-[1.5px] border-outline-variant bg-white text-[14px] text-on-surface focus:outline-none focus:border-primary-container cursor-pointer transition-colors duration-150"
            >
              <option value="">레포지토리를 선택하세요</option>
              {availableRepos.map((r) => (
                <option key={r.id} value={r.html_url}>
                  {r.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {selectedRepo && (
            <p className="text-[11px] text-outline mt-1.5 flex items-center gap-1">
              <GitHubIcon size={11} color="#797585" />
              {selectedRepo.html_url}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className={labelCls}>레포지토리 설명</label>
          <Textarea
            placeholder="이 프로젝트에서 어떤 역할을 했는지, 어떤 기술을 사용했는지 설명해주세요."
            value={repo.description}
            onChange={(e) => onChange(repo.id, "description", e.target.value)}
            rows={3}
          />
        </div>

        {/* File upload */}
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
                    aria-label={`${f.file.name} 삭제`}
                    className="ml-1 w-4 h-4 rounded-full flex items-center justify-center leading-none opacity-0 group-hover:opacity-100 hover:bg-black/10 transition-opacity duration-150 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface GithubConnectStepProps {
  selectedCategory: string | null;
  onCategoryChange: (c: string) => void;
  repos: RepoEntry[];
  onAddRepo: () => void;
  onRemoveRepo: (id: number) => void;
  onUpdateRepo: (id: number, field: keyof Omit<RepoEntry, "id" | "files">, value: string) => void;
  onRepoFilesChange: (id: number, files: RepoFile[]) => void;
}

const JOB_CATEGORIES = ["AI", "백엔드", "프론트엔드"];

export default function GithubConnectStep({
  selectedCategory,
  onCategoryChange,
  repos,
  onAddRepo,
  onRemoveRepo,
  onUpdateRepo,
  onRepoFilesChange,
}: GithubConnectStepProps) {
  const githubUsername = useAuthStore((s) => s.user?.githubLogin) ?? "-";
  const [availableRepos, setAvailableRepos] = useState<GithubRepository[]>([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [reposError, setReposError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setReposLoading(true);
    setReposError(null);
    getMyRepositories()
      .then((data) => {
        if (!cancelled) setAvailableRepos(data);
      })
      .catch(() => {
        if (!cancelled) setReposError("레포지토리 목록을 불러오지 못했습니다.");
      })
      .finally(() => {
        if (!cancelled) setReposLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {/* GitHub OAuth */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-on-surface mb-3">GitHub 연동</label>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-low border border-surface-container">
          <div className="w-8 h-8 rounded-full bg-[#24292e] flex items-center justify-center shrink-0">
            <GitHubIcon size={16} color="white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-on-surface">{githubUsername}</p>
            <p className="text-[11px] text-outline">{availableRepos.length}개 레포지토리 연동됨</p>
          </div>
          <span className="text-[11px] font-bold text-primary-container bg-surface-container px-2.5 py-0.5 rounded-full font-label shrink-0">
            연동됨
          </span>
        </div>
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
            <h3 className="text-[15px] font-bold text-on-surface flex items-center">
              📁 레포지토리 정보
              <HelpTooltip text={REPO_VISIBILITY_HELP} />
            </h3>
            <p className="text-[12px] text-outline mt-0.5">
              {reposLoading ? "레포지토리 목록을 불러오는 중이에요..." : "포트폴리오에 담을 프로젝트를 추가하세요"}
            </p>
          </div>
          <button
            onClick={onAddRepo}
            disabled={reposLoading}
            className="px-4 py-2 rounded-full text-[13px] font-bold text-white border-0 font-[inherit] bg-[linear-gradient(135deg,#6347d1,#9c48ea)] shadow-[0_4px_12px_rgba(99,71,209,0.25)] hover:opacity-90 transition-opacity duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + 레포지토리 추가
          </button>
        </div>

        {reposError && (
          <p className="text-[12px] text-red-500 mb-3">{reposError}</p>
        )}

        {repos.length === 0 ? (
          <div className="border-2 border-dashed border-outline-variant rounded-2xl p-8 text-center text-outline text-sm">
            <div className="text-3xl mb-2">📂</div>
            <p className="font-semibold">아직 추가된 레포지토리가 없습니다</p>
            <p className="text-[12px] mt-1 text-[#b0abc0]">위 버튼을 눌러 레포지토리를 추가하세요</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {repos.map((repo, i) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                index={i}
                availableRepos={availableRepos}
                onRemove={onRemoveRepo}
                onChange={onUpdateRepo}
                onFilesChange={onRepoFilesChange}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
