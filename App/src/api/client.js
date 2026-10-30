import { API_BASE_URL, API_TIMEOUT_MS } from "../constants/config";
import { getAccessToken } from "./token";

/** Loi HTTP chuan hoa, co kem status + body de UI xu ly. */
export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {{ status?: number, url?: string, body?: unknown }} [meta]
   */
  constructor(message, { status, url, body } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.url = url;
    this.body = body;
  }
}

/**
 * Goi API va tra ve JSON da parse.
 *
 * @param {string} path Duong dan tuong doi (dung `ENDPOINTS`).
 * @param {{
 *   method?: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE',
 *   body?: unknown,
 *   headers?: Record<string, string>,
 *   signal?: AbortSignal,
 *   timeout?: number,
 * }} [options]
 * @returns {Promise<any>}
 */
export async function request(path, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    signal,
    timeout = API_TIMEOUT_MS,
  } = options;

  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  // Huy request khi caller huy hoac khi het timeout.
  const onAbort = () => controller.abort();
  signal?.addEventListener("abort", onAbort);

  try {
    const accessToken = getAccessToken();

    const response = await fetch(url, {
      method,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : null),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : null),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();
    const payload = text ? safeJsonParse(text) : null;

    if (!response.ok) {
      throw new ApiError(
        payload?.message ?? `Request that bai (${response.status})`,
        { status: response.status, url, body: payload },
      );
    }

    return payload;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error.name === "AbortError") {
      throw new ApiError("Request da bi huy hoac qua thoi gian cho.", { url });
    }
    throw new ApiError(error.message ?? "Loi mang khong xac dinh.", { url });
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

/** @param {string} text */
function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * Lay phan `data` tu envelope chuan `{ success, data, message }`.
 * @param {any} payload
 * @returns {any}
 */
export function unwrap(payload) {
  return payload && typeof payload === "object" && "data" in payload
    ? payload.data
    : payload;
}
