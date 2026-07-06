// src/types/upload.ts
export type UploadType = "PROJECT_FILE" | "PROJECT_IMAGE" | "PORTFOLIO_IMAGE";

export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
  uploadType: UploadType;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  key: string;
  expiresInSeconds: number;
}
