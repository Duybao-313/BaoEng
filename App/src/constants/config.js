/**
 * Cau hinh dung chung cua app Mobile.
 *
 * Chi cac bien moi truong co tien to `EXPO_PUBLIC_` moi duoc nhung vao bundle
 * client (xem `.env.example`).
 */

/** Base URL cua Backend API. Xem `Docs/API_Specification.md`. */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api/v1';

/** Thoi gian cho toi da (ms) cho mot request API. */
export const API_TIMEOUT_MS = 15000;

/** Nguong dat (%) mac dinh de danh dau bai hoc hoan thanh. */
export const DEFAULT_COMPLETION_THRESHOLD = 80;
