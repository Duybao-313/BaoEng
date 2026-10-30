import { request, unwrap } from "./client";
import { ENDPOINTS } from "./endpoints";

/** Lay thong tin ca nhan cua nguoi dang nhap. */
export async function getMe() {
  return unwrap(await request(ENDPOINTS.users.me));
}

/** @param {{ fullName?: string, avatarUrl?: string }} payload */
export async function updateMe(payload) {
  return unwrap(
    await request(ENDPOINTS.users.me, { method: "PUT", body: payload }),
  );
}

/** @param {{ oldPassword: string, newPassword: string }} payload */
export async function changePassword(payload) {
  return unwrap(
    await request(ENDPOINTS.users.password, {
      method: "PUT",
      body: payload,
    }),
  );
}
