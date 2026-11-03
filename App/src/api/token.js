/**
 * Luu Access Token trong bo nho (module singleton) + localStorage tren web.
 *
 * Token duoc cap nhat boi `AuthProvider` va duoc `client.js` doc tu dong
 * de gan header `Authorization` cho moi request.
 *
 * Tren web, token duoc persist de refresh trang (F5 / hot reload) khong
 * mat phien dang nhap. Tren native chua co SecureStore nen chi luu trong bo nho.
 */

const STORAGE_KEY = "baoeng.accessToken";

/** localStorage tren web; null tren native hoac khi bi chan (private mode). */
function getStorage() {
  try {
    return typeof globalThis !== "undefined" && globalThis.localStorage
      ? globalThis.localStorage
      : null;
  } catch {
    return null;
  }
}

let accessToken = getStorage()?.getItem(STORAGE_KEY) ?? null;

/** @param {string | null} token */
export function setAccessToken(token) {
  accessToken = token;
  const storage = getStorage();
  if (!storage) return;
  try {
    if (token) storage.setItem(STORAGE_KEY, token);
    else storage.removeItem(STORAGE_KEY);
  } catch {
    // Bo qua loi quota/private mode — van dung token trong bo nho.
  }
}

/** @returns {string | null} */
export function getAccessToken() {
  return accessToken;
}

export function clearAccessToken() {
  accessToken = null;
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    // Bo qua loi storage.
  }
}
