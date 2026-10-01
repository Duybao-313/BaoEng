import { request } from "./client";
import { ENDPOINTS } from "./endpoints";

/**
 * Lay phan `data` tu envelope chuan cua Backend: `{ success, data, message }`.
 * @param {any} payload
 * @returns {any}
 */
function unwrap(payload) {
  return payload && typeof payload === "object" && "data" in payload
    ? payload.data
    : payload;
}

/**
 * Dang nhap bang username + password.
 * Backend: `POST /auth/login` với body `{ username, password }`.
 *
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ accessToken: string, tokenType: string, expiresIn: number, user: object }>}
 */
export async function login({ username, password }) {
  const payload = await request(ENDPOINTS.auth.login, {
    method: "POST",
    body: { username, password },
  });
  return unwrap(payload);
}

/** @param {{ username: string, fullName: string, email: string, password: string }} payload */
export function register(payload) {
  return request(ENDPOINTS.auth.register, { method: "POST", body: payload });
}

export function getCurrentUser() {
  return request(ENDPOINTS.auth.me);
}
