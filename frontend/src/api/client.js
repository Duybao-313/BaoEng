/** Base URL cua Backend API. Override bang bien moi truong `VITE_API_BASE_URL`. */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1'

/** Loi API chuan hoa, kem `status` + `code` de UI xu ly. */
export class ApiError extends Error {
  constructor(message, { status, url, code, details } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.url = url
    this.code = code
    this.details = details
  }
}

const TOKEN_KEY = 'baoeng.accessToken'

/**
 * Goi API va tra ve JSON da parse.
 *
 * @param {string} path Duong dan tuong doi (khong can `/api/v1`).
 * @param {{ method?: string, body?: unknown, headers?: Record<string, string> }} [options]
 * @returns {Promise<any>} Envelope `{ success, data, message, error, timestamp }`.
 */
export async function request(path, options = {}) {
  const { method = 'GET', body, headers = {} } = options
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData
  const accessToken = localStorage.getItem(TOKEN_KEY)

  let response
  try {
    response = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        ...(!isFormData && body !== undefined ? { 'Content-Type': 'application/json' } : null),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : null),
        ...headers,
      },
      body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra Backend.', { url })
  }

  const text = await response.text()
  const payload = text ? safeJsonParse(text) : null

  if (!response.ok) {
    const err = payload?.error ?? {}
    throw new ApiError(err.message ?? `Yêu cầu thất bại (${response.status})`, {
      status: response.status,
      url,
      code: err.code,
      details: err.details,
    })
  }

  return payload
}

/** @param {string} text */
function safeJsonParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}
