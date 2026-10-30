/**
 * Luu Access Token trong bo nho (module singleton).
 *
 * Token duoc cap nhat boi `AuthProvider` va duoc `client.js` doc tu dong
 * de gan header `Authorization` cho moi request.
 *
 * Luu y: chua persist qua cac lan khoi dong app (xem TODO khi bo sung
 * AsyncStorage / SecureStore cho refresh token luu tru an toan).
 */

let accessToken = null;

/** @param {string | null} token */
export function setAccessToken(token) {
  accessToken = token;
}

/** @returns {string | null} */
export function getAccessToken() {
  return accessToken;
}

export function clearAccessToken() {
  accessToken = null;
}
