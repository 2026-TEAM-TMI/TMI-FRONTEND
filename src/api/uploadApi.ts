// src/api/uploadApi.ts
import { apiFetch } from "./httpClient";
import type { PresignedUrlRequest, PresignedUrlResponse, UploadType } from "../types/upload";

// POST /api/v1/files/presigned-url
export async function getPresignedUrl(
  req: PresignedUrlRequest
): Promise<PresignedUrlResponse> {
  return apiFetch<PresignedUrlResponse>("/api/v1/files/presigned-url", {
    method: "POST",
    body: JSON.stringify(req),
  });
}

// presigned url은 S3로 직접 PUT하는 요청이라 apiFetch(Authorization/credentials)를 타면 안 됨
async function putToS3(uploadUrl: string, file: File): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!res.ok) {
    throw new Error("파일 업로드에 실패했습니다.");
  }
}

// presigned url 발급 → S3 업로드까지 한 번에 처리하고 업로드된 파일의 key를 반환
export async function uploadFile(file: File, uploadType: UploadType): Promise<string> {
  const { uploadUrl, key } = await getPresignedUrl({
    fileName: file.name,
    contentType: file.type,
    uploadType,
  });
  await putToS3(uploadUrl, file);
  return key;
}
